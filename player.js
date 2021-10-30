
class player {
  constructor (name, nations) {
    this.name = name;
    this.adminPoints = 0;
    this.morale = 0;
    this.reinforcementPoints = 0;
    this.nations = nations; 
  }

  getAdminPoints()             { return this.adminPoints; }
  setAdminPoints (adminPoints) { this.adminPoints = adminPoints; }
  changeAdminPoints (delta)    { this.adminPoints += delta; }
    
  getMorale() {        return this.morale; }
  setMorale (morale)   { this.morale = morale; }
  changeMorale (delta) { this.morale += delta; }
    
  getReinforcementPoints() {return this.reinforcementPoints; }
  setReinforcementPoints (reinforcementPoints) { this.reinforcementPoints = reinforcementPoints; }
  changeReinforcementPoints (delta) { this.reinforcementPoints += delta; }
    
  // 
  // TO BE MOVED TO THE UI MODULE
  //
  drawSelf () {
    document.getElementById("admin_points_id").value = this.adminPoints;
    document.getElementById("morale_id").value = this.morale;
    document.getElementById("reinforcement_points_id").value = this.reinforcementPoints;
  }    
} 





