<h1 align="center">🚗 Carrent</h1>

<p align="center">
  <b>Plataforma de alquiler de coches con reserva online</b><br/>
  Búsqueda de disponibilidad por oficina y fechas · Gestión de flota · Panel de administración
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular_22-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white" alt="RxJS" />
  <img src="https://img.shields.io/badge/Spring_Boot_4-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
  <img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" alt="Spring Security" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</p>

<p align="center">
  <a href="https://carrent-frontend-topaz.vercel.app"><img src="https://img.shields.io/badge/🔗_DEMO_EN_VIVO-carrent--frontend--topaz.vercel.app-1a73e8?style=for-the-badge" alt="Demo en vivo" /></a>
  <a href="https://www.youtube.com/watch?v=Z3fM00dWvZQ"><img src="https://img.shields.io/badge/▶_VIDEO_DEMOSTRACIÓN-YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Video demostración" /></a>
</p>

---

## 🗺️ Índice

- [¿Qué es Carrent?](#-qué-es-carrent)
- [¿Qué demuestra este proyecto?](#-qué-demuestra-este-proyecto)
- [Stack tecnológico](#-stack-tecnológico)
- [Funcionalidades implementadas](#-funcionalidades-implementadas)
- [Retos técnicos resueltos](#-retos-técnicos-resueltos)
- [Arquitectura del proyecto](#-arquitectura-del-proyecto)

---

## 🚙 ¿Qué es Carrent?

Carrent es una **aplicación full-stack de alquiler de coches**: el usuario elige una oficina y unas fechas, consulta qué vehículos están disponibles en ese rango, filtra por combustible o transmisión y reserva en un par de pasos. Por detrás, un panel de administración permite gestionar oficinas, modelos de coche, flota y reservas con control de acceso por roles.

El proyecto está dividido en dos repositorios independientes que se comunican por API REST:

| 🖥️ Frontend (este repo) | ⚙️ Backend |
|:---:|:---:|
| Angular 22 · desplegado en Vercel | Spring Boot 4 · desplegado en Render |

---

## 👨‍💻 ¿Qué demuestra este proyecto?

- ✅ Angular 22 con **componentes standalone** y **signals** (sin NgModules, sin RxJS para el estado local)
- ✅ Autenticación real con **JWT en cookies httpOnly** (no en `localStorage`), protección **CSRF** con el patrón double-submit-cookie, y renovación de sesión vía refresh token
- ✅ Control de acceso por **roles** (`USER` / `ADMIN`) coordinado entre guards de Angular y `@PreAuthorize`/reglas de Spring Security en el backend
- ✅ Formularios reactivos con validación (`ReactiveFormsModule`) en búsqueda, reserva, login/registro y todos los formularios de administración
- ✅ Backend en Spring Boot con capas bien separadas: controller → service → repository, DTOs con **MapStruct**, y **JPA/Hibernate** sobre MySQL
- ✅ Consumo de API tipado de extremo a extremo (modelos TypeScript espejo de los DTOs del backend)
- ✅ Despliegue real en producción con **frontend y backend en dominios distintos** (Vercel + Render), incluyendo la resolución de los problemas de cookies cross-site que eso conlleva
- ✅ Diseño responsive con Tailwind CSS 4 e iconografía con Lucide

---

## 🛠 Stack Tecnológico

| Tecnología | Uso |
|---|---|
| 🅰️ **Angular 22** | Framework frontend — componentes standalone, signals, Router, Reactive Forms |
| 🔷 **TypeScript** | Tipado estático en modelos, servicios y componentes |
| 🎨 **Tailwind CSS 4** | Diseño responsive mobile-first |
| 🧊 **Lucide Angular** | Iconografía |
| 🔄 **RxJS** | Streams de datos entre servicios y componentes |
| 🍃 **Spring Boot 4** | API REST del backend |
| 🔐 **Spring Security + JJWT** | Autenticación JWT en cookie httpOnly, autorización por roles |
| 🗄️ **Spring Data JPA + MySQL** | Persistencia de oficinas, coches, modelos y reservas |
| 🧩 **MapStruct** | Mapeo entre entidades y DTOs |
| ☁️ **Vercel** | Hosting del frontend, con rewrite/proxy hacia la API |
| ☁️ **Render** | Hosting del backend |

---

## ✨ Funcionalidades implementadas

### 🔍 Búsqueda y reserva
- Búsqueda de coches disponibles por **oficina, fecha de recogida y devolución**
- Filtros por tipo de combustible y transmisión, y ordenación por precio
- Flujo de reserva con pantalla de confirmación y de éxito
- Listado de "Mis reservas" para el usuario autenticado

### 🔐 Autenticación y sesión
- Login y registro con validación de formulario
- Sesión persistida en cookie httpOnly (`access_token` / `refresh_token`), con restauración automática al recargar la página
- El botón de reservar se adapta según si hay sesión activa: si no la hay, redirige a login y vuelve al punto de partida tras autenticarse

### 🛠️ Panel de administración
- Dashboard, gestión de **oficinas**, **modelos de coche**, **flota** y **reservas**
- Formularios de alta/edición para cada entidad, protegidos por rol `ADMIN`
- Rutas de administración separadas del layout público, con su propio guard

---

## 📚 Retos técnicos resueltos

### 🍪 Autenticación cross-site en producción
Con el frontend en Vercel y el backend en Render (dominios distintos), las cookies httpOnly con `SameSite=None; Secure` seguían siendo bloqueadas por navegadores modernos al tratarse de **cookies de terceros**. La solución: un `vercel.json` que reenvía internamente `/api/*` hacia el backend de Render, de forma que el navegador solo ve peticiones al propio dominio de Vercel — las cookies pasan a ser de primera parte sin tocar la arquitectura de seguridad (httpOnly + CSRF) ni exponer el JWT a JavaScript.

### 🛡️ CSRF con doble cookie en una SPA
El backend expone el token CSRF en una cookie legible (`XSRF-TOKEN`) y la SPA lo reenvía como cabecera (`X-XSRF-TOKEN`) en cada petición mutante, combinando la configuración nativa de Angular (`withXsrfConfiguration`) con un interceptor propio para cubrir los casos donde la cookie aún no existe.

### 🔑 Autorización coherente entre capas
Los roles `USER`/`ADMIN` se comprueban tanto en las rutas de Angular (guards) como en `SecurityConfig` del backend, con endpoints públicos explícitos (como la disponibilidad de coches o el listado de oficinas) frente a los que requieren rol — evitando depender solo del frontend para proteger datos.

---

## 📂 Arquitectura del proyecto

```
carrent-frontend/
├── vercel.json                  # Proxy /api/* hacia el backend en Render
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/           # auth.guard, admin-guard
│   │   │   └── interceptors/     # withCredentials, X-XSRF-TOKEN
│   │   ├── features/
│   │   │   ├── auth/             # login, registro, AuthService
│   │   │   ├── cars/              # búsqueda y disponibilidad
│   │   │   ├── card-models/       # modelos de coche
│   │   │   ├── offices/           # oficinas
│   │   │   ├── bookings/          # confirmación, éxito, mis reservas
│   │   │   ├── users/
│   │   │   └── admin/             # dashboard y CRUD por entidad
│   │   ├── layout/                # public-layout, admin-layout
│   │   └── shared/
│   │       ├── components/        # navbar, footer, car-card, available-car-card
│   │       ├── directives/
│   │       └── pipes/
│   └── environments/              # apiUrl por entorno (dev / prod)
```
