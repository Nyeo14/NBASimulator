import sys
import os
from PlayerRoster import PlayerRoster

def main():
    roster = PlayerRoster()
    x = roster.createPlayerRoster()
    for value in x.values():
        for i in value:
            print("<option value=" + '"' + i[0] + " " + i[1] + "|" + i[3] + '"' + ">" + i[0] + " " + i[1] + "</option>")
    print(x)

if __name__ == "__main__":
	main()
