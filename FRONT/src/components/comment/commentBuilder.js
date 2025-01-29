import { getCommentsByCard } from "../../api/card";
import { useEffect, useState } from "react";
import './comment.css';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditModal from "../editModal/editModal";

function CommentSection({ cardId }) {
  const [comments, setComments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [selectedComment, setSelectedComment] = useState('');

  function formatDate(dateString) {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  }

  useEffect(() => {
    async function fetchUserComments() {
      try {
        const fetchedComments = await getCommentsByCard(cardId);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Erro ao buscar comentários:", error);
        setComments([]);
      }
    }

    fetchUserComments();
  }, [cardId]);

  if (!comments || comments.length === 0) {
    return <p>Nenhum comentário encontrado.</p>;
  }

  const openEditModal = (commentId, commentText) => {
    setSelectedCommentId(commentId);
    setSelectedComment(commentText);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedCommentId(null);
    setSelectedComment('');
  };

  const handleCommentUpdate = (updatedCommentId, updatedCommentText) => {
    // Atualizar o comentário na lista
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === updatedCommentId
          ? { ...comment, comment: updatedCommentText }
          : comment
      )
    );
    setComments('')
    closeModal();
  };

  return (
    <div className="comment-section">
      {comments.map((comment, index) => (
        <div className="descricao-video" key={index}>
          <BorderColorIcon
            className="iconPencil"
            fontSize="small"
            onClick={() => openEditModal(comment.id, comment.comment)}
          />
          <h4>{comment.commenter_name}</h4>
          <p>{comment.comment}</p>
          {comment.edited == 1 && <span className="edited-tag">(editado)</span>}
          <p>{formatDate(comment.comment_date)}</p>
        </div>
      ))}

      {openModal && (
        <EditModal
          isOpen={openModal}
          setModalOpen={closeModal}
          commentId={selectedCommentId}
          existingComment={selectedComment}
          onCommentUpdate={handleCommentUpdate}
        />
      )}
    </div>
  );
}

export default CommentSection;
