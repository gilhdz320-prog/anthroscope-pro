import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import {
  EJERCICIOS, CATEGORIAS, buscarEjercicios, getEjerciciosByCategoria
} from '@/data/ejercicios';
import type { Ejercicio } from '@/data/ejercicios';
import {
  Search, X, ChevronRight, Dumbbell, Heart, Star, Info,
  ArrowUp, ArrowDown, Activity, Zap, Trophy, Move,
  Flame, Timer, Layers, Filter
} from 'lucide-react';

const CAT_ICONS: Record<string, any> = {
  empuje: ArrowUp, traccion: ArrowDown, piernas: Activity, core: Layers,
  cardio: Flame, olimpico: Trophy, movilidad: Move,
};

const DIF_COLORS: Record<string, string> = {
  principiante: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  intermedio: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  avanzado: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function BibliotecaEjercicios() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'es';
  const isEn = lang === 'en';

  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('todos');
  const [difFilter, setDifFilter] = useState('todos');
  const [selected, setSelected] = useState<Ejercicio | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('favExercises');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const t = {
    es: {
      title: 'Biblioteca de Ejercicios', subtitle: `${EJERCICIOS.length} ejercicios con demostracion en video`,
      search: 'Buscar ejercicio, musculo o equipo...', todos: 'Todos', favoritos: 'Favoritos',
      dificultad: 'Dificultad', principiante: 'Principiante', intermedio: 'Intermedio', avanzado: 'Avanzado',
      musculos: 'Musculos', equipo: 'Equipo', instrucciones: 'Instrucciones', consejos: 'Consejos del Coach',
      addFav: 'Agregar a favoritos', removeFav: 'Quitar de favoritos', noResults: 'No se encontraron ejercicios',
      detalle: 'Ver detalle', reps: 'Recomendado: 3-4 series x 8-12 reps',
    },
    en: {
      title: 'Exercise Library', subtitle: `${EJERCICIOS.length} exercises with video demo`,
      search: 'Search exercise, muscle or equipment...', todos: 'All', favoritos: 'Favorites',
      dificultad: 'Difficulty', principiante: 'Beginner', intermedio: 'Intermediate', avanzado: 'Advanced',
      musculos: 'Muscles', equipo: 'Equipment', instrucciones: 'Instructions', consejos: 'Coach Tips',
      addFav: 'Add to favorites', removeFav: 'Remove from favorites', noResults: 'No exercises found',
      detalle: 'View details', reps: 'Recommended: 3-4 sets x 8-12 reps',
    }
  }[lang];

  const filtered = useMemo(() => {
    let result = EJERCICIOS;
    if (search.trim()) result = buscarEjercicios(search);
    if (catFilter !== 'todos') result = result.filter(e => e.categoria === catFilter);
    if (catFilter === 'favoritos') result = result.filter(e => favorites.has(e.id));
    if (difFilter !== 'todos') result = result.filter(e => e.dificultad === difFilter || e.dificultadEn === difFilter);
    return result;
  }, [search, catFilter, difFilter, favorites]);

  const toggleFav = (id: string) => {
    const next = new Set(favorites);
    if (next.has(id)) next.delete(id); else next.add(id);
    setFavorites(next);
    localStorage.setItem('favExercises', JSON.stringify([...next]));
  };

  return (
    <div className="max-w-7xl mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
          <Dumbbell className="w-8 h-8 text-[#a78bfa]" />
          {t.title}
        </h1>
        <p className="text-sm text-gray-400">{t.subtitle}</p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-2 bg-[#1a1a2e] border border-[#333] rounded-xl px-4 py-3">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder={t.search}
            className="flex-1 bg-transparent text-white placeholder:text-gray-600 focus:outline-none"
          />
          {search && <X className="w-4 h-4 text-gray-500 cursor-pointer" onClick={() => setSearch('')} />}
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          size="sm" variant={catFilter === 'todos' ? 'default' : 'outline'}
          onClick={() => setCatFilter('todos')}
          className={catFilter === 'todos' ? 'bg-[#6366f1] text-white' : 'border-[#333] text-gray-400'}
        >
          {t.todos} ({EJERCICIOS.length})
        </Button>
        {CATEGORIAS.map(cat => {
          const Icon = CAT_ICONS[cat.id] || Zap;
          return (
            <Button
              key={cat.id} size="sm" variant={catFilter === cat.id ? 'default' : 'outline'}
              onClick={() => setCatFilter(cat.id)}
              className={catFilter === cat.id ? 'bg-[#6366f1] text-white' : 'border-[#333] text-gray-400'}
            >
              <Icon className="w-3.5 h-3.5 mr-1" />
              {isEn ? cat.labelEn : cat.label} ({cat.count})
            </Button>
          );
        })}
        <Button
          size="sm" variant={catFilter === 'favoritos' ? 'default' : 'outline'}
          onClick={() => setCatFilter('favoritos')}
          className={catFilter === 'favoritos' ? 'bg-pink-500 text-white' : 'border-[#333] text-gray-400'}
        >
          <Heart className="w-3.5 h-3.5 mr-1" />
          {t.favoritos} ({favorites.size})
        </Button>
      </div>

      {/* Difficulty Filters */}
      <div className="flex gap-2 justify-center">
        {(['todos', 'principiante', 'intermedio', 'avanzado'] as const).map(d => (
          <Button
            key={d} size="sm" variant={difFilter === d ? 'default' : 'outline'}
            onClick={() => setDifFilter(d)}
            className={difFilter === d && d !== 'todos' ? DIF_COLORS[d] : difFilter === d ? 'bg-[#6366f1] text-white' : 'border-[#333] text-gray-400'}
          >
            {d === 'todos' ? t.dificultad : t[d]}
          </Button>
        ))}
      </div>

      {/* Exercise Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">{t.noResults}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(ej => (
            <Card key={ej.id} className="bg-[#0a0a0a]/80 border-[#333] overflow-hidden group hover:border-[#6366f1]/50 transition-all cursor-pointer"
              onClick={() => setSelected(ej)}>
              {/* GIF */}
              <div className="relative aspect-video bg-[#1a1a2e] overflow-hidden">
                <img
                  src={ej.gifUrl}
                  alt={isEn ? ej.name : ej.nombre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225/1a1a2e/6366f1?text=' + encodeURIComponent(isEn ? ej.name : ej.nombre); }}
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Badge className={DIF_COLORS[ej.dificultad] + ' text-[10px]'}>
                    {isEn ? ej.dificultadEn : ej.dificultad}
                  </Badge>
                </div>
                <button
                  onClick={(ev) => { ev.stopPropagation(); toggleFav(ej.id); }}
                  className="absolute top-2 left-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${favorites.has(ej.id) ? 'fill-pink-500 text-pink-500' : 'text-white'}`} />
                </button>
              </div>

              <CardContent className="p-4 space-y-2">
                <h3 className="font-semibold text-white text-sm">{isEn ? ej.name : ej.nombre}</h3>
                <div className="flex flex-wrap gap-1">
                  {(isEn ? ej.muscles : ej.musculos).slice(0, 3).map(m => (
                    <span key={m} className="text-[10px] bg-[#1a1a2e] text-gray-400 px-2 py-0.5 rounded-full">{m}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{isEn ? ej.equipment : ej.equipo}</span>
                  <ChevronRight className="w-4 h-4 text-[#6366f1]" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setSelected(null)}>
          <div className="bg-[#0a0a0a] border border-[#333] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="relative aspect-video bg-[#1a1a2e]">
              <img
                src={selected.gifUrl}
                alt={isEn ? selected.name : selected.nombre}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450/1a1a2e/6366f1?text=' + encodeURIComponent(isEn ? selected.name : selected.nombre); }}
              />
              <button onClick={() => setSelected(null)} className="absolute top-3 right-3 p-2 bg-black/60 rounded-full text-white hover:bg-black/80">
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-3 flex gap-2">
                <Badge className={DIF_COLORS[selected.dificultad]}>
                  {isEn ? selected.dificultadEn : selected.dificultad}
                </Badge>
                <Badge className="bg-[#6366f1]/20 text-[#a78bfa]">
                  {isEn ? selected.categoriaLabelEn : selected.categoriaLabel}
                </Badge>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{isEn ? selected.name : selected.nombre}</h2>
                <Button
                  size="sm"
                  variant={favorites.has(selected.id) ? 'default' : 'outline'}
                  onClick={() => toggleFav(selected.id)}
                  className={favorites.has(selected.id) ? 'bg-pink-500 text-white' : 'border-[#333] text-gray-400'}
                >
                  <Heart className={`w-4 h-4 mr-1 ${favorites.has(selected.id) ? 'fill-white' : ''}`} />
                  {favorites.has(selected.id) ? t.removeFav : t.addFav}
                </Button>
              </div>

              {/* Musculos */}
              <div>
                <h3 className="text-sm font-semibold text-[#a78bfa] mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />{t.musculos}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(isEn ? selected.muscles : selected.musculos).map(m => (
                    <Badge key={m} className="bg-[#1a1a2e] text-gray-300 border-[#333]">{m}</Badge>
                  ))}
                </div>
              </div>

              {/* Equipo */}
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Dumbbell className="w-4 h-4 text-[#6366f1]" />
                <span>{t.equipo}: {isEn ? selected.equipment : selected.equipo}</span>
              </div>

              {/* Reps recommendation */}
              <div className="bg-[#1a1a2e] rounded-lg p-3 border border-[#333]">
                <div className="flex items-center gap-2 text-sm text-[#a78bfa]">
                  <Timer className="w-4 h-4" />
                  <span>{t.reps}</span>
                </div>
              </div>

              {/* Instrucciones */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#6366f1]" />{t.instrucciones}
                </h3>
                <ol className="space-y-2">
                  {(isEn ? selected.instructions : selected.instrucciones).map((inst, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-300">
                      <span className="w-6 h-6 rounded-full bg-[#6366f1]/20 text-[#a78bfa] flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Consejos */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />{t.consejos}
                </h3>
                <ul className="space-y-1">
                  {(isEn ? selected.tips : selected.consejos).map((tip, i) => (
                    <li key={i} className="text-sm text-gray-400 flex gap-2">
                      <span className="text-amber-400">•</span>{tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
