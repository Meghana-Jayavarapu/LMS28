
import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, SparklesIcon, XIcon } from './icons/Icons';
import { ChatMessage } from '../types';
import { askStudyBuddy } from '../services/geminiService';

interface StudyBuddyProps {
  lessonContent: string;
  lessonTitle: string;
}

const StudyBuddy: React.FC<StudyBuddyProps> = ({ lessonContent, lessonTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isOpen) {
        setMessages([
            { sender: 'bot', text: `Hi there! I'm your Study Buddy. How can I help you with the lesson "${lessonTitle}"?` }
        ]);
    }
  }, [isOpen, lessonTitle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botResponse = await askStudyBuddy(lessonContent, input);
    const botMessage: ChatMessage = { sender: 'bot', text: botResponse };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center gap-2"
      >
        <SparklesIcon />
        Ask Study Buddy
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-full max-w-md h-[60vh] bg-base rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in-up">
      <div className="bg-primary text-white p-4 rounded-t-2xl flex justify-between items-center">
        <h3 className="font-bold text-lg flex items-center gap-2"><SparklesIcon /> Study Buddy</h3>
        <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded-full"><XIcon /></button>
      </div>

      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-xs md:max-w-sm lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start mb-4">
                <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        <button type="submit" className="bg-primary text-white p-3 rounded-full hover:bg-blue-800 disabled:bg-gray-400" disabled={isLoading || !input.trim()}>
          <PaperAirplaneIcon />
        </button>
      </form>
    </div>
  );
};

export default StudyBuddy;
