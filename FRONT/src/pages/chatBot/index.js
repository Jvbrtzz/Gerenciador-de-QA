import React, { useState, useRef, useEffect } from 'react';
import { iaText, GetIaText } from '../../api/ia';
import './index.css';
import decodeToken from '../../utils/decodeAccessToken';
import Navbar from '../../components/navbar';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);  
  const userId = decodeToken()?.user_id

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await GetIaText(userId)        
        setMessages(response);
      } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
      }
    };

    fetchMessages();
  }, [userId]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', message: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let response = await iaText(userId, input);
      const iaMessage = { sender: 'ia', message: response };
      setMessages(prev => [...prev, iaMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ia', message: 'Erro ao obter resposta da IA.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
    <Navbar/>
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender === 'user' ? 'user-msg' : 'ia-msg'}`}
          >
            {msg.message}
          </div>
        ))}
        {loading && (
          <div className="ia-msg typing-animation">
            IA está digitando<span className="dots">
              <span>.</span><span>.</span><span>.</span>
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
    </>
  );
}

export default ChatBot;
