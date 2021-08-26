package com.escolavirtual.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.escolavirtual.model.Discipline;



public interface DisciplineRepository extends JpaRepository<Discipline, Long> {}
