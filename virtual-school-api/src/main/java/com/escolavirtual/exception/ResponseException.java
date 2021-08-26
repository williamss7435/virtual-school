package com.escolavirtual.exception;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseException {
	private String message;
	private LocalDateTime timestamp;
}
