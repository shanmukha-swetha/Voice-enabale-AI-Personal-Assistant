
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

      script.onload = () => {
        console.log('ElevenLabs script loaded successfully');
      };
    }

    // Minimal popup prevention - only override window.open
    const originalOpen = window.open;
    
    window.open = function(...args) {
      console.log('Prevented popup, activating voice directly');
      return null;
    };

    return () => {
      window.open = originalOpen;
    };
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col relative overflow-hidden">
      {/* Top Left Aurora Logo */}
      <div className="absolute top-6 left-6 flex items-center space-x-3 z-30">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400/30">
          <img 
            src="/lovable-uploads/5ca25dad-b4a9-4258-82ad-e4c2493a1a48.png" 
            alt="Aurora Logo" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="flex flex-col items-center space-y-8">
          
          {/* Main Circular Interface */}
          <div className="relative mb-8">
            <div className="absolute inset-0 w-80 h-80 rounded-full border-2 border-cyan-400/30 animate-pulse"></div>
            <div className="absolute inset-4 w-72 h-72 rounded-full border border-blue-400/20 animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-cyan-500/20 flex items-center justify-center shadow-2xl overflow-hidden">
              
              <div className="relative z-10 w-64 h-64 rounded-full overflow-hidden animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-400/10 rounded-full mix-blend-overlay z-10 animate-pulse"></div>
                
                <img 
                  src="/lovable-uploads/5ca25dad-b4a9-4258-82ad-e4c2493a1a48.png" 
                  alt="Aurora AI Assistant" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              {/* Left and Right Sound Bars */}
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-20">
                <div className="flex space-x-2">
                  <div className="w-2 h-12 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/30 animate-pulse"></div>
                  <div className="w-2 h-20 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/30 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-2 h-8 bg-gradient-to-t from-purple-400 to-cyan-400 rounded-full shadow-lg shadow-purple-400/30 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  <div className="w-2 h-16 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/30 animate-pulse" style={{ animationDelay: '0.9s' }}></div>
                </div>
              </div>
              
              <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-20">
                <div className="flex space-x-2">
                  <div className="w-2 h-16 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/30 animate-pulse" style={{ animationDelay: '0.9s' }}></div>
                  <div className="w-2 h-8 bg-gradient-to-t from-purple-400 to-cyan-400 rounded-full shadow-lg shadow-purple-400/30 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  <div className="w-2 h-20 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/30 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-2 h-12 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/30 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* ElevenLabs Widget */}
          <div className="flex justify-center">
            <elevenlabs-convai 
              agent-id="agent_01jy34sj32eqwvbjjv6bmrhwxd"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;
