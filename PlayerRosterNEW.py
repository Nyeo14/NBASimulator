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
                team = player["team"]
                abbreviation = team["abbreviation"]
                playerID = player["id"]
                position = player["position"]
                if position != "":
                    time.sleep(1)
                    playerValue = self.getPlayerStats(valueDict, str(playerID), playerValue)
                name = [player["first_name"], player["last_name"], player["id"], playerValue]
                if playerValue > 0:
                    if abbreviation in self.__teamRoster:
                        self.__teamRoster[abbreviation].append(name)
                        # print(name)
                    else:
                        self.__teamRoster[abbreviation] = [name]
                        # print(name)
            page += 1   

        #print(self.__teamRoster)
        return self.__teamRoster

    #I CAN SPLIT INTO FUNCTION AND CLEAN UP LATER IT BE LIKE TO CALCULATE THE RECORD OF EACH TEAM ALL CAPS NO FICTION
    def getRecords(self, calculatedRosters: dict):
        page = 1
        linkStart = "https://www.balldontlie.io/api/v1/games?seasons[]=2019&postseason=false&page="
        linkEnd = "&per_page=100"
        getMeta = requests.get("https://www.balldontlie.io/api/v1/games?seasons[]=2019&postseason=false&page=1&per_page=100").text
        getMetaJson = json.loads(getMeta)
        meta = getMetaJson["meta"]
        numPages = meta["total_pages"]

        predictedRecord = {}
        getTeams = requests.get("https://www.balldontlie.io/api/v1/teams").text
        getTeamsJson = json.loads(getTeams)
        for team in getTeamsJson["data"]:
            predictedRecord[team["abbreviation"]] = [0, 0]

        while page <= numPages:
            newLink = linkStart + str(page) + linkEnd
            response = requests.get(newLink).text
        
            allGamesJson = json.loads(response)
            for game in allGamesJson["data"]:
                homeData = game["home_team"]
                visitorData = game["visitor_team"]
                homeTeam = calculatedRosters[homeData["abbreviation"]]
                visitorTeam = calculatedRosters[visitorData["abbreviation"]]
                homeScore = 0
                visitorScore = 0
                for player in homeTeam:
                    homeScore += player[3]
                for player in visitorTeam:
                    visitorScore += player[3]
                if homeScore > visitorScore:
                    predictedRecord[homeData["abbreviation"]][0] = predictedRecord[homeData["abbreviation"]][0] + 1
                    predictedRecord[visitorData["abbreviation"]][1] = predictedRecord[visitorData["abbreviation"]][1] + 1
                else:
                    predictedRecord[visitorData["abbreviation"]][0] = predictedRecord[visitorData["abbreviation"]][0] + 1
                    predictedRecord[homeData["abbreviation"]][1] = predictedRecord[homeData["abbreviation"]][1] + 1
            page += 1
        return predictedRecord


    # GETS THE STATS AND OVERALL VALUE OF A PLAYER BASED ON ID
    def getPlayerStats(self, valueDict: dict, player_id: str, playerValue) -> float:
        statDict = {}

        # Getting information from API (MAY NEED TO GET FROM 2017 AS WELL TO ACCOUNT FOR ROOKIES)
        requestString = "https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]="
        requestString = requestString + player_id
        # response = requests.get("https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=448")
        response = requests.get(requestString)
        playerStats = response.json()

        # Creating a dictionary with simple stats {id: points, assists, rebounds, fg%}
        for player in playerStats["data"]:
            statDict[player["player_id"]] = [player["ast"], player["oreb"], player["dreb"], player["stl"], player["blk"], player["turnover"], player["fg_pct"], player["fgm"], player["fga"], player["fg3m"], player["fg3a"], player["fg3_pct"], player["ft_pct"], player["ftm"], player["games_played"]]

        # Calculate overall player value (NEED FUNCTION TO CALCULATE THIS)
        playerValue = self.calculatePlayerValue(statDict)
        
        return playerValue



    # Calculates a player's overall value
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
