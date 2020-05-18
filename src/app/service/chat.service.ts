import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Message } from '../Model/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatNotifier = new BehaviorSubject('init');
  hubConnection:HubConnection;
  constructor(private http:HttpClient) { 
    this.ConnectToHub();
  }
   ConnectToHub() {
    this.hubConnection = new HubConnectionBuilder().withUrl('https://localhost:44364/chat').build();
    this.hubConnection
    .start()
    .then((data) => console.log('Connection started!'))
    .catch(err => console.log('Error while establishing connection :('));
    this.hubConnection.on("receiveMessage",data=>{
      this.chatNotifier.next(data);
    })
  }
  CloseConnectio(){

  }
  SendMessage(body){
    let query=new Message();
    query.body=body;
    return this.http.post("https://localhost:44364/api/message",query);
  }
}
