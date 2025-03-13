import React, { useState, useEffect } from 'react';
import TarefaForm from './TarefaForm';
import TarefaList from './TarefaList';
import axios from 'axios';
import { Tarefa } from './types/Tarefa';
import './App.css';

axios.defaults.baseURL = 'http://localhost:8080';

function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    fetchTarefas();
  }, []);

  const fetchTarefas = async () => {
    try {
      const response = await axios.get<Tarefa[]>('/tarefas');
      setTarefas(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const criarTarefa = async (tarefa: Omit<Tarefa, 'id'>) => {
    try {
      await axios.post('/tarefas', tarefa);
      fetchTarefas();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const atualizarTarefa = async (id: number, tarefa: Tarefa) => {
    try {
      await axios.put(`/tarefas/${id}`, tarefa);
      fetchTarefas();
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const deletarTarefa = async (id: number) => {
    try {
      await axios.delete(`/tarefas/${id}`);
      fetchTarefas();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>Lista de Tarefas</h1>
      <TarefaForm criarTarefa={criarTarefa} />
      <TarefaList
        tarefas={tarefas}
        atualizarTarefa={atualizarTarefa}
        deletarTarefa={deletarTarefa}
      />
    </div>
  );
}

export default App;
