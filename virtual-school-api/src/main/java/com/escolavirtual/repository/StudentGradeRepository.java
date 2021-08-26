package com.escolavirtual.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.escolavirtual.model.Student;
import com.escolavirtual.model.StudentGrade;



public interface StudentGradeRepository extends JpaRepository<StudentGrade, Long> {
	
	
	List<StudentGrade>findByDisciplineId(Long discipline);
	
	@Query("SELECT s.student from StudentGrade s WHERE s.discipline.id = :discipline")
	List<Student>findAllStudentsByDisciplineId(Long discipline);
	
}
