class UI_RenderStatusBar {
  static weatherTable = ["Rain & Mud", "Rain", "Fait", "Heat"];  

  constructor (parentWidget) {
    this.currentPlayer  = document.getElementById ("player_id");
    this.currentTurn    = document.getElementById ("turn_id");
    this.currentPhase   = document.getElementById ("phase_id");
    this.currentSegment = document.getElementById ("segment_id");
  }


  drawTurn(t) {
    this.currentTurn.value = t;
  }

  drawPhase(p) {
    this.currentPhase.value = p;
  }
  
  showSegment(s) {
    this.currentSegment.value = s;
  }

  showWeather(w) {
    this.currentTurn.value = weatherTable[w];
  }
}