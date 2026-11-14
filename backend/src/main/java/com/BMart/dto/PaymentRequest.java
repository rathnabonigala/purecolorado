package com.BMart.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest {
    private Long amount;
    private String currency;
	
}