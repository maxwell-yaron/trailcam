function clear(id) {
  var elem = document.getElementById(id);
  var ctx = elem.getContext("2d");
  ctx.clearRect(0,0,elem.width, elem.height);
}

function setMessage(id, msg) {
  clear(id);
  var elem = document.getElementById(id);
  var ctx = elem.getContext("2d");
  var font_size = 20;
  var x = elem.width/2 - ((font_size * msg.length) / 2);
  ctx.font = `${font_size}px Courier`;
  ctx.textAlign = "center";
  ctx.fillStyle = "#00aaff";
  ctx.fillText(msg, elem.width/2, elem.height/2);
}
