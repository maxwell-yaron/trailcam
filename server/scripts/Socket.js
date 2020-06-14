class Socket {
  constructor(address, port, secure = false) {
    this.address = address;
    this.port = port;
    this.socket = null;
    this.prot = (secure ? 'wss' : 'ws');
    this.onopen = function(){};
    this.onclose = function(){};
    this.onmessage = function(){};
    this.onerror = function(){};
  }

  open() {
    var url = `${this.prot}://${this.address}:${this.port}`;
    this.socket = new WebSocket(url);
    this.socket.onopen = this.onopen;
    this.socket.onmessage = this.onmessage;
    this.socket.onclose = this.onclose;
    this.socket.onerror = this.onerror;
  }

  close() {
    if(this.socket) {
      this.socket.close();
    }
  }
}
