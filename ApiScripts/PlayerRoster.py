# CREATES A DICTIONARY {position: [player, id, overallpoints]}
import requests
import json
import time

class PlayerRoster():
    def __init__(self):
        self.__teamRoster = {}

    # CREATES THE ROSTER (A DICTIONARY) {TEAM: PLAYERS}
    def createPlayerRoster(self):

        # Accessing balldontlie API
        page = 1
        linkStart = "https://www.balldontlie.io/api/v1/players?page="
        linkEnd = "&per_page=100"
        getMeta = requests.get("https://www.balldontlie.io/api/v1/players?page=1&per_page=100").text
        getMetaJson = json.loads(getMeta)
        meta = getMetaJson["meta"]
        numPages = meta["total_pages"]

        # Adds players to dictionary {position: [[first name, last name, id, value]]
        while page <= 3:
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
                if playerValue >= 2050:
                    if position in self.__teamRoster:
                        self.__teamRoster[position].append(name)
                    else:
                        self.__teamRoster[position] = [name]
            page += 1   

        for value in self.__teamRoster.values():
            value.sort(key=lambda x: x[1])

        #with open('playerRoster.json', 'w') as outfile:
        #    outfile.write(json.dumps(self.__teamRoster))

        return self.__teamRoster



    # GETS THE STATS AND OVERALL VALUE OF A PLAYER BASED ON ID
    def getPlayerStats(self, valueDict: dict, player_id: str, playerValue) -> float:
        statDict = {}

        # Accessing balldontlie API
        requestString = "https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]="
        requestString = requestString + player_id
        response = requests.get(requestString)
        playerStats = response.json()

        # Creating a dictionary with players' stats {id: ast, oreb, dreb, stl, blk, turnover, fgpct, fgm, fga, fg3m, fg3a, fg3pct, ftpct, ftm, gamesplayed}
        for player in playerStats["data"]:
            #115 = Stephen Curry, 27 = Lonzo, 424 = JR Smith, 17 = Carmelo Anthony, 357 = Victor Oladipo, 274 = Kawhi Leonard, 237 = Lebron James, 467 = John Wall, 192 = James Harden, 57 = Devin Booker
            if player["player_id"] in [115, 27, 424, 17, 357, 274, 237, 467, 192, 57]:
                insertData = False
                modRequestString = "https://www.balldontlie.io/api/v1/season_averages?season="
                modRequestString2 = "&player_ids[]="
                modRequestStringYear = 0
                if player["player_id"] == 115:
                    modRequestStringYear = 2015
                    insertData = True
                elif player["player_id"] == 27:
                    modRequestStringYear = 2019
                    insertData = True
                elif player["player_id"] == 424:
                    modRequestStringYear = 2012
                    insertData = True
                elif player["player_id"] == 17:
                    modRequestStringYear = 2012
                    insertData = True
                elif player["player_id"] == 357:
                    modRequestStringYear = 2017
                    insertData = True
                elif player["player_id"] == 274:
                    modRequestStringYear = 2018
                    insertData = True
                elif player["player_id"] == 237:
                    modRequestStringYear = 2012
                    insertData = True
                elif player["player_id"] == 467:
                    modRequestStringYear = 2016
                    insertData = True
                elif player["player_id"] == 192:
                    modRequestStringYear = 2018
                    insertData = True
                elif player["player_id"] == 52:
                    modRequestStringYear = 2018
                    insertData = True
                if insertData:
                    modRequestString = modRequestString + str(modRequestStringYear) + modRequestString2 + str(player["player_id"])
                    modResponse = requests.get(modRequestString)
                    modPlayerStats = modResponse.json()
                    player = modPlayerStats["data"][0]
                    statDict[player["player_id"]] = [player["ast"], player["oreb"], player["dreb"], player["stl"], player["blk"], player["turnover"], player["fg_pct"], player["fgm"], player["fga"], player["fg3m"], player["fg3a"], player["fg3_pct"], player["ft_pct"], player["ftm"], player["games_played"]]
                continue
            statDict[player["player_id"]] = [player["ast"], player["oreb"], player["dreb"], player["stl"], player["blk"], player["turnover"], player["fg_pct"], player["fgm"], player["fga"], player["fg3m"], player["fg3a"], player["fg3_pct"], player["ft_pct"], player["ftm"], player["games_played"]]
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
            total = (value[0]*0.75 + value[1]*0.75 + value[2]*0.25 + value[3]*1.25 + value[4] - value[5] + adjfg2m + adjfg3m + adjftm ) * value[14]
        return total
