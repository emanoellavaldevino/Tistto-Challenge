import os

path = 'C:\\Users\\Emanoella\\react_\\todo_frontend\\build\\index.html'
print(f"Checking path: {path}")

if os.path.exists(path):
    print("File exists")
else:
    print("File does not exist")
