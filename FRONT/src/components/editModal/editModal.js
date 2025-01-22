import React, { useState } from 'react';
import './editModal.css';
import { updateComment } from '../../api/card';

export default function EditModal({ isOpen, commentId, existingComment, setModalOpen, onCommentUpdate }) {
  const [comentary, setComentary] = useState(existingComment);

  const handleSave = async () => {
    if (!comentary || !commentId) {
      console.error('Todos os campos precisam ser preenchidos');
      return;
    }

    try {
      await updateComment(commentId, comentary);
      onCommentUpdate(commentId, comentary); // Chama a função para atualizar o estado principal
    } catch (error) {
      console.error('Erro ao atualizar o comentário:', error);
    }
  };

  return isOpen ? (
    <div className="modal-background">
      <div className="modal">
        <label htmlFor="comentary">Escreva um comentário:</label>
        <textarea
          id="comentario"
          value={comentary}
          onChange={(e) => setComentary(e.target.value)}
        ></textarea>
        <div className="modal-actions">
          <button onClick={handleSave}>Salvar</button>
          <button onClick={() => setModalOpen(false)}>Fechar</button>
        </div>
      </div>
    </div>
  ) : null;
}
