import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search, ChefHat, Flame, Timer, ChevronLeft, ChevronRight,
  Utensils, Leaf, Beef, Fish, WheatOff, CupSoda, Salad, CakeSlice
} from 'lucide-react';

// ════════════════════════════════════════════════════════════
// INTERFAZ
// ════════════════════════════════════════════════════════════
interface Receta {
  nombre: string; categoria: string; tiempo: string; porciones: number;
  calorias: number; proteinas: number; carbs: number; grasas: number;
  ingredientes: string[]; preparacion: string[]; tags: string[];
}

// ════════════════════════════════════════════════════════════
// 180 RECETAS ORGANIZADAS
// ════════════════════════════════════════════════════════════

const RECETAS: Receta[] = [
  // ═════ DESAYUNOS (25) ═════
  { nombre: 'Omelette de Claras con Espinaca', categoria: 'Desayuno', tiempo: '10 min', porciones: 1, calorias: 220, proteinas: 26, carbs: 6, grasas: 8, ingredientes: ['6 claras + 1 yema','1 taza espinaca','1/4 taza champinones','1 cdta aceite de oliva','Sal, pimienta'], preparacion: ['Batir claras con yema.','Saltear espinaca y champinones 2 min.','Verter huevo, cocinar 3-4 min por lado.','Doblar y servir caliente.'], tags: ['alta-proteina','bajo-carb','rapido'] },
  { nombre: 'Avena Proteica con Platano', categoria: 'Desayuno', tiempo: '5 min', porciones: 1, calorias: 410, proteinas: 28, carbs: 55, grasas: 7, ingredientes: ['3/4 taza avena','1 scoop proteina whey','1 platano mediano','1 taza leche descremada','1 cdta miel','Canela'], preparacion: ['Calentar avena con leche 2 min en micro.','Mezclar proteina en polvo.','Cortar platano en rodajas.','Servir con miel y canela.'], tags: ['post-entreno','alta-proteina','facil'] },
  { nombre: 'Chilaquiles Verdes con Pollo', categoria: 'Desayuno', tiempo: '20 min', porciones: 2, calorias: 380, proteinas: 24, carbs: 40, grasas: 14, ingredientes: ['200g pechuga desmenuzada','8 tortillas de maiz','2 tazas salsa verde','30g queso fresco','2 cdas crema ligera','Cilantro, cebolla'], preparacion: ['Freir tortilla triangulos hasta dorar.','Cocinar pollo con salsa 10 min.','Mezclar todo.','Servir con queso, crema, cilantro.'], tags: ['mexicano','proteico'] },
  { nombre: 'Tostada de Aguacate con Huevo', categoria: 'Desayuno', tiempo: '8 min', porciones: 1, calorias: 340, proteinas: 16, carbs: 28, grasas: 18, ingredientes: ['2 reb. pan integral','1/2 aguacate','2 huevos','Chile flakes','Sal, limon'], preparacion: ['Tostar pan.','Machacar aguacate con sal y limon.','Freir huevos.','Armar tostadas.'], tags: ['omega-3','rapido','vegetariano'] },
  { nombre: 'Hotcakes de Avena y Platano', categoria: 'Desayuno', tiempo: '15 min', porciones: 2, calorias: 320, proteinas: 12, carbs: 52, grasas: 7, ingredientes: ['1 taza avena','1 platano maduro','2 huevos','1/4 taza leche','1 cdta polvo hornear','Canela'], preparacion: ['Licuar todos los ingredientes.','Verter en sarten caliente.','Cocinar 2 min por lado hasta dorar.','Servir con frutas.'], tags: ['sin-azucar','familia','facil'] },
  { nombre: 'Burrito de Huevo con Frijoles', categoria: 'Desayuno', tiempo: '12 min', porciones: 1, calorias: 450, proteinas: 22, carbs: 48, grasas: 18, ingredientes: ['2 huevos + 2 claras','1 tortilla de harina integral','1/2 taza frijoles refritos','1/4 tapa queso','Salsa'], preparacion: ['Cocinar huevos revueltos.','Calentar tortilla.','Untar frijoles, agregar huevo y queso.','Enrollar y servir.'], tags: ['mexicano','saciante','proteico'] },
  { nombre: 'Bowl de Yogur Griego con Frutos', categoria: 'Desayuno', tiempo: '5 min', porciones: 1, calorias: 310, proteinas: 22, carbs: 38, grasas: 8, ingredientes: ['1 taza yogur griego 0%','1/2 taza arandanos','1 cdta miel','2 cdas granola','1 cdta semillas de chia'], preparacion: ['Colocar yogur en bowl.','Agregar frutos y granola.','Decorar con chia y miel.'], tags: ['probiótico','antioxidante','facil'] },
  { nombre: 'Molletes con Frijoles y Queso', categoria: 'Desayuno', tiempo: '10 min', porciones: 2, calorias: 360, proteinas: 16, carbs: 42, grasas: 14, ingredientes: ['2 bolillos partidos','1 taza frijoles refritos','60g queso manchego','Pico de gallo','Aguacate'], preparacion: ['Tostar bolillos.','Untar frijoles, agregar queso.','Gratinar 3 min.','Servir con pico de gallo.'], tags: ['mexicano','saciante'] },
  { nombre: 'Smoothie Bowl de Acai', categoria: 'Desayuno', tiempo: '5 min', porciones: 1, calorias: 290, proteinas: 8, carbs: 48, grasas: 8, ingredientes: ['100g pulpa acai congelada','1 platano','1/2 taza leche de almendra','Granola, coco, frutos para topping'], preparacion: ['Licuar acai, platano y leche.','Verter en bowl.','Decorar con toppings.'], tags: ['antioxidante','superfood','frio'] },
  { nombre: 'Tortilla Espanola (con Claras)', categoria: 'Desayuno', tiempo: '25 min', porciones: 4, calorias: 280, proteinas: 18, carbs: 22, grasas: 12, ingredientes: ['4 huevos + 4 claras','3 papas medianas','1 cebolla','Aceite de oliva','Sal'], preparacion: ['Cocinar papas y cebolla en aceite 15 min.','Batir huevos, mezclar con papas.','Cocinar 5 min por lado.'], tags: ['espanol','saciante'] },
  { nombre: 'Muffins de Huevo y Verduras', categoria: 'Desayuno', tiempo: '25 min', porciones: 6, calorias: 120, proteinas: 10, carbs: 3, grasas: 7, ingredientes: ['6 huevos','1/2 taza espinaca picada','1/4 taza pimiento','1/4 taza champinones','Sal, pimienta'], preparacion: ['Batir huevos con sal.','Distribuir verduras en moldes.','Verter huevo.','Hornear 180°C 18-20 min.'], tags: ['meal-prep','bajo-carb','rapido'] },
  { nombre: 'Cereal Proteico Casero', categoria: 'Desayuno', tiempo: '30 min', porciones: 8, calorias: 190, proteinas: 14, carbs: 22, grasas: 5, ingredientes: ['2 tazas avena','1 scoop proteina','1/4 taza miel','1 cdta canela','1/4 taza almendras'], preparacion: ['Mezclar todo.','Distribuir en bandeja.','Hornear 150°C 20 min revolviendo cada 5.'], tags: ['meal-prep','alta-proteina'] },
  { nombre: 'Pan Frances Proteico', categoria: 'Desayuno', tiempo: '10 min', porciones: 1, calorias: 380, proteinas: 30, carbs: 40, grasas: 10, ingredientes: ['2 reb. pan integral','1 scoop proteina','3 claras + 1 huevo','1/4 taza leche','Canela, edulcorante'], preparacion: ['Batir huevos, proteina, leche y canela.','Sumergir pan en mezcla.','Cocinar en sarten 3 min por lado.'], tags: ['post-entreno','alta-proteina'] },
  { nombre: 'Tamal de Elote Saludable', categoria: 'Desayuno', tiempo: '45 min', porciones: 6, calorias: 220, proteinas: 8, carbs: 32, grasas: 7, ingredientes: ['4 tazas elote desgranado','1/4 taza leche','2 cdas mantequilla','1 cdta polvo hornear','Queso fresco'], preparacion: ['Licuar 3 tazas elote con leche.','Mezclar con elote entero, mantequilla y polvo.','Hornear 180°C 35 min.','Servir con queso.'], tags: ['mexicano','sin-gluten'] },
  { nombre: 'Pudin de Chia Nocturno', categoria: 'Desayuno', tiempo: '5 min + reposo', porciones: 1, calorias: 280, proteinas: 10, carbs: 30, grasas: 14, ingredientes: ['3 cdas semillas de chia','1 taza leche de almendra','1 cdta miel','1/2 cdta vainilla','Frutos rojos'], preparacion: ['Mezclar chia, leche, miel y vainilla.','Refrigerar toda la noche.','Servir con frutos.'], tags: ['prep-veilla','omega-3','facil'] },
  { nombre: 'Galletas de Avena y Platano', categoria: 'Desayuno', tiempo: '20 min', porciones: 8, calorias: 85, proteinas: 3, carbs: 15, grasas: 2, ingredientes: ['2 platanos maduros','1 taza avena','1/4 taza chispas de chocolate oscuro','Canela'], preparacion: ['Machacar platanos.','Mezclar con avena y chispas.','Formar galletas en bandeja.','Hornear 180°C 15 min.'], tags: ['2-ingredientes','sin-azucar','snack'] },
  { nombre: 'Shakshuka (Huevos en Salsa)', categoria: 'Desayuno', tiempo: '25 min', porciones: 2, calorias: 320, proteinas: 18, carbs: 22, grasas: 18, ingredientes: ['4 huevos','1 lata tomate triturado','1 pimiento','1 cebolla','2 dientes ajo','Comino, paprika'], preparacion: ['Saltear cebolla, pimiento y ajo.','Agregar tomate y especias, cocinar 10 min.','Hacer huecos y agregar huevos.','Tapar y cocinar 5-7 min.'], tags: ['mediterraneo','alta-proteina'] },
  { nombre: 'Crepe de Claras con Fresas', categoria: 'Desayuno', tiempo: '15 min', porciones: 2, calorias: 280, proteinas: 24, carbs: 28, grasas: 6, ingredientes: ['6 claras + 1 huevo','1/4 tapa harina de avena','1/2 taza fresas','Edulcorante','Canela'], preparacion: ['Batir claras con harina y canela.','Verter en sarten fina, cocinar 1-2 min por lado.','Rellenar con fresas.'], tags: ['bajo-carb','post-entreno'] },
  { nombre: 'Hash de Papa con Pavo', categoria: 'Desayuno', tiempo: '20 min', porciones: 2, calorias: 380, proteinas: 28, carbs: 35, grasas: 14, ingredientes: ['200g papa en cubos','150g pavo molido','1/2 cebolla','1 cdta aceite de oliva','Sal, pimienta, pimenton'], preparacion: ['Cocinar papa 10 min.','Agregar pavo y cebolla.','Cocinar 8-10 min revolviendo.'], tags: ['saciante','alta-proteina'] },
  { nombre: 'Smoothie de Cafe Proteico', categoria: 'Desayuno', tiempo: '3 min', porciones: 1, calorias: 260, proteinas: 26, carbs: 28, grasas: 6, ingredientes: ['1 taza cafe frio','1 scoop proteina (vainilla)','1 platano congelado','Hielo'], preparacion: ['Licuar todos los ingredientes.','Servir inmediatamente.'], tags: ['cafeina','rapido','pre-entreno'] },
  { nombre: 'Enfrijoladas con Pollo', categoria: 'Desayuno', tiempo: '15 min', porciones: 2, calorias: 420, proteinas: 28, carbs: 40, grasas: 16, ingredientes: ['8 tortillas','2 tazas frijoles negros licuados','200g pollo desmenuzado','Queso fresco','Crema ligera'], preparacion: ['Calentar salsa de frijol.','Pasar tortillas por la salsa.','Rellenar con pollo, enrollar.','Servir con queso y crema.'], tags: ['mexicano','proteico'] },
  { nombre: 'Granola Proteica Horneada', categoria: 'Desayuno', tiempo: '35 min', porciones: 10, calorias: 210, proteinas: 12, carbs: 22, grasas: 9, ingredientes: ['3 tazas avena','1 scoop proteina','1/3 taza miel','1/4 taza aceite de coco','1/2 taza nueces'], preparacion: ['Mezclar todo.','Hornear 150°C 25 min revolviendo.','Dejar enfriar.'], tags: ['meal-prep','alta-proteina'] },
  { nombre: 'Huevos Rancheros Light', categoria: 'Desayuno', tiempo: '12 min', porciones: 1, calorias: 340, proteinas: 20, carbs: 30, grasas: 16, ingredientes: ['2 huevos fritos','2 tortillas de maiz','1/2 taza salsa ranchera','Frijoles','Aguacate'], preparacion: ['Freir huevos.','Calentar tortillas con salsa.','Servir huevos sobre tortillas con frijoles.'], tags: ['mexicano','tradicional'] },
  { nombre: 'Waffle de Avena y Claras', categoria: 'Desayuno', tiempo: '15 min', porciones: 2, calorias: 290, proteinas: 22, carbs: 32, grasas: 8, ingredientes: ['4 claras + 1 huevo','1/2 taza avena','1/4 taza leche','1 cdta polvo hornear','Vainilla'], preparacion: ['Licuar todo.','Verter en wafflera.','Cocinar 4-5 min.','Servir con frutas.'], tags: ['alta-proteina','bajo-carb'] },
  { nombre: 'Parfait de Fresas y Crema', categoria: 'Desayuno', tiempo: '5 min', porciones: 1, calorias: 240, proteinas: 18, carbs: 28, grasas: 6, ingredientes: ['1 taza yogur griego','1/2 taza fresas','1 cdta miel','2 cdas granola'], preparacion: ['Colocar capas de yogur, fresas y granola.','Repetir.','Decorar con miel.'], tags: ['rapido','probiótico','facil'] },

  // ═════ ALMUERZOS (30) ═════
  { nombre: 'Bowl de Pollo Teriyaki', categoria: 'Almuerzo', tiempo: '25 min', porciones: 2, calorias: 480, proteinas: 36, carbs: 52, grasas: 12, ingredientes: ['250g pechuga de pollo','1 taza arroz integral cocido','1 taza brócoli','1/2 taza zanahoria','Salsa teriyaki baja en sodio'], preparacion: ['Cocinar arroz.','Saltear pollo en cubos 6 min.','Agregar vegetales 4 min.','Mezclar con salsa y servir.'], tags: ['alta-proteina','asiatico'] },
  { nombre: 'Fajitas de Pollo con Pimientos', categoria: 'Almuerzo', tiempo: '20 min', porciones: 2, calorias: 420, proteinas: 38, carbs: 35, grasas: 14, ingredientes: ['250g pechuga en tiras','2 tortillas integrales','1 pimiento rojo','1 pimiento verde','1 cebolla','Comino, limon'], preparacion: ['Saltear pollo 5 min.','Agregar verduras 5 min.','Servir en tortillas con limon.'], tags: ['mexicano','proteico'] },
  { nombre: 'Pasta de Garbanzos con Pesto', categoria: 'Almuerzo', tiempo: '15 min', porciones: 2, calorias: 440, proteinas: 18, carbs: 52, grasas: 18, ingredientes: ['200g pasta integral','1 lata garbanzos','3 cdas pesto casero','Tomates cherry','Parmesano'], preparacion: ['Cocinar pasta al dente.','Mezclar con garbanzos y pesto.','Agregar tomates y parmesano.'], tags: ['vegetariano','mediterraneo'] },
  { nombre: 'Salmón al Horno con Quinoa', categoria: 'Almuerzo', tiempo: '30 min', porciones: 2, calorias: 520, proteinas: 42, carbs: 38, grasas: 22, ingredientes: ['2 filetes de salmon (200g)','1 taza quinoa cocida','Esparragos','Limon','Eneldo, sal'], preparacion: ['Hornear salmon 180°C 18 min.','Cocinar quinoa.','Saltear esparragos.','Servir todo con limon.'], tags: ['omega-3','alta-proteina'] },
  { nombre: 'Tacos de Pescado Baja', categoria: 'Almuerzo', tiempo: '20 min', porciones: 2, calorias: 380, proteinas: 30, carbs: 36, grasas: 12, ingredientes: ['250g filete de tilapia','4 tortillas de maiz','Repollo morado','Salsa de yogurt','Limon'], preparacion: ['Cocinar pescado 4 min por lado.','Desmenuzar.','Servir en tortillas con repollo y salsa.'], tags: ['mexicano','omega-3'] },
  { nombre: 'Arroz Frito de Coliflor', categoria: 'Almuerzo', tiempo: '15 min', porciones: 2, calorias: 290, proteinas: 22, carbs: 18, grasas: 14, ingredientes: ['300g coliflor rallada','150g pechuga en cubos','1 huevo','2 cdas salsa de soja baja en sodio','Ajo, jengibre'], preparacion: ['Saltear pollo 4 min.','Agregar coliflor 5 min.','Empujar a un lado, cocinar huevo.','Mezclar todo con salsa de soja.'], tags: ['keto','bajo-carb','asiatico'] },
  { nombre: 'Hamburguesa de Pavo con Batata', categoria: 'Almuerzo', tiempo: '25 min', porciones: 2, calorias: 480, proteinas: 36, carbs: 42, grasas: 18, ingredientes: ['250g pavo molido','1 batata mediana','1 huevo','Pan integral','Lechuga, tomate'], preparacion: ['Formar hamburguesas con pavo y huevo.','Cocinar 5 min por lado.','Hornear batata en cubos.','Armar hamburguesa.'], tags: ['alta-proteina','saciante'] },
  { nombre: 'Curry de Garbanzos', categoria: 'Almuerzo', tiempo: '25 min', porciones: 3, calorias: 380, proteinas: 14, carbs: 48, grasas: 16, ingredientes: ['2 latas garbanzos','1 lata leche de coco light','1 cebolla','2 dientes ajo','Curry en polvo','Espinaca'], preparacion: ['Saltear cebolla y ajo.','Agregar curry y garbanzos.','Verter leche de coco, cocinar 15 min.','Agregar espinaca al final.'], tags: ['vegano','indio','saciante'] },
  { nombre: 'Wrap de Atun y Vegetales', categoria: 'Almuerzo', tiempo: '10 min', porciones: 1, calorias: 350, proteinas: 28, carbs: 32, grasas: 12, ingredientes: ['1 lata atun en agua','1 tortilla integral grande','Lechuga, tomate, cebolla','1 cdta mayonesa light'], preparacion: ['Mezclar atun con mayonesa.','Colocar vegetales en tortilla.','Agregar atun, enrollar.'], tags: ['omega-3','rapido'] },
  { nombre: 'Pechuga Rellena de Espinaca y Queso', categoria: 'Almuerzo', tiempo: '35 min', porciones: 2, calorias: 420, proteinas: 48, carbs: 8, grasas: 20, ingredientes: ['2 pechugas grandes','1 taza espinaca','60g queso mozzarella','Tomates secos','Sal, pimienta'], preparacion: ['Hacer corte en pechuga.','Rellenar con espinaca, queso y tomates.','Sellar en sarten, hornear 180°C 20 min.'], tags: ['keto','alta-proteina','elegante'] },
  { nombre: 'Lentejas con Verduras', categoria: 'Almuerzo', tiempo: '35 min', porciones: 4, calorias: 340, proteinas: 18, carbs: 48, grasas: 8, ingredientes: ['2 tazas lentejas cocidas','2 zanahorias','2 tallos apio','1 cebolla','Caldo de pollo bajo sodio'], preparacion: ['Saltear verduras.','Agregar lentejas y caldo.','Cocinar 20 min.'], tags: ['vegano','fibra','saciante'] },
  { nombre: 'Pollo al Limon con Arroz', categoria: 'Almuerzo', tiempo: '30 min', porciones: 2, calorias: 460, proteinas: 40, carbs: 42, grasas: 14, ingredientes: ['250g pechuga','1 taza arroz blanco','Jugo de 2 limones','Ajo, perejil','1 cdta aceite de oliva'], preparacion: ['Cocinar arroz.','Saltear pollo 6 min.','Agregar limon y ajo, cocinar 3 min.','Servir con arroz.'], tags: ['mediterraneo','citrico'] },
  { nombre: 'Bowl de Quinoa con Vegetales', categoria: 'Almuerzo', tiempo: '20 min', porciones: 2, calorias: 360, proteinas: 12, carbs: 48, grasas: 14, ingredientes: ['1 taza quinoa cocida','1 taza garbanzos','1/2 aguacate','1/2 taza pepino','Tahini, limon'], preparacion: ['Cocinar quinoa.','Cortar vegetales.','Mezclar todo con tahini.'], tags: ['vegano','mediterraneo','superfood'] },
  { nombre: 'Pasta con Salsa de Pavo', categoria: 'Almuerzo', tiempo: '25 min', porciones: 3, calorias: 440, proteinas: 32, carbs: 42, grasas: 16, ingredientes: ['300g pasta integral','300g pavo molido','1 lata tomate triturado','Cebolla, ajo','Albahaca'], preparacion: ['Cocinar pasta.','Cocinar pavo con cebolla y ajo.','Agregar tomate y albahaca, cocinar 10 min.','Mezclar con pasta.'], tags: ['italiano','saciante'] },
  { nombre: 'Tortilla de Maiz con Nopales', categoria: 'Almuerzo', tiempo: '15 min', porciones: 2, calorias: 280, proteinas: 8, carbs: 38, grasas: 12, ingredientes: ['2 tortillas grandes','2 tazas nopales cocidos','1/2 taza queso fresco','Salsa roja','Cilantro'], preparacion: ['Saltear nopales.','Calentar tortillas con queso.','Agregar nopales y salsa.'], tags: ['mexicano','bajo-carb','tradicional'] },
  { nombre: 'Pollo Tandoori con Arroz Basmati', categoria: 'Almuerzo', tiempo: '40 min', porciones: 2, calorias: 520, proteinas: 42, carbs: 48, grasas: 18, ingredientes: ['250g pechuga en cubos','1 taza yogur griego','Tandoori masala','1 taza arroz basmati','Cilantro'], preparacion: ['Marinar pollo en yogur y tandoori 30 min.','Hornear 200°C 20 min.','Cocinar arroz.','Servir.'], tags: ['indio','especiado'] },
  { nombre: 'Sopa de Pollo con Vegetales', categoria: 'Almuerzo', tiempo: '35 min', porciones: 4, calorias: 260, proteinas: 24, carbs: 22, grasas: 8, ingredientes: ['300g pechuga desmenuzada','4 tazas caldo','2 zanahorias','2 tallos apio','Fideos integrales'], preparacion: ['Cocinar pollo en caldo.','Agregar verduras y fideos.','Cocinar 15 min.'], tags: ['reconfortante','bajo-carb'] },
  { nombre: 'Bowl de Atun Poke', categoria: 'Almuerzo', tiempo: '15 min', porciones: 1, calorias: 450, proteinas: 36, carbs: 42, grasas: 16, ingredientes: ['200g atun fresco en cubos','1 taza arroz sushi','1/2 aguacate','Salsa de soja','Semillas de sesamo'], preparacion: ['Marinar atun en soja.','Servir sobre arroz.','Agregar aguacate y semillas.'], tags: ['hawaiano','omega-3','crudo'] },
  { nombre: 'Chiles Rellenos de Pavo', categoria: 'Almuerzo', tiempo: '45 min', porciones: 4, calorias: 380, proteinas: 30, carbs: 24, grasas: 18, ingredientes: ['4 chiles poblanos','300g pavo molido','1/2 tapa queso','Salsa de tomate','Cebolla, ajo'], preparacion: ['Tatemar chiles, pelar.','Rellenar con pavo cocido y queso.','Cubrir con salsa.','Hornear 180°C 20 min.'], tags: ['mexicano','tradicional','saciante'] },
  { nombre: 'Risotto de Champinones', categoria: 'Almuerzo', tiempo: '35 min', porciones: 3, calorias: 380, proteinas: 10, carbs: 48, grasas: 16, ingredientes: ['1.5 tazas arroz arborio','300g champinones','1/2 taza vino blanco','Caldo de verduras','Parmesano'], preparacion: ['Saltear champinones.','Agregar arroz, tostar.','Agregar vino, evaporar.','Agregar caldo poco a poco, remover.'], tags: ['italiano','vegetariano','elegante'] },
  { nombre: 'Torta Ahogada Light', categoria: 'Almuerzo', tiempo: '20 min', porciones: 1, calorias: 460, proteinas: 32, carbs: 42, grasas: 18, ingredientes: ['1 bolillo integral','150g carnitas magras','1 taza salsa de chile de arbol','Frijoles refritos','Cebolla curtida'], preparacion: ['Cortar bolillo, untar frijoles.','Agregar carnitas.','Bañar con salsa.','Servir con cebolla.'], tags: ['mexicano','guadalajara','saciante'] },
  { nombre: 'Berenjenas Rellenas de Quinoa', categoria: 'Almuerzo', tiempo: '40 min', porciones: 2, calorias: 320, proteinas: 12, carbs: 40, grasas: 12, ingredientes: ['2 berenjenas','1 taza quinoa cocida','1/2 taza tomate','Queso mozzarella','Albahaca'], preparacion: ['Hornear berenjenas 20 min.','Sacar pulpa, mezclar con quinoa.','Rellenar, agregar queso.','Hornear 15 min mas.'], tags: ['vegetariano','mediterraneo'] },
  { nombre: 'Milanesa de Pollo con Ensalada', categoria: 'Almuerzo', tiempo: '20 min', porciones: 2, calorias: 420, proteinas: 42, carbs: 22, grasas: 18, ingredientes: ['300g pechuga empanizada','2 tazas mix de lechugas','1 tomate','1/2 pepino','Aderezo ligero'], preparacion: ['Empanizar pechugas con avena.','Cocinar 4 min por lado.','Servir con ensalada.'], tags: ['argentina','clasico'] },
  { nombre: 'Sopa de Lentejas al Curry', categoria: 'Almuerzo', tiempo: '30 min', porciones: 4, calorias: 300, proteinas: 16, carbs: 40, grasas: 8, ingredientes: ['2 tazas lentejas','1 lata leche de coco','2 cdas curry','Cebolla, ajo','Espinaca'], preparacion: ['Cocinar lentejas.','Saltear cebolla y ajo.','Agregar curry y leche de coco.','Mezclar todo, cocinar 10 min.'], tags: ['indio','vegano','saciante'] },
  { nombre: 'Pizza de Coliflor', categoria: 'Almuerzo', tiempo: '35 min', porciones: 2, calorias: 340, proteinas: 24, carbs: 18, grasas: 20, ingredientes: ['1/2 coliflor grande','1 huevo','50g queso mozzarella','Salsa de tomate','Pepperoni de pavo'], preparacion: ['Rallar coliflor, escurrir.','Mezclar con huevo y queso.','Formar base, hornear 15 min.','Agregar salsa y toppings, hornear 10 min.'], tags: ['keto','bajo-carb','creativo'] },
  { nombre: 'Tacos al Pastor Saludables', categoria: 'Almuerzo', tiempo: '30 min', porciones: 3, calorias: 380, proteinas: 28, carbs: 36, grasas: 14, ingredientes: ['300g lomo de cerdo magro','3 tortillas de maiz','1/2 pina','Cebolla, cilantro','Chile guajillo'], preparacion: ['Marinar cerdo con chile y pina.','Cocinar en sarten 10 min.','Servir en tortillas con cebolla y pina.'], tags: ['mexicano','tradicional'] },

  // ═════ CENAS (20) ═════
  { nombre: 'Filete de Pescado al Mojo de Ajo', categoria: 'Cena', tiempo: '15 min', porciones: 2, calorias: 320, proteinas: 38, carbs: 8, grasas: 16, ingredientes: ['2 filetes de huachinango','4 dientes de ajo','1/4 taza mantequilla','Limon','Perejil'], preparacion: ['Derretir mantequilla con ajo.','Cocinar pescado 4 min por lado.','Agregar limon y perejil.'], tags: ['mexicano','omega-3','rapido'] },
  { nombre: 'Sopa de Tomate con Albahaca', categoria: 'Cena', tiempo: '25 min', porciones: 3, calorias: 180, proteinas: 4, carbs: 22, grasas: 8, ingredientes: ['6 tomates maduros','1/2 cebolla','2 tazas caldo','Albahaca fresca','Crema ligera'], preparacion: ['Asar tomates y cebolla.','Licuar con caldo.','Cocinar 10 min.','Servir con albahaca y crema.'], tags: ['vegetariana','reconfortante','bajo-carb'] },
  { nombre: 'Pollo a la Plancha con Vegetales', categoria: 'Cena', tiempo: '20 min', porciones: 2, calorias: 380, proteinas: 42, carbs: 16, grasas: 16, ingredientes: ['250g pechuga','1 taza brócoli','1/2 taza pimientos','1 cdta aceite de oliva','Ajo, limon'], preparacion: ['Sellar pollo 5 min por lado.','Saltear vegetales.','Servir junto.'], tags: ['basico','alta-proteina'] },
  { nombre: 'Caldo de Pollo con Verduras', categoria: 'Cena', tiempo: '40 min', porciones: 4, calorias: 220, proteinas: 22, carbs: 18, grasas: 6, ingredientes: ['300g pollo con hueso','4 tazas agua','Zanahoria, apio, papa','Cebolla, ajo','Sal, pimienta'], preparacion: ['Hervir pollo con agua y verduras 30 min.','Desmenuzar pollo.','Servir caliente.'], tags: ['reconfortante','inmune'] },
  { nombre: 'Wrap de Pavo y Aguacate', categoria: 'Cena', tiempo: '10 min', porciones: 1, calorias: 350, proteinas: 28, carbs: 28, grasas: 16, ingredientes: ['1 tortilla integral grande','100g pavo en lonchas','1/2 aguacate','Lechuga, tomate','Mostaza'], preparacion: ['Untar aguacate en tortilla.','Agregar pavo y vegetales.','Enrollar.'], tags: ['rapido','proteico'] },
  { nombre: 'Sopa de Poblano con Elote', categoria: 'Cena', tiempo: '25 min', porciones: 3, calorias: 240, proteinas: 8, carbs: 28, grasas: 12, ingredientes: ['2 chiles poblanos','1 taza elote','1/2 taza crema ligera','Caldo de pollo','Queso fresco'], preparacion: ['Tatemar y pelar poblanos.','Licuar con elote y caldo.','Cocinar 10 min.','Servir con crema y queso.'], tags: ['mexicano','cremosa'] },
  { nombre: 'Pechuga de Pollo a la Naranja', categoria: 'Cena', tiempo: '25 min', porciones: 2, calorias: 380, proteinas: 42, carbs: 20, grasas: 12, ingredientes: ['250g pechuga','Jugo de 2 naranjas','1 cdta miel','Jengibre rallado','Soya baja en sodio'], preparacion: ['Sellar pollo.','Mezclar jugo, miel, jengibre y soya.','Reducir salsa 5 min.','Servir pollo con salsa.'], tags: ['citrico','alta-proteina'] },
  { nombre: 'Ensalada Cesar con Pollo', categoria: 'Cena', tiempo: '15 min', porciones: 2, calorias: 420, proteinas: 38, carbs: 16, grasas: 24, ingredientes: ['200g pechuga en tiras','4 tazas lechuga romana','2 cdas aderezo cesar light','Parmesano','Crutones integrales'], preparacion: ['Cocinar pollo.','Mezclar lechuga con aderezo.','Agregar pollo, parmesano y crutones.'], tags: ['clasico','alta-proteina'] },
  { nombre: 'Calabacines Rellenos de Carne', categoria: 'Cena', tiempo: '35 min', porciones: 3, calorias: 320, proteinas: 28, carbs: 16, grasas: 18, ingredientes: ['3 calabacines medianos','250g carne molida magra','1/2 taza salsa de tomate','Queso mozzarella'], preparacion: ['Partir calabacines, vaciar.','Rellenar con carne cocida y salsa.','Agregar queso.','Hornear 180°C 20 min.'], tags: ['keto','saciante'] },
  { nombre: 'Pescado Empapelado con Verduras', categoria: 'Cena', tiempo: '25 min', porciones: 2, calorias: 340, proteinas: 36, carbs: 14, grasas: 14, ingredientes: ['2 filetes de pescado blanco','1/2 tapa jitomate','1/4 tapa cebolla','Limon','Cilantro, sal'], preparacion: ['Colocar pescado sobre papel aluminio.','Agregar jitomate, cebolla, limon y cilantro.','Cerrar papillote.','Hornear 180°C 20 min.'], tags: ['mexicano','jugoso','bajo-carb'] },
  { nombre: 'Sopa de Frijoles Negros', categoria: 'Cena', tiempo: '20 min', porciones: 4, calorias: 260, proteinas: 14, carbs: 36, grasas: 6, ingredientes: ['2 tazas frijoles negros cocidos','1 cebolla','2 dientes ajo','Caldo de pollo','Epazote'], preparacion: ['Saltear cebolla y ajo.','Licuar frijoles con caldo.','Cocinar 10 min.','Agregar epazote.'], tags: ['mexicano','vegano','saciante'] },
  { nombre: 'Rollitos de Pechuga y Esparragos', categoria: 'Cena', tiempo: '30 min', porciones: 2, calorias: 340, proteinas: 42, carbs: 8, grasas: 16, ingredientes: ['2 pechugas grandes','8 esparragos','2 reb. queso','2 reb. jamon','Sal, pimienta'], preparacion: ['Aplanar pechugas.','Colocar esparragos, queso y jamon.','Enrollar, sujetar con palillo.','Hornear 180°C 25 min.'], tags: ['keto','elegante'] },
  { nombre: 'Sopa Thai de Coco con Camaron', categoria: 'Cena', tiempo: '20 min', porciones: 2, calorias: 320, proteinas: 28, carbs: 18, grasas: 16, ingredientes: ['200g camaron','1 lata leche de coco','1 taza caldo','Jengibre, limon grass','Chile serrano'], preparacion: ['Hervir leche de coco con caldo.','Agregar jengibre y limon grass.','Agregar camaron, cocinar 3 min.'], tags: ['tailandes','picante','exotico'] },
  { nombre: 'Pollo al Curry Verde', categoria: 'Cena', tiempo: '25 min', porciones: 2, calorias: 420, proteinas: 38, carbs: 16, grasas: 22, ingredientes: ['250g pechuga en cubos','3 cdas pasta curry verde','1 lata leche de coco','Brócoli, pimientos','Albahaca tailandesa'], preparacion: ['Saltear pasta curry.','Agregar pollo, cocinar 5 min.','Agregar leche de coco y vegetales.','Cocinar 10 min.'], tags: ['tailandes','picante','cremoso'] },
  { nombre: 'Tortilla de Claras con Atun', categoria: 'Cena', tiempo: '12 min', porciones: 1, calorias: 280, proteinas: 36, carbs: 4, grasas: 10, ingredientes: ['6 claras + 1 huevo','1 lata atun en agua','1/4 tapa cebolla','1 cdta aceite de oliva'], preparacion: ['Batir claras.','Mezclar con atun y cebolla.','Cocinar en sarten 4-5 min.'], tags: ['keto','bajo-carb','rapido'] },
  { nombre: 'Sopa de Mariscos Estilo Veracruz', categoria: 'Cena', tiempo: '30 min', porciones: 3, calorias: 340, proteinas: 32, carbs: 22, grasas: 12, ingredientes: ['300g mix mariscos','3 tomates','1/2 cebolla','2 tazas caldo','Aceitunas, alcaparras'], preparacion: ['Licuar tomates con cebolla.','Cocinar en caldo 10 min.','Agregar mariscos 5 min.','Servir con aceitunas.'], tags: ['mexicano','veracruz','elegante'] },
  { nombre: 'Coliflor Gratinada con Queso', categoria: 'Cena', tiempo: '30 min', porciones: 3, calorias: 260, proteinas: 16, carbs: 14, grasas: 18, ingredientes: ['1 coliflor mediana','1/2 taza crema ligera','1 taza queso cheddar','1 cdta mostaza','Sal, pimienta'], preparacion: ['Cocinar coliflor al vapor 10 min.','Mezclar crema con mostaza y queso.','Verter sobre coliflor.','Hornear 180°C 15 min.'], tags: ['keto','vegetariano'] },
  { nombre: 'Salmón a la Plancha con Esparragos', categoria: 'Cena', tiempo: '15 min', porciones: 2, calorias: 380, proteinas: 36, carbs: 6, grasas: 22, ingredientes: ['2 filetes de salmon (200g)','1 taza esparragos','Limon','1 cdta aceite de oliva','Sal, pimienta'], preparacion: ['Sellar salmon 4 min por lado.','Saltear esparragos.','Servir con limon.'], tags: ['omega-3','keto','rapido'] },
  { nombre: 'Pozole Rojo Light', categoria: 'Cena', tiempo: '45 min', porciones: 6, calorias: 320, proteinas: 24, carbs: 32, grasas: 10, ingredientes: ['500g pechuga de pollo','3 tazas maiz pozolero','3 chiles guajillo','Orégano, lechuga, rabano','Limon'], preparacion: ['Cocinar pollo en caldo con chiles 30 min.','Agregar maiz.','Desmenuzar pollo.','Servir con garnishes.'], tags: ['mexicano','tradicional','saciante'] },
  { nombre: 'Berenjenas a la Parmesana', categoria: 'Cena', tiempo: '40 min', porciones: 3, calorias: 320, proteinas: 18, carbs: 28, grasas: 16, ingredientes: ['2 berenjenas','1 taza salsa de tomate','1 taza mozzarella','Parmesano','Albahaca'], preparacion: ['Rebanar berenjenas, hornear 15 min.','Formar capas de berenjena, salsa y queso.','Hornear 180°C 20 min.'], tags: ['italiano','vegetariano'] },

  // ═════ SNACKS/COLACION (20) ═════
  { nombre: 'Bolas de Energia de Avena', categoria: 'Snack', tiempo: '10 min', porciones: 12, calorias: 110, proteinas: 4, carbs: 14, grasas: 5, ingredientes: ['1 taza avena','1/2 taza mantequilla de mani','1/4 tapa miel','1/4 taza chispas oscuras'], preparacion: ['Mezclar todo.','Formar bolas.','Refrigerar 30 min.'], tags: ['no-horno','snack','meal-prep'] },
  { nombre: 'Palitos de Apio con Mantequilla de Almendra', categoria: 'Snack', tiempo: '2 min', porciones: 1, calorias: 180, proteinas: 6, carbs: 8, grasas: 14, ingredientes: ['3 tallos apio','2 cdas mantequilla de almendra','Semillas de chia'], preparacion: ['Cortar apio en bastones.','Untar con mantequilla.','Espolvorear semillas.'], tags: ['keto','rapido','crudivegano'] },
  { nombre: 'Hummus de Garbanzo con Zanahoria', categoria: 'Snack', tiempo: '5 min', porciones: 4, calorias: 160, proteinas: 6, carbs: 18, grasas: 8, ingredientes: ['1 lata garbanzos','2 cdas tahini','1 diente ajo','Jugo de limon','Zanahorias para dip'], preparacion: ['Licuar garbanzos con tahini, ajo y limon.','Servir con zanahorias.'], tags: ['vegano','mediterraneo','fibra'] },
  { nombre: 'Yogur Griego con Nueces', categoria: 'Snack', tiempo: '2 min', porciones: 1, calorias: 220, proteinas: 18, carbs: 12, grasas: 12, ingredientes: ['1 taza yogur griego 0%','1 cdta miel','2 cdas nueces picadas'], preparacion: ['Mezclar todo.'], tags: ['alta-proteina','rapido','omega-3'] },
  { nombre: 'Manzana con Mantequilla de Mani', categoria: 'Snack', tiempo: '2 min', porciones: 1, calorias: 250, proteinas: 8, carbs: 28, grasas: 12, ingredientes: ['1 manzana mediana','1.5 cdas mantequilla de mani','Canela'], preparacion: ['Cortar manzana en gajos.','Untar con mantequilla de mani.','Espolvorear canela.'], tags: ['rapido','clasico','facil'] },
  { nombre: 'Chips de Kale', categoria: 'Snack', tiempo: '15 min', porciones: 2, calorias: 60, proteinas: 2, carbs: 8, grasas: 2, ingredientes: ['2 tazas kale desinfectada','1 cdta aceite de oliva','Sal'], preparacion: ['Mezclar kale con aceite y sal.','Distribuir en bandeja.','Hornear 150°C 12 min.'], tags: ['vegano','bajo-carb','crispy'] },
  { nombre: 'Pepino con Limon y Tajin', categoria: 'Snack', tiempo: '2 min', porciones: 1, calorias: 35, proteinas: 1, carbs: 6, grasas: 0, ingredientes: ['1 pepino mediano','Limon','Tajin'], preparacion: ['Cortar pepino en bastones.','Exprimir limon.','Espolvorear Tajin.'], tags: ['mexicano','bajo-carb','fresco'] },
  { nombre: 'Edamames', categoria: 'Snack', tiempo: '5 min', porciones: 2, calorias: 190, proteinas: 18, carbs: 14, grasas: 8, ingredientes: ['2 tazas edamames con cascara','Sal'], preparacion: ['Hervir edamames 5 min.','Escurrir y salar.'], tags: ['japones','alta-proteina','rapido'] },
  { nombre: 'Barritas de Granola Caseras', categoria: 'Snack', tiempo: '30 min', porciones: 10, calorias: 180, proteinas: 6, carbs: 24, grasas: 8, ingredientes: ['2 tazas avena','1/2 taza miel','1/4 taza mantequilla de mani','1/4 taza pasas','1/4 tapa semillas'], preparacion: ['Mezclar todo.','Prensar en molde.','Hornear 180°C 20 min.','Dejar enfriar, cortar.'], tags: ['meal-prep','sin-horno-opcional'] },
  { nombre: 'Tostada de Hummus y Pepino', categoria: 'Snack', tiempo: '5 min', porciones: 1, calorias: 200, proteinas: 8, carbs: 22, grasas: 8, ingredientes: ['1 reb. pan integral','3 cdas hummus','1/2 pepino en rodajas','Pimenton'], preparacion: ['Tostar pan.','Untar hummus.','Agregar pepino y pimenton.'], tags: ['vegano','mediterraneo'] },
  { nombre: 'Cottage Cheese con Frutas', categoria: 'Snack', tiempo: '2 min', porciones: 1, calorias: 180, proteinas: 24, carbs: 14, grasas: 4, ingredientes: ['1/2 taza cottage cheese','1/2 taza duraznos','Canela'], preparacion: ['Servir cottage cheese en bowl.','Agregar duraznos.','Espolvorear canela.'], tags: ['alta-proteina','caseina','rapido'] },
  { nombre: 'Chicharron de Coliflor', categoria: 'Snack', tiempo: '25 min', porciones: 3, calorias: 90, proteinas: 4, carbs: 8, grasas: 6, ingredientes: ['1/2 coliflor mediana','1 cdta aceite de oliva','Pimenton','Sal'], preparacion: ['Separar coliflor en floretes.','Mezclar con aceite y especias.','Hornear 200°C 20 min hasta dorar.'], tags: ['keto','vegano','crispy'] },
  { nombre: 'Elote en Vaso', categoria: 'Snack', tiempo: '10 min', porciones: 2, calorias: 220, proteinas: 6, carbs: 30, grasas: 10, ingredientes: ['2 tazas elote desgranado','2 cdas crema','Queso cotija','Chile en polvo','Limon'], preparacion: ['Cocinar elote 5 min.','Servir en vasos.','Agregar crema, queso, chile y limon.'], tags: ['mexicano','tradicional'] },
  { nombre: 'Semillas de Calabaza Tostadas', categoria: 'Snack', tiempo: '15 min', porciones: 4, calorias: 150, proteinas: 6, carbs: 4, grasas: 12, ingredientes: ['1 taza semillas de calabaza','1 cdta aceite de oliva','Sal, pimenton'], preparacion: ['Mezclar semillas con aceite y especias.','Hornear 180°C 12 min.'], tags: ['keto','magnesio','vegano'] },
  { nombre: 'Proteica: Clara Cocida con Atun', categoria: 'Snack', tiempo: '5 min', porciones: 1, calorias: 140, proteinas: 24, carbs: 2, grasas: 3, ingredientes: ['4 claras cocidas','1 lata atun mini','Sal, pimienta','Limon'], preparacion: ['Cortar claras en mitades.','Rellenar con atun.','Sazonar con limon.'], tags: ['alta-proteina','keto','rapido'] },
  { nombre: 'Gelatina de Frutas sin Azucar', categoria: 'Snack', tiempo: '10 min + 4h', porciones: 4, calorias: 40, proteinas: 2, carbs: 6, grasas: 0, ingredientes: ['1 sobre grenetina sin sabor','2 tazas agua','1/2 tapa frutos rojos','Edulcorante'], preparacion: ['Hidratar grenetina en agua fria.','Calentar hasta disolver.','Agregar frutos y edulcorante.','Refrigerar 4h.'], tags: ['bajo-carb','postre','facil'] },
  { nombre: 'Hummus de Betabel', categoria: 'Snack', tiempo: '10 min', porciones: 4, calorias: 120, proteinas: 4, carbs: 14, grasas: 6, ingredientes: ['1 betabel cocido','1/2 taza garbanzos','2 cdas tahini','Ajo, limon'], preparacion: ['Licuar todo hasta suave.','Servir con pepino o zanahoria.'], tags: ['vegano','colorido','antioxidante'] },
  { nombre: 'Chiles Jalapenos Rellenos de Queso', categoria: 'Snack', tiempo: '20 min', porciones: 4, calorias: 80, proteinas: 4, carbs: 4, grasas: 6, ingredientes: ['8 jalapenos','100g queso crema light','Tocino de pavo'], preparacion: ['Partir jalapenos, vaciar.','Rellenar con queso.','Envolver en tocino.','Hornear 180°C 15 min.'], tags: ['keto','picante','mexicano'] },
  { nombre: 'Fruta con Chamoy Light', categoria: 'Snack', tiempo: '5 min', porciones: 2, calorias: 120, proteinas: 1, carbs: 28, grasas: 0, ingredientes: ['1 taza sandia','1 tapa jicama','1/2 taza pepino','Chamoy sin azucar','Tajin'], preparacion: ['Cortar frutas en bastones.','Servir con chamoy y Tajin.'], tags: ['mexicano','fresco','bajo-carb'] },
  { nombre: 'Pudin de Proteina de Chia', categoria: 'Snack', tiempo: '5 min + noche', porciones: 2, calorias: 160, proteinas: 16, carbs: 14, grasas: 6, ingredientes: ['2 cdas chia','1 scoop proteina','1 taza leche de almendra','Vainilla'], preparacion: ['Mezclar todo.','Refrigerar toda la noche.'], tags: ['prep-velada','alta-proteina'] },

  // ═════ PRE-ENTRENO (10) ═════
  { nombre: 'Platano con Mantequilla de Mani', categoria: 'Pre-entreno', tiempo: '2 min', porciones: 1, calorias: 290, proteinas: 8, carbs: 38, grasas: 12, ingredientes: ['1 platano grande','1.5 cdas mantequilla de mani'], preparacion: ['Cortar platano a lo largo.','Untar mantequilla.'], tags: ['rapido','energia-rapida'] },
  { nombre: 'Tostada con Miel y Platano', categoria: 'Pre-entreno', tiempo: '3 min', porciones: 1, calorias: 320, proteinas: 6, carbs: 58, grasas: 6, ingredientes: ['2 reb. pan blanco','1 cda miel','1 platano','Canela'], preparacion: ['Tostar pan.','Untar miel.','Colocar rodajas de platano.'], tags: ['alto-ig','energia-rapida'] },
  { nombre: 'Arroz con Pollo Pequeno', categoria: 'Pre-entreno', tiempo: '10 min', porciones: 1, calorias: 380, proteinas: 28, carbs: 48, grasas: 6, ingredientes: ['1/2 taza arroz blanco','100g pechuga','Salsa de soja'], preparacion: ['Calentar arroz y pollo.','Saltear juntos 3 min.'], tags: ['saciante','proteico'] },
  { nombre: 'Gel de Maltodextrina Casero', categoria: 'Pre-entreno', tiempo: '5 min', porciones: 1, calorias: 120, proteinas: 0, carbs: 30, grasas: 0, ingredientes: ['30g maltodextrina','100ml agua','Jugo de limon','Sal'], preparacion: ['Mezclar maltodextrina con agua tibia.','Agregar limon y pizca de sal.'], tags: ['endurance','gel','carbs-rapidos'] },
  { nombre: 'Barra de Arroz Integral con Miel', categoria: 'Pre-entreno', tiempo: '2 min', porciones: 1, calorias: 200, proteinas: 3, carbs: 38, grasas: 4, ingredientes: ['1 barra de arroz integral','1 cda miel'], preparacion: ['Untar miel sobre la barra.'], tags: ['portatil','rapido'] },
  { nombre: 'Yogur con Granola y Frutos', categoria: 'Pre-entreno', tiempo: '3 min', porciones: 1, calorias: 280, proteinas: 12, carbs: 42, grasas: 6, ingredientes: ['1 taza yogur','1/3 taza granola','1/4 taza arandanos'], preparacion: ['Mezclar todo.'], tags: ['digestible','rapido'] },
  { nombre: 'Pan con Jamon y Queso', categoria: 'Pre-entreno', tiempo: '5 min', porciones: 1, calorias: 340, proteinas: 20, carbs: 32, grasas: 14, ingredientes: ['2 reb. pan integral','2 reb. jamon de pavo','1 reb. queso amarillo'], preparacion: ['Armar sandwich.','Calentar en sarten o micro.'], tags: ['clasico','saciante'] },
  { nombre: 'Smoothie de Frutas y Avena', categoria: 'Pre-entreno', tiempo: '3 min', porciones: 1, calorias: 310, proteinas: 8, carbs: 52, grasas: 6, ingredientes: ['1 platano','1/2 taza fresas','1/4 taza avena','1 taza jugo de naranja'], preparacion: ['Licuar todo.'], tags: ['liquido','facil-digestion'] },
  { nombre: 'Galletas de Arroz con Mantequilla', categoria: 'Pre-entreno', tiempo: '2 min', porciones: 1, calorias: 160, proteinas: 3, carbs: 18, grasas: 8, ingredientes: ['3 galletas de arroz','2 cdas mantequilla de mani'], preparacion: ['Untar mantequilla en galletas.'], tags: ['portatil','rapido'] },
  { nombre: 'Fecha Rellena de Almendra', categoria: 'Pre-entreno', tiempo: '2 min', porciones: 1, calorias: 200, proteinas: 4, carbs: 36, grasas: 6, ingredientes: ['4 dátiles Medjool','4 almendras'], preparacion: ['Quitar hueso a datiles.','Insertar almendra.'], tags: ['natural','rapido','portatil'] },

  // ═════ POST-ENTRENO (15) ═════
  { nombre: 'Batido de Proteina con Platano', categoria: 'Post-entreno', tiempo: '3 min', porciones: 1, calorias: 380, proteinas: 36, carbs: 48, grasas: 6, ingredientes: ['1 scoop proteina whey','1 platano','1 taza leche descremada','Hielo'], preparacion: ['Licuar todo.','Servir inmediatamente.'], tags: ['rapido','alta-proteina'] },
  { nombre: 'Sandwich de Pavo y Queso', categoria: 'Post-entreno', tiempo: '5 min', porciones: 1, calorias: 420, proteinas: 32, carbs: 38, grasas: 14, ingredientes: ['2 reb. pan integral','100g pavo','1 reb. queso','Lechuga, tomate'], preparacion: ['Armar sandwich con todos los ingredientes.'], tags: ['saciante','proteico'] },
  { nombre: 'Arroz con Pollo y Vegetales', categoria: 'Post-entreno', tiempo: '15 min', porciones: 1, calorias: 520, proteinas: 42, carbs: 52, grasas: 12, ingredientes: ['1 taza arroz','150g pechuga','1/2 taza brócoli','Salsa de soja'], preparacion: ['Cocinar arroz.','Saltear pollo y brócoli.','Mezclar todo.'], tags: ['completo','saciante'] },
  { nombre: 'Yogur Griego con Whey y Frutas', categoria: 'Post-entreno', tiempo: '3 min', porciones: 1, calorias: 340, proteinas: 38, carbs: 32, grasas: 6, ingredientes: ['1 taza yogur griego','1/2 scoop proteina','1/2 taza fresas','1 cdta miel'], preparacion: ['Mezclar proteina con yogur.','Agregar frutas y miel.'], tags: ['probiótico','caseina'] },
  { nombre: 'Pechuga con Batata', categoria: 'Post-entreno', tiempo: '25 min', porciones: 1, calorias: 480, proteinas: 42, carbs: 42, grasas: 12, ingredientes: ['200g pechuga','1 batata mediana','1 cdta aceite de oliva','Sal, pimienta'], preparacion: ['Hornear batata 20 min.','Cocinar pechuga a la plancha.','Servir junto.'], tags: ['alta-proteina','saciante'] },
  { nombre: 'Atun con Arroz Integral', categoria: 'Post-entreno', tiempo: '10 min', porciones: 1, calorias: 440, proteinas: 36, carbs: 42, grasas: 10, ingredientes: ['1 lata atun','1 taza arroz integral','1/4 aguacate','Soya baja en sodio'], preparacion: ['Calentar arroz.','Mezclar con atun y aguacate.','Agregar soya.'], tags: ['omega-3','rapido'] },
  { nombre: 'Claras Revueltas con Arroz', categoria: 'Post-entreno', tiempo: '10 min', porciones: 1, calorias: 380, proteinas: 28, carbs: 38, grasas: 8, ingredientes: ['5 claras + 1 huevo','1/2 taza arroz','1/4 taza tomate','Sal'], preparacion: ['Cocinar claras revueltas.','Mezclar con arroz caliente y tomate.'], tags: ['bajo-carb','rapido'] },
  { nombre: 'Pasta con Atun y Tomate', categoria: 'Post-entreno', tiempo: '15 min', porciones: 1, calorias: 480, proteinas: 34, carbs: 52, grasas: 14, ingredientes: ['100g pasta','1 lata atun','1/2 taza salsa de tomate','Parmesano'], preparacion: ['Cocinar pasta.','Mezclar con atun y salsa.'], tags: ['italiano','saciante'] },
  { nombre: 'Salmón con Arroz y Aguacate', categoria: 'Post-entreno', tiempo: '20 min', porciones: 1, calorias: 560, proteinas: 42, carbs: 38, grasas: 24, ingredientes: ['150g salmon','1/2 taza arroz','1/2 aguacate','Soya, limon'], preparacion: ['Hornear salmon 15 min.','Servir con arroz y aguacate.'], tags: ['omega-3','completo'] },
  { nombre: 'Tortilla de Huevo Completa', categoria: 'Post-entreno', tiempo: '10 min', porciones: 1, calorias: 420, proteinas: 32, carbs: 12, grasas: 28, ingredientes: ['3 huevos','50g queso','50g jamon','1/4 aguacate'], preparacion: ['Batir huevos.','Cocinar con jamon y queso.','Servir con aguacate.'], tags: ['keto','saciante'] },
  { nombre: 'Batido de Chocolate Proteico', categoria: 'Post-entreno', tiempo: '3 min', porciones: 1, calorias: 340, proteinas: 36, carbs: 38, grasas: 8, ingredientes: ['1 scoop proteina chocolate','1 taza leche','1 cda cacao','1 cdta miel','Hielo'], preparacion: ['Licuar todo.','Servir.'], tags: ['antioxidante','rapido'] },
  { nombre: 'Pollo con Pasta Integral', categoria: 'Post-entreno', tiempo: '20 min', porciones: 1, calorias: 520, proteinas: 40, carbs: 48, grasas: 14, ingredientes: ['150g pechuga','100g pasta integral','Salsa pesto','Parmesano'], preparacion: ['Cocinar pasta.','Saltear pollo.','Mezclar con pesto.'], tags: ['alta-proteina','completo'] },
  { nombre: 'Crepe de Proteina con Frutas', categoria: 'Post-entreno', tiempo: '15 min', porciones: 1, calorias: 380, proteinas: 30, carbs: 42, grasas: 8, ingredientes: ['1 scoop proteina','4 claras + 1 huevo','1/4 harina de avena','Fresas, miel'], preparacion: ['Batir ingredientes.','Hacer crepes finos.','Rellenar con frutas.'], tags: ['alta-proteina','postre-saludable'] },
  { nombre: 'Bowl de Quinoa con Pollo', categoria: 'Post-entreno', tiempo: '15 min', porciones: 1, calorias: 480, proteinas: 38, carbs: 42, grasas: 16, ingredientes: ['1 taza quinoa cocida','150g pollo','1/2 aguacate','Tomate, maiz'], preparacion: ['Cocinar quinoa.','Saltear pollo.','Mezclar todo en bowl.'], tags: ['superfood','completo'] },
  { nombre: 'Licuado de Leche con Avena y Miel', categoria: 'Post-entreno', tiempo: '3 min', porciones: 1, calorias: 420, proteinas: 24, carbs: 52, grasas: 10, ingredientes: ['2 tazas leche entera','1/2 taza avena','2 cdas miel','Platano'], preparacion: ['Licuar todo.','Servir inmediatamente.'], tags: ['barato','calorico','facil'] },

  // ═════ SMOOTHIES (10) ═════
  { nombre: 'Smoothie Verde Detox', categoria: 'Smoothie', tiempo: '3 min', porciones: 1, calorias: 180, proteinas: 6, carbs: 22, grasas: 6, ingredientes: ['1 taza espinaca','1/2 platano','1/2 manzana verde','Jugo de limon','Agua de coco'], preparacion: ['Licuar todo con agua de coco.','Servir inmediatamente.'], tags: ['detox','vitaminas','fresco'] },
  { nombre: 'Smoothie de Frutos Rojos', categoria: 'Smoothie', tiempo: '3 min', porciones: 1, calorias: 220, proteinas: 8, carbs: 32, grasas: 4, ingredientes: ['1/2 taza fresas','1/2 taza arandanos','1/2 tapa frambuesas','1 taza yogur griego','Hielo'], preparacion: ['Licuar todo.','Servir.'], tags: ['antioxidante','probiótico'] },
  { nombre: 'Smoothie de Mango y Coco', categoria: 'Smoothie', tiempo: '3 min', porciones: 1, calorias: 260, proteinas: 4, carbs: 38, grasas: 10, ingredientes: ['1 taza mango congelado','1/2 taza leche de coco','1/4 tapa coco rallado','Hielo'], preparacion: ['Licuar todo.','Servir con coco rallado.'], tags: ['tropical','refrescante'] },
  { nombre: 'Smoothie de Chocolate y Platano', categoria: 'Smoothie', tiempo: '3 min', porciones: 1, calorias: 310, proteinas: 28, carbs: 38, grasas: 8, ingredientes: ['1 scoop proteina chocolate','1 platano congelado','1 taza leche de almendra','1 cdta cacao','Hielo'], preparacion: ['Licuar todo.','Servir.'], tags: ['alta-proteina','post-entreno'] },
  { nombre: 'Smoothie de Manzana y Canela', categoria: 'Smoothie', tiempo: '3 min', porciones: 1, calorias: 200, proteinas: 6, carbs: 28, grasas: 6, ingredientes: ['1 manzana','1/2 platano','1 taza leche de almendra','Canela','Hielo'], preparacion: ['Licuar todo.','Servir.'], tags: ['otonal','fresco'] },
  { nombre: 'Smoothie de Pepino y Limon', categoria: 'Smoothie', tiempo: '3 min', porciones: 1, calorias: 80, proteinas: 2, carbs: 12, grasas: 0, ingredientes: ['1/2 pepino','Jugo de 1 limon','Menta fresca','Agua','Hielo'], preparacion: ['Licuar todo.','Servir bien frio.'], tags: ['detox','bajo-carb','fresco'] },
  { nombre: 'Smoothie de Avena y Mantequilla de Mani', categoria: 'Smoothie', tiempo: '3 min', porciones: 1, calorias: 380, proteinas: 18, carbs: 38, grasas: 18, ingredientes: ['1/2 taza avena','1 cda mantequilla de mani','1 platano','1 taza leche','Hielo'], preparacion: ['Licuar todo.','Servir.'], tags: ['saciante','energia'] },
  { nombre: 'Smoothie de Sandia y Menta', categoria: 'Smoothie', tiempo: '3 min', porciones: 1, calorias: 120, proteinas: 2, carbs: 28, grasas: 0, ingredientes: ['2 tazas sandia','Menta fresca','Jugo de limon','Hielo'], preparacion: ['Licuar todo.','Servir bien frio.'], tags: ['verano','hidratante','bajo-carb'] },
  { nombre: 'Smoothie Proteico de Cafe Frio', categoria: 'Smoothie', tiempo: '3 min', porciones: 1, calorias: 280, proteinas: 28, carbs: 22, grasas: 8, ingredientes: ['1 scoop proteina vainilla','1 taza cafe frio','1/4 taza leche','Hielo','Canela'], preparacion: ['Licuar todo.','Servir con canela.'], tags: ['cafeina','pre-entreno','rapido'] },
  { nombre: 'Smoothie Tropical de Proteina', categoria: 'Smoothie', tiempo: '3 min', porciones: 1, calorias: 320, proteinas: 28, carbs: 38, grasas: 6, ingredientes: ['1 scoop proteina','1/2 taza mango','1/2 taza pina','1 taza jugo de naranja','Hielo'], preparacion: ['Licuar todo.','Servir.'], tags: ['tropical','post-entreno'] },

  // ═════ VEGANO (15) ═════
  { nombre: 'Bowl de Buddha con Quinoa', categoria: 'Vegano', tiempo: '20 min', porciones: 1, calorias: 420, proteinas: 14, carbs: 52, grasas: 18, ingredientes: ['1/2 taza quinoa','1/2 taza garbanzos','1/2 aguacate','Zanahoria, pepino','Tahini'], preparacion: ['Cocinar quinoa.','Armar bowl con todos los ingredientes.','Agregar tahini.'], tags: ['superfood','proteico-vegetal'] },
  { nombre: 'Curry de Lentejas y Coco', categoria: 'Vegano', tiempo: '30 min', porciones: 3, calorias: 360, proteinas: 14, carbs: 40, grasas: 16, ingredientes: ['1.5 tazas lentejas rojas','1 lata leche de coco','2 cdas curry','Espinaca','Cebolla, ajo'], preparacion: ['Cocinar lentejas.','Saltear cebolla y ajo.','Agregar curry y coco.','Mezclar con lentejas y espinaca.'], tags: ['indio','saciante'] },
  { nombre: 'Tacos de Coliflor con Chipotle', categoria: 'Vegano', tiempo: '25 min', porciones: 2, calorias: 280, proteinas: 8, carbs: 32, grasas: 14, ingredientes: ['1/2 coliflor','3 tortillas de maiz','Chipotle en adobo','Aguacate','Lima'], preparacion: ['Rallar y cocinar coliflor con chipotle.','Servir en tortillas con aguacate.'], tags: ['mexicano','picante'] },
  { nombre: 'Pasta de Garbanzos con Espinaca', categoria: 'Vegano', tiempo: '15 min', porciones: 2, calorias: 380, proteinas: 16, carbs: 48, grasas: 14, ingredientes: ['200g pasta integral','1 lata garbanzos','2 tazas espinaca','Ajo, aceite de oliva'], preparacion: ['Cocinar pasta.','Saltear ajo y garbanzos.','Agregar espinaca y pasta.'], tags: ['mediterraneo','hierro'] },
  { nombre: 'Hamburguesa de Lentejas', categoria: 'Vegano', tiempo: '30 min', porciones: 4, calorias: 320, proteinas: 14, carbs: 38, grasas: 14, ingredientes: ['2 tazas lentejas cocidas','1/2 taza avena','1/4 taza cebolla','Especias','Pan integral'], preparacion: ['Moler lentejas con avena y cebolla.','Formar hamburguesas.','Cocinar 4 min por lado.'], tags: ['saciante','proteico-vegetal'] },
  { nombre: 'Chili Sin Carne', categoria: 'Vegano', tiempo: '35 min', porciones: 4, calorias: 340, proteinas: 16, carbs: 42, grasas: 12, ingredientes: ['2 latas frijoles negros','1 lata tomate','1 taza quinoa','Chile en polvo','Comino'], preparacion: ['Cocinar quinoa.','Mezclar todo en olla.','Cocinar 20 min.'], tags: ['saciante','proteico-vegetal'] },
  { nombre: 'Sushi de Verduras', categoria: 'Vegano', tiempo: '25 min', porciones: 2, calorias: 280, proteinas: 6, carbs: 48, grasas: 6, ingredientes: ['1 taza arroz sushi','Nori','Pepino, zanahoria, aguacate','Vinagre de arroz'], preparacion: ['Cocinar arroz con vinagre.','Armar rollos con verduras.','Cortar en piezas.'], tags: ['japones','fresco'] },
  { nombre: 'Sopa de Miso con Tofu', categoria: 'Vegano', tiempo: '15 min', porciones: 2, calorias: 160, proteinas: 12, carbs: 12, grasas: 8, ingredientes: ['4 tazas caldo dashi vegetal','150g tofu firme','2 cdas pasta de miso','Alga wakame','Cebollin'], preparacion: ['Calentar caldo.','Disolver miso.','Agregar tofu y alga.'], tags: ['japones','probiótico'] },
  { nombre: 'Wrap de Falafel', categoria: 'Vegano', tiempo: '20 min', porciones: 2, calorias: 380, proteinas: 14, carbs: 42, grasas: 18, ingredientes: ['6 falafels','2 tortillas integrales','Hummus','Lechuga, tomate','Tahini'], preparacion: ['Calentar falafels.','Untar hummus en tortilla.','Agregar falafel y vegetales.','Rociar tahini.'], tags: ['mediterraneo','saciante'] },
  { nombre: 'Pad Thai de Tofu', categoria: 'Vegano', tiempo: '20 min', porciones: 2, calorias: 420, proteinas: 18, carbs: 48, grasas: 18, ingredientes: ['200g tofu firme','200g fideos de arroz','2 huevos (opcional)','Cacahuates','Tamarindo'], preparacion: ['Cocinar tofu dorado.','Saltear fideos con salsa.','Agregar tofu y cacahuates.'], tags: ['tailandes','picante'] },
  { nombre: 'Estofado de Garbanzos al Curry', categoria: 'Vegano', tiempo: '25 min', porciones: 3, calorias: 340, proteinas: 14, carbs: 40, grasas: 14, ingredientes: ['2 latas garbanzos','1 lata leche de coco','2 cdas curry','Papa, zanahoria','Espinaca'], preparacion: ['Cocinar verduras 10 min.','Agregar garbanzos, coco y curry.','Cocinar 15 min.'], tags: ['indio','saciante'] },
  { nombre: 'Tarta de Espinaca y Champinones', categoria: 'Vegano', tiempo: '45 min', porciones: 4, calorias: 280, proteinas: 10, carbs: 22, grasas: 18, ingredientes: ['Masa de hojaldre vegetal','2 tazas espinaca','1 taza champinones','Tofu silken','Especias nutricional'], preparacion: ['Saltear verduras.','Licuar tofu con especias.','Rellenar masa.','Hornear 180°C 30 min.'], tags: ['frances','elegante'] },
  { nombre: 'Poke Bowl Vegano', categoria: 'Vegano', tiempo: '15 min', porciones: 1, calorias: 380, proteinas: 12, carbs: 48, grasas: 16, ingredientes: ['1 taza arroz sushi','150g tofu marinado','1/2 aguacate','Edamames','Sesamo'], preparacion: ['Cocinar arroz.','Marinar tofu en soya y jengibre.','Armar bowl con toppings.'], tags: ['hawaiano','proteico-vegetal'] },
  { nombre: 'Arepas con Aguacate y Frijoles', categoria: 'Vegano', tiempo: '20 min', porciones: 2, calorias: 380, proteinas: 10, carbs: 48, grasas: 18, ingredientes: ['1 taza harina de maiz precocida','Agua, sal','1/2 aguacate','1/2 tapa frijoles negros'], preparacion: ['Formar arepas con harina y agua.','Cocinar en sarten 7 min por lado.','Servir con aguacate y frijoles.'], tags: ['venezolano','saciante'] },
  { nombre: 'Guiso de Verduras con Quinoa', categoria: 'Vegano', tiempo: '30 min', porciones: 3, calorias: 300, proteinas: 10, carbs: 38, grasas: 12, ingredientes: ['1 taza quinoa','Zanahoria, papa, chayote','Caldo de verduras','Tomate, ajo'], preparacion: ['Cocinar verduras en caldo 20 min.','Agregar quinoa, cocinar 15 min.'], tags: ['saciante','economico'] },

  // ═════ KETO/LOW-CARB (15) ═════
  { nombre: 'Filete Mignon con Esparragos', categoria: 'Keto', tiempo: '20 min', porciones: 2, calorias: 520, proteinas: 48, carbs: 6, grasas: 34, ingredientes: ['2 filetes mignon (250g)','1 taza esparragos','Mantequilla','Ajo, tomillo'], preparacion: ['Sellar filetes 4 min por lado.','Saltear esparragos en mantequilla.','Servir.'], tags: ['elegante','bajo-carb','alta-proteina'] },
  { nombre: 'Pollo Alfredo con Espagueti de Calabacin', categoria: 'Keto', tiempo: '20 min', porciones: 2, calorias: 480, proteinas: 38, carbs: 10, grasas: 32, ingredientes: ['250g pechuga','2 calabacines (espiralizados)','1/2 taza crema espesa','Parmesano','Ajo'], preparacion: ['Cocinar pollo.','Hacer salsa con crema y parmesano.','Saltear calabacin 3 min.','Mezclar todo.'], tags: ['italiano','bajo-carb','cremoso'] },
  { nombre: 'Tacos de Lechuga con Carne', categoria: 'Keto', tiempo: '15 min', porciones: 2, calorias: 420, proteinas: 32, carbs: 8, grasas: 28, ingredientes: ['250g carne molida','8 hojas de lechuga','Tomate, cebolla','Aguacate','Salsa'], preparacion: ['Cocinar carne.','Servir en hojas de lechuga con toppings.'], tags: ['mexicano','bajo-carb','rapido'] },
  { nombre: 'Salmon con Mantequilla de Hierbas', categoria: 'Keto', tiempo: '15 min', porciones: 2, calorias: 560, proteinas: 40, carbs: 2, grasas: 42, ingredientes: ['2 filetes de salmon (250g)','3 cdas mantequilla','Eneldo, perejil','Limon'], preparacion: ['Hornear salmon 12 min.','Derretir mantequilla con hierbas.','Servir con mantequilla.'], tags: ['omega-3','elegante','rapido'] },
  { nombre: 'Frittata de Espinaca y Queso', categoria: 'Keto', tiempo: '20 min', porciones: 4, calorias: 280, proteinas: 22, carbs: 4, grasas: 20, ingredientes: ['6 huevos','2 tazas espinaca','1/2 taza queso cheddar','1/4 taza crema','Sal, pimienta'], preparacion: ['Batir huevos con crema.','Mezclar con espinaca y queso.','Hornear 180°C 18 min.'], tags: ['rapido','meal-prep'] },
  { nombre: 'Pollo Relleno de Queso y Jamon', categoria: 'Keto', tiempo: '30 min', porciones: 2, calorias: 480, proteinas: 52, carbs: 4, grasas: 28, ingredientes: ['2 pechugas grandes','4 reb. jamon','2 reb. queso','Espinaca','Mostaza'], preparacion: ['Abrid pechugas.','Rellenar con jamon, queso y espinaca.','Cerrar, sellar.','Hornear 180°C 20 min.'], tags: ['cordon-bleu','elegante'] },
  { nombre: 'Sopa de Calabaza con Coco', categoria: 'Keto', tiempo: '25 min', porciones: 3, calorias: 280, proteinas: 6, carbs: 14, grasas: 22, ingredientes: ['3 tazas calabaza','1 taza leche de coco','Jengibre','Curcuma','Caldo'], preparacion: ['Cocinar calabaza en caldo.','Licuar con leche de coco.','Agregar jengibre y curcuma.'], tags: ['cremosa','antinflamatoria'] },
  { nombre: 'Chuletas de Cerdo con Col Morada', categoria: 'Keto', tiempo: '25 min', porciones: 2, calorias: 520, proteinas: 42, carbs: 10, grasas: 34, ingredientes: ['2 chuletas (300g)','2 tazas col morada','Mantequilla','Vinagre de manzana'], preparacion: ['Sellar chuletas.','Saltear col en mantequilla con vinagre.','Servir junto.'], tags: ['aleman','saciante'] },
  { nombre: 'Huevos Benedictinos Low-Carb', categoria: 'Keto', tiempo: '20 min', porciones: 2, calorias: 420, proteinas: 28, carbs: 4, grasas: 32, ingredientes: ['4 huevos','100g jamon','Hollandaise (yema+mantequilla)','1 cdta vinagre'], preparacion: ['Pochar huevos.','Hacer salsa hollandaise.','Servir jamon con huevo y salsa.'], tags: ['desayuno','elegante'] },
  { nombre: 'Bowl de Carne con Aguacate', categoria: 'Keto', tiempo: '15 min', porciones: 1, calorias: 620, proteinas: 42, carbs: 8, grasas: 44, ingredientes: ['200g arrachera','1 aguacate','1 huevo frito','Salsa verde'], preparacion: ['Cocinar arrachera.','Freir huevo.','Servir todo en bowl con aguacate.'], tags: ['mexicano','bajo-carb','saciante'] },
  { nombre: 'Pizza de Base de Pollo', categoria: 'Keto', tiempo: '30 min', porciones: 2, calorias: 420, proteinas: 48, carbs: 6, grasas: 22, ingredientes: ['300g pechuga molido','1 huevo','Queso mozzarella','Salsa de tomate','Pepperoni'], preparacion: ['Mezclar pollo con huevo.','Formar base, hornear 15 min.','Agregar salsa y queso, hornear 10 min.'], tags: ['creativo','pizza'] },
  { nombre: 'Atun en Costra de Sesamo', categoria: 'Keto', tiempo: '10 min', porciones: 1, calorias: 380, proteinas: 36, carbs: 4, grasas: 24, ingredientes: ['200g atun fresco','2 cdas semillas de sesamo','Aceite de sesamo','Soya'], preparacion: ['Cubrir atun con sesamo.','Sellar 1 min por lado.','Servir con soya.'], tags: ['japones','rapido','elegante'] },
  { nombre: 'Camarones al Ajillo con Espinaca', categoria: 'Keto', tiempo: '15 min', porciones: 2, calorias: 340, proteinas: 30, carbs: 6, grasas: 22, ingredientes: ['300g camaron','4 dientes ajo','Mantequilla','2 tazas espinaca','Limon'], preparacion: ['Derretir mantequilla con ajo.','Cocinar camaron 3 min.','Agregar espinaca, cocinar 2 min.'], tags: ['espanol','rapido'] },
  { nombre: 'Waffle de Queso y Claras', categoria: 'Keto', tiempo: '10 min', porciones: 1, calorias: 320, proteinas: 28, carbs: 4, grasas: 22, ingredientes: ['4 claras + 1 huevo','1/2 taza queso mozzarella','1 cdta polvo hornear'], preparacion: ['Batir huevos con queso.','Verter en wafflera.','Cocinar 5 min.'], tags: ['chaffle','desayuno','creativo'] },
  { nombre: 'Solomillo con Salsa de Mostaza', categoria: 'Keto', tiempo: '25 min', porciones: 2, calorias: 540, proteinas: 48, carbs: 4, grasas: 36, ingredientes: ['2 medallones solomillo (300g)','3 cdas crema','2 cdas mostaza dijon','Mantequilla'], preparacion: ['Sellar solomillo.','Hacer salsa con crema y mostaza.','Servir.'], tags: ['frances','elegante'] },
];

// ════════════════════════════════════════════════════════════
// CATEGORIAS & TAG COLORS
// ════════════════════════════════════════════════════════════

const CATEGORIAS = ['Todos', 'Desayuno', 'Almuerzo', 'Cena', 'Snack', 'Pre-entreno', 'Post-entreno', 'Smoothie', 'Vegano', 'Keto'];

const TAG_COLORS: Record<string, string> = {
  'mexicano': 'bg-red-500/20 text-red-300 border-red-500/30',
  'rapido': 'bg-green-500/20 text-green-300 border-green-500/30',
  'alta-proteina': 'bg-[#D4FF00]/10 text-[#D4FF00] border-[#D4FF00]/20',
  'post-entreno': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'vegano': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'keto': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'bajo-carb': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'desayuno': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  'asiatico': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'mediterraneo': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'omega-3': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  'meal-prep': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  'facil': 'bg-green-500/20 text-green-300 border-green-500/30',
  'smoothie': 'bg-blue-400/20 text-blue-300 border-blue-400/30',
  'tradicional': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'saciante': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  'snack': 'bg-lime-500/20 text-lime-300 border-lime-500/30',
  'creativo': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  'elegante': 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
  'default': 'bg-[#1e1f2e] text-[#8a8d9e] border-[#55576b]',
};

const CAT_ICON: Record<string, any> = {
  'Desayuno': '🌅', 'Almuerzo': '🍽️', 'Cena': '🌙', 'Snack': '🥨',
  'Pre-entreno': '⚡', 'Post-entreno': '💪', 'Smoothie': '🥤',
  'Vegano': '🌿', 'Keto': '🥑',
};

// ════════════════════════════════════════════════════════════
// COMPONENT
// ════════════════════════════════════════════════════════════

const RECETAS_POR_PAGINA = 12;

export function Recetario() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [recetaAbierta, setRecetaAbierta] = useState<number | null>(null);
  const [pagina, setPagina] = useState(0);

  // Filter & paginate
  const filtradas = useMemo(() => {
    const f = RECETAS.filter(r => {
      if (categoriaActiva !== 'Todos' && r.categoria !== categoriaActiva) return false;
      if (!busqueda) return true;
      const q = busqueda.toLowerCase();
      return r.nombre.toLowerCase().includes(q)
        || r.ingredientes.some(i => i.toLowerCase().includes(q))
        || r.tags.some(t => t.toLowerCase().includes(q));
    });
    return f;
  }, [busqueda, categoriaActiva]);

  const totalPaginas = Math.ceil(filtradas.length / RECETAS_POR_PAGINA);
  const recetasPagina = filtradas.slice(pagina * RECETAS_POR_PAGINA, (pagina + 1) * RECETAS_POR_PAGINA);

  // Reset page when filter changes
  const cambiarCategoria = (cat: string) => {
    setCategoriaActiva(cat);
    setPagina(0);
    setRecetaAbierta(null);
  };

  const buscar = (q: string) => {
    setBusqueda(q);
    setPagina(0);
    setRecetaAbierta(null);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-[#22c55e] p-2.5 rounded-lg"><ChefHat className="w-6 h-6 text-white" /></div>
        <div>
          <h2 className="text-xl font-bold text-[#f0f0f5]">Recetario ANTHROSCOPE</h2>
          <p className="text-xs text-[#55576b]">{RECETAS.length} recetas deportivas · Nutricion funcional</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#55576b]" />
        <Input
          placeholder="Buscar receta, ingrediente o tag..."
          value={busqueda}
          onChange={e => buscar(e.target.value)}
          className="pl-10 bg-[#11121a] border-[#1e1f2e] text-[#f0f0f5] placeholder:text-[#55576b]"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIAS.map(cat => (
          <button
            key={cat}
            onClick={() => cambiarCategoria(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              categoriaActiva === cat
                ? 'bg-[#22c55e]/10 border-[#22c55e] text-[#22c55e]'
                : 'bg-[#11121a] border-[#1e1f2e] text-[#8a8d9e] hover:border-[#55576b]'
            }`}
          >
            {CAT_ICON[cat] && <span className="mr-1">{CAT_ICON[cat]}</span>}
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-[#55576b]">
        Mostrando {recetasPagina.length} de {filtradas.length} recetas
        {categoriaActiva !== 'Todos' ? ` en "${categoriaActiva}"` : ''}
        {busqueda ? ` para "${busqueda}"` : ''}
      </p>

      {/* Recipe grid */}
      {filtradas.length === 0 ? (
        <div className="text-center py-12 text-[#55576b]">
          <Search className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p>No se encontraron recetas</p>
          <p className="text-xs mt-1">Intenta con otro termino o categoria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {recetasPagina.map((receta, i) => {
            const globalIndex = pagina * RECETAS_POR_PAGINA + i;
            const abierta = recetaAbierta === globalIndex;
            return (
              <Card
                key={globalIndex}
                className={`bg-[#11121a] border-[#1e1f2e] cursor-pointer transition-all hover:border-[#22c55e]/30 ${abierta ? 'ring-1 ring-[#22c55e]/30' : ''}`}
                onClick={() => setRecetaAbierta(abierta ? null : globalIndex)}
              >
                <CardContent className="p-3.5">
                  {/* Compact view */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#f0f0f5] text-sm truncate">{receta.nombre}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-[#8a8d9e]">
                        <span className="flex items-center gap-0.5"><Timer className="w-3 h-3" />{receta.tiempo}</span>
                        <span className="flex items-center gap-0.5"><Flame className="w-3 h-3 text-orange-400" />{receta.calorias} kcal</span>
                        <span className="flex items-center gap-0.5"><Beef className="w-3 h-3 text-[#D4FF00]" />{receta.proteinas}g P</span>
                      </div>
                    </div>
                    <div className="shrink-0 text-lg">{CAT_ICON[receta.categoria] || '🍽️'}</div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {receta.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className={`text-[9px] px-1 py-0 ${TAG_COLORS[tag] || TAG_COLORS.default}`}>
                        {tag}
                      </Badge>
                    ))}
                    {receta.tags.length > 3 && (
                      <Badge variant="outline" className="text-[9px] px-1 py-0 bg-[#1e1f2e] text-[#55576b] border-[#1e1f2e]">
                        +{receta.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Expanded view */}
                  {abierta && (
                    <div className="mt-3 pt-3 border-t border-[#1e1f2e] space-y-3" onClick={e => e.stopPropagation()}>
                      {/* Macros */}
                      <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                        <div className="p-1.5 bg-[#0a0b0f] rounded"><p className="text-[#55576b]">Cal</p><p className="font-mono text-orange-400">{receta.calorias}</p></div>
                        <div className="p-1.5 bg-[#0a0b0f] rounded"><p className="text-[#55576b]">Proteina</p><p className="font-mono text-[#D4FF00]">{receta.proteinas}g</p></div>
                        <div className="p-1.5 bg-[#0a0b0f] rounded"><p className="text-[#55576b]">Carbs</p><p className="font-mono text-blue-400">{receta.carbs}g</p></div>
                        <div className="p-1.5 bg-[#0a0b0f] rounded"><p className="text-[#55576b]">Grasas</p><p className="font-mono text-purple-400">{receta.grasas}g</p></div>
                      </div>

                      {/* Ingredients */}
                      <div>
                        <p className="text-xs font-medium text-[#f0f0f5] mb-1.5 flex items-center gap-1"><Salad className="w-3 h-3 text-emerald-400" /> Ingredientes ({receta.ingredientes.length})</p>
                        <ul className="space-y-0.5">
                          {receta.ingredientes.map((ing, j) => (
                            <li key={j} className="text-xs text-[#8a8d9e] flex items-start gap-1.5">
                              <span className="text-[#22c55e] mt-0.5 shrink-0">•</span>{ing}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Preparation */}
                      <div>
                        <p className="text-xs font-medium text-[#f0f0f5] mb-1.5 flex items-center gap-1"><Utensils className="w-3 h-3 text-[#D4FF00]" /> Preparacion</p>
                        <ol className="space-y-1">
                          {receta.preparacion.map((paso, j) => (
                            <li key={j} className="text-xs text-[#8a8d9e] flex items-start gap-2">
                              <span className="text-[10px] bg-[#1e1f2e] text-[#D4FF00] rounded-full w-4 h-4 flex items-center justify-center shrink-0">{j + 1}</span>
                              {paso}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* All tags */}
                      <div className="flex flex-wrap gap-1">
                        {receta.tags.map(tag => (
                          <Badge key={tag} variant="outline" className={`text-[9px] px-1.5 py-0 ${TAG_COLORS[tag] || TAG_COLORS.default}`}>{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPaginas > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[#1e1f2e] text-[#8a8d9e] hover:border-[#22c55e] hover:text-[#22c55e]"
            onClick={() => setPagina(p => Math.max(0, p - 1))}
            disabled={pagina === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-xs text-[#8a8d9e]">
            Pagina {pagina + 1} de {totalPaginas}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="border-[#1e1f2e] text-[#8a8d9e] hover:border-[#22c55e] hover:text-[#22c55e]"
            onClick={() => setPagina(p => Math.min(totalPaginas - 1, p + 1))}
            disabled={pagina >= totalPaginas - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
