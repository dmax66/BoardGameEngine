// Database manipulation functions


function updateLeaderDataOnDB (aLeader) {
  let queryString = "game_id=" + game.id;
  queryString += "&id=" + aLeader.id;
  queryString += "&x=" + aLeader.x;
  queryString += "&y=" + aLeader.y
  queryString += "&orientation=" + aLeader.orientation;
  queryString += "&mode=" + aLeader.mode;
  queryString += "&zOrder=" + aLeader.zOrder;
  queryString += "&parentId=" + aLeader.parentId;

  const url = "app/update_leader.php?" + queryString;

  call_server_api_get (url, handler_func);
}