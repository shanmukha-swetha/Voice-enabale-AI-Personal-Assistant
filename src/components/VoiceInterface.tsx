
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

    // Add CSS to hide chat windows and text interfaces
    const hideStyle = document.createElement('style');
    hideStyle.textContent = `
      /* Hide all potential chat interfaces */
      [data-testid*="chat"],
      .chat-container,
      .chat-window,
      .chat-interface,
      .text-chat,
      .message-container,
      .conversation-panel,
      div[style*="position: fixed"],
      div[style*="position: absolute"] iframe,
      /* Hide ElevenLabs chat components */
      elevenlabs-convai div[style*="background"],
      elevenlabs-convai div[style*="border"],
      elevenlabs-convai div[style*="box-shadow"],
      elevenlabs-convai > div > div,
      /* Hide any white/light colored popup containers */
      div[style*="background-color: white"],
      div[style*="background-color: #fff"],
      div[style*="background: white"],
      div[style*="background: #fff"],
      /* Hide text input areas */
      input[placeholder*="message"],
      textarea[placeholder*="message"],
      .message-input,
      .chat-input {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      
      /* Ensure only the voice button is visible */
      elevenlabs-convai {
        background: transparent !important;
        border: none !important;
      }
      
      elevenlabs-convai * {
        background: transparent !important;
      }
      
      /* Hide any modal or overlay */
      .modal,
      .overlay,
      [role="dialog"],
      [role="modal"] {
        display: none !important;
      }
    `;
    document.head.appendChild(hideStyle);

    // Continuously monitor and hide any chat elements that appear
    const observer = new MutationObserver(() => {
      // Hide chat elements
      const chatElements = document.querySelectorAll(`
        [data-testid*="chat"],
        .chat-container,
        .chat-window,
        .chat-interface,
        .text-chat,
        .message-container,
        .conversation-panel,
        input[placeholder*="message"],
        textarea[placeholder*="message"],
        .message-input,
        .chat-input,
        div[style*="background-color: white"],
        div[style*="background-color: #fff"],
        div[style*="background: white"],
        div[style*="background: #fff"]
      `);
      
      chatElements.forEach(element => {
        (element as HTMLElement).style.display = 'none';
        (element as HTMLElement).style.visibility = 'hidden';
        (element as HTMLElement).style.opacity = '0';
        (element as HTMLElement).style.pointerEvents = 'none';
      });

      // Also hide any fixed/absolute positioned divs that might be chat windows
      const fixedElements = document.querySelectorAll('div[style*="position: fixed"], div[style*="position: absolute"]');
      fixedElements.forEach(element => {
        const htmlElement = element as HTMLElement;
        if (htmlElement.style.backgroundColor === 'white' || 
            htmlElement.style.backgroundColor === '#fff' ||
            htmlElement.style.background === 'white' ||
            htmlElement.style.background === '#fff' ||
            htmlElement.innerHTML.includes('Send a message') ||
            htmlElement.querySelector('input') ||
            htmlElement.querySelector('textarea')) {
          htmlElement.style.display = 'none';
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    return () => {
      observer.disconnect();
      document.head.removeChild(hideStyle);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col relative overflow-hidden">
      {/* Top Left Aurora Logo and Status */}
      <div className="absolute top-6 left-6 flex items-center space-x-3 z-30">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400/30">
          <img 
            src="/lovable-uploads/5ca25dad-b4a9-4258-82ad-e4c2493a1a48.png" 
            alt="Aurora Logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-wider text-cyan-400">AURORA</span>
          <span className="text-xs text-green-400 font-medium">VOICE READY</span>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl" style={{ animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" style={{ animation: 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '4s' }}></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="flex flex-col items-center space-y-8">
          
          <div className="relative mb-8">
            <div className="absolute inset-0 w-80 h-80 rounded-full border-2 border-cyan-400/30" style={{ 
              animation: 'pulse 4s ease-in-out infinite',
              animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}></div>
            <div className="absolute inset-4 w-72 h-72 rounded-full border border-blue-400/20" style={{ 
              animation: 'pulse 4s ease-in-out infinite', 
              animationDelay: '2s',
              animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}></div>
            
            <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm border border-cyan-500/20 flex items-center justify-center shadow-2xl overflow-hidden">
              
              <div className="relative z-10 w-64 h-64 rounded-full overflow-hidden" style={{
                animation: 'pulse 6s ease-in-out infinite',
                animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-400/10 rounded-full mix-blend-overlay z-10" style={{ 
                  animation: 'pulse 6s ease-in-out infinite',
                  animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)'
                }}></div>
                
                <img 
                  src="/lovable-uploads/5ca25dad-b4a9-4258-82ad-e4c2493a1a48.png" 
                  alt="Aurora AI Assistant" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-20">
                <div className="flex space-x-2">
                  <div className="w-2 h-12 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/30" style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
                  <div className="w-2 h-20 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/30" style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '0.3s' }}></div>
                  <div className="w-2 h-8 bg-gradient-to-t from-purple-400 to-cyan-400 rounded-full shadow-lg shadow-purple-400/30" style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '0.6s' }}></div>
                  <div className="w-2 h-16 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/30" style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '0.9s' }}></div>
                </div>
              </div>
              
              <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-20">
                <div className="flex space-x-2">
                  <div className="w-2 h-16 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/30" style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '0.9s' }}></div>
                  <div className="w-2 h-8 bg-gradient-to-t from-purple-400 to-cyan-400 rounded-full shadow-lg shadow-purple-400/30" style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '0.6s' }}></div>
                  <div className="w-2 h-20 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/30" style={{ animation: 'pulse 2s ease-in-out infinite', animationDelay: '0.3s' }}></div>
                  <div className="w-2 h-12 bg-gradient-to-t from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/30" style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Voice-only ElevenLabs Widget */}
          <div className="flex justify-center">
            <elevenlabs-convai 
              agent-id="agent_01jy34sj32eqwvbjjv6bmrhwxd"
            ></elevenlabs-convai>
          </div>

          <div className="text-center mt-4">
            <p className="text-cyan-400 text-sm font-medium">Click the button above to start talking with Aurora</p>
            <p className="text-slate-400 text-xs mt-1">Voice conversation only - no chat windows</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;
