

class Player {
  constructor (json_data) {
    this.playerId  = json_data.playerId;
    this.name    = json_data.name;
    this.morale  = json_data.morale;
    this.nations = [];
    this.armies  = [];
    this.leaders = [];
    this.units   = [];

    this.parentWdiget = null;
    this.playerWidget = null;
    this.moraleWidget = null;
  }

  create_UI_widgets (parentWidget) {
    // Creates the UI elements
    this.parentWidget = parentWidget;
    
    this.playerWidget = new UI_PlayerWidget (this.playerId, this.name, this.parentWidget);
    this.moraleWidget = new UI_MoraleWidget (this.playerId, this.name, this.playerWidget.moraleWidgetContainer);  
  }
  
  show () {
    this.playerWidget.show();
  }
  
  hide () {
    this.playerWidget.hide();
  }
  
  addNation (nation) {
    this.nations.push (nation);
    nation.setPlayer (this);
  }

  addArmy (army) {
    this.armies.push (army);
    army.setPlayer (this);
  }

  addLeader (leader) {
    this.leaders.push (leader);
    leader.setPlayer (this);
  }

  addUnit (unit) {
    this.units.push (unit);
    unit.setPlayer (this);
  }

  disbandCOP ()
  {
  
  }

  draw () {
    this.moraleWidget.setValue (this.morale);
//    this.moraleWidget.draw();
    
    for (let n of this.nations) 
    {
      n.draw(); 
    }
    
    for (let a of this.armies) 
    {
      a.draw(); 
    }
  }    

} // End of class 





