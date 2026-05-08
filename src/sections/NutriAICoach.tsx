import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { trpc } from '@/providers/trpc';
import { useAuth } from '@/hooks/useAuth';
import { MessageSquare, Send, Loader2, Bot, User, BookOpen, AlertTriangle, Languages } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const PROMPTS_ES: Record<string, string> = {
  perder_grasa: 'Como debo ajustar mi plan de alimentacion para perder grasa corporal manteniendo musculo?',
  ganar_musculo: 'Que estrategia nutricional me recomiendas para ganar masa muscular de forma limpia?',
  pre_entreno: 'Que debo comer antes de entrenar para maximo rendimiento?',
  post_entreno: 'Que debo comer despues de entrenar para recuperacion optima?',
  hidratacion: 'Como debo hidratarme antes, durante y despues del entrenamiento?',
  ayuno: 'El ayuno intermitente es recomendable para deportistas?',
  suplementos: 'Que suplementos tienen evidencia cientifica real para mejorar rendimiento?',
  dormir: 'Como afecta el sueno a mi composicion corporal y rendimiento?',
  periodizacion: 'Como debo cambiar mi nutricion segun la fase de entrenamiento?',
  metabolismo: 'Por que mi metabolismo se ralentizo y como lo revierto?',
};

const PROMPTS_EN: Record<string, string> = {
  lose_fat: 'How should I adjust my nutrition plan to lose body fat while maintaining muscle?',
  gain_muscle: 'What nutrition strategy do you recommend for clean muscle gain?',
  pre_workout: 'What should I eat before training for maximum performance?',
  post_workout: 'What should I eat after training for optimal recovery?',
  hydration: 'How should I hydrate before, during, and after training?',
  fasting: 'Is intermittent fasting recommended for athletes?',
  supplements: 'Which supplements have real scientific evidence for performance?',
  sleep: 'How does sleep affect my body composition and performance?',
  periodization: 'How should I change my nutrition based on training phase?',
  metabolism: 'Why did my metabolism slow down and how do I reverse it?',
};

export function NutriAICoach() {
  const { user } = useAuth();
  const [lang, setLang] = useState<'es' | 'en'>((localStorage.getItem('lang') as 'es' | 'en') || 'es');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const askMutation = trpc.claude.askNutritionQuestion.useMutation({
    onSuccess: (data) => {
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: 'system', content: `⚠️ ${data.error}` }]);
      }
    },
    onError: (err) => {
      setMessages(prev => [...prev, { role: 'system', content: `⚠️ ${err.message}` }]);
    },
  });

  const toggleLang = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = {
    es: {
      title: 'AI Coach Nutricional',
      subtitle: 'Nutriologo deportivo virtual 24/7 con Claude AI',
      placeholder: 'Escribe tu pregunta de nutricion...',
      send: 'Enviar',
      thinking: 'Pensando...',
      welcome: 'Hola! Soy tu AI Coach nutricional. Preguntame lo que necesites sobre nutricion deportiva, periodizacion, suplementacion o recuperacion.',
      disclaimer: 'Las respuestas son generadas por IA y deben ser validadas por un profesional de la salud.',
      noAuth: 'Inicia sesion para usar el AI Coach con respuestas personalizadas.',
      quickQuestions: 'Preguntas rapidas',
    },
    en: {
      title: 'AI Nutrition Coach',
      subtitle: '24/7 virtual sports nutritionist powered by Claude AI',
      placeholder: 'Type your nutrition question...',
      send: 'Send',
      thinking: 'Thinking...',
      welcome: 'Hi! I am your AI Nutrition Coach. Ask me anything about sports nutrition, periodization, supplementation, or recovery.',
      disclaimer: 'Responses are AI-generated and should be validated by a health professional.',
      noAuth: 'Log in to use the AI Coach with personalized responses.',
      quickQuestions: 'Quick questions',
    },
  }[lang];

  const prompts = lang === 'es' ? PROMPTS_ES : PROMPTS_EN;

  const handleSend = (text?: string) => {
    const message = text || input;
    if (!message.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setInput('');

    const context = user ? `Usuario: ${user.name || 'Paciente'}` : undefined;
    askMutation.mutate({ question: message, context, language: lang });
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-[#D4FF00]" />
          <h2 className="text-xl font-bold text-[#f0f0f5]">{t.title}</h2>
        </div>
        <Button variant="outline" size="sm" onClick={toggleLang} className="text-xs border-[#1e1f2e] text-[#8a8d9e]">
          <Languages className="w-3 h-3 mr-1" /> {lang === 'es' ? 'EN' : 'ES'}
        </Button>
      </div>
      <p className="text-xs text-[#8a8d9e]">{t.subtitle}</p>

      {!user && (
        <div className="flex items-center gap-2 p-3 rounded bg-yellow-500/10 border border-yellow-500/20">
          <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
          <p className="text-xs text-yellow-400">{t.noAuth}</p>
        </div>
      )}

      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardContent className="p-0">
          <ScrollArea ref={scrollRef} className="h-[400px] p-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Bot className="w-10 h-10 text-[#D4FF00] mx-auto mb-3" />
                <p className="text-sm text-[#8a8d9e]">{t.welcome}</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && <Bot className="w-5 h-5 text-[#D4FF00] shrink-0 mt-1" />}
                <div className={`max-w-[80%] rounded-lg p-3 text-xs leading-relaxed ${
                  msg.role === 'user' ? 'bg-[#D4FF00]/10 text-[#D4FF00]' :
                  msg.role === 'system' ? 'bg-red-500/10 text-red-400' :
                  'bg-[#0a0b0f] text-[#f0f0f5]'
                }`}>
                  <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
                {msg.role === 'user' && <User className="w-5 h-5 text-[#6366f1] shrink-0 mt-1" />}
              </div>
            ))}
            {askMutation.isPending && (
              <div className="flex gap-2 mb-3">
                <Bot className="w-5 h-5 text-[#D4FF00] shrink-0 animate-pulse" />
                <div className="bg-[#0a0b0f] rounded-lg p-3">
                  <Loader2 className="w-4 h-4 animate-spin text-[#8a8d9e]" />
                </div>
              </div>
            )}
          </ScrollArea>

          <div className="border-t border-[#1e1f2e] p-3">
            <div className="flex gap-2 mb-2 flex-wrap">
              {Object.entries(prompts).slice(0, 5).map(([key, text]) => (
                <button key={key} onClick={() => handleSend(text)} className="text-[9px] px-2 py-1 rounded-full bg-[#1e1f2e] text-[#8a8d9e] hover:text-[#D4FF00] hover:border-[#D4FF00]/30 border border-transparent transition-colors">
                  {key.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder={t.placeholder} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" disabled={askMutation.isPending} />
              <Button onClick={() => handleSend()} disabled={askMutation.isPending || !input.trim()} size="sm" className="bg-[#D4FF00] text-[#050608] hover:bg-[#D4FF00]/90">
                {askMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
              </Button>
            </div>
            <p className="text-[8px] text-[#55576b] mt-2 flex items-center gap-1"><BookOpen className="w-2 h-2" />{t.disclaimer}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
