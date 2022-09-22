const React = require('React')
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
app.use(cors({
    origin:'*'
}))
const port = 3000






app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'))
  });

app.listen(port, () => {
  console.log(`Site started on ${port}`)
})


let console_log_it = function(){
    console.log("I console logged!")
}