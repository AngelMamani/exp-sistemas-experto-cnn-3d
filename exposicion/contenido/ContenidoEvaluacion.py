"""
ContenidoEvaluacion.py
Responsabilidad: datos de la diapositiva 10 — Evaluación del sistema.
"""


class ContenidoEvaluacion:
    @staticmethod
    def ObtenerIntro():
        return {
            "Titulo": "¿Cómo evaluamos el sistema completo?",
            "Texto": (
                "No se juzga la CNN-3D y el Sistema Experto con la misma vara. "
                "Cada componente tiene métricas propias; el híbrido se mide fin a fin."
            ),
        }

    @staticmethod
    def ObtenerDimensiones():
        return [
            {
                "Id": "cnn",
                "Letra": "A",
                "Titulo": "CNN-3D — Técnico",
                "Subtitulo": "¿Qué tan bien ve el volumen?",
                "Color": "cnn",
                "Icono": "👁",
                "Descripcion": (
                    "Mide la calidad de detección y segmentación en datos 3D. "
                    "Se usa un conjunto de prueba con casos etiquetados (simulación BraTS)."
                ),
                "Criterios": [
                    {"Nombre": "Precision", "Valor": "91%", "Detalle": "De lo que detecta, cuánto es correcto."},
                    {"Nombre": "Recall", "Valor": "88%", "Detalle": "De los tumores reales, cuántos encuentra."},
                    {"Nombre": "F1-Score", "Valor": "89%", "Detalle": "Balance entre precision y recall."},
                    {"Nombre": "IoU 3D", "Valor": "76%", "Detalle": "Solapamiento volumen predicho vs. real."},
                ],
                "Ejemplo": "En 200 volúmenes MRI: 44 VP, 5 FP, 6 FN — rendimiento clínico aceptable.",
            },
            {
                "Id": "se",
                "Letra": "B",
                "Titulo": "SE — Lógica y dominio",
                "Subtitulo": "¿Las reglas razonan bien?",
                "Color": "se",
                "Icono": "🧠",
                "Descripcion": (
                    "Evalúa si el motor de inferencia es consistente, seguro y "
                    "aceptado por especialistas — no usa matrices de confusión."
                ),
                "Criterios": [
                    {"Nombre": "Consistencia de reglas", "Valor": "94%", "Detalle": "Mismos hechos → misma conclusión."},
                    {"Nombre": "Prueba Turing clínica", "Valor": "87%", "Detalle": "Médicos no distinguen SE vs. experto."},
                    {"Nombre": "Seguridad del dominio", "Valor": "92%", "Detalle": "Sin contradicciones entre reglas."},
                    {"Nombre": "Explicabilidad", "Valor": "Alta", "Detalle": "Cada decisión muestra reglas activadas."},
                ],
                "Ejemplo": "Caso MYCIN: con fiebre + tos + dolor torácico activa R6 de forma trazable.",
            },
            {
                "Id": "hibrido",
                "Letra": "C",
                "Titulo": "Sistema híbrido — Fin a fin",
                "Subtitulo": "¿Funciona CNN + SE juntos?",
                "Color": "hibrido",
                "Icono": "⚡",
                "Descripcion": (
                    "Mide la experiencia completa: desde el volumen MRI hasta "
                    "la recomendación clínica explicable que ve el médico."
                ),
                "Criterios": [
                    {"Nombre": "Tiempo de respuesta", "Valor": "12.4 s", "Detalle": "CNN + traducción + inferencia SE."},
                    {"Nombre": "Usabilidad", "Valor": "4.2/5", "Detalle": "Flujo claro para el operador clínico."},
                    {"Nombre": "Explicabilidad global", "Valor": "Alta", "Detalle": "Detección CNN + reglas SE en un solo informe."},
                    {"Nombre": "Precisión del flujo", "Valor": "91%", "Detalle": "Coincide con veredicto esperado del caso."},
                ],
                "Ejemplo": "Caso María L.: CNN detecta glioma → SE deriva a neurología — veredicto correcto.",
            },
        ]
