package com.escolavirtual.request.discipline;

import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DisciplinePostRequestBody {
	@NotEmpty(message = "o nome não pode ser vazio")
	private String name;
	
	@NotEmpty(message = "a descrição não pode ser vazia")
	private String description;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
	@NotNull(message = "a data de inicio não pode ser vazia")
	private LocalDateTime startDate;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
	@NotNull(message = "a data de termino não pode ser vazia")
	private LocalDateTime endDate;
	
	@NotNull(message = "escolha se a disciplina está ativa ou não")
	private boolean active;
	
	private Long tutorId;
}
