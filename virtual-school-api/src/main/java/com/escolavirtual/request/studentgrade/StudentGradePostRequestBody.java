package com.escolavirtual.request.studentgrade;

import javax.validation.constraints.NotNull;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentGradePostRequestBody {
	@NotNull(message = "id do estudante não pode ser vazio")
	private Long studentId;
	
	@NotNull(message = "id da disciplina não pode ser vazio")
	private Long disciplineId;
}
