
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
          
          {/* Aurora Logo Section with Integrated Dynamic Effects */}
          <div className="relative mb-8">
            {/* Multiple layered pulsing rings for depth */}
            <div className="absolute inset-0 w-80 h-80 rounded-full animate-ping opacity-20">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-400/30"></div>
            </div>
            <div className="absolute inset-2 w-76 h-76 rounded-full animate-pulse opacity-30" style={{ animationDelay: '0.5s' }}>
              <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"></div>
            </div>
            <div className="absolute inset-4 w-72 h-72 rounded-full animate-ping opacity-15" style={{ animationDelay: '1s' }}>
              <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-400/20 to-cyan-400/20"></div>
            </div>
            
            {/* Main Aurora Container with integrated glow effect */}
            <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-cyan-500/20 flex items-center justify-center shadow-2xl overflow-hidden">
              
              {/* Dynamic background glow that pulses with the image */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 animate-pulse rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/5 via-cyan-500/5 to-blue-500/5 animate-pulse rounded-full" style={{ animationDelay: '1s' }}></div>
              
              {/* Aurora Image with integrated effects */}
              <div className="relative z-10 w-64 h-64 rounded-full overflow-hidden">
                {/* Animated overlay that creates the pulsing glow effect on the image */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-blue-400/20 animate-pulse rounded-full mix-blend-overlay z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-purple-400/15 via-transparent to-cyan-400/15 animate-pulse rounded-full mix-blend-overlay z-10" style={{ animationDelay: '0.7s' }}></div>
                
                {/* The actual Aurora image */}
                <img 
                  src="/lovable-uploads/5ca25dad-b4a9-4258-82ad-e4c2493a1a48.png" 
                  alt="Aurora AI Assistant" 
                  className="w-full h-full object-cover rounded-full animate-pulse"
                  style={{ animationDuration: '3s' }}
                />
                
                {/* Subtle rotating gradient overlay for extra dynamism */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-spin rounded-full mix-blend-overlay" style={{ animationDuration: '8s' }}></div>
              </div>
              
              {/* Enhanced sound wave animations */}
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-20">
                <div className="flex space-x-2">
                  <div className="w-2 h-12 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-20 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-8 bg-gradient-to-t from-purple-400 to-cyan-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" style={{ animationDelay: '0.4s' }}></div>
                  <div className="w-2 h-16 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0.6s' }}></div>
                </div>
              </div>
              
              <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-20">
                <div className="flex space-x-2">
                  <div className="w-2 h-16 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0.6s' }}></div>
                  <div className="w-2 h-8 bg-gradient-to-t from-purple-400 to-cyan-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" style={{ animationDelay: '0.4s' }}></div>
                  <div className="w-2 h-20 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-12 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0s' }}></div>
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
