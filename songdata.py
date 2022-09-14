##HTTP Request
##Log in to Spotify
##Enter a chosen attribute
##Enter a chosen value
##Return 10 songs that have that attribute at that value. Put those songs into memory.
##Have an option to return 10 more songs.

##Getting attributes by name would be another function.

import json
import urllib   
from urllib.parse import urlencode  
import webbrowser
from flask import Flask

print('Program ran')

client_id = '67f7152ee71e474a912d1d11e106895d'
client_secret = 'eb31a88f292140718f2b3d26d96ffc7b'
scopes = 'user-read-private user-read-email'
provider_url = 'https://accounts.spotify.com/authorize'

##Check on redirect_uri later.
## Do I need redirect_uri? This is probably where the app lives.
params = urlencode({
    'client_id':client_id,
    'scope':['user-read-email', 'user-follow-read'],
    'redirect_uri': 'http://127.0.0.1:3000/spotify/callback',
    'response_type': 'code'
})

auth_url = provider_url + '?' + params
print(auth_url)


##

app = Flask(__name__)

@app.route("/")
def spotify_callback():
    return "You finally called me back!"


