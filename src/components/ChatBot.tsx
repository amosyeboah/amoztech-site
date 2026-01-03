import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, UserRound, ArrowLeft, Phone } from 'lucide-react';
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
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Need to speak with a human? Choose your preferred contact method:
                  </p>
                  
                  {/* WhatsApp Button */}
                  <a
                    href="https://wa.me/233XXXXXXXXX?text=Hi%2C%20I%20need%20help%20with%20your%20POS%20system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg font-medium transition-colors"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                  
                  {/* Call Button */}
                  <a
                    href="tel:+233XXXXXXXXX"
                    className="flex items-center justify-center gap-3 w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    Call Us Directly
                  </a>
                  
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">or leave a message</span>
                    </div>
                  </div>

                  <form onSubmit={handleEscalationSubmit} className="space-y-3">
                    <div>
                      <Input
                        value={escalationForm.name}
                        onChange={(e) => setEscalationForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your name *"
                        required
                      />
                    </div>
                    
                    <div>
                      <Input
                        type="email"
                        value={escalationForm.email}
                        onChange={(e) => setEscalationForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Email address *"
                        required
                      />
                    </div>
                    
                    <div>
                      <Textarea
                        value={escalationForm.issue}
                        onChange={(e) => setEscalationForm(prev => ({ ...prev, issue: e.target.value }))}
                        placeholder="How can we help? *"
                        rows={2}
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-cloud-blue hover:bg-blue-600"
                      disabled={isSubmittingEscalation}
                    >
                      {isSubmittingEscalation ? 'Submitting...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
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
