"""
ContenidoComparacion.py
Responsabilidad: datos de la diapositiva 08 — Comparación SE vs CNN-3D.
"""


class ContenidoComparacion:
    @staticmethod
    def ObtenerCriterios():
        return [
            {
                "Id": "paradigma",
                "Criterio": "Paradigma",
                "Icono": "🧩",
                "Se": "Simbólico (reglas)",
                "Cnn": "Deep Learning",
                "DetalleSe": (
                    "Representa el conocimiento como reglas SI-ENTONCES y hechos. "
                    "El motor encadena conclusiones de forma explícita."
                ),
                "DetalleCnn": (
                    "Representa el conocimiento como pesos en capas Conv3D. "
                    "La decisión emerge del entrenamiento con miles de ejemplos."
                ),
                "Analogia": "SE = manual de procedimientos · CNN = visión entrenada con casos",
            },
            {
                "Id": "conocimiento",
                "Criterio": "Conocimiento",
                "Icono": "📚",
                "Se": "Explícito",
                "Cnn": "Implícito (pesos)",
                "DetalleSe": (
                    "Un experto declara las reglas. Puedes leerlas, auditarlas "
                    "y modificarlas sin reentrenar toda la red."
                ),
                "DetalleCnn": (
                    "El saber queda distribuido en millones de parámetros. "
                    "Cambiar el comportamiento suele requerir nuevo entrenamiento."
                ),
                "Analogia": "SE = libro abierto · CNN = memoria distribuida",
            },
            {
                "Id": "entrada",
                "Criterio": "Entrada",
                "Icono": "📥",
                "Se": "Hechos, síntomas, datos",
                "Cnn": "Volúmenes 3D, video",
                "DetalleSe": (
                    "Recibe síntomas, lecturas de sensores o salidas de otra IA "
                    "convertidas en hechos estructurados."
                ),
                "DetalleCnn": (
                    "Recibe tensores 3D: MRI, CT, clips de video apilados "
                    "en ancho × alto × profundidad (o tiempo)."
                ),
                "Analogia": "SE = formulario clínico · CNN = resonancia completa",
            },
            {
                "Id": "explicabilidad",
                "Criterio": "Explicabilidad",
                "Icono": "💬",
                "Se": "Alta — trazable",
                "Cnn": "Baja — caja negra",
                "DetalleSe": (
                    "Muestra qué reglas se activaron y por qué. "
                    "Ideal cuando se exige justificar cada decisión."
                ),
                "DetalleCnn": (
                    "Devuelve probabilidades y mapas de activación, "
                    "pero no una cadena lógica legible para el médico."
                ),
                "Analogia": "SE = informe con pasos · CNN = porcentaje de confianza",
            },
            {
                "Id": "rol",
                "Criterio": "Rol en el sistema",
                "Icono": "🎯",
                "Se": "Cerebro / decisión",
                "Cnn": "Ojos / percepción",
                "DetalleSe": (
                    "Evalúa, cruza guías clínicas y emite recomendaciones "
                    "con argumentos auditables."
                ),
                "DetalleCnn": (
                    "Detecta lesiones, acciones o defectos en datos volumétricos "
                    "con alta sensibilidad visual."
                ),
                "Analogia": "Juntos: CNN ve → SE decide y explica",
            },
        ]

    @staticmethod
    def ObtenerEscenarios():
        return [
            {
                "Id": "se",
                "Titulo": "Prioriza SE",
                "Icono": "🧠",
                "Cuando": "Necesitas explicar cada decisión con reglas auditables.",
                "Ejemplo": "Protocolo clínico, diagnóstico con trazabilidad legal.",
            },
            {
                "Id": "cnn",
                "Titulo": "Prioriza CNN-3D",
                "Icono": "👁",
                "Cuando": "El patrón visual en 3D es difícil de codificar a mano.",
                "Ejemplo": "Segmentar tumor en MRI, detectar caídas en video.",
            },
            {
                "Id": "hibrido",
                "Titulo": "Sistema híbrido",
                "Icono": "⚡",
                "Cuando": "Quieres lo mejor de ambos mundos en producción.",
                "Ejemplo": "CNN detecta lesión → SE aplica guías y decide tratamiento.",
            },
        ]

    @staticmethod
    def ObtenerComparacionTabla():
        """Compatibilidad con tabla simple."""
        return [
            {
                "Criterio": C["Criterio"],
                "Se": C["Se"],
                "Cnn": C["Cnn"],
            }
            for C in ContenidoComparacion.ObtenerCriterios()
        ]
