from openpyxl import Workbook, load_workbook
import os

# https://askubuntu.com/questions/350458/passing-a-file-location-to-python
file_path = os.path.join(os.path.expanduser('~'), 'Documents', 'CodingFolder', 'Daryl-Mockup-Documents','data_to_read.xlsx')
# load excel sheet and assign to variable given_data
given_data = load_workbook(file_path)
# access sheet named "Profile"
profile_page = given_data["Profile"]

# check on target value
print(profile_page["B16"].value)
# change target value to 200
profile_page["B16"].value = 200
# check on target value
print(profile_page["B16"].value)
# save changes
given_data.save(file_path)


# read illustrated values
illustrated_value = given_data["Illustrated Values"]

# 10 year 4% J3:J42
cell_10_4 = illustrated_value["J3":"J42"]

for i in cell_10_4:
    print(i[0].value)

# 10 year 8% K3:K42

# 20 year 4% M3:M42

# 20 year 8% N3:N42


# read dividend income