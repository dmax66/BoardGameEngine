class ModalDialogBox
{
  constructor (baseWidgetName)
  {
    this.baseWidget = document.getElementById (baseWidgetName);
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


class YesNoDialogBox extends ModalDialogBox 
{
  constructor ()
  {
    super ("yesno-dialog");
    this.yesButton = document.getElementById ("yes-button");
    this.noButton = document.getElementById ("no-button");
    this.prompt = document.getElementById ("yesno-prompt");
    this.gif = document.getElementById ("yesno-gif");
    this.retVal = document.getElementById ("yesno-result");
  }
  
  open (gif, prompt, labelYes, labelNo)
  {
    this.prompt.innerHTML = prompt;
    this.gif.src = "img/" + gif;
    this.yesButton.value = labelYes;
    this.noButton.value = labelNo;
    
    this.retVal.value = "";
    
    ModalDialogBox.prototype.open.call (this);
  }

  getResult ()
  {
    return this.retVal.value;  
  }
}



class DieRollDialogBox extends ModalDialogBox
{
  constructor ()
  {
    super ("die-roll-dialog", false);
    this.gif = document.getElementById ("rolling-die");
    this.retVal = document.getElementById ("die_roll_result");
    this.okButton = document.getElementById ("die_roll_ok")
  }

  open ()
  {
    document.getElementById ("rolling-die").style.visibility = "visible";
    document.getElementById ("die_roll_result").style.visibility = "hidden";
    document.getElementById ("die_roll_ok").disabled = true;

    this.retVal.value = Controller.rollOneDie ();
    
    ModalDialogBox.prototype.open.call (this);

    // Show the gif
    this.gif.style.display = "block";
    
    // Wait 2 secs and hide the gif
    window.setTimeout ( 
      function () 
      {
        document.getElementById ("rolling-die").style.visibility = "hidden";
        document.getElementById ("die_roll_result").style.visibility = "visible";
        document.getElementById ("die_roll_ok").disabled = false;
      }        
      , 2000);
    
  }
  
  
  getDieRoll ()
  {
    return this.retVal.value;   
  }

}


class ActivateSSDialogBox extends ModalDialogBox
{
  constructor (baseWidget, playerIdx) 
  {
    super (baseWidget);
    
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
        dieRollDialogBox.open ();
        
        if (dieRollDialogBox.getDieRoll() <= 2 )  
        {
          a.activateSS (ssName);        
          alert ("Supply Source activated:" + ssName);
        }
        else 
        {
          alert ("Supply Source reactivation failed"); 
        }
      }  
    }    
  }


}


/*

class getAP_dialog
{
  constructor (parentWidget, widgetClass, title, id)
  {
    this.distance = undefined;
    this.id = id;
    this.dieRoll = -1;
    
    const dBox = document.createElement("DIV");
    parentWidget.appendChild (dBox);
    dBox.setAttribute("class", widgetClass + " modal");
    dBox.innerHTML = title;
    dBox.id = id;
    
    const iBox = document.createElement("DIV");
    iBox.setAttribute("class", widgetClass + " modal-content");
    iBox.style.zIndex = 100;
    dBox.appendChild (iBox);        
    
    // Close icon
    const closeIcon = document.createElement ("IMG");
    closeIcon.setAttribute ("class", "close-icon");
    closeIcon.src = "img/close.png";
    closeIcon.onclick = function () { document.getElementById (id).remove(); }
    iBox.appendChild (closeIcon);

    this.distanceWidget = document.createElement ("INPUT");
    this.distanceWidget.setAttribute ("class", "modal-box-input");
    this.distanceWidget.type = "TEXT";
    iBox.appendChild (this.distanceWidget);
    
    const l = document.createElement("LABEL");
    l.setAttribute ("class", "modal-box-text");
    l.innerHTML = "Distance Supply Source to CoP?";
    l.htmlFor = this.distanceWidget;
    iBox.appendChild (l);
    
    // Throw die button
    const btn = document.createElement ("INPUT");
    btn.type = "BTN";
    btn.setAttribute ("class", "game-button");    
    btn.innerHTML = "Roll die for AP!";
    btn.value = "Roll die for AP!";
    btn.onclick = this.rollDie; 
    iBox.appendChild (btn);    

    // Result
    this.dieRollWidget = document.createElement ("INPUT");
    this.dieRollWidget.setAttribute ("class", "modal-box-result");
    this.dieRollWidget.id = "APMBDieRoll";
    this.dieRollWidget.readOnly = true;
    this.dieRollWidget.style.visibility = "hidden";
    iBox.appendChild (this.dieRollWidget);
  }

  show ()
  {
    document.getElementById (this.id).style.display = "initial";  
  }  

  rollDie ()
  {
    const dieRollWidget = document.getElementById ("APMBDieRoll");
    dieRollWidget.value = Game.rollDie();
    dieRollWidget.style.visibility = "initial";
  }
  

  close () 
  {
     document.getElementById (this.id).remove(); 
  }
}
*/

