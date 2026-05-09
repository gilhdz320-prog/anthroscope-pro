import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import {
  Watch, Smartphone, Activity, Heart, Footprints, Timer,
  Moon, TrendingUp, Zap, Bluetooth, CircleDot, Flame,
  ChevronRight, RotateCw, BluetoothConnected, BluetoothOff
} from 'lucide-react';

const DISPOSITIVOS = [
  { id: 'google_fit', nombre: 'Google Fit', icono: Smartphone, color: '#4285F4', conectado: false },
  { id: 'fitbit', nombre: 'Fitbit', icono: Watch, color: '#00B0B9', conectado: false },
  { id: 'apple_health', nombre: 'Apple Health', icono: Heart, color: '#FF3B30', conectado: false },
  { id: 'garmin', nombre: 'Garmin', icono: Watch, color: '#007CC3', conectado: false },
  { id: 'samsung_health', nombre: 'Samsung Health', icono: Smartphone, color: '#1428A0', conectado: false },
];

const MOCK_HISTORY = [
  { fecha: '2026-05-09', pasos: 8432, calorias: 2150, fcPromedio: 72, sueno: 7.5, activo: 45 },
  { fecha: '2026-05-08', pasos: 10210, calorias: 2380, fcPromedio: 75, sueno: 6.5, activo: 62 },
  { fecha: '2026-05-07', pasos: 7650, calorias: 1980, fcPromedio: 70, sueno: 8.0, activo: 38 },
  { fecha: '2026-05-06', pasos: 9100, calorias: 2250, fcPromedio: 73, sueno: 7.0, activo: 55 },
  { fecha: '2026-05-05', pasos: 11500, calorias: 2600, fcPromedio: 78, sueno: 6.0, activo: 78 },
  { fecha: '2026-05-04', pasos: 6200, calorias: 1850, fcPromedio: 68, sueno: 8.5, activo: 30 },
  { fecha: '2026-05-03', pasos: 9800, calorias: 2300, fcPromedio: 74, sueno: 7.2, activo: 58 },
];

export default function WearablesPanel() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'es';
  const isEn = lang === 'en';

  const [dispositivos, setDispositivos] = useState(DISPOSITIVOS);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);

  // Cargar estado de conexion guardado
  useEffect(() => {
    const saved = localStorage.getItem('wearablesConnected');
    if (saved) {
      try {
        const connected = JSON.parse(saved);
        setDispositivos(prev => prev.map(d => ({
          ...d,
          conectado: connected.includes(d.id)
        })));
      } catch { /* ignore */ }
    }
    const last = localStorage.getItem('wearablesLastSync');
    if (last) setLastSync(last);
  }, []);

  const conectar = (id: string) => {
    // Simulamos el flujo OAuth
    setDispositivos(prev => prev.map(d =>
      d.id === id ? { ...d, conectado: true } : d
    ));
    const connected = dispositivos.filter(d => d.id === id || d.conectado).map(d => d.id);
    localStorage.setItem('wearablesConnected', JSON.stringify([...new Set([...connected, id])]));
  };

  const desconectar = (id: string) => {
    setDispositivos(prev => prev.map(d =>
      d.id === id ? { ...d, conectado: false } : d
    ));
    const connected = dispositivos.filter(d => d.conectado && d.id !== id).map(d => d.id);
    localStorage.setItem('wearablesConnected', JSON.stringify(connected));
  };

  const sincronizar = async () => {
    setSyncing(true);
    await new Promise(r => setTimeout(r, 2000));
    const now = new Date().toLocaleString(isEn ? 'en-US' : 'es-MX');
    setLastSync(now);
    localStorage.setItem('wearablesLastSync', now);
    setSyncing(false);
  };

  const conectados = dispositivos.filter(d => d.conectado);
  const totalPasos = MOCK_HISTORY.reduce((a, r) => a + r.pasos, 0);
  const avgPasos = Math.round(totalPasos / MOCK_HISTORY.length);
  const totalCalorias = MOCK_HISTORY.reduce((a, r) => a + r.calorias, 0);
  const avgSueno = (MOCK_HISTORY.reduce((a, r) => a + r.sueno, 0) / MOCK_HISTORY.length).toFixed(1);
  const maxPasos = Math.max(...MOCK_HISTORY.map(r => r.pasos));
  const maxCalorias = Math.max(...MOCK_HISTORY.map(r => r.calorias));

  const t = {
    es: {
      title: 'Wearables & Actividad', subtitle: 'Conecta tu dispositivo para seguimiento automatico',
      conectar: 'Conectar', desconectar: 'Desconectar', sincronizar: 'Sincronizar ahora',
      syncing: 'Sincronizando...', lastSync: 'Ultima sincronizacion', noDevices: 'Ningun dispositivo conectado',
      resumen: 'Resumen Semanal', pasos: 'Pasos Promedio', calorias: 'Calorias Promedio',
      sueno: 'Sueno Promedio', activo: 'Minutos Activos', ritmo: 'Ritmo Cardiaco',
      semana: 'Historial Semanal', dispositivos: 'Dispositivos', comoConectar: 'Como conectar',
      connectInfo: 'Haz clic en "Conectar" y autoriza a Anthroscope para acceder a tus datos.',
    },
    en: {
      title: 'Wearables & Activity', subtitle: 'Connect your device for automatic tracking',
      conectar: 'Connect', desconectar: 'Disconnect', sincronizar: 'Sync now',
      syncing: 'Syncing...', lastSync: 'Last sync', noDevices: 'No device connected',
      resumen: 'Weekly Summary', pasos: 'Avg Steps', calorias: 'Avg Calories',
      sueno: 'Avg Sleep', activo: 'Active Minutes', ritmo: 'Heart Rate',
      semana: 'Weekly History', dispositivos: 'Devices', comoConectar: 'How to connect',
      connectInfo: 'Click "Connect" and authorize Anthroscope to access your data.',
    }
  }[lang];

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Watch className="w-6 h-6 text-[#a78bfa]" />
            {t.title}
          </h1>
          <p className="text-sm text-gray-400">{t.subtitle}</p>
        </div>
        {conectados.length > 0 && (
          <Button
            onClick={sincronizar}
            disabled={syncing}
            className="bg-[#6366f1] hover:bg-[#5a5fdf] text-white"
          >
            {syncing ? <><RotateCw className="w-4 h-4 mr-2 animate-spin" />{t.syncing}</>
              : <><RotateCw className="w-4 h-4 mr-2" />{t.sincronizar}</>}
          </Button>
        )}
      </div>

      {conectados.length > 0 && lastSync && (
        <p className="text-xs text-gray-500">{t.lastSync}: {lastSync}</p>
      )}

      {/* Stats Cards */}
      {conectados.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Footprints} label={t.pasos} value={avgPasos.toLocaleString()} unit="/dia" color="from-[#6366f1] to-[#8b5cf6]" />
          <StatCard icon={Flame} label={t.calorias} value={Math.round(totalCalorias / 7).toLocaleString()} unit="kcal/dia" color="from-orange-500 to-red-500" />
          <StatCard icon={Moon} label={t.sueno} value={avgSueno} unit="h/dia" color="from-indigo-500 to-purple-500" />
          <StatCard icon={Heart} label={t.ritmo} value={"72"} unit="bpm" color="from-pink-500 to-rose-500" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Devices Column */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-white">{t.dispositivos}</h2>
          {dispositivos.map(dev => {
            const Icon = dev.icono;
            return (
              <Card key={dev.id} className={`bg-[#0a0a0a]/80 border-[#333] overflow-hidden ${dev.conectado ? 'border-l-4' : ''}`}
                style={dev.conectado ? { borderLeftColor: dev.color } : {}}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: dev.color + '20' }}>
                      <Icon className="w-5 h-5" style={{ color: dev.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-white">{dev.nombre}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        {dev.conectado ? (
                          <><BluetoothConnected className="w-3 h-3 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400">{isEn ? 'Connected' : 'Conectado'}</span></>
                        ) : (
                          <><BluetoothOff className="w-3 h-3 text-gray-500" />
                          <span className="text-[10px] text-gray-500">{isEn ? 'Disconnected' : 'Desconectado'}</span></>
                        )}
                      </div>
                    </div>
                    {dev.conectado ? (
                      <Button size="sm" variant="outline" onClick={() => desconectar(dev.id)}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs">
                        {t.desconectar}
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => conectar(dev.id)}
                        className="bg-[#6366f1] hover:bg-[#5a5fdf] text-white text-xs">
                        {t.conectar}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {conectados.length === 0 && (
            <Card className="bg-[#0a0a0a]/80 border-[#333]">
              <CardContent className="p-6 text-center space-y-3">
                <BluetoothOff className="w-12 h-12 text-gray-600 mx-auto" />
                <h3 className="text-sm font-semibold text-gray-400">{t.noDevices}</h3>
                <p className="text-xs text-gray-600">{t.connectInfo}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Activity Column */}
        <div className="lg:col-span-2 space-y-4">
          {conectados.length > 0 ? (
            <>
              <h2 className="text-lg font-semibold text-white">{t.semana}</h2>
              <div className="space-y-3">
                {MOCK_HISTORY.map((dia, i) => (
                  <Card key={dia.fecha} className="bg-[#0a0a0a]/80 border-[#333]">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {new Date(dia.fecha).toLocaleDateString(isEn ? 'en-US' : 'es-MX', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </span>
                          {i === 0 && <Badge className="bg-[#6366f1]/20 text-[#a78bfa] text-[10px]">{isEn ? 'Today' : 'Hoy'}</Badge>}
                        </div>
                        <div className="flex items-center gap-1">
                          <CircleDot className="w-3 h-3 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400">{dia.activo} min activo</span>
                        </div>
                      </div>

                      {/* Progress bars */}
                      <div className="grid grid-cols-3 gap-4">
                        <MetricBar icon={Footprints} label={isEn ? 'Steps' : 'Pasos'} value={dia.pasos} max={maxPasos} color="#6366f1" />
                        <MetricBar icon={Flame} label={isEn ? 'Cal' : 'Kcal'} value={dia.calorias} max={maxCalorias} color="#f97316" />
                        <MetricBar icon={Heart} label="FC" value={dia.fcPromedio} max={120} color="#ec4899" />
                      </div>

                      {/* Sleep */}
                      <div className="mt-3 flex items-center gap-2">
                        <Moon className="w-3 h-3 text-indigo-400" />
                        <div className="flex-1 h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.min((dia.sueno / 10) * 100, 100)}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-400">{dia.sueno}h</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card className="bg-[#0a0a0a]/80 border-[#333] h-full flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <Activity className="w-16 h-16 text-[#6366f1]/20 mx-auto" />
                <h3 className="text-lg font-semibold text-white">{isEn ? 'Connect a device' : 'Conecta un dispositivo'}</h3>
                <p className="text-sm text-gray-400 max-w-sm">
                  {isEn
                    ? 'Connect your smartwatch or fitness tracker to see your activity data here. We support Google Fit, Fitbit, Apple Health, Garmin, and Samsung Health.'
                    : 'Conecta tu smartwatch o rastreador de fitness para ver tus datos de actividad aqui. Soportamos Google Fit, Fitbit, Apple Health, Garmin y Samsung Health.'}
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  {['Google Fit', 'Fitbit', 'Apple Watch', 'Garmin'].map(d => (
                    <Badge key={d} className="bg-[#1a1a2e] text-gray-400 border-[#333]">{d}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, unit, color }: { icon: any, label: string, value: string, unit: string, color: string }) {
  return (
    <Card className="bg-[#0a0a0a]/80 border-[#333] overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="text-xl font-bold text-white">{value}</p>
            <p className="text-[10px] text-gray-500">{unit}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MetricBar({ icon: Icon, label, value, max, color }: { icon: any, label: string, value: number, max: number, color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Icon className="w-3 h-3" style={{ color }} />
          <span className="text-[10px] text-gray-400">{label}</span>
        </div>
        <span className="text-[10px] text-white font-mono">{value.toLocaleString()}</span>
      </div>
      <div className="h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
