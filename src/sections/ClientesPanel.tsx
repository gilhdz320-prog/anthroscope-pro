import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Users, Search, UserPlus, Trash2, TrendingUp, Activity, Dna } from 'lucide-react';
import type { ResultadoISAK } from '@/types/isak';

interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  edad: number;
  sexo: string;
  deporte: string;
  notas: string;
  fechaRegistro: string;
}

function getClientesStorage(): Cliente[] {
  try {
    const raw = localStorage.getItem('anthroscope_clientes');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveClientes(list: Cliente[]) {
  localStorage.setItem('anthroscope_clientes', JSON.stringify(list));
}

function getResultadosStorage(): ResultadoISAK[] {
  try {
    const raw = localStorage.getItem('anthroscope_evaluaciones');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((e: any) => e.resultado).filter(Boolean) : [];
  } catch { return []; }
}

function getEvaluacionesPorCliente(nombre: string): ResultadoISAK[] {
  return getResultadosStorage()
    .filter(r => r.sujeto?.nombre === nombre)
    .sort((a, b) => new Date(b.sujeto?.fechaEvaluacion || '').getTime() - new Date(a.sujeto?.fechaEvaluacion || '').getTime());
}

export function ClientesPanel() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);
  const [clienteSel, setClienteSel] = useState<Cliente | null>(null);
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', edad: 25, sexo: 'masculino', deporte: '', notas: '' });

  useEffect(() => { setClientes(getClientesStorage()); }, []);

  const agregar = () => {
    if (!form.nombre) { toast.error('Nombre es requerido'); return; }
    const nuevo: Cliente = { id: Date.now().toString(), ...form, fechaRegistro: new Date().toISOString().slice(0, 10) };
    const all = [...clientes, nuevo];
    saveClientes(all);
    setClientes(all);
    setForm({ nombre: '', email: '', telefono: '', edad: 25, sexo: 'masculino', deporte: '', notas: '' });
    setMostrarForm(false);
    toast.success('Cliente agregado');
  };

  const eliminar = (id: string) => {
    const all = clientes.filter(c => c.id !== id);
    saveClientes(all);
    setClientes(all);
    toast.success('Cliente eliminado');
  };

  const filtrados = clientes.filter(c => c.nombre.toLowerCase().includes(busqueda.toLowerCase()) || c.deporte.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#f0f0f5]">Mis Clientes / Atletas</h2>
          <p className="text-xs text-[#8a8d9e]">Gestiona pacientes y ve su historial</p>
        </div>
        <Button onClick={() => setMostrarForm(!mostrarForm)} className="bg-[#D4FF00] hover:bg-[#a8cc00] text-[#050608]">
          <UserPlus className="w-4 h-4 mr-2" /> {mostrarForm ? 'Cancelar' : 'Nuevo Cliente'}
        </Button>
      </div>

      {/* Formulario */}
      {mostrarForm && (
        <Card className="bg-[#11121a] border-[#1e1f2e]">
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input placeholder="Nombre completo *" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            <Input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            <Input placeholder="Teléfono" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            <Input type="number" placeholder="Edad" value={form.edad} onChange={e => setForm({ ...form, edad: parseInt(e.target.value) || 0 })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            <select value={form.sexo} onChange={e => setForm({ ...form, sexo: e.target.value })} className="bg-[#0a0b0f] border border-[#1e1f2e] text-[#f0f0f5] rounded-lg px-3 py-2 text-sm">
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>
            <Input placeholder="Deporte / Actividad" value={form.deporte} onChange={e => setForm({ ...form, deporte: e.target.value })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
            <Input placeholder="Notas (alergias, lesiones, etc.)" value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} className="bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5] md:col-span-3" />
            <div className="md:col-span-3 flex justify-end">
              <Button onClick={agregar} className="bg-[#D4FF00] hover:bg-[#a8cc00] text-[#050608]">Guardar Cliente</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#55576b]" />
        <Input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Buscar cliente o deporte..." className="pl-9 bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" />
      </div>

      {/* Lista */}
      <div className="space-y-2">
        {filtrados.map(c => {
          const evals = getEvaluacionesPorCliente(c.nombre);
          const ultimo = evals[0];
          return (
            <Card key={c.id} className="bg-[#11121a] border-[#1e1f2e]">
              <div className="p-4 flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-[#D4FF00]" />
                    <h3 className="text-sm font-semibold text-[#f0f0f5]">{c.nombre}</h3>
                    <Badge className="bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/20 text-[10px]">{c.deporte || 'Sin deporte'}</Badge>
                  </div>
                  <p className="text-[10px] text-[#55576b]">{c.sexo === 'masculino' ? '♂' : '♀'} {c.edad} años · Registrado: {c.fechaRegistro}</p>
                  {ultimo && (
                    <div className="flex gap-3 mt-2">
                      <span className="text-[10px] text-[#8a8d9e] flex items-center gap-1"><Dna className="w-3 h-3 text-[#a78bfa]" /> IMO {ultimo.cincoComponentes?.indiceMusculoOseo?.toFixed(2) || 'N/A'}</span>
                      <span className="text-[10px] text-[#8a8d9e] flex items-center gap-1"><Activity className="w-3 h-3 text-[#f59e0b]" /> Grasa {ultimo.siriPorcentajeGrasa}%</span>
                      <span className="text-[10px] text-[#8a8d9e] flex items-center gap-1"><TrendingUp className="w-3 h-3 text-[#22c55e]" /> {evals.length} evaluaciones</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" onClick={() => setClienteSel(clienteSel?.id === c.id ? null : c)} className="text-[#8a8d9e] hover:text-[#f0f0f5]">
                    {clienteSel?.id === c.id ? 'Cerrar' : 'Ver'}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => eliminar(c.id)} className="text-[#ef4444] hover:text-[#ef4444]">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Detalle expandido */}
              {clienteSel?.id === c.id && evals.length > 0 && (
                <CardContent className="border-t border-[#1e1f2e] pt-3">
                  <p className="text-xs font-semibold text-[#8a8d9e] mb-2">Historial de Evaluaciones:</p>
                  <div className="space-y-1">
                    {evals.slice(0, 5).map((e, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-[#0a0b0f] rounded text-xs">
                        <span className="text-[#f0f0f5]">{e.sujeto?.fechaEvaluacion || 'Sin fecha'}</span>
                        <div className="flex gap-3">
                          <span className="text-[#a78bfa]">IMO {e.cincoComponentes?.indiceMusculoOseo?.toFixed(2) || 'N/A'}</span>
                          <span className="text-[#f59e0b]">Grasa {e.siriPorcentajeGrasa}%</span>
                          <span className="text-[#22c55e]">{e.perfil?.masaCorporal} kg</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
        {filtrados.length === 0 && (
          <Card className="p-6 text-center bg-[#11121a] border-[#1e1f2e]">
            <Users className="w-8 h-8 text-[#55576b] mx-auto mb-2" />
            <p className="text-sm text-[#8a8d9e]">No hay clientes. Agrega el primero.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
