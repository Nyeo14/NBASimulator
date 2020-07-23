import requests
import json

#Roster - dictionary with keys for team abbrev and values as a list of players on each team
roster = {}

#used to creat newLink to iterate through pages
page = 1
linkStart = "https://www.balldontlie.io/api/v1/players?page="
linkEnd = "&per_page=100"

#gets number of total pages
getMeta = requests.get("https://www.balldontlie.io/api/v1/players?page=1&per_page=100").text
getMetaJson = json.loads(getMeta)
meta = getMetaJson["meta"]
numPages = meta["total_pages"]


while page < numPages:
    newLink = linkStart + str(page) + linkEnd

    response = requests.get(newLink).text
    playerList = json.loads(response)
    
    for player in playerList["data"]:
        playerInfo = player["team"]
        abbreviation = playerInfo["abbreviation"]
        name = player["first_name"] + " " + player["last_name"]
        if abbreviation in roster:
            roster[abbreviation].append(name)
        else:
            roster[abbreviation] = [name]
    page += 1
    
print(roster)
    


    
