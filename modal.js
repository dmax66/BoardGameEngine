class ModalDialogBox
{
  constructor (baseWidgetName, hasCloseIcon)
  {
    this.baseWidget = document.getElementById (baseWidgetName);
    this.hasCloseIcon = hasCloseIcon;
  }

  open ()
  {
    this.baseWidget.style.display = "block";
  }
  
  close ()
  {
    this.baseWidget.style.display = "none";
  }
}


class ActivateSSDialogBox extends ModalDialogBox
{
  constructor (baseWidget, hasCloseIcon, playerIdx) 
  {
    super (baseWidget, hasCloseIcon);
    
    this.armyTable = document.getElementById ("army_SS");

    for (let a of theGame.players[playerIdx].armies)
    {
      if (a.activeSSName == null)
      {
        const newRow = this.armyTable.insertRow (-1);
        
        const armyNameCell              = newRow.insertCell (0);
        const possibleSupplySourcesCell = newRow.insertCell (1);
        const confirmButtonCell         = newRow.insertCell (2);

        const f = document.createElement ("FORM");
        f.name = a.armyId;
        f.onsubmit = function (ev) {
          reactivateButton.disabled = true;
          ActivateSSDialogBox.tryToReactivate (ev);
        }
        possibleSupplySourcesCell.appendChild (f);
                
        
        armyNameCell.innerHTML = a.name;

        // Add the possible options 
        for (let ss of a.supplySources.entries())
        {
          let option = document.createElement("INPUT");
//          option.setAttribute ("class", ...);
          option.type  = "RADIO";
          option.value = ss[1].name;
          option.name  = a.armyId;
          option.onclick = function () { reactivateButton.disabled = false; };
 
          let label = document.createElement ("LABEL");
//          label.setAttribute ("class", ...);          
          label.htmlFor = ss[1].name;   
          label.innerHTML = ss[1].name + "<br>";
          
               
          f.appendChild (option);
          f.appendChild (label);
        }

        // The Submit button - will 
        const reactivateButton = document.createElement ("INPUT");
//        reactivateButton.setAttribute ("class", ...);
        reactivateButton.type = "SUBMIT";
        reactivateButton.disabled = true;
        reactivateButton.value = "Roll die to reactivate";
        f.appendChild (reactivateButton);
      }
    }        
  }


  static tryToReactivate (ev)
  {
    ev.preventDefault ();
    
    const armyId = ev.currentTarget.name;
    
    // Check which radio button is checked
    const selectedSS = document.querySelector ("input[name='" + armyId + "']:checked");
    const ssName = selectedSS.value;

    for (let a of theGame.players[theGame.currentPlayer].armies)
    {
      if (a.armyId == armyId)
      {
        // TODO: roll die        
          
        a.activateSS (ssName);        
        alert ("Supply Source activated:" + ssName);  
      }  
    }    
  }


}
