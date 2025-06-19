
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

    // Add aggressive CSS to hide all chat interfaces
    const hideStyle = document.createElement('style');
    hideStyle.textContent = `
      /* Hide all potential chat interfaces */
      [data-testid*="chat"],
      [data-testid*="message"],
      [data-testid*="input"],
      [data-testid*="text"],
      .chat-container,
      .chat-window,
      .chat-interface,
      .text-chat,
      .message-container,
      .conversation-panel,
      .conversation-window,
      .chat-widget,
      .message-input,
      .chat-input,
      .text-input,
      .input-container,
      /* Hide ElevenLabs specific elements */
      elevenlabs-convai div[style*="position: fixed"],
      elevenlabs-convai div[style*="position: absolute"],
      elevenlabs-convai div[style*="z-index"],
      elevenlabs-convai div[style*="background"],
      elevenlabs-convai div[style*="border"],
      elevenlabs-convai div[style*="box-shadow"],
      elevenlabs-convai div[style*="width"],
      elevenlabs-convai div[style*="height"],
      elevenlabs-convai > div > div:not([style*="display: flex"]),
      elevenlabs-convai iframe,
      /* Hide any white/light colored containers */
      div[style*="background-color: white"],
      div[style*="background-color: #fff"],
      div[style*="background-color: #ffffff"],
      div[style*="background: white"],
      div[style*="background: #fff"],
      div[style*="background: #ffffff"],
      div[style*="background-color: rgb(255, 255, 255)"],
      /* Hide text inputs */
      input[type="text"],
      input[placeholder*="message"],
      input[placeholder*="type"],
      input[placeholder*="chat"],
      textarea[placeholder*="message"],
      textarea[placeholder*="type"],
      textarea[placeholder*="chat"],
      /* Hide modals and overlays */
      .modal,
      .overlay,
      [role="dialog"],
      [role="modal"],
      [role="textbox"],
      /* Hide any element that might be a chat bubble or message */
      div[style*="border-radius"][style*="padding"],
      div[style*="border-radius"][style*="background"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
      
      /* Ensure elevenlabs-convai only shows voice button */
      elevenlabs-convai {
        background: transparent !important;
        border: none !important;
        position: relative !important;
      }
      
      /* Hide everything except the microphone button */
      elevenlabs-convai > * {
        display: none !important;
      }
      
      /* Show only the voice/microphone button */
      elevenlabs-convai button,
      elevenlabs-convai [role="button"],
      elevenlabs-convai div[style*="cursor: pointer"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        position: relative !important;
        left: auto !important;
        top: auto !important;
      }
    `;
    document.head.appendChild(hideStyle);

    // Ultra-aggressive observer to kill any chat elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        // Target all potential chat elements
        const chatSelectors = [
          '[data-testid*="chat"]',
          '[data-testid*="message"]',
          '[data-testid*="input"]',
          '[data-testid*="text"]',
          '.chat-container',
          '.chat-window',
          '.chat-interface',
          '.text-chat',
          '.message-container',
          '.conversation-panel',
          '.conversation-window',
          '.chat-widget',
          '.message-input',
          '.chat-input',
          '.text-input',
          '.input-container',
          'input[type="text"]',
          'input[placeholder*="message"]',
          'input[placeholder*="type"]',
          'input[placeholder*="chat"]',
          'textarea[placeholder*="message"]',
          'textarea[placeholder*="type"]',
          'textarea[placeholder*="chat"]',
          'div[style*="background-color: white"]',
          'div[style*="background-color: #fff"]',
          'div[style*="background-color: #ffffff"]',
          'div[style*="background: white"]',
          'div[style*="background: #fff"]',
          'div[style*="background: #ffffff"]',
          'div[style*="background-color: rgb(255, 255, 255)"]',
          '[role="dialog"]',
          '[role="modal"]',
          '[role="textbox"]'
        ];

        chatSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            const htmlElement = element as HTMLElement;
            htmlElement.style.display = 'none';
            htmlElement.style.visibility = 'hidden';
            htmlElement.style.opacity = '0';
            htmlElement.style.pointerEvents = 'none';
            htmlElement.style.position = 'absolute';
            htmlElement.style.left = '-9999px';
            htmlElement.style.top = '-9999px';
          });
        });

        // Specifically target ElevenLabs widget children
        const convaiElements = document.querySelectorAll('elevenlabs-convai');
        convaiElements.forEach(convai => {
          const children = convai.querySelectorAll('*');
          children.forEach(child => {
            const htmlChild = child as HTMLElement;
            // Hide everything except buttons
            if (!htmlChild.matches('button') && 
                !htmlChild.matches('[role="button"]') && 
                !htmlChild.style.cursor?.includes('pointer')) {
              htmlChild.style.display = 'none';
              htmlChild.style.visibility = 'hidden';
              htmlChild.style.opacity = '0';
              htmlChild.style.pointerEvents = 'none';
            }
          });
        });

        // Kill any fixed/absolute positioned elements that look like chat windows
        const fixedElements = document.querySelectorAll('div[style*="position: fixed"], div[style*="position: absolute"]');
        fixedElements.forEach(element => {
          const htmlElement = element as HTMLElement;
          const computedStyle = window.getComputedStyle(htmlElement);
          const hasWhiteBackground = computedStyle.backgroundColor === 'rgb(255, 255, 255)' || 
                                   computedStyle.backgroundColor === 'white' ||
                                   computedStyle.backgroundColor === '#fff' ||
                                   computedStyle.backgroundColor === '#ffffff';
          
          if (hasWhiteBackground || 
              htmlElement.innerHTML.includes('Send') ||
              htmlElement.innerHTML.includes('message') ||
              htmlElement.innerHTML.includes('Type') ||
              htmlElement.querySelector('input') ||
              htmlElement.querySelector('textarea') ||
              htmlElement.querySelector('[role="textbox"]')) {
            htmlElement.style.display = 'none';
            htmlElement.style.visibility = 'hidden';
            htmlElement.style.opacity = '0';
            htmlElement.style.pointerEvents = 'none';
            htmlElement.style.position = 'absolute';
            htmlElement.style.left = '-9999px';
            htmlElement.style.top = '-9999px';
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'data-testid']
    });

    // Additional cleanup interval
    const cleanupInterval = setInterval(() => {
      const allDivs = document.querySelectorAll('div');
      allDivs.forEach(div => {
        if (div.innerHTML.includes('Send a message') || 
            div.innerHTML.includes('Type a message') ||
            div.querySelector('input[type="text"]') ||
            div.querySelector('textarea')) {
          div.style.display = 'none';
        }
      });
    }, 500);

    return () => {
      observer.disconnect();
      clearInterval(cleanupInterval);
      if (document.head.contains(hideStyle)) {
        document.head.removeChild(hideStyle);
      }
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
