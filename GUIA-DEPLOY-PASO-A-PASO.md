# GUIA COMPLETA - De tu laptop al mundo: GitHub + Railway + Stripe

## ANTES DE EMPEZAR - Chequeo rapido

Abre una terminal y verifica que tienes git instalado:

```bash
git --version
```

Si dice algo como "git version 2.x.x" → PERFECTO, sigue.
Si dice "command not found" → instala git: https://git-scm.com/downloads

---

## ============================================================
## PARTE 1: SUBIR CODIGO A GITHUB (15 minutos)
## ============================================================

### Paso 1.1: Abre terminal y ve a tu proyecto

```bash
cd /mnt/agents/output/app
```

O si ya moviste los archivos a tu computadora:

```bash
cd ~/anthroscope-pro
```

### Paso 1.2: Inicializa git (solo la primera vez)

```bash
git init
```

Veras: "Initialized empty Git repository"

### Paso 1.3: Configura tu nombre y email (solo la primera vez)

```bash
git config user.email "tu-email@ejemplo.com"
git config user.name "Tu Nombre"
```

### Paso 1.4: Agrega todos los archivos

```bash
git add .
```

Esto prepara todos los archivos para subir.

### Paso 1.5: Crea el primer commit

```bash
git commit -m "ANTHROSCOPE PRO v1.0 - Kinanthropometry SaaS"
```

Veras algo como: "[main (root-commit) abc1234] ANTHROSCOPE PRO v1.0..."

### Paso 1.6: Conecta con tu repositorio de GitHub

TU YA CREASTE el repo "anthroscope-pro" en GitHub. Ahora conectalo:

```bash
git branch -M main
git remote add origin https://github.com/TU-USUARIO/anthroscope-pro.git
```

**IMPORTANTE**: Reemplaza `TU-USUARIO` con tu username de GitHub.

Ejemplo: Si tu usuario es "juanperez":

```bash
git remote add origin https://github.com/juanperez/anthroscope-pro.git
```

### Paso 1.7: Subelo a GitHub

```bash
git push -u origin main
```

Te va a pedir tu usuario y contrasena de GitHub.

Si tienes "two-factor authentication" activado en GitHub:
- NO uses tu contrasena normal
- Ve a GitHub → Settings → Developer settings → Personal access tokens
- Crea un token con permiso "repo"
- Usa ESE token como contrasena

Veras algo como:
```
Enumerating objects: 245, done.
Counting objects: 100% (245/245), done.
Delta compression using up to 8 threads
Compressing objects: 100% (180/180), done.
Writing objects: 100% (245/245), 1.2 MiB | 5.4 MiB/s, done.
Total 245 (delta 45), reused 0 (delta 0), pack-reused 0
To https://github.com/juanperez/anthroscope-pro.git
 * [new branch]      main -> main
branch 'main' -> 'origin/main'.
```

### PASO 1.8: Verifica en GitHub

Entra a: `https://github.com/TU-USUARIO/anthroscope-pro`

Deberias ver todos tus archivos ahi.

---

## ============================================================
## PARTE 2: RAILWAY.APP (20 minutos)
## ============================================================

### Paso 2.1: Crea cuenta en Railway

1. Ve a https://railway.app
2. Click en "Start for Free"
3. Crea cuenta con tu email (o "Continue with GitHub" - MAS FACIL)
4. Si te pide tarjeta de credito: NO te preocupes, tienes $5 gratis
   - Pones tu tarjeta (no te cobran nada si estas dentro del free tier)

### Paso 2.2: Crear nuevo proyecto

1. En el dashboard de Railway, click en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Railway te pedira conectar tu GitHub → Acepta
4. Selecciona el repositorio "anthroscope-pro"
5. Click en "Add"

### Paso 2.3: Agregar base de datos MySQL

1. En tu proyecto de Railway, click en "New"
2. Selecciona "Database" → "MySQL"
3. Listo. Railway crea la base de datos automaticamente.

**IMPORTANTE**: Railway crea automaticamente una variable `DATABASE_URL` con los datos de conexion. No necesitas hacer nada.

### Paso 2.4: Configurar variables de entorno

Ve a tu proyecto en Railway → Click en el servicio "anthroscope-pro" → Tab "Variables" → Click "New Variable"

Agrega estas variables UNA POR UNA:

**Copia las que ya tienes en tu archivo .env:**

| Variable | Valor (copia de tu .env) |
|----------|--------------------------|
| `APP_ID` | 19dfa3f6-e502-8c84-8000-0000dcba39c7 |
| `APP_SECRET` | TMtQ0xzm5Fc8ZdWInaeaID7jabFSQhrr |
| `VITE_APP_ID` | 19dfa3f6-e502-8c84-8000-0000dcba39c7 |
| `VITE_KIMI_AUTH_URL` | https://auth.kimi.com |
| `KIMI_AUTH_URL` | https://auth.kimi.com |
| `KIMI_OPEN_URL` | https://open.kimi.com |
| `OWNER_UNION_ID` | d7k07o0l3dc8u37qp8j0 |
| `DATABASE_URL` | Railway te la da automaticamente al crear MySQL |

### Paso 2.5: Configurar puerto

En las variables de Railway, agrega:

```
PORT=3000
```

Railway detecta automaticamente el puerto, pero esto asegura que funcione.

### Paso 2.6: Deploy automatico

Railway detecta automaticamente que es un proyecto Node.js. Pero verifica:

1. Ve a "Settings" en tu servicio
2. En "Build Command" pon:
   ```
   npm run build
   ```
3. En "Start Command" pon:
   ```
   npm start
   ```

### Paso 2.7: Verificar que deployo

1. Railway automaticamente hace deploy cuando subes cambios a GitHub
2. Ve al tab "Deployments" → deberias ver "Building..." → "Deploying..." → "Success"
3. Ve al tab "Settings" → scroll abajo → "Public Domain"
4. Click en la URL (ejemplo: `anthroscope-pro-production.up.railway.app`)

**LISTO!** Tu app ya esta en internet.

### Paso 2.8: Sincronizar base de datos

Una vez que el deploy es exitoso, necesitas crear las tablas:

1. En Railway, ve al tab de tu proyecto
2. Click en "anthroscope-pro" (el servicio Node.js)
3. Tab "Console" (o usa "Shell")
4. Ejecuta:

```bash
npm run db:push
```

Luego:

```bash
npx tsx db/seed.ts
```

Esto crea todas las tablas y pone los precios ($39.99, $99.99, $299.99).

---

## ============================================================
## PARTE 3: STRIPE (15 minutos) - Para cobrar dinero
## ============================================================

### Paso 3.1: Crear cuenta en Stripe

1. Ve a https://dashboard.stripe.com/register
2. Crea cuenta con tu email
3. Completa tu perfil (nombre, negocio, etc.)
4. Stripe te da acceso al modo "TEST" inmediatamente

### Paso 3.2: Crear productos y precios

En el dashboard de Stripe:

**Producto 1: Individual**
1. Ve a "Products" → "Add product"
2. Name: "ANTHROSCOPE PRO - Individual"
3. Description: "1 evaluador, evaluaciones ilimitadas, reportes Nivel 4"
4. Pricing model: "Standard pricing"
5. Price: $39.99
6. Billing period: "Monthly"
7. Click "Save product"

**Producto 2: Team**
1. "Add product"
2. Name: "ANTHROSCOPE PRO - Team"
3. Price: $99.99
4. Billing period: "Monthly"
5. Click "Save product"

**Producto 3: Institucional**
1. "Add product"
2. Name: "ANTHROSCOPE PRO - Institucional"
3. Price: $299.99
4. Billing period: "Monthly"
5. Click "Save product"

### Paso 3.3: Copiar las API Keys

1. En Stripe dashboard, ve a "Developers" → "API keys"
2. Copia "Publishable key" (empieza con `pk_test_...`)
3. Copia "Secret key" (empieza con `sk_test_...`)

### Paso 3.4: Agregar keys a Railway

Ve a Railway → tu proyecto → Variables → New Variable:

| Variable | Valor |
|----------|-------|
| `STRIPE_PUBLISHABLE_KEY` | pk_test_tu_key_aqui |
| `STRIPE_SECRET_KEY` | sk_test_tu_key_aqui |
| `STRIPE_WEBHOOK_SECRET` | (lo configuramos en el siguiente paso) |

### Paso 3.5: Configurar Webhook (para que Stripe avise cuando alguien paga)

1. En Stripe → "Developers" → "Webhooks"
2. Click "Add endpoint"
3. Endpoint URL: `https://TU-URL-DE-RAILWAY.app/api/webhooks/stripe`
   - Reemplaza TU-URL-DE-RAILWAY con tu URL real
4. Events to listen to:
   - `checkout.session.completed`
   - `invoice.paid`
   - `invoice.payment_failed`
5. Click "Add endpoint"
6. Copia el "Signing secret" (empieza con `whsec_...`)
7. Pegalo en Railway como `STRIPE_WEBHOOK_SECRET`

### Paso 3.6: Activar modo LIVE (cuando estes listo para cobrar real)

1. En Stripe, arriba a la derecha hay un toggle "Test mode" → Apagalo
2. Completa la verificacion de identidad (sube foto de tu ID)
3. Agrega tu cuenta bancaria para recibir los pagos
4. Stripe revisa tu cuenta (toma 1-2 dias)
5. Listo para cobrar dinero REAL

---

## ============================================================
## PARTE 4: DOMINIO (opcional, pero mas profesional)
## ============================================================

### Paso 4.1: Comprar dominio

1. Ve a https://namecheap.com
2. Busca "anthroscope.pro"
3. Si esta disponible (~$12/ano), compralo
4. En el checkout, en "DNS" selecciona "Custom DNS"

### Paso 4.2: Conectar a Railway

1. En Railway → tu proyecto → Settings → "Domains"
2. Click "Generate domain" o "Custom domain"
3. Pon: `anthroscope.pro`
4. Railway te da un CNAME record (ejemplo: `anthroscope-pro.up.railway.app`)
5. Ve a Namecheap → Domain List → Manage → Advanced DNS
6. Agrega un CNAME record:
   - Type: CNAME
   - Host: @
   - Value: (el CNAME que te dio Railway)
7. Espera 5-30 minutos
8. Tu app ahora esta en `https://anthroscope.pro`

---

## ============================================================
## PARTE 5: COMO ACTUALIZAR TU APP DESPUES
## ============================================================

Cada vez que hagas cambios:

```bash
cd anthroscope-pro
git add .
git commit -m "Descripcion del cambio"
git push origin main
```

Railway detecta automaticamente y hace deploy solo. Toma ~2 minutos.

---

## ============================================================
## CHECKLIST FINAL
## ============================================================

- [ ] Codigo en GitHub
- [ ] Railway.app funcionando
- [ ] Base de datos MySQL creada
- [ ] Tablas sincronizadas (db:push)
- [ ] Planes de precios insertados (seed.ts)
- [ ] Stripe cuenta creada
- [ ] 3 productos creados en Stripe
- [ ] API Keys de Stripe en Railway
- [ ] Webhook configurado
- [ ] Dominio comprado (opcional)
- [ ] Primer pago de prueba exitoso
- [ ] Activar modo LIVE en Stripe

---

## PREGUNTAS FRECUENTES

### Q: Cuanto me cuesta todo?
- Railway: $5-20/mes (empiezas con $5 gratis)
- Dominio: ~$12/ano
- Stripe: GRATIS (te cobran 2.9% + $0.30 por transaccion)
- **Total: ~$32/mes para empezar**
- Con 1 cliente pagando $39.99/mes ya cubres todo

### Q: Que pasa si algo falla?
- Ve a Railway → Logs (ahi ves los errores)
- Tambien puedes preguntarme y reviso

### Q: Puedo cobrar en otras monedas?
- Si. Stripe soporta 135+ monedas
- En Stripe dashboard → Settings → Currencies

### Q: Los clientes pueden pagar con PayPal?
- Stripe ahora acepta PayPal tambien
- En Stripe → Settings → Payment methods
