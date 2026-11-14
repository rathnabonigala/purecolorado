import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {
  userInput = '';
  messages: { text: string, from: 'user' | 'bot' }[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    const text = this.userInput;
    this.messages.push({ text, from: 'user' });
    this.userInput = '';

    this.chatService.sendMessage(text).subscribe({
      next: response => {
        this.messages.push({ text: response.reply.trim(), from: 'bot' });
      },
      error: () => {
        this.messages.push({
          text: 'Sorry, the assistant is unreachable right now. Please try again in a moment.',
          from: 'bot'
        });
      }
    });
  }
}
