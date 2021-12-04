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

