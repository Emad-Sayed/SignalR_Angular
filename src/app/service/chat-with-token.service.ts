import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HubConnection, IHttpConnectionOptions, HubConnectionBuilder } from '@aspnet/signalr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../Model/Message';
import { NotificationGroup } from '../Model/NotificationGroup';

@Injectable({
  providedIn: 'root'
})
export class ChatWithTokenService {
  chatNotifier = new BehaviorSubject('init');
  hubConnection:HubConnection;
  constructor(private http:HttpClient) { 
    this.ConnectToHub();
  }
   ConnectToHub() {
     //#region Auth
     const options: IHttpConnectionOptions = {
      accessTokenFactory: () => {
        return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImExOGJlOWMwLWFhNjUtNGFmOC1iZDE3LTAwYmQ5MzQ0ZTU3NSIsIkJyYW5jaF9EZXBhcnRlbWVudCI6IjEiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImp0aSI6IjY3YjU3YzNjLWUxODgtNDRiZS1hNjJkLWNiM2Y3NjVmNzA0YyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6ImFkbWluIiwiZXhwIjoxNTkwNTAxNTYwLCJpc3MiOiJhc2RAYXNkLmNvbSIsImF1ZCI6ImFzZEBhc2QuY29tIn0.WL-GDvDT4tFWcbqwGV-w3H0fLiU318hHdWisxupE-QY";
      }
    };
     //#endregion
    this.hubConnection = new HubConnectionBuilder().withUrl('https://localhost:44366/ticket',options).build();
    this.hubConnection
    .start()
    .then((data) => {
      console.log('Connection started!')
      this.hubConnection.invoke("CreateNotificationGroup",1);
    })
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
    return this.http.post("https://localhost:44366/api/ticket",query);
  }
}
