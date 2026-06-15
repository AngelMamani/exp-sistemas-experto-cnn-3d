# TODO — Evaluación CNN-3D Sistemas Expertos

## Registro de cambios

### 2026-06-15
- [x] Proyecto Django `cnn3d_expert` + app `exposicion`
- [x] Presentación web estilo diapositivas (8 slides)
- [x] CSS modular: Tokens, Base, Slides, Componentes
- [x] JS modular: ClienteApi, NavegacionSlides, VisualizadorCnn, GraficosEvaluacion, DemoHibrida, Main
- [x] Services Python: MotorInferencia (10 reglas), SimuladorCnn
- [x] API REST: flujo híbrido, inferir, analizar volumen
- [x] Rediseño completo: presentación fullscreen tipo deck (una diapositiva a la vez)
- [x] Navegación: teclado (←→ Espacio), botones grandes, barra progreso, nav lateral con títulos
- [x] Interactividad: tarjetas flip, pipeline animado, comparador deslizante SE/CNN, flujo híbrido animado
- [x] Visual: tipografía grande, cubo 3D CSS, partículas de fondo, glassmorphism, pantalla completa (F)
- [x] Django dinámico: ContenidoPresentacion.py inyecta diapositivas, métricas y tabla comparación

### 2026-06-15 (fix)
- [x] Corregido modal de atajos de teclado: `display:flex` anulaba `hidden` — ahora cierra con «Entendido», Esc y clic fuera.

### 2026-06-15 — Ajustes exposición (integrantes + SE sin algoritmo)
- [x] Eliminada diapositiva «Algoritmo de inferencia» (9 slides total)
- [x] Nombres en portada y cierre: MAMANI MAMANI ANGEL DAMIAN, PANDURO SANGAMA GERMAS
- [x] Diapositivas SE ampliadas: bloques explicativos, tipografía grande, casos interactivos Django
- [x] Reindexación de slides y limpieza de SistemaExpertoInteractivo.js

### 2026-06-15 — Fix Chart.js y BasePresentacion
- [x] Chart.js servido localmente (`static/js/vendor/chart.umd.min.js`) — evita Tracking Prevention del navegador
- [x] Datos de presentación vía `json_script` + `ConfigPresentacion.js` — sin errores de linter en template

### 2026-06-15 — Fix CSS Deck.css
- [x] Eliminadas propiedades huérfanas duplicadas tras `.FraseFinal--Grande` (error de sintaxis CSS)

### 2026-06-15 — Barra superior eliminada
- [x] Quitada barra con UNAMAD, título, contador 1/9, pantalla completa y ayuda
- [x] Ayuda de teclado sigue disponible con `?` o `H`
- [x] Pantalla completa sigue con tecla `F`

### 2026-06-15 — CNN-3D interactivo / SE simplificado
- [x] Sistema Experto vuelve a slide simple (definición + componentes + regla)
- [x] Eliminada diapositiva SE casos reales (8 slides total)
- [x] CNN-3D: bloques explicativos, pipeline clickeable, tabs 2D vs 3D, casos reales Django
- [x] ContenidoCnn3d.py + Cnn3dInteractivo.js + Cnn3d.css

### 2026-06-15 — Estructura 1 diapositiva = 1 archivo
- [x] Carpeta `templates/exposicion/diapositivas/` con archivos numerados 01–08
- [x] Carpeta `exposicion/contenido/` con datos por módulo + `RegistroDiapositivas.py`
- [x] CSS/JS por diapositiva en `static/css/diapositivas/` y `static/js/diapositivas/`
- [x] `partials/` solo para piezas compartidas (nav, controles, ayuda)

### 2026-06-15 — Limpieza general del proyecto
- [x] Eliminados: SistemaExpertoInteractivo.js, NavegacionSlides.js, Slides.css, SistemaExpertoApi.py, BarraPresentacion.html
- [x] Renombrado partial de ayuda → AyudaModal.html
- [x] Recortado MotorInferencia, ContenidoSistemaExperto, ContenidoPresentacion, TarjetasInteractivas, ClienteApi
- [x] CSS muerto eliminado (barra superior, flip cards, diagrama SE)
- [x] 02_SistemaExperto.css reducido a lo que usa la diapositiva 02

### 2026-06-15 — Diapositiva 02 SE interactiva (rebuild)
- [x] Bloques explicativos, arquitectura clickeable, tabs adelante/atrás
- [x] Flujo de inferencia animado (5 pasos)
- [x] Caso real MYCIN con síntomas editables + simulación Django + timeline

### 2026-06-15 — SE dividido en 3 diapositivas (10 slides total)
- [x] Diapositiva 02: solo concepto (definición + 3 bloques + regla SI-ENTONCES)
- [x] Diapositiva 03: arquitectura clickeable + tabs adelante/atrás + flujo resumido
- [x] Diapositiva 04: caso MYCIN + flujo 5 pasos + síntomas + simulación Django
- [x] CNN y resto renumerados 05–10; RegistroDiapositivas, PaginaPrincipal, BasePresentacion actualizados
- [x] Eliminados archivos viejos duplicados (03_Cnn3d, 08_Resumen, etc.)

### 2026-06-15 — Portada y resultados MYCIN ordenados
- [x] Fix CSS: media query rota en Deck.css (portada forzaba columna en desktop)
- [x] Nueva 01_Portada.css: grid 2 columnas, integrantes en lista, visual en tarjeta
- [x] MYCIN: panel resultado con stats, secciones (contexto / evaluación / conclusiones / cierre)

### 2026-06-15 — CNN-3D dividido en 3 diapositivas (12 slides total)
- [x] Diapositiva 05: concepto CNN (definición + 3 bloques + ejemplo salida)
- [x] Diapositiva 06: pipeline clickeable + tabs 2D vs 3D + tabla comparativa
- [x] Diapositiva 07: casos reales + salida ordenada por secciones (como MYCIN)
- [x] Comparación, híbrido, evaluación, demo y resumen renumerados 08–12

### 2026-06-15 — Comparación interactiva (diapositiva 08)
- [x] ContenidoComparacion.py: criterios con detalle + escenarios de uso
- [x] Slider dinámico con % SE/CNN y textos que cambian
- [x] Modos: lado a lado, enfoque SE, enfoque CNN
- [x] Criterios clickeables + panel detalle + escenarios + enlace a híbrido

### 2026-06-15 — Sistema híbrido espectacular (diapositiva 09)
- [x] Pipeline 5 nodos con pulsos de luz viajando entre etapas
- [x] Flujo en vivo con API Django: MRI → CNN → Hechos → SE → Veredicto
- [x] Timeline en tiempo real + panel veredicto con celebración visual
- [x] Métricas: confianza, reglas activadas, tiempo de respuesta

### 2026-06-15 — Híbrido: caso real María L. (CNN + SE juntos)
- [x] Paciente real, motivo de consulta y estudio BraTS en la diapositiva
- [x] Tarjetas de rol: CNN = ojos, SE = cerebro, trabajo conjunto
- [x] API devuelve hechos legibles y traducción CNN→SE en lenguaje clínico

### 2026-06-15 — Evaluación interactiva (diapositiva 10)
- [x] 3 dimensiones clickeables: CNN técnico, SE lógico, híbrido fin a fin
- [x] Panel detalle con criterios, valores y ejemplo real del proyecto
- [x] Gráficos Chart.js (CNN), barras animadas (SE), stats híbrido
- [x] Rediseño visual: grid 2×2 criterios, KPIs, pipeline mini, sin scrollbars
- [x] Interactividad: teclas 1/2/3, criterios resaltan gráficos, badge «Datos en vivo»

### 2026-06-15 — Demo eliminada (11 slides total)
- [x] Quitada diapositiva 11 Demo en vivo — flujo híbrido queda en slide 09
- [x] Resumen renumerado a diapositiva 11 (01–11)
- [x] Enlaces portada/híbrido/evaluación apuntan al cierre

## Pendiente
- [ ] TODO: Probar despliegue en Vercel antes de la exposición

### 2026-06-15 — Preparación GitHub + Vercel
- [x] .gitignore, .env.example, pyproject.toml (entrypoint Vercel)
- [x] settings.py: ALLOWED_HOSTS, STATIC_ROOT, WhiteNoise, variables de entorno
- [x] README con pasos GitHub y Vercel
