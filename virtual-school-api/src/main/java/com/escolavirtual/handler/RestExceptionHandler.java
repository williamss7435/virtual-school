package com.escolavirtual.handler;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.escolavirtual.exception.BadRequestException;
import com.escolavirtual.exception.EntityAlreadyExistsException;
import com.escolavirtual.exception.ResponseException;

@ControllerAdvice
public class RestExceptionHandler {

	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<ResponseException> handlerBadRequestException(BadRequestException exception){
		return new ResponseEntity<ResponseException>(
				ResponseException.builder()
				.message(exception.getMessage())
				.timestamp(LocalDateTime.now())
				.build(), 
				HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(EntityAlreadyExistsException.class)
	public ResponseEntity<ResponseException> handlerBadRequestException(EntityAlreadyExistsException exception){
		return new ResponseEntity<ResponseException>(
				ResponseException.builder()
				.message(exception.getMessage())
				.timestamp(LocalDateTime.now())
				.build(), 
				HttpStatus.CONFLICT);
	}
	
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ResponseException> handlerMethodArgumentNotValidException(MethodArgumentNotValidException exception){
		return new ResponseEntity<ResponseException>(
				ResponseException.builder()
				.message(exception.getBindingResult().getFieldError().getDefaultMessage())
				.timestamp(LocalDateTime.now())
				.build(), 
				HttpStatus.BAD_REQUEST);
		
	}
}
