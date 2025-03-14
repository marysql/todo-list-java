import React, { useState } from 'react';
import { Omit } from 'utility-types';
import { Tarefa } from './types/Tarefa';

interface TarefaFormProps {
  criarTarefa: (tarefa: Omit<Tarefa, 'id'>) => void;
}

function TarefaForm({ criarTarefa }: TarefaFormProps) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) {
      alert('Por favor, preencha o título e a descrição!');
      return;
    }
    criarTarefa({ titulo, descricao, concluida: false });
    setTitulo('');
    setDescricao('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Tarefa</h2>
      <div>
        <input className='titletask'
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>
      <button type="submit">
        Adicionar Tarefa
      </button>
    </form>
  );
}

export default TarefaForm;
