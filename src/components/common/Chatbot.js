import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,

  VStack,
  HStack,
  Text,
  IconButton,
 
} from '@chakra-ui/react';
import { CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { RiRobotLine } from 'react-icons/ri';
import {   FiMessageSquare, FiSend } from 'react-icons/fi';
import useChatMessages from '../../hooks/useChatMessages';
import { processMessage, getMainMenu } from '../../services/chatbotService';
import { useSession } from 'next-auth/react';

const MotionBox = motion(Box);

const Chatbot = () => {
  const { data: session, status } = useSession();
  
  const initials = `${session?.user?.profile?.last_name}`

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { messages, addMessage, clearMessages } = useChatMessages();
  const messagesEndRef = useRef(null);
  const chatbotRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        text: `Hello ${initials} ! Je suis l'assistant FeexPay.\n\n${getMainMenu()}`,
        sender: 'bot',
        timestamp: new Date(),
      };
      addMessage(welcomeMessage);
    }
  }, [addMessage,messages.length]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    addMessage(userMessage);
    setInputMessage('');
    setIsTyping(true);

    // Simuler un délai de réponse naturel
    setTimeout(() => {
      const botResponse = processMessage(inputMessage);
      const botMessage = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      addMessage(botMessage);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

 

  return (
    <Box  position="fixed" bottom="20px" right="20px" zIndex={1000} ref={chatbotRef}>
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            width="350px"
            height="500px"
            bg="white"
            borderRadius="xl"
            boxShadow="lg"
            overflow="hidden"
            mb="60px"
          >
            <Box  p={4} bg="whitesmoke" borderBottom="1px" >
              <HStack justify="space-between" align="center">
                <Text fontWeight="bold" color="gray.800">Assistant FeexPay</Text>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Effacer la conversation"
                    icon={<DeleteIcon />}
                    variant="ghost"
                    size="sm"
                    color="red.500"
                    _hover={{ bg: 'red.50' }}
                    onClick={clearMessages}
                  />
                  <IconButton
                    aria-label="Fermer le chat"
                    icon={<CloseIcon />}
                    variant="ghost"
                    size="sm"
                    color="gray.500"
                    _hover={{ bg: 'gray.100' }}
                    onClick={() => setIsOpen(false)}
                  />
                </HStack>
              </HStack>
            </Box>

            <VStack
              height="calc(500px - 130px)"
              overflowY="auto"
              p={4}
              spacing={4}
              align="stretch"
              bg="gray.50"
            >
              {messages.map((message, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HStack
                    justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                    align="flex-start"
                    spacing={2}
                  >
                    {message.sender === 'bot' && (
                      <Box
                        bg="white"
                        p="2"
                        borderRadius="full"
                        border="1px"
                      
                      >
                        <RiRobotLine size={20} color="#D45D00" />
                      </Box>
                    )}
                    <Box
                      bg={message.sender === 'user' ? '#D45D00' : 'white'}
                      color={message.sender === 'user' ? 'white' : 'gray.800'}
                      px={4}
                      py={2}
                      borderRadius="2xl"
                      maxW="70%"
                      boxShadow="sm"
                    >
                      <Text 
                        fontSize="sm"
                        whiteSpace="pre-line"
                        dangerouslySetInnerHTML={{ __html: message.text }}
                      />
                    </Box>
                    {message.sender === 'user' && (
                      <Box
                        bg="white"
                        p="2"
                        borderRadius="full"
                        border="1px"
                      
                      >
                        <Box
                          as="span"
                          bg="#D45D00"
                          w="8"
                          h="8"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          color="white"
                          fontSize="sm"
                        >
                          U
                        </Box>
                      </Box>
                    )}
                  </HStack>
                </MotionBox>
              ))}
              {isTyping && (
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Text fontSize="sm" color="gray.500">
                    {"Assistant est en train d'écrire..."}
                  </Text>
                </MotionBox>
              )}
              <div ref={messagesEndRef} />
            </VStack>

            <Box p={4} bg="white" borderTop="1px" >
              <HStack spacing={2}>
             
                  <input
               placeholder="Écrivez votre message..."
               value={inputMessage}
               onChange={(e) => setInputMessage(e.target.value)}
               onKeyPress={handleKeyPress}
               disabled={isTyping}
               bg="gray.50"
          
               _focus={{
            
                 boxShadow: "none"
               }}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              
              />
                <IconButton
                  colorScheme="purple"
                  aria-label="Envoyer"
                  icon={<FiSend />}
                  onClick={handleSendMessage}
                  isLoading={isTyping}
                />
              </HStack>
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>

      <IconButton
        icon={isOpen ? <CloseIcon boxSize={6} /> : <FiMessageSquare size={60}  className='text-secondary'/>}
        onClick={() => setIsOpen(!isOpen)}
        colorScheme="purple"
        rounded="full"
        size="xl"
        padding={6}
        boxShadow="lg"
        _hover={{ transform: 'scale(1.1)' }}
        _active={{ transform: 'scale(0.95)' }}
        aria-label="Toggle chat"
        position="absolute"
        bottom="0"
        right="0"
        zIndex={2}
      />
    </Box>
  );
};

export default Chatbot;
