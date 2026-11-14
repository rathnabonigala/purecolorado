package com.BMart.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.theokanning.openai.service.OpenAiService;

/**
 * Builds the OpenAiService from configuration. The API key comes from the
 * openai.api.key property, which application.properties resolves from the
 * OPENAI_API_KEY environment variable — never from hard-coded source.
 */
@Configuration
public class OpenAiConfig {

    @Bean
    public OpenAiService openAiService(@Value("${openai.api.key:}") String apiKey) {
        return new OpenAiService(apiKey == null ? "" : apiKey);
    }
}
