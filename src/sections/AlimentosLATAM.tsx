import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Flame, Beef, Wheat, Droplets, Wind, Filter, Leaf, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface AlimentoLATAM {
  nombre: string;
  categoria: string;
  pais: string;
  porcion: string;
  calorias: number;
  proteinas: number;
  carbs: number;
  grasas: number;
  fibra: number;
  ig: number;
  equivalente: string;
  tags: string[];
}

const ALIMENTOS: AlimentoLATAM[] = [
  { nombre: 'Nopal cocido', categoria: 'Verduras', pais: 'México', porcion: '1 taza (150g)', calorias: 22, proteinas: 2.0, carbs: 4.0, grasas: 0.2, fibra: 2.8, ig: 5, equivalente: '1 Verdura', tags: ['basico', 'superfood', 'gluten-free'] },
  { nombre: 'Chile poblano', categoria: 'Verduras', pais: 'México', porcion: '1 pieza (100g)', calorias: 20, proteinas: 0.9, carbs: 4.6, grasas: 0.2, fibra: 1.8, ig: 10, equivalente: '1 Verdura', tags: ['basico'] },
  { nombre: 'Chile jalapeño', categoria: 'Verduras', pais: 'México', porcion: '1 pieza (15g)', calorias: 4, proteinas: 0.1, carbs: 0.8, grasas: 0.1, fibra: 0.4, ig: 15, equivalente: 'Libre', tags: ['basico'] },
  { nombre: 'Jitomate rojo', categoria: 'Verduras', pais: 'México', porcion: '1 pieza (120g)', calorias: 22, proteinas: 1.1, carbs: 4.8, grasas: 0.2, fibra: 1.5, ig: 10, equivalente: '1 Verdura', tags: ['basico'] },
  { nombre: 'Tomate verde', categoria: 'Verduras', pais: 'México', porcion: '1 pieza (80g)', calorias: 11, proteinas: 0.5, carbs: 2.3, grasas: 0.1, fibra: 0.9, ig: 10, equivalente: '1 Verdura', tags: ['basico'] },
  { nombre: 'Calabacita italiana', categoria: 'Verduras', pais: 'México', porcion: '1 taza (130g)', calorias: 19, proteinas: 1.5, carbs: 3.5, grasas: 0.2, fibra: 1.5, ig: 10, equivalente: '1 Verdura', tags: ['basico'] },
  { nombre: 'Flor de calabaza', categoria: 'Verduras', pais: 'México', porcion: '1 taza (100g)', calorias: 15, proteinas: 1.3, carbs: 2.5, grasas: 0.2, fibra: 1.2, ig: 5, equivalente: '1 Verdura', tags: ['basico', 'temporada'] },
  { nombre: 'Huauzontle cocido', categoria: 'Verduras', pais: 'México', porcion: '1 taza (120g)', calorias: 30, proteinas: 3.0, carbs: 4.5, grasas: 0.5, fibra: 3.0, ig: 5, equivalente: '1 Verdura', tags: ['tradicional'] },
  { nombre: 'Quelites cocidos', categoria: 'Verduras', pais: 'México', porcion: '1 taza (100g)', calorias: 32, proteinas: 3.2, carbs: 4.0, grasas: 0.5, fibra: 2.8, ig: 5, equivalente: '1 Verdura', tags: ['tradicional', 'superfood'] },
  { nombre: 'Epazote fresco', categoria: 'Verduras', pais: 'México', porcion: '1/2 taza (10g)', calorias: 6, proteinas: 0.4, carbs: 1.0, grasas: 0.1, fibra: 0.7, ig: 5, equivalente: 'Libre', tags: ['basico', 'aromatica'] },
  { nombre: 'Cilantro fresco', categoria: 'Verduras', pais: 'México', porcion: '1/2 taza (8g)', calorias: 2, proteinas: 0.2, carbs: 0.4, grasas: 0.0, fibra: 0.3, ig: 5, equivalente: 'Libre', tags: ['basico', 'aromatica'] },
  { nombre: 'Papa blanca cocida', categoria: 'Verduras', pais: 'México', porcion: '1 pieza (150g)', calorias: 116, proteinas: 2.5, carbs: 27.0, grasas: 0.1, fibra: 2.2, ig: 85, equivalente: '2 Verduras', tags: ['basico'] },
  { nombre: 'Papa cambray cocida', categoria: 'Verduras', pais: 'México', porcion: '1 taza (150g)', calorias: 120, proteinas: 2.8, carbs: 26.0, grasas: 0.2, fibra: 2.5, ig: 70, equivalente: '2 Verduras', tags: ['basico'] },
  { nombre: 'Zanahoria cocida', categoria: 'Verduras', pais: 'México', porcion: '1/2 taza (80g)', calorias: 35, proteinas: 0.8, carbs: 8.0, grasas: 0.2, fibra: 2.3, ig: 47, equivalente: '1 Verdura', tags: ['basico'] },
  { nombre: 'Betabel cocido', categoria: 'Verduras', pais: 'México', porcion: '1/2 taza (85g)', calorias: 37, proteinas: 1.4, carbs: 8.0, grasas: 0.2, fibra: 1.7, ig: 64, equivalente: '1 Verdura', tags: ['basico', 'superfood'] },
  { nombre: 'Ejotes cocidos', categoria: 'Verduras', pais: 'México', porcion: '1 taza (125g)', calorias: 35, proteinas: 2.0, carbs: 8.0, grasas: 0.1, fibra: 4.0, ig: 15, equivalente: '1 Verdura', tags: ['basico'] },
  { nombre: 'Chayote cocido', categoria: 'Verduras', pais: 'México', porcion: '1 pieza (100g)', calorias: 24, proteinas: 1.2, carbs: 5.0, grasas: 0.1, fibra: 2.5, ig: 5, equivalente: '1 Verdura', tags: ['basico'] },
  { nombre: 'Jicama cruda', categoria: 'Verduras', pais: 'México', porcion: '1 taza (120g)', calorias: 46, proteinas: 0.9, carbs: 11.0, grasas: 0.1, fibra: 6.0, ig: 30, equivalente: '1 Verdura', tags: ['basico', 'colacion'] },
  { nombre: 'Lechuga romana', categoria: 'Verduras', pais: 'México', porcion: '2 tazas (100g)', calorias: 17, proteinas: 1.2, carbs: 3.3, grasas: 0.3, fibra: 2.1, ig: 10, equivalente: 'Libre', tags: ['basico', 'gluten-free'] },
  { nombre: 'Espinaca cocida', categoria: 'Verduras', pais: 'México', porcion: '1/2 taza (90g)', calorias: 41, proteinas: 5.3, carbs: 6.8, grasas: 0.5, fibra: 4.3, ig: 5, equivalente: '1 Verdura', tags: ['basico', 'superfood'] },
  { nombre: 'Acelga cocida', categoria: 'Verduras', pais: 'México', porcion: '1/2 taza (90g)', calorias: 19, proteinas: 1.9, carbs: 3.7, grasas: 0.1, fibra: 1.8, ig: 5, equivalente: '1 Verdura', tags: ['basico'] },
  { nombre: 'Brocoli cocido', categoria: 'Verduras', pais: 'México', porcion: '1 taza (155g)', calorias: 55, proteinas: 3.7, carbs: 11.0, grasas: 0.6, fibra: 5.2, ig: 10, equivalente: '1 Verdura', tags: ['basico', 'superfood'] },
  { nombre: 'Coliflor cocida', categoria: 'Verduras', pais: 'México', porcion: '1 taza (125g)', calorias: 29, proteinas: 2.3, carbs: 5.5, grasas: 0.6, fibra: 2.8, ig: 10, equivalente: '1 Verdura', tags: ['basico', 'keto'] },
  { nombre: 'Apio crudo', categoria: 'Verduras', pais: 'México', porcion: '2 tallos (80g)', calorias: 13, proteinas: 0.6, carbs: 2.4, grasas: 0.2, fibra: 1.3, ig: 5, equivalente: 'Libre', tags: ['basico', 'keto'] },
  { nombre: 'Pepino crudo', categoria: 'Verduras', pais: 'México', porcion: '1 taza (100g)', calorias: 16, proteinas: 0.7, carbs: 3.8, grasas: 0.1, fibra: 0.5, ig: 10, equivalente: 'Libre', tags: ['basico'] },
  { nombre: 'Champinones cocidos', categoria: 'Verduras', pais: 'México', porcion: '1 taza (155g)', calorias: 44, proteinas: 3.6, carbs: 6.6, grasas: 0.7, fibra: 2.7, ig: 5, equivalente: '1 Verdura', tags: ['basico', 'keto'] },
  { nombre: 'Palitos de zanahoria', categoria: 'Verduras', pais: 'México', porcion: '1/2 taza (60g)', calorias: 25, proteinas: 0.6, carbs: 6.0, grasas: 0.1, fibra: 1.7, ig: 47, equivalente: '1/2 Verdura', tags: ['basico', 'colacion'] },
  { nombre: 'Alcachofa cocida', categoria: 'Verduras', pais: 'España', porcion: '1 pieza (120g)', calorias: 60, proteinas: 4.2, carbs: 13.4, grasas: 0.2, fibra: 6.8, ig: 5, equivalente: '1 Verdura', tags: ['basico', 'superfood'] },
  { nombre: 'Esparragos cocidos', categoria: 'Verduras', pais: 'Perú', porcion: '1/2 taza (90g)', calorias: 40, proteinas: 4.3, carbs: 7.4, grasas: 0.4, fibra: 3.0, ig: 5, equivalente: '1 Verdura', tags: ['basico', 'superfood'] },
  { nombre: 'Calabaza (ayote) cocida', categoria: 'Verduras', pais: 'Centroamérica', porcion: '1 taza (120g)', calorias: 49, proteinas: 2.0, carbs: 12.0, grasas: 0.2, fibra: 2.8, ig: 65, equivalente: '1 Verdura', tags: ['basico'] },
  { nombre: 'Yuca cocida', categoria: 'Verduras', pais: 'Colombia', porcion: '1/2 taza (100g)', calorias: 160, proteinas: 1.4, carbs: 38.0, grasas: 0.3, fibra: 1.8, ig: 55, equivalente: '2 Verduras + 1/2 Cereal', tags: ['basico', 'tradicional'] },
  { nombre: 'Platano macho cocido', categoria: 'Verduras', pais: 'Colombia', porcion: '1/2 taza (100g)', calorias: 122, proteinas: 1.3, carbs: 32.0, grasas: 0.2, fibra: 2.3, ig: 45, equivalente: '1 Fruta + 1 Verdura', tags: ['tradicional'] },
  { nombre: 'Malanga cocida', categoria: 'Verduras', pais: 'Cuba', porcion: '1/2 taza (100g)', calorias: 98, proteinas: 1.5, carbs: 23.0, grasas: 0.2, fibra: 1.8, ig: 55, equivalente: '1 Verdura + 1/2 Cereal', tags: ['tradicional'] },
  { nombre: 'Ñame cocido', categoria: 'Verduras', pais: 'Colombia', porcion: '1/2 taza (80g)', calorias: 118, proteinas: 1.5, carbs: 28.0, grasas: 0.2, fibra: 3.9, ig: 50, equivalente: '1 Verdura + 1/2 Cereal', tags: ['tradicional'] },
  { nombre: 'Oco cocido', categoria: 'Verduras', pais: 'México', porcion: '1/2 taza (80g)', calorias: 95, proteinas: 1.8, carbs: 22.0, grasas: 0.1, fibra: 3.0, ig: 50, equivalente: '1 Verdura + 1/2 Cereal', tags: ['tradicional'] },
  { nombre: 'Platano dominico', categoria: 'Frutas', pais: 'México', porcion: '1 pieza (80g)', calorias: 72, proteinas: 0.9, carbs: 18.5, grasas: 0.3, fibra: 2.0, ig: 52, equivalente: '1 Fruta', tags: ['basico', 'pre-entreno'] },
  { nombre: 'Platano tabasco', categoria: 'Frutas', pais: 'México', porcion: '1/2 pieza (60g)', calorias: 66, proteinas: 0.8, carbs: 17.0, grasas: 0.2, fibra: 1.8, ig: 55, equivalente: '1 Fruta', tags: ['basico'] },
  { nombre: 'Manzana roja', categoria: 'Frutas', pais: 'México', porcion: '1 pieza (130g)', calorias: 72, proteinas: 0.4, carbs: 19.0, grasas: 0.2, fibra: 3.3, ig: 38, equivalente: '1 Fruta', tags: ['basico', 'colacion'] },
  { nombre: 'Manzana verde', categoria: 'Frutas', pais: 'México', porcion: '1 pieza (130g)', calorias: 70, proteinas: 0.4, carbs: 18.0, grasas: 0.2, fibra: 3.0, ig: 35, equivalente: '1 Fruta', tags: ['basico'] },
  { nombre: 'Pera', categoria: 'Frutas', pais: 'México', porcion: '1 pieza (160g)', calorias: 96, proteinas: 0.6, carbs: 25.7, grasas: 0.2, fibra: 5.5, ig: 30, equivalente: '1.5 Frutas', tags: ['basico'] },
  { nombre: 'Uva verde', categoria: 'Frutas', pais: 'México', porcion: '1 taza (150g)', calorias: 104, proteinas: 1.1, carbs: 27.3, grasas: 0.2, fibra: 1.4, ig: 43, equivalente: '1.5 Frutas', tags: ['basico'] },
  { nombre: 'Uva roja', categoria: 'Frutas', pais: 'México', porcion: '1 taza (150g)', calorias: 100, proteinas: 1.1, carbs: 26.0, grasas: 0.2, fibra: 1.4, ig: 48, equivalente: '1.5 Frutas', tags: ['basico', 'superfood'] },
  { nombre: 'Fresa fresca', categoria: 'Frutas', pais: 'México', porcion: '1 taza (150g)', calorias: 49, proteinas: 1.0, carbs: 11.7, grasas: 0.5, fibra: 3.0, ig: 40, equivalente: '1 Fruta', tags: ['basico', 'superfood'] },
  { nombre: 'Mora azul (blueberry)', categoria: 'Frutas', pais: 'México', porcion: '1 taza (148g)', calorias: 85, proteinas: 1.1, carbs: 21.4, grasas: 0.5, fibra: 3.6, ig: 53, equivalente: '1 Fruta', tags: ['basico', 'superfood'] },
  { nombre: 'Frambuesa fresca', categoria: 'Frutas', pais: 'México', porcion: '1 taza (123g)', calorias: 64, proteinas: 1.5, carbs: 14.7, grasas: 0.8, fibra: 8.0, ig: 32, equivalente: '1 Fruta', tags: ['basico', 'keto'] },
  { nombre: 'Zarzamora fresca', categoria: 'Frutas', pais: 'México', porcion: '1 taza (144g)', calorias: 62, proteinas: 2.0, carbs: 13.8, grasas: 0.7, fibra: 7.6, ig: 25, equivalente: '1 Fruta', tags: ['basico'] },
  { nombre: 'Mango ataulfo', categoria: 'Frutas', pais: 'México', porcion: '1/2 pieza (100g)', calorias: 60, proteinas: 0.8, carbs: 15.0, grasas: 0.4, fibra: 1.6, ig: 51, equivalente: '1 Fruta', tags: ['basico', 'superfood'] },
  { nombre: 'Mango manila', categoria: 'Frutas', pais: 'México', porcion: '1/2 pieza (100g)', calorias: 62, proteinas: 0.6, carbs: 15.4, grasas: 0.3, fibra: 1.5, ig: 50, equivalente: '1 Fruta', tags: ['basico'] },
  { nombre: 'Papaya maradol', categoria: 'Frutas', pais: 'México', porcion: '1 taza (140g)', calorias: 55, proteinas: 0.9, carbs: 13.7, grasas: 0.2, fibra: 2.5, ig: 56, equivalente: '1 Fruta', tags: ['basico', 'digestivo'] },
  { nombre: 'Piña natural', categoria: 'Frutas', pais: 'México', porcion: '1 taza (165g)', calorias: 82, proteinas: 0.9, carbs: 21.6, grasas: 0.2, fibra: 2.3, ig: 66, equivalente: '1.5 Frutas', tags: ['basico'] },
  { nombre: 'Sandia fresca', categoria: 'Frutas', pais: 'México', porcion: '1 taza (150g)', calorias: 46, proteinas: 0.9, carbs: 11.5, grasas: 0.2, fibra: 0.6, ig: 72, equivalente: '1 Fruta', tags: ['basico', 'hidratacion'] },
  { nombre: 'Melon chino', categoria: 'Frutas', pais: 'México', porcion: '1 taza (160g)', calorias: 54, proteinas: 1.3, carbs: 13.0, grasas: 0.2, fibra: 1.4, ig: 65, equivalente: '1 Fruta', tags: ['basico'] },
  { nombre: 'Guayaba fresca', categoria: 'Frutas', pais: 'México', porcion: '3 piezas (150g)', calorias: 68, proteinas: 2.5, carbs: 14.8, grasas: 1.0, fibra: 5.4, ig: 12, equivalente: '1 Fruta', tags: ['basico', 'superfood'] },
  { nombre: 'Guayaba rosa', categoria: 'Frutas', pais: 'México', porcion: '2 piezas (100g)', calorias: 68, proteinas: 2.6, carbs: 14.3, grasas: 1.0, fibra: 5.2, ig: 33, equivalente: '1 Fruta', tags: ['basico', 'superfood'] },
  { nombre: 'Naranja valencia', categoria: 'Frutas', pais: 'México', porcion: '1 pieza (130g)', calorias: 62, proteinas: 1.2, carbs: 15.4, grasas: 0.2, fibra: 3.1, ig: 43, equivalente: '1 Fruta', tags: ['basico'] },
  { nombre: 'Mandarina', categoria: 'Frutas', pais: 'México', porcion: '1 pieza (90g)', calorias: 47, proteinas: 0.7, carbs: 11.7, grasas: 0.3, fibra: 1.8, ig: 30, equivalente: '1 Fruta', tags: ['basico'] },
  { nombre: 'Toronja roja', categoria: 'Frutas', pais: 'México', porcion: '1/2 pieza (120g)', calorias: 52, proteinas: 1.0, carbs: 13.2, grasas: 0.2, fibra: 2.0, ig: 25, equivalente: '1 Fruta', tags: ['basico', 'keto'] },
  { nombre: 'Limon fresco', categoria: 'Frutas', pais: 'México', porcion: '1 pieza (60g)', calorias: 17, proteinas: 0.6, carbs: 5.4, grasas: 0.2, fibra: 0.3, ig: 5, equivalente: 'Libre', tags: ['basico'] },
  { nombre: 'Aguacate hass', categoria: 'Frutas', pais: 'México', porcion: '1/2 pieza (75g)', calorias: 120, proteinas: 1.5, carbs: 6.4, grasas: 11.0, fibra: 5.0, ig: 15, equivalente: '1 Grasa + 1/2 Fruta', tags: ['basico', 'superfood', 'keto'] },
  { nombre: 'Aguacate criollo', categoria: 'Frutas', pais: 'México', porcion: '1 pieza (100g)', calorias: 160, proteinas: 2.0, carbs: 8.5, grasas: 14.7, fibra: 6.7, ig: 15, equivalente: '1.5 Grasas + 1/2 Fruta', tags: ['basico'] },
  { nombre: 'Tuna verde', categoria: 'Frutas', pais: 'México', porcion: '1 pieza (150g)', calorias: 61, proteinas: 1.3, carbs: 13.6, grasas: 0.7, fibra: 5.3, ig: 5, equivalente: '1 Fruta', tags: ['basico', 'superfood'] },
  { nombre: 'Tuna roja', categoria: 'Frutas', pais: 'México', porcion: '1 pieza (150g)', calorias: 65, proteinas: 1.2, carbs: 14.0, grasas: 0.6, fibra: 4.0, ig: 5, equivalente: '1 Fruta', tags: ['basico', 'superfood'] },
  { nombre: 'Granada roja', categoria: 'Frutas', pais: 'México', porcion: '1/2 taza (87g)', calorias: 72, proteinas: 1.4, carbs: 16.3, grasas: 1.0, fibra: 3.4, ig: 35, equivalente: '1 Fruta', tags: ['basico', 'superfood'] },
  { nombre: 'Chabacano (ciruela)', categoria: 'Frutas', pais: 'México', porcion: '3 piezas (105g)', calorias: 51, proteinas: 1.5, carbs: 11.7, grasas: 0.4, fibra: 2.4, ig: 35, equivalente: '1 Fruta', tags: ['basico'] },
  { nombre: 'Platano macho frito', categoria: 'Frutas', pais: 'Colombia', porcion: '1/2 taza (70g)', calorias: 168, proteinas: 1.0, carbs: 28.0, grasas: 6.0, fibra: 2.4, ig: 50, equivalente: '1 Fruta + 1 Grasa', tags: ['tradicional'] },
  { nombre: 'Coco fresco', categoria: 'Frutas', pais: 'Colombia', porcion: '1/2 taza (80g)', calorias: 142, proteinas: 1.4, carbs: 6.2, grasas: 13.4, fibra: 4.0, ig: 5, equivalente: '2 Grasas + 1/2 Fruta', tags: ['basico'] },
  { nombre: 'Lucuma', categoria: 'Frutas', pais: 'Perú', porcion: '1/2 taza (100g)', calorias: 100, proteinas: 1.5, carbs: 24.0, grasas: 0.5, fibra: 2.0, ig: 30, equivalente: '1.5 Frutas', tags: ['tradicional', 'superfood'] },
  { nombre: 'Chirimoya', categoria: 'Frutas', pais: 'Perú', porcion: '1/2 pieza (100g)', calorias: 75, proteinas: 1.5, carbs: 17.8, grasas: 0.5, fibra: 3.0, ig: 35, equivalente: '1 Fruta', tags: ['tradicional'] },
  { nombre: 'Granadilla', categoria: 'Frutas', pais: 'Colombia', porcion: '4 piezas (100g)', calorias: 60, proteinas: 2.0, carbs: 12.0, grasas: 1.0, fibra: 2.0, ig: 5, equivalente: '1 Fruta', tags: ['basico', 'colacion'] },
  { nombre: 'Maracuya (parcha)', categoria: 'Frutas', pais: 'Colombia', porcion: '1/2 taza (100g)', calorias: 60, proteinas: 2.0, carbs: 12.0, grasas: 1.0, fibra: 8.0, ig: 5, equivalente: '1 Fruta', tags: ['basico'] },
  { nombre: 'Acai pulp', categoria: 'Frutas', pais: 'Brasil', porcion: '100g', calorias: 70, proteinas: 1.0, carbs: 6.0, grasas: 5.0, fibra: 3.0, ig: 5, equivalente: '1 Fruta + 1 Grasa', tags: ['superfood', 'pre-entreno'] },
  { nombre: 'Caju (fruta)', categoria: 'Frutas', pais: 'Brasil', porcion: '1 taza (100g)', calorias: 43, proteinas: 1.0, carbs: 9.2, grasas: 0.3, fibra: 0.8, ig: 5, equivalente: '1/2 Fruta', tags: ['tradicional'] },
  { nombre: 'Tortilla de maiz', categoria: 'Cereales', pais: 'México', porcion: '1 pieza (25g)', calorias: 62, proteinas: 1.5, carbs: 13.0, grasas: 0.6, fibra: 1.5, ig: 52, equivalente: '1 Cereal s/g', tags: ['basico', 'gluten-free'] },
  { nombre: 'Tortilla de harina', categoria: 'Cereales', pais: 'México', porcion: '1 pieza (35g)', calorias: 100, proteinas: 2.5, carbs: 17.0, grasas: 2.5, fibra: 0.8, ig: 65, equivalente: '1 Cereal c/g', tags: ['basico'] },
  { nombre: 'Tortilla integral', categoria: 'Cereales', pais: 'México', porcion: '1 pieza (30g)', calorias: 85, proteinas: 2.8, carbs: 15.0, grasas: 1.5, fibra: 2.5, ig: 45, equivalente: '1 Cereal c/g', tags: ['basico'] },
  { nombre: 'Masa de maiz nixtamal', categoria: 'Cereales', pais: 'México', porcion: '50g', calorias: 110, proteinas: 2.0, carbs: 23.0, grasas: 1.0, fibra: 2.0, ig: 52, equivalente: '1 Cereal s/g', tags: ['basico', 'gluten-free'] },
  { nombre: 'Elote desgranado cocido', categoria: 'Cereales', pais: 'México', porcion: '1 taza (165g)', calorias: 132, proteinas: 4.7, carbs: 29.0, grasas: 1.2, fibra: 3.8, ig: 55, equivalente: '1 Cereal s/g', tags: ['basico'] },
  { nombre: 'Esquites (elote en vaso)', categoria: 'Cereales', pais: 'México', porcion: '1 vaso (200g)', calorias: 180, proteinas: 6.0, carbs: 35.0, grasas: 3.0, fibra: 5.0, ig: 55, equivalente: '1.5 Cereales s/g + 1 Grasa', tags: ['tradicional', 'colacion'] },
  { nombre: 'Tostada de maiz', categoria: 'Cereales', pais: 'México', porcion: '1 pieza (15g)', calorias: 45, proteinas: 0.8, carbs: 9.0, grasas: 0.5, fibra: 1.0, ig: 52, equivalente: '1/2 Cereal s/g', tags: ['basico', 'gluten-free'] },
  { nombre: 'Totopo horneado', categoria: 'Cereales', pais: 'México', porcion: '10 piezas (30g)', calorias: 130, proteinas: 2.0, carbs: 24.0, grasas: 3.0, fibra: 2.0, ig: 60, equivalente: '1.5 Cereales s/g', tags: ['basico'] },
  { nombre: 'Pan blanco de caja', categoria: 'Cereales', pais: 'México', porcion: '1 rebanada (30g)', calorias: 80, proteinas: 2.5, carbs: 15.0, grasas: 1.0, fibra: 0.8, ig: 70, equivalente: '1 Cereal s/g', tags: ['basico'] },
  { nombre: 'Pan integral Bimbo', categoria: 'Cereales', pais: 'México', porcion: '1 rebanada (33g)', calorias: 85, proteinas: 3.5, carbs: 15.0, grasas: 1.5, fibra: 2.5, ig: 50, equivalente: '1 Cereal c/g', tags: ['basico'] },
  { nombre: 'Pan de caja multigrano', categoria: 'Cereales', pais: 'México', porcion: '1 rebanada (35g)', calorias: 90, proteinas: 4.0, carbs: 16.0, grasas: 1.5, fibra: 3.0, ig: 45, equivalente: '1 Cereal c/g', tags: ['basico', 'superfood'] },
  { nombre: 'Bolillo sin migajon', categoria: 'Cereales', pais: 'México', porcion: '1/2 pieza (30g)', calorias: 82, proteinas: 2.6, carbs: 16.5, grasas: 0.8, fibra: 0.7, ig: 70, equivalente: '1 Cereal s/g', tags: ['basico'] },
  { nombre: 'Bolillo integral', categoria: 'Cereales', pais: 'México', porcion: '1/2 pieza (32g)', calorias: 85, proteinas: 3.0, carbs: 16.0, grasas: 1.2, fibra: 2.0, ig: 55, equivalente: '1 Cereal c/g', tags: ['basico'] },
  { nombre: 'Telera', categoria: 'Cereales', pais: 'México', porcion: '1/2 pieza (35g)', calorias: 95, proteinas: 3.0, carbs: 18.0, grasas: 1.2, fibra: 0.8, ig: 70, equivalente: '1 Cereal c/g', tags: ['basico'] },
  { nombre: 'Concha (pan dulce)', categoria: 'Cereales', pais: 'México', porcion: '1 pieza (55g)', calorias: 200, proteinas: 4.5, carbs: 35.0, grasas: 5.0, fibra: 1.5, ig: 70, equivalente: '2 Cereales c/g', tags: ['tradicional', 'postre'] },
  { nombre: 'Cuernito (croissant)', categoria: 'Cereales', pais: 'México', porcion: '1 pieza (45g)', calorias: 180, proteinas: 3.5, carbs: 20.0, grasas: 9.0, fibra: 1.0, ig: 70, equivalente: '1 Cereal c/g + 1.5 Grasas', tags: ['tradicional'] },
  { nombre: 'Galleta Maria', categoria: 'Cereales', pais: 'México', porcion: '3 piezas (15g)', calorias: 70, proteinas: 1.2, carbs: 12.0, grasas: 2.0, fibra: 0.5, ig: 70, equivalente: '1 Cereal c/g', tags: ['basico', 'colacion'] },
  { nombre: 'Galleta de animalitos', categoria: 'Cereales', pais: 'México', porcion: '10 piezas (20g)', calorias: 90, proteinas: 1.5, carbs: 14.0, grasas: 3.0, fibra: 0.5, ig: 75, equivalente: '1 Cereal c/g', tags: ['basico', 'colacion'] },
  { nombre: 'Saladitas Gamesa', categoria: 'Cereales', pais: 'México', porcion: '3 piezas (15g)', calorias: 70, proteinas: 1.0, carbs: 10.0, grasas: 2.5, fibra: 0.3, ig: 75, equivalente: '1/2 Cereal c/g', tags: ['basico'] },
  { nombre: 'Arroz blanco cocido', categoria: 'Cereales', pais: 'México', porcion: '1/2 taza (80g)', calorias: 100, proteinas: 2.0, carbs: 22.0, grasas: 0.2, fibra: 0.3, ig: 73, equivalente: '1 Cereal s/g', tags: ['basico'] },
  { nombre: 'Arroz integral cocido', categoria: 'Cereales', pais: 'México', porcion: '1/2 taza (80g)', calorias: 108, proteinas: 2.5, carbs: 22.5, grasas: 0.9, fibra: 1.8, ig: 50, equivalente: '1 Cereal s/g', tags: ['basico', 'superfood'] },
  { nombre: 'Pasta sopa cocida', categoria: 'Cereales', pais: 'México', porcion: '1/2 taza (70g)', calorias: 95, proteinas: 3.2, carbs: 19.0, grasas: 0.4, fibra: 0.8, ig: 45, equivalente: '1 Cereal s/g', tags: ['basico'] },
  { nombre: 'Pasta integral cocida', categoria: 'Cereales', pais: 'México', porcion: '1/2 taza (70g)', calorias: 100, proteinas: 3.5, carbs: 19.0, grasas: 0.6, fibra: 2.5, ig: 42, equivalente: '1 Cereal s/g', tags: ['basico'] },
  { nombre: 'Fideo seco cocido', categoria: 'Cereales', pais: 'México', porcion: '1/2 taza (70g)', calorias: 95, proteinas: 3.2, carbs: 19.0, grasas: 0.3, fibra: 0.8, ig: 45, equivalente: '1 Cereal s/g', tags: ['basico'] },
  { nombre: 'Sopa de arroz con fideo', categoria: 'Cereales', pais: 'México', porcion: '1 taza (250ml)', calorias: 120, proteinas: 3.0, carbs: 24.0, grasas: 1.0, fibra: 0.8, ig: 70, equivalente: '1 Cereal s/g', tags: ['basico', 'sopa'] },
  { nombre: 'Avena en hojuelas cruda', categoria: 'Cereales', pais: 'México', porcion: '1/2 taza (40g)', calorias: 150, proteinas: 5.2, carbs: 27.0, grasas: 2.6, fibra: 4.0, ig: 42, equivalente: '1 Cereal s/g', tags: ['basico', 'superfood'] },
  { nombre: 'Avena cocida', categoria: 'Cereales', pais: 'México', porcion: '1/2 taza (120g)', calorias: 83, proteinas: 2.9, carbs: 14.0, grasas: 1.4, fibra: 2.0, ig: 42, equivalente: '1/2 Cereal s/g', tags: ['basico', 'desayuno'] },
  { nombre: 'Harina de avena', categoria: 'Cereales', pais: 'México', porcion: '3 cdas (30g)', calorias: 116, proteinas: 4.0, carbs: 20.0, grasas: 2.4, fibra: 3.0, ig: 42, equivalente: '1 Cereal s/g', tags: ['basico'] },
  { nombre: 'Amaranto tostado', categoria: 'Cereales', pais: 'México', porcion: '1/4 taza (20g)', calorias: 78, proteinas: 2.8, carbs: 14.0, grasas: 1.4, fibra: 2.0, ig: 35, equivalente: '1 Cereal s/g', tags: ['basico', 'superfood', 'gluten-free'] },
  { nombre: 'Hojuelas de amaranto', categoria: 'Cereales', pais: 'México', porcion: '1/2 taza (30g)', calorias: 107, proteinas: 3.7, carbs: 19.0, grasas: 1.9, fibra: 2.5, ig: 35, equivalente: '1 Cereal s/g', tags: ['basico', 'superfood'] },
  { nombre: 'Quinoa cocida', categoria: 'Cereales', pais: 'Perú', porcion: '1/2 taza (90g)', calorias: 111, proteinas: 4.0, carbs: 20.0, grasas: 1.8, fibra: 2.8, ig: 53, equivalente: '1 Cereal s/g', tags: ['basico', 'superfood', 'gluten-free'] },
  { nombre: 'Cuscus cocido', categoria: 'Cereales', pais: 'Mediterráneo', porcion: '1/2 taza (80g)', calorias: 88, proteinas: 3.0, carbs: 18.0, grasas: 0.2, fibra: 1.2, ig: 65, equivalente: '1 Cereal s/g', tags: ['basico'] },
  { nombre: 'Cebada cocida', categoria: 'Cereales', pais: 'México', porcion: '1/2 taza (80g)', calorias: 97, proteinas: 1.8, carbs: 22.0, grasas: 0.3, fibra: 3.0, ig: 30, equivalente: '1 Cereal s/g', tags: ['basico'] },
  { nombre: 'Granola casera', categoria: 'Cereales', pais: 'México', porcion: '1/4 taza (30g)', calorias: 140, proteinas: 3.5, carbs: 20.0, grasas: 5.5, fibra: 2.5, ig: 50, equivalente: '1 Cereal c/g + 1 Grasa', tags: ['basico', 'desayuno'] },
  { nombre: 'Cereal de caja (corn flakes)', categoria: 'Cereales', pais: 'México', porcion: '1 taza (30g)', calorias: 110, proteinas: 2.0, carbs: 24.0, grasas: 0.2, fibra: 0.5, ig: 85, equivalente: '1 Cereal s/g', tags: ['basico', 'desayuno'] },
  { nombre: 'Cereal de hojuelas integrales', categoria: 'Cereales', pais: 'México', porcion: '1 taza (40g)', calorias: 130, proteinas: 3.5, carbs: 28.0, grasas: 1.0, fibra: 4.0, ig: 50, equivalente: '1 Cereal s/g', tags: ['basico', 'desayuno'] },
  { nombre: 'Tapioca cocida', categoria: 'Cereales', pais: 'Brasil', porcion: '1/2 taza (75g)', calorias: 75, proteinas: 0.0, carbs: 18.8, grasas: 0.0, fibra: 0.0, ig: 70, equivalente: '1/2 Cereal s/g', tags: ['gluten-free', 'basico'] },
  { nombre: 'Arepa colombiana', categoria: 'Cereales', pais: 'Colombia', porcion: '1 pieza (60g)', calorias: 150, proteinas: 2.0, carbs: 32.0, grasas: 1.0, fibra: 0.5, ig: 70, equivalente: '1.5 Cereales s/g', tags: ['basico', 'gluten-free'] },
  { nombre: 'Arepa venezolana', categoria: 'Cereales', pais: 'Venezuela', porcion: '1 pieza (80g)', calorias: 200, proteinas: 3.0, carbs: 42.0, grasas: 1.0, fibra: 0.8, ig: 70, equivalente: '2 Cereales s/g', tags: ['basico', 'gluten-free'] },
  { nombre: 'Cachapa venezolana', categoria: 'Cereales', pais: 'Venezuela', porcion: '1 pieza (100g)', calorias: 200, proteinas: 4.0, carbs: 35.0, grasas: 5.0, fibra: 2.0, ig: 55, equivalente: '1.5 Cereales c/g', tags: ['tradicional'] },
  { nombre: 'Pao de queijo', categoria: 'Cereales', pais: 'Brasil', porcion: '2 piezas (30g)', calorias: 100, proteinas: 1.8, carbs: 12.0, grasas: 4.5, fibra: 0.5, ig: 70, equivalente: '1/2 Cereal c/g + 1 Grasa', tags: ['gluten-free', 'desayuno'] },
  { nombre: 'Pan de pita integral', categoria: 'Cereales', pais: 'Mediterráneo', porcion: '1 pieza (30g)', calorias: 80, proteinas: 3.0, carbs: 16.0, grasas: 1.0, fibra: 2.5, ig: 57, equivalente: '1 Cereal s/g', tags: ['basico'] },
  { nombre: 'Pan arabe integral', categoria: 'Cereales', pais: 'México', porcion: '1/2 pieza (30g)', calorias: 82, proteinas: 2.8, carbs: 16.0, grasas: 1.0, fibra: 2.2, ig: 55, equivalente: '1 Cereal s/g', tags: ['basico'] },
  { nombre: 'Cream cracker', categoria: 'Cereales', pais: 'México', porcion: '3 piezas (15g)', calorias: 72, proteinas: 1.2, carbs: 11.0, grasas: 2.5, fibra: 0.3, ig: 75, equivalente: '1/2 Cereal c/g', tags: ['basico'] },
  { nombre: 'Frijol negro cocido', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (85g)', calorias: 114, proteinas: 7.6, carbs: 20.0, grasas: 0.5, fibra: 7.5, ig: 30, equivalente: '1 Leguminosa', tags: ['basico', 'vegetariano', 'gluten-free'] },
  { nombre: 'Frijol bayo cocido', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (85g)', calorias: 112, proteinas: 7.4, carbs: 20.0, grasas: 0.4, fibra: 7.0, ig: 30, equivalente: '1 Leguminosa', tags: ['basico', 'vegetariano'] },
  { nombre: 'Frijol pinto cocido', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (85g)', calorias: 117, proteinas: 7.0, carbs: 20.5, grasas: 0.5, fibra: 7.5, ig: 30, equivalente: '1 Leguminosa', tags: ['basico', 'vegetariano'] },
  { nombre: 'Frijol peruano cocido', categoria: 'Leguminosas', pais: 'Perú', porcion: '1/2 taza (85g)', calorias: 120, proteinas: 7.5, carbs: 21.0, grasas: 0.5, fibra: 7.0, ig: 30, equivalente: '1 Leguminosa', tags: ['basico'] },
  { nombre: 'Frijol refrito', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (100g)', calorias: 140, proteinas: 7.0, carbs: 20.0, grasas: 3.0, fibra: 7.0, ig: 30, equivalente: '1 Leguminosa + 1/2 Grasa', tags: ['basico'] },
  { nombre: 'Lenteja cocida', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (100g)', calorias: 116, proteinas: 9.0, carbs: 20.0, grasas: 0.4, fibra: 7.8, ig: 30, equivalente: '1 Leguminosa', tags: ['basico', 'vegetariano', 'superfood'] },
  { nombre: 'Garbanzo cocido', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (82g)', calorias: 135, proteinas: 7.3, carbs: 22.5, grasas: 2.1, fibra: 6.3, ig: 28, equivalente: '1 Leguminosa', tags: ['basico', 'vegetariano'] },
  { nombre: 'Garbanzo frito/crujiente', categoria: 'Leguminosas', pais: 'México', porcion: '1/4 taza (30g)', calorias: 120, proteinas: 5.0, carbs: 16.0, grasas: 4.0, fibra: 5.0, ig: 28, equivalente: '1/2 Leguminosa + 1 Grasa', tags: ['colacion'] },
  { nombre: 'Alberja (chicharo) seco cocido', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (100g)', calorias: 120, proteinas: 8.0, carbs: 21.0, grasas: 0.4, fibra: 8.0, ig: 30, equivalente: '1 Leguminosa', tags: ['basico', 'vegetariano'] },
  { nombre: 'Chicharo verde cocido', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (80g)', calorias: 67, proteinas: 4.3, carbs: 12.5, grasas: 0.4, fibra: 4.4, ig: 48, equivalente: '1/2 Leguminosa', tags: ['basico'] },
  { nombre: 'Edamames cocidos', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (75g)', calorias: 127, proteinas: 11.0, carbs: 10.0, grasas: 5.8, fibra: 4.0, ig: 18, equivalente: '1 Leguminosa + 1/2 Grasa', tags: ['basico', 'superfood'] },
  { nombre: 'Habas cocidas', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (85g)', calorias: 94, proteinas: 6.5, carbs: 16.3, grasas: 0.3, fibra: 4.5, ig: 30, equivalente: '1 Leguminosa', tags: ['basico', 'vegetariano'] },
  { nombre: 'Soya cocida', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (85g)', calorias: 149, proteinas: 16.6, carbs: 8.5, grasas: 7.7, fibra: 5.2, ig: 15, equivalente: '1 Leguminosa + 1 Grasa', tags: ['basico', 'superfood'] },
  { nombre: 'Texturizado de soya (hidr)', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (50g)', calorias: 80, proteinas: 10.0, carbs: 6.0, grasas: 2.0, fibra: 4.0, ig: 15, equivalente: '1 Leguminosa', tags: ['vegetariano'] },
  { nombre: 'Tofu firme', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (125g)', calorias: 94, proteinas: 10.0, carbs: 2.3, grasas: 5.7, fibra: 1.0, ig: 15, equivalente: '1 Carne magra', tags: ['vegetariano', 'superfood'] },
  { nombre: 'Tempeh', categoria: 'Leguminosas', pais: 'Indonesia', porcion: '1/2 taza (80g)', calorias: 160, proteinas: 16.0, carbs: 8.0, grasas: 8.0, fibra: 5.0, ig: 15, equivalente: '1 Carne magra + 1 Grasa', tags: ['vegetariano', 'fermentado'] },
  { nombre: 'Hummus (garbanzo)', categoria: 'Leguminosas', pais: 'Mediterráneo', porcion: '3 cdas (45g)', calorias: 70, proteinas: 2.5, carbs: 5.0, grasas: 4.5, fibra: 2.0, ig: 28, equivalente: '1/2 Leguminosa + 1 Grasa', tags: ['vegetariano', 'colacion'] },
  { nombre: 'Frijol blanco cocido', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (85g)', calorias: 110, proteinas: 7.3, carbs: 19.5, grasas: 0.4, fibra: 6.3, ig: 30, equivalente: '1 Leguminosa', tags: ['basico', 'vegetariano'] },
  { nombre: 'Frijol flor de mayo cocido', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (85g)', calorias: 112, proteinas: 7.0, carbs: 20.0, grasas: 0.4, fibra: 7.0, ig: 30, equivalente: '1 Leguminosa', tags: ['basico'] },
  { nombre: 'Frijol negro enlatado (escurrido)', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (85g)', calorias: 109, proteinas: 7.3, carbs: 19.5, grasas: 0.4, fibra: 7.5, ig: 30, equivalente: '1 Leguminosa', tags: ['basico'] },
  { nombre: 'Alubias rojas cocidas', categoria: 'Leguminosas', pais: 'México', porcion: '1/2 taza (85g)', calorias: 112, proteinas: 6.7, carbs: 20.0, grasas: 0.4, fibra: 6.4, ig: 30, equivalente: '1 Leguminosa', tags: ['basico'] },
  { nombre: 'Fava beans cocidas', categoria: 'Leguminosas', pais: 'Egipto', porcion: '1/2 taza (85g)', calorias: 95, proteinas: 6.5, carbs: 16.3, grasas: 0.4, fibra: 4.5, ig: 40, equivalente: '1 Leguminosa', tags: ['basico'] },
  { nombre: 'Lupino cocido', categoria: 'Leguminosas', pais: 'Andes', porcion: '1/2 taza (85g)', calorias: 100, proteinas: 12.0, carbs: 10.0, grasas: 2.5, fibra: 4.5, ig: 15, equivalente: '1 Leguminosa + 1/2 Grasa', tags: ['basico', 'superfood'] },
  { nombre: 'Peas amarillo partido cocido', categoria: 'Leguminosas', pais: 'India', porcion: '1/2 taza (85g)', calorias: 110, proteinas: 8.0, carbs: 19.0, grasas: 0.5, fibra: 7.0, ig: 30, equivalente: '1 Leguminosa', tags: ['basico', 'vegetariano'] },
  { nombre: 'Urd dal cocido', categoria: 'Leguminosas', pais: 'India', porcion: '1/2 taza (85g)', calorias: 100, proteinas: 7.0, carbs: 17.0, grasas: 0.4, fibra: 6.0, ig: 30, equivalente: '1 Leguminosa', tags: ['basico', 'vegetariano'] },
  { nombre: 'Pechuga de pollo cocida', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 165, proteinas: 31.0, carbs: 0.0, grasas: 3.6, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['basico', 'keto'] },
  { nombre: 'Muslo de pollo sin piel cocido', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 161, proteinas: 26.0, carbs: 0.0, grasas: 6.3, fibra: 0.0, ig: 0, equivalente: '1 Carne semigrasa', tags: ['basico'] },
  { nombre: 'Pierna de pollo con piel cocida', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 191, proteinas: 23.0, carbs: 0.0, grasas: 11.0, fibra: 0.0, ig: 0, equivalente: '1 Carne semigrasa', tags: ['basico'] },
  { nombre: 'Carne de res molida 90/10', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 176, proteinas: 26.0, carbs: 0.0, grasas: 10.0, fibra: 0.0, ig: 0, equivalente: '1 Carne semigrasa', tags: ['basico', 'keto'] },
  { nombre: 'Carne de res molida 95/5', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 137, proteinas: 26.0, carbs: 0.0, grasas: 5.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['basico', 'keto'] },
  { nombre: 'Bistec de res magro', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 154, proteinas: 26.0, carbs: 0.0, grasas: 5.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['basico', 'keto'] },
  { nombre: 'Arrachera', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 250, proteinas: 18.0, carbs: 0.0, grasas: 20.0, fibra: 0.0, ig: 0, equivalente: '1 Carne grasa', tags: ['tradicional'] },
  { nombre: 'Cecina de res', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 180, proteinas: 28.0, carbs: 0.0, grasas: 7.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['tradicional'] },
  { nombre: 'Carne seca (machaca)', categoria: 'Proteinas', pais: 'México', porcion: '30g', calorias: 90, proteinas: 15.0, carbs: 0.0, grasas: 3.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['tradicional'] },
  { nombre: 'Suadero cocido', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 310, proteinas: 14.0, carbs: 0.0, grasas: 28.0, fibra: 0.0, ig: 0, equivalente: '1 Carne grasa', tags: ['tradicional'] },
  { nombre: 'Lengua de res cocida', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 284, proteinas: 19.0, carbs: 0.0, grasas: 22.0, fibra: 0.0, ig: 0, equivalente: '1 Carne semigrasa', tags: ['tradicional'] },
  { nombre: 'Tripa (panza) cocida', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 85, proteinas: 12.0, carbs: 0.0, grasas: 3.7, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['tradicional'] },
  { nombre: 'Chicharron de cerdo', categoria: 'Proteinas', pais: 'México', porcion: '20g (1 puño)', calorias: 110, proteinas: 7.0, carbs: 0.0, grasas: 9.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra + 1 Grasa', tags: ['tradicional', 'keto'] },
  { nombre: 'Pechuga de pavo', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 135, proteinas: 30.0, carbs: 0.0, grasas: 1.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['basico', 'keto'] },
  { nombre: 'Milanesa de pollo empanizada', categoria: 'Proteinas', pais: 'México', porcion: '1 pieza (100g)', calorias: 250, proteinas: 18.0, carbs: 15.0, grasas: 13.0, fibra: 0.8, ig: 50, equivalente: '1 Carne magra + 1 Cereal c/g', tags: ['basico'] },
  { nombre: 'Milanesa de res empanizada', categoria: 'Proteinas', pais: 'México', porcion: '1 pieza (100g)', calorias: 260, proteinas: 16.0, carbs: 14.0, grasas: 14.0, fibra: 0.8, ig: 50, equivalente: '1 Carne semigrasa + 1 Cereal c/g', tags: ['basico'] },
  { nombre: 'Salchicha de pollo', categoria: 'Proteinas', pais: 'México', porcion: '2 piezas (80g)', calorias: 180, proteinas: 10.0, carbs: 4.0, grasas: 14.0, fibra: 0.0, ig: 0, equivalente: '1 Carne semigrasa + 1 Grasa', tags: ['basico'] },
  { nombre: 'Salchicha de pavo', categoria: 'Proteinas', pais: 'México', porcion: '2 piezas (80g)', calorias: 140, proteinas: 12.0, carbs: 3.0, grasas: 9.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra + 1/2 Grasa', tags: ['basico'] },
  { nombre: 'Jamon de pavo', categoria: 'Proteinas', pais: 'México', porcion: '2 rebanadas (60g)', calorias: 60, proteinas: 10.0, carbs: 2.0, grasas: 1.5, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['basico'] },
  { nombre: 'Jamon de pierna', categoria: 'Proteinas', pais: 'México', porcion: '2 rebanadas (60g)', calorias: 80, proteinas: 8.0, carbs: 2.0, grasas: 4.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['basico'] },
  { nombre: 'Tocino', categoria: 'Proteinas', pais: 'México', porcion: '2 rebanadas (30g)', calorias: 130, proteinas: 7.0, carbs: 0.5, grasas: 11.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra + 1 Grasa', tags: ['basico', 'keto'] },
  { nombre: 'Atun en agua (lata)', categoria: 'Proteinas', pais: 'México', porcion: '1 lata (140g)', calorias: 120, proteinas: 26.0, carbs: 0.0, grasas: 1.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['basico', 'superfood'] },
  { nombre: 'Atun en aceite (lata)', categoria: 'Proteinas', pais: 'México', porcion: '1 lata (140g)', calorias: 200, proteinas: 26.0, carbs: 0.0, grasas: 8.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra + 1.5 Grasas', tags: ['basico'] },
  { nombre: 'Sardina en tomate (lata)', categoria: 'Proteinas', pais: 'México', porcion: '1 lata (100g)', calorias: 170, proteinas: 18.0, carbs: 2.0, grasas: 10.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra + 1 Grasa', tags: ['basico', 'superfood'] },
  { nombre: 'Salmon fresco cocido', categoria: 'Proteinas', pais: 'Chile', porcion: '100g', calorias: 206, proteinas: 22.0, carbs: 0.0, grasas: 12.0, fibra: 0.0, ig: 0, equivalente: '1 Carne semigrasa + 1 Grasa', tags: ['basico', 'superfood', 'keto'] },
  { nombre: 'Salmon ahumado', categoria: 'Proteinas', pais: 'Chile', porcion: '50g', calorias: 100, proteinas: 11.0, carbs: 0.0, grasas: 6.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra + 1 Grasa', tags: ['basico', 'superfood'] },
  { nombre: 'Trucha arcoiris cocida', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 168, proteinas: 23.5, carbs: 0.0, grasas: 7.5, fibra: 0.0, ig: 0, equivalente: '1 Carne semigrasa', tags: ['basico', 'superfood'] },
  { nombre: 'Mojarra frita', categoria: 'Proteinas', pais: 'México', porcion: '1 pieza (100g)', calorias: 220, proteinas: 18.0, carbs: 8.0, grasas: 12.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra + 1 Cereal c/g', tags: ['tradicional'] },
  { nombre: 'Camaron cocido', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 99, proteinas: 24.0, carbs: 0.2, grasas: 0.3, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['basico', 'keto'] },
  { nombre: 'Ceviche de pescado', categoria: 'Proteinas', pais: 'Perú', porcion: '1 taza (200g)', calorias: 140, proteinas: 22.0, carbs: 6.0, grasas: 3.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra + 1/2 Verdura', tags: ['tradicional', 'superfood'] },
  { nombre: 'Huachinango cocido', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 108, proteinas: 22.0, carbs: 0.0, grasas: 2.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['tradicional', 'superfood'] },
  { nombre: 'Sierra fileteada cocida', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 130, proteinas: 20.0, carbs: 0.0, grasas: 5.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['basico'] },
  { nombre: 'Huevo entero cocido', categoria: 'Proteinas', pais: 'México', porcion: '1 pieza (50g)', calorias: 72, proteinas: 6.3, carbs: 0.6, grasas: 5.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['basico', 'keto'] },
  { nombre: 'Clara de huevo cocida', categoria: 'Proteinas', pais: 'México', porcion: '2 claras (66g)', calorias: 34, proteinas: 7.2, carbs: 0.4, grasas: 0.1, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['basico', 'keto'] },
  { nombre: 'Huevo revuelto', categoria: 'Proteinas', pais: 'México', porcion: '1 pieza (50g)', calorias: 90, proteinas: 6.0, carbs: 1.0, grasas: 7.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra + 1/2 Grasa', tags: ['basico'] },
  { nombre: 'Tortilla de huevo', categoria: 'Proteinas', pais: 'México', porcion: '1 pieza (80g)', calorias: 150, proteinas: 8.0, carbs: 2.0, grasas: 12.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra + 1 Grasa', tags: ['basico', 'desayuno'] },
  { nombre: 'Huevo estrellado', categoria: 'Proteinas', pais: 'México', porcion: '1 pieza (50g)', calorias: 80, proteinas: 6.3, carbs: 0.6, grasas: 5.5, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['basico', 'desayuno'] },
  { nombre: 'Sobao de huevo', categoria: 'Proteinas', pais: 'México', porcion: '1 pieza (60g)', calorias: 180, proteinas: 10.0, carbs: 8.0, grasas: 12.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra + 1 Grasa', tags: ['tradicional'] },
  { nombre: 'Longaniza de pollo', categoria: 'Proteinas', pais: 'México', porcion: '2 piezas (80g)', calorias: 170, proteinas: 13.0, carbs: 3.0, grasas: 12.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra + 1 Grasa', tags: ['tradicional'] },
  { nombre: 'Chorizo argentino', categoria: 'Proteinas', pais: 'Argentina', porcion: '50g', calorias: 230, proteinas: 10.0, carbs: 2.0, grasas: 20.0, fibra: 0.0, ig: 0, equivalente: '1 Carne semigrasa + 2 Grasas', tags: ['tradicional'] },
  { nombre: 'Morcilla (moronga)', categoria: 'Proteinas', pais: 'México', porcion: '50g', calorias: 150, proteinas: 7.0, carbs: 8.0, grasas: 10.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra + 1 Grasa', tags: ['tradicional'] },
  { nombre: 'Pato cocido', categoria: 'Proteinas', pais: 'Perú', porcion: '100g', calorias: 201, proteinas: 23.5, carbs: 0.0, grasas: 11.4, fibra: 0.0, ig: 0, equivalente: '1 Carne semigrasa', tags: ['tradicional'] },
  { nombre: 'Conejo estofado', categoria: 'Proteinas', pais: 'México', porcion: '100g', calorias: 173, proteinas: 33.0, carbs: 0.0, grasas: 3.5, fibra: 0.0, ig: 0, equivalente: '1 Carne magra', tags: ['basico', 'keto'] },
  { nombre: 'Leche entera', categoria: 'Lacteos', pais: 'México', porcion: '1 taza (240ml)', calorias: 150, proteinas: 8.0, carbs: 12.0, grasas: 8.0, fibra: 0.0, ig: 30, equivalente: '1 Leche entera', tags: ['basico'] },
  { nombre: 'Leche semi', categoria: 'Lacteos', pais: 'México', porcion: '1 taza (240ml)', calorias: 122, proteinas: 8.0, carbs: 12.0, grasas: 4.6, fibra: 0.0, ig: 30, equivalente: '1 Leche semi', tags: ['basico'] },
  { nombre: 'Leche descremada', categoria: 'Lacteos', pais: 'México', porcion: '1 taza (240ml)', calorias: 83, proteinas: 8.0, carbs: 12.0, grasas: 0.2, fibra: 0.0, ig: 32, equivalente: '1 Leche descremada', tags: ['basico'] },
  { nombre: 'Leche light', categoria: 'Lacteos', pais: 'México', porcion: '1 taza (240ml)', calorias: 95, proteinas: 8.0, carbs: 12.0, grasas: 2.5, fibra: 0.0, ig: 30, equivalente: '1 Leche light', tags: ['basico'] },
  { nombre: 'Leche evaporada', categoria: 'Lacteos', pais: 'México', porcion: '1/2 taza (120ml)', calorias: 170, proteinas: 8.5, carbs: 12.5, grasas: 10.0, fibra: 0.0, ig: 30, equivalente: '1 Leche entera', tags: ['basico'] },
  { nombre: 'Leche condensada', categoria: 'Lacteos', pais: 'México', porcion: '2 cdas (30g)', calorias: 90, proteinas: 2.2, carbs: 15.2, grasas: 2.4, fibra: 0.0, ig: 61, equivalente: '1 Cereal c/g', tags: ['postre'] },
  { nombre: 'Yogurt natural entero', categoria: 'Lacteos', pais: 'México', porcion: '1 taza (240g)', calorias: 150, proteinas: 8.5, carbs: 11.4, grasas: 8.0, fibra: 0.0, ig: 36, equivalente: '1 Leche entera', tags: ['basico', 'probiotico'] },
  { nombre: 'Yogurt natural light', categoria: 'Lacteos', pais: 'México', porcion: '1 taza (240g)', calorias: 110, proteinas: 11.0, carbs: 15.6, grasas: 0.0, fibra: 0.0, ig: 35, equivalente: '1 Leche descremada', tags: ['basico', 'probiotico'] },
  { nombre: 'Yogurt griego natural', categoria: 'Lacteos', pais: 'México', porcion: '1 taza (240g)', calorias: 200, proteinas: 20.0, carbs: 8.0, grasas: 10.0, fibra: 0.0, ig: 11, equivalente: '2 Leches enteras', tags: ['basico', 'superfood', 'keto'] },
  { nombre: 'Yogurt griego light', categoria: 'Lacteos', pais: 'México', porcion: '1 taza (240g)', calorias: 130, proteinas: 22.0, carbs: 8.0, grasas: 0.0, fibra: 0.0, ig: 11, equivalente: '2 Leches descremadas', tags: ['basico', 'superfood'] },
  { nombre: 'Yogurt bebible frutal', categoria: 'Lacteos', pais: 'México', porcion: '1 taza (240g)', calorias: 180, proteinas: 6.0, carbs: 30.0, grasas: 3.5, fibra: 0.0, ig: 40, equivalente: '1 Leche entera + 1 Fruta', tags: ['basico'] },
  { nombre: 'Queso fresco', categoria: 'Lacteos', pais: 'México', porcion: '30g', calorias: 80, proteinas: 5.0, carbs: 1.0, grasas: 6.0, fibra: 0.0, ig: 0, equivalente: '1 Leche entera', tags: ['basico'] },
  { nombre: 'Queso Oaxaca', categoria: 'Lacteos', pais: 'México', porcion: '30g', calorias: 90, proteinas: 6.0, carbs: 1.0, grasas: 7.0, fibra: 0.0, ig: 0, equivalente: '1 Leche entera', tags: ['basico'] },
  { nombre: 'Queso manchego', categoria: 'Lacteos', pais: 'México', porcion: '30g', calorias: 110, proteinas: 7.0, carbs: 1.0, grasas: 9.0, fibra: 0.0, ig: 0, equivalente: '1 Leche entera', tags: ['basico'] },
  { nombre: 'Queso panela', categoria: 'Lacteos', pais: 'México', porcion: '40g', calorias: 70, proteinas: 6.0, carbs: 1.0, grasas: 5.0, fibra: 0.0, ig: 0, equivalente: '1 Leche baja en grasa', tags: ['basico'] },
  { nombre: 'Queso cottage', categoria: 'Lacteos', pais: 'México', porcion: '1/2 taza (100g)', calorias: 90, proteinas: 12.0, carbs: 4.0, grasas: 3.0, fibra: 0.0, ig: 0, equivalente: '1 Leche baja en grasa', tags: ['basico', 'superfood'] },
  { nombre: 'Queso crema light', categoria: 'Lacteos', pais: 'México', porcion: '2 cdas (30g)', calorias: 70, proteinas: 2.5, carbs: 2.5, grasas: 5.0, fibra: 0.0, ig: 0, equivalente: '1 Grasa', tags: ['basico'] },
  { nombre: 'Queso crema regular', categoria: 'Lacteos', pais: 'México', porcion: '2 cdas (30g)', calorias: 100, proteinas: 2.0, carbs: 2.0, grasas: 9.0, fibra: 0.0, ig: 0, equivalente: '2 Grasas', tags: ['basico'] },
  { nombre: 'Requeson', categoria: 'Lacteos', pais: 'México', porcion: '1/2 taza (100g)', calorias: 100, proteinas: 12.0, carbs: 4.0, grasas: 4.0, fibra: 0.0, ig: 0, equivalente: '1 Leche baja en grasa', tags: ['basico'] },
  { nombre: 'Crema acida', categoria: 'Lacteos', pais: 'México', porcion: '2 cdas (30g)', calorias: 60, proteinas: 1.0, carbs: 2.0, grasas: 5.0, fibra: 0.0, ig: 0, equivalente: '1 Grasa', tags: ['basico'] },
  { nombre: 'Crema para batir', categoria: 'Lacteos', pais: 'México', porcion: '2 cdas (30g)', calorias: 100, proteinas: 0.5, carbs: 1.0, grasas: 11.0, fibra: 0.0, ig: 0, equivalente: '2 Grasas', tags: ['basico'] },
  { nombre: 'Mantequilla', categoria: 'Lacteos', pais: 'México', porcion: '1 cda (14g)', calorias: 100, proteinas: 0.0, carbs: 0.0, grasas: 11.0, fibra: 0.0, ig: 0, equivalente: '2 Grasas', tags: ['basico', 'keto'] },
  { nombre: 'Margarina vegetal', categoria: 'Lacteos', pais: 'México', porcion: '1 cda (14g)', calorias: 100, proteinas: 0.0, carbs: 0.0, grasas: 11.0, fibra: 0.0, ig: 0, equivalente: '2 Grasas', tags: ['basico'] },
  { nombre: 'Leche de almendra sin azucar', categoria: 'Lacteos', pais: 'México', porcion: '1 taza (240ml)', calorias: 30, proteinas: 1.0, carbs: 1.0, grasas: 2.5, fibra: 0.5, ig: 5, equivalente: 'Libre', tags: ['vegetariano', 'keto'] },
  { nombre: 'Leche de coco bebible', categoria: 'Lacteos', pais: 'México', porcion: '1 taza (240ml)', calorias: 45, proteinas: 0.5, carbs: 2.0, grasas: 4.5, fibra: 0.0, ig: 5, equivalente: '1 Grasa', tags: ['vegetariano', 'keto'] },
  { nombre: 'Leche de soya', categoria: 'Lacteos', pais: 'México', porcion: '1 taza (240ml)', calorias: 80, proteinas: 7.0, carbs: 4.0, grasas: 3.5, fibra: 1.0, ig: 30, equivalente: '1 Leche semi', tags: ['vegetariano'] },
  { nombre: 'Queso vegano (soya)', categoria: 'Lacteos', pais: 'México', porcion: '30g', calorias: 70, proteinas: 3.0, carbs: 6.0, grasas: 4.0, fibra: 0.0, ig: 0, equivalente: '1 Grasa', tags: ['vegetariano'] },
  { nombre: 'Yogurt de coco', categoria: 'Lacteos', pais: 'México', porcion: '1 taza (240g)', calorias: 120, proteinas: 1.0, carbs: 12.0, grasas: 8.0, fibra: 0.0, ig: 15, equivalente: '1 Grasa + 1 Fruta', tags: ['vegetariano'] },
  { nombre: 'Kefir de leche', categoria: 'Lacteos', pais: 'México', porcion: '1 taza (240ml)', calorias: 160, proteinas: 8.5, carbs: 12.0, grasas: 8.0, fibra: 0.0, ig: 36, equivalente: '1 Leche entera', tags: ['basico', 'probiotico', 'superfood'] },
  { nombre: 'Aceite de oliva extra virgen', categoria: 'Grasas', pais: 'México', porcion: '1 cda (15ml)', calorias: 120, proteinas: 0.0, carbs: 0.0, grasas: 13.5, fibra: 0.0, ig: 0, equivalente: '3 Grasas', tags: ['basico', 'superfood', 'keto'] },
  { nombre: 'Aceite de coco', categoria: 'Grasas', pais: 'México', porcion: '1 cda (15ml)', calorias: 120, proteinas: 0.0, carbs: 0.0, grasas: 13.5, fibra: 0.0, ig: 0, equivalente: '3 Grasas', tags: ['basico', 'keto'] },
  { nombre: 'Aceite de aguacate', categoria: 'Grasas', pais: 'México', porcion: '1 cda (15ml)', calorias: 120, proteinas: 0.0, carbs: 0.0, grasas: 13.5, fibra: 0.0, ig: 0, equivalente: '3 Grasas', tags: ['basico', 'keto'] },
  { nombre: 'Aceite de maiz', categoria: 'Grasas', pais: 'México', porcion: '1 cda (15ml)', calorias: 120, proteinas: 0.0, carbs: 0.0, grasas: 13.5, fibra: 0.0, ig: 0, equivalente: '3 Grasas', tags: ['basico'] },
  { nombre: 'Aceite de canola', categoria: 'Grasas', pais: 'México', porcion: '1 cda (15ml)', calorias: 120, proteinas: 0.0, carbs: 0.0, grasas: 13.5, fibra: 0.0, ig: 0, equivalente: '3 Grasas', tags: ['basico'] },
  { nombre: 'Aceite de girasol', categoria: 'Grasas', pais: 'México', porcion: '1 cda (15ml)', calorias: 120, proteinas: 0.0, carbs: 0.0, grasas: 13.5, fibra: 0.0, ig: 0, equivalente: '3 Grasas', tags: ['basico'] },
  { nombre: 'Manteca de cerdo', categoria: 'Grasas', pais: 'México', porcion: '1 cda (12g)', calorias: 115, proteinas: 0.0, carbs: 0.0, grasas: 12.8, fibra: 0.0, ig: 0, equivalente: '2.5 Grasas', tags: ['tradicional', 'keto'] },
  { nombre: 'Aguacate hass', categoria: 'Grasas', pais: 'México', porcion: '1/3 pieza (50g)', calorias: 80, proteinas: 1.0, carbs: 4.3, grasas: 7.3, fibra: 3.3, ig: 15, equivalente: '1.5 Grasas', tags: ['basico', 'superfood', 'keto'] },
  { nombre: 'Aguacate criollo', categoria: 'Grasas', pais: 'México', porcion: '1 pieza (80g)', calorias: 128, proteinas: 1.6, carbs: 6.8, grasas: 11.8, fibra: 5.4, ig: 15, equivalente: '2.5 Grasas', tags: ['basico'] },
  { nombre: 'Guacamole natural', categoria: 'Grasas', pais: 'México', porcion: '1/4 taza (60g)', calorias: 100, proteinas: 1.5, carbs: 5.0, grasas: 9.0, fibra: 3.8, ig: 15, equivalente: '2 Grasas', tags: ['basico', 'superfood'] },
  { nombre: 'Coco rallado seco', categoria: 'Grasas', pais: 'México', porcion: '2 cdas (15g)', calorias: 95, proteinas: 0.9, carbs: 3.4, grasas: 9.0, fibra: 2.0, ig: 5, equivalente: '2 Grasas', tags: ['basico', 'keto'] },
  { nombre: 'Coco fresco', categoria: 'Grasas', pais: 'Colombia', porcion: '1/2 taza (80g)', calorias: 142, proteinas: 1.4, carbs: 6.2, grasas: 13.4, fibra: 4.0, ig: 5, equivalente: '2 Grasas + 1/2 Fruta', tags: ['basico'] },
  { nombre: 'Aceitunas verdes', categoria: 'Grasas', pais: 'México', porcion: '5 piezas (15g)', calorias: 45, proteinas: 0.5, carbs: 1.0, grasas: 4.5, fibra: 0.5, ig: 0, equivalente: '1 Grasa', tags: ['basico', 'keto'] },
  { nombre: 'Aceitunas negras', categoria: 'Grasas', pais: 'México', porcion: '5 piezas (15g)', calorias: 50, proteinas: 0.4, carbs: 2.5, grasas: 4.5, fibra: 0.5, ig: 0, equivalente: '1 Grasa', tags: ['basico', 'keto'] },
  { nombre: 'Chimichurri', categoria: 'Grasas', pais: 'Argentina', porcion: '2 cdas (30g)', calorias: 80, proteinas: 0.5, carbs: 2.0, grasas: 8.0, fibra: 0.5, ig: 0, equivalente: '1.5 Grasas', tags: ['tradicional'] },
  { nombre: 'Aderezo ranch light', categoria: 'Grasas', pais: 'México', porcion: '2 cdas (30g)', calorias: 80, proteinas: 1.0, carbs: 3.0, grasas: 7.0, fibra: 0.0, ig: 0, equivalente: '1.5 Grasas', tags: ['basico'] },
  { nombre: 'Aderezo italiano light', categoria: 'Grasas', pais: 'México', porcion: '2 cdas (30g)', calorias: 50, proteinas: 0.0, carbs: 2.0, grasas: 5.0, fibra: 0.0, ig: 0, equivalente: '1 Grasa', tags: ['basico'] },
  { nombre: 'Vinagreta balsamica', categoria: 'Grasas', pais: 'México', porcion: '2 cdas (30g)', calorias: 60, proteinas: 0.0, carbs: 5.0, grasas: 4.5, fibra: 0.0, ig: 15, equivalente: '1 Grasa', tags: ['basico'] },
  { nombre: 'Mayonesa light', categoria: 'Grasas', pais: 'México', porcion: '1 cda (15g)', calorias: 50, proteinas: 0.0, carbs: 1.0, grasas: 5.0, fibra: 0.0, ig: 0, equivalente: '1 Grasa', tags: ['basico'] },
  { nombre: 'Mayonesa regular', categoria: 'Grasas', pais: 'México', porcion: '1 cda (15g)', calorias: 100, proteinas: 0.0, carbs: 0.0, grasas: 11.0, fibra: 0.0, ig: 0, equivalente: '2 Grasas', tags: ['basico'] },
  { nombre: 'Tahini (pasta de ajonjoli)', categoria: 'Grasas', pais: 'México', porcion: '1 cda (15g)', calorias: 89, proteinas: 2.6, carbs: 3.2, grasas: 8.0, fibra: 1.4, ig: 0, equivalente: '2 Grasas', tags: ['basico', 'superfood'] },
  { nombre: 'Pasta de cacahuate natural', categoria: 'Grasas', pais: 'México', porcion: '1 cda (16g)', calorias: 95, proteinas: 4.0, carbs: 3.5, grasas: 8.0, fibra: 1.0, ig: 14, equivalente: '2 Grasas', tags: ['basico', 'superfood'] },
  { nombre: 'Mantequilla de almendra', categoria: 'Grasas', pais: 'México', porcion: '1 cda (16g)', calorias: 98, proteinas: 3.4, carbs: 3.0, grasas: 8.8, fibra: 1.6, ig: 0, equivalente: '2 Grasas', tags: ['basico', 'keto'] },
  { nombre: 'Agua natural', categoria: 'Bebidas', pais: 'México', porcion: '1 vaso (250ml)', calorias: 0, proteinas: 0.0, carbs: 0.0, grasas: 0.0, fibra: 0.0, ig: 0, equivalente: 'Libre', tags: ['basico', 'hidratacion'] },
  { nombre: 'Agua de jamaica natural', categoria: 'Bebidas', pais: 'México', porcion: '1 vaso (250ml)', calorias: 20, proteinas: 0.0, carbs: 5.0, grasas: 0.0, fibra: 0.2, ig: 5, equivalente: 'Libre', tags: ['basico', 'hidratacion'] },
  { nombre: 'Agua de horchata (arroz)', categoria: 'Bebidas', pais: 'México', porcion: '1 vaso (250ml)', calorias: 100, proteinas: 1.0, carbs: 20.0, grasas: 1.5, fibra: 0.3, ig: 70, equivalente: '1 Cereal c/g', tags: ['tradicional'] },
  { nombre: 'Agua de horchata (almendra)', categoria: 'Bebidas', pais: 'México', porcion: '1 vaso (250ml)', calorias: 40, proteinas: 1.0, carbs: 5.0, grasas: 2.0, fibra: 0.3, ig: 5, equivalente: 'Libre', tags: ['tradicional'] },
  { nombre: 'Agua de limon con chia', categoria: 'Bebidas', pais: 'México', porcion: '1 vaso (250ml)', calorias: 15, proteinas: 0.5, carbs: 3.0, grasas: 0.5, fibra: 2.0, ig: 5, equivalente: 'Libre', tags: ['basico', 'hidratacion', 'superfood'] },
  { nombre: 'Cafe americano', categoria: 'Bebidas', pais: 'México', porcion: '1 taza (240ml)', calorias: 2, proteinas: 0.3, carbs: 0.0, grasas: 0.0, fibra: 0.0, ig: 0, equivalente: 'Libre', tags: ['basico'] },
  { nombre: 'Cafe con leche descremada', categoria: 'Bebidas', pais: 'México', porcion: '1 taza (240ml)', calorias: 45, proteinas: 4.0, carbs: 6.0, grasas: 0.2, fibra: 0.0, ig: 32, equivalente: '1/2 Leche descremada', tags: ['basico', 'desayuno'] },
  { nombre: 'Cafe con leche entera', categoria: 'Bebidas', pais: 'México', porcion: '1 taza (240ml)', calorias: 80, proteinas: 4.0, carbs: 6.0, grasas: 4.2, fibra: 0.0, ig: 30, equivalente: '1/2 Leche entera', tags: ['basico', 'desayuno'] },
  { nombre: 'Te verde natural', categoria: 'Bebidas', pais: 'México', porcion: '1 taza (240ml)', calorias: 2, proteinas: 0.0, carbs: 0.5, grasas: 0.0, fibra: 0.0, ig: 0, equivalente: 'Libre', tags: ['basico', 'superfood'] },
  { nombre: 'Te negro natural', categoria: 'Bebidas', pais: 'México', porcion: '1 taza (240ml)', calorias: 2, proteinas: 0.0, carbs: 0.5, grasas: 0.0, fibra: 0.0, ig: 0, equivalente: 'Libre', tags: ['basico'] },
  { nombre: 'Te de manzanilla', categoria: 'Bebidas', pais: 'México', porcion: '1 taza (240ml)', calorias: 0, proteinas: 0.0, carbs: 0.0, grasas: 0.0, fibra: 0.0, ig: 0, equivalente: 'Libre', tags: ['basico', 'digestivo'] },
  { nombre: 'Jugo de naranja natural', categoria: 'Bebidas', pais: 'México', porcion: '1 vaso (250ml)', calorias: 112, proteinas: 1.7, carbs: 25.8, grasas: 0.5, fibra: 0.5, ig: 50, equivalente: '2 Frutas', tags: ['basico'] },
  { nombre: 'Jugo de zanahoria', categoria: 'Bebidas', pais: 'México', porcion: '1 vaso (250ml)', calorias: 94, proteinas: 2.2, carbs: 21.9, grasas: 0.4, fibra: 1.9, ig: 47, equivalente: '1 Verdura + 1 Fruta', tags: ['basico'] },
  { nombre: 'Jugo verde (detox)', categoria: 'Bebidas', pais: 'México', porcion: '1 vaso (250ml)', calorias: 60, proteinas: 2.0, carbs: 12.0, grasas: 0.5, fibra: 3.0, ig: 15, equivalente: '1 Verdura', tags: ['basico', 'superfood'] },
  { nombre: 'Licuado de platano con leche', categoria: 'Bebidas', pais: 'México', porcion: '1 vaso (300ml)', calorias: 200, proteinas: 8.0, carbs: 35.0, grasas: 4.5, fibra: 2.0, ig: 50, equivalente: '1 Leche entera + 1 Fruta', tags: ['basico', 'desayuno'] },
  { nombre: 'Licuado de fresa con leche', categoria: 'Bebidas', pais: 'México', porcion: '1 vaso (300ml)', calorias: 160, proteinas: 8.5, carbs: 26.0, grasas: 3.5, fibra: 2.5, ig: 40, equivalente: '1 Leche entera + 1 Fruta', tags: ['basico', 'desayuno'] },
  { nombre: 'Agua de coco natural', categoria: 'Bebidas', pais: 'México', porcion: '1 vaso (250ml)', calorias: 46, proteinas: 1.7, carbs: 8.9, grasas: 0.5, fibra: 2.6, ig: 5, equivalente: '1/2 Fruta', tags: ['basico', 'hidratacion', 'electrolitos'] },
  { nombre: 'Bebida isotonica comercial', categoria: 'Bebidas', pais: 'México', porcion: '1 botella (500ml)', calorias: 120, proteinas: 0.0, carbs: 30.0, grasas: 0.0, fibra: 0.0, ig: 78, equivalente: '2 Cereales s/g', tags: ['deportivo', 'hidratacion'] },
  { nombre: 'Bebida energetica', categoria: 'Bebidas', pais: 'México', porcion: '1 lata (250ml)', calorias: 110, proteinas: 0.0, carbs: 27.0, grasas: 0.0, fibra: 0.0, ig: 70, equivalente: '2 Cereales s/g', tags: ['pre-entreno'] },
  { nombre: 'Pulque natural', categoria: 'Bebidas', pais: 'México', porcion: '1 vaso (250ml)', calorias: 120, proteinas: 0.5, carbs: 12.0, grasas: 0.0, fibra: 0.0, ig: 5, equivalente: '1 Cereal c/g', tags: ['tradicional', 'fermentado'] },
  { nombre: 'Dulce de leche', categoria: 'Dulces', pais: 'Argentina', porcion: '1 cda (20g)', calorias: 60, proteinas: 1.0, carbs: 10.0, grasas: 1.5, fibra: 0.0, ig: 50, equivalente: '1/2 Cereal c/g', tags: ['tradicional', 'postre'] },
  { nombre: 'Cajeta de Celaya', categoria: 'Dulces', pais: 'México', porcion: '1 cda (20g)', calorias: 65, proteinas: 1.0, carbs: 11.0, grasas: 2.0, fibra: 0.0, ig: 50, equivalente: '1/2 Cereal c/g', tags: ['tradicional', 'postre'] },
  { nombre: 'Chongos zamoranos', categoria: 'Dulces', pais: 'México', porcion: '1/2 taza (100g)', calorias: 180, proteinas: 6.0, carbs: 28.0, grasas: 5.0, fibra: 0.0, ig: 40, equivalente: '1 Leche entera + 1 Cereal c/g', tags: ['tradicional', 'postre'] },
  { nombre: 'Arroz con leche', categoria: 'Dulces', pais: 'México', porcion: '1/2 taza (100g)', calorias: 150, proteinas: 4.0, carbs: 25.0, grasas: 4.0, fibra: 0.3, ig: 50, equivalente: '1 Leche entera + 1 Cereal s/g', tags: ['tradicional', 'postre'] },
  { nombre: 'Flan napolitano', categoria: 'Dulces', pais: 'México', porcion: '1 rebanada (80g)', calorias: 180, proteinas: 5.0, carbs: 25.0, grasas: 6.0, fibra: 0.0, ig: 40, equivalente: '1 Leche entera + 1 Cereal c/g', tags: ['tradicional', 'postre'] },
  { nombre: 'Gelatina de frutas', categoria: 'Dulces', pais: 'México', porcion: '1/2 taza (100g)', calorias: 70, proteinas: 1.5, carbs: 15.0, grasas: 0.0, fibra: 0.0, ig: 50, equivalente: '1 Fruta', tags: ['basico', 'postre'] },
  { nombre: 'Gelatina natural sin azucar', categoria: 'Dulces', pais: 'México', porcion: '1 taza (240g)', calorias: 20, proteinas: 4.0, carbs: 0.0, grasas: 0.0, fibra: 0.0, ig: 0, equivalente: 'Libre', tags: ['basico', 'keto'] },
  { nombre: 'Jericalla', categoria: 'Dulces', pais: 'México', porcion: '1 pieza (100g)', calorias: 200, proteinas: 6.0, carbs: 25.0, grasas: 8.0, fibra: 0.0, ig: 40, equivalente: '1 Leche entera + 1 Cereal c/g', tags: ['tradicional', 'postre'] },
  { nombre: 'Chocolate semi-amargo', categoria: 'Dulces', pais: 'México', porcion: '20g', calorias: 100, proteinas: 1.5, carbs: 8.0, grasas: 7.0, fibra: 1.5, ig: 23, equivalente: '1 Grasa + 1/2 Fruta', tags: ['basico', 'superfood'] },
  { nombre: 'Chocolate amargo 70%', categoria: 'Dulces', pais: 'México', porcion: '20g', calorias: 110, proteinas: 1.8, carbs: 7.0, grasas: 8.5, fibra: 2.0, ig: 22, equivalente: '1.5 Grasas', tags: ['basico', 'superfood', 'keto'] },
  { nombre: 'Champurrado', categoria: 'Dulces', pais: 'México', porcion: '1 taza (250ml)', calorias: 180, proteinas: 4.0, carbs: 30.0, grasas: 4.0, fibra: 1.5, ig: 55, equivalente: '1 Leche entera + 1 Cereal s/g', tags: ['tradicional', 'desayuno'] },
  { nombre: 'Atole de maiz', categoria: 'Dulces', pais: 'México', porcion: '1 taza (250ml)', calorias: 120, proteinas: 3.0, carbs: 22.0, grasas: 2.5, fibra: 1.0, ig: 55, equivalente: '1 Cereal s/g + 1/2 Leche', tags: ['tradicional', 'desayuno'] },
  { nombre: 'Atole de avena', categoria: 'Dulces', pais: 'México', porcion: '1 taza (250ml)', calorias: 140, proteinas: 4.5, carbs: 24.0, grasas: 3.0, fibra: 2.5, ig: 42, equivalente: '1 Cereal s/g + 1/2 Leche', tags: ['tradicional', 'desayuno'] },
  { nombre: 'Panquecito (mantecada)', categoria: 'Dulces', pais: 'México', porcion: '1 pieza (40g)', calorias: 160, proteinas: 2.5, carbs: 22.0, grasas: 7.0, fibra: 0.5, ig: 65, equivalente: '1 Cereal c/g + 1 Grasa', tags: ['tradicional', 'colacion'] },
  { nombre: 'Concha de pan dulce', categoria: 'Dulces', pais: 'México', porcion: '1 pieza (55g)', calorias: 200, proteinas: 4.5, carbs: 35.0, grasas: 5.0, fibra: 1.5, ig: 70, equivalente: '2 Cereales c/g', tags: ['tradicional', 'desayuno'] },
  { nombre: 'Oreja de pan dulce', categoria: 'Dulces', pais: 'México', porcion: '1 pieza (35g)', calorias: 140, proteinas: 2.5, carbs: 20.0, grasas: 5.5, fibra: 0.5, ig: 70, equivalente: '1 Cereal c/g + 1 Grasa', tags: ['tradicional'] },
  { nombre: 'Bunuelo', categoria: 'Dulces', pais: 'Colombia', porcion: '1 pieza (40g)', calorias: 180, proteinas: 2.0, carbs: 24.0, grasas: 8.0, fibra: 0.8, ig: 70, equivalente: '1 Cereal c/g + 1.5 Grasas', tags: ['tradicional'] },
  { nombre: 'Natilla colombiana', categoria: 'Dulces', pais: 'Colombia', porcion: '1/2 taza (100g)', calorias: 160, proteinas: 5.0, carbs: 28.0, grasas: 3.5, fibra: 0.0, ig: 45, equivalente: '1 Leche entera + 1 Cereal s/g', tags: ['tradicional', 'postre'] },
  { nombre: 'Suspiro limeno', categoria: 'Dulces', pais: 'Perú', porcion: '1 pieza (60g)', calorias: 220, proteinas: 4.0, carbs: 28.0, grasas: 10.0, fibra: 0.0, ig: 40, equivalente: '1 Leche entera + 2 Grasas', tags: ['tradicional', 'postre'] },
  { nombre: 'Mazamorra morada', categoria: 'Dulces', pais: 'Perú', porcion: '1 taza (250g)', calorias: 200, proteinas: 3.0, carbs: 40.0, grasas: 3.0, fibra: 2.0, ig: 50, equivalente: '2 Cereales c/g', tags: ['tradicional', 'postre'] },
  { nombre: 'Helado de vainilla', categoria: 'Dulces', pais: 'México', porcion: '1/2 taza (80g)', calorias: 140, proteinas: 2.5, carbs: 16.0, grasas: 7.0, fibra: 0.0, ig: 65, equivalente: '1 Grasa + 1 Fruta', tags: ['postre'] },
  { nombre: 'Nieve de garrafa (limon)', categoria: 'Dulces', pais: 'México', porcion: '1/2 taza (80g)', calorias: 90, proteinas: 0.0, carbs: 20.0, grasas: 0.0, fibra: 0.0, ig: 50, equivalente: '1 Fruta', tags: ['postre', 'tradicional'] },
  { nombre: 'Galleta Maria', categoria: 'Dulces', pais: 'México', porcion: '3 piezas (15g)', calorias: 70, proteinas: 1.2, carbs: 12.0, grasas: 2.0, fibra: 0.5, ig: 70, equivalente: '1 Cereal c/g', tags: ['basico', 'colacion'] },
  { nombre: 'Galleta de animalitos', categoria: 'Dulces', pais: 'México', porcion: '10 piezas (20g)', calorias: 90, proteinas: 1.5, carbs: 14.0, grasas: 3.0, fibra: 0.5, ig: 75, equivalente: '1 Cereal c/g', tags: ['basico', 'colacion'] },
  { nombre: 'Palanqueta de cacahuate', categoria: 'Dulces', pais: 'México', porcion: '1 pieza (25g)', calorias: 120, proteinas: 3.0, carbs: 12.0, grasas: 7.0, fibra: 1.0, ig: 50, equivalente: '1 Cereal s/g + 1 Grasa', tags: ['tradicional', 'colacion'] },
  { nombre: 'Alegria de amaranto', categoria: 'Dulces', pais: 'México', porcion: '1 pieza (30g)', calorias: 120, proteinas: 2.0, carbs: 20.0, grasas: 3.5, fibra: 1.5, ig: 35, equivalente: '1 Cereal c/g', tags: ['tradicional', 'superfood', 'colacion'] },
  { nombre: 'Salsa verde cruda', categoria: 'Condimentos', pais: 'México', porcion: '1/4 taza (60g)', calorias: 20, proteinas: 0.5, carbs: 4.0, grasas: 0.2, fibra: 1.0, ig: 5, equivalente: 'Libre', tags: ['basico', 'tradicional'] },
  { nombre: 'Salsa roja cocida', categoria: 'Condimentos', pais: 'México', porcion: '1/4 taza (60g)', calorias: 25, proteinas: 0.5, carbs: 5.0, grasas: 0.3, fibra: 1.2, ig: 5, equivalente: 'Libre', tags: ['basico', 'tradicional'] },
  { nombre: 'Guacamole natural', categoria: 'Condimentos', pais: 'México', porcion: '1/4 taza (60g)', calorias: 100, proteinas: 1.5, carbs: 5.0, grasas: 9.0, fibra: 3.8, ig: 15, equivalente: '2 Grasas', tags: ['basico', 'superfood'] },
  { nombre: 'Pico de gallo', categoria: 'Condimentos', pais: 'México', porcion: '1/2 taza (80g)', calorias: 18, proteinas: 0.5, carbs: 3.8, grasas: 0.2, fibra: 1.2, ig: 10, equivalente: 'Libre', tags: ['basico'] },
  { nombre: 'Mole poblano', categoria: 'Condimentos', pais: 'México', porcion: '1/2 taza (100g)', calorias: 200, proteinas: 6.0, carbs: 15.0, grasas: 14.0, fibra: 3.0, ig: 20, equivalente: '1 Carne magra + 2 Grasas', tags: ['tradicional', 'superfood'] },
  { nombre: 'Mole verde', categoria: 'Condimentos', pais: 'México', porcion: '1/2 taza (100g)', calorias: 160, proteinas: 5.0, carbs: 12.0, grasas: 10.0, fibra: 2.5, ig: 15, equivalente: '1 Carne magra + 1.5 Grasas', tags: ['tradicional'] },
  { nombre: 'Pipian rojo', categoria: 'Condimentos', pais: 'México', porcion: '1/2 taza (100g)', calorias: 180, proteinas: 5.0, carbs: 10.0, grasas: 13.0, fibra: 2.5, ig: 15, equivalente: '1 Carne magra + 2 Grasas', tags: ['tradicional'] },
  { nombre: 'Adobo de chile', categoria: 'Condimentos', pais: 'México', porcion: '1/4 taza (60g)', calorias: 30, proteinas: 1.0, carbs: 4.0, grasas: 1.5, fibra: 1.5, ig: 5, equivalente: 'Libre', tags: ['tradicional'] },
  { nombre: 'Recado rojo', categoria: 'Condimentos', pais: 'Yucatán', porcion: '2 cdas (30g)', calorias: 35, proteinas: 0.5, carbs: 5.0, grasas: 1.5, fibra: 1.5, ig: 5, equivalente: 'Libre', tags: ['tradicional'] },
  { nombre: 'Salsa de soya baja en sodio', categoria: 'Condimentos', pais: 'México', porcion: '1 cda (15ml)', calorias: 8, proteinas: 0.8, carbs: 1.0, grasas: 0.0, fibra: 0.0, ig: 0, equivalente: 'Libre', tags: ['basico'] },
  { nombre: 'Salsa inglesa', categoria: 'Condimentos', pais: 'México', porcion: '1 cda (15ml)', calorias: 10, proteinas: 0.0, carbs: 2.0, grasas: 0.0, fibra: 0.0, ig: 0, equivalente: 'Libre', tags: ['basico'] },
  { nombre: 'Mostaza', categoria: 'Condimentos', pais: 'México', porcion: '1 cda (15g)', calorias: 10, proteinas: 0.5, carbs: 1.0, grasas: 0.5, fibra: 0.5, ig: 0, equivalente: 'Libre', tags: ['basico'] },
  { nombre: 'Ketchup', categoria: 'Condimentos', pais: 'México', porcion: '1 cda (15g)', calorias: 15, proteinas: 0.2, carbs: 4.0, grasas: 0.0, fibra: 0.2, ig: 55, equivalente: 'Libre', tags: ['basico'] },
  { nombre: 'Sriracha', categoria: 'Condimentos', pais: 'Tailandia', porcion: '1 cda (15g)', calorias: 15, proteinas: 0.3, carbs: 3.0, grasas: 0.2, fibra: 0.5, ig: 15, equivalente: 'Libre', tags: ['basico'] },
  { nombre: 'Vinagre blanco', categoria: 'Condimentos', pais: 'México', porcion: '1 cda (15ml)', calorias: 3, proteinas: 0.0, carbs: 0.1, grasas: 0.0, fibra: 0.0, ig: 0, equivalente: 'Libre', tags: ['basico'] },
  { nombre: 'Vinagre de manzana', categoria: 'Condimentos', pais: 'México', porcion: '1 cda (15ml)', calorias: 3, proteinas: 0.0, carbs: 0.1, grasas: 0.0, fibra: 0.0, ig: 0, equivalente: 'Libre', tags: ['basico', 'superfood'] },
  { nombre: 'Consome de pollo', categoria: 'Condimentos', pais: 'México', porcion: '1 taza (250ml)', calorias: 15, proteinas: 2.0, carbs: 1.0, grasas: 0.5, fibra: 0.0, ig: 0, equivalente: 'Libre', tags: ['basico', 'sopa'] },
  { nombre: 'Caldo de res', categoria: 'Condimentos', pais: 'México', porcion: '1 taza (250ml)', calorias: 20, proteinas: 3.0, carbs: 1.0, grasas: 0.5, fibra: 0.0, ig: 0, equivalente: 'Libre', tags: ['basico', 'sopa'] },
  { nombre: 'Palomitas naturales', categoria: 'Snacks', pais: 'México', porcion: '3 tazas (25g)', calorias: 93, proteinas: 3.0, carbs: 19.0, grasas: 1.1, fibra: 3.6, ig: 55, equivalente: '1 Cereal s/g', tags: ['basico', 'colacion'] },
  { nombre: 'Palomitas con mantequilla', categoria: 'Snacks', pais: 'México', porcion: '2 tazas (25g)', calorias: 140, proteinas: 2.5, carbs: 14.0, grasas: 9.0, fibra: 2.5, ig: 55, equivalente: '1 Cereal c/g + 1.5 Grasas', tags: ['colacion'] },
  { nombre: 'Chicharrones de cerdo', categoria: 'Snacks', pais: 'México', porcion: '20g (1 puño)', calorias: 110, proteinas: 7.0, carbs: 0.0, grasas: 9.0, fibra: 0.0, ig: 0, equivalente: '1 Carne magra + 1 Grasa', tags: ['tradicional', 'keto'] },
  { nombre: 'Chicharrones de harina', categoria: 'Snacks', pais: 'México', porcion: '30g (3 piezas)', calorias: 150, proteinas: 2.0, carbs: 18.0, grasas: 8.0, fibra: 0.5, ig: 70, equivalente: '1 Cereal c/g + 1 Grasa', tags: ['tradicional', 'colacion'] },
  { nombre: 'Fruta deshidratada mixta', categoria: 'Snacks', pais: 'México', porcion: '1/4 taza (30g)', calorias: 90, proteinas: 0.5, carbs: 22.0, grasas: 0.0, fibra: 2.0, ig: 55, equivalente: '1.5 Frutas', tags: ['colacion'] },
  { nombre: 'Nuez mixta cruda', categoria: 'Snacks', pais: 'México', porcion: '1/4 taza (30g)', calorias: 180, proteinas: 5.0, carbs: 5.0, grasas: 16.0, fibra: 2.5, ig: 15, equivalente: '3 Grasas', tags: ['basico', 'superfood', 'keto'] },
  { nombre: 'Almendra cruda', categoria: 'Snacks', pais: 'México', porcion: '15 piezas (15g)', calorias: 90, proteinas: 3.0, carbs: 3.5, grasas: 7.5, fibra: 1.5, ig: 0, equivalente: '1.5 Grasas', tags: ['basico', 'superfood', 'keto'] },
  { nombre: 'Nuez de la india (pacana)', categoria: 'Snacks', pais: 'México', porcion: '10 mitades (15g)', calorias: 100, proteinas: 1.0, carbs: 2.0, grasas: 10.5, fibra: 1.5, ig: 10, equivalente: '2 Grasas', tags: ['basico', 'superfood', 'keto'] },
  { nombre: 'Pistache tostado', categoria: 'Snacks', pais: 'México', porcion: '15 piezas (15g)', calorias: 85, proteinas: 3.0, carbs: 4.0, grasas: 7.0, fibra: 1.5, ig: 15, equivalente: '1.5 Grasas', tags: ['basico', 'superfood'] },
  { nombre: 'Semilla de calabaza (pepita)', categoria: 'Snacks', pais: 'México', porcion: '2 cdas (15g)', calorias: 85, proteinas: 4.0, carbs: 3.0, grasas: 7.0, fibra: 1.5, ig: 10, equivalente: '1.5 Grasas', tags: ['basico', 'superfood'] },
  { nombre: 'Semilla de girasol', categoria: 'Snacks', pais: 'México', porcion: '2 cdas (15g)', calorias: 85, proteinas: 3.0, carbs: 3.0, grasas: 7.5, fibra: 1.5, ig: 20, equivalente: '1.5 Grasas', tags: ['basico', 'superfood'] },
  { nombre: 'Semilla de chia', categoria: 'Snacks', pais: 'México', porcion: '1 cda (12g)', calorias: 58, proteinas: 2.0, carbs: 5.0, grasas: 3.7, fibra: 4.3, ig: 1, equivalente: '1 Grasa', tags: ['basico', 'superfood'] },
  { nombre: 'Chia hidratada', categoria: 'Snacks', pais: 'México', porcion: '2 cdas (20g)', calorias: 30, proteinas: 1.0, carbs: 2.5, grasas: 1.8, fibra: 3.0, ig: 1, equivalente: 'Libre', tags: ['basico', 'superfood'] },
  { nombre: 'Barra de granola', categoria: 'Snacks', pais: 'México', porcion: '1 pieza (30g)', calorias: 130, proteinas: 2.5, carbs: 20.0, grasas: 4.5, fibra: 1.5, ig: 55, equivalente: '1 Cereal c/g + 1 Grasa', tags: ['colacion', 'desayuno'] },
  { nombre: 'Barra de proteina', categoria: 'Snacks', pais: 'México', porcion: '1 pieza (60g)', calorias: 220, proteinas: 20.0, carbs: 22.0, grasas: 6.0, fibra: 3.0, ig: 30, equivalente: '1 Carne magra + 1 Cereal c/g', tags: ['post-entreno', 'colacion'] },
  { nombre: 'Chips de platano', categoria: 'Snacks', pais: 'México', porcion: '15 piezas (30g)', calorias: 160, proteinas: 1.0, carbs: 20.0, grasas: 9.0, fibra: 2.0, ig: 55, equivalente: '1 Fruta + 1.5 Grasas', tags: ['tradicional', 'colacion'] },
  { nombre: 'Totopo horneado', categoria: 'Snacks', pais: 'México', porcion: '10 piezas (30g)', calorias: 130, proteinas: 2.0, carbs: 24.0, grasas: 3.0, fibra: 2.0, ig: 60, equivalente: '1.5 Cereales s/g', tags: ['basico'] },
  { nombre: 'Galleta de arroz', categoria: 'Snacks', pais: 'México', porcion: '2 piezas (20g)', calorias: 70, proteinas: 1.0, carbs: 14.0, grasas: 0.5, fibra: 0.3, ig: 85, equivalente: '1 Cereal s/g', tags: ['basico', 'gluten-free'] },
  { nombre: 'Hummus con zanahoria', categoria: 'Snacks', pais: 'México', porcion: '1/4 taza (60g)', calorias: 100, proteinas: 3.5, carbs: 8.0, grasas: 6.5, fibra: 3.0, ig: 28, equivalente: '1 Leguminosa + 1 Grasa', tags: ['vegetariano', 'colacion'] },
  { nombre: 'Yogurt griego con nuez', categoria: 'Snacks', pais: 'México', porcion: '1 taza (200g)', calorias: 250, proteinas: 20.0, carbs: 12.0, grasas: 14.0, fibra: 1.0, ig: 15, equivalente: '2 Leches enteras + 2 Grasas', tags: ['colacion', 'superfood'] },
  { nombre: 'Tamal de pollo (oaxaqueño)', categoria: 'Preparados', pais: 'México', porcion: '1 pieza (150g)', calorias: 280, proteinas: 12.0, carbs: 32.0, grasas: 12.0, fibra: 4.5, ig: 55, equivalente: '2 Cereales c/g + 1 Carne magra', tags: ['tradicional', 'desayuno'] },
  { nombre: 'Tamal de dulce', categoria: 'Preparados', pais: 'México', porcion: '1 pieza (100g)', calorias: 220, proteinas: 3.0, carbs: 36.0, grasas: 8.0, fibra: 2.5, ig: 55, equivalente: '2 Cereales c/g', tags: ['tradicional', 'desayuno'] },
  { nombre: 'Tamal de elote dulce', categoria: 'Preparados', pais: 'México', porcion: '1 pieza (100g)', calorias: 200, proteinas: 4.0, carbs: 34.0, grasas: 6.0, fibra: 3.0, ig: 55, equivalente: '2 Cereales c/g', tags: ['tradicional', 'desayuno'] },
  { nombre: 'Tacos al pastor (3 piezas)', categoria: 'Preparados', pais: 'México', porcion: '3 piezas (180g)', calorias: 350, proteinas: 22.0, carbs: 35.0, grasas: 14.0, fibra: 5.0, ig: 55, equivalente: '2 Carnes magras + 2 Cereales s/g + 1 Grasa', tags: ['tradicional', 'cena'] },
  { nombre: 'Tacos de bistec (3 piezas)', categoria: 'Preparados', pais: 'México', porcion: '3 piezas (180g)', calorias: 380, proteinas: 26.0, carbs: 35.0, grasas: 16.0, fibra: 5.0, ig: 55, equivalente: '2 Carnes magras + 2 Cereales s/g + 1 Grasa', tags: ['tradicional', 'cena'] },
  { nombre: 'Tacos de pollo (3 piezas)', categoria: 'Preparados', pais: 'México', porcion: '3 piezas (180g)', calorias: 320, proteinas: 24.0, carbs: 35.0, grasas: 10.0, fibra: 5.0, ig: 55, equivalente: '2 Carnes magras + 2 Cereales s/g', tags: ['tradicional', 'cena'] },
  { nombre: 'Enchiladas verdes (3 piezas)', categoria: 'Preparados', pais: 'México', porcion: '3 piezas (250g)', calorias: 380, proteinas: 22.0, carbs: 38.0, grasas: 16.0, fibra: 6.0, ig: 45, equivalente: '1.5 Carnes magras + 2 Cereales s/g + 1 Grasa', tags: ['tradicional', 'almuerzo'] },
  { nombre: 'Enchiladas rojas (3 piezas)', categoria: 'Preparados', pais: 'México', porcion: '3 piezas (250g)', calorias: 360, proteinas: 20.0, carbs: 36.0, grasas: 15.0, fibra: 5.5, ig: 45, equivalente: '1.5 Carnes magras + 2 Cereales s/g + 1 Grasa', tags: ['tradicional', 'almuerzo'] },
  { nombre: 'Chilaquiles verdes con pollo', categoria: 'Preparados', pais: 'México', porcion: '1 plato (250g)', calorias: 450, proteinas: 25.0, carbs: 45.0, grasas: 20.0, fibra: 6.0, ig: 55, equivalente: '2 Carnes magras + 2.5 Cereales c/g', tags: ['tradicional', 'desayuno'] },
  { nombre: 'Chilaquiles rojos con huevo', categoria: 'Preparados', pais: 'México', porcion: '1 plato (250g)', calorias: 420, proteinas: 20.0, carbs: 45.0, grasas: 18.0, fibra: 6.0, ig: 55, equivalente: '1 Carne magra + 2.5 Cereales c/g + 1 Grasa', tags: ['tradicional', 'desayuno'] },
  { nombre: 'Huevos rancheros', categoria: 'Preparados', pais: 'México', porcion: '2 huevos con salsa', calorias: 280, proteinas: 16.0, carbs: 18.0, grasas: 16.0, fibra: 5.0, ig: 15, equivalente: '2 Carnes magras + 1 Cereal s/g + 1 Grasa', tags: ['tradicional', 'desayuno'] },
  { nombre: 'Huevos a la mexicana', categoria: 'Preparados', pais: 'México', porcion: '2 huevos', calorias: 240, proteinas: 14.0, carbs: 10.0, grasas: 16.0, fibra: 4.0, ig: 10, equivalente: '2 Carnes magras + 1 Grasa', tags: ['tradicional', 'desayuno'] },
  { nombre: 'Machaca con huevo', categoria: 'Preparados', pais: 'México', porcion: '1 plato (200g)', calorias: 320, proteinas: 26.0, carbs: 10.0, grasas: 20.0, fibra: 2.0, ig: 10, equivalente: '2 Carnes magras + 2 Grasas', tags: ['tradicional', 'desayuno'] },
  { nombre: 'Pozole rojo con pollo', categoria: 'Preparados', pais: 'México', porcion: '1 taza (350g)', calorias: 280, proteinas: 20.0, carbs: 30.0, grasas: 8.0, fibra: 5.0, ig: 45, equivalente: '1 Carne magra + 2 Cereales s/g + 1 Verdura', tags: ['tradicional', 'almuerzo', 'invierno'] },
  { nombre: 'Pozole verde con cerdo', categoria: 'Preparados', pais: 'México', porcion: '1 taza (350g)', calorias: 320, proteinas: 22.0, carbs: 28.0, grasas: 12.0, fibra: 5.0, ig: 45, equivalente: '1 Carne semigrasa + 2 Cereales s/g + 1 Verdura', tags: ['tradicional', 'almuerzo'] },
  { nombre: 'Sopa de tortilla', categoria: 'Preparados', pais: 'México', porcion: '1 taza (300g)', calorias: 180, proteinas: 6.0, carbs: 22.0, grasas: 7.0, fibra: 4.0, ig: 55, equivalente: '1 Cereal c/g + 1 Verdura + 1 Grasa', tags: ['tradicional', 'almuerzo', 'sopa'] },
  { nombre: 'Caldo tlalpeño', categoria: 'Preparados', pais: 'México', porcion: '1 taza (300g)', calorias: 200, proteinas: 14.0, carbs: 20.0, grasas: 7.0, fibra: 6.0, ig: 30, equivalente: '1 Carne magra + 1 Cereal s/g + 1 Verdura', tags: ['tradicional', 'almuerzo', 'sopa'] },
  { nombre: 'Sopa de fideo', categoria: 'Preparados', pais: 'México', porcion: '1 taza (250g)', calorias: 150, proteinas: 4.0, carbs: 24.0, grasas: 4.0, fibra: 1.5, ig: 45, equivalente: '1 Cereal s/g + 1/2 Grasa', tags: ['tradicional', 'sopa', 'almuerzo'] },
  { nombre: 'Sopa de arroz', categoria: 'Preparados', pais: 'México', porcion: '1 taza (250g)', calorias: 130, proteinas: 3.0, carbs: 22.0, grasas: 3.0, fibra: 0.5, ig: 73, equivalente: '1 Cereal s/g', tags: ['tradicional', 'sopa'] },
  { nombre: 'Mole de olla', categoria: 'Preparados', pais: 'México', porcion: '1 taza (300g)', calorias: 250, proteinas: 18.0, carbs: 22.0, grasas: 10.0, fibra: 5.0, ig: 35, equivalente: '1 Carne magra + 1.5 Cereales s/g + 1 Grasa', tags: ['tradicional', 'almuerzo', 'invierno'] },
  { nombre: 'Tinga de pollo', categoria: 'Preparados', pais: 'México', porcion: '1 taza (200g)', calorias: 220, proteinas: 24.0, carbs: 10.0, grasas: 9.0, fibra: 3.0, ig: 10, equivalente: '1 Carne magra + 1/2 Cereal + 1 Grasa', tags: ['tradicional', 'almuerzo'] },
  { nombre: 'Picadillo', categoria: 'Preparados', pais: 'México', porcion: '1 taza (200g)', calorias: 280, proteinas: 22.0, carbs: 12.0, grasas: 16.0, fibra: 4.0, ig: 25, equivalente: '1 Carne magra + 1 Grasa + 1 Verdura', tags: ['tradicional', 'almuerzo'] },
  { nombre: 'Carne en su jugo', categoria: 'Preparados', pais: 'México', porcion: '1 taza (300g)', calorias: 320, proteinas: 26.0, carbs: 14.0, grasas: 18.0, fibra: 3.0, ig: 10, equivalente: '1 Carne semigrasa + 1 Grasa + 1 Verdura', tags: ['tradicional', 'almuerzo', 'cena'] },
  { nombre: 'Cochinita pibil', categoria: 'Preparados', pais: 'México', porcion: '1 taza (200g)', calorias: 320, proteinas: 24.0, carbs: 8.0, grasas: 22.0, fibra: 1.0, ig: 5, equivalente: '1 Carne semigrasa + 2 Grasas', tags: ['tradicional', 'almuerzo'] },
  { nombre: 'Pescado a la veracruzana', categoria: 'Preparados', pais: 'México', porcion: '1 filete (150g)', calorias: 220, proteinas: 24.0, carbs: 10.0, grasas: 9.0, fibra: 3.0, ig: 15, equivalente: '1 Carne magra + 1 Grasa + 1 Verdura', tags: ['tradicional', 'almuerzo'] },
  { nombre: 'Pescado empanizado', categoria: 'Preparados', pais: 'México', porcion: '1 filete (120g)', calorias: 280, proteinas: 18.0, carbs: 18.0, grasas: 14.0, fibra: 1.0, ig: 55, equivalente: '1 Carne magra + 1 Cereal c/g + 1 Grasa', tags: ['tradicional', 'almuerzo'] },
  { nombre: 'Chiles en nogada', categoria: 'Preparados', pais: 'México', porcion: '1 pieza (200g)', calorias: 350, proteinas: 14.0, carbs: 20.0, grasas: 22.0, fibra: 5.0, ig: 15, equivalente: '1 Carne magra + 2 Grasas + 1 Verdura', tags: ['tradicional', 'temporada'] },
  { nombre: 'Tacos de carnitas (3 piezas)', categoria: 'Preparados', pais: 'México', porcion: '3 piezas (180g)', calorias: 420, proteinas: 24.0, carbs: 32.0, grasas: 22.0, fibra: 4.0, ig: 55, equivalente: '1.5 Carnes semigrasas + 2 Cereales s/g + 2 Grasas', tags: ['tradicional', 'cena'] },
  { nombre: 'Gordita de chicharron', categoria: 'Preparados', pais: 'México', porcion: '1 pieza (80g)', calorias: 260, proteinas: 8.0, carbs: 30.0, grasas: 12.0, fibra: 4.0, ig: 55, equivalente: '1 Carne magra + 2 Cereales c/g + 1 Grasa', tags: ['tradicional', 'colacion'] },
  { nombre: 'Sope de pollo', categoria: 'Preparados', pais: 'México', porcion: '1 pieza (100g)', calorias: 220, proteinas: 10.0, carbs: 24.0, grasas: 9.0, fibra: 4.0, ig: 55, equivalente: '1 Carne magra + 1.5 Cereales c/g + 1 Grasa', tags: ['tradicional', 'colacion'] },
  { nombre: 'Huarache de bistec', categoria: 'Preparados', pais: 'México', porcion: '1 pieza (150g)', calorias: 320, proteinas: 18.0, carbs: 38.0, grasas: 12.0, fibra: 6.0, ig: 55, equivalente: '1 Carne magra + 2 Cereales s/g + 1 Grasa', tags: ['tradicional', 'almuerzo'] },
  { nombre: 'Quesadilla de flor de calabaza', categoria: 'Preparados', pais: 'México', porcion: '1 pieza (80g)', calorias: 200, proteinas: 8.0, carbs: 22.0, grasas: 9.0, fibra: 3.0, ig: 55, equivalente: '1/2 Carne magra + 1.5 Cereales c/g + 1 Grasa', tags: ['tradicional', 'vegetariano'] },
  { nombre: 'Quesadilla de hongos', categoria: 'Preparados', pais: 'México', porcion: '1 pieza (80g)', calorias: 190, proteinas: 7.0, carbs: 20.0, grasas: 9.0, fibra: 3.0, ig: 55, equivalente: '1/2 Carne magra + 1.5 Cereales c/g + 1 Grasa', tags: ['tradicional', 'vegetariano'] },
  { nombre: 'Flauta de pollo', categoria: 'Preparados', pais: 'México', porcion: '2 piezas (100g)', calorias: 240, proteinas: 12.0, carbs: 22.0, grasas: 12.0, fibra: 2.0, ig: 55, equivalente: '1 Carne magra + 1.5 Cereales c/g + 1 Grasa', tags: ['tradicional', 'cena'] },
  { nombre: 'Tostada de tinga', categoria: 'Preparados', pais: 'México', porcion: '2 piezas (120g)', calorias: 220, proteinas: 14.0, carbs: 22.0, grasas: 10.0, fibra: 4.0, ig: 55, equivalente: '1 Carne magra + 1 Cereal c/g + 1 Grasa', tags: ['tradicional', 'colacion'] },
];

const PAIS_COLORS: Record<string, string> = {
  'México': 'bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/20',
  'Colombia': 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20',
  'Perú': 'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20',
  'Argentina': 'bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/20',
  'Brasil': 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20',
  'Chile': 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/20',
  'Venezuela': 'bg-[#a78bfa]/10 text-[#a78bfa] border-[#a78bfa]/20',
  'España': 'bg-[#f472b6]/10 text-[#f472b6] border-[#f472b6]/20',
  'Mediterráneo': 'bg-[#14b8a6]/10 text-[#14b8a6] border-[#14b8a6]/20',
  'Centroamérica': 'bg-[#fb923c]/10 text-[#fb923c] border-[#fb923c]/20',
  'Cuba': 'bg-[#ec4899]/10 text-[#ec4899] border-[#ec4899]/20',
  'Yucatán': 'bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20',
  'Andes': 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20',
  'Tailandia': 'bg-[#f43f5e]/10 text-[#f43f5e] border-[#f43f5e]/20',
  'Indonesia': 'bg-[#84cc16]/10 text-[#84cc16] border-[#84cc16]/20',
  'India': 'bg-[#f97316]/10 text-[#f97316] border-[#f97316]/20',
  'Egipto': 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/20',
};

const CATEGORIA_EMOJI: Record<string, string> = {
  'Verduras': '🥬',
  'Frutas': '🍎',
  'Cereales': '🌾',
  'Leguminosas': '🫘',
  'Proteinas': '🍗',
  'Lacteos': '🥛',
  'Grasas': '🥑',
  'Bebidas': '🥤',
  'Dulces': '🍮',
  'Condimentos': '🌶️',
  'Snacks': '🥜',
  'Preparados': '🌮',
};

const CATEGORIA_COLORS: Record<string, string> = {
  'Verduras': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Frutas': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Cereales': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Leguminosas': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Proteinas': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Lacteos': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Grasas': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Bebidas': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Dulces': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'Condimentos': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'Snacks': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Preparados': 'bg-lime-500/10 text-lime-400 border-lime-500/20',
};

const ITEMS_PER_PAGE = 24;

export function AlimentosLATAM() {
  const [busqueda, setBusqueda] = useState('');
  const [paisFiltro, setPaisFiltro] = useState('todos');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [pagina, setPagina] = useState(1);

  const paises = ['todos', ...Array.from(new Set(ALIMENTOS.map(a => a.pais)))];
  const categorias = ['todas', ...Array.from(new Set(ALIMENTOS.map(a => a.categoria)))];

  const filtrados = ALIMENTOS.filter(a => {
    const matchBusqueda = !busqueda || 
      a.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
      a.tags.some(t => t.toLowerCase().includes(busqueda.toLowerCase())) ||
      a.equivalente.toLowerCase().includes(busqueda.toLowerCase());
    const matchPais = paisFiltro === 'todos' || a.pais === paisFiltro;
    const matchCategoria = categoriaFiltro === 'todas' || a.categoria === categoriaFiltro;
    return matchBusqueda && matchPais && matchCategoria;
  });

  const totalPaginas = Math.ceil(filtrados.length / ITEMS_PER_PAGE);
  const paginaActual = Math.min(pagina, Math.max(1, totalPaginas));
  const inicio = (paginaActual - 1) * ITEMS_PER_PAGE;
  const itemsPagina = filtrados.slice(inicio, inicio + ITEMS_PER_PAGE);

  const stats = {
    total: ALIMENTOS.length,
    categorias: new Set(ALIMENTOS.map(a => a.categoria)).size,
    paises: new Set(ALIMENTOS.map(a => a.pais)).size,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-bold text-[#f0f0f5]">Alimentos LATAM</h2>
          <p className="text-xs text-[#8a8d9e]">Base de datos regional con sistema de equivalentes mexicano e indice glicemico</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/20">
            <BookOpen className="w-3 h-3 mr-1"/>{stats.total} alimentos
          </Badge>
          <Badge className="bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/20">
            {stats.paises} paises
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#55576b]" />
          <Input 
            value={busqueda} 
            onChange={e => { setBusqueda(e.target.value); setPagina(1); }} 
            placeholder="Buscar alimento, categoria, tag o equivalente..." 
            className="pl-9 bg-[#0a0b0f] border-[#1e1f2e] text-[#f0f0f5]" 
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 text-xs text-[#8a8d9e]">
            <Filter className="w-3 h-3" /> Filtros:
          </div>
          <select 
            value={paisFiltro} 
            onChange={e => { setPaisFiltro(e.target.value); setPagina(1); }} 
            className="bg-[#0a0b0f] border border-[#1e1f2e] text-[#f0f0f5] rounded-lg px-2 py-1.5 text-xs"
          >
            {paises.map(p => <option key={p} value={p}>{p === 'todos' ? 'Todos los paises' : p}</option>)}
          </select>
          <select 
            value={categoriaFiltro} 
            onChange={e => { setCategoriaFiltro(e.target.value); setPagina(1); }} 
            className="bg-[#0a0b0f] border border-[#1e1f2e] text-[#f0f0f5] rounded-lg px-2 py-1.5 text-xs"
          >
            {categorias.map(c => (
              <option key={c} value={c}>
                {c === 'todas' ? 'Todas las categorias' : `${CATEGORIA_EMOJI[c] || ''} ${c}`}
              </option>
            ))}
          </select>
          {(busqueda || paisFiltro !== 'todos' || categoriaFiltro !== 'todas') && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => { setBusqueda(''); setPaisFiltro('todos'); setCategoriaFiltro('todas'); setPagina(1); }}
              className="text-xs h-7 border-[#1e1f2e] text-[#8a8d9e] hover:text-[#f0f0f5]"
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      </div>

      <div className="text-xs text-[#55576b]">
        Mostrando {filtrados.length > 0 ? inicio + 1 : 0}-{Math.min(inicio + ITEMS_PER_PAGE, filtrados.length)} de {filtrados.length} resultados
        {busqueda && ` para "${busqueda}"`}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {itemsPagina.map((a, i) => (
          <Card key={i} className="bg-[#11121a] border-[#1e1f2e] hover:border-[#D4FF00]/30 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[#f0f0f5] truncate">{a.nombre}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Badge className={`text-[9px] px-1.5 py-0 ${PAIS_COLORS[a.pais] || 'bg-[#55576b]/10 text-[#8a8d9e]'}`}>
                      <MapPin className="w-2 h-2 mr-0.5" />{a.pais}
                    </Badge>
                    <Badge className={`text-[9px] px-1.5 py-0 ${CATEGORIA_COLORS[a.categoria] || ''}`}>
                      {CATEGORIA_EMOJI[a.categoria]} {a.categoria}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-[10px] text-[#8a8d9e] mb-1.5">{a.porcion}</p>
              
              <div className="grid grid-cols-5 gap-1.5 text-center mb-2">
                <div className="bg-[#0a0b0f] rounded p-1">
                  <Flame className="w-3 h-3 text-[#f59e0b] mx-auto mb-0.5" />
                  <p className="text-[10px] font-bold text-[#f0f0f5]">{a.calorias}</p>
                  <p className="text-[8px] text-[#55576b]">kcal</p>
                </div>
                <div className="bg-[#0a0b0f] rounded p-1">
                  <Beef className="w-3 h-3 text-[#ef4444] mx-auto mb-0.5" />
                  <p className="text-[10px] font-bold text-[#f0f0f5]">{a.proteinas}g</p>
                  <p className="text-[8px] text-[#55576b]">prot</p>
                </div>
                <div className="bg-[#0a0b0f] rounded p-1">
                  <Wheat className="w-3 h-3 text-[#22c55e] mx-auto mb-0.5" />
                  <p className="text-[10px] font-bold text-[#f0f0f5]">{a.carbs}g</p>
                  <p className="text-[8px] text-[#55576b]">carbs</p>
                </div>
                <div className="bg-[#0a0b0f] rounded p-1">
                  <Droplets className="w-3 h-3 text-[#6366f1] mx-auto mb-0.5" />
                  <p className="text-[10px] font-bold text-[#f0f0f5]">{a.grasas}g</p>
                  <p className="text-[8px] text-[#55576b]">gras</p>
                </div>
                <div className="bg-[#0a0b0f] rounded p-1">
                  <Wind className="w-3 h-3 text-[#06b6d4] mx-auto mb-0.5" />
                  <p className="text-[10px] font-bold text-[#f0f0f5]">{a.fibra}g</p>
                  <p className="text-[8px] text-[#55576b]">fibra</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <Leaf className="w-3 h-3 text-[#8a8d9e]" />
                  <span className="text-[9px] text-[#8a8d9e]">IG: 
                    <span className={`font-bold ${a.ig <= 55 ? 'text-green-400' : a.ig <= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {a.ig}
                    </span>
                  </span>
                </div>
                <Badge className="text-[9px] bg-[#D4FF00]/5 text-[#D4FF00]/80 border-[#D4FF00]/10 truncate max-w-[180px]">
                  {a.equivalente}
                </Badge>
              </div>

              {a.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {a.tags.map((tag, ti) => (
                    <span key={ti} className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#1e1f2e] text-[#55576b] capitalize">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagina(p => Math.max(1, p - 1))}
            disabled={paginaActual <= 1}
            className="border-[#1e1f2e] text-[#f0f0f5] disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
          </Button>
          <span className="text-xs text-[#8a8d9e]">
            Pagina {paginaActual} de {totalPaginas}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
            disabled={paginaActual >= totalPaginas}
            className="border-[#1e1f2e] text-[#f0f0f5] disabled:opacity-30"
          >
            Siguiente <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}

      {filtrados.length === 0 && (
        <Card className="p-8 text-center bg-[#11121a] border-[#1e1f2e]">
          <Search className="w-10 h-10 text-[#55576b] mx-auto mb-3" />
          <p className="text-sm text-[#8a8d9e] mb-1">No se encontraron alimentos</p>
          <p className="text-xs text-[#55576b]">Intenta con otra busqueda o filtros diferentes</p>
        </Card>
      )}
    </div>
  );
}
