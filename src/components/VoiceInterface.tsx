
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

    // Ultra-aggressive CSS to block ALL possible chat interfaces, popups, and overlays
    const ultraHideStyle = document.createElement('style');
    ultraHideStyle.textContent = `
      /* NUCLEAR OPTION - Hide everything that could be a chat/popup */
      [data-testid*="chat"],
      [data-testid*="message"],
      [data-testid*="input"],
      [data-testid*="text"],
      [data-testid*="conversation"],
      [data-testid*="dialog"],
      [data-testid*="modal"],
      [data-testid*="popup"],
      [data-testid*="overlay"],
      [class*="chat"],
      [class*="message"],
      [class*="input"],
      [class*="text"],
      [class*="conversation"],
      [class*="dialog"],
      [class*="modal"],
      [class*="popup"],
      [class*="overlay"],
      [id*="chat"],
      [id*="message"],
      [id*="input"],
      [id*="text"],
      [id*="conversation"],
      [id*="dialog"],
      [id*="modal"],
      [id*="popup"],
      [id*="overlay"],
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
      /* Block all forms of inputs */
      input[type="text"],
      input[type="search"],
      input[placeholder],
      textarea,
      [contenteditable="true"],
      [role="textbox"],
      [role="searchbox"],
      [role="combobox"],
      /* Block all overlays and modals */
      .modal,
      .overlay,
      .popup,
      .dialog,
      [role="dialog"],
      [role="modal"],
      [role="alertdialog"],
      /* Block fixed/absolute positioned containers that could be popups */
      div[style*="position: fixed"]:not([style*="pointer-events: none"]),
      div[style*="position: absolute"]:not([style*="pointer-events: none"]),
      div[style*="z-index: 9"]:not(elevenlabs-convai),
      div[style*="z-index: 1"]:not(elevenlabs-convai),
      /* Block white/light backgrounds that could be chat windows */
      div[style*="background-color: white"]:not(elevenlabs-convai),
      div[style*="background-color: #fff"]:not(elevenlabs-convai),
      div[style*="background-color: #ffffff"]:not(elevenlabs-convai),
      div[style*="background: white"]:not(elevenlabs-convai),
      div[style*="background: #fff"]:not(elevenlabs-convai),
      div[style*="background: #ffffff"]:not(elevenlabs-convai),
      div[style*="background-color: rgb(255, 255, 255)"]:not(elevenlabs-convai),
      /* Block iframes that could contain chat */
      iframe:not([src*="elevenlabs"]),
      /* Block any container with borders that could be chat bubbles */
      div[style*="border-radius"][style*="padding"]:not(elevenlabs-convai *),
      div[style*="border"][style*="background"]:not(elevenlabs-convai *),
      div[style*="box-shadow"]:not(elevenlabs-convai *) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -99999px !important;
        top: -99999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        z-index: -99999 !important;
      }
      
      /* Ensure elevenlabs-convai container is clean */
      elevenlabs-convai {
        background: transparent !important;
        border: none !important;
        position: relative !important;
        overflow: visible !important;
      }
      
      /* Hide ALL children of elevenlabs-convai except voice button */
      elevenlabs-convai > *:not(button):not([role="button"]):not([style*="cursor: pointer"]) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -99999px !important;
        top: -99999px !important;
      }
      
      /* Ensure voice button remains visible and functional */
      elevenlabs-convai button,
      elevenlabs-convai [role="button"],
      elevenlabs-convai [style*="cursor: pointer"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        position: relative !important;
        left: auto !important;
        top: auto !important;
        z-index: 1 !important;
      }

      /* Block any element that might appear on top */
      body > div:not(#root):not([data-sonner-toaster]):not([data-toast-viewport]),
      html > div:not(body) {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }

      /* Prevent any scrolling that might reveal hidden elements */
      body {
        overflow-x: hidden !important;
      }
    `;
    document.head.appendChild(ultraHideStyle);

    // Nuclear mutation observer - kills everything suspicious
    const nuclearObserver = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        // Kill any new elements that match suspicious patterns
        const suspiciousSelectors = [
          '[data-testid*="chat"]', '[data-testid*="message"]', '[data-testid*="input"]',
          '[data-testid*="text"]', '[data-testid*="conversation"]', '[data-testid*="dialog"]',
          '[data-testid*="modal"]', '[data-testid*="popup"]', '[data-testid*="overlay"]',
          '[class*="chat"]', '[class*="message"]', '[class*="input"]', '[class*="text"]',
          '[class*="conversation"]', '[class*="dialog"]', '[class*="modal"]',
          '[class*="popup"]', '[class*="overlay"]', '[id*="chat"]', '[id*="message"]',
          '[id*="input"]', '[id*="text"]', '[id*="conversation"]', '[id*="dialog"]',
          '[id*="modal"]', '[id*="popup"]', '[id*="overlay"]',
          'input[type="text"]', 'input[type="search"]', 'textarea',
          '[contenteditable="true"]', '[role="textbox"]', '[role="searchbox"]',
          '[role="combobox"]', '[role="dialog"]', '[role="modal"]', '[role="alertdialog"]',
          'iframe:not([src*="elevenlabs"])'
        ];

        suspiciousSelectors.forEach(selector => {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            if (!element.closest('elevenlabs-convai')) {
              const htmlElement = element as HTMLElement;
              htmlElement.style.display = 'none';
              htmlElement.style.visibility = 'hidden';
              htmlElement.style.opacity = '0';
              htmlElement.style.pointerEvents = 'none';
              htmlElement.style.position = 'absolute';
              htmlElement.style.left = '-99999px';
              htmlElement.style.top = '-99999px';
              htmlElement.style.zIndex = '-99999';
            }
          });
        });

        // Kill any fixed/absolute positioned elements outside of our app
        const positionedElements = document.querySelectorAll('div[style*="position: fixed"], div[style*="position: absolute"]');
        positionedElements.forEach(element => {
          if (!element.closest('#root') && !element.closest('elevenlabs-convai') && 
              !element.hasAttribute('data-sonner-toaster') && !element.hasAttribute('data-toast-viewport')) {
            const htmlElement = element as HTMLElement;
            htmlElement.style.display = 'none';
            htmlElement.style.visibility = 'hidden';
            htmlElement.style.opacity = '0';
            htmlElement.style.pointerEvents = 'none';
            htmlElement.style.position = 'absolute';
            htmlElement.style.left = '-99999px';
            htmlElement.style.top = '-99999px';
          }
        });

        // Specifically target any new elements added to elevenlabs-convai
        const convaiElements = document.querySelectorAll('elevenlabs-convai');
        convaiElements.forEach(convai => {
          const children = Array.from(convai.children);
          children.forEach(child => {
            const htmlChild = child as HTMLElement;
            // Hide everything except buttons
            if (!htmlChild.matches('button') && 
                !htmlChild.matches('[role="button"]') && 
                !htmlChild.style.cursor?.includes('pointer') &&
                !htmlChild.innerHTML?.includes('🎤') &&
                !htmlChild.innerHTML?.includes('mic')) {
              htmlChild.style.display = 'none';
              htmlChild.style.visibility = 'hidden';
              htmlChild.style.opacity = '0';
              htmlChild.style.pointerEvents = 'none';
              htmlChild.style.position = 'absolute';
              htmlChild.style.left = '-99999px';
              htmlChild.style.top = '-99999px';
            }
          });
        });

        // Kill any body children that aren't our app
        const bodyChildren = Array.from(document.body.children);
        bodyChildren.forEach(child => {
          if (child.id !== 'root' && 
              !child.hasAttribute('data-sonner-toaster') && 
              !child.hasAttribute('data-toast-viewport') &&
              !child.tagName.toLowerCase().includes('script') &&
              !child.tagName.toLowerCase().includes('style')) {
            const htmlChild = child as HTMLElement;
            htmlChild.style.display = 'none';
            htmlChild.style.visibility = 'hidden';
            htmlChild.style.opacity = '0';
            htmlChild.style.pointerEvents = 'none';
          }
        });
      });
    });

    nuclearObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class', 'data-testid', 'id', 'role']
    });

    // Aggressive cleanup interval
    const aggressiveCleanup = setInterval(() => {
      // Remove any suspicious elements
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        const htmlElement = element as HTMLElement;
        const text = htmlElement.textContent || '';
        const innerHTML = htmlElement.innerHTML || '';
        
        // If it contains chat-related text and isn't part of our main app
        if ((text.includes('Send') || text.includes('Type') || text.includes('message') || 
             text.includes('chat') || innerHTML.includes('input') || innerHTML.includes('textarea')) &&
            !htmlElement.closest('#root elevenlabs-convai button') &&
            !htmlElement.closest('#root > div > div')) {
          htmlElement.style.display = 'none';
          htmlElement.style.visibility = 'hidden';
          htmlElement.style.opacity = '0';
          htmlElement.style.pointerEvents = 'none';
          htmlElement.style.position = 'absolute';
          htmlElement.style.left = '-99999px';
          htmlElement.style.top = '-99999px';
        }
      });

      // Block any new popups or overlays
      const popups = document.querySelectorAll('[style*="z-index"]');
      popups.forEach(popup => {
        const htmlPopup = popup as HTMLElement;
        const zIndex = parseInt(htmlPopup.style.zIndex || '0');
        if (zIndex > 100 && !htmlPopup.closest('#root') && !htmlPopup.closest('elevenlabs-convai')) {
          htmlPopup.style.display = 'none';
          htmlPopup.style.visibility = 'hidden';
          htmlPopup.style.opacity = '0';
          htmlPopup.style.pointerEvents = 'none';
        }
      });
    }, 100);

    // Override any window.open calls
    const originalOpen = window.open;
    window.open = () => null;

    // Block any modal/dialog creation
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName: string) {
      const element = originalCreateElement.call(this, tagName);
      if (tagName.toLowerCase() === 'dialog' || 
          tagName.toLowerCase() === 'iframe' ||
          element.getAttribute?.('role') === 'dialog' ||
          element.getAttribute?.('role') === 'modal') {
        (element as HTMLElement).style.display = 'none';
      }
      return element;
    };

    return () => {
      nuclearObserver.disconnect();
      clearInterval(aggressiveCleanup);
      window.open = originalOpen;
      document.createElement = originalCreateElement;
      if (document.head.contains(ultraHideStyle)) {
        document.head.removeChild(ultraHideStyle);
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
