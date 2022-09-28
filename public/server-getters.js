
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
        let target_two = document.getElementById("song-atts");
        const uri = document.getElementById('inuri').value;
        const answer = await fetch(`http://localhost:3000/attributes/${uri}`)
          .then(response => response.json())
          .then((data) => JSON.stringify(data));
          target_two.innerHTML = answer;
    }