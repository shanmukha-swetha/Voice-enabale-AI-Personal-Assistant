
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
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" style={{ animation: 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '2s' }}></div>
      </div>

      {/* Main Content Area - Centered with Aurora Logo */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="flex flex-col items-center space-y-8">
          
          {/* Aurora Logo Section with Enhanced Dynamic Effects */}
          <div className="relative mb-8">
            {/* Multiple layered pulsing rings with different speeds and delays */}
            <div className="absolute inset-0 w-80 h-80 rounded-full border-2 border-cyan-400/20" style={{ animation: 'pulse 3s ease-in-out infinite' }}>
            </div>
            <div className="absolute inset-2 w-76 h-76 rounded-full border-2 border-blue-400/15" style={{ animation: 'pulse 4s ease-in-out infinite', animationDelay: '0.5s' }}>
            </div>
            <div className="absolute inset-4 w-72 h-72 rounded-full border-2 border-purple-400/20" style={{ animation: 'pulse 5s ease-in-out infinite', animationDelay: '1s' }}>
            </div>
            <div className="absolute inset-6 w-68 h-68 rounded-full border border-cyan-300/10" style={{ animation: 'pulse 6s ease-in-out infinite', animationDelay: '1.5s' }}>
            </div>
            
            {/* Expanding ripple effects */}
            <div className="absolute inset-0 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-400/10" style={{ animation: 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
            <div className="absolute inset-0 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/8 to-purple-400/8" style={{ animation: 'ping 5s cubic-bezier(0, 0, 0.2, 1) infinite', animationDelay: '1s' }}></div>
            
            {/* Main Aurora Container with integrated glow effect */}
            <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-cyan-500/20 flex items-center justify-center shadow-2xl overflow-hidden">
              
              {/* Dynamic background glow that breathes with the image */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-blue-500/8 to-purple-500/8 rounded-full" style={{ animation: 'pulse 3s ease-in-out infinite' }}></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/5 via-cyan-500/5 to-blue-500/5 rounded-full" style={{ animation: 'pulse 4s ease-in-out infinite', animationDelay: '1s' }}></div>
              
              {/* Aurora Image with integrated effects */}
              <div className="relative z-10 w-64 h-64 rounded-full overflow-hidden">
                {/* Animated overlay that creates the gentle glow effect on the image */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 via-transparent to-blue-400/15 rounded-full mix-blend-overlay z-10" style={{ animation: 'pulse 3s ease-in-out infinite' }}></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-purple-400/10 via-transparent to-cyan-400/10 rounded-full mix-blend-overlay z-10" style={{ animation: 'pulse 4s ease-in-out infinite', animationDelay: '1s' }}></div>
                
                {/* The actual Aurora image */}
                <img 
                  src="/lovable-uploads/5ca25dad-b4a9-4258-82ad-e4c2493a1a48.png" 
                  alt="Aurora AI Assistant" 
                  className="w-full h-full object-cover rounded-full"
                />
                
                {/* Subtle rotating gradient overlay for extra dynamism */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/8 to-transparent rounded-full mix-blend-overlay" style={{ animation: 'spin 20s linear infinite' }}></div>
              </div>
              
              {/* Enhanced sound wave animations with slower, more elegant movement */}
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-20">
                <div className="flex space-x-2">
                  <div className="w-2 h-12 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/30" style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
                  <div className="w-2 h-20 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/30" style={{ animation: 'pulse 2.5s ease-in-out infinite', animationDelay: '0.3s' }}></div>
                  <div className="w-2 h-8 bg-gradient-to-t from-purple-400 to-cyan-400 rounded-full shadow-lg shadow-purple-400/30" style={{ animation: 'pulse 3s ease-in-out infinite', animationDelay: '0.6s' }}></div>
                  <div className="w-2 h-16 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/30" style={{ animation: 'pulse 2.2s ease-in-out infinite', animationDelay: '0.9s' }}></div>
                </div>
              </div>
              
              <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-20">
                <div className="flex space-x-2">
                  <div className="w-2 h-16 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/30" style={{ animation: 'pulse 2.2s ease-in-out infinite', animationDelay: '0.9s' }}></div>
                  <div className="w-2 h-8 bg-gradient-to-t from-purple-400 to-cyan-400 rounded-full shadow-lg shadow-purple-400/30" style={{ animation: 'pulse 3s ease-in-out infinite', animationDelay: '0.6s' }}></div>
                  <div className="w-2 h-20 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/30" style={{ animation: 'pulse 2.5s ease-in-out infinite', animationDelay: '0.3s' }}></div>
                  <div className="w-2 h-12 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/30" style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* ElevenLabs Widget - Centered */}
          <div className="flex justify-center">
            <elevenlabs-convai agent-id="agent_01jy34sj32eqwvbjjv6bmrhwxd"></elevenlabs-convai>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;
