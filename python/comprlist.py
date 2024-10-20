users = [

    {"name": "Kamil", "country": "Poland"},

    {"name": "John", "country": "USA"},

    {"name": "Yeti"}

]

users_polish = list(filter(lambda user: user.get("country") == "Poland", users))

print(users_polish)
