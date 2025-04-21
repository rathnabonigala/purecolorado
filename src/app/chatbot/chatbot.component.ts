import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  imports: [],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})

export class ChatbotComponent {
  userInput = '';
  messages: { text: string, from: 'user' | 'bot' }[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ text: this.userInput, from: 'user' });

    this.chatService.sendMessage(this.userInput).subscribe(response => {
      this.messages.push({ text: response.reply.trim(), from: 'bot' });
    });

    this.userInput = '';
  }
}

