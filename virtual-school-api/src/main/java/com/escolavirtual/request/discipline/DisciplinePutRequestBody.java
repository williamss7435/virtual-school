package com.escolavirtual.request.discipline;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DisciplinePutRequestBody {
	private String name;
	
	private String description;
	
	private LocalDateTime startDate;
	
	private LocalDateTime endDate;
	
	private boolean active;
	
	private Long tutorId;
}
