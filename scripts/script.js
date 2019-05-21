function getPhoneNum(){
  let lat, long, name;
  const buttonElement = document.getElementById('btn');
  buttonElement.addEventListener('click', function(event){
    let phoneNum = document.getElementById('input-number').value;
    const URL = `https://proapi.whitepages.com/3.1/phone?api_key=648c638c34334b1eb33bdc8021d51c9e&phone=${phoneNum}`;
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
  const URL = `http://localhost:3000/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=8000&type=restaurant&key=AIzaSyCMVTDajdIApWYfNkHLIJmm6jeK7e0h1mM`;
  let scroll = document.getElementById('main__container');
  if(name !== undefined || null){
    greeting(name);
  }
  get(URL)
  .then(data => {
    for(let i = 0; i < 20; i++){
      const resultDivMain = document.getElementById('main__container');
      const resultUL= document.createElement('ul');
      const resultList = document.createElement('li');

      let openOrClosed, price;
      let restName = addRestName(data.results[i].name);
      let address = addAddress(data.results[i].vicinity);
      let rating = addRating(data.results[i].rating);

      if(data.results[i].price_level !== undefined){
        price = addPriceLevel(data.results[i].price_level);
      }
      if(data.results[i].opening_hours !== undefined){
        if(data.results[i].opening_hours.open_now !== undefined){
          openOrClosed = addHours(data.results[i].opening_hours.open_now);
        }
      }
      resultList.append(restName, address, rating, price, openOrClosed);
      resultUL.setAttribute('style', 'margin: 0; padding-left: 1.5rem;');
      resultUL.append(resultList);
      resultDivMain.append(resultUL);
    }
    scroll.scrollIntoView({behavior:'smooth'});
  });
}

function greeting(item){
  const resultDiv = document.getElementById('main__container')
  const resultName = document.createElement('h1');

  resultName.innerHTML = 'Hello ' + item + '!';
  resultName.setAttribute('style', 'text-align:center; color:#384259;');
  resultDiv.append(resultName);
}

function addRestName(item){
  const resultName = document.createElement('h3');

  resultName.textContent = item;
  resultName.setAttribute('style', 'margin-bottom: 0;');

  return resultName;
}

function addRating(item){
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

  resultRating.setAttribute('style', 'text-decoration: none;');
  return resultRating;
}

function addAddress(item){
  const resultAddress = document.createElement('li');

  resultAddress.textContent = item;
  resultAddress.setAttribute('style', 'text-decoration: none;');
  return resultAddress;
}

function addHours(item){
  let resultHours = document.createElement('li');

  if(item === true){
    resultHours.textContent = 'Open\n';
  }else if(item === undefined || item === null){
    resultHours.textContent = 'Hours Unavailable\n';
  }else{
    resultHours.textContent = 'Closed\n';
  }
  resultHours.setAttribute('style', 'text-decoration: none;');
  return resultHours;
}

function addPriceLevel(item){
  let dollarIcon = document.createElement('li');

  if(item === 1){
    dollarIcon.textContent = '$\n';
  }else if(item === 2){
    dollarIcon.textContent = '$$\n';
  }else if(item === 3){
    dollarIcon.textContent = '$$$\n';
  }else if(item === 4){
    dollarIcon.textContent = '$$$$\n';
  }else if(item === 5){
    dollarIcon.textContent = '$$$$$\n';
  }
  dollarIcon.setAttribute('style', 'text-decoration: none;');
  return dollarIcon;
}
getPhoneNum();