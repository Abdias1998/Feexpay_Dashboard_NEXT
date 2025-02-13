import { useState, useEffect } from 'react';

const useChatMessages = () => {
  const [messages, setMessages] = useState([]);

  // Charger les messages depuis le localStorage au démarrage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Sauvegarder les messages dans le localStorage à chaque mise à jour
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Ajouter un nouveau message
  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // Effacer l'historique des messages
  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return {
    messages,
    addMessage,
    clearMessages,
  };
};

export default useChatMessages;
