package com.escolavirtual.services;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.escolavirtual.exception.BadRequestException;
import com.escolavirtual.exception.EntityAlreadyExistsException;
import com.escolavirtual.model.Tutor;
import com.escolavirtual.repository.TutorRepository;
import com.escolavirtual.request.tutor.TutorPostRequestBody;
import com.escolavirtual.request.tutor.TutorPutRequestBody;
import com.escolavirtual.utils.Utils;

@Service
public class TutorService {
	
	@Autowired
	TutorRepository tutorRepository;
	
	public List<Tutor> findAll(){
		return tutorRepository.findAll();
	}
	
	public Optional<Tutor> findById(Long id){
		return tutorRepository.findById(id);
	}
	
	public Tutor findByIdOrThrowBadRequestException(Long id){
		return tutorRepository.findById(id).orElseThrow(
			() -> new BadRequestException(String.format("tutor com o Id %d não foi encontrado", id))
		);
	}
	
	@Transactional
	public Tutor save(TutorPostRequestBody postRequestBody) {
		return tutorRepository.save(
				Tutor.builder()
					.name(postRequestBody.getName())
					.email(postRequestBody.getEmail())
					.password(postRequestBody.getPassword())
					.employeeCode(Utils.genericRandomRecord())
					.build()
		);
	}
	
	public Tutor replace(Long id, TutorPutRequestBody putRequestBody) {
		Tutor findTutor = findByIdOrThrowBadRequestException(id);
		
		Tutor replaceTutor = Tutor.builder()
				.id(findTutor.getId())
				.name((putRequestBody.getName() != null) ? putRequestBody.getName() : findTutor.getName())
				.email((putRequestBody.getEmail() != null) ? putRequestBody.getEmail() : findTutor.getEmail())
				.password((putRequestBody.getPassword() != null) ? putRequestBody.getPassword() : findTutor.getPassword())
				.employeeCode((putRequestBody.getEmployeeCode() != null) ? putRequestBody.getEmployeeCode() : findTutor.getEmployeeCode())
				.build();
		
		try {
			return tutorRepository.save(replaceTutor);
		} catch (DataIntegrityViolationException e) {
			throw new EntityAlreadyExistsException(String.format("code de funcionario %d já está em uso", putRequestBody.getEmployeeCode()));
		}
	}
	
	public void delete(Long id) {
		tutorRepository.delete(findByIdOrThrowBadRequestException(id));
	}
}
