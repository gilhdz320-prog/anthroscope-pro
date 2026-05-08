import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle2, ShieldCheck, Search, ExternalLink } from 'lucide-react';

// Lista simplificada de sustancias prohibidas WADA (categorías principales)
const SUSTANCIAS_PROHIBIDAS: { nombre: string; categoria: string; nivel: 'siempre' | 'competencia' }[] = [
  { nombre: 'ostarina', categoria: 'SARMs', nivel: 'siempre' },
  { nombre: 'ligandrol', categoria: 'SARMs', nivel: 'siempre' },
  { nombre: 'rad140', categoria: 'SARMs', nivel: 'siempre' },
  { nombre: 'cardarine', categoria: 'PPAR-delta', nivel: 'siempre' },
  { nombre: 'andarine', categoria: 'SARMs', nivel: 'siempre' },
  { nombre: 'clenbuterol', categoria: 'Anabólicos', nivel: 'siempre' },
  { nombre: 'clembuterol', categoria: 'Anabólicos', nivel: 'siempre' },
  { nombre: 'stanozolol', categoria: 'Esteroides', nivel: 'siempre' },
  { nombre: 'nandrolona', categoria: 'Esteroides', nivel: 'siempre' },
  { nombre: 'testosterona', categoria: 'Esteroides', nivel: 'siempre' },
  { nombre: 'dianabol', categoria: 'Esteroides', nivel: 'siempre' },
  { nombre: 'anavar', categoria: 'Esteroides', nivel: 'siempre' },
  { nombre: 'trembolona', categoria: 'Esteroides', nivel: 'siempre' },
  { nombre: 'boldenona', categoria: 'Esteroides', nivel: 'siempre' },
  { nombre: 'hormona de crecimiento', categoria: 'HGH', nivel: 'siempre' },
  { nombre: 'hgh', categoria: 'HGH', nivel: 'siempre' },
  { nombre: 'insulina', categoria: 'Hormonas', nivel: 'siempre' },
  { nombre: 'ePO', categoria: 'Hemática', nivel: 'siempre' },
  { nombre: 'epoetina', categoria: 'Hemática', nivel: 'siempre' },
  { nombre: 'modafinilo', categoria: 'Estimulantes', nivel: 'siempre' },
  { nombre: 'adderall', categoria: 'Estimulantes', nivel: 'siempre' },
  { nombre: 'anfetamina', categoria: 'Estimulantes', nivel: 'siempre' },
  { nombre: 'metanfetamina', categoria: 'Estimulantes', nivel: 'siempre' },
  { nombre: 'cocaína', categoria: 'Estimulantes', nivel: 'siempre' },
  { nombre: 'cannabis', categoria: 'Cannabinoides', nivel: 'competencia' },
  { nombre: 'thc', categoria: 'Cannabinoides', nivel: 'competencia' },
  { nombre: 'cbd', categoria: 'Cannabinoides', nivel: 'competencia' },
  { nombre: 'meldonium', categoria: 'Metabólicos', nivel: 'siempre' },
  { nombre: 'tamoxifeno', categoria: 'Anti-estrógenos', nivel: 'siempre' },
  { nombre: 'clomifeno', categoria: 'Anti-estrógenos', nivel: 'siempre' },
  { nombre: 'arimidex', categoria: 'Anti-estrógenos', nivel: 'siempre' },
  { nombre: 'letrozol', categoria: 'Anti-estrógenos', nivel: 'siempre' },
  { nombre: 'prohormona', categoria: 'Precursores', nivel: 'siempre' },
  { nombre: 'dhea', categoria: 'Precursores', nivel: 'siempre' },
  { nombre: 'androstenediona', categoria: 'Precursores', nivel: 'siempre' },
  { nombre: 'sibutramina', categoria: 'Control de peso', nivel: 'siempre' },
  { nombre: 'efedrina', categoria: 'Estimulantes', nivel: 'siempre' },
  { nombre: 'pseudoefedrina', categoria: 'Estimulantes', nivel: 'competencia' },
];

// Suplementos certificados por programa
const SUPLEMENTOS_CERTIFICADOS = [
  { marca: 'Optimum Nutrition', producto: 'Gold Standard Whey', cert: 'Informed Sport' },
  { marca: 'Dymatize', producto: 'ISO100', cert: 'Informed Sport' },
  { marca: 'MuscleTech', producto: 'NitroTech', cert: 'Informed Choice' },
  { marca: 'Klean Athlete', producto: 'Whey Isolate', cert: 'NSF Certified for Sport' },
  { marca: 'Thorne', producto: 'Whey Protein', cert: 'NSF Certified for Sport' },
  { marca: 'Momentous', producto: 'Essential Whey', cert: 'NSF Certified for Sport' },
  { marca: 'Barebells', producto: 'Protein Bars', cert: 'Informed Sport' },
  { marca: 'Ascent', producto: 'Native Fuel', cert: 'Informed Sport' },
];

export function WADAVerificador() {
  const [ingrediente, setIngrediente] = useState('');
  const [producto, setProducto] = useState('');
  const [resultadoIng, setResultadoIng] = useState<{ encontrado: boolean; sustancia?: typeof SUSTANCIAS_PROHIBIDAS[0] } | null>(null);
  const [resultadoProd, setResultadoProd] = useState<{ certificado: boolean; info?: typeof SUPLEMENTOS_CERTIFICADOS[0] } | null>(null);

  const verificarIngrediente = () => {
    const busqueda = ingrediente.toLowerCase().trim();
    if (!busqueda) return;
    const found = SUSTANCIAS_PROHIBIDAS.find(s => busqueda.includes(s.nombre) || s.nombre.includes(busqueda));
    setResultadoIng({ encontrado: !!found, sustancia: found });
  };

  const verificarProducto = () => {
    const busqueda = producto.toLowerCase().trim();
    if (!busqueda) return;
    const found = SUPLEMENTOS_CERTIFICADOS.find(s => busqueda.includes(s.producto.toLowerCase()) || busqueda.includes(s.marca.toLowerCase()));
    setResultadoProd({ certificado: !!found, info: found });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#f0f0f5]">Verificación WADA / Anti-Dopaje</h2>
          <p className="text-xs text-[#8a8d9e]">Revisa ingredientes y suplementos contra lista WADA 2025</p>
        </div>
        <Badge className="bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/20">Nadie lo tiene</Badge>
      </div>

      {/* Verificar ingrediente */}
      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2">
            <Search className="w-4 h-4 text-[#D4FF00]" /> Verificar Ingrediente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input value={ingrediente} onChange={e => setIngrediente(e.target.value)} onKeyDown={e => e.key === 'Enter' && verificarIngrediente()} placeholder="Ej: ostarina, clenbuterol, efedrina..." className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            <Button onClick={verificarIngrediente} className="bg-[#D4FF00] hover:bg-[#a8cc00] text-[#050608] shrink-0">
              <ShieldCheck className="w-4 h-4 mr-1" /> Verificar
            </Button>
          </div>
          {resultadoIng && (
            <div className={`p-3 rounded-lg border ${resultadoIng.encontrado ? 'bg-[#ef4444]/10 border-[#ef4444]/20' : 'bg-[#22c55e]/10 border-[#22c55e]/20'}`}>
              {resultadoIng.encontrado ? (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#ef4444] shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-[#ef4444]">INGREDIENTE PROHIBIDO DETECTADO</p>
                    <p className="text-xs text-[#f0f0f5]">{resultadoIng.sustancia?.nombre.toUpperCase()} — Categoría: {resultadoIng.sustancia?.categoria}</p>
                    <p className="text-xs text-[#8a8d9e] mt-1">Prohibido {resultadoIng.sustancia?.nivel === 'siempre' ? 'SIEMPRE (in-competition + out-of-competition)' : 'EN COMPETENCIA'} por WADA 2025.</p>
                    <p className="text-xs text-[#ef4444] font-semibold mt-1">NO CONSUMIR. Riesgo de prueba positiva.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#22c55e] shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-[#22c55e]">INGREDIENTE NO ENCONTRADO EN LISTA WADA</p>
                    <p className="text-xs text-[#8a8d9e] mt-1">No aparece en las principales categorías prohibidas de la lista WADA 2025. Sin embargo, esto no garantiza seguridad completa — verificar siempre certificación NSF/Informed Sport del producto.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verificar producto certificado */}
      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-[#f0f0f5] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#6366f1]" /> Verificar Suplemento Certificado
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input value={producto} onChange={e => setProducto(e.target.value)} onKeyDown={e => e.key === 'Enter' && verificarProducto()} placeholder="Ej: Optimum Nutrition, Dymatize, Klean Athlete..." className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            <Button onClick={verificarProducto} className="bg-[#6366f1] hover:bg-[#4f46e5] text-white shrink-0">
              <ShieldCheck className="w-4 h-4 mr-1" /> Buscar
            </Button>
          </div>
          {resultadoProd && (
            <div className={`p-3 rounded-lg border ${resultadoProd.certificado ? 'bg-[#22c55e]/10 border-[#22c55e]/20' : 'bg-[#f59e0b]/10 border-[#f59e0b]/20'}`}>
              {resultadoProd.certificado ? (
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#22c55e] shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-[#22c55e]">SUPLEMENTO CERTIFICADO ENCONTRADO</p>
                    <p className="text-xs text-[#f0f0f5]">{resultadoProd.info?.marca} — {resultadoProd.info?.producto}</p>
                    <p className="text-xs text-[#8a8d9e] mt-1">Certificación: <span className="text-[#22c55e] font-semibold">{resultadoProd.info?.cert}</span></p>
                    <p className="text-xs text-[#55576b] mt-1">Los productos certificados por NSF, Informed Sport o Informed Choice son testados en lotes independientes para sustancias prohibidas.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#f59e0b] shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-[#f59e0b]">PRODUCTO NO ENCONTRADO EN BASE CERTIFICADA</p>
                    <p className="text-xs text-[#8a8d9e] mt-1">No aparece en nuestra base de suplementos certificados. Esto NO significa que sea peligroso, pero:</p>
                    <ul className="text-xs text-[#8a8d9e] mt-1 list-disc list-inside">
                      <li>Busca sello NSF Certified for Sport, Informed Sport o Informed Choice en el envase</li>
                      <li>El 28% de suplementos no certificados contienen sustancias no declaradas (BSCG, 2024)</li>
                      <li>Consulta la app oficial NSF: <a href="https://www.nsf.org" target="_blank" className="text-[#D4FF00] underline">nsf.org</a></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info educativa */}
      <Card className="bg-[#11121a] border-[#1e1f2e]">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-[#f0f0f5]">Datos clave sobre suplementos y dopaje</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { icon: AlertTriangle, color: 'text-[#ef4444]', text: '28% de suplementos no certificados contienen sustancias no declaradas (BSCG, meta-análisis 2024)' },
            { icon: AlertTriangle, color: 'text-[#f59e0b]', text: '35% de suplementos deportivos no certificados contienen una sustancia WADA prohibida (encuesta 2025)' },
            { icon: CheckCircle2, color: 'text-[#22c55e]', text: 'NSF, Informed Sport y BSCG testan lotes independientes para 290+ sustancias prohibidas' },
            { icon: ShieldCheck, color: 'text-[#6366f1]', text: 'La responsabilidad del atleta es personal: "strict liability" — aunque no supieras, la sanción aplica' },
          ].map((item, i) => (
            <p key={i} className="text-xs text-[#8a8d9e] flex items-start gap-2">
              <item.icon className={`w-3 h-3 ${item.color} shrink-0 mt-0.5`} /> {item.text}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
