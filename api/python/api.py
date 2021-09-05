import json
import sys
import Student

args = sys.argv

stu_id = args[1]
stu_pass = args[2]
data = Student.get_gpa_info(stuno=stu_id, pwd=stu_pass)
print(json.dumps(data),end= "")
