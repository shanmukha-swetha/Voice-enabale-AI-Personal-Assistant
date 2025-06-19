
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WebhookIntegrationProps {
  agentId: string;
}

const WebhookIntegration = ({ agentId }: WebhookIntegrationProps) => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState<string>('');

  // Listen for ElevenLabs conversation events
  useEffect(() => {
    const handleConversationEvent = async (event: any) => {
      if (!webhookUrl) return;

      // Show "working on it" message instead of "sending to n8n"
      toast({
        title: "Working on it",
        description: "Processing your request...",
      });

      const conversationData = {
        agentId,
        timestamp: new Date().toISOString(),
        eventType: event.type || 'conversation',
        data: event.detail || event.data || {},
        source: 'elevenlabs-aurora'
      };

      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify(conversationData),
        });

        console.log('Conversation data sent to n8n:', conversationData);
      } catch (error) {
        console.error('Failed to send data to n8n:', error);
      }
    };

    // Listen for various ElevenLabs events
    window.addEventListener('elevenlabs-conversation-start', handleConversationEvent);
    window.addEventListener('elevenlabs-conversation-end', handleConversationEvent);
    window.addEventListener('elevenlabs-message', handleConversationEvent);
    window.addEventListener('elevenlabs-response', handleConversationEvent);

    return () => {
      window.removeEventListener('elevenlabs-conversation-start', handleConversationEvent);
      window.removeEventListener('elevenlabs-conversation-end', handleConversationEvent);
      window.removeEventListener('elevenlabs-message', handleConversationEvent);
      window.removeEventListener('elevenlabs-response', handleConversationEvent);
    };
  }, [webhookUrl, agentId, toast]);

  const handleWebhookUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebhookUrl(e.target.value);
    localStorage.setItem('n8n-webhook-url', e.target.value);
  };

  // Load saved webhook URL on component mount
  useEffect(() => {
    const savedUrl = localStorage.getItem('n8n-webhook-url');
    if (savedUrl) {
      setWebhookUrl(savedUrl);
    }
  }, []);

  const testWebhook = async () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter your n8n webhook URL first",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Working on it",
      description: "Testing connection...",
    });

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          test: true,
          message: 'Test connection from Aurora',
          timestamp: new Date().toISOString(),
          agentId
        }),
      });

      toast({
        title: "Test Sent",
        description: "Test message sent to n8n. Check your workflow to confirm receipt.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send test message to n8n",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="absolute top-6 right-6 bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20 max-w-xs z-30">
      <h3 className="text-sm font-semibold text-cyan-400 mb-2">n8n Integration</h3>
      <div className="space-y-2">
        <input
          type="url"
          placeholder="Enter your n8n webhook URL"
          value={webhookUrl}
          onChange={handleWebhookUrlChange}
          className="w-full px-2 py-1 text-xs bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
        />
        <button
          onClick={testWebhook}
          className="w-full px-2 py-1 text-xs bg-cyan-600 hover:bg-cyan-700 text-white rounded transition-colors"
        >
          Test Connection
        </button>
        {webhookUrl && (
          <div className="text-xs text-green-400">✓ Webhook configured</div>
        )}
      </div>
    </div>
  );
};

export default WebhookIntegration;
