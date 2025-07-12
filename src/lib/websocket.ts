export class WebSocketClient {
  ws: WebSocket;

  constructor(host: string) {
    this.ws = new WebSocket(host);
  }

  onSend(data: any) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(data));
      // this.ws.close();
    };
  }
}
