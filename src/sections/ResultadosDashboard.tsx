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
    { name: t('resultados.masaMuscular'), value: Math.round(cincoComponentes.porcentajeMuscular * 10) / 10, color: '#6366f1' },
    { name: t('resultados.masaOsea'), value: Math.round(cincoComponentes.porcentajeOseo * 10) / 10, color: '#a78bfa' },
    { name: t('resultados.masaPiel'), value: Math.round(cincoComponentes.porcentajePiel * 10) / 10, color: '#22c55e' },
    { name: t('resultados.masaResidual'), value: Math.round(cincoComponentes.porcentajeResidual * 10) / 10, color: '#64748b' },
  ] : [];

  const phantomData = phantom?.proporcionalidad.slice(0, 8).map(p => ({ name: p.variable, zScore: p.zScore })) || [];

  return (
    <div className="space-y-6">
      {/* RESUMEN EJECUTIVO */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#D4FF00]/10 p-2 rounded-lg"><Scale className="w-5 h-5 text-[#D4FF00]" /></div>
              <div>
                <p className="text-xs text-[#8a8d9e] uppercase font-semibold">{t('resultados.imc')}</p>
                <p className="text-2xl font-bold text-[#f0f0f5]">{imc}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#f59e0b]/10 p-2 rounded-lg"><Target className="w-5 h-5 text-[#f59e0b]" /></div>
              <div>
                <p className="text-xs text-[#8a8d9e] uppercase font-semibold">{t('resultados.grasaSiri')}</p>
                <p className="text-2xl font-bold text-[#f0f0f5]">{siriPorcentajeGrasa}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#6366f1]/10 p-2 rounded-lg"><Dna className="w-5 h-5 text-[#6366f1]" /></div>
              <div>
                <p className="text-xs text-[#8a8d9e] uppercase font-semibold">{t('resultados.somatotipo')}</p>
                <p className="text-lg font-bold text-[#f0f0f5]">{somatotipo?.categoria}</p>
                <p className="text-xs text-[#55576b]">E{somatotipo?.endomorfia}-M{somatotipo?.mesomorfia}-Ec{somatotipo?.ectomorfia}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#a78bfa]/10 p-2 rounded-lg"><TrendingUp className="w-5 h-5 text-[#a78bfa]" /></div>
              <div>
                <p className="text-xs text-[#8a8d9e] uppercase font-semibold">{t('resultados.indicePonderal')}</p>
                <p className="text-2xl font-bold text-[#f0f0f5]">{indicePonderal}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SOMATOTIPO + 5 COMPONENTES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-[#f0f0f5]">
              <Dna className="w-5 h-5 text-[#D4FF00]" />
              {t('resultados.somatotipo')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {somatotipo && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-[#f59e0b]/10 rounded-lg border border-[#f59e0b]/20">
                    <p className="text-xs text-[#f59e0b] font-semibold">{t('resultados.endomorfia')}</p>
                    <p className="text-xl font-bold text-[#f0f0f5]">{somatotipo.endomorfia}</p>
                    <p className="text-[10px] text-[#55576b]">{t('resultados.adiposidadRelativa')}</p>
                  </div>
                  <div className="p-3 bg-[#6366f1]/10 rounded-lg border border-[#6366f1]/20">
                    <p className="text-xs text-[#6366f1] font-semibold">{t('resultados.mesomorfia')}</p>
                    <p className="text-xl font-bold text-[#f0f0f5]">{somatotipo.mesomorfia}</p>
                    <p className="text-[10px] text-[#55576b]">{t('resultados.robustezMuscular')}</p>
                  </div>
                  <div className="p-3 bg-[#22c55e]/10 rounded-lg border border-[#22c55e]/20">
                    <p className="text-xs text-[#22c55e] font-semibold">{t('resultados.ectomorfia')}</p>
                    <p className="text-xl font-bold text-[#f0f0f5]">{somatotipo.ectomorfia}</p>
                    <p className="text-[10px] text-[#55576b]">{t('resultados.linealidad')}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-[#f0f0f5]">
              <Layers className="w-5 h-5 text-[#D4FF00]" />
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
                      <Tooltip contentStyle={{ background: '#11121a', border: '1px solid #1e1f2e', borderRadius: '8px', color: '#f0f0f5' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {composicionData.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm w-24 text-[#8a8d9e]">{item.name}</span>
                      <Progress value={item.value} max={60} className="flex-1 h-2" />
                      <span className="text-sm font-mono w-16 text-right text-[#f0f0f5]">{item.value.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-2 bg-[#0a0b0f] rounded text-center border border-[#1e1f2e]">
                    <p className="text-xs text-[#8a8d9e]">{t('resultados.indiceMusculoOseo')}</p>
                    <p className="text-lg font-bold text-[#f0f0f5]">{cincoComponentes.indiceMusculoOseo.toFixed(2)}</p>
                  </div>
                  <div className="p-2 bg-[#0a0b0f] rounded text-center border border-[#1e1f2e]">
                    <p className="text-xs text-[#8a8d9e]">{t('resultados.masaMuscular')}</p>
                    <p className="text-lg font-bold text-[#f0f0f5]">{cincoComponentes.masaMuscular.toFixed(1)} kg</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[#55576b]">
                <Layers className="w-10 h-10 mx-auto mb-2" />
                <p>{t('common.requierePerfilCompleto')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* PLIEGUES + FÓRMULAS CLÁSICAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-[#f0f0f5]">
              <Activity className="w-5 h-5 text-[#f59e0b]" />
              {t('resultados.formulasClasicas')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                <p className="text-xs text-[#8a8d9e]">{t('resultados.suma6')}</p>
                <p className="text-xl font-bold text-[#f0f0f5]">{suma6Pliegues} mm</p>
              </div>
              <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                <p className="text-xs text-[#8a8d9e]">{t('resultados.suma8')}</p>
                <p className="text-xl font-bold text-[#f0f0f5]">{suma8Pliegues} mm</p>
              </div>
              <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                <p className="text-xs text-[#8a8d9e]">{t('resultados.masaGrasa')}</p>
                <p className="text-xl font-bold text-[#f0f0f5]">{masaGrasaSiri} kg</p>
              </div>
              <div className="p-3 bg-[#0a0b0f] rounded-lg border border-[#1e1f2e]">
                <p className="text-xs text-[#8a8d9e]">{t('resultados.masaLibreGrasa')}</p>
                <p className="text-xl font-bold text-[#f0f0f5]">{masaLibreGrasa} kg</p>
              </div>
            </div>
            <Separator className="bg-[#1e1f2e]" />
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-[#f0f0f5]">{t('resultados.formulasClasicas')}</h4>
              {clasicos?.carterPorcentajeGrasa !== undefined && (
                <div className="flex justify-between items-center p-2 bg-[#0a0b0f] rounded border border-[#1e1f2e]">
                  <span className="text-sm text-[#8a8d9e]">{t('resultados.carter')}</span>
                  <Badge variant="secondary" className="bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20">{clasicos.carterPorcentajeGrasa.toFixed(2)}%</Badge>
                </div>
              )}
              {clasicos?.faulknerPorcentajeGrasa !== undefined && (
                <div className="flex justify-between items-center p-2 bg-[#0a0b0f] rounded border border-[#1e1f2e]">
                  <span className="text-sm text-[#8a8d9e]">{t('resultados.faulkner')}</span>
                  <Badge variant="secondary" className="bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/20">{clasicos.faulknerPorcentajeGrasa.toFixed(2)}%</Badge>
                </div>
              )}
              {clasicos?.yuhaszPorcentajeGrasa !== undefined && (
                <div className="flex justify-between items-center p-2 bg-[#0a0b0f] rounded border border-[#1e1f2e]">
                  <span className="text-sm text-[#8a8d9e]">{t('resultados.yuhasz')}</span>
                  <Badge variant="secondary" className="bg-[#a78bfa]/10 text-[#a78bfa] border-[#a78bfa]/20">{clasicos.yuhaszPorcentajeGrasa.toFixed(2)}%</Badge>
                </div>
              )}
              {clasicos?.durninWomersleyPorcentajeGrasa !== undefined && (
                <div className="flex justify-between items-center p-2 bg-[#0a0b0f] rounded border border-[#1e1f2e]">
                  <span className="text-sm text-[#8a8d9e]">{t('resultados.durninWomersley')}</span>
                  <Badge variant="secondary" className="bg-[#64748b]/10 text-[#64748b] border-[#64748b]/20">{clasicos.durninWomersleyPorcentajeGrasa.toFixed(2)}%</Badge>
                </div>
              )}
              {clasicos?.leeMasaMuscular !== undefined && (
                <div className="flex justify-between items-center p-2 bg-[#0a0b0f] rounded border border-[#1e1f2e]">
                  <span className="text-sm text-[#8a8d9e]">{t('resultados.lee')}</span>
                  <Badge variant="secondary" className="bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/20">{clasicos.leeMasaMuscular.toFixed(2)} kg</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-[#f0f0f5]">
              <Shield className="w-5 h-5 text-[#6366f1]" />
              {t('resultados.phantom')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {phantom && phantom.proporcionalidad.length > 0 ? (
              <div className="space-y-4">
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={phantomData} layout="vertical" margin={{ left: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e1f2e" />
                      <XAxis type="number" domain={[-3, 3]} tick={{ fill: '#8a8d9e', fontSize: 12 }} />
                      <YAxis dataKey="name" type="category" width={80} tick={{ fill: '#8a8d9e', fontSize: 11 }} />
                      <Tooltip contentStyle={{ background: '#11121a', border: '1px solid #1e1f2e', borderRadius: '8px', color: '#f0f0f5' }} />
                      <Bar dataKey="zScore" fill="#6366f1" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {phantom.proporcionalidad.map((p) => (
                    <div key={p.variable} className="flex justify-between items-center text-sm p-1 hover:bg-[#1e1f2e]/30 rounded">
                      <span className="text-[#8a8d9e]">{p.variable}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#55576b]">z={p.zScore.toFixed(2)}</span>
                        <Badge variant={Math.abs(p.zScore) <= 1 ? 'default' : Math.abs(p.zScore) <= 2 ? 'secondary' : 'destructive'} className="text-[10px]">
                          {p.interpretacion}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-[#55576b]">
                <Shield className="w-10 h-10 mx-auto mb-2" />
                <p>{t('common.requierePerfilCompleto')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* MASAS ABSOLUTAS */}
      {cincoComponentes && (
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-[#f0f0f5]">
              <Zap className="w-5 h-5 text-[#D4FF00]" />
              {t('resultados.masasAbsolutas')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: t('resultados.masaAdiposa'), value: cincoComponentes.masaAdiposa, color: 'bg-[#f59e0b]/10 border-[#f59e0b]/20 text-[#f59e0b]', icon: Target },
                { label: t('resultados.masaMuscular'), value: cincoComponentes.masaMuscular, color: 'bg-[#6366f1]/10 border-[#6366f1]/20 text-[#6366f1]', icon: Zap },
                { label: t('resultados.masaOsea'), value: cincoComponentes.masaOsea, color: 'bg-[#a78bfa]/10 border-[#a78bfa]/20 text-[#a78bfa]', icon: Activity },
                { label: t('resultados.masaPiel'), value: cincoComponentes.masaPiel, color: 'bg-[#22c55e]/10 border-[#22c55e]/20 text-[#22c55e]', icon: Layers },
                { label: t('resultados.masaResidual'), value: cincoComponentes.masaResidual, color: 'bg-[#64748b]/10 border-[#64748b]/20 text-[#64748b]', icon: Activity },
              ].map((item) => (
                <div key={item.label} className={`p-4 rounded-lg border text-center ${item.color}`}>
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
