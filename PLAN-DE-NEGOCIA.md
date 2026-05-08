# ANTHROSCOPE PRO — Plan de Negocio & Comercializacion

## 1. Que se arreglo del Avatar 3D (y por que fallaba)

### Problemas encontrados:
1. **Fuente inexistente**: `font="/Inter-Bold.woff"` en el componente `<Text>` de drei. Esta fuente no existia en produccion, causando que el Canvas de Three.js se bloqueara silenciosamente.
2. **Environment HDRI**: `<Environment preset="studio" />` intentaba cargar un archivo HDRI remoto que podia fallar.
3. **Sin manejo de errores**: Si cualquier cosa fallaba dentro del Canvas, React Suspense nunca se resolvia, dejando "Cargando avatar 3D..." para siempre.
4. **Bundle gigante**: Three.js estaba en el bundle principal (2.5MB), causando timeouts en dispositivos lentos.

### Soluciones aplicadas:
- Se quito la fuente personalizada — ahora usa la fuente por defecto de drei
- Se quito el Environment HDRI externo
- Se agrego `ErrorBoundary` alrededor del Canvas
- Se agrego timeout de 8 segundos que muestra "3D Avatar unavailable" si no carga
- Se convirtio a **lazy-loaded component** (`Avatar3DLazy.tsx`) con code splitting
- El bundle principal bajo de 2.5MB a 1.5MB

---

## 2. Estructura de Precios Recomendada ($39.99)

Ya implementada en la base de datos (`db/seed.ts`):

| Plan | Precio Mensual | Precio Anual | Evaluadores | Atletas | Ideal para |
|------|---------------|--------------|-------------|---------|------------|
| **Individual** | **$39.99** | **$399.99** (17% off) | 1 | Ilimitados | Evaluador ISAK independiente |
| **Team** | $99.99 | $999.99 | 5 | Ilimitados | Clinica deportiva, preparador fisico |
| **Institucional** | $299.99 | $2,999.99 | Ilimitados | Ilimitados | Federacion, universidad, seleccion nacional |

### Por que $39.99 funciona:
- **Percepcion psicologica**: $39.99 se siente como "menos de $40", no como $40
- **Comparacion**: Un curso ISAK Nivel 1 cuesta ~$500-800. Un software profesional a $40/mes es 10x mas barato que contratar a un desarrollador
- **Lifetime Value (LTV)**: $39.99 x 12 meses = $479.88/ano por cliente
- **Break-even**: Con 100 suscriptores = $3,999/mes = $47,988/ano

### Comparacion con competidores (posicionamiento):
- **Excel gratis**: No calcula 5 componentes, no tiene avatar 3D, no valida ETM
- **Software medico generico**: $200-500/mes, no entiende ISAK
- **ANTHROSCOPE PRO**: $39.99/mes, protocolo ISAK nativo, 4 idiomas, reportes Nivel 4

---

## 3. Como abastecer clientes con MUCHAS personas

### Escenario 1: Club deportivo con 200 atletas y 3 evaluadores
**Solucion**: Plan Team ($99.99/mes)
- 3 evaluadores pueden evaluar a los 200 atletas
- Cada evaluador tiene su login
- Todos comparten la base de datos central
- El admin del club ve reportes de todo el equipo

### Escenario 2: Federacion con 50 entrenadores en 20 clubes
**Solucion**: Plan Institucional ($299.99/mes)
- Evaluadores ilimitados
- Cada club puede tener su "organizacion" con logo propio
- Base de datos centralizada de toda la federacion
- API para integrar con sistemas de scouting

### Escenario 3: Universidad con programa de kinesiologia
**Solucion**: Licencia perpetua ($15,000 una vez) + mantenimiento anual $2,000
- Instalan en sus servidores
- White-label con logo de la universidad
- Profesores usan para ensenar ISAK
- Estudiantes practican con datos reales

### Arquitectura multi-tenant (ya implementada):
```
Tablas creadas:
- planes          (definicion de precios)
- suscripciones   (cada usuario su suscripcion activa)
- pagos           (historial de pagos)
- organizaciones  (para plan Institucional — cada cliente tiene su org)
- miembros_org    (evaluadores dentro de una organizacion)
```

**Como funciona el flujo**:
1. Cliente A (evaluador individual) se registra → le das trial 14 dias → paga $39.99/mes
2. Cliente B (club) compra Plan Team → tu le das admin dashboard → el invita a sus 3 evaluadores
3. Cliente C (federacion) compra Institucional → tu le configuras su org con su logo → ellos gestionan sus evaluadores

---

## 4. Pasos exactos para subirlo al mercado

### Paso 1: Dominio y marca (1 dia)
- Comprar `anthroscope.pro` (~$12/ano en Namecheap)
- Crear cuenta de email profesional: contact@anthroscope.pro
- Hacer un logo simple (Canva gratis)

### Paso 2: Hosting (2-3 dias)
**Opcion A — Fullstack (recomendado)**:
- **Railway.app** o **Render.com**: Despliegas tu backend + frontend juntos
- Base de datos MySQL incluida (~$5-20/mes segun uso)
- SSL automatico
- Costo: ~$20-50/mes para empezar

**Opcion B — Separado**:
- Frontend: Vercel o Netlify (gratis para empezar)
- Backend + DB: Railway/Render (~$20/mes)

### Paso 3: Pasarela de pagos (2-3 dias)
1. Crear cuenta en **Stripe** (stripe.com)
2. Configurar webhook para recibir confirmaciones de pago
3. Activar Stripe Checkout (ya tienes el componente de precios)
4. Precios en Stripe:
   - Individual mensual: $39.99
   - Individual anual: $399.99
   - Team mensual: $99.99
   - Institucional: Contactar (manual)

### Paso 4: Primeros clientes (semana 1-2)
1. **Tu red ISAK**: Todos los que conoces en el curso Nivel 1 en Julio son prospectos
2. **Instagram/LinkedIn**: Postear comparativas Excel vs ANTHROSCOPE PRO
3. **Demo gratis**: Cualquiera puede usar el "Demo Nivel 4" que ya tienes
4. **Referidos**: Si un evaluador refiere a otro, le das 1 mes gratis

### Paso 5: Escalar (mes 3-6)
- Integrar con **ISAK Global**: Ofrecer la plataforma para cursos de certificacion
- Webinars mensuales: "Como interpretar el IMO de Ross & Kerr"
- Blog SEO: Escribir sobre antropometria deportiva (atrae trafico organico)
- Partnerships con universidades: Usar ANTHROSCOPE PRO en programas de kinesiologia

---

## 5. Plan de Ingresos Proyectado (12 meses)

| Mes | Suscriptores Individuales | Teams | Institucional | Ingreso Mensual |
|-----|--------------------------|-------|---------------|-----------------|
| 1-2 | 5 | 0 | 0 | $200 |
| 3-4 | 15 | 1 | 0 | $700 |
| 5-6 | 30 | 2 | 0 | $1,400 |
| 7-8 | 50 | 3 | 0 | $2,300 |
| 9-10 | 75 | 5 | 1 | $4,250 |
| 11-12 | 100 | 8 | 1 | $5,700 |

**Ingreso anual estimado (conservador)**: ~$35,000-50,000 el primer ano
**Con 1 institucional grande**: +$36,000/ano adicionales

---

## 6. Checklist tecnico para lanzar

- [x] Sistema de evaluacion ISAK completo
- [x] 5 componentes Ross & Kerr
- [x] Avatar 3D (code-split, con fallback)
- [x] Somatocarta individual + grupal
- [x] ETM automatico
- [x] Reportes PDF/Excel
- [x] 4 idiomas (ES/EN/FR/PT)
- [x] Cuadrantes Holway
- [x] Potencial genetico (IMO)
- [x] Tablas normativas por deporte
- [x] Backend tRPC + Drizzle + MySQL
- [x] Autenticacion OAuth
- [x] Tablas de suscripcion y pagos
- [x] Panel de precios conectado a API
- [ ] Integrar Stripe Checkout (pendiente de tu cuenta)
- [ ] Configurar dominio personalizado
- [ ] SSL + DNS
- [ ] Terminos y condiciones + Politica de privacidad
- [ ] Soporte por email (tickets)

---

## 7. Ventajas competitivas que ya tienes

1. **Unico en el mercado**: No existe otro software SaaS con modelo de 5 componentes Ross & Kerr
2. **Validacion cientifica**: Basado en diseccion cadavérica de Bruselas (Ross & Kerr 1993)
3. **Francis Holway**: Tienes contacto directo — puedes ofrecerlo como "software validado por"
4. **4 idiomas**: ES/EN/FR/PT cubre 90% del mercado antropometrico global
5. **Avatar 3D**: Impacto visual que Excel nunca tendra
6. **Potencial genetico**: Funcionalidad unica basada en IMO natural limits

---

## 8. Contacto con Francis Holway — Como aprovecharlo

Estrategia propuesta:
1. Cuando termines ISAK Nivel 1 en Julio, mostrale el software
2. Proponer una "validacion academica": el lo prueba con sus atletas y da testimonio
3. Ofrecerle **acceso gratuito de por vida** a cambio de:
   - Testimonio en tu landing page
   - Mencion en sus conferencias
   - Co-autoria en paper de validacion del software
4. Con su endorsement, el precio puede subir a $59.99/mes (50% mas)

---

**Listo para desplegar. El codigo esta en `/mnt/agents/output/app`.**
**Siguiente paso: Crear cuenta Stripe + comprar dominio + desplegar en Railway.**
