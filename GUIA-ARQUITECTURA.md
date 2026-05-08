# ANTHROSCOPE PRO - Guia Completa de Arquitectura y Deployment

## 1. COMO SE CONECTA TODO (La foto grande)

Tu sistema tiene 4 capas que trabajan juntas. Piensa en ello como un restaurante:

```
USUARIO (Cliente)
    ↓ (pide por HTTPS)
FRONTEND (Mesero - lo que ves)
    ↓ (lleva la orden a la cocina)
BACKEND/API (Cocina - procesa todo)
    ↓ (saca ingredientes de la despensa)
BASE DE DATOS MySQL (Despensa - guarda todo)
    ↓
HOSTING (El edificio donde esta el restaurante)
```

### 1.1 Frontend (React + TypeScript + Tailwind)
**Que es**: La pagina web que el usuario ve y toca. Los botones, formularios, graficos, avatar 3D.
**Donde vive**: En archivos estaticos (HTML/CSS/JS) compilados por Vite en la carpeta `dist/`.
**Como llega al usuario**: El backend (Hono) sirve estos archivos cuando alguien visita tu URL.

### 1.2 Backend/API (Hono + tRPC + Drizzle)
**Que es**: El cerebro. Recibe los datos del frontend, valida, calcula, guarda en base de datos, y responde.
**Rutas API que ya tienes**:
- `auth` → login/logout (OAuth)
- `subscription` → ver planes, crear suscripcion, verificar pago
- `equipos` → crear/editar equipos
- `atletas` → agregar/editar atletas
- `evaluaciones` → guardar mediciones ISAK

**Ejemplo real**:
1. Usuario escribe masa corporal = 75kg en el formulario
2. Frontend envia: `{ masa: 75, estatura: 180, triceps: 12, ... }`
3. Backend recibe → valida con Zod → guarda en MySQL → responde: `{ ok: true, imc: 23.1, grasa: 15.2 }`
4. Frontend muestra el resultado al usuario

### 1.3 Base de Datos MySQL
**Que guarda**:
- Tabla `users` → quien inicio sesion (email, nombre, foto)
- Tabla `planes` → precios ($39.99 Individual, $99.99 Team, $299.99 Institucional)
- Tabla `suscripciones` → quien pago, cuando vence
- Tabla `equipos` → Club Deportivo XYZ, Federacion ABC
- Tabla `atletas` → Juan Perez, 25 anos, delantero
- Tabla `evaluaciones` → todas las mediciones antropometricas

**Como se consulta**: Drizzle ORM traduce tu codigo TypeScript a SQL automaticamente. Tu nunca escribes SQL manual.

---

## 2. COMO FUNCIONA EL LOGIN (OAuth 2.0)

No necesitas crear sistema de passwords. Ya esta integrado con OAuth.

### Flujo paso a paso:

```
1. Usuario hace click en "Iniciar Sesion"
   ↓
2. Frontend redirige a Kimi OAuth (ventana de login de Kimi)
   ↓
3. Usuario ingresa su email/contrasena en Kimi (o Google, etc.)
   ↓
4. Kimi valida y redirige de vuelta a tu pagina con un "codigo"
   ↓
5. Tu backend recibe el codigo → lo cambia por un "token JWT"
   ↓
6. Backend busca usuario en DB:
      - Si existe → actualiza ultimo login
      - Si no existe → crea usuario nuevo
   ↓
7. Backend guarda token JWT en cookie del navegador
   ↓
8. Usuario esta logueado por 14 dias (la cookie expira despues)
```

### Que significa esto para ti:
- **No manejas passwords**. Kimi/Google los manejan. Si hay hackeo, no es tu responsabilidad.
- El usuario ve tu pagina → hace login → vuelve a tu pagina ya autenticado.
- Tu DB solo guarda: `name`, `email`, `avatar`, `role` (user/admin).

---

## 3. COMO ENTRAN LOS CLIENTES (El flujo de negocio)

### Escenario A: Evaluador Individual
```
1. Evaluador visita anthroscope.pro
2. Ve el Demo Nivel 4 → calcula una evaluacion gratis
3. Click en "Suscribirse $39.99/mes"
4. Stripe lo redirige a pagar con tarjeta
5. Stripe confirma pago → Webhook avisa tu backend
6. Backend crea suscripcion activa en DB
7. Usuario ahora puede guardar evaluaciones, exportar PDF, etc.
8. Cada mes Stripe cobra automaticamente
```

### Escenario B: Club Deportivo (5 evaluadores)
```
1. Club contacta a ventas (o compra Team plan directo)
2. Tu creas una "Organizacion" en DB: "Club Universidad Catolica"
3. Les das admin dashboard → invitan a sus 5 evaluadores
4. Cada evaluador hace login con su email
5. Todos comparten la misma base de datos de atletas
6. El admin del club puede ver todas las evaluaciones
```

### Escenario C: Federacion (50+ evaluadores)
```
1. Federacion compra Plan Institucional ($299.99/mes o $2,999/ano)
2. Tu les configuras white-label (su logo, sus colores)
3. API access para integrar con sus sistemas de scouting
4. Evaluadores ilimitados
5. Base de datos centralizada de toda la federacion
```

---

## 4. COMO FUNCIONA RAILWAY.APP / RENDER.COM

### Concepto basico:
Tu codigo vive en **tu laptop** ahora. Necesitas ponerlo en un **servidor en internet** para que otros lo usen.

Railway y Render son servicios que te dan ese servidor.

### Railway.app (Recomendado)

**Que es**: Servicio que corre tu codigo en la nube.
**Precio**: $5-20/mes para empezar.
**Que incluye**:
- Servidor Node.js (corre tu backend)
- Base de datos MySQL incluida
- SSL automatico (HTTPS)
- Dominio temporal gratis (`tu-app.railway.app`)
- Puedes conectar tu dominio propio (`anthroscope.pro`)

**Como funciona**:
1. Creas cuenta en railway.app
2. Conectas tu repositorio de GitHub (o subes el codigo)
3. Railway detecta que es Node.js → configura automaticamente
4. Pones las variables de entorno (DATABASE_URL, Stripe keys, etc.)
5. Railway compila (`npm run build`) y corre (`npm start`)
6. Listo. Tu app esta en internet.

**Deploy automatico**: Cada vez que subes cambios a GitHub, Railway los detecta y redeploya solo.

### Render.com (Alternativa gratis)

**Que es**: Similar a Railway, tiene tier gratis.
**Ventaja**: Gratis para empezar. No necesitas tarjeta de credito.
**Desventaja**: El servidor "duerme" despues de 15 min sin uso (tarda 30s en despertar).

### Estructura en Railway/Render:
```
Servidor en la nube (Railway)
├── Proceso 1: Backend Node.js (corre api/boot.ts)
│   ├── Escucha en puerto 3000
│   ├── Sirve archivos frontend (dist/public/)
│   └── Maneja rutas API (/api/trpc/*)
│
├── Proceso 2: MySQL (base de datos)
│   └── Guarda tablas: users, planes, suscripciones, equipos, atletas, evaluaciones
│
└── SSL + Dominio
    └── https://anthroscope.pro (tu dominio)
```

---

## 5. COMO FUNCIONA EN CELULAR SIN INTERNET (PWA)

### Que es una PWA (Progressive Web App)?
Es una pagina web que se comporta como una app nativa del telefono.

### Como se instala:
1. Usuario abre `anthroscope.pro` en Chrome/Safari del celular
2. Chrome muestra mensaje: "Agregar a Pantalla Principal"
3. Usuario acepta → aparece un icono en el celular (como cualquier app)
4. La abre → se ve como app, no como pagina web

### Como funciona sin internet:
```
1. PRIMERA VEZ (con WiFi):
   - Carga toda la pagina
   - "Service Worker" (un script) guarda archivos en cache del navegador
   - Guarda: HTML, CSS, JS, formulas de calculo

2. DESPUES (sin internet):
   - Usuario abre la "app"
   - Service Worker sirve los archivos desde cache local
   - Las formulas de calculo funcionan 100% (estan en JS local)
   - Las evaluaciones se guardan en IndexedDB (base de datos del navegador)

3. CUANDO VUELVE EL INTERNET:
   - Service Worker sincroniza evaluaciones guardadas → servidor
   - Descarga actualizaciones si hay nuevas versiones
```

### Que SI funciona offline:
- Ingresar mediciones y calcular evaluacion
- Ver resultados (IMC, grasa, somatotipo, 5 componentes)
- Ver historial de evaluaciones guardadas localmente
- Ver somatocarta

### Que NO funciona offline:
- Avatar 3D (necesita WebGL + Three.js completo)
- Guardar en la nube (espera a que haya internet)
- Login (necesita conectar con servidor)
- Exportar PDF (html2canvas funciona offline, pero jsPDF puede tardar)

### Como implementar PWA:
Ya tienes la base. Solo necesitas:
1. Crear `manifest.json` (metadata: nombre, icono, colores)
2. Registrar `service-worker.js` (cache + sync offline)
3. Iconos en multiples tamanios (192x192, 512x512)

---

## 6. COMO SE CONECTAN FRONTEND + BACKEND + MYSQL (Flujo completo)

### Ejemplo: Usuario calcula evaluacion ISAK

```
[USUARIO en laptop]
        |
        | 1. Escribe datos en formulario
        v
[FRONTEND - React]
    - Formulario valida numeros
    - Muestra preview en tiempo real
    - Boton "Calcular Evaluacion"
        |
        | 2. Click en "Calcular"
        |    Frontend envia JSON:
        |    { masa: 75, estatura: 180, triceps: 12, ... }
        |    via tRPC (tipo-safe API call)
        v
[BACKEND - Hono + tRPC]
    - Recibe datos
    - Zod valida que los numeros sean positivos
    - Ejecuta formulas (calculations.ts)
    - Calcula: IMC, grasa Siri, 5 componentes, somatotipo, IMO
    - Guarda en MySQL via Drizzle ORM
    - Responde con resultados
        |
        | 3. Respuesta JSON:
        |    { imc: 23.1, grasaSiri: 15.2, 
        |      componentes: {...}, somatotipo: {...} }
        v
[FRONTEND - React]
    - Recibe resultados
    - Actualiza estado (useState)
    - Re-renderiza componentes:
      - Tarjetas KPI se actualizan
      - Avatar 3D recibe nuevos props
      - Somatocarta se redibuja
      - Cuadrantes Holway cambian color
    - Muestra todo al usuario
        |
        | 4. Usuario ve resultados en pantalla
        v
[USUARIO]
```

**Todo esto pasa en menos de 500 milisegundos.**

---

## 7. CHECKLIST PARA LANZAR (Resumen)

### Semana 1: Infraestructura
- [ ] Comprar dominio: `anthroscope.pro` (~$12)
- [ ] Crear cuenta en Railway.app
- [ ] Crear cuenta en Stripe (para cobrar)
- [ ] Configurar GitHub y subir codigo
- [ ] Conectar Railway a tu repo GitHub
- [ ] Configurar variables de entorno en Railway

### Semana 2: Pagos
- [ ] Crear productos en Stripe (Individual $39.99, Team $99.99, Institucional)
- [ ] Configurar webhook Stripe → tu backend
- [ ] Probar flujo: pagar con tarjeta de prueba → verificar suscripcion activa

### Semana 3: Primeros clientes
- [ ] Compartir con companeros del curso ISAK Nivel 1 (Julio)
- [ ] Crear post Instagram/LinkedIn mostrando el software
- [ ] Demo gratis para 10 evaluadores (feedback)

### Mes 2-3: Escalar
- [ ] PWA para celular offline
- [ ] Contactar Francis Holway para validacion academica
- [ ] Webinars mensuales de antropometria (marketing de contenido)
- [ ] Partnership con 1 universidad

---

## 8. DIAGRAMA DE ARCHIVOS (Como esta organizado tu codigo)

```
/mnt/agents/output/app/
├── src/                          <-- FRONTEND
│   ├── App.tsx                   <-- Componente principal (tabs, layout)
│   ├── main.tsx                  <-- Punto de entrada (React + Router)
│   ├── sections/
│   │   ├── SujetoForm.tsx        <-- Formulario del sujeto
│   │   ├── MedicionesForm.tsx    <-- Formulario ISAK (pliegues, perimetros, etc)
│   │   ├── ResultadosDashboard.tsx <-- Muestra resultados
│   │   ├── ETMPanel.tsx          <-- Error Tecnico de Medicion
│   │   ├── PotencialGenetico.tsx <-- IMO maximo, tablas por deporte
│   │   ├── CuadrantesHolway.tsx  <-- Matriz 6 cuadrantes
│   │   ├── GruposPanel.tsx       <-- Evaluacion de equipos
│   │   ├── SaasPanel.tsx         <-- Precios y suscripcion
│   │   └── ReporteView.tsx       <-- PDF export
│   ├── components/
│   │   ├── Somatocarta.tsx       <-- Grafico X-Y somatotipo
│   │   ├── SomatocartaGrupal.tsx <-- Multiples puntos
│   │   └── three/
│   │       ├── Avatar3D.tsx      <-- Modelo 3D parametrico
│   │       ├── Avatar3DLazy.tsx  <-- Lazy loading del 3D
│   │       └── ErrorBoundary.tsx <-- Si el 3D falla, no rompe todo
│   ├── lib/
│   │   └── calculations.ts       <-- TODAS las formulas ISAK
│   ├── i18n/
│   │   └── index.ts              <-- Traducciones ES/EN/FR/PT
│   └── hooks/
│       └── useAuth.ts            <-- Hook de autenticacion
│
├── api/                          <-- BACKEND
│   ├── boot.ts                   <-- Inicia servidor Hono
│   ├── router.ts                 <-- Registra rutas API
│   ├── middleware.ts             <-- Auth, permisos, validacion
│   ├── auth-router.ts            <-- Login/logout OAuth
│   ├── subscription-router.ts    <-- Planes, pagos, suscripciones
│   └── queries/
│       └── connection.ts         <-- Conexion a MySQL
│
├── db/                           <-- BASE DE DATOS
│   ├── schema.ts                 <-- Definicion de todas las tablas
│   └── seed.ts                   <-- Datos iniciales (planes de precios)
│
├── contracts/                    <-- TIPOS COMPARTIDOS
│   └── constants.ts              <-- Tipos usados por frontend y backend
│
├── dist/                         <-- ARCHIVOS COMPILADOS (produccion)
│   ├── public/                   <-- Frontend compilado
│   └── boot.js                   <-- Backend compilado
│
└── package.json                  <-- Dependencias y scripts
```

### Comandos importantes:
```bash
npm run dev       # Desarrollo local (frontend + backend)
npm run build     # Compila para produccion
npm run check     # Verifica tipos TypeScript
npm run db:push   # Sincroniza DB con schema
npx tsx db/seed.ts # Inserta planes de precios
```

---

## 9. RESUMEN PARA NO-TECNICOS

**Tu tienes una app profesional lista para vender.**

**Como la ven los clientes**: Pagina web que abren en su celular o laptop. Se loguean, miden atletas, y ven resultados profesionales.

**Como la administras tu**: Necesitas Railway.app ($20/mes) + Stripe (para cobrar) + dominio ($12/ano).

**Cuanto cuesta mantenerla**: ~$30-50/mes para 100 clientes. Si cobras $39.99/cliente, con 2 clientes ya pagas todo.

**Que sigue**: Crear cuenta Railway, conectar repo, configurar Stripe, comprar dominio. Todo se puede hacer en 1 semana.
