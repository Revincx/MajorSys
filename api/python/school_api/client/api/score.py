# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

import re
from bs4 import BeautifulSoup
from requests import RequestException, TooManyRedirects

from school_api.client.api.base import BaseSchoolApi
from school_api.client.api.utils import get_alert_tip
from school_api.exceptions import ScoreException


class Score(BaseSchoolApi):
    ''' 学生成绩获取 '''

    def get_score(self, score_year=None, score_term='1', use_api=0, **kwargs):
        ''' 成绩信息 获取入口
        :param score_year: 成绩学年
        :param score_term: 成绩学期
        :param use_api:    0.接口1, 1.接口2, 2.接口3 ...
        :param kwargs: requests模块参数
        return
        '''
        score_url = self.school_url['SCORE_URL'][use_api] + self.user.account

        try:
            view_state = self._get_view_state(score_url, **kwargs)
        except TooManyRedirects:
            msg = '可能是成绩接口地址不对，请尝试更改use_api值'
            raise ScoreException(self.school_code, msg)
        except RequestException:
            msg = '获取成绩请求参数失败'
            raise ScoreException(self.school_code, msg)

        payload = {
            '__VIEWSTATE': view_state,
            'Button5': '按学年查询',
            'ddlXN': score_year,
            'ddlXQ': score_term,
            'txtQSCJ': 0,
            'txtZZCJ': 100
        }
        try:
            res = self._post(score_url, data=payload, **kwargs)
        except TooManyRedirects:
            raise ScoreException(self.school_code, '成绩接口已关闭')
        except RequestException:
            raise ScoreException(self.school_code, '获取成绩信息失败')

        tip = get_alert_tip(res.text)
        if tip:
            raise ScoreException(self.school_code, tip)

        return ScoreParse(self.school_code, res.text, use_api).get_score(score_year)


class ScoreParse():
    ''' 成绩页面解析模块 '''

    def __init__(self, school_code, html, use_api):
        self.school_code = school_code
        self.use_api = use_api
        self.soup = BeautifulSoup(html, "html.parser")
        self._html_parse_of_score()

    def _html_parse_of_score(self):
        table = self.soup.find("table", {"id": re.compile("Datagrid1", re.IGNORECASE)})
        if not table:
            raise ScoreException(self.school_code, '获取成绩信息失败')

        rows = table.find_all('tr')
        rows.pop(0)
        self.score_info = []
        for row in rows:
            cells = row.find_all("td")
            # 课程名
            lesson_name = cells[1].text.strip()
            credit = cells[8].text.strip() or 0
            score = cells[4].text.strip() or 0
            score_dict = {
                "lesson_name": lesson_name,
                "credit": float(credit),
                "score": self.handle_data(score)
            }
            # 有其他成绩内容则输出
            makeup_score = cells[6].text
            retake_score = cells[7].text
            if makeup_score != '\xa0':
                # 补考成绩
                score_dict['bkcj'] = makeup_score
            if retake_score != '\xa0':
                # 重修成绩
                score_dict['cxcj'] = retake_score
            # 组装数组格式的数据备用
            self.score_info.append(score_dict)

    def get_score(self, year, term=None):
        ''' 返回成绩信息json格式 '''
        try:
            if not self.score_info:
                raise KeyError
            if year:
                if term:
                    return self.score_info
                return self.score_info
        except KeyError:
            raise ScoreException(self.school_code, '暂无成绩信息')

        return self.score_info

    @staticmethod
    def handle_data(data):
        try:
            return float(data)
        except ValueError:
            if data=='优':
                return 95
            elif data=='良':
                return 85
            elif data=='中':
                return 75
            elif data=='及格':
                return 65
            return data
