
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ChatMessage from './ChatMessage';
import VoiceRecorder from './VoiceRecorder';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'aurora';
  timestamp: Date;
}

const VoiceInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Aurora, your AI voice assistant. Click the microphone to start speaking, or use the text input below.",
      sender: 'aurora',
      timestamp: new Date()
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, sender: 'user' | 'aurora') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleVoiceRecorded = async (transcript: string) => {
    if (!transcript.trim()) return;
    
    addMessage(transcript, 'user');
    await processMessage(transcript);
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    addMessage(textInput, 'user');
    await processMessage(textInput);
    setTextInput('');
  };

  const processMessage = async (message: string) => {
    setIsProcessing(true);
    
    try {
      if (!webhookUrl) {
        // Simulate Aurora's response for demo purposes
        setTimeout(() => {
          addMessage("I understand your message, but no webhook URL is configured. Please add your webhook URL in the settings to enable full functionality.", 'aurora');
          setIsProcessing(false);
        }, 1000);
        return;
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          timestamp: new Date().toISOString(),
          user: 'voice_interface'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        addMessage(data.response || "I've processed your request successfully.", 'aurora');
      } else {
        addMessage("I'm having trouble connecting to my systems right now. Please try again.", 'aurora');
      }
    } catch (error) {
      console.error('Webhook error:', error);
      addMessage("There seems to be a connection issue. Please check your webhook configuration.", 'aurora');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-cyan-500/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Aurora
              </h1>
              <p className="text-sm text-slate-400">AI Voice Assistant</p>
            </div>
          </div>
          
          {/* Webhook Config */}
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Webhook URL (optional)"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-64 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-slate-700/50 rounded-2xl px-4 py-3 max-w-xs">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-slate-300 text-sm">Aurora is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-t border-cyan-500/20 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Voice Recorder */}
          <div className="mb-4 flex justify-center">
            <VoiceRecorder
              onTranscript={handleVoiceRecorded}
              isRecording={isRecording}
              setIsRecording={setIsRecording}
            />
          </div>

          {/* Text Input */}
          <form onSubmit={handleTextSubmit} className="flex space-x-2">
            <Input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your message to Aurora..."
              className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500/20"
            />
            <Button
              type="submit"
              disabled={!textInput.trim()}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;
