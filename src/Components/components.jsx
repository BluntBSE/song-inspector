import { useState, useRef, useEffect,} from 'react';
export const InputField = function(props){

    const handler = props.handler;
    return(
        <div className = "single-input">
        <input type="text" value={props.iText} id={props.id} onChange={handler}></input>
    
        <h4>{props.subHead}</h4>
        </div>
    )
}

export const ExeButton = function(props){
    return(
        <button onClick={props.function}>{props.text}</button>
    )
}


export const InspectedSong = function(props){
    return(
    <div className = "container-inspected">
        <h2>now inspecting</h2>
        <div className = "container-track">
        <img src = {props.img}></img>
            <div className = "track-info">
            <h3>track</h3>
            <h4>{props.trackName}</h4>
            <h3>album</h3>
            <h4>{props.albumName}</h4>
            <h3>artist</h3>
            <h4>{props.artist}</h4>
    
        </div>
        <div className="app-description">
            <p>change target values to get recommendations for songs with those attributes. leave unchanged to find similarly evaluated songs</p>
        </div>
        </div>
        
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
        <h3 className="input-label">{props.atype}</h3>
        <div className="layout-display">
            <div className="att-value-display">Original: {String(initValue)}</div>
            <div className="att-value-display-target">Target: <span className="tvalue">{String(curValue)}</span></div>
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

    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasPreview, setHasPreview] = useState(true);
    const [audioRef, setaudioRef] = useState((new Audio(props.preview)));



    //const { duration } = audioRef.current;

    return(
    <li>
    <div className="container-recommendation">
    <div className ="content-recommendation">
    <a href={props.link}>
        {props.name}
    </a>
    <div>{props.artists[0].name}</div>
    </div>
   
    </div>
    </li>
    )
}




export const SongOutput = function(props){

    return(
       
        <div className="container-output">

       <InspectedSong artist={props.songProps.artist} trackName={props.songProps.trackName} albumName={props.songProps.albumName} img={props.songProps.albumIMG}/>
   
    
        <AttSlider atype="Danceability" attribute={props.sliderProps.danceability} updater={props.sliderProps.hTDanceability} multiplier={100}/>
        <AttSlider atype="Acousticness" attribute={props.sliderProps.acousticness} updater={props.sliderProps.hTAcousticness} multiplier={100} />
        <AttSlider atype="Speechiness" attribute={props.sliderProps.speechiness} updater={props.sliderProps.hTSpeechiness} multiplier={100} />
        <AttSlider atype="Energy" attribute={props.sliderProps.energy} updater={props.sliderProps.hTEnergy} multiplier={100}/>
        <AttSlider atype="Instrumentalness" attribute={props.sliderProps.instrumentalness} updater={props.sliderProps.hTInstrumentalness} multiplier={100}/>
        <AttSlider atype="Liveness" attribute={props.sliderProps.liveness} updater={props.sliderProps.hTLiveness} multiplier={100}/>
        <AttSlider atype="Mood (0 = Sad, 1 = Happy)" attribute={props.sliderProps.valence} updater={props.sliderProps.hTValence} multiplier={100}/>
        <GenreDropdown genres={props.genreProps} handler={props.handlerProps}/>
        <ExeButton artist = {props.songProps.artist} trackURI = {props.songProps.trackURI} text="Get Recommendations" function={props.songProps.fetchRecs2}/>
   

        </div>

    )

}

//    <GenreDropdown genres={props.genreProps.genres} handler={props.handlerProps.hGenre}/>

export const GenreDropdown = function(props){
    const handler = props.handler;
    return(
    <div id="genre-dropdown" className="last-card">
    <h2>genre jumper</h2>
    <select id="genres" onChange={handler}>
        <option>none</option>{props.genres.map((el)=>{return<option>{el}</option>})}
    </select><br></br>
     <p className="right-align">attempt to seed recommendations with your chosen track and genre.</p>

    </div>
    )
}

