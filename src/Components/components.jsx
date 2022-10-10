import { useState, useRef, useEffect,} from 'react';

export const InputField = function(props){

    const handler = props.handler;
    return(
        <div className = "container-input">
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

