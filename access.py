#!/usr/bin/env python
# coding: utf-8

# In[23]:


from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import os
import win32api

if(os.system("netsh wlan connect name=Student ssid=Student") == 0):
    driver = webdriver.Chrome()
    driver.get('http://192.168.100.100:8090/')
    driver.find_element_by_id('username').send_keys(usr)
    driver.find_element_by_id('password').send_keys(pass)
    driver.find_element_by_id('loginbutton').click()
    driver.minimize_window()
    win32api.Beep(1000,250)
    win32api.MessageBox(0,"Christ University Captive Portal Successfully Logged On","Confirmation")

    
else:
    win32api.MessageBox(0,"Please Turn on wifi manually and try again","Error Message")
    win32api.Beep(2500,500)