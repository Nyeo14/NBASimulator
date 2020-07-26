import sys
import os
from PlayerRosterNEW import PlayerRoster

def main():
    roster = PlayerRoster()
    x = roster.createPlayerRoster()
    output = roster.getRecords(x)
    print(output)
    

if __name__ == "__main__":
	main()
