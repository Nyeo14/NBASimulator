# returns a dictionary {position: [player, id, overallpoints]}
import requests
import json
import time

class PlayerRoster():
    def __init__(self):
        self.__teamRoster = {}


    # CREATES THE ROSTER (A DICTIONARY) {TEAM: PLAYERS}
    def createPlayerRoster(self):
        # used to create newLink to iterate through pages
        page = 1
        linkStart = "https://www.balldontlie.io/api/v1/players?page="
        linkEnd = "&per_page=100"

        # gets number of total pages
        getMeta = requests.get("https://www.balldontlie.io/api/v1/players?page=1&per_page=100").text
        getMetaJson = json.loads(getMeta)
        meta = getMetaJson["meta"]
        numPages = meta["total_pages"]

        # adds players to dictionary {team: name id, name id}
        while page <= numPages:
            valueDict = {}
            newLink = linkStart + str(page) + linkEnd

            response = requests.get(newLink).text
            playerList = json.loads(response)
            

            for player in playerList["data"]:
                playerValue = 0
                playerID = player["id"]
                position = player["position"][:1]
                if position != "":
                    time.sleep(1)
                    playerValue = self.getPlayerStats(valueDict, str(playerID), playerValue)
                if position == "G":
                    playerValue = playerValue * 1.024
                elif position == "F":
                    playerValue = playerValue * 1.04
                elif position == "C":
                    playerValue = playerValue * .8554
                playerValue += 2000
                if playerValue > 4000:
                    playerValue = 4000
                playerValue = int(playerValue)
                name = [player["first_name"], player["last_name"], player["id"], str(playerValue)]
                # name = "<option value=" + '"' + player['first_name'] + " " + player['last_name'] + "|" + str(playerValue) + '"' + ">" + player['first_name'] + " "+ player['last_name'] + "</option>"
                if playerValue > 2050:
                    if position in self.__teamRoster:
                        self.__teamRoster[position].append(name)
                        # print(name)
                    else:
                        self.__teamRoster[position] = [name]
                        # print(name)
                    #print(self.__teamRoster)
            page += 1   

        for value in self.__teamRoster.values():
            # value = sorted(value, key=lambda x: x[1])
            value.sort(key=lambda x: x[1])
        
        #with open('playerRoster.txt', 'w') as outfile:
        #  outfile.write(json.dumps(self.__teamRoster))
        return self.__teamRoster



    # GETS THE STATS AND OVERALL VALUE OF A PLAYER BASED ON ID
    def getPlayerStats(self, valueDict: dict, player_id: str, playerValue) -> float:
        statDict = {}

        # Getting information from API (MAY NEED TO GET FROM 2017 AS WELL TO ACCOUNT FOR ROOKIES)
        requestString = "https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]="
        requestString = requestString + player_id
        # response = requests.get("https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=448")
        response = requests.get(requestString)
        playerStats = response.json()

        # Creating a dictionary with simple stats {id: points, assists, rebounds, fg%}
        for player in playerStats["data"]:
            if player["player_id"] == 115 or player["player_id"] == 27 or player["player_id"] == 424 or player["player_id"] == 17 or player["player_id"] == 357 or player["player_id"] == 274 or player["player_id"] == 237 or player["player_id"] == 467 or player["player_id"] == 192 or player["player_id"] == 57
                continue
            statDict[player["player_id"]] = [player["ast"], player["oreb"], player["dreb"], player["stl"], player["blk"], player["turnover"], player["fg_pct"], player["fgm"], player["fga"], player["fg3m"], player["fg3a"], player["fg3_pct"], player["ft_pct"], player["ftm"], player["games_played"]]
        
        modRequestString = "https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]="
        modRequestString = modRequestString + player_id
        modResponse = requests.get(modRequestString)
        modPlayerStats = modResponse.json()
        
        # Calculate overall player value
        playerValue = self.calculatePlayerValue(statDict)
        
        return int(playerValue)



    # CALCULATES A PLAYER'S OVERALL VALUE
    def calculatePlayerValue(self, statDict):
        leagueAvg2PtPct = .523
        leagueAvg3PtPct = .357
        leagueAvgFtPct = .771
        total = 0
        for value in statDict.values():
            try:
                fg2_pct = (value[7]-value[9]) / (value [8] - value[10])
            except ZeroDivisionError:
                fg2_pct = value[11]
            fg2m = value[7] - value[9]
            adjfg2m = (1+(fg2_pct - leagueAvg2PtPct)) * fg2m
            adjfg3m = (1+(value[11]-leagueAvg3PtPct)) * value[9]
            adjftm =  (1+(value[12]-leagueAvgFtPct)) * value[13]
            total = (value[0]*0.75 + value[1]*0.95 + value[2]*0.25 + value[3]*1.25 + value[4] - value[5] + adjfg2m + adjfg3m + adjftm ) * value[14]

        return total
