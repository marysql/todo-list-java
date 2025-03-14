import React, { useState } from 'react';
import { Tarefa } from './types/Tarefa';

interface TarefaListProps {
  tarefas: Tarefa[];
  atualizarTarefa: (id: number, tarefa: Tarefa) => void;
  deletarTarefa: (id: number) => void;
}

function TarefaList({ tarefas, atualizarTarefa, deletarTarefa }: TarefaListProps) {
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [tituloEditado, setTituloEditado] = useState('');
  const [descricaoEditada, setDescricaoEditada] = useState('');

  const iniciarEdicao = (tarefa: Tarefa) => {
    if (tarefa.id !== undefined) {
      // Garantir que o id seja um número e não undefined
      setEditandoId(tarefa.id); // Agora estamos passando um número, nunca undefined
      setTituloEditado(tarefa.titulo);
      setDescricaoEditada(tarefa.descricao);
    }
  };

  const salvarEdicao = (tarefa: Tarefa) => {
    if (!tituloEditado.trim() || !descricaoEditada.trim()) {
      alert('O título e a descrição não podem estar vazios!');
      return;
    }
    if (tarefa.id !== undefined) {
      // Garantir que o id seja um número
      atualizarTarefa(tarefa.id, { ...tarefa, titulo: tituloEditado, descricao: descricaoEditada });
      setEditandoId(null);
    }
  };

  return (
    <ul>
      {tarefas.map((tarefa) => (
        <li key={tarefa.id}>
          {editandoId === tarefa.id ? (
            <>
              <input
                type="text"
                value={tituloEditado}
                onChange={(e) => setTituloEditado(e.target.value)}
              />
              <input
                type="text"
                value={descricaoEditada}
                onChange={(e) => setDescricaoEditada(e.target.value)}
              />
              <button onClick={() => salvarEdicao(tarefa)}>Salvar</button>
              <button onClick={() => setEditandoId(null)}>Cancelar</button>
            </>
          ) : (
            <>

              <div className="checkbox-container">
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() =>
                    tarefa.id !== undefined &&
                    atualizarTarefa(tarefa.id, { ...tarefa, concluida: !tarefa.concluida })
                  }
                   className="checkbox"
                />
                <span className="status-text">
                  {tarefa.concluida ? 'Finalizada' : 'Em processo'}
                </span>
              </div>

              <span>{tarefa.titulo}</span> - <span>{tarefa.descricao}</span>
              <button onClick={() => iniciarEdicao(tarefa)}>Editar</button>
              <button onClick={() => tarefa.id !== undefined && deletarTarefa(tarefa.id)}>
                Excluir
              </button>



            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TarefaList;
