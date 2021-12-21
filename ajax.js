let db_result="";

function call_server_api_get (url, handler_func)
{
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() { if (this.readyState == 4 && this.status == 200) handler_func (this);}

  xhttp.open("GET", url, false);
  xhttp.send();

}


function call_server_api_post (url, data, handler_func, async)
{
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() { if (this.readyState == 4 && this.status == 200) handler_func (this);}

  xhttp.open ("POST", url, async);
  xhttp.setRequestHeader ("Content-type", "application/json");
  xhttp.send (data);
  xhttp.send ();
}


