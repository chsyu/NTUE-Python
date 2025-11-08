"""
使用 LangChain Agent 的簡潔天氣助手
比 LangGraph 版本更簡單，功能相同
"""
from langchain_ollama import ChatOllama
from langchain.agents import create_openai_tools_agent, AgentExecutor
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage
from weather_tools import get_current_weather, get_weather_forecast

# LLM 和工具
llm = ChatOllama(model="qwen2.5:7b-instruct", temperature=0)
tools = [get_current_weather, get_weather_forecast]
llm_with_tools = llm.bind_tools(tools)

# 系統提示詞
SYSTEM_PROMPT = """你是專業的天氣助手，請務必使用繁體中文回答，避免使用簡體中文字。

你有兩個工具可以使用：
- get_current_weather(city): 查詢指定城市的當前天氣狀況
- get_weather_forecast(city, days): 查詢指定城市的未來天氣預報，支援1-16天

請根據用戶問題智能選擇工具和參數：
- 如果用戶想知道現在的天氣情況，使用當前天氣工具
- 如果用戶想知道未來的天氣預報，使用預報工具並根據需求設定天數：
  * 沒有指定天數：預設 7 天
  * 明天：days=2（今天+明天）
  * 一週：days=7
  * 兩週：days=14
  * 根據用戶具體要求調整天數（最多16天）

回答時請：
- 使用標準繁體中文字（如：氣溫、濕度、風速、陰天、晴朗）
- 避免簡體中文字（如：气温、湿度、风速、阴天、晴朗）
- 提供實用的建議（穿衣、出行等）

相信你的語言理解能力，根據問題的語意做出最佳判斷。"""

# 建立提示詞模板（支援對話記憶）
prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
])

# 建立 Agent
agent = create_openai_tools_agent(llm_with_tools, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=False)

# 使用簡單的訊息歷史儲存（每個 thread_id 獨立）
# 使用新的 API：直接儲存 BaseMessage 列表，而不是 ConversationBufferMemory
message_history: dict[str, list[BaseMessage]] = {}

async def chat(query: str, thread_id: str = "default") -> str:
    """對話函數（支援記憶功能）"""
    # 取得或建立該 thread 的訊息歷史
    if thread_id not in message_history:
        message_history[thread_id] = []
    
    chat_history = message_history[thread_id]
    
    try:
        # 執行 agent（傳入對話歷史）
        result = await agent_executor.ainvoke({
            "input": query,
            "chat_history": chat_history
        })
        
        # 保存對話歷史（使用新的 API）
        chat_history.append(HumanMessage(content=query))
        chat_history.append(AIMessage(content=result["output"]))
        
        return result["output"]
    except Exception as e:
        return f"錯誤: {str(e)}"
