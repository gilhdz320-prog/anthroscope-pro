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
      <div className="bg-slate-900 text-white p-8 rounded-xl print:rounded-none print:bg-white print:text-black print:border-b-2 print:border-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">{t('reporte.titulo')}</h1>
            <p className="text-slate-400 print:text-slate-600">Protocolo de Antropometría Avanzada - ANTHROSCOPE PRO</p>
          </div>
          <div className="text-right print:hidden">
            <p className="text-sm text-slate-400">Nivel {resultado.nivel}</p>
            <Badge className="bg-emerald-500 mt-1">{esPerfilCompleto ? t('app.perfilCompleto') : t('app.perfilRestringido')}</Badge>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-emerald-600" />{t('reporte.infoSujeto')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><p className="text-xs text-slate-500 uppercase">{t('sujeto.nombre')}</p><p className="font-semibold">{sujeto.nombre}</p></div>
            <div><p className="text-xs text-slate-500 uppercase">{t('sujeto.sexo')}</p><p className="font-semibold capitalize">{sujeto.sexo}</p></div>
            <div><p className="text-xs text-slate-500 uppercase">{t('sujeto.fechaEvaluacion')}</p><p className="font-semibold">{sujeto.fechaEvaluacion}</p></div>
            <div><p className="text-xs text-slate-500 uppercase">{t('sujeto.deporte')}</p><p className="font-semibold">{sujeto.deporte || 'N/A'}</p></div>
          </div>
          {sujeto.notas && (
            <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm">
              <p className="text-slate-500 text-xs uppercase mb-1">{t('reporte.notas')}</p><p>{sujeto.notas}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-600" />{t('reporte.resumen')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center"><Scale className="w-6 h-6 text-emerald-600 mx-auto mb-2" /><p className="text-2xl font-bold">{imc}</p><p className="text-xs text-slate-500">{t('resultados.imc')}</p></div>
            <div className="text-center"><Target className="w-6 h-6 text-amber-600 mx-auto mb-2" /><p className="text-2xl font-bold">{siriPorcentajeGrasa}%</p><p className="text-xs text-slate-500">{t('resultados.grasaSiri')}</p></div>
            <div className="text-center"><TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" /><p className="text-2xl font-bold">{indicePonderal}</p><p className="text-xs text-slate-500">{t('resultados.indicePonderal')}</p></div>
            <div className="text-center"><Dna className="w-6 h-6 text-blue-600 mx-auto mb-2" /><p className="text-2xl font-bold">{somatotipo?.categoria}</p><p className="text-xs text-slate-500">{t('resultados.somatotipo')}</p></div>
          </div>
          <Separator className="my-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center"><p className="text-xl font-bold">{suma6Pliegues}</p><p className="text-xs text-slate-500">{t('resultados.suma6')} (mm)</p></div>
            <div className="text-center"><p className="text-xl font-bold">{masaGrasaSiri} kg</p><p className="text-xs text-slate-500">{t('resultados.masaGrasa')}</p></div>
            <div className="text-center"><p className="text-xl font-bold">{masaLibreGrasa} kg</p><p className="text-xs text-slate-500">{t('resultados.masaLibreGrasa')}</p></div>
            <div className="text-center"><p className="text-xl font-bold">{cincoComponentes?.indiceMusculoOseo.toFixed(2) || 'N/A'}</p><p className="text-xs text-slate-500">{t('resultados.indiceMusculoOseo')}</p></div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Dna className="w-5 h-5 text-blue-600" />{t('resultados.somatotipo')}</CardTitle>
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
                  <div className="p-3 bg-amber-50 rounded-lg"><p className="text-xs text-amber-700 font-semibold">{t('resultados.endomorfia')}</p><p className="text-2xl font-bold text-amber-800">{somatotipo.endomorfia}</p></div>
                  <div className="p-3 bg-blue-50 rounded-lg"><p className="text-xs text-blue-700 font-semibold">{t('resultados.mesomorfia')}</p><p className="text-2xl font-bold text-blue-800">{somatotipo.mesomorfia}</p></div>
                  <div className="p-3 bg-emerald-50 rounded-lg"><p className="text-xs text-emerald-700 font-semibold">{t('resultados.ectomorfia')}</p><p className="text-2xl font-bold text-emerald-800">{somatotipo.ectomorfia}</p></div>
                </div>
                <p className="text-sm text-slate-600 text-center mt-2"><strong>{t('resultados.categoria')}:</strong> {somatotipo.categoria}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Layers className="w-5 h-5 text-purple-600" />{t('resultados.componentes5')}</CardTitle>
          </CardHeader>
          <CardContent>
            {cincoComponentes ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-amber-50 rounded-lg"><p className="text-xs text-amber-700">{t('resultados.masaAdiposa')}</p><p className="text-xl font-bold text-amber-800">{cincoComponentes.masaAdiposa.toFixed(1)} kg ({cincoComponentes.porcentajeAdiposo.toFixed(1)}%)</p></div>
                  <div className="p-3 bg-blue-50 rounded-lg"><p className="text-xs text-blue-700">{t('resultados.masaMuscular')}</p><p className="text-xl font-bold text-blue-800">{cincoComponentes.masaMuscular.toFixed(1)} kg ({cincoComponentes.porcentajeMuscular.toFixed(1)}%)</p></div>
                  <div className="p-3 bg-purple-50 rounded-lg"><p className="text-xs text-purple-700">{t('resultados.masaOsea')}</p><p className="text-xl font-bold text-purple-800">{cincoComponentes.masaOsea.toFixed(1)} kg ({cincoComponentes.porcentajeOseo.toFixed(1)}%)</p></div>
                  <div className="p-3 bg-emerald-50 rounded-lg"><p className="text-xs text-emerald-700">{t('resultados.masaPiel')}</p><p className="text-xl font-bold text-emerald-800">{cincoComponentes.masaPiel.toFixed(1)} kg ({cincoComponentes.porcentajePiel.toFixed(1)}%)</p></div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-xs text-slate-700">{t('resultados.masaResidual')}</p>
                  <p className="text-xl font-bold text-slate-800">{cincoComponentes.masaResidual.toFixed(1)} kg ({cincoComponentes.porcentajeResidual.toFixed(1)}%)</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 bg-slate-100 rounded text-center"><p className="text-xs text-slate-500">{t('resultados.indiceMusculoOseo')}</p><p className="text-lg font-bold">{cincoComponentes.indiceMusculoOseo.toFixed(2)}</p></div>
                  <div className="p-2 bg-slate-100 rounded text-center"><p className="text-xs text-slate-500">{t('resultados.zScoreMuscular')}</p><p className="text-lg font-bold">{cincoComponentes.zScoreMuscular.toFixed(2)}</p></div>
                </div>
              </div>
            ) : <p className="text-slate-400 text-center py-8">{t('common.requierePerfilCompleto')}</p>}
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
                <TableRow><TableCell className="font-medium">Siri (Durnin-Womersley)</TableCell><TableCell>% Grasa</TableCell><TableCell>{clasicos?.siriPorcentajeGrasa?.toFixed(2)}%</TableCell><TableCell>General</TableCell></TableRow>
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
                  <TableRow><TableHead>{t('reporte.variable')}</TableHead><TableHead>Valor</TableHead><TableHead>Phantom</TableHead><TableHead>Z-Score</TableHead><TableHead>{t('resultados.interpretacion')}</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {phantom.proporcionalidad.map((p) => (
                    <TableRow key={p.variable}>
                      <TableCell className="font-medium">{p.variable}</TableCell>
                      <TableCell>{p.valor.toFixed(1)}</TableCell>
                      <TableCell>{p.phantomValor.toFixed(1)}</TableCell>
                      <TableCell className={Math.abs(p.zScore) > 2 ? 'text-red-600 font-bold' : Math.abs(p.zScore) > 1 ? 'text-amber-600 font-semibold' : 'text-emerald-600'}>{p.zScore.toFixed(2)}</TableCell>
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
          <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-slate-600" />{t('reporte.firmaEvaluador')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="border-t border-slate-300 pt-2 mt-8">
              <p className="text-xs text-slate-500">{t('reporte.firmaEvaluador')}</p>
            </div>
            <div className="border-t border-slate-300 pt-2 mt-8">
              <p className="text-xs text-slate-500">{t('reporte.certificacion')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-slate-400 pt-8 pb-4 border-t">
        <p>Reporte generado con ANTHROSCOPE PRO</p>
        <p>Sistema de Kinantropometría Avanzada | Compatible con protocolos ISAK Nivel 1-4</p>
        <p className="mt-1">Modelo de 5 Componentes: Ross & Kerr (1993) | Somatotipo: Heath-Carter | Phantom: Ross (1974) | IMO: Holway & Barrios (2012)</p>
      </div>
    </div>
  );
}
