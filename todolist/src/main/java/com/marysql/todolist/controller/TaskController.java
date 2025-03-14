package com.marysql.todolist.controller;

import java.util.List;
import java.util.Optional;

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

import com.marysql.todolist.model.Tarefa;
import com.marysql.todolist.repository.TarefaRepository;

@RestController
@RequestMapping("/tarefas")
public class TaskController {

  @Autowired
  private TarefaRepository tarefaRepository;

  @GetMapping
  public List<Tarefa> listarTarefas() {
    return tarefaRepository.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Tarefa> buscarTarefaPorId(@PathVariable Long id) {
    Optional<Tarefa> tarefa = tarefaRepository.findById(id);
    return tarefa.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<Tarefa> criarTarefa(@RequestBody Tarefa tarefa) {
    Tarefa tarefaSalva = tarefaRepository.save(tarefa);
    return ResponseEntity.status(HttpStatus.CREATED).body(tarefaSalva);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Tarefa> atualizarTarefa(@PathVariable Long id,
      @RequestBody Tarefa detalheTarefa) {
    Optional<Tarefa> tarefaExistente = tarefaRepository.findById(id);
    if (tarefaExistente.isPresent()) {
      Tarefa tarefaExiste = tarefaExistente.get();
      tarefaExiste.setTitulo(detalheTarefa.getTitulo());
      tarefaExiste.setDescricao(detalheTarefa.getDescricao());
      tarefaExiste.setConcluida(detalheTarefa.isConcluida());

      Tarefa tarefaAtualizada = tarefaRepository.save(tarefaExiste);
      return ResponseEntity.ok(tarefaAtualizada);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletarTarefa(@PathVariable Long id) {
    Optional<Tarefa> tarefa = tarefaRepository.findById(id);
    if (tarefa.isPresent()) {
      tarefaRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}