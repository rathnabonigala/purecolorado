package com.BMart.dto;

public class ChatResponse {
	private String reply;

	public ChatResponse() {
	}

	// Added: ChatbotController calls new ChatResponse(reply), but the class
	// originally had no such constructor, so the backend did not compile.
	public ChatResponse(String reply) {
		this.reply = reply;
	}

	public String getReply() {
		return reply;
	}

	public void setReply(String reply) {
		this.reply = reply;
	}

}
