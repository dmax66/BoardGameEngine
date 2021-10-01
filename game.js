let game = {};



function createGame (xhttp_obj) {
  game = JSON.parse(xhttp_obj.responseText)[0];
}

