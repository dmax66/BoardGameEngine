
class player_status {
  constructor() {
    this._adminPoints = 0;
    this._morale = 0;
    this._reinforcementPoints = 0; 
  }

  getAdminPoints() {return this._adminPoints; }
  setAdminPoints (adminPoints) { this._adminPoints = adminPoints; }
  changeAdminPoints (delta) { this._adminPoints += delta; }
    
  getMorale() {return this._morale; }
  setMorale (morale) { this._morale = morale; }
  changeMorale (delta) { this._morale += delta; }
    
  getReinforcementPoints() {return this._reinforcementPoints; }
  setReinforcementPoints (reinforcementPoints) { this._reinforcementPoints = reinforcementPoints; }
  changeReinforcementPoints (delta) { this._reinforcementPoints += delta; }
    
  drawSelf () {
    document.getElementById("admin_points").value = this._adminPoints;
    document.getElementById("morale").value = this._morale;
    document.getElementById("reinforcement_points").value = this._reinforcementPoints;
  }    
} 


let game_mode = "Null";

let frenchPlayerStatus = new player_status();
let alliedPlayerStatus = new player_status();

let scenario_data = null;





function call_server_api_get (url, handler_func)
{
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() { if (this.readyState == 4 && this.status == 200) handler_func (this);}

  xhttp.open("GET", url, false);
  xhttp.send();

}


function call_server_api_post (url, data, handler_func, async)
{
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() { if (this.readyState == 4 && this.status == 200) handler_func (this);}

  xhttp.open ("POST", url, async);
  xhttp.setRequestHeader ("Content-type", "application/json");
  xhttp.send (data);
  xhttp.send ();
}


