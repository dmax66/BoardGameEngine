class COP
{
  constructor (armyId, json_data)
  {
    this.x = 1 * json_data.COP_x;
    this.y = 1 * json_data.COP_y;
    this.isActive = 1 * json_data.COP_isActive;
    this.turnToReactivate = 1* json_data.COP_turnToReactivate;     // meaningless if isActive == true
    
    this.marker = new UI_COPMarker (armyId);
    this.marker.setPosition (this.x, this.y);
  }


  disband ()
  {
    this.isActive = false;
    this.turnToReactivate = theGame.currentTurn + 2;  
  }
  
  reactivate ()
  {
    this.isActive = true;
    this.turnToReactivate = -1;  
  }

  draw ()
  {
    this.marker.draw ();
  }
  
  move (x, y)
  {
    this.x = x;
    this.y = y;  
    this.marker.setPosition (x, y);
  }
}


class SupplySource
{
  constructor (armyId, json_data)
  {
    this.x        = 1 * json_data.x;
    this.y        = 1 * json_data.y;
    this.isActive = 1 * json_data.isActive;
    this.name     = json_data.name;
    
    this.marker = new UI_SSMarker (armyId);
    this.marker.setPosition (this.x, this.y);
  }


  move ()
  {
    this.isActive = false;
  }
  
  
  reactivate ()
  {
    if (this.isActive) {
      return;
    }

    // Roll die to reactivate - 1 or 2 means the SS reactivation is successful
  }


  draw () 
  {
    this.marker.draw ();
  }
  

  move (x, y) 
  {
    this.x = x;
    this.y = y;  
    this.marker.setPosition (x, y);
  }
}



class Army {

  constructor (json_data) {
    this.armyId      = json_data.armyId;
    this.name        = json_data.name;
    this.playerId    = json_data.playerId;
    this.adminPoints = json_data.adminPoints;  
    this.copX        = json_data.COP_X;
    this.copY        = json_data.COP_Y;
    this.isActive    = true;
    this.player      = null;
    this.armyPanel   = null;
    
    this.COP = new COP (this.armyId, json_data);
    this.supplySources = [];
  }

  addSS (json_data) 
  {
    const ss = new SupplySource (this.armyId, json_data);
    this.supplySources.push (ss);
  }

  setPlayer (player) {
    this.player = player;
  }

  create_UI_widgets (parentWidget) {
    // Creates the UI elements
    this.armyPanel = new UI_ArmyPanel (this.symbol, this.name, parentWidget);
  }


  draw () 
  {
    this.armyPanel.setAP (this.adminPoints);
    this.armyPanel.setCOPStatus (this.COP.isActive, this.COP.x, this.COP.y, );

    for (let ss of this.supplySources)
    {
      if (ss.isActive) 
      {
        this.armyPanel.setSSStatus (true, ss.x, ss.y, ss.name);
        break;      
      }
    }
  }

}      

