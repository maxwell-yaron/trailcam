class CameraView {
  constructor(id, width, height, address, port) {
    this.div = document.getElementById(id);
    this.canvas = document.createElement("canvas");
    this.div.appendChild(this.canvas);
    this.canvas = this.div.childNodes[0];
    this.canvas.setAttribute("class","cameraView");
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d");
    this.socket = new Socket(address, port);
    this.socket.onclose = event => this.setError(`Error: ${event.code}`);
    this.socket.onerror = event => this.setError(`Error: ${event.code}`);
    this.socket.onmessage = event => this.setImage(event.data);
    this.canvas.addEventListener("click", ev => this.socket.open());
    this.encoding = 'jpeg'
  }

  clear() {
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
  }

  setMessage(msg, color, size) {
    this.clear();
    this.ctx.font = `${size}px Courier`;
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = color;
    this.ctx.fillText(msg, this.canvas.width/2, this.canvas.height/2);
  }

  setInfo(msg, size = 20) {
    this.setMessage(msg, '#00aaff', size);
  }

  setError(msg, size = 20) {
    this.setMessage(msg, '#ff0000', size);
  }

  setImage(data) {
    var blob = new Blob([data],{type:'image/jpeg'});
    var url = URL.createObjectURL(blob);
    var img = new Image();
    img.onload = function() {
      this.canvas.width = img.width;
      this.canvas.height = img.height;
      this.ctx.drawImage(img,0,0);
    }.bind(this);
    img.src = url;
  }
}
