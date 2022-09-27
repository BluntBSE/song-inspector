console.log('Index ran');
const express = require('express');
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



 async function asyncSearch(tname, artist){
   const output = await python_search_track_artist(tname, artist);
   //console.log(output);
   return output;

 }




 app.listen(5000, () => {
   console.log('server is listening on port 5000....')
 })

