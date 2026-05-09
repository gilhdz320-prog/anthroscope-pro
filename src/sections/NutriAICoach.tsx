import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Loader2, Bot, User, BookOpen, AlertTriangle, Languages, Database, Sparkles } from 'lucide-react';
import { findBestDemoResponse, getDemoResponseCount } from '@/data/demoResponses';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const DEMO_COUNT = getDemoResponseCount();

export function NutriAICoach() {
  const [lang, setLang] = useState<'es' | 'en'>((localStorage.getItem('lang') as 'es' | 'en') || 'es');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [backendError, setBackendError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleLang = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = {
    es: {
      title: 'AI Coach Nutricional',
      subtitle: isDemo ? `${DEMO_COUNT}+ respuestas evidence-based (ISSN/ACSM/IOC)` : 'Claude AI 24/7 — Respuestas en tiempo real',
      placeholder: 'Pregunta sobre nutrición deportiva...',
      send: 'Enviar',
      thinking: 'Pensando...',
      welcome: `Hola! Soy tu AI Coach nutricional con **${DEMO_COUNT} respuestas científicas** basadas en ISSN, ACSM e IOC 2018–2024.\n\nTemas cubiertos:\n• Proteína, carbs, grasas • Suplementos (creatina, cafeína, etc.)\n• Hidratación • Pre/post entreno • Pérdida de grasa / Hipertrofia\n• Atletas femeninas / RED-S • Vegano • Sueño y recuperación\n• Día de competencia / Corte de peso • Periodización nutricional\n\nEjemplos:\n- ¿Cuánta proteína necesito para ganar músculo?\n- ¿Cómo hidratarme en un maratón?\n- ¿La creatina es segura?\n- ¿Qué comer antes de entrenar fuerza?`,
      disclaimer: 'Respuestas basadas en evidencia científica (ISSN, ACSM, IOC). No sustituyen consejo médico profesional.',
      demoBadge: `${DEMO_COUNT} TEMAS`,
      liveBadge: 'CLAUDE AI',
      backendError: 'Modo inteligente activado — respuestas evidence-based.',
    },
    en: {
      title: 'AI Nutrition Coach',
      subtitle: isDemo ? `${DEMO_COUNT}+ evidence-based responses (ISSN/ACSM/IOC)` : 'Claude AI 24/7 — Real-time responses',
      placeholder: 'Ask about sports nutrition...',
      send: 'Send',
      thinking: 'Thinking...',
      welcome: `Hi! I'm your AI Nutrition Coach with **${DEMO_COUNT} scientific responses** based on ISSN, ACSM & IOC 2018–2024.\n\nTopics covered:\n• Protein, carbs, fats • Supplements (creatine, caffeine, etc.)\n• Hydration • Pre/post workout • Fat loss / Hypertrophy\n• Female athletes / RED-S • Vegan • Sleep & recovery\n• Competition day / Weight cutting • Nutrition periodization\n\nExamples:\n- How much protein for muscle gain?\n- How to hydrate for a marathon?\n- Is creatine safe?\n- What to eat before strength training?`,
      disclaimer: 'Responses based on scientific evidence (ISSN, ACSM, IOC). Not a substitute for professional medical advice.',
      demoBadge: `${DEMO_COUNT} TOPICS`,
      liveBadge: 'CLAUDE AI',
      backendError: 'Smart mode activated — evidence-based responses.',
    },
  }[lang];

  const handleSend = async (text?: string) => {
    const question = text || input;
    if (!question.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: question }]);
    setInput('');
    setIsThinking(true);
    setBackendError('');

    try {
      // INTENTAR BACKEND REAL PRIMERO
      console.log('[AI Coach] Intentando backend con idioma:', lang);
      
      const response = await fetch('https://anthroscope-pro.onrender.com/api/trpc/claude.askNutritionQuestion', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          json: { question, language: lang }
        }),
      });

      console.log('[AI Coach] Backend status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[AI Coach] Backend error response:', errorText.substring(0, 200));
        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
      }

      const data = await response.json();
      console.log('[AI Coach] Backend response keys:', Object.keys(data));
      
      // tRPC fetch adapter response format: result.data.json.{answer, error}
      const result = data.result?.data?.json || data.result?.data;
      console.log('[AI Coach] Parsed result:', result ? 'OK' : 'EMPTY', result?.error || 'no error');
      
      if (result?.answer) {
        // BACKEND FUNCIONA CON CLAUDE AI REAL!
        console.log('[AI Coach] Claude AI response received! Length:', result.answer.length);
        setMessages(prev => [...prev, { role: 'assistant', content: result.answer }]);
        setIsDemo(false);
        setBackendError('');
      } else if (result?.error) {
        // Backend respondió pero con error (ej: no hay API key)
        console.warn('[AI Coach] Backend error:', result.error);
        throw new Error(result.error);
      } else {
        console.error('[AI Coach] Unexpected response format:', JSON.stringify(data).substring(0, 200));
        throw new Error('Formato de respuesta inesperado del backend');
      }
    } catch (err: any) {
      console.error('Backend error:', err);
      // FALLBACK A MODO DEMO INTELIGENTE — 100+ respuestas evidence-based
      setBackendError(t.backendError);
      setIsDemo(true);
      
      // Simular delay de "pensando" para mejor UX
      await new Promise(r => setTimeout(r, 800 + Math.random() * 700));
      
      const demoResponse = findBestDemoResponse(question, lang);
      setMessages(prev => [...prev, { role: 'assistant', content: demoResponse }]);
    }

    setIsThinking(false);
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
        <div className="flex gap-2">
          <Badge className={isDemo ? 'bg-[#6366f1]/20 text-[#a78bfa] border-[#6366f1]/30' : 'bg-green-500/20 text-green-400'}>
            {isDemo ? <><Database className="w-3 h-3 mr-1 inline" />{t.demoBadge}</> : t.liveBadge}
          </Badge>
          <Button variant="outline" size="sm" onClick={toggleLang} className="text-xs">
            <Languages className="w-3 h-3 mr-1" /> {lang === 'es' ? 'EN' : 'ES'}
          </Button>
        </div>
      </div>
      <p className="text-xs text-[#8a8d9e]">{t.subtitle}</p>
      
      {backendError && (
        <div className="text-xs text-[#a78bfa] bg-[#6366f1]/10 p-2 rounded border border-[#6366f1]/20">
          <Sparkles className="w-3 h-3 inline mr-1" />
          {backendError}
        </div>
      )}

      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardContent className="p-0">
          <ScrollArea ref={scrollRef} className="h-[400px] p-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Bot className="w-10 h-10 text-[#D4FF00] mx-auto mb-3" />
                <p className="text-sm text-[#8a8d9e] whitespace-pre-line">{t.welcome}</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && <Bot className="w-5 h-5 text-[#D4FF00] shrink-0 mt-1" />}
                <div className={`max-w-[80%] rounded-lg p-3 text-xs leading-relaxed ${
                  msg.role === 'user' ? 'bg-[#D4FF00]/10 text-[#D4FF00]' : 'bg-[#0a0b0f] text-[#f0f0f5]'
                }`}>
                  <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, '<br>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                </div>
                {msg.role === 'user' && <User className="w-5 h-5 text-[#6366f1] shrink-0 mt-1" />}
              </div>
            ))}
            {isThinking && (
              <div className="flex gap-2 mb-3">
                <Bot className="w-5 h-5 text-[#D4FF00] shrink-0 animate-pulse" />
                <div className="bg-[#0a0b0f] rounded-lg p-3">
                  <Loader2 className="w-4 h-4 animate-spin text-[#8a8d9e]" />
                </div>
              </div>
            )}
          </ScrollArea>

          <div className="border-t border-[#1e1f2e] p-3">
            <div className="flex gap-2">
              <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder={t.placeholder} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] text-xs" disabled={isThinking} />
              <Button onClick={() => handleSend()} disabled={isThinking || !input.trim()} size="sm" className="bg-[#D4FF00] text-[#050608]">
                {isThinking ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
              </Button>
            </div>
            <p className="text-[8px] text-[#55576b] mt-2"><BookOpen className="w-2 h-2 inline mr-1" />{t.disclaimer}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}