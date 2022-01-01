class APPTable 
{

  constructor ()
  {
    this.data = new Map ();
  }

  init (json_data)
  {
    for (let entry of json_data)
    {
      const key = APPTable.createKey (entry.armyId, entry.seasonId, entry.distance, entry.dieRoll);
      this.data.set (key, entry.adminPoints * 1); 
    }
  }

  static createKey (armyId, season, distance, dieRoll)
  {
    return armyId + ":" + season + ":" + distance + ":" + dieRoll;
  }


  getAP (armyId, season, distance, dieRoll)
  {
    const key = APPTable.createKey (armyId, season, distance, dieRoll);
    
    return this.data.get (key);  
  }
  
  
}