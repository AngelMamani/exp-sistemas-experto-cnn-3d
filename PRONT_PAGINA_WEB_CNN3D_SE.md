# Brief para el ingeniero de software — Página web CNN-3D y Sistemas Expertos

> **Para quién es esto:** Ingeniero/a de software que va a construir la página web del proyecto.  
> **De dónde viene:** Grupo de exposición UNAMAD — curso de Sistemas Expertos.  
> **Cuándo se presenta:** 15 de junio de 2026.  
> **Idioma de todo el sitio:** Español (Perú).

---

## Hola, ingeniero 👋

Necesitamos que construyas una **página web educativa** para una exposición universitaria. No es un e-commerce ni un dashboard corporativo: es un sitio donde cualquier estudiante entre, lea, entienda y pruebe conceptos de **Sistemas Expertos** y **CNN-3D**.

La idea central que tienes que dejar clara en todo el sitio es esta:

> **CNN-3D y Sistema Experto NO son lo mismo.** Son cosas distintas que a veces se combinan. Si alguien termina de leer la página y cree que son un solo concepto, el trabajo no cumplió su objetivo.

Tú, como dev, tienes que traducir eso en una experiencia web clara, bonita y que funcione el día de la exposición sin sorpresas.

---

## ¿Qué problema estamos resolviendo?

En clase mucha gente confunde:
- **Sistema Experto** → reglas, motor de inferencia, explicaciones del tipo *"se activó la regla R7"*
- **CNN-3D** → red neuronal que analiza volúmenes 3D (MRI, CT, video, etc.)

Tu trabajo es armar un sitio que **explique, compare y demuestre** ambos, en ese orden lógico:

```
Teoría  →  Ejemplos del mundo real  →  Parte práctica (demo)
```

Piénsalo como un tutorial interactivo, no como un paper en PDF pegado a HTML.

---

## ¿Quién va a usar la página?

- Compañeros de la universidad (mayoría sin mucho background en deep learning)
- Docentes que van a evaluar la exposición
- Cualquier visitante curioso

**Traducción para ti:** el texto no puede ser ultra técnico ni ultra básico. Tiene que explicar bien, con ejemplos, diagramas y una demo que se entienda en 2 minutos.

---

## Cómo quiero que organices el sitio

Arma la navegación con un menú fijo (sticky) que lleve a estas secciones:

| Sección | Qué va ahí |
|---------|------------|
| **Inicio** | Hero, resumen, botones para saltar a cada bloque |
| **Teoría** | Qué es un SE, qué es una CNN-3D, diferencias, híbridos |
| **Ejemplos** | Casos reales (medicina, industria, video, SE puro) |
| **Práctica** | Demo interactiva — esto es lo que más peso tiene en vivo |
| **Referencias** | Bibliografía, créditos UNAMAD, glosario |

El flujo narrativo tiene que sentirse natural: primero entiendo, luego veo dónde se usa, al final lo pruebo yo mismo.

---

# PARTE 1 — Lo que tienes que construir en la sección TEÓRICA

## 1. Hero / Portada

**Tú debes crear:**

- Un título fuerte, por ejemplo: *"CNN-3D y Sistemas Expertos: percepción, razonamiento e integración"*
- Un subtítulo de una línea que diga algo como: *"La CNN-3D ve patrones en volúmenes 3D; el Sistema Experto razona con reglas que se pueden explicar"*
- Tres botones que hagan scroll suave a: Teoría | Ejemplos | Práctica
- Badge o texto visible: **UNAMAD — Sistemas Expertos — Exposición 15/06/2026**
- Un fondo o ilustración que mezcle idea de volumen 3D + diagrama de reglas (nada genérico de stock "personas en reunión")

## 2. Bloque: ¿Qué es un Sistema Experto?

**Aquí tienes que explicar y mostrar, no solo copiar texto.**

Incluye:
- Definición en lenguaje claro: programa que imita el razonamiento de un experto en un dominio específico
- **Diagrama** (SVG, Mermaid o imagen) con estos componentes:
  - Base de conocimiento
  - Base de hechos
  - Motor de inferencia
  - Interfaz de usuario
  - Módulo de explicación
  - Módulo de adquisición del conocimiento
- Breve mención de encadenamiento hacia adelante y hacia atrás
- Dos ejemplos históricos en una línea cada uno: MYCIN, DENDRAL
- Un recuadro tipo "ventajas vs limitaciones":
  - ✅ Explicable, trazable, reglas claras
  - ⚠️ Cuello de botella al obtener conocimiento del experto, difícil con datos no estructurados

## 3. Bloque: ¿Qué es una CNN-3D?

**Tu tarea aquí es hacerlo visual.** La gente no entiende "tensor 4D" si no lo ves.

Incluye:
- Explicación: red convolucional que trabaja en 3 dimensiones (profundidad × alto × ancho) o espacio + tiempo (video)
- Tabla CNN 2D vs CNN 3D (entrada, qué detecta, ejemplos)
- Diagrama del pipeline:
  ```
  Volumen de entrada → Conv3D → ReLU → Pooling3D → ... → Clasificación
  ```
- Tareas típicas: clasificación, segmentación 3D, detección en video
- Menciona frameworks (solo referencia): PyTorch `Conv3d`, TensorFlow `Conv3D`
- Limitaciones honestas: consume mucha RAM/GPU, necesita muchos datos, es caja negra

## 4. Bloque CRÍTICO: ¿Son lo mismo?

**Este bloque lo quiero bien visible.** Usa un callout grande, color de alerta, imposible de ignorar:

> **CNN-3D NO es un Sistema Experto.** Son paradigmas distintos. Se pueden integrar, pero no son la misma cosa.

**Tú debes armar esta tabla comparativa** (responsiva en móvil):

| | Sistema Experto | CNN-3D |
|---|-----------------|--------|
| Paradigma | Simbólico (reglas) | Deep Learning (pesos) |
| Conocimiento | Explícito en reglas | Implícito en la red |
| Entrada | Hechos, síntomas, datos simbólicos | Volúmenes numéricos, video |
| Cómo "piensa" | Motor de inferencia | Forward pass |
| Explicabilidad | Alta | Baja (sin ayuda extra) |
| Cómo se construye | Entrevistas al experto | Entrenamiento con datos etiquetados |

## 5. Bloque: ¿Y si los juntamos? (Sistema híbrido)

**Muéstrale al usuario el flujo que queremos que entienda:**

```
Imagen 3D (MRI, CT, etc.)
        ↓
   CNN-3D detecta → "Lesión de 2.4 cm, región X, confianza 87%"
        ↓
   Esos resultados entran como HECHOS al Sistema Experto
        ↓
   El SE aplica reglas clínicas / industriales
        ↓
   Salida: recomendación + explicación de qué reglas se activaron
```

Dejas claro el reparto de roles:
- **CNN-3D** = los ojos (percepción)
- **Sistema Experto** = el cerebro con reglas (razonamiento y explicación)

Menciona brevemente Grad-CAM, SHAP o LIME como formas de "abrir un poco" la caja negra de la CNN. No hace falta implementarlos, solo nombrarlos.

## 6. Bloque: Incertidumbre

Un párrafo o dos comparando:
- En SE: factores de certeza, lógica difusa
- En CNN-3D: probabilidades del softmax, validación cruzada

Mensaje: ambos lidián con incertidumbre, pero con herramientas diferentes.

---

# PARTE 2 — Lo que tienes que armar en EJEMPLOS PRÁCTICOS

Acá no queremos teoría pura. Queremos **tarjetas o secciones** con casos del mundo real. Cada caso debe responder: problema → entrada → qué hace la tecnología → salida → limitaciones.

## Caso 1 — Medicina (MRI / CT)

**Construye una tarjeta o sección que explique:**
- Problema: detectar tumores o lesiones en imágenes 3D del cerebro
- CNN-3D: segmenta o clasifica en todo el volumen (no solo un corte 2D)
- SE: aplica reglas tipo *"Si lesión > X mm en zona crítica → biopsia / seguimiento"*
- Dataset de referencia: BraTS (mención, no hace falta descargarlo)
- Ilustración: volumen cerebral con zona resaltada

## Caso 2 — Industria

**Otra tarjeta:**
- Problema: defectos internos en piezas (poros, grietas)
- CNN-3D: detecta anomalías en el volumen escaneado
- SE: reglas de calidad *"Si defecto en zona estructural → rechazar lote"*

## Caso 3 — Video (dimensión temporal)

**Aclara algo que muchos confunden:**
- En video, la 3ª dimensión puede ser el **tiempo** (frames apilados)
- Ejemplo: reconocimiento de acciones, vigilancia
- El SE podría lanzar alertas según reglas sobre lo detectado

## Caso 4 — Sistema Experto PURO (para contrastar)

**Incluye un ejemplo SIN deep learning:**
- SIBCOMA (alimentos) o MYCIN (infecciones)
- Mensaje: aquí no hay píxeles, hay **síntomas y hechos simbólicos**
- No todo problema necesita una CNN

## Tabla resumen (tú la armas)

| Caso | Dato | Tecnología | ¿Híbrido? |
|------|------|------------|-----------|
| MRI tumoral | Volumen 3D | CNN-3D + SE | Sí |
| Calidad industrial | Volumen 3D | CNN-3D + SE | Sí |
| Acciones en video | Video T×H×W | CNN-3D | Opcional |
| Diagnóstico simbólico | Hechos clínicos | SE puro | No |

---

# PARTE 3 — Lo que tienes que PROGRAMAR en la parte PRÁCTICA

Esta es la sección donde más te vamos a evaluar en vivo. **Tiene que funcionar en el navegador, sin instalar nada, en una laptop del aula.**

## Demo A — Simulador de Sistema Experto (obligatorio)

**Necesito que programes un mini motor de reglas en JavaScript.**

La interfaz debe tener:
- Checkboxes o selects con hechos de ejemplo (dominio médico simplificado):
  - ¿Fiebre? ¿Tos? ¿Dolor torácico? ¿Opacidad en imagen? ¿Lesión > 2 cm?
- Botón **"Inferir"**
- Al hacer clic, muestra:
  1. La **conclusión** (ej: "Recomendar estudios adicionales")
  2. Las **reglas que se activaron**, una por una (módulo de explicación)
  3. Un **log paso a paso** del encadenamiento hacia adelante

**Requisitos técnicos:**
- Mínimo **8–10 reglas** de producción (SI condición ENTONCES conclusión)
- Código del motor comentado — el docente puede preguntar cómo funciona
- Si el usuario no marca nada, muestra un mensaje claro, no un error feo

## Demo B — Visualización CNN-3D (obligatorio al menos una opción)

**No necesitas entrenar un modelo real.** Con que simules bien, alcanza.

Elige una o combina:

**Opción 1 — Visualizador de volumen (recomendado)**
- Three.js o similar
- Volumen de ejemplo o datos sintéticos
- Cortes axial, coronal, sagital
- Simular detección con un bounding box o máscara fija

**Opción 2 — Animación del pipeline**
- Entrada → capas → salida, animado
- Educativo, sin backend

**Opción 3 — Link externo**
- Si no da el tiempo, enlace a notebook Kaggle/Colab
- Pero la demo en el sitio sigue siendo preferible

## Demo C — Flujo híbrido (MUY recomendado, esto cierra todo)

**Este es el momento "wow" de la exposición. Conéctalo tú.**

```
Paso 1 — Usuario hace clic en "Analizar volumen" (simulado)
         → Sale: "Lesión: 2.4 cm | Región: temporal izq. | Confianza: 87%"

Paso 2 — Esos valores se inyectan SOLOS como hechos en el simulador SE
         → El SE concluye: "Seguimiento neurológico en 30 días"
         → Muestra qué reglas se activaron y por qué
```

El visitante tiene que salir de ahí entendiendo: **la CNN detecta, el SE decide y explica.**

---

# PARTE 4 — Diseño: cómo quiero que se vea

No te compliques con un design system enorme, pero sí que se vea **profesional y actual**.

## Estilo

- Limpio, académico, no infantil
- Colores sugeridos:
  - Azul/índigo → tecnología
  - Verde/cyan → salud, datos
  - Gris → textos
  - Naranja/amarillo → alertas y callouts importantes
- Fuente sans-serif legible (Inter, Poppins, system-ui)
- Modo oscuro: opcional, solo si te da el tiempo
- Iconos en SVG, no emojis como iconografía principal

## Navegación y UX

- Menú sticky: Inicio | Teoría | Ejemplos | Práctica | Referencias
- Scroll suave entre secciones
- Botón "volver arriba" si la página es larga
- Responsive: que se vea bien en celular y laptop
- Al menos **3 diagramas**: arquitectura SE, pipeline CNN-3D, sistema híbrido
- Glosario colapsable al final: voxel, tensor, softmax, encadenamiento hacia adelante, etc.

## Accesibilidad (no lo dejes para el final)

- Contraste legible
- `alt` en imágenes
- Navegación con teclado
- Labels en inputs del simulador

---

# PARTE 5 — Stack y decisiones técnicas (tú eliges, pero con criterio)

| Qué | Te recomiendo | Si ya sabes otra cosa |
|-----|---------------|---------------------|
| HTML | Semántico (`header`, `main`, `section`, `article`) | — |
| CSS | Variables + Grid/Flexbox | Tailwind si te ahorra tiempo |
| JS | Vanilla | React/Vue solo si ya lo dominas |
| 3D | Three.js | Plotly, vtk.js |
| Diagramas | Mermaid o SVG inline | D3 si te animas |
| Deploy | GitHub Pages, Netlify o Vercel | Local con Live Server para la expo |

**Lo que NO quiero:**
- Framework pesado solo por moda
- Dependencias que fallen sin internet el día de la exposición
- Animaciones que maten una laptop con 4 GB de RAM

**Lo que SÍ quiero:**
- Que abra con doble clic o un `npm start` simple
- README claro para cualquiera del grupo
- Código ordenado en carpetas: `/css`, `/js`, `/assets`, `/data`

---

# PARTE 6 — Cierre del sitio (tú redactas el contenido)

## Conclusiones

Escribe 5–7 puntos que resuman lo aprendido. Tocar al menos:
1. SE y CNN-3D son complementarios, no iguales
2. CNN-3D = percepción de volúmenes
3. SE = razonamiento explicable
4. Los híbridos son tendencia real
5. La tecnología depende del problema, los datos y si necesitas explicar decisiones
6. Ambos sufren el cuello de botella de "conseguir conocimiento" (reglas vs etiquetas)
7. En salud e industria, la trazabilidad del SE sigue siendo valiosa

## Referencias

Incluye citas del material del curso:
- Saavedra Rondo — Sistemas Expertos
- Docs del repo del curso (arquitectura, inferencia, incertidumbre)
- Documentación PyTorch/TensorFlow para Conv3D
- BraTS u otro dataset si lo mencionas

## Créditos

- UNAMAD
- Curso: Sistemas Expertos
- Nombres del grupo (deja placeholders editables)
- Fecha: 15/06/2026

## Disclaimer (obligatorio)

En la parte práctica o al pie del sitio:

> *"Material educativo. No sustituye diagnóstico ni criterio profesional."*

---

# Lo que me tienes que entregar al terminar

1. **Página web funcionando** con teoría + ejemplos + práctica
2. **Código fuente** ordenado
3. **README.md** con:
   - Qué es el proyecto
   - Cómo correrlo en local
   - Estructura de carpetas
   - Stack usado
4. Texto en español, sin faltas graves
5. Al menos una captura para la presentación

---

# Cómo te vamos a evaluar (para que sepas las prioridades)

| Qué miramos | Peso |
|-------------|------|
| ¿Quedó claro que SE ≠ CNN-3D? | 25% |
| Calidad de la teoría | 20% |
| Ejemplos prácticos bien explicados | 20% |
| Demo funcionando en vivo | 20% |
| Diseño y responsive | 10% |
| README y referencias | 5% |

**Si algo se complica por tiempo, prioriza en este orden:**
1. Aclaración SE vs CNN-3D
2. Simulador de reglas funcionando
3. Flujo híbrido simulado
4. Visualizador 3D
5. Modo oscuro y extras

---

# Orden en el que te sugiero trabajar

No te lances a la demo sin la estructura. Ve en este orden:

```
1. HTML base + menú + secciones vacías
2. Estilos generales (que ya se vea bien)
3. Contenido teórico completo + diagramas + tablas
4. Tarjetas de ejemplos prácticos
5. Motor de reglas del SE en JS
6. Demo visual CNN-3D (simulada)
7. Conectar CNN simulada → hechos → SE (flujo híbrido)
8. Conclusiones, referencias, glosario, README
9. Probar en móvil, probar en la laptop que llevarán a la expo
```

---

# Cosas que NO debes hacer

- ❌ Presentar CNN-3D como si fuera un Sistema Experto
- ❌ Copiar Wikipedia tal cual
- ❌ Usar datos médicos reales de pacientes
- ❌ Prometer diagnósticos reales desde la demo
- ❌ Depender de GPU o backend obligatorio para la demo
- ❌ Dejar la parte práctica para el último día

---

# Bonus: guion para quien presente en vivo

Si puedes, deja una sección colapsable "Notas para el expositor" con esto:

| Minuto | Qué decir / qué mostrar |
|--------|-------------------------|
| 0–1 | "CNN-3D no es un sistema experto. Hoy vamos a ver por qué." |
| 1–5 | Recorrer teoría: componentes del SE, qué hace CNN-3D, tabla comparativa |
| 5–8 | Mostrar ejemplos: MRI, industria, SE puro |
| 8–13 | **Demo en vivo:** flujo híbrido completo |
| 13–15 | Conclusiones y preguntas |

---

# Mensaje final para ti, ingeniero

No necesitamos el sitio más fancy de GitHub. Necesitamos un sitio que **enseñe bien**, que **funcione el día de la expo** y que deje en claro tres ideas:

1. Qué es un Sistema Experto  
2. Qué es una CNN-3D  
3. Cómo pueden trabajar juntos **sin ser lo mismo**

Si logras eso con código limpio, una demo que corra sin drama y un diseño que no dé vergüenza en presentación, el trabajo está hecho.

Cualquier duda sobre el contenido académico, pregunta al grupo. Sobre la implementación, usa tu criterio — pero no te saltes la demo híbrida ni la tabla comparativa.

**¡Éxitos con el desarrollo!** 🚀

---

*Brief redactado para el equipo de desarrollo — Proyecto Sistemas Expertos UNAMAD — Exposición 15/06/2026*
