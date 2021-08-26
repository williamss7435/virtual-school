package com.escolavirtual.request.tutor;

import javax.validation.constraints.Email;

import org.hibernate.validator.constraints.Length;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TutorPutRequestBody {
	private String name;
	
	@Email(message = "email inválido")
	private String email;
	
	@Length(min = 4, message = "a senha deve ser maior que 4 digitos")
	private String password;
	
	private Long employeeCode;
}
