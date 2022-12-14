/* SETUP SETUP SETUP */
const path = require('path')
const express = require('express')
const app = express();
const nodeFetch = require('node-fetch');

const { spawn } = require('child_process');
const { exec } = require('child_process');
//Read .env
require('dotenv').config()

const client_secret = process.env.CLI_SECRET
const client_id = process.env.CLI_ID

/* app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 */

app.use(function (req, res, next) {



  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});


let PORT;
process.env.STATUS ==='production'
? (PORT = process.env.PROD_PORT)
: (PORT = process.env.DEV_PORT)


app.listen(PORT, function() {
  console.log('Node app is running on port', PORT);
})


/* AUTHENTICATION AUTHENTICATION AUTHENTICATION */
const generateToken = async function(){

  let token = await nodeFetch('https://accounts.spotify.com/api/token', {
  method: 'POST',
  headers: {
      'Authorization':  'Basic ' +  Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  body: 'grant_type=client_credentials'
})
.then(response => {
   return response.json()
  })
.then(data => {
  return data
});

return token
};



/* ENDPOINTS ENDPOINTS ENDPOINTS */


app.get('/', (req, res)=>{
  console.log('received a request!')
  res.sendFile(path.resolve(__dirname, 'dist/index.html'))
  //console.log(myToken)
})

app.get('/shell', (req, res)=>{
  console.log('Hitting the shell')
  exec("ls -la", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
})


app.get('/recommendations/:trackid/:acousticness/:energy/:danceability/:liveness/:instrumentalness/:speechiness/:valence/:tempo/:genre', async (req, res)=>{
  console.log('og recs ran')
  const trackid = req.params.trackid
  const acousticness = req.params.acousticness
  const energy = req.params.energy
  const danceability = req.params.danceability
  const liveness = req.params.liveness
  const instrumentalness = req.params.instrumentalness
  const speechiness = req.params.speechiness
  const valence = req.params.valence
  const tempo = req.params.tempo
  const genre = req.params.genre
  console.log(genre);

  let att_kwargs = {};
  att_kwargs['target_acousticness']=acousticness
  att_kwargs['target_danceability']=danceability
  att_kwargs['target_energy']=energy
  att_kwargs['target_instrumentalness']=instrumentalness
  att_kwargs['target_liveness']=liveness
  att_kwargs['target_speechiness']=speechiness
  att_kwargs['target_tempo']=tempo
  att_kwargs['target_valence']=valence

  console.log(att_kwargs);

  let result = (await getRecs(trackid,att_kwargs,genre))
 
  res.send(result)

})


app.get('/attributes/:uri', async (req, res)=>{
  console.log("attributes request received")
  const uri = req.params.uri;
  //console.log(uri);
  let result = await getSongAttributes(uri)
  res.send(result);
})


app.get('/search/:artist/:track', async (req, res)=>{
  const artist = req.params.artist;
  const track = req.params.track;
  console.log(artist + 'and' + track);
  let result = await searchByTrackAndArtist(artist,track);

  res.send(result);
})


/* ROUTES ROUTES ROUTES */
app.get('/genres', async (req, res)=>{
  console.log('genres hit')
  let result = await getGenres();
  res.send(result)
})


/* GETTERS GETTERS GETTERS */



const searchByTrackAndArtist = async function(artist,trackName,limit=10,offset=0){
const tokenObj = await generateToken();
const token = tokenObj.access_token;
const base = `https://api.spotify.com/v1/search?q=${trackName} ${artist}&type=track&limit=${limit}&offset=${offset}`
//const params = new URLSearchParams({}).toString();
const url = base /* + params; */

let output = await nodeFetch(url,{method: 'get', headers:{
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}})
.then((response)=>response.json())
.then((data)=> data)

return output.tracks.items

/* 
Sample Return:
{
  href: 'https://api.spotify.com/v1/search?query=La+Noche+De+Anoche+Rosalia&type=track&offset=0&limit=1',
  
  items: [
    {
      album: [Object],
      artists: [Array],
      available_markets: [Array],
      disc_number: 1,
      duration_ms: 203200,
      explicit: false,
      external_ids: [Object],
      external_urls: [Object],
      href: 'https://api.spotify.com/v1/tracks/2XIc1pqjXV3Cr2BQUGNBck',
      id: '2XIc1pqjXV3Cr2BQUGNBck',
      is_local: false,
      name: 'LA NOCHE DE ANOCHE',
      popularity: 83,
      preview_url: 'https://p.scdn.co/mp3-preview/d843fb10f6c38bbe76680b47e8679bbe31650c19?cid=67f7152ee71e474a912d1d11e106895d',
      track_number: 5,
      type: 'track',
      uri: 'spotify:track:2XIc1pqjXV3Cr2BQUGNBck'
    }


    
  limit: 1,
  next: 'https://api.spotify.com/v1/search?query=La+Noche+De+Anoche+Rosalia&type=track&offset=1&limit=1',
  offset: 0,
  previous: null,
  total: 957
} */

}


const getSongAttributes = async function (URI){
  
  const tokenObj = await generateToken()
  const token = tokenObj.access_token
  const url = `https://api.spotify.com/v1/audio-features/${URI}`

  let output = await nodeFetch(url,{headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }})
  .then((response) => response.json())
  .then((data)=>data)
 // console.log(output);
  return output
  
}

const getGenres = async function (){
  
  const tokenObj = await generateToken()
  const token = tokenObj.access_token
  const url = `https://api.spotify.com/v1/recommendations/available-genre-seeds`

  let output = await nodeFetch(url,{headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }})
  .then((response) => response.json())
  .then((data)=>data)
 // console.log(output);
  return output
  
}

const generateKwargString = function(kwargObj){
    const output = new URLSearchParams(kwargObj).toString();
    return output;
  }



const getRecs = async function (URI=`none`, kwargs, genre=`none`){
  
  const tokenObj = await generateToken()
  const token = tokenObj.access_token
  kwargStr = generateKwargString(kwargs)
  let genreStr = ``;
  if(genre != `none`){

    genreStr = `seed_genres=${genre}&`
  }

  let URIstr = ``;
  if(URI!=`none`){
    URIstr = `seed_tracks=${URI}&`
  }

  const url = `https://api.spotify.com/v1/recommendations/?${URIstr}${genreStr}${kwargStr}`
  //const test_url =`https://api.spotify.com/v1/recommendations/?seed_tracks=2XIc1pqjXV3Cr2BQUGNBck&target_acousticness=0.5`
  console.log(url)
  let output = await nodeFetch(url,{headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }})
  .then((response) => response.json())
  .then((data)=>data)
  return output

};



