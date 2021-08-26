package com.escolavirtual.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.escolavirtual.model.Student;



public interface StudentRepository extends JpaRepository<Student, Long> {
	
	
	
}
