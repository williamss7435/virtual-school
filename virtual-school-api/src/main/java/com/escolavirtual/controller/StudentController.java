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
import org.springframework.web.bind.annotation.RestController;

import com.escolavirtual.model.Student;
import com.escolavirtual.request.student.StudentPostRequestBody;
import com.escolavirtual.request.student.StudentPutRequestBody;
import com.escolavirtual.services.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {
	
	@Autowired
	StudentService studentService;
	
	@GetMapping
	public ResponseEntity<List<Student>> listAll(){
		return new ResponseEntity<List<Student>>(studentService.findAll(), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Student> save(@RequestBody @Valid StudentPostRequestBody postRequestBody){
		return new ResponseEntity<Student>(studentService.save(postRequestBody), HttpStatus.OK);
	}
	
	@PutMapping("/{studentId}")
	public ResponseEntity<Student> replace(
		@PathVariable Long studentId,
		@RequestBody @Valid StudentPutRequestBody putRequestBody
	){
		return new ResponseEntity<Student>(studentService.replace(studentId, putRequestBody), HttpStatus.OK);
	}
	
	@DeleteMapping("/{studentId}")
	public ResponseEntity<Student> delete(@PathVariable Long studentId){
		studentService.delete(studentId);
		return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);
	}
	
}
