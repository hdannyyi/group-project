"use strict";

function getPhoneNum(){
  let lat, long, name;
  const buttonElement = document.getElementById('btn');
  buttonElement.addEventListener('click', function(event){
    let phoneNum = document.getElementById('input-number').value;
    const URL = `https://proapi.whitepages.com/3.1/phone?api_key=d1e09120eeba48d2ac8fbeb94ae853c7&phone=${phoneNum}`;
    get(URL)
    .then(function(data){
      lat = data.current_addresses[0].lat_long.latitude;
      long = data.current_addresses[0].lat_long.longitude;
      if(data.belongs_to === undefined || data.belongs_to === null || data.belongs_to.name === null || data.belongs_to.name === undefined){
        getResult(lat, long);
      }else{
        name = data.belongs_to.name;
        getResult(lat, long, name);
      }
    });
  });
}

function getResult(lat, long, name){
  const URL = `http://ec2-3-15-41-14.us-east-2.compute.amazonaws.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=8000&type=restaurant&key=AIzaSyCMVTDajdIApWYfNkHLIJmm6jeK7e0h1mM`;
  let scroll = document.getElementById('main__container');
  if(name !== undefined || null){
    greeting(name);
  }
  get(URL)
  .then(data => {
    for(let i = 0; i < 30; i++){
      addRestName(data.results[i].name);
      addAddress(data.results[i].vicinity);
      addRating(data.results[i].rating);
      if(data.results[i].price_level !== undefined){
        addPriceLevel(data.results[i].price_level);
      }
      if(data.results[i].opening_hours !== undefined){
        if(data.results[i].opening_hours.open_now !== undefined){
          addHours(data.results[i].opening_hours.open_now);
        }
      }
      scroll.scrollIntoView({behavior:'smooth'});
    }
  });
}

function greeting(item){
  const resultList = document.getElementById('main__container--list');
  const resultName = document.createElement('h1');

  resultName.innerHTML = 'Hello ' + item + '!';
  resultName.setAttribute('style', 'text-align:center;');
  resultList.append(resultName);
}

function addRestName(item){
  const resultList = document.getElementById('main__container--list');
  const resultName = document.createElement('h3');

  resultName.textContent = item;
  resultName.setAttribute('style', 'margin-bottom: 0;');
  resultList.append(resultName);
}

function addRating(item){
  const resultList = document.getElementById('main__container--list');
  let resultRating = document.createElement('li');

  if(item >= 0 && item <= 1){
    resultRating.innerHTML = '<i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
  }else if(item > 1 && item <= 1.5){
    resultRating.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
  }else if(item > 1.5 && item <= 2){
    resultRating.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
  }else if(item > 2 && item <= 2.5){
    resultRating.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
  }else if(item > 2.5 && item <= 3){
    resultRating.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>';
  }else if(item > 3 && item <= 3.5){
    resultRating.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"><i class="fas fa-star-half-alt"></i><i class="far fa-star"></i>';
  }else if(item >= 3.5 && item <= 4){
    resultRating.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>';
  }else if(item > 4 && item <= 4.5){
    resultRating.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>';
  }else if(item > 4.5){
    resultRating.innerHTML = '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>';
  }
  resultList.append(resultRating);
}

function addAddress(item){
  const resultList = document.getElementById('main__container--list');
  const resultAddress = document.createElement('li');

  resultAddress.textContent = item;
  resultList.append(resultAddress);
}

function addHours(item){
  const resultList = document.getElementById('main__container--list');
  let resultHours = document.createElement('li');

  if(item === true){
    resultHours.textContent = 'Open\n';
    resultList.append(resultHours);
  }else if(item === undefined || item === null){
    resultHours.textContent = 'Hours Unavailable\n';
    resultList.append(resultHours);
  }else{
    resultHours.textContent = 'Closed\n';
    resultList.append(resultHours);
  }
}

function addPriceLevel(item){
  const resultList = document.getElementById('main__container--list');
  let dollarIcon = document.createElement('li');

  if(item === 1){
    dollarIcon.textContent = '$\n';
    resultList.append(dollarIcon);
  }else if(item === 2){
    dollarIcon.textContent = '$$\n';
    resultList.append(dollarIcon);
  }else if(item === 3){
    dollarIcon.textContent = '$$$\n';
    resultList.append(dollarIcon);
  }else if(item === 4){
    dollarIcon.textContent = '$$$$\n';
    resultList.append(dollarIcon);
  }else if(item === 5){
    dollarIcon.textContent = '$$$$$\n';
    resultList.append(dollarIcon);
  }
}
getPhoneNum();
