import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { QueueingSubject } from 'queueing-subject';
import websocketConnect from 'rxjs-websockets';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class WebsocketService {
  private socket: WebSocket;
  private listener: EventEmitter<any> = new EventEmitter();
  title = 'raj';
  public constructor() {
        console.log('websocket service constructor called');
        this.socket = new WebSocket('ws://localhost:8888');
        this.socket.onopen = event => {
            this.listener.emit({'type': 'open', 'data': event});
        };
        this.socket.onclose = event => {
            this.listener.emit({'type': 'close', 'data': event});
        };
        this.socket.onmessage = event => {
          console.log('message recived' + event.data);
            this.listener.emit({'type': 'message', 'data': event.data.toString()});
        };
   }
   public send(data: string) {
        this.socket.send(data);
    }

    public close() {
      console.log('socket connection closed');
        this.socket.close();
    }

    public getEventListener() {
        return this.listener;
    }




}
