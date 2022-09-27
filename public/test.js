const sayIt = function(){
    console.log('Hi!')
}

const fetchHappened = function(){
const result = fetch('http://localhost:5000/search/moo/mee')
  .then((response) => response.json())
  .then((data) => console.log(data));
}
