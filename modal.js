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


class WeatherDialogBox extends ModalDialogBox
{
  constructor ()
  {
    super ("weather_box");  
    this.rollDieButton = document.getElementById ("weather_roll_die");
    this.rollDieResult = document.getElementById ("weather_result");
    this.weather       = document.getElementById ("weather_text");
    this.okButton      = document.getElementById ("weather_ok");

    this.rollDieButton.onclick = function () 
    {
      dieRollDialogBox.open (weatherDialogBox);  
    }
    
    this.okButton.onclick = function ()
    {
      Controller.onCloseWeatherDialog ();    
    }      
  }


  open ()
  {
    this.rollDieButton.disabled = false;
    this.rollDieResult.innerHTML = "";
    this.weather.innerHTML = "";
    this.okButton.disabled = true;
    
    ModalDialogBox.prototype.open.call (this);
  }


  onRollDie ()
  {
    this.okButton.disabled = true;
    
    dieRollDialogBox.open();
  }


  onDieRolled ()
  {
    const i = dieRollDialogBox.getDieRoll();  
    const season = theGame.calendar[theGame.currentTurn].season;
   
    this.rollDieResult.innerHTML = i;

    for (let k of theGame.weatherTable)
    {
      if (k.Season == season && k.DieRoll == i)
      {
        this.weather.innerHTML = k.Weather;
        break; 
      }
    }

    this.rollDieButton.disabled = true;
    this.okButton.disabled = false;  
  }

  
  getWeather ()
  {
    return this.weather.innerHTML;  
  }
}


class DieRollDialogBox extends ModalDialogBox
{
  constructor ()
  {
    super ("die-roll-dialog");
    this.gif      = document.getElementById ("rolling-die");
    this.retVal   = document.getElementById ("die_roll_result");
    this.okButton = document.getElementById ("die_roll_ok");
    
    this.okButton.onclick = DieRollDialogBox.close_;
    this.callingObj = null; 
  }

  open (callingObj)
  {
    ModalDialogBox.prototype.open.call (this);

    // Store where to resume when the dialog is closed
    this.callingObj = callingObj; 
    
    this.gif.src = "./img/animated-die.gif" 
    this.gif.style.width = "140px";
    this.gif.style.visibility = "visible";
    this.okButton.disabled = true;

    // Show the gif
    this.gif.style.display = "block";
    
    // Wait x secs and hide the gif
    window.setTimeout ( 
      function () 
      {
        dieRollDialogBox.retVal.innerHTML = Controller.rollOneDie ();
        dieRollDialogBox.gif.src = "./img/" + dieRollDialogBox.retVal.innerHTML + ".png" 
        dieRollDialogBox.okButton.disabled = false;               // Enable the OK button
      }        
      , 1000);
  }

  
  static close_ ()
  {
    dieRollDialogBox.close ();
    dieRollDialogBox.callingObj.onDieRolled ();
  }


  getDieRoll ()
  {
    return 1 * this.retVal.innerHTML;   
  }

}


class ActivateSSDialogBox extends ModalDialogBox
{
  constructor (baseWidget, player) 
  {
    super (baseWidget);
    
    this.armyTable = document.getElementById ("army_SS");

    for (let entry of player.armies.entries())
    {
      const army = entry[1];
      
      if (army.activeSSName == null)
      {
        const newRow = this.armyTable.insertRow (-1);
        
        const armyNameCell              = newRow.insertCell (0);
        const possibleSupplySourcesCell = newRow.insertCell (1);
        const confirmButtonCell         = newRow.insertCell (2);

        // The OK button
        const okButton = document.getElementById ("activate_SS_ok");
        okButton.disabled = true;

        const f = document.createElement ("FORM");
        f.name = army.armyId;
        f.onsubmit = function (ev) 
        {
          f.disabled = true;
          ActivateSSDialogBox.tryToReactivate (ev);
          reactivateButton.disabled = true;
          okButton.disabled = false;
        }
        possibleSupplySourcesCell.appendChild (f);
                
        // Army name
        armyNameCell.innerHTML = army.name;

        // Add the possible options 
        for (let e2 of army.supplySources.entries())
        {
          const supplySource = e2[1];
          
          let option = document.createElement ("INPUT");
//          option.setAttribute ("class", ...);
          option.type  = "RADIO";
          option.value = supplySource.name;
          option.name  = army.armyId;
          option.onchange = function () { reactivateButton.disabled = false; };
 
          let label = document.createElement ("LABEL");
//          label.setAttribute ("class", ...);          
          label.htmlFor = supplySource.name;   
          label.innerHTML = supplySource.name + "<br>";
          
               
          f.appendChild (option);
          f.appendChild (label);
        }

        // The Submit button  
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

    // Disable all elements of the form
    const allFormElements = selectedSS.parentNode.childNodes;
    
    for (let i = 0; i < allFormElements.length; i++)
    {
      if (allFormElements[i].nodeName == "INPUT")
      {
        allFormElements[i].disabled = true;
      }
    }

    // TODO: roll die   
//    selectedSS.parentNode.style =     
    dieRollDialogBox.open ();

    
    if (dieRollDialogBox.getDieRoll() <= 2 )  
    {
      const army = theGame.currentPlayerObj.armies.get (armyId);
      army.activateSS (ssName);        
      alert ("Supply Source activated:" + ssName);
    }
    else 
    {
      alert ("Supply Source reactivation failed"); 
    }
  }


} // Class



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
    
    for (let a of theGame.armies.entries())
    {
      const r = t.insertRow (-1);
      r.style.width = "100%";
      r.style.display = "none";
      
      const c1 = r.insertCell (-1);
      c1.innerHTML = a[1].name;
      
      const c2 = r.insertCell (-1);
      
      const c3 = r.insertCell (-1);
      
      const allocatedAPWidget = document.createElement ("INPUT");
      allocatedAPWidget.type = "NUMBER";
      allocatedAPWidget.setAttribute ("class", "ap-input");
      allocatedAPWidget.min = 0;
      allocatedAPWidget.max = 6; // @TODO: this depends on the current level of APs, the army and the season     
      allocatedAPWidget.required = true;
      c3.appendChild (allocatedAPWidget);
      
      this.allocatedAPwidgets.set (a[1].armyId, { rowWidget: r,  availabeAP: c2, inputWidget: allocatedAPWidget} );
    }
    
    this.isInitialised = true;
  }
    
    
  static checkInputValues ()
  {
    for (let a of theGame.players[theGame.currentPlayer].armies.entries())
    {
      const d = allocateAPDialogBox.allocatedAPwidgets.get (a[1].armyId);  
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
      const d = this.allocatedAPwidgets.get (a[1].armyId);  

      d.rowWidget.style.display = "contents";
      d.availabeAP.innerHTML = a[1].adminPoints;
      d.inputWidget.value = "";
      d.inputWidget.onchange = AllocateAPDialogBox.checkInputValues;
    }

    this.okButton.disabled = true;      
    ModalDialogBox.prototype.open.call (this);  
  }

  
  close ()
  {
    for (let a of theGame.currentPlayerObj.armies.entries())
    {
      const d = this.allocatedAPwidgets.get (a[1].armyId);
      d.rowWidget.style.display = "none";
      d.inputWidget.onchange = null;
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
  constructor ()
  {
    super ("ap-dialog");
    this.season   = document.getElementById ("ap-dialog-season");
    this.okButton = document.getElementById ("ap-dialog_ok");
    this.isInitialised = false;
    this.getAPwidgets = new Map ();
    this.receivedAP   = new Map ();
    this.numberOfArmies = 0;
  }


  initialise ()
  {
    const t = document.getElementById ("getAPtable");
    
    for (let a of theGame.armies.entries())     // Horrible!
    {
      const r = t.insertRow (-1);
      r.style.display = "none";
      
      const c = r.insertCell (-1);
      c.colSpan = 5;
      
      
      // The form
      const formName = "A:" + a[1].armyId;
      const f = document.createElement ("FORM");
      f.name = formName;
      f.setAttribute ("data-owner", a[1].armyId);
      f.onsubmit = function (ev) {
        GetAPDialogBox.rollDie (ev);
      }
      c.appendChild (f);

      // Army name
      const c1 = document.createElement ("SPAN")
      c1.innerHTML = a[1].name;
      c1.style.margin = "10px";
      f.appendChild (c1);
      
      // Distance SS-COP
      const distance = document.createElement ("SELECT");
      distance.style.width = "120x"
      distance.style.margin = "10px";
      distance.required = true;
      distance.setAttribute ("class", "get-ap-distance");
      f.appendChild (distance);
      
      // TODO: get the possible values from the table - remove hardcoding
      const o1 = document.createElement ("OPTION");
      o1.innerHTML = "0-20";
      o1.value = o1.innerHTML;
      distance.appendChild (o1);
      
      const o2 = document.createElement ("OPTION");
      o2.innerHTML = "21-40";
      o2.value = o2.innerHTML;
      distance.appendChild (o2);
      
      const o3 = document.createElement ("OPTION");
      o3.innerHTML = "41-60";
      o3.value = o3.innerHTML;
      distance.appendChild (o3);
      
      const o4 = document.createElement ("OPTION");
      o4.innerHTML = "61-80";
      o4.value = o4.innerHTML;
      distance.appendChild (o4);
      
      const o5 = document.createElement ("OPTION");
      o5.innerHTML = "80+";
      o5.value = o5.innerHTML;
      distance.appendChild (o5);
      

      // Roll die button
      const button = document.createElement ("INPUT");
      button.type = "SUBMIT";
      button.style.width = "90px";
      button.style.margin = "10px";
      button.value = "Roll die";
      button.setAttribute ("class", "get-ap-button");
//      button.setAttribute ("data-owner", a[1].armyId);
      f.appendChild (button);
      
      // Die roll result
      const c4 = document.createElement ("SPAN")
      c4.style.width = "20px";
      c4.style.margin = "10px";
      f.appendChild (c4);
      
      // Received AP
      const c5 = document.createElement ("SPAN")
      c5.style.width = "20px";
      c5.style.margin = "10px";
      f.appendChild (c5);
      
      this.getAPwidgets.set (a[1].armyId, { rowWidget: r,  distanceSS_COP: distance, rollDieButton:button, dieRollResult: c4, receivedAP: c5 } );
    }
    
    this.isInitialised = true;
  }
    
    
  static rollDie (e)
  {
    // Retrieve the object
    e.preventDefault ();
    getAPDialogBox.rollDie_ (e.target) ;
  }   
    
  
  rollDie_ (f) 
  {
    const armyId = f.getAttribute ("data-owner");
    
    // 
    const armyRow = this.getAPwidgets.get (armyId);

    // Check that the distance field is set
    if (armyRow.distanceSS_COP.value == "")
    {
      // Show a message
      alert ("Distance SS-COP not set");
      return;
    }

    const dieRoll  = Controller.rollOneDie ();
    const seasonId = this.season.innerHTML;
    const distance = armyRow.distanceSS_COP.value;
    const ap       = theGame.aPPTable.getAP (armyId, seasonId, distance, dieRoll); 

    // Disable a further die roll
    armyRow.rollDieButton.disabled = true;
    
    // Fill the output data
    armyRow.dieRollResult.innerHTML = dieRoll;
    armyRow.receivedAP.innerHTML = ap;
    
    // And record the result
    this.receivedAP.set (armyId, ap);
    
    // Check whether to activate the OK button
    if (this.allDone ())
    {
      this.okButton.disabled = false;      
    }
  }
    
 
  open (armies, season)
  {
    if (!this.initialised)
    {
      this.initialise (armies);    
    }

    this.season.innerHTML = season;
    
    ModalDialogBox.prototype.open.call (this);

    this.numberOfArmies = armies.size;
          
    for (let a of armies.entries())
    {
      const d = this.getAPwidgets.get (a[1].armyId);  

      // Display the row 
      d.rowWidget.style.display = "contents";
      
      // Enable the die roll button
      d.rollDieButton.disabled = false;

      // Clear the die roll result
      d.dieRollResult.innerHTML = "";
      
      // And the number of APs received
      d.receivedAP.innerHTML = "";

      // Clear the result map
      this.receivedAP.delete (a[1].armyId);
    }

    this.okButton.disabled = true;      
  }


  allDone ()
  {
    const result = (this.receivedAP.size == this.numberOfArmies);
    
    return result;
  }

  
  close ()
  {
    this.okButton.disabled = false;
    ModalDialogBox.prototype.close.call (this);
  }


  getAP (armyId)
  {
    const result = this.receivedAP.get (armyId);
    
    return result;
  }
}

