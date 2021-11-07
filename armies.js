class Army {

  constructor (json_data) {
    this.symbol      = json_data.symbol;
    this.name        = json_data.name;
    this.playerId    = json_data.playerId;
    this.adminPoints = json_data.adminPoints;  
    this.copX        = json_data.COP_X;
    this.copY        = json_data.COP_Y;
    this.isActive    = true;

  }

  create_UI_widgets (parentWidget) {
    // Creates the UI elements
    this.APwidget = new UI_APwidget (this.symbol, this.name, parentWidget);
  }


  draw () {
    this.APwidget.setValue (this.adminPoints);
    this.APwidget.draw ();
  }

}      

