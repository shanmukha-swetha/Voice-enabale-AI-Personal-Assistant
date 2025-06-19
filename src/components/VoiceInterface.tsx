
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-cyan-500/20 p-4 relative z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center animate-pulse">
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

      {/* Main Content Area - Centered with Aurora Logo */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="flex flex-col items-center space-y-8">
          
          {/* Aurora Logo Section with Dynamic Effects */}
          <div className="relative mb-8">
            {/* Outer pulsing ring */}
            <div className="absolute inset-0 w-80 h-80 rounded-full border-2 border-cyan-400/30 animate-ping"></div>
            <div className="absolute inset-4 w-72 h-72 rounded-full border border-blue-400/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            
            {/* Main Aurora Logo Container */}
            <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center shadow-2xl">
              <img 
                src="/lovable-uploads/5ca25dad-b4a9-4258-82ad-e4c2493a1a48.png" 
                alt="Aurora AI Assistant" 
                className="w-64 h-64 object-contain animate-pulse"
              />
              
              {/* Sound wave animations around the logo */}
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2">
                <div className="flex space-x-1">
                  <div className="w-1 h-8 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                  <div className="w-1 h-12 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-6 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                <div className="flex space-x-1">
                  <div className="w-1 h-6 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <div className="w-1 h-12 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-8 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-white mb-3 animate-fade-in">
              Start Your Conversation
            </h2>
            <p className="text-slate-300 text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Click the microphone below to begin speaking with Aurora
            </p>
          </div>
          
          {/* ElevenLabs Widget - Centered */}
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <elevenlabs-convai agent-id="agent_01jy34sj32eqwvbjjv6bmrhwxd"></elevenlabs-convai>
          </div>
          
          <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
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
