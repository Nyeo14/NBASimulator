# test on random API
import requests

response = requests.get("http://api.open-notify.org/iss-now.json")
# Print the status code of the response.
print("The ISS is currently located at :")
print(response.content)
