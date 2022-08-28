import pymongo
import webbrowser

client = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
mydb = client["bezkoder_files_db"]
mycol = mydb["fs.files"]

file_display = []

tbl = "<tr><td>filename</td><td>Upload Date</td><td>Content Type</td></tr>"
file_display.append(tbl)

for y in mycol.find():
    a = "<tr><td>%s</td>"%y['filename']
    file_display.append(a)
    b = "<td>%s</td>"%y['uploadDate']
    file_display.append(b)
    c = "<td>%s</td></tr>"%y['contentType']
    file_display.append(c)

contents = '''<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta content="text/html; charset=ISO-8859-1"
http-equiv="content-type">
<title>Python Webbrowser</title>
</head>
<body>
<table>
%s
</table>
</body>
</html>
'''%(file_display)

filename = 'info.html'

def main(contents, filename):
    output = open(filename,"w")
    output.write(contents)
    output.close()

main(contents, filename)    
webbrowser.open(filename)