#Math
import requests
import json

leagueAvg2PtPct = .523
leagueAvg3PtPct = .357
leagueAvgFtPct = .771


statDict = {}
totalDict = {}

# Getting information from API
response = requests.get("https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=237")
playerStats = response.json()

# Creating a dictionary with simple stats
for player in playerStats["data"]:
    # {id: points, assists, rebounds, fg%, etc}
    statDict[player["player_id"]] = [player["ast"], player["oreb"], player["dreb"], player["stl"], player["blk"], player["turnover"], player["fg_pct"], player["fgm"], player["fga"], 
    player["fg3m"], player["fg3a"], player["fg3_pct"], player["ft_pct"]]
print(statDict)


# Creating a dictionary with overall player value
for key, value in statDict.items():
    fg2_pct = (value[7]-value[9]) / (value [8] - value[10])
    adj2Pts = (1+(fg2_pct - leagueAvg2PtPct))
    total = value[0]*0.75 + value[1]*0.75 + value[2]*0.25 + value[3]*1.25 + value[4] - value[5]
    totalDict[key] = total
print(totalDict)







