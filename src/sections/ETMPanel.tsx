import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ETMResultado } from '@/types/isak';
import { calcularETMIndividual } from '@/lib/calculations';

interface ETMMedicion {
  nombre: string;
  key: string;
  esPliegue: boolean;
  valores: number[];
}

export function ETMPanel() {
  const { t } = useTranslation();
  const [mediciones, setMediciones] = useState<ETMMedicion[]>([
    { nombre: t('mediciones.triceps'), key: 'triceps', esPliegue: true, valores: [0, 0] },
    { nombre: t('mediciones.subescapular'), key: 'subescapular', esPliegue: true, valores: [0, 0] },
    { nombre: t('mediciones.biceps'), key: 'biceps', esPliegue: true, valores: [0, 0] },
    { nombre: t('mediciones.crestaIliaca'), key: 'crestaIliaca', esPliegue: true, valores: [0, 0] },
    { nombre: t('mediciones.supraespinal'), key: 'supraespinal', esPliegue: true, valores: [0, 0] },
    { nombre: t('mediciones.abdominal'), key: 'abdominal', esPliegue: true, valores: [0, 0] },
    { nombre: t('mediciones.musloAnterior'), key: 'musloAnterior', esPliegue: true, valores: [0, 0] },
    { nombre: t('mediciones.piernaMedial'), key: 'piernaMedial', esPliegue: true, valores: [0, 0] },
    { nombre: 'Brazo Relajado', key: 'brazoRelajado', esPliegue: false, valores: [0, 0] },
    { nombre: 'Brazo Flexionado', key: 'brazoFlexionado', esPliegue: false, valores: [0, 0] },
    { nombre: t('mediciones.musloMedio'), key: 'musloMedio', esPliegue: false, valores: [0, 0] },
    { nombre: 'Pantorrilla', key: 'pantorrillaMaxima', esPliegue: false, valores: [0, 0] },
    { nombre: 'Húmero', key: 'humeroBiepicondilar', esPliegue: false, valores: [0, 0] },
    { nombre: 'Fémur', key: 'femurBicondilar', esPliegue: false, valores: [0, 0] },
  ]);

  const [resultados, setResultados] = useState<ETMResultado[]>([]);
  const [calculado, setCalculado] = useState(false);

  const updateValor = (index: number, valorIndex: number, value: number) => {
    const nuevas = [...mediciones];
    nuevas[index].valores[valorIndex] = value;
    setMediciones(nuevas);
  };

  const agregarTerceraMedicion = () => {
    const nuevas = mediciones.map(m => ({ ...m, valores: [...m.valores, 0] }));
    setMediciones(nuevas);
  };

  const calcular = () => {
    const res = mediciones.map((m) => {
      const validos = m.valores.filter(v => v > 0);
      if (validos.length < 2) return null;
      return calcularETMIndividual(validos, m.nombre, m.esPliegue);
    }).filter(Boolean) as ETMResultado[];
    setResultados(res);
    setCalculado(true);
  };

  const totalCumple = resultados.filter(r => r.cumple).length;
  const total = resultados.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            {t('etm.titulo')}
          </CardTitle>
          <p className="text-sm text-slate-500">{t('etm.descripcion')}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={agregarTerceraMedicion}>{t('etm.medicion3Btn')}</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={calcular}>{t('etm.calcularETM')}</Button>
          </div>
          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('etm.variable')}</TableHead>
                  <TableHead>{t('etm.tipo')}</TableHead>
                  <TableHead>{t('etm.medicion1')}</TableHead>
                  <TableHead>{t('etm.medicion2')}</TableHead>
                  {mediciones[0]?.valores.length === 3 && <TableHead>{t('etm.medicion3')}</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {mediciones.map((m, i) => (
                  <TableRow key={m.key}>
                    <TableCell className="font-medium">{m.nombre}</TableCell>
                    <TableCell>
                      <Badge variant={m.esPliegue ? 'secondary' : 'outline'}>
                        {m.esPliegue ? 'Pliegue (≤5%)' : 'Otra (≤1%)'}
                      </Badge>
                    </TableCell>
                    {m.valores.map((v, vi) => (
                      <TableCell key={vi}>
                        <Input type="number" step="0.1" className="w-24 h-8 text-sm"
                          value={v || ''} onChange={(e) => updateValor(i, vi, parseFloat(e.target.value) || 0)} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {calculado && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {t('etm.resultados')}
              <Badge className={totalCumple === total ? 'bg-emerald-500' : 'bg-amber-500'}>
                {totalCumple}/{total} {t('etm.dentroLimite')}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('etm.variable')}</TableHead>
                    <TableHead>{t('etm.media')}</TableHead>
                    <TableHead>{t('etm.etmAbs')}</TableHead>
                    <TableHead>{t('etm.etmPct')}</TableHead>
                    <TableHead>{t('etm.limite')}</TableHead>
                    <TableHead>{t('etm.estado')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resultados.map((r) => (
                    <TableRow key={r.nombre}>
                      <TableCell className="font-medium">{r.nombre}</TableCell>
                      <TableCell>{r.media.toFixed(2)}</TableCell>
                      <TableCell>{r.etmAbsoluto.toFixed(2)}</TableCell>
                      <TableCell className={r.cumple ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold'}>
                        {r.etmPorcentaje.toFixed(2)}%
                      </TableCell>
                      <TableCell>{mediciones.find(m => m.nombre === r.nombre)?.esPliegue ? '5%' : '1%'}</TableCell>
                      <TableCell>
                        {r.cumple ? (
                          <span className="flex items-center gap-1 text-emerald-600"><CheckCircle className="w-4 h-4" /> {t('etm.aceptable')}</span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-600"><AlertTriangle className="w-4 h-4" /> {t('etm.revisar')}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
