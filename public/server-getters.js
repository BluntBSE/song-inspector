
//TODO: Make port below dynamic. This assumes a port of 3000.
const fetchSongsHTML = async function(){
    let target_one = document.getElementById("song-title");
    let target_two = document.getElementById("song-atts");
     var obj;
    const new_artist = document.getElementById('inartist').value;
    const new_track = document.getElementById('intrack').value;
    const answer = await fetch(`http://localhost:3000/search/${new_artist}/${new_track}`)
      .then(response => response.json())
      .then((data) => obj = JSON.stringify(data));

      target_one.innerHTML = answer;

    }

    const fetchAttsHTML = async function(){
        var obj;
      
        const uri = document.getElementById('inuri').value;
        const answer = await fetch(`http://localhost:3000/attributes/${uri}`)
          .then(response => response.json())
          //Spotify returns its answers in an array, so access [0]
          .then((data) => data[0]);
          return answer;
    }

    const generateSliders = async function(){
      let target = document.getElementById("song-atts");
      const data = await fetchAttsHTML();
      console.log(data);
      const HTML = `
      <div class="slidecontainer">
      Danceability: ${data.danceability}
      <input type="range" min="0" max="100" value="${data.danceability*100}" class="slider" id="slider-danceability"><br/>
      Energy: ${data.energy}
      <input type="range" min="0" max="100" value="${data.energy*100}" class="slider" id="slider-energy"><br/>
      Speechiness: ${data.speechiness}
      <input type="range" min="0" max="100" value="${data.speechiness*100}" class="slider" id="slider-speechiness"><br/>
      Acousticness: ${data.acousticness}
      <input type="range" min="0" max="100" value="${data.acuosticness*100}" class="slider" id="slider-acousticness"><br/>
      Instrumentalness: ${data.instrumentalness}
      <input type="range" min="0" max="100" value="${data.instrumentalness*100}" class="slider" id="slider-instrumentalness"><br/>
      Liveness: ${data.liveness}
      <input type="range" min="0" max="100" value="${data.liveness*100}" class="slider" id="slider-liveness"><br/>
      Valence (0 = Sad, 1 = Happy): ${data.valence}
      <input type="range" min="0" max="100" value="${data.liveness*100}" class="slider" id="slider-valence"><br/>
      Tempo (BPM): ${data.tempo}
      <input type="range" min="0" max="240" value="${data.tempo}" class="slider" id="slider-tempo"><br/>
      </div>
        `

      target.innerHTML = HTML;
    }


const generateKwargs = function (){
  //Removed loudess. Hoepfully no problem.
 let att_kwargs = {
    'target_acousticness':0,
    'target_danceability':0,
    'target_energy':0,
    'target_instrumentalness':0,
    'target_liveness':0,
    'target_speechiness':0,
    'target_tempo':0,
    'target_valence':0,
}
att_kwargs['target_acousticness']=document.getElementById("slider-acousticness").value/100;
att_kwargs['target_danceability']=document.getElementById("slider-danceability").value/100;
att_kwargs['target_energy']=document.getElementById("slider-energy").value/100;
att_kwargs['target_instrumentalness']=document.getElementById("slider-instrumentalness").value/100;
att_kwargs['target_liveness']=document.getElementById("slider-liveness").value/100;
att_kwargs['target_speechiness']=document.getElementById("slider-speechiness").value/100;
att_kwargs['target_tempo']=document.getElementById("slider-tempo").value;
att_kwargs['target_valence']=document.getElementById("slider-valence").value/100;

return att_kwargs;


}


const renderKwargs = function(){
  let kwargs = generateKwargs();
  document.getElementById("new-atts").innerHTML = JSON.stringify(kwargs);
}

const getSongRecs = async function(){
  console.log("Recs fired")
  const uri = document.getElementById("inuri").value;
  const kwargs = generateKwargs();


  //${kwargs['acousticness']}/${kwargs['energy']}/${kwargs['danceability']}/${kwargs['liveness']}/${kwargs['instrumentalness']}/${kwargs['speechiness']}/${kwargs['valence']}/${kwargs['tempo']}`
  const endpoint = `/recommendations/${uri}/${kwargs['target_acousticness']}/${kwargs['target_energy']}/${kwargs['target_danceability']}/${kwargs['target_liveness']}/${kwargs['target_instrumentalness']}/${kwargs['target_speechiness']}/${kwargs['target_valence']}/${kwargs['target_tempo']}`
  console.log(endpoint)

  const recs =  await fetch(endpoint)
  .then(response => response.json())
  .then((data) => data)


  console.log("Recs is:")
  console.log(recs);


}

