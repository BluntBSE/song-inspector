##HTTP Request
##Log in to Spotify
##Enter a chosen attribute
##Enter a chosen value
##Return 10 songs that have that attribute at that value. Put those songs into memory.
##Have an option to return 10 more songs.

##Getting attributes by name would be another function.

import json
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


scope = "user-library-read"
cid = '67f7152ee71e474a912d1d11e106895d'
cscr = 'eb31a88f292140718f2b3d26d96ffc7b'
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=cscr)

sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)



def search_by_track_and_artist(name,artist):
    track_tuples = []
    track_results = sp.search(q="name:"+name+", "+artist, limit=1,offset=0)
    for t in track_results['tracks']['items']:
        track_tuples.append([t['name'],t['id']])
    print(track_tuples)
    return track_tuples


def get_atts(track_id):
    return sp.audio_features(track_id)

def get_recs(track_id,kwargs):
    recs = []
    raw_recs = sp.recommendations(seed_artists=None,seed_genres=None,seed_tracks=track_id,limit=10,country=None,**kwargs)
    print(type(raw_recs))
    print(type(raw_recs['tracks']))
    for i in range(0,len(raw_recs['tracks'])):
        recs.append(raw_recs['tracks'][i]['name'])
    return recs


##Interactive Portion


""" att_kwargs = {
    'target_acousticness':0,
    'target_danceability':0,
    'target_energy':0,
    'target_instrumentalness':0,
    'target_liveness':0,
    'target_loudness':0,
    'target_speechiness':0,
    'target_tempo':0,
    'target_valence':0,
}
 """