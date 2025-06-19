
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const VoiceInterface = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Load the ElevenLabs script if it's not already loaded
    const existingScript = document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-cyan-500/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
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
        </div>
      </div>

      {/* Main Content Area - Centered Widget */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Start Your Conversation
            </h2>
            <p className="text-slate-300">
              Click the microphone below to begin speaking with Aurora
            </p>
          </div>
          
          {/* ElevenLabs Widget - Centered */}
          <div className="flex justify-center">
            <elevenlabs-convai agent-id="agent_01jy34sj32eqwvbjjv6bmrhwxd"></elevenlabs-convai>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-xs text-slate-400">
              Powered by ElevenLabs Conversational AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;
