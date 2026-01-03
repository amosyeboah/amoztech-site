import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, UserRound, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatBotProps {
  onClose?: () => void;
}

const ChatBot = ({ onClose }: ChatBotProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEscalationForm, setShowEscalationForm] = useState(false);
  const [escalationSubmitted, setEscalationSubmitted] = useState(false);
  const [escalationForm, setEscalationForm] = useState({
    name: '',
    email: '',
    phone: '',
    issue: ''
  });
  
  const handleClose = () => {
    setIsOpen(false);
    setShowEscalationForm(false);
    setEscalationSubmitted(false);
    onClose?.();
  };
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingEscalation, setIsSubmittingEscalation] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: Message) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
    
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!resp.ok) {
        const error = await resp.json();
        throw new Error(error.error || "Failed to get response");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";

      // Add initial assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: assistantContent
                };
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
      
      // Remove the last assistant message if it's empty
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1]?.role === 'assistant' && 
            !newMessages[newMessages.length - 1]?.content) {
          newMessages.pop();
        }
        return newMessages;
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    await streamChat(userMessage);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEscalationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!escalationForm.name || !escalationForm.email || !escalationForm.issue) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingEscalation(true);
    
    // Simulate submission (in production, this would call an API)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmittingEscalation(false);
    setEscalationSubmitted(true);
    
    toast({
      title: "Request Submitted",
      description: "Our support team will contact you shortly.",
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-sm font-medium shadow text-gray-800 max-w-[60%] truncate">
            <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse inline-block" />
            <span className="truncate">Chat</span>
          </span>

          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full shadow-lg bg-cloud-blue hover:bg-blue-600"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:right-6 md:w-96 h-[500px] max-h-[80vh] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-cloud-blue text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              {showEscalationForm && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowEscalationForm(false);
                    setEscalationSubmitted(false);
                  }}
                  className="h-8 w-8 text-white hover:bg-blue-700 -ml-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              {!showEscalationForm && <MessageCircle className="h-5 w-5" />}
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">
                  {showEscalationForm ? 'Contact Support' : 'Chat with us'}
                </h3>
                {!showEscalationForm && (
                  <span className="inline-flex items-center gap-2 bg-white/10 text-white text-xs px-2 py-0.5 rounded-full">
                    <span className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse inline-block" />
                    <span className="font-medium">Live</span>
                  </span>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Escalation Form */}
          {showEscalationForm ? (
            <div className="flex-1 p-4 overflow-auto">
              {escalationSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <UserRound className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Request Received!</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Our support team will reach out to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowEscalationForm(false);
                      setEscalationSubmitted(false);
                    }}
                  >
                    Back to Chat
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleEscalationSubmit} className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Need to speak with a human? Fill out this form and our team will contact you shortly.
                  </p>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={escalationForm.name}
                      onChange={(e) => setEscalationForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      value={escalationForm.email}
                      onChange={(e) => setEscalationForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone (optional)
                    </label>
                    <Input
                      type="tel"
                      value={escalationForm.phone}
                      onChange={(e) => setEscalationForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+233 XX XXX XXXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      How can we help? <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      value={escalationForm.issue}
                      onChange={(e) => setEscalationForm(prev => ({ ...prev, issue: e.target.value }))}
                      placeholder="Describe your issue or question..."
                      rows={3}
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-cloud-blue hover:bg-blue-600"
                    disabled={isSubmittingEscalation}
                  >
                    {isSubmittingEscalation ? 'Submitting...' : 'Request Human Support'}
                  </Button>
                </form>
              )}
            </div>
          ) : (
            <>
              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-8">
                    <p>👋 Hi! How can I help you today?</p>
                    <p className="text-sm mt-2">Ask me about our services!</p>
                  </div>
                )}
                
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    <div
                      className={`inline-block max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-cloud-blue text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                
                {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                  <div className="text-left mb-4">
                    <div className="inline-block bg-gray-100 p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </ScrollArea>

              {/* Escalation Button */}
              <div className="px-4 pb-2">
                <button
                  onClick={() => setShowEscalationForm(true)}
                  className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-cloud-blue py-2 transition-colors"
                >
                  <UserRound className="h-4 w-4" />
                  <span>Need human support?</span>
                </button>
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="bg-cloud-blue hover:bg-blue-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;
