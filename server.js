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


//Functions that access the Python Scripts
 const python_search_track_artist = async function(tname,artist){

         let output = ''
         const python = spawn('python', ['-c', `import songdata; songdata.search_by_track_and_artist("${tname}", "${artist}")`])
         for await (const data of python.stdout) {
            console.log(`stdout from the child: ${data}`);
            const track_tuple = data.toString();
            //Spotipy returns single quoted objects, which JavaScript doesn't like.
             output = JSON.parse(track_tuple.trim().replace(/'/g,'"'));
          };
          return output
   
 }

 const python_get_song_atts = async function(uri){

   let output = ''
   console.log('proceeding with URI of')
   console.log(uri)
   const python = spawn('python', ['-c', `import songdata; songdata.get_atts('${uri}')`])
 
   for await (const data of python.stdout) {
      console.log(`stdout from the child: ${data}`);
      const atts = data.toString();
      console.log(typeof(atts));
      //Spotipy returns single quoted objects, which JavaScript doesn't like.
      output = JSON.parse(atts.replaceAll("'",'"'));
    };

    return output

}




 app.listen(port, () => {
   console.log(`server is listening on port ${port}...`)
 })

