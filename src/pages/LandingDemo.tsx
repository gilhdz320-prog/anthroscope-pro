import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Users, Brain, Utensils, Activity, ShieldCheck, Globe, Zap } from 'lucide-react';

export function LandingDemo() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const stats = isEn ? [
    { value: '43', label: 'ISAK Measurements' },
    { value: '355', label: 'LATAM Foods' },
    { value: '156', label: 'Sport Recipes' },
    { value: '24/7', label: 'AI Coach' },
  ] : [
    { value: '43', label: 'Mediciones ISAK' },
    { value: '355', label: 'Alimentos LATAM' },
    { value: '156', label: 'Recetas Deportivas' },
    { value: '24/7', label: 'Coach IA' },
  ];

  const features = isEn ? [
    { icon: Activity, title: 'ISAK Nivel 1-4', desc: '43 anthropometric measurements with automatic calculations: Siri, Somatotype, 5-component model, Phantom, classical equations.' },
    { icon: Utensils, title: 'LATAM Food Database', desc: '355 foods from 17 countries with Mexican Equivalent System, glycemic index, macros per portion.' },
    { icon: Brain, title: 'AI Nutrition Coach', desc: 'Claude-powered 24/7 coach answers evidence-based questions. Generates personalized meal plans from ISAK data.' },
    { icon: Users, title: 'Team Dashboard', desc: 'Manage groups of athletes. Track longitudinal progress. Compare against olympic references and genetic potential.' },
    { icon: ShieldCheck, title: 'RED-S & WADA', desc: 'Female athlete triad screening. Supplement contamination checker against WADA prohibited list.' },
    { icon: Globe, title: 'White-Label Ready', desc: 'Business and Enterprise plans include custom branding, domain, and API access for your organization.' },
  ] : [
    { icon: Activity, title: 'ISAK Nivel 1-4', desc: '43 mediciones antropométricas con cálculos automáticos: Siri, Somatotipo, modelo 5 componentes, Phantom, ecuaciones clásicas.' },
    { icon: Utensils, title: 'Base LATAM de Alimentos', desc: '355 alimentos de 17 países con Sistema de Equivalentes Mexicano, índice glucémico, macros por porción.' },
    { icon: Brain, title: 'Coach IA Nutrición', desc: 'Coach 24/7 potenciado por Claude responde preguntas basadas en evidencia. Genera planes personalizados desde datos ISAK.' },
    { icon: Users, title: 'Dashboard de Equipo', desc: 'Gestiona grupos de atletas. Tracking longitudinal. Compara contra referencias olímpicas y potencial genético.' },
    { icon: ShieldCheck, title: 'RED-S & WADA', desc: 'Screening de tríada de la deportista. Verificador de contaminación de suplementos contra lista WADA.' },
    { icon: Globe, title: 'White-Label Ready', desc: 'Planes Business y Enterprise incluyen branding personalizado, dominio propio y acceso API para tu organización.' },
  ];

  return (
    <div className="min-h-screen bg-[#0d0e14] text-[#f0f0f5]">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#c8ff0020_0%,_transparent_60%)]" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#c8ff00]/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src="/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-6xl mx-auto px-4 pt-20 pb-16 relative z-10">
          <div className="text-center">
            <Badge className="bg-[#c8ff00]/20 text-[#c8ff00] border-[#c8ff00]/30 mb-6 px-4 py-1">
              <Zap className="w-3 h-3 mr-1" />
              {isEn ? 'Now with AI Coach 24/7' : 'Ahora con Coach IA 24/7'}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
              {isEn ? 'The complete' : 'La plataforma'}
              <br />
              <span className="text-[#c8ff00]">{isEn ? 'kinanthropometric' : 'cinoantropométrica'}
              </span>{isEn ? ' platform' : ' completa'}
            </h1>
            <p className="text-xl text-[#8a8d9e] max-w-2xl mx-auto mb-8">
              {isEn
                ? 'ISAK anthropometry + Sports nutrition AI + Team management. All in one. For professionals who demand precision.'
                : 'Antropometría ISAK + Nutrición deportiva IA + Gestión de equipos. Todo en uno. Para profesionales que exigen precisión.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#c8ff00] text-black font-bold px-8 hover:bg-[#d4ff33]"
                onClick={() => navigate('/pricing')}
              >
                {isEn ? 'Start 7-Day Free Trial' : 'Iniciar Prueba 7 Días Gratis'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#2a2d3e] text-[#f0f0f5] hover:bg-[#1a1c29] px-8"
                onClick={() => navigate('/app')}
              >
                <Play className="w-4 h-4 mr-2" />
                {isEn ? 'Open Demo' : 'Abrir Demo'}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((s, i) => (
              <div key={i} className="text-center p-4 rounded-xl bg-[#11121a] border border-[#2a2d3e]/50">
                <div className="text-3xl md:text-4xl font-black text-[#c8ff00] mb-1">{s.value}</div>
                <div className="text-xs text-[#8a8d9e] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 px-4 bg-[#11121a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {isEn ? 'Everything you need.' : 'Todo lo que necesitas.'}
            <span className="text-[#c8ff00]">{isEn ? ' Nothing you don\'t.' : ' Nada de más.'}</span>
          </h2>
          <p className="text-center text-[#8a8d9e] mb-12 max-w-xl mx-auto">
            {isEn
              ? 'Why pay for 5 separate tools when one does it all?'
              : '¿Por qué pagar 5 herramientas separadas cuando una lo hace todo?'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-xl bg-[#1a1c29] border border-[#2a2d3e]/50 hover:border-[#c8ff00]/30 transition-all group">
                <div className="p-3 rounded-lg bg-[#2a2d3e] w-fit mb-4 group-hover:bg-[#c8ff00]/20">
                  <f.icon className="w-5 h-5 text-[#c8ff00]" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-[#8a8d9e] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            {isEn ? 'Ready to transform' : '¿Listo para transformar'}
            <br />
            <span className="text-[#c8ff00]">{isEn ? 'your practice?' : 'tu práctica?'}</span>
          </h2>
          <p className="text-lg text-[#8a8d9e] mb-8">
            {isEn
              ? 'Join nutritionists, coaches, and sports organizations already using ANTHROSCOPE PRO.'
              : 'Únete a nutriólogos, coaches y organizaciones deportivas que ya usan ANTHROSCOPE PRO.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#c8ff00] text-black font-bold px-10 hover:bg-[#d4ff33]"
              onClick={() => navigate('/pricing')}
            >
              {isEn ? 'Get Started Free' : 'Empezar Gratis'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#2a2d3e] text-[#f0f0f5] hover:bg-[#1a1c29] px-10"
              onClick={() => window.open('mailto:enterprise@anthroscope.pro', '_blank')}
            >
              {isEn ? 'Contact Sales' : 'Contactar Ventas'}
            </Button>
          </div>
          <p className="text-xs text-[#55576b] mt-6">
            {isEn ? 'No credit card required for trial. Cancel anytime.' : 'Sin tarjeta de crédito para la prueba. Cancela cuando quieras.'}
          </p>
        </div>
      </div>
    </div>
  );
}
