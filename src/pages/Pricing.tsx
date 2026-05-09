import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Sparkles, Zap, Building2, Crown, ArrowRight, Shield, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const STRIPE_LINKS = {
  starter: 'https://buy.stripe.com/placeholder-starter',
  pro: 'https://buy.stripe.com/placeholder-pro',
  business: 'https://buy.stripe.com/placeholder-business',
  enterprise: 'mailto:enterprise@anthroscope.pro',
};

function PlanCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  link,
  highlight,
  badge,
  icon: Icon,
  delay,
}: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  link: string;
  highlight?: boolean;
  badge?: string;
  icon: React.ElementType;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-500 ${
        highlight
          ? 'border-[#c8ff00]/40 bg-[#c8ff00]/5 scale-105 shadow-[0_0_60px_rgba(200,255,0,0.1)]'
          : 'border-[#2a2d3e]/60 bg-[#1a1c29]/80 hover:border-[#2a2d3e]'
      }`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-[#c8ff00] text-black font-bold px-3 py-1 text-xs">
            {badge}
          </Badge>
        </div>
      )}

      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${highlight ? 'bg-[#c8ff00]/20' : 'bg-[#2a2d3e]'}`}>
            <Icon className={`w-5 h-5 ${highlight ? 'text-[#c8ff00]' : 'text-[#8a8d9e]'}`} />
          </div>
          <h3 className="text-lg font-bold text-[#f0f0f5]">{name}</h3>
        </div>

        <p className="text-sm text-[#8a8d9e] mb-4 min-h-[40px]">{description}</p>

        <div className="mb-6">
          <span className="text-4xl font-bold text-[#f0f0f5]">${price}</span>
          <span className="text-[#8a8d9e] text-sm">/{period}</span>
        </div>

        <a href={link} target="_blank" rel="noopener noreferrer">
          <Button
            className={`w-full mb-6 font-semibold transition-all ${
              highlight
                ? 'bg-[#c8ff00] text-black hover:bg-[#d4ff33]'
                : 'bg-[#2a2d3e] text-[#f0f0f5] hover:bg-[#3a3d4e]'
            }`}
            size="lg"
          >
            {cta} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </a>

        <ul className="space-y-3">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <Check className={`w-4 h-4 mt-0.5 shrink-0 ${highlight ? 'text-[#c8ff00]' : 'text-[#55ff88]'}`} />
              <span className="text-[#b0b3c7]">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PricingPage() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const plans = isEn ? {
    starter: {
      name: 'Starter',
      price: '59',
      period: 'month',
      description: 'For independent nutritionists starting their practice',
      features: [
        '1 nutritionist / coach',
        '100 patients',
        'Full ISAK Level 1-4',
        '355 LATAM foods database',
        '156 sports recipes',
        'PDF & Excel reports',
        'WhatsApp sharing',
        'Basic nutrition panel',
        'Email support',
      ],
      cta: 'Start 7-Day Trial',
      badge: '',
    },
    pro: {
      name: 'Pro',
      price: '99',
      period: 'month',
      description: 'For growing practices with AI-powered nutrition',
      features: [
        '3 nutritionists / coaches',
        '500 patients',
        'Everything in Starter',
        'AI Coach 24/7 (Claude)',
        'AI Meal Plan Generator',
        'AI Progress Analysis',
        'Team dashboard & groups',
        'Genetic potential module',
        'Priority support',
      ],
      cta: 'Start 7-Day Trial',
      badge: 'MOST POPULAR',
    },
    business: {
      name: 'Business',
      price: '299',
      period: 'month',
      description: 'For gyms, clubs & sports organizations',
      features: [
        '10 nutritionists / coaches',
        '2,000 patients',
        'Everything in Pro',
        'White-label branding',
        'Custom domain',
        'API access',
        'Advanced analytics',
        'RED-S & WADA modules',
        'Wearables integration',
        'Dedicated account manager',
      ],
      cta: 'Start 7-Day Trial',
      badge: '',
    },
    enterprise: {
      name: 'Enterprise',
      price: '799',
      period: 'month',
      description: 'For franchises, leagues & universities',
      features: [
        'Unlimited staff',
        'Unlimited patients',
        'Everything in Business',
        'Custom AI training',
        'SSO & advanced security',
        'On-premise option',
        'SLA 99.9% uptime',
        'Phone support 24/7',
        'Quarterly business reviews',
        'Custom feature development',
      ],
      cta: 'Contact Sales',
      badge: '',
    },
  } : {
    starter: {
      name: 'Starter',
      price: '59',
      period: 'mes',
      description: 'Para nutriólogos independientes iniciando su práctica',
      features: [
        '1 nutriólogo / coach',
        '100 pacientes',
        'ISAK Nivel 1-4 completo',
        '355 alimentos LATAM',
        '156 recetas deportivas',
        'Reportes PDF y Excel',
        'Compartir por WhatsApp',
        'Panel de nutrición básico',
        'Soporte por email',
      ],
      cta: 'Iniciar Prueba 7 Días',
      badge: '',
    },
    pro: {
      name: 'Pro',
      price: '99',
      period: 'mes',
      description: 'Para prácticas en crecimiento con nutrición IA',
      features: [
        '3 nutriólogos / coaches',
        '500 pacientes',
        'Todo lo de Starter',
        'AI Coach 24/7 (Claude)',
        'Generador de planes IA',
        'Análisis de progreso IA',
        'Dashboard de equipo y grupos',
        'Módulo de potencial genético',
        'Soporte prioritario',
      ],
      cta: 'Iniciar Prueba 7 Días',
      badge: 'MÁS POPULAR',
    },
    business: {
      name: 'Business',
      price: '299',
      period: 'mes',
      description: 'Para gimnasios, clubes y organizaciones deportivas',
      features: [
        '10 nutriólogos / coaches',
        '2,000 pacientes',
        'Todo lo de Pro',
        'White-label con tu marca',
        'Dominio personalizado',
        'Acceso API',
        'Analíticas avanzadas',
        'Módulos RED-S y WADA',
        'Integración wearables',
        'Gerente de cuenta dedicado',
      ],
      cta: 'Iniciar Prueba 7 Días',
      badge: '',
    },
    enterprise: {
      name: 'Enterprise',
      price: '799',
      period: 'mes',
      description: 'Para franquicias, ligas y universidades',
      features: [
        'Staff ilimitado',
        'Pacientes ilimitados',
        'Todo lo de Business',
        'Entrenamiento IA personalizado',
        'SSO y seguridad avanzada',
        'Opción on-premise',
        'SLA 99.9% uptime',
        'Soporte telefónico 24/7',
        'Revisiones trimestrales',
        'Desarrollo de features custom',
      ],
      cta: 'Contactar Ventas',
      badge: '',
    },
  };

  const competitors = isEn ? [
    { name: 'TrueCoach Pro', price: '$137/mo', clients: '50 clients', has: 'Training only', lacks: 'No ISAK, no LATAM foods' },
    { name: 'TeamBuildr Plat', price: '$233/mo', clients: '1,000 athletes', has: 'Strength only', lacks: 'No nutrition AI' },
    { name: 'My PT Hub Prem', price: '$55/mo', clients: 'Unlimited', has: 'Basic PT', lacks: 'No ISAK, no AI coach' },
    { name: 'ANTHROSCOPE Pro', price: '$99/mo', clients: '500 patients', has: 'ISAK + AI + LATAM + White-label', lacks: 'Nothing — all included' },
  ] : [
    { name: 'TrueCoach Pro', price: '$137/mes', clients: '50 clientes', has: 'Solo entrenamiento', lacks: 'Sin ISAK, sin alimentos LATAM' },
    { name: 'TeamBuildr Plat', price: '$233/mes', clients: '1,000 atletas', has: 'Solo fuerza', lacks: 'Sin nutrición IA' },
    { name: 'My PT Hub Prem', price: '$55/mes', clients: 'Ilimitado', has: 'PT básico', lacks: 'Sin ISAK, sin AI coach' },
    { name: 'ANTHROSCOPE Pro', price: '$99/mes', clients: '500 pacientes', has: 'ISAK + IA + LATAM + White-label', lacks: 'Nada — todo incluido' },
  ];

  return (
    <div className="min-h-screen bg-[#0d0e14] text-[#f0f0f5]">
      {/* Hero */}
      <div className="relative overflow-hidden pt-20 pb-12 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#c8ff0015_0%,_transparent_60%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="bg-[#c8ff00]/20 text-[#c8ff00] border-[#c8ff00]/30 mb-4">
            <Sparkles className="w-3 h-3 mr-1" /> {isEn ? 'Pricing' : 'Precios'}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            {isEn ? 'One platform.' : 'Una plataforma.'}
            <br />
            <span className="text-[#c8ff00]">{isEn ? 'Every tool.' : 'Todas las herramientas.'}</span>
          </h1>
          <p className="text-lg text-[#8a8d9e] max-w-2xl mx-auto">
            {isEn
              ? 'From ISAK anthropometry to AI nutrition coaching. Everything your athletes need, in one place.'
              : 'Desde antropometría ISAK hasta coaching de nutrición con IA. Todo lo que tus atletas necesitan, en un solo lugar.'}
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <PlanCard
            name={plans.starter.name}
            price={plans.starter.price}
            period={plans.starter.period}
            description={plans.starter.description}
            features={plans.starter.features}
            cta={plans.starter.cta}
            link={STRIPE_LINKS.starter}
            icon={Zap}
            delay={0}
          />
          <PlanCard
            name={plans.pro.name}
            price={plans.pro.price}
            period={plans.pro.period}
            description={plans.pro.description}
            features={plans.pro.features}
            cta={plans.pro.cta}
            link={STRIPE_LINKS.pro}
            icon={Sparkles}
            highlight
            badge={plans.pro.badge}
            delay={100}
          />
          <PlanCard
            name={plans.business.name}
            price={plans.business.price}
            period={plans.business.period}
            description={plans.business.description}
            features={plans.business.features}
            cta={plans.business.cta}
            link={STRIPE_LINKS.business}
            icon={Building2}
            delay={200}
          />
          <PlanCard
            name={plans.enterprise.name}
            price={plans.enterprise.price}
            period={plans.enterprise.period}
            description={plans.enterprise.description}
            features={plans.enterprise.features}
            cta={plans.enterprise.cta}
            link={STRIPE_LINKS.enterprise}
            icon={Crown}
            delay={300}
          />
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-[#11121a] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {isEn ? 'Why ANTHROSCOPE beats everything else' : 'Por qué ANTHROSCOPE supera a todos'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a2d3e]">
                  <th className="text-left py-3 px-4 text-[#8a8d9e] font-medium">{isEn ? 'Platform' : 'Plataforma'}</th>
                  <th className="text-center py-3 px-4 text-[#8a8d9e] font-medium">{isEn ? 'Price' : 'Precio'}</th>
                  <th className="text-center py-3 px-4 text-[#8a8d9e] font-medium">{isEn ? 'Capacity' : 'Capacidad'}</th>
                  <th className="text-center py-3 px-4 text-[#8a8d9e] font-medium">{isEn ? 'What they have' : 'Lo que tienen'}</th>
                  <th className="text-center py-3 px-4 text-[#8a8d9e] font-medium text-red-400">{isEn ? 'What they LACK' : 'Lo que LES FALTA'}</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c, i) => (
                  <tr key={i} className={`border-b border-[#1e2030] ${c.name.includes('ANTHROSCOPE') ? 'bg-[#c8ff00]/5' : ''}`}>
                    <td className="py-3 px-4 font-semibold">{c.name}</td>
                    <td className="py-3 px-4 text-center">{c.price}</td>
                    <td className="py-3 px-4 text-center">{c.clients}</td>
                    <td className="py-3 px-4 text-center text-[#55ff88]">{c.has}</td>
                    <td className="py-3 px-4 text-center text-red-400">{c.lacks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 text-[#8a8d9e] text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#c8ff00]" />
            {isEn ? 'SSL Encrypted' : 'SSL Encriptado'}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#c8ff00]" />
            {isEn ? '7-Day Free Trial' : 'Prueba 7 Días Gratis'}
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#c8ff00]" />
            {isEn ? 'ES / EN / PT' : 'ES / EN / PT'}
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#c8ff00]" />
            {isEn ? 'Cancel anytime' : 'Cancela cuando quieras'}
          </div>
        </div>
      </div>
    </div>
  );
}
