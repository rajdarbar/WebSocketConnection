import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';
import { WebsocketService } from './websocket.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  public messages: Array<any>;
    public chatBox: string;
    public url: string;
    public constructor(private socket: WebsocketService ) {
        this.messages = [];
        this.chatBox = '';
    }
   public ngOnDestroy() {
        this.socket.close();
    }
   public ngOnInit() {
     this.connectSocketServer();
    }
  public connecting() {
    this.connectSocketServer();
  }
  public connectSocketServer() {
     console.log('ngOnInit Is Called');
        console.log('Call websocket service');
        this.socket.getEventListener().subscribe(event => {
            if ( event.type === 'message') {
                let data = event.data;
                if (event.data.sender) {
                    data = event.data.sender + ': ' + data;
                }
                this.messages.push(data);
            }
            if (event.type === 'close') {
                this.messages.push('The socket connection has been closed');
              this.connecting();
            }
            if (event.type === 'open') {
                this.messages.push('The socket connection has been established');
            }
        });
  }
   public send() {
        if (this.chatBox) {
            this.socket.send(this.chatBox);
            this.chatBox = '';
        }
    }
  public isSystemMessage(message: string) {
        console.log(message);
        return  '<strong>' + message + '</strong>';
    }

 }


