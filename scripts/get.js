function get(URL){
  return fetch(URL)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => error);
}
