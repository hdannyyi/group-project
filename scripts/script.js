"use strict";

// Global Variables

function getPhoneNum(){
  let lat, long, name;
  const buttonElement = document.getElementById('btn');
  buttonElement.addEventListener('click', function(event){
    let phoneNum = document.getElementById('input-number').value;
    const URL = `https://proapi.whitepages.com/3.1/phone?api_key=46b21a543080471496fe3c4b3e2b8d4f&phone=${phoneNum}`;
    get(URL)
    .then(function(data){
      lat = data.current_addresses[0].lat_long.latitude;
      long = data.current_addresses[0].lat_long.longitude;
      //name = data.belongs_to.name;
      console.log(lat);
      console.log(long);
      //console.log('Hello ' + name);
      getResult(lat, long)
    });
  });
}

// Once the user has inputted their number, prompt a welcome message
// users name(global) and list restaurants near the latitude and
// longitude. If user's name is null or undefined return a generic
// welcome msg
function getResult(lat, long){
  const URL = `http://localhost:3000/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=8000&type=restaurant&key=AIzaSyCMVTDajdIApWYfNkHLIJmm6jeK7e0h1mM`;
  get(URL)
  .then(data => {
    for(let i = 0; i < 10; i++){
      console.log(data.results[i]);
    }
  });
}

function addItem(item){
  const resultList = document.getElementById('main__container--list');
  const resultItem = document.createElement('li');

  resultItem.textContent = item.businesses;
  resultList.append(resultItem);
}

getPhoneNum();
