"""
ContenidoSistemaExperto.py
Responsabilidad: contenido de la diapositiva 02 — Sistema Experto.
"""


class ContenidoSistemaExperto:
    @staticmethod
    def ObtenerDefinicion():
        return {
            "Titulo": "¿Qué es un Sistema Experto?",
            "Texto": (
                "Es un programa de inteligencia artificial que imita el razonamiento de un "
                "especialista humano. No adivina: aplica reglas SI-ENTONCES escritas por "
                "expertos y puede explicar cada paso de su decisión."
            ),
            "Formula": "Hechos + Reglas + Motor de inferencia = Conclusión explicable",
        }

    @staticmethod
    def ObtenerPuntosClave():
        return [
            {
                "Titulo": "¿Qué problema resuelve?",
                "Texto": (
                    "Captura el conocimiento de un médico, ingeniero o auditor en reglas formales. "
                    "Así el sistema puede diagnosticar, recomendar o decidir en un dominio acotado."
                ),
            },
            {
                "Titulo": "¿Cómo razona?",
                "Texto": (
                    "Compara los hechos actuales (síntomas, lecturas) con las reglas. "
                    "Si todas las condiciones de una regla se cumplen, la activa y obtiene una conclusión."
                ),
            },
            {
                "Titulo": "¿Por qué importa hoy?",
                "Texto": (
                    "En medicina e industria se exige trazabilidad: saber qué regla generó cada decisión. "
                    "Eso lo diferencia de una red neuronal opaca."
                ),
            },
        ]

    @staticmethod
    def ObtenerComponentes():
        return [
            {
                "Id": "interfaz",
                "Titulo": "Interfaz de usuario",
                "Icono": "🖥️",
                "Descripcion": "El médico u operador ingresa síntomas, datos o respuestas al sistema.",
                "Ejemplo": "Formulario: fiebre=Sí, tos=Sí → pantalla de diagnóstico.",
            },
            {
                "Id": "base-hechos",
                "Titulo": "Base de hechos",
                "Icono": "📋",
                "Descripcion": "Almacena la información actual del caso: lo que se sabe en este momento.",
                "Ejemplo": "Hechos: Fiebre=True, Tos=True, DolorToracico=True.",
            },
            {
                "Id": "base-conocimiento",
                "Titulo": "Base de conocimiento",
                "Icono": "📚",
                "Descripcion": "Contiene las reglas SI-ENTONCES y el conocimiento del dominio.",
                "Ejemplo": "SI fiebre Y tos → ENTONCES sospecha respiratoria.",
            },
            {
                "Id": "motor-inferencia",
                "Titulo": "Motor de inferencia",
                "Icono": "⚙️",
                "Descripcion": "Evalúa reglas contra hechos. Es el «cerebro» que encadena el razonamiento.",
                "Ejemplo": "Recorre R1…R10, activa las que cumplen condiciones.",
            },
            {
                "Id": "explicacion",
                "Titulo": "Módulo de explicación",
                "Icono": "💬",
                "Descripcion": "Muestra qué reglas se activaron y por qué. Genera confianza en el usuario.",
                "Ejemplo": "Se activó R6 porque fiebre, tos y dolor torácico = Sí.",
            },
            {
                "Id": "adquisicion",
                "Titulo": "Adquisición del conocimiento",
                "Icono": "🎤",
                "Descripcion": "Proceso de entrevistar al experto y codificar su saber en reglas.",
                "Ejemplo": "Médico explica criterios → ingeniero escribe reglas en el sistema.",
            },
        ]

    @staticmethod
    def ObtenerTiposInferencia():
        return [
            {
                "Id": "adelante",
                "Titulo": "Encadenamiento adelante",
                "Descripcion": (
                    "Parte de los hechos conocidos y aplica reglas hasta llegar a conclusiones. "
                    "Es el modo que usa nuestra simulación."
                ),
                "Analogia": "Como un detective: tiene pistas y deduce qué conclusiones se siguen.",
            },
            {
                "Id": "atras",
                "Titulo": "Encadenamiento atrás",
                "Descripcion": (
                    "Parte de una hipótesis (meta) y busca hechos que la confirmen o la descarten."
                ),
                "Analogia": "Como un médico: sospecha neumonía y pregunta síntomas para confirmar.",
            },
        ]

    @staticmethod
    def ObtenerPasosFlujo():
        return [
            {
                "Id": "hechos",
                "Titulo": "1. Ingresar hechos",
                "Descripcion": "El usuario o sensores cargan la base de hechos con datos del caso.",
                "Ejemplo": "Paciente: fiebre alta, tos, dolor al respirar.",
            },
            {
                "Id": "reglas",
                "Titulo": "2. Cargar reglas",
                "Descripcion": "El motor lee la base de conocimiento con reglas ordenadas por prioridad.",
                "Ejemplo": "10 reglas clínicas listas para evaluar.",
            },
            {
                "Id": "evaluar",
                "Titulo": "3. Evaluar SI-ENTONCES",
                "Descripcion": "Para cada regla pregunta: ¿se cumplen TODAS las condiciones?",
                "Ejemplo": "R6: ¿Fiebre=Y Y Tos=Y Y DolorTorácico=Y?",
            },
            {
                "Id": "activar",
                "Titulo": "4. Activar reglas",
                "Descripcion": "Las reglas que cumplen se activan y generan conclusiones en el log.",
                "Ejemplo": "R6 activada → «Cuadro respiratorio completo».",
            },
            {
                "Id": "explicar",
                "Titulo": "5. Explicar resultado",
                "Descripcion": "El módulo de explicación muestra el razonamiento paso a paso al usuario.",
                "Ejemplo": "Timeline: qué reglas se evaluaron y cuáles se activaron.",
            },
        ]

    @staticmethod
    def ObtenerCasoReal():
        return {
            "Id": "mycin",
            "Titulo": "MYCIN",
            "Subtitulo": "Diagnóstico de infecciones bacterianas",
            "Dominio": "Medicina",
            "Anio": "1972 · Stanford",
            "Descripcion": (
                "MYCIN fue un sistema experto pionero para diagnosticar infecciones de sangre y cerebro. "
                "Usaba cientos de reglas con factores de certeza. Aquí simulamos un caso respiratorio "
                "con el motor Django del proyecto."
            ),
            "Hechos": {
                "Fiebre": True,
                "Tos": True,
                "DolorToracico": True,
                "OpacidadImagen": False,
                "LesionGrande": False,
                "RegionCritica": False,
                "ConfianzaAlta": False,
            },
            "HechosLegibles": [
                "Fiebre alta (39 °C)",
                "Tos persistente desde hace 3 días",
                "Dolor torácico al respirar profundo",
            ],
            "ResultadoEsperado": "Cuadro respiratorio completo — evaluar hospitalización.",
            "Sintomas": [
                {"Clave": "Fiebre", "Etiqueta": "Fiebre alta", "Valor": True},
                {"Clave": "Tos", "Etiqueta": "Tos persistente", "Valor": True},
                {"Clave": "DolorToracico", "Etiqueta": "Dolor torácico", "Valor": True},
                {"Clave": "OpacidadImagen", "Etiqueta": "Opacidad en imagen", "Valor": False},
            ],
        }
