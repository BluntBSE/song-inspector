import { useState } from 'react'
import reactLogo from './assets/react.svg'
//import {SongObject} from './SongObject.jsx'
import {SongObject} from './Components/SongObject'
import './App.css'
import {Moo} from './Components/test.jsx'

function App(){
return(
  <div className="App">
  <SongObject/>
  <Moo/>
  </div>
)




}


export default App
