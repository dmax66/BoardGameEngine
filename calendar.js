class Calendar {
  constructor () {
    this.timeTrack = [];
  }


  init (startTurn) {
    
  
  }
  
  
  loadFromDB (startTurn) {
    const url = "app/get_calendar.php?turn=" + startTurn; 
    call_server_api_get (url, calendar_xhttp_callback);
  }
  
}


let theCalendar = new Calendar ();



function calendar_xhttp_callback (xhttp_obj)
{
  theCalendar.timeTrack = JSON.parse (xthhp_obj.responseText);
}