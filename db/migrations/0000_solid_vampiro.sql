CREATE TABLE `atletas` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`equipoId` bigint unsigned,
	`nombre` varchar(255) NOT NULL,
	`fechaNacimiento` varchar(20),
	`sexo` enum('masculino','femenino') NOT NULL,
	`deporte` varchar(100),
	`posicion` varchar(100),
	`notas` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `atletas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `equipos` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`deporte` varchar(100) NOT NULL,
	`categoria` varchar(100),
	`institucion` varchar(255),
	`entrenador` varchar(255),
	`evaluadorId` bigint unsigned NOT NULL,
	`fechaEvaluacion` timestamp NOT NULL DEFAULT (now()),
	`notas` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `equipos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `evaluaciones` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`atletaId` bigint unsigned NOT NULL,
	`equipoId` bigint unsigned,
	`evaluadorId` bigint unsigned NOT NULL,
	`nivel` int NOT NULL DEFAULT 1,
	`fechaEvaluacion` timestamp NOT NULL DEFAULT (now()),
	`masaCorporal` decimal(6,2) NOT NULL,
	`estatura` decimal(6,2) NOT NULL,
	`triceps` decimal(5,1) DEFAULT '0',
	`subescapular` decimal(5,1) DEFAULT '0',
	`biceps` decimal(5,1) DEFAULT '0',
	`crestaIliaca` decimal(5,1) DEFAULT '0',
	`supraespinal` decimal(5,1) DEFAULT '0',
	`abdominal` decimal(5,1) DEFAULT '0',
	`musloAnterior` decimal(5,1) DEFAULT '0',
	`piernaMedial` decimal(5,1) DEFAULT '0',
	`brazoRelajado` decimal(5,1) DEFAULT '0',
	`brazoFlexionado` decimal(5,1) DEFAULT '0',
	`antebrazoMaximo` decimal(5,1) DEFAULT '0',
	`toraxMesoesternal` decimal(5,1) DEFAULT '0',
	`cinturaMinima` decimal(5,1) DEFAULT '0',
	`gluteoMaximo` decimal(5,1) DEFAULT '0',
	`musloMedio` decimal(5,1) DEFAULT '0',
	`pantorrillaMaxima` decimal(5,1) DEFAULT '0',
	`biacromial` decimal(5,1) DEFAULT '0',
	`humeroBiepicondilar` decimal(5,1) DEFAULT '0',
	`femurBicondilar` decimal(5,1) DEFAULT '0',
	`tallaSentada` decimal(6,2) DEFAULT '0',
	`mano` decimal(5,1) DEFAULT '0',
	`pie` decimal(5,1) DEFAULT '0',
	`cabeza` decimal(5,1) DEFAULT '0',
	`cuello` decimal(5,1) DEFAULT '0',
	`avanzadoJson` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `evaluaciones_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `miembros_org` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`orgId` bigint unsigned NOT NULL,
	`userId` bigint unsigned NOT NULL,
	`rol` enum('admin','evaluador','viewer') NOT NULL DEFAULT 'evaluador',
	`activo` enum('si','no') NOT NULL DEFAULT 'si',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `miembros_org_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `organizaciones` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`logoUrl` text,
	`colorPrimario` varchar(7) DEFAULT '#10b981',
	`colorAccent` varchar(7) DEFAULT '#D4FF00',
	`colorSecundario` varchar(7) DEFAULT '#6366f1',
	`adminUserId` bigint unsigned NOT NULL,
	`maxEvaluadores` int NOT NULL DEFAULT 0,
	`maxEquipos` int NOT NULL DEFAULT 0,
	`suscripcionActiva` enum('si','no') NOT NULL DEFAULT 'no',
	`planCodigo` varchar(50),
	`fechaVencimiento` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `organizaciones_id` PRIMARY KEY(`id`),
	CONSTRAINT `organizaciones_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `pagos` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`suscripcionId` bigint unsigned NOT NULL,
	`userId` bigint unsigned NOT NULL,
	`monto` decimal(10,2) NOT NULL,
	`moneda` varchar(3) NOT NULL DEFAULT 'USD',
	`estado` enum('pendiente','completado','fallido','reembolsado') NOT NULL DEFAULT 'pendiente',
	`metodoPago` varchar(50) NOT NULL,
	`paymentProviderId` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pagos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `planes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`codigo` varchar(50) NOT NULL,
	`nombre` varchar(255) NOT NULL,
	`descripcion` text,
	`precioMensual` decimal(10,2) NOT NULL,
	`precioAnual` decimal(10,2) NOT NULL,
	`maxEvaluadores` int NOT NULL DEFAULT 1,
	`maxAtletas` int NOT NULL DEFAULT 0,
	`incluyeReportesNivel4` enum('si','no') NOT NULL DEFAULT 'si',
	`incluyeAPI` enum('si','no') NOT NULL DEFAULT 'no',
	`incluyeWhiteLabel` enum('si','no') NOT NULL DEFAULT 'no',
	`activo` enum('si','no') NOT NULL DEFAULT 'si',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `planes_id` PRIMARY KEY(`id`),
	CONSTRAINT `planes_codigo_unique` UNIQUE(`codigo`)
);
--> statement-breakpoint
CREATE TABLE `referencias_deporte` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nombre` varchar(100) NOT NULL,
	`deporte` varchar(100) NOT NULL,
	`sexo` enum('masculino','femenino') NOT NULL,
	`categoria` varchar(100),
	`phantomEstatura` decimal(6,2),
	`phantomMasa` decimal(6,2),
	`phantomImc` decimal(5,2),
	`phantomGrasa` decimal(5,2),
	`phantomMusculo` decimal(5,2),
	`phantomHueso` decimal(5,2),
	`phantomImo` decimal(5,2),
	`sdEstatura` decimal(5,2),
	`sdMasa` decimal(5,2),
	`sdImc` decimal(5,2),
	`sdGrasa` decimal(5,2),
	`medidasPromedio` json,
	`fuente` varchar(500),
	`anio` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `referencias_deporte_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `suscripciones` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` bigint unsigned NOT NULL,
	`planId` bigint unsigned NOT NULL,
	`estado` enum('activa','cancelada','vencida','trial') NOT NULL DEFAULT 'trial',
	`fechaInicio` timestamp NOT NULL DEFAULT (now()),
	`fechaFin` timestamp NOT NULL,
	`periodo` enum('mensual','anual') NOT NULL DEFAULT 'mensual',
	`montoPagado` decimal(10,2),
	`moneda` varchar(3) DEFAULT 'USD',
	`metodoPago` varchar(50),
	`paymentId` varchar(255),
	`evaluacionesRealizadas` int DEFAULT 0,
	`atletasRegistrados` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `suscripciones_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`unionId` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(320),
	`avatar` text,
	`role` enum('user','evaluador','admin') NOT NULL DEFAULT 'user',
	`tier` enum('free','pro','team','enterprise') NOT NULL DEFAULT 'free',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`lastSignInAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_unionId_unique` UNIQUE(`unionId`)
);
