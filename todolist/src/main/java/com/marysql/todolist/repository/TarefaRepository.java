package com.marysql.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.marysql.todolist.model.Tarefa;

@Repository
public interface  TarefaRepository extends JpaRepository<Tarefa, Long> {
  
}
