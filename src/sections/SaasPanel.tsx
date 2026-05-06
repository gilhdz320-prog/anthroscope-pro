import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, CreditCard, Globe, Zap, Shield, Users, Building2, TrendingUp, BookOpen, Lock, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { trpc } from '@/providers/trpc';
import { useAuth } from '@/hooks/useAuth';

export function SaasPanel() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { data: plans, isLoading } = trpc.subscription.listPlans.useQuery();
  const { data: status } = trpc.subscription.checkActive.useQuery(
    { userId: user?.id ?? 0 },
    { enabled: !!user?.id }
  );
  const createCheckout = trpc.stripe.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url;
    },
  });

  const formatPrice = (price: string, period: string) => {
    return `$${price} USD${period === 'mes' ? '/mes' : '/año'}`;
  };

  const featuresIndividual = [
    'Perfil Restringido y Completo ISAK',
    'Modelo de 5 Componentes (Ross & Kerr)',
    'Somatotipo Heath-Carter + Somatocarta',
    'Avatar 3D de composicion corporal',
    'Phantom Stratagem (Z-scores)',
    'ETM intra-evaluador automatico',
    'Reportes PDF firmados Nivel 4',
    'Historial de evaluaciones',
    'Exportacion JSON / Excel',
  ];

  const featuresInstitucion = [
    ...featuresIndividual,
    t('saas.evaluadoresIlimitados'),
    t('saas.whiteLabel'),
    t('saas.apiAccess'),
    t('saas.soportePrioritario'),
    t('saas.certificacionIncluida'),
    'Panel administrativo de evaluadores',
    'Base de datos centralizada',
    'Analisis poblacional y normativos',
  ];

  const getFeatures = (plan: typeof plans extends (infer T)[] ? T : never) => {
    if (!plan) return featuresIndividual;
    return plan.incluyeWhiteLabel === 'si' ? featuresInstitucion : featuresIndividual;
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="text-center space-y-4 py-8">
        <h2 className="text-3xl font-bold">ANTHROSCOPE<span className="text-emerald-500"> PRO</span> — {t('saas.titulo')}</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">{t('saas.descripcion')}</p>
        <Badge className="bg-emerald-500 text-white">Compatible con protocolos ISAK Nivel 1-4</Badge>
        
        {status && (
          <div className="mt-4">
            {status.hasActive ? (
              <Badge className="bg-emerald-600 text-white text-sm px-4 py-1">
                {status.plan?.nombre} — {status.daysLeft} days left
              </Badge>
            ) : status.isTrial ? (
              <Badge className="bg-amber-500 text-white text-sm px-4 py-1">
                Trial — {status.trialDaysLeft} days left
              </Badge>
            ) : (
              <Badge className="bg-slate-500 text-white text-sm px-4 py-1">
                No active subscription
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* PLANS */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans?.map((plan, idx) => {
            const isPopular = plan.codigo === 'individual';
            const isInstitution = plan.codigo === 'institucional';
            const features = getFeatures(plan);
            
            return (
              <Card key={plan.id} className={`relative overflow-hidden border-2 transition-all ${
                isPopular ? 'border-emerald-500 shadow-lg' : 
                isInstitution ? 'border-indigo-200 bg-gradient-to-b from-indigo-50 to-white' : 
                'hover:border-emerald-300'
              }`}>
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs px-3 py-1 rounded-bl-lg font-semibold">
                    BEST VALUE
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {isInstitution ? <Building2 className="w-5 h-5 text-indigo-500" /> : 
                     isPopular ? <TrendingUp className="w-5 h-5 text-emerald-500" /> : 
                     <Zap className="w-5 h-5 text-amber-500" />}
                    {plan.nombre}
                  </CardTitle>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-slate-900">
                      {formatPrice(plan.precioMensual, 'mes')}
                    </p>
                    <p className="text-sm text-emerald-600 font-medium">
                      {formatPrice(plan.precioAnual, 'ano')} (save 17%)
                    </p>
                  </div>
                  <p className="text-xs text-slate-500">
                    {plan.maxEvaluadores === 1 ? t('saas.caracteristicasEvaluador') : 
                     plan.maxEvaluadores === 0 ? t('saas.caracteristicasInstitucion') :
                     `Up to ${plan.maxEvaluadores} evaluators`}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isInstitution ? 'text-indigo-500' : 'text-emerald-500'}`} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 ${
                      isInstitution ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                    disabled={!user || createCheckout.isPending}
                    onClick={() => {
                      if (!user) {
                        window.location.href = '/login';
                        return;
                      }
                      createCheckout.mutate({
                        planId: plan.id,
                        userId: user.id,
                        periodo: 'mensual',
                        successUrl: `${window.location.origin}/?paid=success`,
                        cancelUrl: `${window.location.origin}/?paid=cancel`,
                      });
                    }}
                  >
                    <CreditCard className="w-4 h-4 mr-2" /> 
                    {!user ? 'Inicia Sesion para Suscribirte' : isInstitution ? 'Contactar Ventas' : 'Suscribirse'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Separator />

      {/* FAQ MONETIZACION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="w-5 h-5 text-slate-600" />
              {t('saas.compararConExcel')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-sm leading-relaxed">{t('saas.respuestaExcel')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="w-5 h-5 text-slate-600" />
              {t('saas.comoVender')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <p className="font-semibold text-emerald-800 text-sm">1. SaaS Mensual/Anual</p>
              <p className="text-xs text-slate-600">{t('saas.modeloSaaS')}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-800 text-sm">2. Licencia Perpetua</p>
              <p className="text-xs text-slate-600">{t('saas.modeloLicencia')}</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <p className="font-semibold text-amber-800 text-sm">3. Comision / Revenue Share</p>
              <p className="text-xs text-slate-600">{t('saas.modeloComision')}</p>
            </div>
            <Separator />
            <p className="text-sm font-medium text-slate-800">{t('saas.recomendacion')}</p>
          </CardContent>
        </Card>
      </div>

      {/* GLOBAL / ISAK */}
      <Card className="bg-slate-900 text-white">
        <CardContent className="p-8 text-center">
          <Globe className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
          <h3 className="text-2xl font-bold mb-2">Listo para escalar ANTHROSCOPE PRO?</h3>
          <p className="text-slate-400 max-w-xl mx-auto mb-6">
            Este sistema ya incluye: modelo de 5 componentes validado por diseccion cadaverica, 
            ETM automatizado con estandares internacionales, somatocarta profesional, avatar 3D anatomico, 
            reportes firmados Nivel 4, y soporte multilingue. Es un producto listo para licencia 
            institucional o SaaS global.
          </p>
          <div className="flex justify-center gap-3">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <Shield className="w-4 h-4 mr-2" /> Probar Demo Nivel 4
            </Button>
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
              <Users className="w-4 h-4 mr-2" /> Contactar Ventas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
