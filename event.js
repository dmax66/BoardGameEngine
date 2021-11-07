class CalendarEvent {
  constructor (turn, type) {
    this.turn = turn;
    this.type = type;
  }
}


class ReplacementEvent extends CalendarEvent {
  constructor (turn, type, nation, type, quantity) {
    super (turn, type);
    this.nation = nation;
    this.type = type;
    this.quantity = quantity;  
  }
  
  process () {
    // From the nation, go to the player
    for (let i = 0; i < theGame.players[i]; i++) {
      for (let j = 0; j < theGame.player[i].nations.length; j++)
      if (theGame.player[i].nations[j] == this.nation) {
        switch (this.type) {
          case 'i':
            theGame.player[i].nations[j].infReplacementtPoints += this.quantity;
            break;
            
          case 'c':
            theGame.player[i].nations[j].cavReplacementtPoints += this.quantity;
            break;
            
          case 'a':
            theGame.player[i].nations[j].artReplacementtPoints += this.quantity;
            break;
            
          default:
            throw ("Invalid replacement type: " + this.type);
        }      
      }
    }
  }
}


class ReinforcementEvent extends CalendarEvent {
  constructor (turn, type, leaderId, x, y, mode, orientation) {
    super (turn, type);
    this.leaderId = leaderId;
    this.x = x;
    this.y = y;
    this.mode = mode;
    this.orientation = orientation
  }
  
  process () {
    const i = findLeaderFromId (leaderId);
    leaders[i].x = this.x;
    leaders[i].y = this.y;
    leaders[i].mode = this.mode;
    leaders[i].orientation = this.orientation;
  }
}



class CalendarEventFactory {
  
  getGameEventFromDB (turn) {
    call_server_api_get ("app/get_events.php?turn=" + turn, CalendarEventFactory.ajax_callback);
  }

  static ajax_callback (xhttp_obj) {
    if(xhttp_obj.responseText == "") {
      return;
    }     
    
    let json_data = JSON.parse (hxttp_obj.responseText);
    
    const json_data_length = json_data.length;
    for (let i = 0; i < json_data_length; i++) {
      switch json_data[i].EventType {
        case 'Replacement':
          theGame.events.push (new ReplacementEvent (json_data[i].Turn, json_data[i].EventType, json_data[i].Nation, json_data[i].type, json_datya[i].quantity);
          break;
          
        case 'Reinforcement':
          theGame.events.push (new ReinforcementEvent (json_data[i].Turn, json_data[i].EventType, json_data[i].Leader_Id, json_data[i].X, json_data[i].Y, json_data[i].Mode, json_data[i].Orientation);
          break;
          
        case 'DepotDown':
          break;
          
        case 'SupplySourceDown':
          break;
          
        case 'Reinforcement':
          break;
          
        case 'GermanUnitsWithdrawn':
          break;
          
        default:
          throw ("Unknoiwn game event: " +  json_data[i].type);
      }
    }
  }
}