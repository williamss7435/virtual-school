package com.escolavirtual.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.escolavirtual.exception.BadRequestException;
import com.escolavirtual.exception.EntityAlreadyExistsException;
import com.escolavirtual.model.Student;
import com.escolavirtual.repository.StudentRepository;
import com.escolavirtual.request.student.StudentPostRequestBody;
import com.escolavirtual.request.student.StudentPutRequestBody;
import com.escolavirtual.utils.Utils;

@Service
public class StudentService {
	
	@Autowired
	StudentRepository studentRepository;
	
	public List<Student> findAll(){
		return studentRepository.findAll();
	}
	
	public Optional<Student> findById(Long id){
		return studentRepository.findById(id);
	}
	
	public Student findByIdOrThrowBadRequestException(Long id){
		return studentRepository.findById(id).orElseThrow(
			() -> new BadRequestException(String.format("estudante com o Id %d não foi encontrado", id))
		);
	}
	
	@Transactional
	public Student save(StudentPostRequestBody postRequestBody) {
		return studentRepository.save(
				Student.builder()
					.name(postRequestBody.getName())
					.email(postRequestBody.getEmail())
					.password(postRequestBody.getPassword())
					.registration(Utils.genericRandomRecord())
					.build()
		);
	}
	
	public Student replace(Long id, StudentPutRequestBody putRequestBody) {
		Student findStudent = findByIdOrThrowBadRequestException(id);
		
		Student replaceStudent = Student.builder()
				.id(findStudent.getId())
				.name((putRequestBody.getName() != null) ? putRequestBody.getName() : findStudent.getName())
				.email((putRequestBody.getEmail() != null) ? putRequestBody.getEmail() : findStudent.getEmail())
				.password((putRequestBody.getPassword() != null) ? putRequestBody.getPassword() : findStudent.getPassword())
				.registration((putRequestBody.getRegistration() != null) ? putRequestBody.getRegistration() : findStudent.getRegistration())
				.build();
		
		try {
			return studentRepository.save(replaceStudent);
		} catch (DataIntegrityViolationException e) {
			throw new EntityAlreadyExistsException(String.format("matricula %d já está em uso", putRequestBody.getRegistration()));
		}
	}
	
	public void delete(Long id) {
		studentRepository.delete(findByIdOrThrowBadRequestException(id));
	}
}
