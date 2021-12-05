class COP
{
  constructor (armyId, json_data)
  {
    this.x = json_data.COP_x;
    this.y = json_data.COP_y;
    this.isActive = json_data.COP_isActive;
    this.turnToReactivate = json_data.COP_turnToReactivate;     // meaningless if isActive == true
    
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

