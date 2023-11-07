import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {} 

  socket = io('http://localhost:3000');

  public sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  public getNewMessage = () => {
    this.socket.on('message', (message) =>{
      this.message$.next(message);
      console.log(message);
    });
    
    return this.message$.asObservable();
  };
}