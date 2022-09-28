console.log('Index ran');
const express = require('express');
const path = require('path');
const app = express()
const port = 3000
const spawn = require('child_process').spawn
//Static files
app.use(express.static('./public'))


//Endpoints
app.get('/', (req, res)=>{
   res.sendFile(path.resolve(__dirname, 'public/index.html'))
})


app.get('/search/:artist/:track', async (req, res)=>{
   const artist = req.params.artist;
   const track = req.params.track;
   let result = await python_search_track_artist(track,artist);

   res.send(result);
})


app.get('/attributes/:uri', async (req, res)=>{
   const uri = req.params.uri;
   //console.log(uri);
   let result = await python_get_song_atts(uri);
   console.log(typeof(result));
  
   res.send(result);
})
//Recommendations
app.get('/recommendations/:trackid/:acousticness/:energy/:danceability/:liveness/:instrumentalness/:speechiness/:valence/:tempo', async (req, res)=>{
   const trackid = req.params.trackid;
   const acousticness = req.params.acousticness;
   const energy = req.params.energy;
   const danceability = req.params.danceability;
   const liveness = req.params.liveness;
   const instrumentalness = req.params.instrumentalness;
   const speechiness = req.params.speechiness;
   const valence = req.params.valence;
   const tempo = req.params.tempo;
   //console.log(uri);
   let att_kwargs = {};
   att_kwargs['target_acousticness']=acousticness
   att_kwargs['target_danceability']=danceability
   att_kwargs['target_energy']=energy
   att_kwargs['target_instrumentalness']=instrumentalness
   att_kwargs['target_liveness']=liveness
   att_kwargs['target_speechiness']=speechiness
   att_kwargs['target_tempo']=tempo
   att_kwargs['target_valence']=valence
   console.log("Attempting with");
   
   console.log(att_kwargs);
   let string_kwargs = JSON.stringify(att_kwargs);
   console.log(string_kwargs)
   
   let result = await python_get_song_recs(trackid,string_kwargs);

  console.log("Sending!")
  console.log(result);
   res.send(result);
})


const python_get_song_recs = async function (trackid,att_kwargs){
 let output = '';
 const python = spawn('python', ['-c', `import songdata; songdata.get_recs(['${trackid}'], ${att_kwargs})`])
 for await (const data of python.stdout) {
   console.log(`stdout from the recs child: ${data}`);
   output = data.toString();
   //Spotipy returns single quoted objects, which JavaScript doesn't like.
 };

 console.log("end of get_song_recs")

 //console.log(output);
 let rogue_quotes = output;

 
 //TODO -- Fid a better way to do this please.
 //Rogue quotes is a string representing array. You can probably reliably split on "/', /". Get it JSON parseable.

 function looseJsonParse(obj) {
   console.log("This is the loose")
   return Function(`"use strict";return (${obj})`)();
 }

 let maybe_parsed = looseJsonParse(rogue_quotes);

 //console.log(maybe_parsed);

 let split_quotes=rogue_quotes.split('[');
 split_quotes.shift();
 split_quotes.shift();

 json = { ...split_quotes };


 return maybe_parsed;
}
//Functions that access the Python Scripts
 const python_search_track_artist = async function(tname,artist){

         let output = ''

         const python = spawn('python', ['-c', `import songdata; songdata.search_by_track_and_artist("${tname}", "${artist}")`])
         for await (const data of python.stdout) {
            console.log(`stdout from the search child: ${data}`);
            const track_tuple = data.toString();
            //Spotipy returns single quoted objects, which JavaScript doesn't like.
     
            let trimmed = track_tuple.trim();
            function looseJsonParse(obj) {
               console.log("This is the loose parse in search")
               return Function(`"use strict";return (${obj})`)();
             }
             console.log("My tuple output is:")
             console.log(trimmed);
             output = looseJsonParse(trimmed);
          };
          return output
   
 }


 const python_get_song_atts = async function(uri){

   let output = ''
   console.log('proceeding with URI of')
   console.log(uri)
   const python = spawn('python', ['-c', `import songdata; songdata.get_atts('${uri}')`])
 
   for await (const data of python.stdout) {
      console.log(`stdout from the atts child: ${data}`);
      const atts = data.toString();
      //console.log(typeof(atts));
      //Spotipy returns single quoted objects, which JavaScript doesn't like.
      output = JSON.parse(atts.replaceAll("'",'"'));
    };

    return output

}


 app.listen(port, () => {
   console.log(`server is listening on port ${port}...`)
 })

