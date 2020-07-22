# CREATES DICTIONARY OF OVERALL PLAYER VALUES IN 2018 SEASON
# VERY SIMPLE VALUE CALCULATION
import requests
import json

statDict = {}
totalDict = {}

# Getting information from API
response = requests.get("https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=237")
playerStats = response.json()

# Creating a dictionary with simple stats
for player in playerStats["data"]:
    # {id: points, assists, rebounds, fg%}
    statDict[player["player_id"]] = [player["pts"], player["ast"], player["reb"], player["fg_pct"]]
print(statDict)

# Creating a dictionary with overall player value
for key, value in statDict.items():
    total = value[0] + value[1]*0.75 + value[2]*0.25
    totalDict[key] = total
print(totalDict)