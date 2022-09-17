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


print('Program ran')
scope = "user-library-read"
cid = '67f7152ee71e474a912d1d11e106895d'
cscr = 'eb31a88f292140718f2b3d26d96ffc7b'
client_credentials_manager = SpotifyClientCredentials(client_id=cid, client_secret=cscr)

sp = spotipy.Spotify(client_credentials_manager = client_credentials_manager)

def search_by_name_and_artist(name,artist):
    track_tuples = []
    track_results = sp.search(q="name:"+name+",artist:"+artist, type='track', limit=1,offset=0)
    for t in track_results['tracks']['items']:
        track_tuples.append((t['name'],t['id']))
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
print('Enter artist name \n')
input_artist=input('')
print('Enter song title from this artist \n')
input_title=input('')
selected_tracks = search_by_name_and_artist(input_title,input_artist)
print('We found the following tracks \n' + str(selected_tracks))
print('Getting attributes for the first track')

selected_track = selected_tracks[0]
print(selected_track[1])
cur_atts = get_atts(selected_track[1])

att_kwargs = {
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


print(cur_atts)



print('Set target acousticness (0.00 to 1.00). Your current track has an acousticness of ' + str(cur_atts[0]['acousticness']))
att_kwargs['target_acousticness']=float(input(''))

print('Set target danceability(0.00 to 1.00). Your current track has a danceability of ' + str(cur_atts[0]['danceability']))
att_kwargs['target_danceability']=float(input(''))

print('Set target energy (0.00 to 1.00). Your current track has a energy of ' + str(cur_atts[0]['energy']))
att_kwargs['target_energy']=float(input(''))

print('Set target instrumentalness (0.00 to 1.00). Your current track has an instrumentalness of ' + str(cur_atts[0]['instrumentalness']))
att_kwargs['target_instrumentalness']=float(input(''))

print('Set target liveness (0.00 to 1.00). Your current track has a liveness of ' + str(cur_atts[0]['liveness']))
att_kwargs['target_liveness']=float(input(''))

print('Set target loudness in DB (typically -60.00 to 0.00). Your current track has a energy of ' + str(cur_atts[0]['loudness']))
att_kwargs['target_loudness']=float(input(''))

print('Set target speechiness (0.00 to 1.00). Your current track has a speechiness of ' + str(cur_atts[0]['speechiness']))
att_kwargs['target_speechiness']=float(input(''))

print('Set target tempo in BPM. Your current track has a tempo of ' + str(cur_atts[0]['tempo']))
att_kwargs['target_tempo']=float(input(''))

print('Set target valence <mood> (0.00 (sad) to 1.00 (happy)). Your current track has a valence of ' + str(cur_atts[0]['valence']))
att_kwargs['target_valence']=float(input(''))

print('Your new target features are:')
print(att_kwargs)


print('Finding recommendations using ' + selected_track[0] + ' and chosen attributes')

print(get_recs([selected_track[1]],att_kwargs))





##Omitted: Key, mode, popularity, time signature
##reclimit = 10
##recs = sp.recommendations(seed_tracks=[selected_track], limit=reclimit,country=None, **kwargs)


