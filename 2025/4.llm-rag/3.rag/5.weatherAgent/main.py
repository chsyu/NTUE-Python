#!/usr/bin/env python3
"""
簡潔版本的主程式
"""

import asyncio
from weather_agent_langchain import chat

async def main():
    print("🌤️ 簡潔天氣助手")
    print("輸入 'quit' 結束對話")
    
    while True:
        user_input = input("\n您: ").strip()
        if user_input.lower() == 'quit':
            break
            
        try:
            response = await chat(user_input)
            print(f"\n助手: {response}")
        except Exception as e:
            print(f"錯誤: {e}")

if __name__ == "__main__":
    asyncio.run(main())