import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import {
  Users, CheckCircle, Clock, TrendingUp, Search, Filter,
  Scale, Zap, Moon, Brain, Utensils, Dumbbell, Bed, ChevronRight,
  BarChart3, ArrowUp, ArrowDown, Minus, MessageSquare
} from 'lucide-react';

const MOCK_CLIENTES = [
  { id: 1, nombre: 'Maria Garcia', avatar: 'MG', semana: 12, peso: 65.2, pesoCambio: -0.3, energia: 8, sueno: 7, adherencia: 85, estado: 'completado' },
  { id: 2, nombre: 'Carlos Ruiz', avatar: 'CR', semana: 12, peso: 82.5, pesoCambio: -0.8, energia: 9, sueno: 8, adherencia: 92, estado: 'completado' },
  { id: 3, nombre: 'Ana Torres', avatar: 'AT', semana: 12, peso: 58.0, pesoCambio: 0.1, energia: 6, sueno: 5, adherencia: 65, estado: 'pendiente' },
  { id: 4, nombre: 'Luis Mendez', avatar: 'LM', semana: 12, peso: 91.3, pesoCambio: -1.2, energia: 7, sueno: 6, adherencia: 78, estado: 'completado' },
  { id: 5, nombre: 'Sofia Castro', avatar: 'SC', semana: 11, peso: 62.8, pesoCambio: 0, energia: 0, sueno: 0, adherencia: 0, estado: 'pendiente' },
];

const TREND_COLORS: Record<string, string> = {
  aumento: 'text-emerald-400',
  disminuyo: 'text-red-400',
  mantuvo: 'text-gray-400',
};

const TREND_ICONS: Record<string, any> = {
  aumento: ArrowUp,
  disminuyo: ArrowDown,
  mantuvo: Minus,
};

export default function CoachCheckins() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'es';
  const isEn = lang === 'en';

  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [filter, setFilter] = useState('todos');
  const [notasCoach, setNotasCoach] = useState('');

  const t = {
    es: {
      title: 'Check-ins de Clientes',
      subtitle: 'Revisa el progreso semanal de tus atletas',
      todos: 'Todos',
      completados: 'Completados',
      pendientes: 'Pendientes',
      revisados: 'Revisados',
      buscar: 'Buscar cliente...',
      semana: 'Semana',
      peso: 'Peso',
      energia: 'Energia',
      sueno: 'Sueno',
      adherencia: 'Adherencia',
      acciones: 'Acciones',
      revisar: 'Revisar',
      sinCheckin: 'Sin check-in esta semana',
      estadisticas: 'Estadisticas del Grupo',
      clientesActivos: 'Clientes Activos',
      avgAdherencia: 'Adherencia Promedio',
      avgEnergia: 'Energia Promedio',
      revisadosHoy: 'Revisados Hoy',
      notasCoach: 'Notas para el cliente',
      guardarNotas: 'Guardar y Marcar Revisado',
      respuestaEnviada: 'Respuesta guardada',
      tendencia: 'Tendencia',
    },
    en: {
      title: 'Client Check-ins',
      subtitle: 'Review weekly progress of your athletes',
      todos: 'All',
      completados: 'Completed',
      pendientes: 'Pending',
      revisados: 'Reviewed',
      buscar: 'Search client...',
      semana: 'Week',
      peso: 'Weight',
      energia: 'Energy',
      sueno: 'Sleep',
      adherencia: 'Adherence',
      acciones: 'Actions',
      revisar: 'Review',
      sinCheckin: 'No check-in this week',
      estadisticas: 'Group Stats',
      clientesActivos: 'Active Clients',
      avgAdherencia: 'Avg Adherence',
      avgEnergia: 'Avg Energy',
      revisadosHoy: 'Reviewed Today',
      notasCoach: 'Notes for client',
      guardarNotas: 'Save & Mark Reviewed',
      respuestaEnviada: 'Response saved',
      tendencia: 'Trend',
    }
  }[lang];

  const filtered = MOCK_CLIENTES.filter(c => {
    if (filter === 'completados') return c.estado === 'completado';
    if (filter === 'pendientes') return c.estado === 'pendiente';
    if (filter === 'revisados') return c.estado === 'revisado';
    return true;
  });

  const completados = MOCK_CLIENTES.filter(c => c.estado === 'completado');
  const avgAdh = completados.length > 0 ? Math.round(completados.reduce((a, c) => a + c.adherencia, 0) / completados.length) : 0;
  const avgEn = completados.length > 0 ? (completados.reduce((a, c) => a + c.energia, 0) / completados.length).toFixed(1) : '0';

  const selectedData = MOCK_CLIENTES.find(c => c.id === selectedClient);

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-[#a78bfa]" />
            {t.title}
          </h1>
          <p className="text-sm text-gray-400">{t.subtitle}</p>
        </div>
        <Badge className="bg-[#6366f1]/20 text-[#a78bfa]">{t.semana} 12</Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon={Users} label={t.clientesActivos} value={MOCK_CLIENTES.length} color="from-[#6366f1] to-[#8b5cf6]" />
        <StatCard icon={CheckCircle} label={t.avgAdherencia} value={`${avgAdh}%`} color="from-emerald-500 to-emerald-600" />
        <StatCard icon={Zap} label={t.avgEnergia} value={`${avgEn}/10`} color="from-amber-500 to-orange-500" />
        <StatCard icon={BarChart3} label={t.revisadosHoy} value="3/5" color="from-sky-500 to-blue-600" />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        {['todos', 'completados', 'pendientes', 'revisados'].map(f => (
          <Button
            key={f}
            size="sm"
            variant={filter === f ? 'default' : 'outline'}
            onClick={() => setFilter(f)}
            className={filter === f ? 'bg-[#6366f1] text-white' : 'border-[#333] text-gray-400 hover:bg-[#1a1a2e]'}
          >
            {t[f as keyof typeof t]}
          </Button>
        ))}
        <div className="ml-auto flex items-center gap-2 bg-[#1a1a2e] border border-[#333] rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input placeholder={t.buscar} className="bg-transparent text-sm text-white placeholder:text-gray-600 focus:outline-none w-48" />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Lista de clientes */}
        <div className="col-span-2 space-y-3">
          {filtered.map(client => (
            <Card
              key={client.id}
              className={`bg-[#0a0a0a]/80 border-[#333] cursor-pointer transition-all hover:border-[#6366f1]/50 ${
                selectedClient === client.id ? 'border-[#6366f1] ring-1 ring-[#6366f1]/20' : ''
              }`}
              onClick={() => setSelectedClient(client.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a78bfa] flex items-center justify-center text-white font-bold text-sm">
                    {client.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">{client.nombre}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-[10px] ${
                        client.estado === 'completado' ? 'bg-emerald-500/20 text-emerald-400' :
                        client.estado === 'pendiente' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-[#6366f1]/20 text-[#a78bfa]'
                      }`}>
                        {t[client.estado as keyof typeof t] || client.estado}
                      </Badge>
                      {client.estado === 'completado' && (
                        <span className="text-[10px] text-gray-500">{t.semana} {client.semana}</span>
                      )}
                    </div>
                  </div>
                  {client.estado === 'completado' && (
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Scale className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-white font-mono">{client.peso}kg</span>
                      </div>
                      <span className={`text-[10px] font-mono ${client.pesoCambio < 0 ? 'text-emerald-400' : client.pesoCambio > 0 ? 'text-red-400' : 'text-gray-500'}`}>
                        {client.pesoCambio > 0 ? '+' : ''}{client.pesoCambio}kg
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detalle del cliente seleccionado */}
        <div className="col-span-3">
          {selectedData ? (
            selectedData.estado === 'completado' ? (
              <Card className="bg-[#0a0a0a]/80 border-[#333] h-full">
                <CardHeader className="border-b border-[#333] pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6366f1] to-[#a78bfa] flex items-center justify-center text-white font-bold">
                        {selectedData.avatar}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white">{selectedData.nombre}</h2>
                        <p className="text-xs text-gray-400">{t.semana} {selectedData.semana} | {t.peso}: {selectedData.peso}kg</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400">{t.completados}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Metricas */}
                  <div className="grid grid-cols-3 gap-4">
                    <MetricCircle icon={Zap} label={t.energia} value={selectedData.energia} max={10} color="#a78bfa" />
                    <MetricCircle icon={Moon} label={t.sueno} value={selectedData.sueno} max={10} color="#6366f1" />
                    <MetricCircle icon={CheckCircle} label={t.adherencia} value={selectedData.adherencia} max={100} color="#10b981" suffix="%" />
                  </div>

                  {/* Adherencia por categoria */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white">{t.adherencia} por Categoria</h3>
                    <AdherenceBar icon={Utensils} label="Dieta" value={88} />
                    <AdherenceBar icon={Dumbbell} label="Entrenamiento" value={92} />
                    <AdherenceBar icon={Bed} label="Sueno" value={75} />
                  </div>

                  {/* Notas del cliente */}
                  <div className="bg-[#1a1a2e] rounded-lg p-4 border border-[#333]">
                    <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#a78bfa]" />
                      {isEn ? 'Client Notes' : 'Notas del Cliente'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {isEn ? 'I felt great this week. Sleep was better after reducing caffeine. Training intensity maintained.' : 'Me senti muy bien esta semana. El sueno mejoro despues de reducir cafeina. Mantuve la intensidad de entrenamiento.'}
                    </p>
                  </div>

                  {/* Respuesta del coach */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white">{t.notasCoach}</h3>
                    <textarea
                      value={notasCoach}
                      onChange={e => setNotasCoach(e.target.value)}
                      placeholder={isEn ? 'Write your feedback for the client...' : 'Escribe tu retroalimentacion para el cliente...'}
                      rows={4}
                      className="w-full bg-[#1a1a2e] border border-[#333] rounded-lg p-3 text-white placeholder:text-gray-600 focus:border-[#6366f1] focus:outline-none resize-none text-sm"
                    />
                    <Button 
                      onClick={() => setNotasCoach('')}
                      className="bg-gradient-to-r from-[#6366f1] to-[#a78bfa] hover:opacity-90 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {t.guardarNotas}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-[#0a0a0a]/80 border-[#333] h-full flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <Clock className="w-16 h-16 text-amber-500/30 mx-auto" />
                  <h3 className="text-lg font-semibold text-white">{t.sinCheckin}</h3>
                  <p className="text-sm text-gray-400">{isEn ? 'The client has not submitted their weekly check-in yet.' : 'El cliente aun no ha enviado su check-in semanal.'}</p>
                </div>
              </Card>
            )
          ) : (
            <Card className="bg-[#0a0a0a]/80 border-[#333] h-full flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <Users className="w-16 h-16 text-[#6366f1]/20 mx-auto" />
                <h3 className="text-lg font-semibold text-white">{isEn ? 'Select a client' : 'Selecciona un cliente'}</h3>
                <p className="text-sm text-gray-400">{isEn ? 'Click on a client to review their check-in.' : 'Haz clic en un cliente para revisar su check-in.'}</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: string | number, color: string }) {
  return (
    <Card className="bg-[#0a0a0a]/80 border-[#333] overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MetricCircle({ icon: Icon, label, value, max, color, suffix = '' }: any) {
  const pct = (value / max) * 100;
  return (
    <div className="bg-[#1a1a2e] rounded-lg p-4 text-center border border-[#333]">
      <Icon className="w-5 h-5 mx-auto mb-2" style={{ color }} />
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}{suffix}</p>
      <div className="mt-2 h-1.5 bg-[#333] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function AdherenceBar({ icon: Icon, label, value }: { icon: any, label: string, value: number }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-gray-400" />
      <span className="text-xs text-gray-400 w-24">{label}</span>
      <div className="flex-1 h-2 bg-[#333] rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#a78bfa]" 
          style={{ width: `${value}%` }} 
        />
      </div>
      <span className="text-xs text-white font-mono w-8 text-right">{value}%</span>
    </div>
  );
}
