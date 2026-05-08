# GUIA ULTRA SIMPLE - Sin comandos, solo clicks

## PASO 0: DESCARGA TU PROYECTO

Ya te prepare un archivo ZIP con todo tu codigo. Es como descargar una foto.

El archivo esta en: `/tmp/anthroscope-pro.zip`

Dile a Kimi (a mi) que te lo de para descargar, o copia los archivos de `/mnt/agents/output/app` a tu computadora.

---

## PASO 1: SUBIR A GITHUB (Sin comandos, solo arrastrar)

### 1.1 Abre tu navegador y ve a:
```
https://github.com/TU-USUARIO/anthroscope-pro
```
Cambia "TU-USUARIO" por tu nombre de usuario de GitHub.

### 1.2 Veras una pantalla como esta:
```
[anthroscope-pro]           [Public]  [Settings]

[<> Code] [Issues] [Pull requests] ...

anthroscope-pro is empty now.
[Get started by creating a new file] [Uploading an existing file]
```

### 1.3 Click en el boton que dice: "uploading an existing file"

### 1.4 Veras una zona grande que dice "Drag files here"

### 1.5 Descomprime el ZIP en tu computadora:
- En Windows: Click derecho en el ZIP → "Extraer todo..."
- En Mac: Doble click en el ZIP
- Te va a crear una carpeta llamada "anthroscope-pro" con todos los archivos dentro

### 1.6 Arrastra TODA la carpeta a GitHub:
- Abre la carpeta que se descomprimio
- Selecciona TODOS los archivos (Ctrl+A en Windows, Cmd+A en Mac)
- Arrastralos a la zona de GitHub que dice "Drag files here"

### 1.7 Espera que se suban (toma 1-2 minutos)

### 1.8 Abajo veras un campo que dice "Commit changes"
- En el primer campo escribe: `ANTHROSCOPE PRO v1.0`
- Click en el boton verde: `Commit changes`

### 1.9 LISTO. Tu codigo ya esta en GitHub.

---

## PASO 2: RAILWAY.APP (Tu pagina en internet)

### 2.1 Ve a tu navegador y entra a:
```
https://railway.app
```

### 2.2 Click en: "Start for Free" o "Get Started"

### 2.3 Crea cuenta:
- Click en "Continue with GitHub"
- Acepta los permisos (Railway necesita ver tus repositorios)

### 2.4 En el dashboard de Railway:
- Click en "New Project"
- Click en "Deploy from GitHub repo"

### 2.5 Busca tu repositorio:
- Veras una lista de tus repos de GitHub
- Busca "anthroscope-pro"
- Click en "Add"

### 2.6 Agregar base de datos:
- Dentro de tu proyecto, click en "New" (boton grande)
- Selecciona "Database"
- Selecciona "MySQL"
- Railway crea la base de datos automaticamente

### 2.7 Agregar variables (datos secretos):
- Dentro de tu proyecto, click en "anthroscope-pro" (el servicio)
- Click en la pestana "Variables"
- Click en "New Variable"
- Agrega UNA POR UNA estas variables:

Variable: `APP_ID`
Valor: `19dfa3f6-e502-8c84-8000-0000dcba39c7`

Variable: `APP_SECRET`
Valor: `TMtQ0xzm5Fc8ZdWInaeaID7jabFSQhrr`

Variable: `VITE_APP_ID`
Valor: `19dfa3f6-e502-8c84-8000-0000dcba39c7`

Variable: `VITE_KIMI_AUTH_URL`
Valor: `https://auth.kimi.com`

Variable: `KIMI_AUTH_URL`
Valor: `https://auth.kimi.com`

Variable: `KIMI_OPEN_URL`
Valor: `https://open.kimi.com`

Variable: `OWNER_UNION_ID`
Valor: `d7k07o0l3dc8u37qp8j0`

La variable `DATABASE_URL` Railway ya te la da automaticamente cuando creas MySQL.

### 2.8 Railway hace deploy automatico:
- Espera 2-3 minutos
- Ve a la pestana "Deployments"
- Veras "Building..." → "Deploying..." → "Success"

### 2.9 Obtener tu URL:
- Ve a "Settings" dentro del servicio
- Scroll abajo hasta "Public Domain"
- Esa es tu direccion en internet!
- Ejemplo: `https://anthroscope-pro-production.up.railway.app`

### 2.10 Probar:
- Abre esa URL en tu navegador
- Deberias ver tu app funcionando!

---

## PASO 3: STRIPE (Para cobrar tarjetas)

### 3.1 Ve a:
```
https://dashboard.stripe.com/register
```

### 3.2 Crea cuenta con tu email

### 3.3 En el menu de la izquierda, busca "Products" y click

### 3.4 Click en "Add product"

### 3.5 Producto 1 - Individual:
- Name: `ANTHROSCOPE PRO Individual`
- Description: `1 evaluador - evaluaciones ilimitadas`
- Click "Next"
- Price: `39.99`
- Billing period: `Monthly`
- Click "Save"

### 3.6 Click "Add product" de nuevo:
- Name: `ANTHROSCOPE PRO Team`
- Price: `99.99`
- Billing period: `Monthly`
- Click "Save"

### 3.7 Click "Add product" de nuevo:
- Name: `ANTHROSCOPE PRO Institucional`
- Price: `299.99`
- Billing period: `Monthly`
- Click "Save"

### 3.8 Copiar API Keys:
- En el menu izquierdo, busca "Developers" → "API keys"
- Copia la "Publishable key" (empieza con pk_test_...)
- Copia la "Secret key" (empieza con sk_test_...)

### 3.9 Pegar keys en Railway:
- Ve a Railway → tu proyecto → Variables
- Agrega:
  - Variable: `STRIPE_PUBLISHABLE_KEY` | Valor: (tu pk_test_...)
  - Variable: `STRIPE_SECRET_KEY` | Valor: (tu sk_test_...)

### 3.10 Configurar Webhook (para que Stripe avise cuando pagan):
- En Stripe → "Developers" → "Webhooks"
- Click "Add endpoint"
- Endpoint URL: `https://TU-URL-DE-RAILWAY.app/api/webhooks/stripe`
  - Reemplaza "TU-URL-DE-RAILWAY" con tu URL real
- Selecciona eventos:
  - [x] `checkout.session.completed`
  - [x] `invoice.paid`
- Click "Add endpoint"
- Copia el "Signing secret"
- Agrega a Railway como: `STRIPE_WEBHOOK_SECRET`

---

## Y YA ESTA!

Tu app esta en internet. Tus clientes pueden:
1. Entrar a tu URL
2. Hacer login con su email
3. Pagar con tarjeta
4. Usar el sistema

Y a ti te llega el dinero a tu cuenta de Stripe.

---

## CADA VEZ QUE QUIERAS ACTUALIZAR TU APP:

1. Haces cambios en tu codigo
2. Subes los archivos nuevos a GitHub (drag & drop otra vez)
3. Railway se actualiza SOLO en 2 minutos

No necesitas hacer nada mas!
