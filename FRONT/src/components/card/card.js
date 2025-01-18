import React, { useState, useEffect } from 'react';
import './card.css';
import { getUserCard, createCard, deleteCard, updateCardStatus } from '../../api/card';
import decodeToken from '../../utils/decodeAccessToken';
import Modal from '../modal/modal';


const token = decodeToken().user_id;

async function fetchUserCards(id) {
  try {
    const cards = await getUserCard(id);
    return cards; 
  } catch (error) {
    console.error('Erro ao buscar cards:', error);
    return [];
  }
}

const column = document.querySelectorAll('.column');

function cardDragging() {
  const columns = document.querySelectorAll('.column');

  if (columns.length === 0) {
    console.warn("Nenhuma coluna encontrada para o drag-and-drop.");
    return;
  }

  document.addEventListener('dragstart', (e) => {
    const target = e.target;
    
    // Verifica se o elemento alvo existe e é válido
    if (target && target.classList && target.classList.contains('card')) {
      e.dataTransfer.setData('text/plain', target.dataset.cardId || '');
      target.classList.add('dragging');
    } else {
      console.warn("O elemento arrastado não é um card válido.");
    }
  });
  
  document.addEventListener('dragend', (e) => {
    const target = e.target;
    
    // Verifica se o elemento alvo existe e é válido
    if (target && target.classList && target.classList.contains('card')) {
      target.classList.remove('dragging');
    } else {
      console.warn("O elemento finalizado não é um card válido.");
    }
  });
  
  // Configura eventos para cada coluna
  columns.forEach((column) => {
    column.addEventListener('dragover', (e) => {
      e.preventDefault();

      const dragging = document.querySelector('.dragging');
      if (!dragging || column === dragging.parentElement) return; // Previne mover para a mesma coluna sem mudança

      const applyAfter = getNewPosition(column, e.clientY);
      if (applyAfter) {
        applyAfter.insertAdjacentElement('afterend', dragging);
      } else {
        column.appendChild(dragging);
      }
    });

    column.addEventListener('drop', (e) => {
      e.preventDefault();

      const dragging = document.querySelector('.dragging');
      if (!dragging) return;

      const cardId = e.dataTransfer.getData('text/plain');
      const newStatus = column.querySelector('h3')?.textContent;

      if (!cardId || !newStatus) {
        console.warn("Falha ao dropar o card. ID ou status não encontrados.");
        return;
      }

      console.log(`Card ID ${cardId} movido para a coluna: ${newStatus}`);
      dragging.classList.remove('dragging');

      updateCardStatus(cardId, newStatus);
    });
  });

  function getNewPosition(column, posY) {
    const cards = column.querySelectorAll('.card:not(.dragging)');
    let result = null;

    for (const referCard of cards) {
      const box = referCard.getBoundingClientRect();
      const boxCenterY = box.y + box.height / 2;

      if (posY >= boxCenterY) {
        result = referCard;
      }
    }

    return result;
  }
}

async function deleteCardFromBackend(cardId) {
  try {
    await deleteCard(cardId);
    console.log(`Card com ID ${cardId} deletado com sucesso.`);
  } catch (error) {
    console.error('Erro ao deletar card:', error);
  }
}

const Card = () => {
  const [columns, setColumns] = useState([
    { id: 1, title: 'A Fazer', cards: [] },
    { id: 2, title: 'Em Progresso', cards: [] },
    { id: 3, title: 'Concluído', cards: [] },
    { id: 4, title: 'Teste', cards: [] },
  ]);
  
  const [openModal, setOpenModal] = useState(false)  
  const [newCardText, setNewCardText] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(1);
  const [selectedCardId, setSelectedCardId] = useState(null);

  useEffect(() => {
    async function loadCards() {
      const userCards = await fetchUserCards(token);
  
      // Organize os cards nas colunas corretas com base no status
      const updatedColumns = columns.map((column) => {
        const columnCards = userCards.filter((card) => card.status === column.title);
        return { ...column, cards: columnCards }; // Inclui o card_id diretamente
      });

      setColumns(updatedColumns);
    }
    cardDragging()
    loadCards();
  }, [column]);

  const addCard = () => {
    if (newCardText.trim() !== "" && newCardDescription.trim() !== "") {

      const selectedColumnTitle = columns.find((column) => column.id === selectedColumn)?.title;

      if (!selectedColumnTitle) {
        console.error('Coluna não encontrada!');
        return;
      }

      const updatedColumns = columns.map((column) =>
        column.id === selectedColumn ? {
              ...column,
              cards: [
                ...column.cards,
                { title: newCardText, description: newCardDescription, status: column.title }, // Adicionando status ao card
              ],
            }
          : column
      );
      setColumns(updatedColumns);
      setNewCardText("");
      setNewCardDescription("");
      createCard(token, newCardText, newCardDescription, selectedColumnTitle)
    }
  };

  const deleteCard = (cardId) => {
    // Atualize o estado local, removendo apenas o card com o ID correspondente
    const updatedColumns = columns.map((column) => ({
      ...column,
      cards: column.cards.filter((card) => card.id !== cardId), // Garante que apenas o card com o ID específico seja excluído
    }));
    setColumns(updatedColumns);
  
    // Faça a exclusão no backend
    deleteCardFromBackend(cardId);
  };
  
  const handleEditClick = (cardId) => {
    setSelectedCardId(cardId);
    setOpenModal(true);  // Define o modal como aberto
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedCardId(null);  // Limpa o cardId ao fechar
  };

  return (
    <div className="kanban-board">
      <div className="card-input">
        <input
          type="text"
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
          placeholder="Título do card"
        />
        <textarea
          value={newCardDescription}
          onChange={(e) => setNewCardDescription(e.target.value)}
          placeholder="Descrição do card"
        ></textarea>
        <select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(Number(e.target.value))}
        >
          {columns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.title}
            </option>
          ))}
        </select>
        <button onClick={addCard}>Adicionar Card</button>
      </div>
      <div className="columns">
        {columns.map((column) => (
          <div key={column.id} className="column" onDragOver={(e) => e.preventDefault()}>
            <h3>{column.title}</h3>
            {column.cards.map((card) => (
              <div
                draggable="true"
                key={card.id}
                className="card"
                data-card-id={card.id}
              >
                <h4>{card.title}</h4>
                <p>{card.description}</p>
                <button onClick={() => deleteCard(card.id)}>Excluir</button>
                <button
                  className="button-change"
                  onClick={() => handleEditClick(card.id)}
                >
                  Editar
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Modal
        isOpen={openModal}
        setModalOpen={closeModal}
        columns={columns}
        cardId={selectedCardId}
      />
    </div>
  );
};

export default Card;
