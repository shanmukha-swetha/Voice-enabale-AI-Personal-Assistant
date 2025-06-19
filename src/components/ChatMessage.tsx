
import React from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'aurora';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAurora = message.sender === 'aurora';

  return (
    <div className={`flex ${isAurora ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl ${
        isAurora 
          ? 'bg-slate-700/50 text-white border border-slate-600/50' 
          : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
      }`}>
        {isAurora && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <span className="text-cyan-400 text-sm font-medium">Aurora</span>
          </div>
        )}
        <p className="text-sm leading-relaxed">{message.content}</p>
        <div className="mt-2 text-xs opacity-70">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
