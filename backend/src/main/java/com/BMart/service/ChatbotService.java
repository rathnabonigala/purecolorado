package com.BMart.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;

@Service
public class ChatbotService {

    private static final Logger log = LoggerFactory.getLogger(ChatbotService.class);

    static final String FALLBACK_REPLY =
            "Sorry, our shopping assistant is unavailable right now. " +
            "Please try again in a moment, or browse the shop and we'll be happy to help.";

    private static final String SYSTEM_PROMPT =
            "You are the friendly shopping assistant for Pure Colorado, a small shop " +
            "that sells locally made Colorado products (food, gifts, and goods from " +
            "Colorado makers). Answer questions about the shop and its products " +
            "helpfully and briefly. If you don't know a specific product detail, " +
            "say so and suggest browsing the product list.";

    private final OpenAiService openAiService;

    // OpenAiService is built from the openai.api.key property (environment
    // variable OPENAI_API_KEY) in OpenAiConfig and injected here — no API key
    // is ever written in source code.
    public ChatbotService(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    public String askQuestion(String question) {
        if (question == null || question.isBlank()) {
            return "Please type a question and I'll do my best to help!";
        }
        try {
            ChatCompletionRequest request = ChatCompletionRequest.builder()
                    .model("gpt-4o-mini")
                    .messages(List.of(
                            new ChatMessage("system", SYSTEM_PROMPT),
                            new ChatMessage("user", question)))
                    .maxTokens(300)
                    .temperature(0.7)
                    .build();

            String reply = openAiService.createChatCompletion(request)
                    .getChoices()
                    .get(0)
                    .getMessage()
                    .getContent();

            return (reply == null || reply.isBlank()) ? FALLBACK_REPLY : reply.trim();
        } catch (Exception e) {
            // Never let an OpenAI outage (or a missing/invalid API key) become a
            // 500 for the shopper — log it and return a friendly fallback.
            log.warn("Chatbot failed to get a reply from OpenAI: {}", e.getMessage());
            return FALLBACK_REPLY;
        }
    }
}
