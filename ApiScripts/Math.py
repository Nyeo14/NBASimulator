#Math
import requests
import json

leagueAvg2PtPct = .523
leagueAvg3PtPct = .357
leagueAvgFtPct = .771


statDict = {}
totalDict = {}

# Getting information from API
response = requests.get("https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=256")
playerStats = response.json()

# Creating a dictionary with simple stats
for player in playerStats["data"]:
    # {id: points, assists, rebounds, fg%, etc}
    statDict[player["player_id"]] = [player["ast"], player["oreb"], player["dreb"], player["stl"], player["blk"], player["turnover"], player["fg_pct"], player["fgm"], player["fga"], 
    player["fg3m"], player["fg3a"], player["fg3_pct"], player["ft_pct"], player["ftm"], player["games_played"]]
print(statDict)


# Creating a dictionary with overall player value
for key, value in statDict.items():
    try:
        fg2_pct = (value[7]-value[9]) / (value [8] - value[10])
    except ZeroDivisionError:
        fg2_pct = value[11]
    fg2m = value[7] - value[9]
    adjfg2m = (1+(fg2_pct - leagueAvg2PtPct)) * fg2m
    adjfg3m = (1+(value[11]-leagueAvg3PtPct)) * value[9]
    adjftm =  (1+(value[12]-leagueAvgFtPct)) * value[13]
    total = (value[0]*0.75 + value[1]*0.75 + value[2]*0.25 + value[3]*1.25 + value[4] - value[5] + adjfg2m + adjfg3m + adjftm ) * value[14]
    totalDict[key] = total
print(totalDict)







