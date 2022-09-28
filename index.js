console.log('Index ran');
const express = require('express');
const { type } = require('os');
const path = require('path');

const app = express()
const port = 3000

const spawn = require('child_process').spawn

app.use(express.static('./public'))

app.get('/', (req, res)=>{
   res.sendFile(path.resolve(__dirname, 'public/index.html'))
})


app.get('/search/:artist/:track', async (req, res)=>{
   const artist = req.params.artist;
   const track = req.params.track;
   let result = await python_search_track_artist(track,artist);
   console.log(typeof(result));
   console.log(result);
   trimmed_result = result.trim();
   formatted_result = result.replace(/'/g,'"');
   json_result = JSON.parse(formatted_result);

   res.send(json_result);
})

app.get('/attributes/:uri', async (req, res)=>{
   const uri = req.params.uri;
   //console.log(uri);
   let result = await python_get_song_atts(uri);
   console.log(typeof(result));
  
   res.send(result);
})


 const python_search_track_artist = async function(tname,artist){

         let output = ''
         const python = spawn('python', ['-c', `import songdata; songdata.search_by_track_and_artist("${tname}", "${artist}")`])
         for await (const data of python.stdout) {
            console.log(`stdout from the child: ${data}`);
            const track_tuple = data.toString();
             output = track_tuple;
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
      output = JSON.parse(atts.replaceAll("'",'"'));
    };
    console.log('About to return')
    console.log(output)
    return output

}




 async function asyncSearch(tname, artist){
   const output = await python_search_track_artist(tname, artist);
   //console.log(output);
   return output;

 }




 app.listen(port, () => {
   console.log(`server is listening on port ${port}...`)
 })

