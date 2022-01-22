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


class AQMTable
{
  static StrengthRanges = new Map (); 

  constructor (json_strengthRanges, )
  {
    for (let i of json_strengthRanges)
    {
       AQMTable.StrengthRanges   
    }
  }

  getAttrition (totalAP, strength, marchLength, isForcedMarch)
  {
    let strengthRange = "";
    
    // Find the strength range
    for (let elem of AQMTable.StrengthRanges.entries ())
    {
      const key = elem[0];
      const lowerBound = elem[1].minStrength;
      const upperBound = elem[1].maxStrength;
      
      if (lowerBound <= strength && strength < upperBound)
      {
        strengthRange = key;
        break;      
      }
    }
        
    // Find the MP column
        
    
  }
}