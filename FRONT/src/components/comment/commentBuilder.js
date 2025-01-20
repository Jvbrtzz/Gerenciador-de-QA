import { getCommentsByCard } from "../../api/card";
import { useEffect, useState } from "react";
import './comment.css';

function CommentSection({ cardId }) {
  const [comments, setComments] = useState([]);

  function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
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

  return (
    <div className="comment-section">
      {comments.map((comment, index) => (
        <div className="descricao-video" key={index}>
          <h4>{comment.commenter_name}</h4>
          <p>{comment.comment}</p>
          <p>{formatDate(comment.comment_date)}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentSection;
