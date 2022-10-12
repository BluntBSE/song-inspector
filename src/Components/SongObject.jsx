//TODO: Switch LocalHosts for a variable (how can server.cjs get this over? Does Dotenv work in browser?)

import { useState, useRef, useEffect,} from 'react';
import {ExeButton, InputField, Recommendation, Recommendations, InspectedSong, AttSlider, SongOutput, GenreDropdown} from './components.jsx'

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
    const [genres, setGenres] = useState(['Test Genres'])
    const [tgenre, setTGenre] = useState('none')
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

    const hAlbumName = function(str){
        setAlbumName(str)
    }

    const hAlbumIMG = function(url){
        setAlbumIMG(url)
    }

    const hGenre = function(e){
        setTGenre(e.target.value)
    }

       /* GETTER FUNCTIONS */


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
            hAlbumName(output.album.name)
        }

    
    const fetchRecs2 = async function(){

        //If a user is exploring by genre, track URI is set to 'none'
        let trackURIstr = ``
        if(tgenre != `none`){
            trackURIstr = `none`
        }else{
            trackURIstr = trackURI
        }

        const numberRecs = 10;
        const url = `http://localhost:3000/recommendations/${trackURIstr}/${tacousticness}/${tenergy}/${tdanceability}/${tliveness}/${tinstrumentalness}/${tspeechiness}/${tvalence}/${ttempo}/${tgenre}`
        console.log(url)
        const answer = await fetch(url)
        .then((response)=>response.json())
        .then((data)=>data)

        console.log(answer)
        let recsList = [];
        for(let i = 0; i<answer.tracks.length; i++){
            let propsObj = {...answer.tracks[i]}
            recsList.push(<Recommendation name={propsObj.name} artists={propsObj.album.artists} key={i} link={propsObj.external_urls.spotify}/>)
            console.log(propsObj.album.artists);
        }

        setRecommendations(recsList);
 
    }


    const fetchGenres = async function(){
        const url = `http://localhost:3000/genres`;
        const answer = await fetch(url).then((response)=>response.json()).then((data)=>data)
        console.log(answer)
        setGenres(answer.genres)

    }

    /*TIMES WE UPDATE STATE*/



    useEffect(() => {
        fetchSingleSongAtts(trackURI)
        },[trackURI]);

    //On mount
    useEffect(() => {
        fetchSingleSongHTML()
        fetchSingleSongAtts(trackURI)
        fetchGenres()
        },[]);



    
    
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
        fetchRecs2
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


 
  
    

    return(
    <div className='container-song'>
    <div className='top-header card'>
    <h1>Enter a song to explore 
    audio features and get tuned
    recommendations</h1>
    </div>
    <div className="container-input card">
    <InputField iText={trackField} subHead="Enter Song Name" handler = {songProps.hTrackField}/>
    <InputField iText={artistField} subHead="Enter Artist Name" handler = {songProps.hArtistField}/>
    <ExeButton text="Inspect Song" function={fetchSingleSongHTML}/>
    </div>
    
  
    <SongOutput songProps = {songProps} sliderProps = {sliderProps}/>

    <GenreDropdown genres={genres} handler={hGenre}/>
    <Recommendations id="recommendations" array={recommendations}/>
    
 
    </div>
    )
}



