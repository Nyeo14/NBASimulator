import sys
import os
from PlayerRoster import PlayerRoster

def main():
    teamRoster = {}
    roster = createPlayerRoster(teamRoster)
    print(roster)

if __name__ == "__main__":
	main()
