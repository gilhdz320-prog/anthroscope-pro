import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, CreditCard, Globe, Zap, Shield, Users, Building2, TrendingUp, BookOpen, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function SaasPanel() {
  const { t } = useTranslation();

  const featuresIndividual = [
    'Perfil Restringido y Completo ISAK',
    'Modelo de 5 Componentes (Ross & Kerr)',
    'Somatotipo Heath-Carter + Somatocarta',
    'Avatar 3D de composición corporal',
    'Phantom Stratagem (Z-scores)',
    'ETM intra-evaluador automático',
    'Reportes PDF firmados Nivel 4',
    'Historial de evaluaciones',
    'Exportación JSON / Excel',
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
    'Análisis poblacional y normativos',
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="text-center space-y-4 py-8">
        <h2 className="text-3xl font-bold">{t('saas.titulo')}</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">{t('saas.descripcion')}</p>
        <Badge className="bg-emerald-500 text-white">{t('saas.yaListo')}</Badge>
      </div>

      {/* PLANS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* MENSUAL */}
        <Card className="relative overflow-hidden border-2 hover:border-emerald-300 transition-all">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-amber-500" />
              {t('saas.planMensual')}
            </CardTitle>
            <p className="text-3xl font-bold text-slate-900">{t('saas.precioMensual')}</p>
            <p className="text-xs text-slate-500">{t('saas.caracteristicasEvaluador')}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {featuresIndividual.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">
              <CreditCard className="w-4 h-4 mr-2" /> Suscribirse
            </Button>
          </CardContent>
        </Card>

        {/* ANUAL */}
        <Card className="relative overflow-hidden border-2 border-emerald-500 shadow-lg">
          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs px-3 py-1 rounded-bl-lg font-semibold">
            BEST VALUE
          </div>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              {t('saas.planAnual')}
            </CardTitle>
            <p className="text-3xl font-bold text-emerald-700">{t('saas.precioAnual')}</p>
            <p className="text-xs text-slate-500">{t('saas.caracteristicasEvaluador')}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {featuresIndividual.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700">
              <CreditCard className="w-4 h-4 mr-2" /> Suscribirse Anual
            </Button>
          </CardContent>
        </Card>

        {/* INSTITUCIONAL */}
        <Card className="relative overflow-hidden border-2 border-indigo-200 hover:border-indigo-400 transition-all bg-gradient-to-b from-indigo-50 to-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="w-5 h-5 text-indigo-500" />
              {t('saas.planInstitucional')}
            </CardTitle>
            <p className="text-3xl font-bold text-indigo-700">{t('saas.precioInstitucional')}</p>
            <p className="text-xs text-slate-500">{t('saas.caracteristicasInstitucion')}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {featuresInstitucion.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700">
              <Users className="w-4 h-4 mr-2" /> Contactar Ventas
            </Button>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* FAQ MONETIZACIÓN */}
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
              <p className="font-semibold text-amber-800 text-sm">3. Comisión / Revenue Share</p>
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
          <h3 className="text-2xl font-bold mb-2">¿Listo para ofrecerlo al ISAK?</h3>
          <p className="text-slate-400 max-w-xl mx-auto mb-6">
            Este sistema ya incluye: modelo de 5 componentes validado por disección cadavérica, 
            ETM automatizado con estándares ISAK, somatocarta profesional, avatar 3D paramétrico, 
            reportes firmados Nivel 4, y soporte multilingüe. Es un producto listo para licencia 
            institucional o SaaS global.
          </p>
          <div className="flex justify-center gap-3">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <Shield className="w-4 h-4 mr-2" /> Probar Demo Nivel 4
            </Button>
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
              <Users className="w-4 h-4 mr-2" /> Contactar ISAK Global
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
