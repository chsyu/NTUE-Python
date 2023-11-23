from homeworkJson import homework_list

one_table_homework_list = [];

for school in {"ntue", "ntut"}:
  for semester in ["110-1", "110-2","111-1", "111-2","112-1"]:
    homeworks = homework_list[school][semester]
    for homework in homeworks:
      homework={**homework, "school": school, "semester": semester}
      one_table_homework_list.append(homework)


list_as_homework = "home_work = " + str(one_table_homework_list)

# 寫入檔案
with open("one_table_homework.py", "w") as file:
    file.write(list_as_homework)