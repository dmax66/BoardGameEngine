class PopupMenu
{
  constructor (prefix, id)
  {
    this.menuWidget = document.createElement ("DIV"); 
    this.menuWidget.id = prefix + "." + id;
    this.menuWidget.setAttribute ("class", "unit-popup-menu");
    this.menuWidget.setAttribute ("data-owner", id);
    document.getElementById ("mapContainer").appendChild (this.menuWidget);

    // Close icon
    const closeIcon = document.createElement ("IMG");
    closeIcon.setAttribute ("class", "close-icon");
//  TASK: delete when test OK
//    closeIcon.src = "img/close.png";

    closeIcon.onclick = function (ev) { PopupMenu.onCloseClicked (ev) } 
    this.menuWidget.appendChild (closeIcon);
    

  }


  open ()
  {
  }
  

  close ()
  {
    this.menuWidget.remove ();
    this.menuWidget = null;
  }

  static onCloseClicked (ev)
  {
    const menuWidget = ev.target.parentNode;
    const unit = theGame.units.get (menuWidget.getAttribute ("data-owner")); 
    unit.closeActionMenu(); 
  }

}


class UnitPopopMenu extends PopupMenu
{
  constructor (unit)
  {
    super ("MU:", unit.unitId);  
    this.unit = unit;
  
    // Unit icon
    const unitIcon = document.createElement ("IMG");
    unitIcon.src = "img/" + unit.iconFileName();
    unitIcon.setAttribute ("class", unit.nationId);
    unitIcon.style.display = "block";  
    unitIcon.style.marginLeft = "auto";
    unitIcon.style.marginRight = "auto";
    this.menuWidget.appendChild (unitIcon);
  
    // Unit name
    this.menuTitle = document.createElement ("P");
    this.menuTitle.style.margin = "auto";
    this.menuWidget.appendChild (this.menuTitle);
    this.refresh ();
  
    // A horizontal divider
    const hr = document.createElement ("HR");
    hr.setAttribute ("class", "popup-menu-hr");
    this.menuWidget.appendChild (hr);
      
    const t = document.createElement ("TABLE");
    this.menuWidget.appendChild (t);
    
    // List of possible actions
    for (let action of Unit.possibleActions) 
    {
      const tr = t.insertRow (-1);
      const td = tr.insertCell (0);
      td.style.borderSpacing = "5px";
      
      const menuEntry = document.createElement ("INPUT");
      menuEntry.type = "BUTTON";
      menuEntry.id = "U:" + unit.id;
      menuEntry.setAttribute ("class", "popup-menu-entry");
      menuEntry.setAttribute ("data-owner", unit.id);
      menuEntry.disabled = Game.sequenceOfPlay[theGame.currentSegment].id != "OS";
      menuEntry.value   = action.label;
      menuEntry.onclick = function () { action.func (unit) };
      td.appendChild (menuEntry);
    }
  }
  
  open (x, y)
  {
    this.menuWidget.style.left = x + "px";
    this.menuWidget.style.top  = y + "px";
  }
  
  refresh ()
  {
    this.menuTitle.innerHTML = this.unit.name;
    switch (this.unit.size)
    {
      case "d":
        this.menuTitle.innerHTML += " Division";
        break;
  
      case "b":
        this.menuTitle.innerHTML += "Brigade";
        break;
    }
    this.menuTitle.innerHTML += " (" + this.unit.commander + ")<br>";
  
    // Strength
    this.menuTitle.innerHTML += "Strength: " + this.unit.strength * 1000;
  }
  
}


class UnitPicker
{
  constructor ()
  {
    this.baseWidget     = document.getElementById ("units-to-place");
    this.table          = document.getElementById ("list-of-units");
    this.selectedUnitId = "";
    this.mapOfUnits     = null;
  }
  
  
  open (listOfLeadersAndCOP)
  {
    this.mapOfUnits = new Map ();
    
    for (let l of listOfLeadersAndCOP)
    {
      let unitId = "";
      let otherInfo = "";
      let unitType = l.constructor.name;
      let unitName = "";
      
      switch (unitType)
      {
        case "Leader":
          unitId = "Leader:" + l.leaderId;
          otherInfo = l.nation.nationId;
          break;
          
        case "COP":
          unitId = l.id;
          otherInfo = l.army.armyId;
          break;
          
        default:
          throw ("Invalid class value");
          return;
      }
      
      const r = this.table.insertRow (-1);
      r.id = unitId;
      r.onclick = UnitPicker.onclick; 

      const c = r.insertCell (-1);
      
      const div = document.createElement ("DIV");
      div.style.position = "relative";
      div.style.width    = "60px";
      div.style.margin   = "auto";
      c.appendChild (div);
      
      const img = document.createElement ("IMG");
      img.setAttribute ("class", "counter-icon ");
      img.style.position = "initial";
      img.style.cursor   = "pointer";
      
      switch (unitType)
      {
        case "Leader":
          img.classList.add (l.nation.nationId);
          img.src = l.type == "c" ? "img/cavalry-line.png" : "img/infantry-line.png"
          div.appendChild (img);

          const name = document.createElement ("SPAN");
          name.setAttribute ("class", "counter-name");
          name.style.position = "absolute";
          name.style.width    = "60px";
          name.style.height   = "10px";
          name.style.left     = "0px";
          name.style.top      = "8px";
          name.innerHTML      = l.name;
          div.appendChild (name);
          
          unitName = l.name;
          otherInfo = l.nation.nationId;
          break;
          
        case "COP":
          img.src = "img/cop-" + l.army.armyId + ".png";
          div.appendChild (img);
          
          unitName = "";
          otherInfo = l.army.armyId;
          break;

        default:
          throw ("Invalid class name");
          return;
      }
      
      const unitData = { unitType:unitType, name:unitName, otherInfo:otherInfo, imgWidget:img, ownerObj:l };
      this.mapOfUnits.set (unitId, unitData);
    }
    
    this.baseWidget.style.display = "block";
  }
  
  
  static onclick (ev)
  {
    unitPicker.onclick_ (ev);
  }
  
  
  onclick_ (ev)
  {
    // Find which unit was clicked
    this.selectedUnitId = ev.currentTarget.id;
    this.selectedUnit = this.mapOfUnits.get (this.selectedUnitId);
    
    // Highlight the unit being positioned
    this.selectedUnit.imgWidget.style.boxShadow = "0 0 9px red";
    
    positionPicker.show (this.selectedUnit.unitType, ev.currentTarget.id, this.selectedUnit.name, this.selectedUnit.otherInfo); 
    positionPicker.moveTo (ev.x, ev.y); 
  }
  

  cancelSelection ()
  {
    this.selectedUnit.imgWidget.style.boxShadow = "none";
    this.selectedUnit = null;
  }
  

  close ()
  {
    // Remove all widgets
    for (let r of this.table.childNodes)
    {
      r.remove ();
    }
    
  
    this.baseWidget.style.display = "none";
  }
 
  
  confirmSelection ()
  {
    this.selectedUnit.ownerObj.x           = positionPicker.x;
    this.selectedUnit.ownerObj.y           = positionPicker.y;
    
    if (this.selectedUnit.unitType == "Leader")
    {
      this.selectedUnit.ownerObj.orientation = positionPicker.orientation;
      this.selectedUnit.ownerObj.mode        = positionPicker.mode;
    }
    this.selectedUnit.ownerObj.draw ();
    
    // Remove element from the list
    this.mapOfUnits.delete (this.selectedUnitId);
    
    // and its row
    document.getElementById (this.selectedUnitId).remove ();
    
    // and reset the positionPicker
    positionPicker.hide ();
  }
}

