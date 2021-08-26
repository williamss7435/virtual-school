package com.escolavirtual.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Entity
public class Lesson {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false)
	private String description;
	
	@Column(nullable = false)
	private LocalDateTime startDate;
	
	@ManyToOne
	@JoinColumn(nullable = false)
	private Discipline discipline;
	
	@ManyToMany
	@JoinTable(
			name = "lesson_material",
			joinColumns = @JoinColumn(name = "lesson_id"),
			inverseJoinColumns = @JoinColumn(name = "material_id")
	)
	private List<Material> material = new ArrayList<Material>();
}
