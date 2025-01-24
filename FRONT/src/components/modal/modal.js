import React, { useState, useEffect } from 'react';
import './modal.css';
import '../comment/comment.css'
import { postCommentsByCard, updateCard } from '../../api/card';
import CommentSection from '../comment/commentBuilder';
import toast from 'react-hot-toast';


export default function Modal({ isOpen, setModalOpen, columns = [], cardId, userId, userName }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('')
    const [comentary, setComentary] = useState('');
    
    useEffect(() => {
      if (cardId) {
        // Encontrar o card correspondente com base no cardId
        const card = findCardById(cardId);
        if (card) {
          setTitle(card.title);
          setDescription(card.description);
          setStatus(card.status);
        }
      }
    }, [cardId]);
  
    // Função para encontrar o card baseado no cardId
    const findCardById = (id) => {
      for (const column of columns) {
        const card = column.cards.find((card) => card.id === id);
        if (card) return card;
      }
      return null;
    };
  
    const handleSave = () => {
      if (!title || !description || !status) {
        console.error('Todos os campos precisam ser preenchidos');
        return;
      }
  
      updateCard(cardId, title, description, status);
      setModalOpen(false); 
    };
    const handleSaveComment = (cardId, userId, comment, userName) => {
      if (!comment) {
        toast.error('Comentário vazio');
        return;
      }
    
      const commentSection = document.querySelector('.comment-section');
      const commentDiv = document.createElement('div');
      commentDiv.className = 'descricao-video';
    
      const commentHTML = `
        <h4>${userName}</h4>
        <p>${comment}</p>
        <p>${new Date().toLocaleString()}</p>
      `;

      postCommentsByCard(cardId, userId, comment)
      commentDiv.innerHTML = commentHTML;
      commentSection.appendChild(commentDiv);
    };
    

    return isOpen ? (
      <div className="modal-background">
        <div className="modal">
          <div style={{ cursor: 'pointer' }} onClick={() => setModalOpen(false)}>
            x
          </div>
          <h2>Editar Card</h2>
          
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
  
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
  
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {columns.length > 0 ? (
              columns.map((column) => (
                <option key={column.id} value={column.title}>
                  {column.title}
                </option>
              ))
            ) : (
              <option value="">Nenhuma coluna disponível</option>
            )}
          </select>
          <label htmlFor="comentary">Escreva um comentário:</label>
          <textarea
            id="comentario"
            value={comentary}
            onChange={(e) => setComentary(e.target.value)}
          ></textarea>
          <button onClick={() => handleSaveComment(cardId, userId, comentary, userName)}>Postar comentario</button>
          <p>Comentários</p>
          <div className={`comment-section`}>                  
          </div>      
          <CommentSection cardId={cardId} />           
            <div className="modal-actions">
            <button onClick={handleSave}>Salvar</button>
            <button onClick={() => setModalOpen(false)}>Fechar</button>
          </div>
        </div>
      </div>
    ) : null;
  }
  