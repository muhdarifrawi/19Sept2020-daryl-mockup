# imports for selenium
from selenium import webdriver
import unittest
import requests
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
# imports to use python-dotenv
import os
from dotenv import load_dotenv
load_dotenv()


class FinanceCalculatorTest(unittest.TestCase):

    def setUp(self):
        self.browser = webdriver.Chrome(executable_path=r"{}".format(os.getenv("BROWSER_DRIVER")))
    
    def tearDown(self):
        self.browser.quit()

    def test_browser_title(self):
        self.browser.get(os.getenv("TESTING_URL"))
        self.assertIn("Document", self.browser.title)

    def test_for_age(self):
        self.browser.get(os.getenv("TESTING_URL"))
        self.fail("finish the test!")

if __name__ == "__main__":
    unittest.main(warnings="ignore")






