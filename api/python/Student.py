from school_api import SchoolClient
# 先实例化一个学校，再实例化用户
import json
import os
config = json.load(os.read('../config.json'))
school = SchoolClient(url=config['jiaowu_url'])



def get_gpa(stuno, pwd):
    user = school.user_login(stuno, pwd)
    data = user.get_score('2020-2021')
    sumCredit = 0
    sumCreditMultiplyScore = 0
    for row in data:
        sumCredit = sumCredit+row['credit']
        sumCreditMultiplyScore = sumCreditMultiplyScore + \
            row['score']*row['credit']
    gpa = round((sumCreditMultiplyScore/sumCredit-50)/10, 2)
    print(gpa)
    return gpa


def get_info(stuno, pwd):
    user = school.user_login(stuno, pwd)
    user_info = user.get_info()

    return user_info


def get_gpa_info(stuno, pwd):
    user = school.user_login(stuno, pwd)
    data = user.get_score('2020-2021')
    sumCredit = 0
    sumCreditMultiplyScore = 0
    for row in data:
        sumCredit = sumCredit+row['credit']
        sumCreditMultiplyScore = sumCreditMultiplyScore + \
            row['score']*row['credit']
    gpa = round((sumCreditMultiplyScore/sumCredit-50)/10, 2)
    user_info = user.get_info()
    return {
        'gpa': gpa,
        'info': user_info
    }
