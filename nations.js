class Nation {
  constructor (json_data) {
    this.nationId             = json_data.nationId;
    this.name                 = json_data.name;
    this.adjective            = json_data.adjective;
    this.playerId             = json_data.playerId;
    this.infReplacementPoints = json_data.infReplacementPoints;
    this.cavReplacementPoints = json_data.cavReplacementPoints;
    this.artReplacementPoints = json_data.artReplacementPoints;
    this.player               = null;
    this.infReplPointWidget   = null;
    this.cavReplPointWidget   = null;
    this.artReplPointWidget   = null;
  }

  setPlayer (player) {
    this.player = player;
  }

  create_UI_widgets (parentWidget) {
    // Add a new column in parentWidget
    const nationWidget = new UI_createNationWidget (this.nationId, this.name, parentWidget);
      
    this.infReplPointWidget = new UI_ReinforcementPointWidget (this.nationId, this.name, "Infantry",  nationWidget);
    this.cavReplPointWidget = new UI_ReinforcementPointWidget (this.nationId, this.name, "Cavalry",   nationWidget);
    this.artReplPointWidget = new UI_ReinforcementPointWidget (this.nationId, this.name, "Artillery", nationWidget);
  }


  draw () {
    this.infReplPointWidget.setValue (this.infReplacementPoints);
    this.cavReplPointWidget.setValue (this.cavReplacementPoints);
    this.artReplPointWidget.setValue (this.artReplacementPoints);
  }

};


