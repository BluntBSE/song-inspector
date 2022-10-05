# -*- coding: utf-8 -*-

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


##Rename to single...
##By the time you receive the string, it's already wrong.
def search_by_track_and_artist(name,artist):
    track_object = {}
    track_object['artists']=[]
    
    track_results = sp.search(q="name:"+name+", "+artist, limit=1,offset=0)
    print(track_results)
    for t in track_results['tracks']['items']:
        track_object['name']=t['name']
        track_object['id']=t['id']
        for a in t['artists']:
            track_object['artists'].append(a['name'])
    print(track_object)
    return track_object


"""     def search_by_track_and_artist(name,artist):
    track_tuples = []
    track_results = sp.search(q="name:"+name+", "+artist, limit=1,offset=0)
    for t in track_results['tracks']['items']:
        to_insert = []
        to_insert.append(t['name'])
        to_insert.append(t['id'])
        for a in t['artists']:
            to_insert.append(a['name'])
    track_tuples.append(to_insert)    
    print(track_tuples)
    return track_tuples
 """

def get_atts(track_id):
    print(sp.audio_features(track_id))
    return sp.audio_features(track_id)

def get_recs(track_id,kwargs):
    recs = []
    raw_recs = sp.recommendations(seed_artists=None,seed_genres=None,seed_tracks=track_id,limit=10,country=None,**kwargs)
    for i in range(0,len(raw_recs['tracks'])):
        ##print(raw_recs['tracks'][i])
        recs.append([raw_recs['tracks'][i]['name'],raw_recs['tracks'][i]['external_urls']['spotify']])

    print(recs)
 
##Kwargs example

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