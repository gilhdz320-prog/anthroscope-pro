import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Clock, Video, FileText, Trash2, ChevronLeft, ChevronRight, Plus, Bell, Mail, Phone, X, Check } from 'lucide-react';
import { toast } from 'sonner';

export interface Cita {
  id: string;
  pacienteNombre: string;
  pacienteEmail: string;
  pacienteTelefono?: string;
  fecha: string; // YYYY-MM-DD
  horaInicio: string; // HH:MM
  horaFin: string; // HH:MM
  tipo: 'primera-vez' | 'seguimiento' | 'evaluacion-isak' | 'plan-nutricion' | 'revision' | 'otra';
  meetLink?: string;
  notasPre?: string;
  notasPost?: string;
  recordatorio24h: boolean;
  recordatorio1h: boolean;
  estado: 'programada' | 'completada' | 'cancelada' | 'no-show';
  createdAt: string;
}

const TIPOS_CITA = {
  'primera-vez': { label: 'Primera vez', color: 'bg-[#c8ff00]/20 text-[#c8ff00]' },
  'seguimiento': { label: 'Seguimiento', color: 'bg-blue-500/20 text-blue-400' },
  'evaluacion-isak': { label: 'Evaluación ISAK', color: 'bg-purple-500/20 text-purple-400' },
  'plan-nutricion': { label: 'Plan Nutrición', color: 'bg-orange-500/20 text-orange-400' },
  'revision': { label: 'Revisión', color: 'bg-green-500/20 text-green-400' },
  'otra': { label: 'Otra', color: 'bg-gray-500/20 text-gray-400' },
};

function generarMeetLink(): string {
  // Genera un link tipo Google Meet simulado
  // En producción real se usaría Google Calendar API
  const code = Math.random().toString(36).substring(2, 12);
  return `https://meet.google.com/${code}`;
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

function generateId(): string {
  return 'cita_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
}

export function CitasPanel() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language.startsWith('en');

  const [citas, setCitas] = useState<Cita[]>(() => {
    const saved = localStorage.getItem('anthroscope_citas');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCita, setEditingCita] = useState<Cita | null>(null);

  // Form state
  const [formPaciente, setFormPaciente] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formTelefono, setFormTelefono] = useState('');
  const [formFecha, setFormFecha] = useState('');
  const [formHoraInicio, setFormHoraInicio] = useState('09:00');
  const [formHoraFin, setFormHoraFin] = useState('10:00');
  const [formTipo, setFormTipo] = useState<Cita['tipo']>('seguimiento');
  const [formNotasPre, setFormNotasPre] = useState('');
  const [formRecordatorio24h, setFormRecordatorio24h] = useState(true);
  const [formRecordatorio1h, setFormRecordatorio1h] = useState(true);
  const [formEstado, setFormEstado] = useState<Cita['estado']>('programada');

  // Persist
  useEffect(() => {
    localStorage.setItem('anthroscope_citas', JSON.stringify(citas));
  }, [citas]);

  // Calendar helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDay = firstDayOfMonth.getDay(); // 0 = Sunday
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = isEn
    ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const dayNames = isEn
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const citasDelMes = useMemo(() => {
    return citas.filter(c => {
      const d = new Date(c.fecha);
      return d.getFullYear() === year && d.getMonth() === month && c.estado !== 'cancelada';
    });
  }, [citas, year, month]);

  const citasHoy = useMemo(() => {
    const hoy = new Date().toISOString().split('T')[0];
    return citas.filter(c => c.fecha === hoy && c.estado === 'programada').sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));
  }, [citas]);

  const citasProximas = useMemo(() => {
    const hoy = new Date().toISOString().split('T')[0];
    return citas
      .filter(c => c.fecha >= hoy && c.estado === 'programada')
      .sort((a, b) => (a.fecha + a.horaInicio).localeCompare(b.fecha + b.horaInicio))
      .slice(0, 10);
  }, [citas]);

  function openNewCita(dateStr?: string) {
    setEditingCita(null);
    setFormPaciente('');
    setFormEmail('');
    setFormTelefono('');
    setFormFecha(dateStr || new Date().toISOString().split('T')[0]);
    setFormHoraInicio('09:00');
    setFormHoraFin('10:00');
    setFormTipo('seguimiento');
    setFormNotasPre('');
    setFormRecordatorio24h(true);
    setFormRecordatorio1h(true);
    setFormEstado('programada');
    setDialogOpen(true);
  }

  function openEditCita(cita: Cita) {
    setEditingCita(cita);
    setFormPaciente(cita.pacienteNombre);
    setFormEmail(cita.pacienteEmail);
    setFormTelefono(cita.pacienteTelefono || '');
    setFormFecha(cita.fecha);
    setFormHoraInicio(cita.horaInicio);
    setFormHoraFin(cita.horaFin);
    setFormTipo(cita.tipo);
    setFormNotasPre(cita.notasPre || '');
    setFormRecordatorio24h(cita.recordatorio24h);
    setFormRecordatorio1h(cita.recordatorio1h);
    setFormEstado(cita.estado);
    setDialogOpen(true);
  }

  function saveCita() {
    if (!formPaciente.trim() || !formEmail.trim() || !formFecha) {
      toast.error(isEn ? 'Name, email and date are required' : 'Nombre, email y fecha son obligatorios');
      return;
    }

    const citaData: Cita = {
      id: editingCita?.id || generateId(),
      pacienteNombre: formPaciente.trim(),
      pacienteEmail: formEmail.trim(),
      pacienteTelefono: formTelefono.trim() || undefined,
      fecha: formFecha,
      horaInicio: formHoraInicio,
      horaFin: formHoraFin,
      tipo: formTipo,
      meetLink: editingCita?.meetLink || generarMeetLink(),
      notasPre: formNotasPre.trim() || undefined,
      notasPost: editingCita?.notasPost,
      recordatorio24h: formRecordatorio24h,
      recordatorio1h: formRecordatorio1h,
      estado: formEstado,
      createdAt: editingCita?.createdAt || new Date().toISOString(),
    };

    if (editingCita) {
      setCitas(prev => prev.map(c => c.id === editingCita.id ? citaData : c));
      toast.success(isEn ? 'Appointment updated' : 'Cita actualizada');
    } else {
      setCitas(prev => [...prev, citaData]);
      toast.success(isEn ? 'Appointment scheduled' : 'Cita programada');
    }

    setDialogOpen(false);
  }

  function deleteCita(id: string) {
    if (confirm(isEn ? 'Delete this appointment?' : '¿Eliminar esta cita?')) {
      setCitas(prev => prev.filter(c => c.id !== id));
      toast.success(isEn ? 'Appointment deleted' : 'Cita eliminada');
    }
  }

  function copiarMeet(link: string) {
    navigator.clipboard.writeText(link);
    toast.success(isEn ? 'Meet link copied!' : '¡Link de Meet copiado!');
  }

  function cambiarEstado(id: string, nuevoEstado: Cita['estado']) {
    setCitas(prev => prev.map(c => c.id === id ? { ...c, estado: nuevoEstado } : c));
  }

  // Calendar grid
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#f0f0f5] flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#c8ff00]" />
            {isEn ? 'Appointments' : 'Citas'}
          </h2>
          <p className="text-sm text-[#8a8d9e] mt-1">
            {isEn ? 'Schedule, manage and track all your patient appointments' : 'Programa, gestiona y da seguimiento a todas tus citas con pacientes'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-[#2a2d3e] text-[#f0f0f5]" onClick={() => setViewMode('month')}>
            {isEn ? 'Month' : 'Mes'}
          </Button>
          <Button variant="outline" size="sm" className="border-[#2a2d3e] text-[#f0f0f5]" onClick={() => setViewMode('list')}>
            {isEn ? 'List' : 'Lista'}
          </Button>
          <Button className="bg-[#c8ff00] text-black hover:bg-[#d4ff33]" onClick={() => openNewCita()}>
            <Plus className="w-4 h-4 mr-1" />
            {isEn ? 'New' : 'Nueva'}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-[#11121a] border-[#2a2d3e]">
          <div className="text-2xl font-black text-[#c8ff00]">{citas.filter(c => c.estado === 'programada').length}</div>
          <div className="text-xs text-[#8a8d9e]">{isEn ? 'Scheduled' : 'Programadas'}</div>
        </Card>
        <Card className="p-4 bg-[#11121a] border-[#2a2d3e]">
          <div className="text-2xl font-black text-green-400">{citas.filter(c => c.estado === 'completada').length}</div>
          <div className="text-xs text-[#8a8d9e]">{isEn ? 'Completed' : 'Completadas'}</div>
        </Card>
        <Card className="p-4 bg-[#11121a] border-[#2a2d3e]">
          <div className="text-2xl font-black text-blue-400">{citasHoy.length}</div>
          <div className="text-xs text-[#8a8d9e]">{isEn ? 'Today' : 'Hoy'}</div>
        </Card>
        <Card className="p-4 bg-[#11121a] border-[#2a2d3e]">
          <div className="text-2xl font-black text-orange-400">{citas.filter(c => c.estado === 'no-show').length}</div>
          <div className="text-xs text-[#8a8d9e]">{isEn ? 'No-shows' : 'No asistieron'}</div>
        </Card>
      </div>

      {/* Today's appointments */}
      {citasHoy.length > 0 && (
        <Card className="p-5 bg-[#11121a] border-[#2a2d3e]">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-[#f0f0f5]">
            <Bell className="w-5 h-5 text-[#c8ff00]" />
            {isEn ? 'Today\'s appointments' : 'Citas de hoy'}
          </h3>
          <div className="space-y-2">
            {citasHoy.map(cita => (
              <div key={cita.id} className="flex items-center justify-between p-3 bg-[#1a1c29] rounded-lg border border-[#2a2d3e]/50 hover:border-[#c8ff00]/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2a2d3e] flex items-center justify-center text-sm font-bold text-[#c8ff00]">
                    {getInitials(cita.pacienteNombre)}
                  </div>
                  <div>
                    <p className="font-semibold text-[#f0f0f5]">{cita.pacienteNombre}</p>
                    <div className="flex items-center gap-2 text-xs text-[#8a8d9e]">
                      <Clock className="w-3 h-3" />
                      {cita.horaInicio} - {cita.horaFin}
                      <Badge className={`${TIPOS_CITA[cita.tipo].color} text-xs`}>{TIPOS_CITA[cita.tipo].label}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {cita.meetLink && (
                    <Button variant="ghost" size="sm" className="text-[#c8ff00] hover:bg-[#c8ff00]/10" onClick={() => copiarMeet(cita.meetLink!)}>
                      <Video className="w-4 h-4 mr-1" /> Meet
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-green-400 hover:bg-green-500/10" onClick={() => cambiarEstado(cita.id, 'completada')}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-[#8a8d9e] hover:text-[#f0f0f5]" onClick={() => openEditCita(cita)}>
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Calendar / List View */}
      {viewMode === 'month' ? (
        <Card className="p-4 md:p-6 bg-[#11121a] border-[#2a2d3e]">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" className="text-[#f0f0f5]" onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h3 className="text-lg font-bold">{monthNames[month]} {year}</h3>
            <Button variant="ghost" size="sm" className="text-[#f0f0f5]" onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(d => (
              <div key={d} className="text-center text-xs text-[#8a8d9e] font-medium py-1">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (!day) return <div key={i} className="aspect-square" />;

              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayCitas = citasDelMes.filter(c => c.fecha === dateStr && c.estado !== 'cancelada');
              const isToday = dateStr === new Date().toISOString().split('T')[0];

              return (
                <div
                  key={i}
                  className={`aspect-square p-1 rounded-lg border cursor-pointer transition-all hover:bg-[#1a1c29] ${
                    isToday ? 'border-[#c8ff00]/50 bg-[#c8ff00]/5' : 'border-[#2a2d3e]/30'
                  }`}
                  onClick={() => openNewCita(dateStr)}
                >
                  <div className={`text-xs font-medium ${isToday ? 'text-[#c8ff00]' : 'text-[#f0f0f5]'}`}>{day}</div>
                  <div className="flex flex-col gap-0.5 mt-0.5">
                    {dayCitas.slice(0, 3).map(c => (
                      <div
                        key={c.id}
                        className={`h-1.5 rounded-full ${c.estado === 'completada' ? 'bg-green-500' : 'bg-[#c8ff00]'}`}
                        title={`${c.pacienteNombre} - ${c.horaInicio}`}
                        onClick={(e) => { e.stopPropagation(); openEditCita(c); }}
                      />
                    ))}
                    {dayCitas.length > 3 && (
                      <div className="text-[8px] text-[#8a8d9e]">+{dayCitas.length - 3}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ) : (
        <Card className="p-4 md:p-6 bg-[#11121a] border-[#2a2d3e]">
          <h3 className="text-lg font-bold mb-4">{isEn ? 'Upcoming appointments' : 'Próximas citas'}</h3>
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {citasProximas.length === 0 ? (
                <p className="text-center text-[#55576b] py-8">{isEn ? 'No upcoming appointments' : 'No hay citas próximas'}</p>
              ) : (
                citasProximas.map(cita => (
                  <div key={cita.id} className="flex items-center justify-between p-3 bg-[#1a1c29] rounded-lg border border-[#2a2d3e]/50">
                    <div className="flex items-center gap-3">
                      <div className="text-center min-w-[48px]">
                        <div className="text-xs text-[#8a8d9e]">{new Date(cita.fecha).toLocaleDateString(isEn ? 'en-US' : 'es-ES', { weekday: 'short' })}</div>
                        <div className="text-lg font-bold text-[#f0f0f5]">{new Date(cita.fecha).getDate()}</div>
                      </div>
                      <div>
                        <p className="font-semibold text-[#f0f0f5]">{cita.pacienteNombre}</p>
                        <div className="flex items-center gap-2 text-xs text-[#8a8d9e]">
                          <Clock className="w-3 h-3" /> {cita.horaInicio} - {cita.horaFin}
                          <Badge className={`${TIPOS_CITA[cita.tipo].color} text-xs`}>{TIPOS_CITA[cita.tipo].label}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {cita.meetLink && (
                        <Button variant="ghost" size="sm" className="text-[#c8ff00] hover:bg-[#c8ff00]/10" onClick={() => copiarMeet(cita.meetLink!)}>
                          <Video className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="text-[#8a8d9e] hover:text-[#f0f0f5]" onClick={() => openEditCita(cita)}>
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:bg-red-500/10" onClick={() => deleteCita(cita.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </Card>
      )}

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#11121a] border-[#2a2d3e] text-[#f0f0f5] max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#f0f0f5]">
              {editingCita ? (isEn ? 'Edit appointment' : 'Editar cita') : (isEn ? 'New appointment' : 'Nueva cita')}
            </DialogTitle>
            <DialogDescription className="text-[#8a8d9e]">
              {isEn ? 'Schedule a video consultation with your patient' : 'Programa una consulta por video con tu paciente'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm text-[#8a8d9e] mb-1 block">{isEn ? 'Patient name' : 'Nombre del paciente'} *</label>
              <Input value={formPaciente} onChange={e => setFormPaciente(e.target.value)} placeholder={isEn ? 'Ej. Ana López' : 'Ej. Ana López'} className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-[#8a8d9e] mb-1 block">Email *</label>
                <Input value={formEmail} onChange={e => setFormEmail(e.target.value)} placeholder="paciente@email.com" className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" />
              </div>
              <div>
                <label className="text-sm text-[#8a8d9e] mb-1 block">{isEn ? 'Phone' : 'Teléfono'}</label>
                <Input value={formTelefono} onChange={e => setFormTelefono(e.target.value)} placeholder="+52 55 1234 5678" className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-[#8a8d9e] mb-1 block">{isEn ? 'Date' : 'Fecha'} *</label>
                <Input type="date" value={formFecha} onChange={e => setFormFecha(e.target.value)} className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" />
              </div>
              <div>
                <label className="text-sm text-[#8a8d9e] mb-1 block">{isEn ? 'Start' : 'Inicio'} *</label>
                <Input type="time" value={formHoraInicio} onChange={e => setFormHoraInicio(e.target.value)} className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" />
              </div>
              <div>
                <label className="text-sm text-[#8a8d9e] mb-1 block">{isEn ? 'End' : 'Fin'} *</label>
                <Input type="time" value={formHoraFin} onChange={e => setFormHoraFin(e.target.value)} className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#8a8d9e] mb-1 block">{isEn ? 'Type' : 'Tipo'}</label>
              <Select value={formTipo} onValueChange={v => setFormTipo(v as Cita['tipo'])}>
                <SelectTrigger className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1c29] border-[#2a2d3e]">
                  {Object.entries(TIPOS_CITA).map(([key, val]) => (
                    <SelectItem key={key} value={key} className="text-[#f0f0f5]">{val.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {editingCita?.meetLink && (
              <div className="p-3 bg-[#c8ff00]/5 border border-[#c8ff00]/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-[#c8ff00]" />
                    <span className="text-sm text-[#f0f0f5]">Google Meet</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#c8ff00] hover:bg-[#c8ff00]/10" onClick={() => copiarMeet(editingCita.meetLink!)}>
                    <Mail className="w-4 h-4 mr-1" /> {isEn ? 'Copy' : 'Copiar'}
                  </Button>
                </div>
                <p className="text-xs text-[#8a8d9e] mt-1 truncate">{editingCita.meetLink}</p>
              </div>
            )}

            <div>
              <label className="text-sm text-[#8a8d9e] mb-1 block">{isEn ? 'Pre-session notes' : 'Notas previas'}</label>
              <Textarea value={formNotasPre} onChange={e => setFormNotasPre(e.target.value)} placeholder={isEn ? 'Goals, concerns, previous measurements...' : 'Objetivos, preocupaciones, mediciones previas...'} className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]" rows={3} />
            </div>

            {editingCita && (
              <div>
                <label className="text-sm text-[#8a8d9e] mb-1 block">{isEn ? 'Post-session notes' : 'Notas post-sesión'}</label>
                <Textarea
                  value={formEstado === 'completada' ? (editingCita.notasPost || '') : ''}
                  onChange={e => {
                    const val = e.target.value;
                    setCitas(prev => prev.map(c => c.id === editingCita.id ? { ...c, notasPost: val } : c));
                  }}
                  placeholder={isEn ? 'Session summary, action items, next steps...' : 'Resumen de sesión, acciones, próximos pasos...'}
                  className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]"
                  rows={3}
                  disabled={formEstado !== 'completada'}
                />
              </div>
            )}

            <div>
              <label className="text-sm text-[#8a8d9e] mb-1 block">{isEn ? 'Status' : 'Estado'}</label>
              <Select value={formEstado} onValueChange={v => setFormEstado(v as Cita['estado'])}>
                <SelectTrigger className="bg-[#1a1c29] border-[#2a2d3e] text-[#f0f0f5]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1c29] border-[#2a2d3e]">
                  <SelectItem value="programada" className="text-[#f0f0f5]">{isEn ? 'Scheduled' : 'Programada'}</SelectItem>
                  <SelectItem value="completada" className="text-[#f0f0f5]">{isEn ? 'Completed' : 'Completada'}</SelectItem>
                  <SelectItem value="cancelada" className="text-[#f0f0f5]">{isEn ? 'Cancelled' : 'Cancelada'}</SelectItem>
                  <SelectItem value="no-show" className="text-[#f0f0f5]">{isEn ? 'No-show' : 'No asistió'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-[#8a8d9e] cursor-pointer">
                <input type="checkbox" checked={formRecordatorio24h} onChange={e => setFormRecordatorio24h(e.target.checked)} className="accent-[#c8ff00]" />
                <Bell className="w-3 h-3" /> {isEn ? 'Reminder 24h' : 'Recordatorio 24h'}
              </label>
              <label className="flex items-center gap-2 text-sm text-[#8a8d9e] cursor-pointer">
                <input type="checkbox" checked={formRecordatorio1h} onChange={e => setFormRecordatorio1h(e.target.checked)} className="accent-[#c8ff00]" />
                <Bell className="w-3 h-3" /> {isEn ? 'Reminder 1h' : 'Recordatorio 1h'}
              </label>
            </div>
          </div>

          <DialogFooter>
            {editingCita && (
              <Button variant="ghost" className="text-red-400 hover:bg-red-500/10 mr-auto" onClick={() => { deleteCita(editingCita.id); setDialogOpen(false); }}>
                <Trash2 className="w-4 h-4 mr-1" /> {isEn ? 'Delete' : 'Eliminar'}
              </Button>
            )}
            <Button variant="outline" className="border-[#2a2d3e] text-[#f0f0f5]" onClick={() => setDialogOpen(false)}>
              <X className="w-4 h-4 mr-1" /> {isEn ? 'Cancel' : 'Cancelar'}
            </Button>
            <Button className="bg-[#c8ff00] text-black hover:bg-[#d4ff33]" onClick={saveCita}>
              <Check className="w-4 h-4 mr-1" />
              {editingCita ? (isEn ? 'Update' : 'Actualizar') : (isEn ? 'Schedule' : 'Programar')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
