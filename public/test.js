const sayIt = function(){
    console.log('Hi!')
}

const fetchHappened = function(){
fetch('http://localhost:5000/search/Rosalia/LaNocheDeAnoche')
  .then(response => response.json())
  .then((data) => console.log(JSON.stringify(data)));
}
