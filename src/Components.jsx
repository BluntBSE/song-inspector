//TODO: Switch LocalHosts for a variable (how can server.cjs get this over? Does Dotenv work in browser?)

import { useState, useRef, useEffect,} from 'react';
import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client'
import './test.js';
import {Test, ExeButton, InputField} from './Components/components.jsx'

export const SongObject = function(props){

    const [artistField, setArtistField] = useState('Rosalia')
    const [trackField, setTrackField] = useState('La Noche')
    const [artist, setArtist] = useState('Default Artist')
    const [trackURI, setTrackURI] = useState('2XIc1pqjXV3Cr2BQUGNBck')
    const [trackName, setTrackName] = useState('Default TrackName')
    const [albumName, setAlbumName] = useState('Default Album Name')
    const [albumIMG, setAlbumIMG] = useState('http://placekitten.com/180/200')
    /* SONG ATTRIBUTES */
    const [acousticness, setAcousticness] = useState(0.5)
    const [danceability, setDanceability] = useState(0.5)
    const [energy, setEnergy] = useState(0.5)
    const [instrumentalness, setInstrumentalness] = useState(0.5)
    const [liveness, setLiveness] = useState(0.5)
    const [speechiness, setSpeechiness] = useState(0.5)
    const [tempo , setTempo] = useState(120)
    const [valence , setValence] = useState(0.5)
    /*TARGET VALUES TODO: MOVE THESE TO A RECOMMENDATION CHILD COMPONENT*/ 
    const [tacousticness, setTAcousticness] = useState(0.5)
    const [tdanceability, setTDanceability] = useState(0.5)
    const [tenergy, setTEnergy] = useState(0.5)
    const [tinstrumentalness, setTInstrumentalness] = useState(0.5)
    const [tliveness, setTLiveness] = useState(0.5)
    const [tspeechiness, setTSpeechiness] = useState(0.5)
    const [ttempo , setTTempo] = useState(120)
    const [tvalence , setTValence] = useState(0.5)
    /* RECOMMENDATIONS */
    const [recommendations, setRecommendations] = useState([]);
    
   /* Handlers */
    const hArtistField = function(e){
        setArtistField(e.target.value);
    }

    const hTrackField = function(e){
            setTrackField(e.target.value);
    }

    //Spotify passes 'artists' array. This turns it into a string, adding commas and spaces as necesasry.
    const hArtist = function(arr){
        let strArtists = ''
        for (let i = 0; i<arr.length; i++){
            strArtists += arr[i].name
            if(i<arr.length-1){strArtists += ", "}
        }
        setArtist(strArtists);

    }

    const hTrackURI = function(str){
        setTrackURI(str)
    }

    const hTrackName = function(str){
        setTrackName(str);
    }

    const hAlbumName = function(){

    }

    const hAlbumIMG = function(url){
        setAlbumIMG(url)
    }

    
    
    const songProps = {
        artistField,
        hArtistField,
        trackField,
        hTrackField,
        artist,
        hArtist,
        trackURI,
        hTrackURI,
        trackName,
        hTrackName,
        albumName,
        hAlbumName,
        albumIMG,
        hAlbumIMG,
    }
//Do sliders really need the set init value functions?
    const sliderProps ={
        acousticness,
        setTAcousticness,
        danceability,
        setTDanceability,
        energy,
        setTEnergy,
        instrumentalness,
        setTInstrumentalness,
        liveness,
        setTLiveness,
        speechiness,
        setTSpeechiness,
        tempo,
        setTTempo,
        valence,
        setTValence,
    }


    const fetchSingleSongAtts= async function(URI){
        const answer = await fetch(`http://localhost:3000/attributes/${URI}`)
          .then(response => response.json())
          .then((data) => data)
          //index 0 == First response in search.
          console.log(answer)
          setAcousticness(answer.acousticness)
          console.log(answer.danceability)
          setDanceability(answer.danceability)
          setEnergy(answer.energy)
          setInstrumentalness(answer.instrumentalness)
          setLiveness(answer.liveness)
          setSpeechiness(answer.speechiness)
          setTempo(answer.tempo)
          setValence(answer.valence)
        }   


    const fetchSingleSongHTML = async function(){
        const answer = await fetch(`http://localhost:3000/search/${artistField}}/${trackField}`)
            .then(response => response.json())
            .then((data) => data)
            //index 0 == First response in search.
            const output = answer[0]
            console.log(output)
            hTrackURI(output.id)
            hArtist(output.artists)
            hTrackName(output.name)
            hAlbumIMG(output.album.images[1].url)
        }

/*     const fetchRecs = async function(target){
        const container = document.getElementById('recommendations')

        console.log(container);
        const recroot = container;
        const numberRecs = 10;
        const url = `http://localhost:3000/recommendations/${trackURI}/${tacousticness}/${tenergy}/${tdanceability}/${tliveness}/${tinstrumentalness}/${tspeechiness}/${tvalence}/${ttempo}`
       console.log(typeof(url))
        console.log(url)
        const answer = await fetch(url)
        .then((response)=>response.json())
        .then((data)=>data)

        //console.log(answer.tracks[1].external_urls)
        //TODO: Move recsroot to didmount
        let recsList = [];
        for(let i = 0; i<answer.tracks.length; i++){
            let propsObj = {...answer.tracks[i]}
            recsList.push(<Recommendation name={propsObj.name} link={propsObj.external_urls.spotify}/>)
        }

        recroot.render(recsList)
 
    } */

    
    const fetchRecs2 = async function(){
    
        const numberRecs = 10;
        const url = `http://localhost:3000/recommendations/${trackURI}/${tacousticness}/${tenergy}/${tdanceability}/${tliveness}/${tinstrumentalness}/${tspeechiness}/${tvalence}/${ttempo}`
       console.log(typeof(url))
        console.log(url)
        const answer = await fetch(url)
        .then((response)=>response.json())
        .then((data)=>data)

        //console.log(answer.tracks[1].external_urls)
        //TODO: Move recsroot to didmount
        let recsList = [];
        for(let i = 0; i<answer.tracks.length; i++){
            let propsObj = {...answer.tracks[i]}
            recsList.push(<Recommendation name={propsObj.name} key={i} link={propsObj.external_urls.spotify}/>)
        }

        setRecommendations(recsList);
 
    }



    useEffect(() => {
        fetchSingleSongAtts(trackURI)
        },[trackURI]);

    //On mount
    useEffect(() => {
        fetchSingleSongHTML()
        fetchSingleSongAtts(trackURI)
        //Would love an alternative to creating this root at mount idk.

        },[]);


  
    

    return(
    <div className='container-song'>
    
    <h1>Enter a song to explore 
    audio features and get tuned
    recommendations</h1>
    <InputField iText={trackField} subHead="Enter Song Name" handler = {songProps.hTrackField}/>
    <InputField iText={artistField} subHead="Enter Artist Name" handler = {songProps.hArtistField}/>
    <ExeButton text="Inspect Song" function={fetchSingleSongHTML}/>
    <h2>Now Inspecting</h2>
    <SongOutput songProps = {songProps} sliderProps = {sliderProps}/>
    <ExeButton artist = {artist} trackURI = {trackURI} text="Get Recommendations" function={fetchRecs2}/>
    <Recommendations id="recommendations" array={recommendations}/>
 
    </div>
    )
}


export const SongOutput = function(props){

    return(
        <div className = "container-song-output">
       <InspectedSong artist={props.songProps.artist} trackName={props.songProps.trackName} albumName={props.songProps.albumName} img={props.songProps.albumIMG}/>
        <h2>{props.songProps.artist}</h2>
        <h3>{props.songProps.trackURI}</h3>
        <AttSlider atype="Danceability" attribute={props.sliderProps.danceability} updater={props.sliderProps.setTDanceability} multiplier={100}/>
        <AttSlider atype="Acousticness" attribute={props.sliderProps.acousticness} updater={props.sliderProps.setTAcousticness} multiplier={100} />
        <AttSlider atype="Speechiness" attribute={props.sliderProps.speechiness} updater={props.sliderProps.setTSpeechiness} multiplier={100} />
        <AttSlider atype="Energy" attribute={props.sliderProps.energy} updater={props.sliderProps.setTEnergy} multiplier={100}/>
        <AttSlider atype="Instrumentalness" attribute={props.sliderProps.instrumentalness} updater={props.sliderProps.setTInstrumentalness} multiplier={100}/>
        <AttSlider atype="Liveness" attribute={props.sliderProps.liveness} updater={props.sliderProps.setTLiveness} multiplier={100}/>
        <AttSlider atype="Valence" attribute={props.sliderProps.valence} updater={props.sliderProps.setTValence} multiplier={100}/>
        </div>
    )

}


//Each of these props actually needs to be using state. 
export const InspectedSong = function(props){
    return(
    <div className = "conainer-inspected">
 
        <h3>{props.artist}</h3>
        <h4>Artist</h4>
        <img src = {props.img}></img>
        <h3>{props.trackName}</h3>
        <h4>Track</h4>
        <h3>{props.aname}</h3>
        <h4>Album</h4>
    </div>
    )
}

export const AttSlider = function(props){
    //Initial & target values. Multiplier is used because spotify returns many things on 0.0 - 1.0 scale, and some on other scales entirely. This translates it for HTML. Most are x100.
    const [initValue, setInitValue] = useState(props.attribute);
    const [curValue, setCurvalue] = useState(props.attribute);

    const onUpdate = (e) => {
        setCurvalue(e.target.value/props.multiplier);
       props.updater(e.target.value/props.multiplier);
     }  

     useEffect(() => {
        setInitValue(props.attribute);
        setCurvalue(props.attribute);
        },[props.attribute]);
   
    return(


    <div className="container-aslider">
        <div className="input-label">{props.atype}</div>
        <div className="layout-display">
            <div className="att-value-display">Original: {String(initValue)}</div>
            <div className="att-value-display">Target: {String(curValue)}</div>
        </div>
        <input type="range" min="1" max="100" value={String(curValue * props.multiplier)} className="aslider" id={props.id} onChange={onUpdate}></input>
        </div>

    )
}

export const Recommendations = function (props){
    return(
    <div className = "container-recommendations" id={props.id}>
        {props.array.map((el)=>{return el})}
      
    </div>
    )
}

export const Recommendation = function(props){
    return(
    <li>
    <a href={props.link}>
        {props.name}
    </a>
    </li>
    )
}

