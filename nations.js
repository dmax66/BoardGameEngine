class Nation {
  constructor (json_data) {
    this.symbol               = json_data.symbol;
    this.name                 = json_data.name;
    this.adjective            = json_data.adjective;
    this.playerId             = json_data.playerId;
    this.infReplacementPoints = json_data.infReplacementPoints;
    this.cavReplacementPoints = json_data.cavReplacementPoints;
    this.artReplacementPoints = json_data.artReplacementPoints;

  }

  create_UI_widgets (parentWidget) {
    // Creates the UI elements
    this.infReplPointWidget = new UI_ReinforcementPointWidget (this.symbol, this.name, "Infantry",  parentWidget);
    this.cavReplPointWidget = new UI_ReinforcementPointWidget (this.symbol, this.name, "Cavalry",   parentWidget);
    this.artReplPointWidget = new UI_ReinforcementPointWidget (this.symbol, this.name, "Artillery", parentWidget);
  }


  draw () {
    this.infReplPointWidget.setValue (this.reinforcementPoints);
    this.cavReplPointWidget.setValue (this.reinforcementPoints);
    this.artReplPointWidget.setValue (this.reinforcementPoints);

    this.infReplPointWidget.draw();  
    this.cavReplPointWidget.draw();  
    this.artReplPointWidget.draw();  
  }

};


