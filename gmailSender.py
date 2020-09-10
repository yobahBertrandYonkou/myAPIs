#!C:/Users/YOBAH BERTRAND Y/AppData/Local/Programs/Python/Python37/python.exe
print("content-type: text/html\n")
import smtplib
import cgi

data = cgi.FieldStorage()

smail = data.getvalue("sender")
spass = data.getvalue("pass")
receiver = data.getvalue("receiver")
message = data.getvalue("msg")


s = smtplib.SMTP('smtp.gmail.com', 587)
s.starttls()
s.login(smail,spass)
s.sendmail(smail, receiver, message)
s.quit()

print("Sent")