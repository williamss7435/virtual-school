package com.escolavirtual.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.escolavirtual.model.Discipline;
import com.escolavirtual.model.Student;
import com.escolavirtual.model.StudentGrade;
import com.escolavirtual.request.discipline.DisciplinePostRequestBody;
import com.escolavirtual.request.discipline.DisciplinePutRequestBody;
import com.escolavirtual.request.studentgrade.StudentGradePostRequestBody;
import com.escolavirtual.services.DisciplineService;

@RestController
@RequestMapping("/disciplines")
public class DisciplineController {
	
	@Autowired
	DisciplineService disciplineService;
	
	@GetMapping
	public ResponseEntity<List<Discipline>> listAll(){
		return new ResponseEntity<List<Discipline>>(disciplineService.findAll(), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Discipline> save(@RequestBody @Valid DisciplinePostRequestBody postRequestBody){
		return new ResponseEntity<Discipline>(disciplineService.save(postRequestBody), HttpStatus.OK);
	}
	
	@PutMapping("/{disciplineId}")
	public ResponseEntity<Discipline> replace(
			@PathVariable Long disciplineId,
			@RequestBody @Valid DisciplinePutRequestBody putRequestBody
	){
		return new ResponseEntity<Discipline>(disciplineService.replace(disciplineId, putRequestBody), HttpStatus.OK);
	}
	
	@DeleteMapping("/{disciplineId}")
	public ResponseEntity<Discipline> delete(@PathVariable Long disciplineId){
		disciplineService.delete(disciplineId);
		return new ResponseEntity<Discipline>(HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/{disciplineId}/students")
	public ResponseEntity<List<?>> listAll(@PathVariable Long disciplineId){
		return new ResponseEntity<List<?>>(disciplineService.findAllStudentsByDisciplineId(disciplineId), HttpStatus.OK);
	}
	
	@PostMapping("/students")
	public ResponseEntity<StudentGrade> saveStudent(@RequestBody @Valid StudentGradePostRequestBody postRequestBody){
		return new ResponseEntity<StudentGrade>(disciplineService.addStudent(postRequestBody), HttpStatus.OK);
	}
	
}
