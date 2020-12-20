# imports for selenium
from selenium import webdriver
import unittest
import requests
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# imports to use python-dotenv
import os
from dotenv import load_dotenv
load_dotenv()
# import pandas to test against given data
import pandas as pd

import time


class FinanceCalculatorTest(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Chrome(executable_path=r"{}".format(os.getenv("BROWSER_DRIVER")))
    
    def tearDown(self):
        self.browser.quit()

    # def test_browser_title(self):
    #     self.browser.get(os.getenv("TESTING_URL"))
    #     self.assertIn("Document", self.browser.title)

    # def test_for_age(self):
    #     self.browser.get(os.getenv("TESTING_URL"))
    #     input_element_age = self.browser.find_element_by_id("age")
    #     input_calculate = self.browser.find_element_by_id("calculate")
    #     # test for empty input
    #     input_calculate.send_keys(Keys.ENTER)
    #     inner_html = self.browser.find_element_by_id("display-values").get_attribute("innerHTML")
    #     if inner_html == "<h3>You must be above 21 to apply for this investment</h3>":
    #         print("test_for_age empty input pass")
    #     else:
    #         self.fail("test_for_age failed")
    #     # test for younger than 21
    #     input_element_age.send_keys("18")
    #     input_calculate.send_keys(Keys.ENTER)
    #     if inner_html == "<h3>You must be above 21 to apply for this investment</h3>":
    #         print("test_for_age lesser than 21 pass")
    #     else:
    #         self.fail("test_for_age failed")
    #     # test for negative number
    #     input_element_age.send_keys("-2")
    #     input_calculate.send_keys(Keys.ENTER)
    #     if inner_html == "<h3>You must be above 21 to apply for this investment</h3>":
    #         print("test_for_age negative number pass")
    #     else:
    #         self.fail("test_for_age failed")

    # def test_for_years_invest(self):
    #     self.browser.get(os.getenv("TESTING_URL"))
    #     input_element_age = self.browser.find_element_by_id("age")
    #     input_element_age.send_keys("21")
    #     input_calculate = self.browser.find_element_by_id("calculate")
    #     # test for empty input
    #     input_calculate.send_keys(Keys.ENTER)
    #     inner_html = self.browser.find_element_by_id("display-values").get_attribute("innerHTML")
    #     if inner_html == "<h3>Please enter years to invest from 1 to 99 years</h3>":
    #         print("test_for_years_invest empty input pass")
    #     else:
    #         self.fail("test_for_years_invest")
    #     # test for value above 99 
    #     input_element_invest_years = self.browser.find_element_by_id("investYears")
    #     input_element_invest_years.send_keys("100")
    #     input_calculate.send_keys(Keys.ENTER)
    #     if inner_html == "<h3>Please enter years to invest from 1 to 99 years</h3>":
    #         print("test_for_years_invest input above 99 pass")
    #     else:
    #         self.fail("test_for_years_invest")
    #     # test for zero
    #     input_element_invest_years.send_keys("0")
    #     input_calculate.send_keys(Keys.ENTER)
    #     if inner_html == "<h3>Please enter years to invest from 1 to 99 years</h3>":
    #         print("test_for_years_invest input zero pass")
    #     else:
    #         self.fail("test_for_years_invest")
    #     # test for negative number
    #     input_element_invest_years.send_keys("-1")
    #     input_calculate.send_keys(Keys.ENTER)
    #     if inner_html == "<h3>Please enter years to invest from 1 to 99 years</h3>":
    #         print("test_for_years_invest input negative pass")
    #     else:
    #         self.fail("test_for_years_invest")
    
    # def test_for_monthly_contribute(self):
    #     self.browser.get(os.getenv("TESTING_URL"))
    #     input_element_age = self.browser.find_element_by_id("age")
    #     input_element_age.send_keys("21")
    #     input_element_invest_years = self.browser.find_element_by_id("investYears")
    #     input_element_invest_years.send_keys("10")
    #     input_calculate = self.browser.find_element_by_id("calculate")
    #     input_calculate.send_keys(Keys.ENTER)
    #     inner_html = self.browser.find_element_by_id("display-values").get_attribute("innerHTML")
    #     if inner_html == "<h3>Please enter a minimum value of 200 for monthly contributions</h3>":
    #         print("test_for_monthly_contribute input empty pass")
    #     else:
    #         self.fail("test_for_monthly_contribute")
    #     input_monthly_contribute = self.browser.find_element_by_id("mthContribute")
    #     input_monthly_contribute.send_keys("199")
    #     input_calculate.send_keys(Keys.ENTER)
    #     if inner_html == "<h3>Please enter a minimum value of 200 for monthly contributions</h3>":
    #         print("test_for_monthly_contribute input lower than 200 pass")
    #     else:
    #         self.fail("test_for_monthly_contribute")
    #     input_monthly_contribute.send_keys("0")
    #     input_calculate.send_keys(Keys.ENTER)
    #     if inner_html == "<h3>Please enter a minimum value of 200 for monthly contributions</h3>":
    #         print("test_for_monthly_contribute input zero pass")
    #     else:
    #         self.fail("test_for_monthly_contribute")
    #     input_monthly_contribute.send_keys("-1")
    #     input_calculate.send_keys(Keys.ENTER)
    #     if inner_html == "<h3>Please enter a minimum value of 200 for monthly contributions</h3>":
    #         print("test_for_monthly_contribute negative input pass")
    #     else:
    #         self.fail("test_for_monthly_contribute")
    

    def test_data_output(self):
        TESTING_DATA = r"{}".format(os.getenv("TESTING_DATA"))
        data = pd.read_excel(TESTING_DATA,sheet_name="Illustrated Values",skiprows=1,usecols="G")
        # print(round(data.astype("float"),2))
        # for index, row in data.iterrows():
        #     print(round(row['0.04.1'],2))

        self.browser.get(os.getenv("TESTING_URL"))
        input_element_age = self.browser.find_element_by_id("age")
        input_element_age.send_keys("21")
        input_element_invest_years = self.browser.find_element_by_id("investYears")
        input_element_invest_years.send_keys("10")
        input_monthly_contribute = self.browser.find_element_by_id("mthContribute")
        input_monthly_contribute.send_keys("800")
        input_calculate = self.browser.find_element_by_id("calculate")
        input_calculate.send_keys(Keys.ENTER)

        # find elements with multiple class
        data_10_y = self.browser.find_elements_by_xpath("//td[contains(@class, 'money') and contains(@class, 'ten')]")
        
        for each in data_10_y:
            values = each.get_attribute("innerText")
            end = values.find("-")
            values = values[1:end-1]
            print(values)

        

        
        
        self.fail("finish the test!")


if __name__ == "__main__":
    unittest.main(warnings="ignore")






