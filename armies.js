class COP
{
  constructor (armyId, json_data)
  {
    this.x = 1 * json_data.COP_x;
    this.y = 1 * json_data.COP_y;
    this.isActive = 1 * json_data.COP_isActive;
    this.turnToReactivate = 1* json_data.COP_turnToReactivate;     // meaningless if isActive == true
    
    this.widget = new UI_COP (armyId);
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
    this.widget.draw (this.x, this.y, 1);
  }
  
  move (x, y)
  {
    this.x = x;
    this.y = y;  
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
    
    this.widget = new UI_SS (armyId);
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


  draw () {
    this.widget.draw (this.x, this.y, 1);
  }
  

  move (x, y) {
    this.x = x;
    this.y = y;  
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
    this.APwidget    = null;
    
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
    this.APwidget = new UI_APwidget (this.symbol, this.name, parentWidget);
  }


  draw () {
    this.APwidget.setValue (this.adminPoints);
  }

}      

