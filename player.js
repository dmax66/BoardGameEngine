class Player {
  constructor (json_data) {
    this.symbol  = json_data.symbol;
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
    
    this.playerWidget = new UI_PlayerWidget (this.symbol, this.name, this.parentWidget);
    this.moraleWidget = new UI_MoraleWidget (this.symbol, this.name, this.playerWidget.moraleWidgetContainer);  
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
    this.units.push (units);
    unit.setPlayer (this);
  }

  


  draw () {
    this.moraleWidget.value = this.morale;
//    this.moraleWidget.draw();
    
    for (let i = 0; i++; i < this.nations.length) {
//      this.nations[i].draw(); 
    }
    
    for (let i = 0; i++; i < this.armies.length) {
//      this.armies[i].draw(); 
    }
  }    
  
  // Return true if player manages nation n
  manageNation (n) {
    for (let i = 0; i < nations.length; i++) {
      if (nations[i].symbol == n) {
        return true;  
      }
    }
    
    return false;
  }
} // End of class 





