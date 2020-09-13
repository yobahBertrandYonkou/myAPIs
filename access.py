#!/usr/bin/env python
# coding: utf-8

def logger(usr, pas):
    if(os.system("netsh wlan connect name=Student ssid=Student") == 0):
        driver = webdriver.Chrome()
        driver.get('http://192.168.100.100:8090/')
        driver.find_element_by_id('username').send_keys(usr)
        driver.find_element_by_id('password').send_keys(pas)
        driver.find_element_by_id('loginbutton').click()
        driver.minimize_window()
        win32api.Beep(1000,250)
        win32api.MessageBox(0,"Christ University Captive Portal Successfully Logged On","Confirmation")

    
    else:
        win32api.MessageBox(0,"Please Turn on wifi manually and try again","Error Message")
        win32api.Beep(2500,500)

#creates config file
def createFile():
    print('Creating')
    file = open('config.txt','x')
    file.close()
    return file


#writes infor to config file
def insertInfo(file):
    print('Inserting')
    file = open('config.txt','w')
    #validation
    info = easy.get_username_password('Access Configuration',labels =['Username','Password'])
    info = dict(info)
    while info['Username'] == '' or info['Password'] == '' or not info['Username'].isdigit() or not info['Password'].isdigit() or len(str(info['Username'])) is not 7:
        info = easy.get_username_password('Access Configuration',labels =['Username','Password'])
    
    info = dict(info)
    file.write(str(info['Username'])+'\n'+str(info['Password']))
    file.close()
    return file

#reads file info
def readFile():
    print('Reading')
    file = open('config.txt','r')
    usr = file.readline()
    pas = file.readline()
    file.close()
    return usr, pas

#checks if file exist
if os.path.isfile('config.txt'):
    usr, pas = readFile()
    logger(usr, pas)
else:
    file = createFile()
    file = insertInfo(file)
    usr, pas = readFile()
    logger(usr, pas)