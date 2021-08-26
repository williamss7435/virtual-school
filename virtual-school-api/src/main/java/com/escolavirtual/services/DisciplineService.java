package com.escolavirtual.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.escolavirtual.exception.BadRequestException;
import com.escolavirtual.model.Discipline;
import com.escolavirtual.model.Discipline.DisciplineBuilder;
import com.escolavirtual.model.Student;
import com.escolavirtual.model.StudentGrade;
import com.escolavirtual.model.Tutor;
import com.escolavirtual.repository.DisciplineRepository;
import com.escolavirtual.repository.StudentGradeRepository;
import com.escolavirtual.request.discipline.DisciplinePostRequestBody;
import com.escolavirtual.request.discipline.DisciplinePutRequestBody;
import com.escolavirtual.request.studentgrade.StudentGradePostRequestBody;

@Service
public class DisciplineService {
	
	@Autowired
	DisciplineRepository disciplineRepository;
	
	@Autowired
	StudentGradeRepository studentGradeRepository;
	
	@Autowired
	TutorService tutorService;
	
	@Autowired
	StudentService studentService;
	
	public List<Discipline> findAll(){
		return disciplineRepository.findAll();
	}
	
	public Optional<Discipline> findById(Long id){
		return disciplineRepository.findById(id);
	}
	
	public Discipline findByIdOrThrowBadRequestException(Long id){
		return disciplineRepository.findById(id).orElseThrow(
			() -> new BadRequestException(String.format("a disciplina com o Id %d não foi encontrado", id))
		);
	}
	
	@Transactional
	public Discipline save(DisciplinePostRequestBody postRequestBody) {
		DisciplineBuilder disciplineBuilder =  Discipline.builder();
		
		Long tutorId = postRequestBody.getTutorId();
		if(tutorId != null) {
			Tutor findTutor = tutorService.findByIdOrThrowBadRequestException(tutorId);
			disciplineBuilder.tutor(findTutor);
		}
		
		return disciplineRepository.save(
				disciplineBuilder
					.name(postRequestBody.getName())
					.description(postRequestBody.getDescription())
					.startDate(postRequestBody.getStartDate())
					.endDate(postRequestBody.getEndDate())
					.active(postRequestBody.isActive())
					.build()
		);
	}
	
	public Discipline replace(Long id, DisciplinePutRequestBody putRequestBody) {
		Discipline findDiscipline = findByIdOrThrowBadRequestException(id);
		DisciplineBuilder disciplineBuilder =  Discipline.builder();
		
		Long tutorId = putRequestBody.getTutorId();
		if(tutorId != null) {
			Tutor findTutor = tutorService.findByIdOrThrowBadRequestException(tutorId);
			disciplineBuilder.tutor(findTutor);
		}
		
		Discipline replaceDiscipline = disciplineBuilder
				.id(findDiscipline.getId())
				.name((putRequestBody.getName() != null) ? putRequestBody.getName() : findDiscipline.getName())
				.description((putRequestBody.getDescription() != null) ? putRequestBody.getDescription() : findDiscipline.getDescription())
				.startDate((putRequestBody.getStartDate() != null) ? putRequestBody.getStartDate() : findDiscipline.getStartDate())
				.endDate((putRequestBody.getEndDate() != null) ? putRequestBody.getEndDate() : findDiscipline.getEndDate())
				.build();
		
		
		return disciplineRepository.save(replaceDiscipline);
	}
	
	public void delete(Long id) {
		disciplineRepository.delete(findByIdOrThrowBadRequestException(id));
	}
	
	public StudentGrade addStudent(StudentGradePostRequestBody postRequestBody) {
		Discipline findDiscipline = findByIdOrThrowBadRequestException(postRequestBody.getDisciplineId());
		Student findStudent = studentService.findByIdOrThrowBadRequestException(postRequestBody.getStudentId());
		
		return studentGradeRepository.save(StudentGrade.builder()
				.student(findStudent)
				.discipline(findDiscipline)
				.build()
		);
	}
	
	public List<Student> findAllStudentsByDisciplineId(Long id){
		Discipline findDiscipline = findByIdOrThrowBadRequestException(id);
		return studentGradeRepository.findAllStudentsByDisciplineId(findDiscipline.getId());
	}
}
