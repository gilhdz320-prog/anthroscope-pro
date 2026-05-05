import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  Activity, Scale, Target, Dna, Zap, TrendingUp, Shield, Layers,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ResultadoISAK } from '@/types/isak';

export function ResultadosDashboard({ resultado }: { resultado: ResultadoISAK }) {
  const { t } = useTranslation();
  const { somatotipo, cincoComponentes, clasicos, phantom, imc, indicePonderal, suma6Pliegues, suma8Pliegues, siriPorcentajeGrasa, masaGrasaSiri, masaLibreGrasa } = resultado;

  const composicionData = cincoComponentes ? [
    { name: t('resultados.masaAdiposa'), value: Math.round(cincoComponentes.porcentajeAdiposo * 10) / 10, color: '#f59e0b' },
    { name: t('resultados.masaMuscular'), value: Math.round(cincoComponentes.porcentajeMuscular * 10) / 10, color: '#3b82f6' },
    { name: t('resultados.masaOsea'), value: Math.round(cincoComponentes.porcentajeOseo * 10) / 10, color: '#8b5cf6' },
    { name: t('resultados.masaPiel'), value: Math.round(cincoComponentes.porcentajePiel * 10) / 10, color: '#10b981' },
    { name: t('resultados.masaResidual'), value: Math.round(cincoComponentes.porcentajeResidual * 10) / 10, color: '#64748b' },
  ] : [];

  const phantomData = phantom?.proporcionalidad.slice(0, 8).map(p => ({ name: p.variable, zScore: p.zScore })) || [];

  return (
    <div className="space-y-6">
      {/* RESUMEN EJECUTIVO */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg"><Scale className="w-5 h-5 text-emerald-700" /></div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">{t('resultados.imc')}</p>
                <p className="text-2xl font-bold text-emerald-800">{imc}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-lg"><Target className="w-5 h-5 text-amber-700" /></div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">{t('resultados.grasaSiri')}</p>
                <p className="text-2xl font-bold text-amber-800">{siriPorcentajeGrasa}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg"><Dna className="w-5 h-5 text-blue-700" /></div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">{t('resultados.somatotipo')}</p>
                <p className="text-lg font-bold text-blue-800">{somatotipo?.categoria}</p>
                <p className="text-xs text-slate-500">E{somatotipo?.endomorfia}-M{somatotipo?.mesomorfia}-Ec{somatotipo?.ectomorfia}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg"><TrendingUp className="w-5 h-5 text-purple-700" /></div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-semibold">{t('resultados.indicePonderal')}</p>
                <p className="text-2xl font-bold text-purple-800">{indicePonderal}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SOMATOTIPO + 5 COMPONENTES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Dna className="w-5 h-5 text-blue-600" />
              {t('resultados.somatotipo')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {somatotipo && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <p className="text-xs text-amber-700 font-semibold">{t('resultados.endomorfia')}</p>
                    <p className="text-xl font-bold text-amber-800">{somatotipo.endomorfia}</p>
                    <p className="text-[10px] text-slate-500">{t('resultados.adiposidadRelativa')}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-700 font-semibold">{t('resultados.mesomorfia')}</p>
                    <p className="text-xl font-bold text-blue-800">{somatotipo.mesomorfia}</p>
                    <p className="text-[10px] text-slate-500">{t('resultados.robustezMuscular')}</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg">
                    <p className="text-xs text-emerald-700 font-semibold">{t('resultados.ectomorfia')}</p>
                    <p className="text-xl font-bold text-emerald-800">{somatotipo.ectomorfia}</p>
                    <p className="text-[10px] text-slate-500">{t('resultados.linealidad')}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Layers className="w-5 h-5 text-purple-600" />
              {t('resultados.componentes5')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cincoComponentes ? (
              <div className="space-y-4">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={composicionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}
                        dataKey="value" label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}>
                        {composicionData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {composicionData.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm w-24">{item.name}</span>
                      <Progress value={item.value} max={60} className="flex-1 h-2" />
                      <span className="text-sm font-mono w-16 text-right">{item.value.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-2 bg-slate-50 rounded text-center">
                    <p className="text-xs text-slate-500">{t('resultados.indiceMusculoOseo')}</p>
                    <p className="text-lg font-bold text-slate-800">{cincoComponentes.indiceMusculoOseo.toFixed(2)}</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded text-center">
                    <p className="text-xs text-slate-500">{t('resultados.masaMuscular')}</p>
                    <p className="text-lg font-bold text-slate-800">{cincoComponentes.masaMuscular.toFixed(1)} kg</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Layers className="w-10 h-10 mx-auto mb-2" />
                <p>{t('common.requierePerfilCompleto')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* PLIEGUES + FÓRMULAS CLÁSICAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="w-5 h-5 text-amber-600" />
              {t('resultados.formulasClasicas')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">{t('resultados.suma6')}</p>
                <p className="text-xl font-bold">{suma6Pliegues} mm</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">{t('resultados.suma8')}</p>
                <p className="text-xl font-bold">{suma8Pliegues} mm</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">{t('resultados.masaGrasa')}</p>
                <p className="text-xl font-bold">{masaGrasaSiri} kg</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">{t('resultados.masaLibreGrasa')}</p>
                <p className="text-xl font-bold">{masaLibreGrasa} kg</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">{t('resultados.formulasClasicas')}</h4>
              {clasicos?.carterPorcentajeGrasa !== undefined && (
                <div className="flex justify-between items-center p-2 bg-amber-50 rounded">
                  <span className="text-sm">{t('resultados.carter')}</span>
                  <Badge variant="secondary">{clasicos.carterPorcentajeGrasa.toFixed(2)}%</Badge>
                </div>
              )}
              {clasicos?.faulknerPorcentajeGrasa !== undefined && (
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                  <span className="text-sm">{t('resultados.faulkner')}</span>
                  <Badge variant="secondary">{clasicos.faulknerPorcentajeGrasa.toFixed(2)}%</Badge>
                </div>
              )}
              {clasicos?.yuhaszPorcentajeGrasa !== undefined && (
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                  <span className="text-sm">{t('resultados.yuhasz')}</span>
                  <Badge variant="secondary">{clasicos.yuhaszPorcentajeGrasa.toFixed(2)}%</Badge>
                </div>
              )}
              {clasicos?.durninWomersleyPorcentajeGrasa !== undefined && (
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                  <span className="text-sm">{t('resultados.durninWomersley')}</span>
                  <Badge variant="secondary">{clasicos.durninWomersleyPorcentajeGrasa.toFixed(2)}%</Badge>
                </div>
              )}
              {clasicos?.leeMasaMuscular !== undefined && (
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-sm">{t('resultados.lee')}</span>
                  <Badge variant="secondary">{clasicos.leeMasaMuscular.toFixed(2)} kg</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="w-5 h-5 text-indigo-600" />
              {t('resultados.phantom')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {phantom && phantom.proporcionalidad.length > 0 ? (
              <div className="space-y-4">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={phantomData} layout="vertical" margin={{ left: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[-3, 3]} />
                      <YAxis dataKey="name" type="category" width={80} style={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="zScore" fill="#6366f1" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {phantom.proporcionalidad.map((p) => (
                    <div key={p.variable} className="flex justify-between items-center text-sm p-1 hover:bg-slate-50 rounded">
                      <span className="text-slate-600">{p.variable}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs">z={p.zScore.toFixed(2)}</span>
                        <Badge variant={Math.abs(p.zScore) <= 1 ? 'default' : Math.abs(p.zScore) <= 2 ? 'secondary' : 'destructive'} className="text-[10px]">
                          {p.interpretacion}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Shield className="w-10 h-10 mx-auto mb-2" />
                <p>{t('common.requierePerfilCompleto')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* MASAS ABSOLUTAS */}
      {cincoComponentes && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="w-5 h-5 text-slate-600" />
              {t('resultados.masasAbsolutas')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: t('resultados.masaAdiposa'), value: cincoComponentes.masaAdiposa, color: 'bg-amber-100 text-amber-800', icon: Target },
                { label: t('resultados.masaMuscular'), value: cincoComponentes.masaMuscular, color: 'bg-blue-100 text-blue-800', icon: Zap },
                { label: t('resultados.masaOsea'), value: cincoComponentes.masaOsea, color: 'bg-purple-100 text-purple-800', icon: Activity },
                { label: t('resultados.masaPiel'), value: cincoComponentes.masaPiel, color: 'bg-emerald-100 text-emerald-800', icon: Layers },
                { label: t('resultados.masaResidual'), value: cincoComponentes.masaResidual, color: 'bg-slate-100 text-slate-800', icon: Activity },
              ].map((item) => (
                <div key={item.label} className={`p-4 rounded-lg ${item.color} text-center`}>
                  <item.icon className="w-5 h-5 mx-auto mb-2 opacity-70" />
                  <p className="text-xs opacity-70">{item.label}</p>
                  <p className="text-xl font-bold">{item.value.toFixed(1)} <span className="text-sm">kg</span></p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
