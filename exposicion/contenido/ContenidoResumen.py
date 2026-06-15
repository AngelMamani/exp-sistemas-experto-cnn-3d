"""
ContenidoResumen.py
Responsabilidad: datos de la diapositiva 12 — Cierre.
"""


class ContenidoResumen:
    @staticmethod
    def ObtenerPilares():
        return [
            {
                "Id": "cnn",
                "Icono": "👁",
                "Titulo": "CNN-3D",
                "Texto": "Los ojos que perciben el volumen MRI y localizan la lesión.",
                "Color": "cnn",
            },
            {
                "Id": "se",
                "Icono": "🧠",
                "Titulo": "Sistema Experto",
                "Texto": "El cerebro que aplica reglas clínicas y explica cada decisión.",
                "Color": "se",
            },
            {
                "Id": "hibrido",
                "Icono": "⚡",
                "Titulo": "Híbrido",
                "Texto": "CNN ve + SE decide — diagnóstico completo y trazable.",
                "Color": "hibrido",
            },
            {
                "Id": "eval",
                "Icono": "📊",
                "Titulo": "Evaluación",
                "Texto": "Métricas técnicas, lógicas y de experiencia fin a fin.",
                "Color": "eval",
            },
        ]

    @staticmethod
    def ObtenerMensajeFinal():
        return (
            "No te agobies: son complementarios, no competidores. "
            "La CNN-3D amplía la visión; el SE ordena la decisión clínica."
        )
