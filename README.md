# Evaluación de CNN-3D de Sistemas Expertos — UNAMAD

Presentación web educativa estilo diapositivas (11 slides) con Django 5.2.

**Integrantes:** MAMANI MAMANI ANGEL DAMIAN · PANDURO SANGAMA GERMAS  
**Exposición:** 15/06/2026 — Sistemas Expertos

---

## Ejecutar en local

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # Linux / Mac

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Abrir: http://127.0.0.1:8000

Atajos en la presentación: `→` siguiente · `F` pantalla completa · `?` ayuda

---

## Estructura

```
cnn3d_expert/          Configuración Django
exposicion/            App principal (API + contenido + vistas)
templates/exposicion/  HTML por diapositiva (01–11)
static/                CSS y JS modulares
```

---

## Diapositivas (11)

| # | Tema |
|---|------|
| 01 | Portada |
| 02–04 | Sistema Experto |
| 05–07 | CNN-3D |
| 08 | Comparación SE vs CNN |
| 09 | Sistema híbrido (demo Django en vivo) |
| 10 | Evaluación |
| 11 | Resumen |

---

## API

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/flujo-hibrido/` | POST | CNN → hechos → inferencia SE |
| `/api/inferir/` | POST | Inferencia manual con hechos JSON |
| `/api/analizar-volumen/` | POST | Detección CNN simulada |

---

## Subir a GitHub

### 1. Crear repositorio en GitHub

1. Entra a https://github.com/new  
2. Nombre sugerido: `cnn3d-sistemas-expertos-unamad`  
3. **No** marques README ni .gitignore (ya están en el proyecto)  
4. Crea el repo y copia la URL (ej. `https://github.com/TU_USUARIO/cnn3d-sistemas-expertos-unamad.git`)

### 2. Subir desde tu PC

En la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Presentación CNN-3D + Sistemas Expertos — UNAMAD"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

> **Importante:** `.env`, `db.sqlite3`, `.venv/` y `staticfiles/` **no** se suben (están en `.gitignore`).

---

## Desplegar en Vercel

Vercel detecta Django automáticamente (`manage.py` + `WSGI_APPLICATION`).

### Opción A — Desde la web (recomendada)

1. Entra a https://vercel.com e inicia sesión con GitHub  
2. **Add New → Project**  
3. Importa el repositorio que acabas de subir  
4. Framework: **Django** (auto-detectado)  
5. En **Environment Variables** agrega:

| Variable | Valor | Entorno |
|----------|-------|---------|
| `SECRET_KEY` | Una clave larga aleatoria ([generar aquí](https://djecrety.ir/)) | Production |
| `DEBUG` | `False` | Production |
| `ALLOWED_HOSTS` | `.vercel.app` | Production |

6. **Deploy**

Vercel ejecuta `collectstatic` solo si `STATIC_ROOT` está configurado (ya lo está).

### Opción B — Desde la terminal

```bash
npm i -g vercel
vercel login
vercel
```

Sigue el asistente y luego configura las mismas variables en el dashboard.

### Probar en local como Vercel

```bash
vercel dev
```

Requiere Vercel CLI ≥ 50.38.

---

## Variables de entorno

Copia `.env.example` a `.env` solo para desarrollo local:

```bash
copy .env.example .env    # Windows
```

En producción (Vercel) usa siempre `SECRET_KEY` y `DEBUG=False`.

---

## Créditos

UNAMAD — Sistemas Expertos — Exposición 15/06/2026
