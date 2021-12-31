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


class AllocateAPDialogBox extends ModalDialogBox 
{
  constructor ()
  {
    super ("allocateAP-dialog");

    this.allocatedAPwidgets = new Map ();
    this.okButton = document.getElementById ("allocate_ap_ok");
    this.isInitialised = false;
  }  
   

  initialise ()
  {
    const t = document.getElementById ("allocateAPtable");
    
    for (let a of theGame.armies)
    {
      const r = t.insertRow (-1);
      r.style.display = "none";
      
      const c1 = r.insertCell (-1);
      c1.style.width = "34%";
      c1.innerHTML = a.name;
      
      const c2 = r.insertCell (-1);
      c2.style.width = "33%";
      
      const c3 = r.insertCell (-1);
      c3.style.width = "33%";
      
      const allocatedAPWidget = document.createElement ("INPUT");
      allocatedAPWidget.type = "NUMBER";
      allocatedAPWidget.setAttribute ("class", "ap-input");
      allocatedAPWidget.min = 0;
      allocatedAPWidget.max = 6; // @TODO: this depends on the current level of APs, the army and the season     
      c3.appendChild (allocatedAPWidget);
      
      this.allocatedAPwidgets.set (a.armyId, { rowWidget: r,  availabeAP: c2, inputWidget: allocatedAPWidget} );
    }
    
    this.isInitialised = true;
  }
    
    
  static checkInputValues ()
  {
    for (let a of theGame.players[theGame.currentPlayer].armies)
    {
      const d = allocateAPDialogBox.allocatedAPwidgets.get (a.armyId);  
      if (d.inputWidget.value == "")
      {
        // Not all input fields filled
        return;      
      }      
    }

    allocateAPDialogBox.okButton.disabled = false;
  }


  open (armies)
  {
    if (!this.initialised)
    {
      this.initialise ();    
    }

    for (let a of armies)
    {
      const d = this.allocatedAPwidgets.get (a.armyId);  

      d.rowWidget.style.display = "block";
      d.availabeAP.innerHTML = a.adminPoints;
      d.inputWidget.value = "";
      d.inputWidget.onblur = AllocateAPDialogBox.checkInputValues;
    }

    this.okButton.disabled = true;      
    ModalDialogBox.prototype.open.call (this);  
  }

  
  close ()
  {
    for (let a of theGame.players[theGame.currentPlayer].armies)
    {
      const d = this.allocatedAPwidgets.get (a.armyId);
      d.rowWidget.style.display = "none";
      d.inputWidget.onblur = function () {};
    }
    
    ModalDialogBox.prototype.close.call (this);
    
    Controller.allocateAP ();
  }


  getAllocatedAP (armyId)
  {
    const d = this.allocatedAPwidgets.get (armyId);
    
    return (1 * d.inputWidget.value);
  }
}


class GetAPDialogBox extends ModalDialogBox
{
  constructor ( title, id)
  {
    super ("ap-dialog");
    this.receivedAP = document.getElementById ("ap");
    this.doneButton = document.getElementById ("get_ap_ok");
    this.dieRoll = 0;
  }

  rollDie ()
  {
    dieRollDialogBox.open ();
    
    this.dieRoll = dieRollDialogBox.getDieRoll ();
//    this.receivedAp.innerHTML = ..
    
    this.doneButton.style.display = "block";
  }
  
  open ()
  {
    this.receivedAp.innerHTML = "";
    this.doneButton.style.display = "none";
  }
  
  AP ()
  {
    return (1 * this.receivedAp.innerHTML);
  }
}

