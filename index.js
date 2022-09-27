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
   const result = await python_search_track_artist(track,artist);
   console.log(result);


   res.end(`${result}`);
})


//Make not blocking later if necessary. Spawn might not be blocking at all.
//Need to set up an API that actually calls that part...

 const python_search_track_artist = async function(tname,artist){
   

         let output = ''
         const python = spawn('python', ['-c', `import songdata; songdata.search_by_track_and_artist("La Noche de Anoche", "Rosalia")`])
         for await (const data of python.stdout) {
            console.log(`stdout from the child: ${data}`);
            const track_tuple = data.toString();
            /*  console.log(track_tuple) This one works*/
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
/* 

 var dataToSend;
 // spawn new child process to call the python script
 const python = spawn('python', ['-c', `import simple; simple.multiply_nums(${var_one},${var_two}); quit()`]);
 //console.log(python);
 // collect data from script
 python.stdout.on('data', function (data) {
    console.log(data)
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
  console.log(dataToSend);
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 console.log(dataToSend)
 // send data to browser

 });
 */

