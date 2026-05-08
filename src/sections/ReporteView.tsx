import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
} from 'recharts';
import {
  User, Scale, Activity, Target, Dna, Layers, TrendingUp, Shield,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ResultadoISAK } from '@/types/isak';

export function ReporteView({ resultado }: { resultado: ResultadoISAK }) {
  const { t } = useTranslation();
  const { sujeto, somatotipo, cincoComponentes, clasicos, phantom, imc, indicePonderal, suma6Pliegues, siriPorcentajeGrasa, masaGrasaSiri, masaLibreGrasa, esPerfilCompleto } = resultado;

  const somatotipoData = somatotipo ? [
    { subject: t('resultados.endomorfia'), A: somatotipo.endomorfia, fullMark: 7 },
    { subject: t('resultados.mesomorfia'), A: somatotipo.mesomorfia, fullMark: 7 },
    { subject: t('resultados.ectomorfia'), A: somatotipo.ectomorfia, fullMark: 7 },
  ] : [];

  return (
    <div className="space-y-8 print:p-0">
      <div className="bg-[#0a0b0f] text-[#f0f0f5] p-8 rounded-xl print:rounded-none print:bg-[#11121a] print:text-black print:border-b-2 print:border-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">{t('reporte.titulo')}</h1>
            <p className="text-[#55576b] print:text-[#8a8d9e]">Protocolo de Antropometría Avanzada - ANTHROSCOPE PRO</p>
          </div>
          <div className="text-right print:hidden">
            <p className="text-sm text-[#55576b]">Nivel {resultado.nivel}</p>
            <Badge className="bg-[#22c55e]/100 mt-1">{esPerfilCompleto ? t('app.perfilCompleto') : t('app.perfilRestringido')}</Badge>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-[#D4FF00]" />{t('reporte.infoSujeto')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><p className="text-xs text-[#8a8d9e] uppercase">{t('sujeto.nombre')}</p><p className="font-semibold">{sujeto.nombre}</p></div>
            <div><p className="text-xs text-[#8a8d9e] uppercase">{t('sujeto.sexo')}</p><p className="font-semibold capitalize">{sujeto.sexo}</p></div>
            <div><p className="text-xs text-[#8a8d9e] uppercase">{t('sujeto.fechaEvaluacion')}</p><p className="font-semibold">{sujeto.fechaEvaluacion}</p></div>
            <div><p className="text-xs text-[#8a8d9e] uppercase">{t('sujeto.deporte')}</p><p className="font-semibold">{sujeto.deporte || 'N/A'}</p></div>
          </div>
          {sujeto.notas && (
            <div className="mt-4 p-3 bg-[#0a0b0f] rounded-lg text-sm">
              <p className="text-[#8a8d9e] text-xs uppercase mb-1">{t('reporte.notas')}</p><p>{sujeto.notas}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-[#D4FF00]" />{t('reporte.resumen')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center"><Scale className="w-6 h-6 text-[#D4FF00] mx-auto mb-2" /><p className="text-2xl font-bold">{imc}</p><p className="text-xs text-[#8a8d9e]">{t('resultados.imc')}</p></div>
            <div className="text-center"><Target className="w-6 h-6 text-amber-600 mx-auto mb-2" /><p className="text-2xl font-bold">{siriPorcentajeGrasa}%</p><p className="text-xs text-[#8a8d9e]">{t('resultados.grasaSiri')}</p></div>
            <div className="text-center"><TrendingUp className="w-6 h-6 text-[#a78bfa] mx-auto mb-2" /><p className="text-2xl font-bold">{indicePonderal}</p><p className="text-xs text-[#8a8d9e]">{t('resultados.indicePonderal')}</p></div>
            <div className="text-center"><Dna className="w-6 h-6 text-[#6366f1] mx-auto mb-2" /><p className="text-2xl font-bold">{somatotipo?.categoria}</p><p className="text-xs text-[#8a8d9e]">{t('resultados.somatotipo')}</p></div>
          </div>
          <Separator className="my-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center"><p className="text-xl font-bold">{suma6Pliegues}</p><p className="text-xs text-[#8a8d9e]">{t('resultados.suma6')} (mm)</p></div>
            <div className="text-center"><p className="text-xl font-bold">{masaGrasaSiri} kg</p><p className="text-xs text-[#8a8d9e]">{t('resultados.masaGrasa')}</p></div>
            <div className="text-center"><p className="text-xl font-bold">{masaLibreGrasa} kg</p><p className="text-xs text-[#8a8d9e]">{t('resultados.masaLibreGrasa')}</p></div>
            <div className="text-center"><p className="text-xl font-bold">{cincoComponentes?.indiceMusculoOseo.toFixed(2) || 'N/A'}</p><p className="text-xs text-[#8a8d9e]">{t('resultados.indiceMusculoOseo')}</p></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Dna className="w-5 h-5 text-[#6366f1]" />{t('resultados.somatotipo')}</CardTitle>
          </CardHeader>
          <CardContent>
            {somatotipo && (
              <div className="space-y-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={somatotipoData}>
                      <PolarGrid /><PolarAngleAxis dataKey="subject" /><PolarRadiusAxis angle={30} domain={[0, 7]} />
                      <Radar name={sujeto.nombre} dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 bg-[#f59e0b]/10 rounded-lg"><p className="text-xs text-[#f59e0b] font-semibold">{t('resultados.endomorfia')}</p><p className="text-2xl font-bold text-[#f59e0b]">{somatotipo.endomorfia}</p></div>
                  <div className="p-3 bg-[#6366f1]/10 rounded-lg"><p className="text-xs text-[#6366f1] font-semibold">{t('resultados.mesomorfia')}</p><p className="text-2xl font-bold text-[#6366f1]">{somatotipo.mesomorfia}</p></div>
                  <div className="p-3 bg-[#22c55e]/10 rounded-lg"><p className="text-xs text-[#050608] font-semibold">{t('resultados.ectomorfia')}</p><p className="text-2xl font-bold text-[#050608]">{somatotipo.ectomorfia}</p></div>
                </div>
                <p className="text-sm text-[#8a8d9e] text-center mt-2"><strong>{t('resultados.categoria')}:</strong> {somatotipo.categoria}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Layers className="w-5 h-5 text-[#a78bfa]" />{t('resultados.componentes5')}</CardTitle>
          </CardHeader>
          <CardContent>
            {cincoComponentes ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#f59e0b]/10 rounded-lg"><p className="text-xs text-[#f59e0b]">{t('resultados.masaAdiposa')}</p><p className="text-xl font-bold text-[#f59e0b]">{cincoComponentes.masaAdiposa.toFixed(1)} kg ({cincoComponentes.porcentajeAdiposo.toFixed(1)}%)</p></div>
                  <div className="p-3 bg-[#6366f1]/10 rounded-lg"><p className="text-xs text-[#6366f1]">{t('resultados.masaMuscular')}</p><p className="text-xl font-bold text-[#6366f1]">{cincoComponentes.masaMuscular.toFixed(1)} kg ({cincoComponentes.porcentajeMuscular.toFixed(1)}%)</p></div>
                  <div className="p-3 bg-[#a78bfa]/10 rounded-lg"><p className="text-xs text-[#a78bfa]">{t('resultados.masaOsea')}</p><p className="text-xl font-bold text-[#a78bfa]">{cincoComponentes.masaOsea.toFixed(1)} kg ({cincoComponentes.porcentajeOseo.toFixed(1)}%)</p></div>
                  <div className="p-3 bg-[#22c55e]/10 rounded-lg"><p className="text-xs text-[#050608]">{t('resultados.masaPiel')}</p><p className="text-xl font-bold text-[#050608]">{cincoComponentes.masaPiel.toFixed(1)} kg ({cincoComponentes.porcentajePiel.toFixed(1)}%)</p></div>
                </div>
                <div className="p-3 bg-[#0a0b0f] rounded-lg">
                  <p className="text-xs text-[#f0f0f5]">{t('resultados.masaResidual')}</p>
                  <p className="text-xl font-bold text-[#f0f0f5]">{cincoComponentes.masaResidual.toFixed(1)} kg ({cincoComponentes.porcentajeResidual.toFixed(1)}%)</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 bg-[#11121a] rounded text-center"><p className="text-xs text-[#8a8d9e]">{t('resultados.indiceMusculoOseo')}</p><p className="text-lg font-bold">{cincoComponentes.indiceMusculoOseo.toFixed(2)}</p></div>
                  <div className="p-2 bg-[#11121a] rounded text-center"><p className="text-xs text-[#8a8d9e]">IMO Score</p><p className="text-lg font-bold">{(cincoComponentes.masaMuscular / cincoComponentes.masaOsea).toFixed(2)}</p></div>
                </div>
              </div>
            ) : <p className="text-[#55576b] text-center py-8">{t('common.requierePerfilCompleto')}</p>}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-amber-600" />{t('reporte.comparativaFormulas')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow><TableHead>{t('reporte.metodo')}</TableHead><TableHead>{t('reporte.variable')}</TableHead><TableHead>{t('reporte.resultado')}</TableHead><TableHead>{t('reporte.poblacion')}</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                <TableRow><TableCell className="font-medium">Siri (Durnin-Womersley)</TableCell><TableCell>% Grasa</TableCell><TableCell>{resultado.siriPorcentajeGrasa?.toFixed(2)}%</TableCell><TableCell>General</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Carter</TableCell><TableCell>% Grasa</TableCell><TableCell>{clasicos?.carterPorcentajeGrasa?.toFixed(2)}%</TableCell><TableCell>Atletas</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Faulkner</TableCell><TableCell>% Grasa</TableCell><TableCell>{clasicos?.faulknerPorcentajeGrasa?.toFixed(2)}%</TableCell><TableCell>General</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Yuhasz</TableCell><TableCell>% Grasa</TableCell><TableCell>{clasicos?.yuhaszPorcentajeGrasa?.toFixed(2)}%</TableCell><TableCell>Universitarios</TableCell></TableRow>
                <TableRow><TableCell className="font-medium">Lee et al. (2000)</TableCell><TableCell>Masa Muscular</TableCell><TableCell>{clasicos?.leeMasaMuscular?.toFixed(2)} kg</TableCell><TableCell>Adultos</TableCell></TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {phantom && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-indigo-600" />{t('resultados.phantom')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>{t('reporte.variable')}</TableHead><TableHead>Z-Score</TableHead><TableHead>{t('resultados.interpretacion')}</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {phantom.proporcionalidad.map((p) => (
                    <TableRow key={p.variable}>
                      <TableCell className="font-medium">{p.variable}</TableCell>
                      <TableCell className={Math.abs(p.zScore) > 2 ? 'text-red-600 font-bold' : Math.abs(p.zScore) > 1 ? 'text-amber-600 font-semibold' : 'text-[#D4FF00]'}>{p.zScore.toFixed(2)}</TableCell>
                      <TableCell><Badge variant={Math.abs(p.zScore) <= 1 ? 'default' : Math.abs(p.zScore) <= 2 ? 'secondary' : 'destructive'}>{p.interpretacion}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="print:hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-[#8a8d9e]" />{t('reporte.firmaEvaluador')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="border-t border-slate-300 pt-2 mt-8">
              <p className="text-xs text-[#8a8d9e]">{t('reporte.firmaEvaluador')}</p>
            </div>
            <div className="border-t border-slate-300 pt-2 mt-8">
              <p className="text-xs text-[#8a8d9e]">{t('reporte.certificacion')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-[#55576b] pt-8 pb-4 border-t">
        <p>Reporte generado con ANTHROSCOPE PRO</p>
        <p>Sistema de Kinantropometría Avanzada | Compatible con protocolos ISAK Nivel 1-4</p>
        <p className="mt-1">Modelo de 5 Componentes: Ross & Kerr (1993) | Somatotipo: Heath-Carter | Phantom: Ross (1974) | IMO: Holway & Barrios (2012)</p>
      </div>
    </div>
  );
}
