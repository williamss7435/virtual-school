package com.escolavirtual.request.student;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import org.hibernate.validator.constraints.Length;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentPostRequestBody {
	@NotEmpty(message = "o nome não pode ser vazio")
	private String name;
	
	@NotEmpty(message = "O email não pode ser vazio")
	@Email(message = "email inválido")
	private String email;
	
	@NotEmpty(message = "a senha não pode ser vazia")
	@Length(min = 4, message = "a senha deve ser maior que 4 digitos")
	private String password;
}
