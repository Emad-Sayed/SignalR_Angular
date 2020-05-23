import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { Message } from '../../Model/Message';
import {  filter } from 'rxjs/operators';
import { ChatWithTokenService } from 'src/app/service/chat-with-token.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message:string;
  allMessages:string[]=[];
  subscription:Subscription;
  constructor(private chatService:ChatWithTokenService) { 
    this.subscription=chatService.chatNotifier.pipe(
    filter(x => x != 'init'))
    .subscribe(
      data=>{
        this.allMessages.push(data);
      }
    )
  }
  ngOnInit() {
  
  }
  ngOnDestroy() {
  this.subscription.unsubscribe();
  }
  SendMessage (){
    this.chatService.SendMessage(this.message).subscribe(
      data=>{
      }
    );
  }
}
