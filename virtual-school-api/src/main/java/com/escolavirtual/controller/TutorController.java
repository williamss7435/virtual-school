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

import com.escolavirtual.model.Tutor;
import com.escolavirtual.request.tutor.TutorPostRequestBody;
import com.escolavirtual.request.tutor.TutorPutRequestBody;
import com.escolavirtual.services.TutorService;

@RestController
@RequestMapping("/tutors")
public class TutorController {
	
	@Autowired
	TutorService tutorService;
	
	@GetMapping
	public ResponseEntity<List<Tutor>> listAll(){
		return new ResponseEntity<List<Tutor>>(tutorService.findAll(), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Tutor> save(@RequestBody @Valid TutorPostRequestBody postRequestBody){
		return new ResponseEntity<Tutor>(tutorService.save(postRequestBody), HttpStatus.OK);
	}
	
	@PutMapping("/{tutorId}")
	public ResponseEntity<Tutor> replace(
		@PathVariable Long tutorId, 
		@RequestBody @Valid TutorPutRequestBody putRequestBody
	){
		return new ResponseEntity<Tutor>(tutorService.replace(tutorId ,putRequestBody), HttpStatus.OK);
	}
	
	@DeleteMapping("/{tutorId}")
	public ResponseEntity<Tutor> delete(@PathVariable Long tutorId){
		tutorService.delete(tutorId);
		return new ResponseEntity<Tutor>(HttpStatus.NO_CONTENT);
	}
	
}
