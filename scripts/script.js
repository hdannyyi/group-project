"use strict";

// Global Variables
let lat, long, name;
let results = [];

function getPhoneNum(){
  const buttonElement = document.getElementById('btn');
  buttonElement.addEventListener('click', function(event){
    let phoneNum = document.getElementById('input-number').value;
    const URL = `https://proapi.whitepages.com/3.1/phone?api_key=46b21a543080471496fe3c4b3e2b8d4f&phone=${phoneNum}`;
    get(URL)
    .then(function(data){
      lat = data.current_addresses[0].lat_long.latitude;
      long = data.current_addresses[0].lat_long.longitude;
      name = data.belongs_to.name;
      console.log(lat);
      console.log(long);
      console.log('Hello ' + name);
    });
  });
}

// Once the user has inputted their number, prompt a welcome message
// users name(global) and list restaurants near the latitude and
// longitude. If user's name is null or undefined return a generic
// welcome msg

function getResult(){
  getPhoneNum();
  const URL = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}`;
  get(URL)
  .then(function(data){
    console.log(data);
  })

  $.ajax({
    url: URL,
    headers: {
      'Authorization':'Bearer m8Y5yfzgix4d7-jmqRxSgXc6_NkNQ9AKgc_jtOoSzb327a4RpaES5Y51-qFnTBgH9a-QnrEef-W3CxeXM9eIuQO1rM7BsU2Pdk_twCF9pFcigopNPAy1jpYfsfraXHYx',
    },
      method: 'GET',
      dataType: 'json',
      success: function(data){
        //grab the results from the API JSON resturn
        let totalResults = data.total;
        //if results are greater than 0, continue
        if(totalResults > 0){
          $.each(data.businesses, function(i, item){
            let id = item.id;
            let alias = item.alias;
            let phone = item.display_phone;
            let image = item.image_url;
            let name = item.name;
            let rating = item.rating;
            let reviewCount = item.review_count;
            let address = item.location.address1;
            let city = item.location.city;
            let state = item.location.state;
            let zipcode = item.location.zip_code;
            console.log(name);
            console.log(rating);
          });
        } else {
          console.log('No results');
        }
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
//getResult();
