"""
ContenidoHibrido.py
Responsabilidad: caso real y datos de la diapositiva 09 — Sistema Híbrido.
"""


class ContenidoHibrido:
    @staticmethod
    def ObtenerCaso():
        return {
            "Id": "mri-tumor",
            "Titulo": "Caso real: sospecha de glioma cerebral",
            "Subtitulo": "Hospital regional · Neurología",
            "Paciente": "María L., 58 años",
            "MotivoConsulta": "Cefalea intensa desde hace 3 semanas y episodios de confusión breve.",
            "Estudio": "Resonancia magnética cerebral multimodal (BraTS)",
            "Volumen": "240×240×155 voxels · T1, T1ce, T2, FLAIR",
            "RolCnn": (
                "La CNN-3D analiza el volumen completo y localiza la lesión: "
                "tamaño, región y nivel de confianza."
            ),
            "RolSe": (
                "El Sistema Experto recibe esos hallazgos como hechos y aplica "
                "reglas clínicas para recomendar la acción médica con explicación."
            ),
            "MensajeHibrido": (
                "Ninguno reemplaza al otro: la CNN ve la imagen, el SE decide "
                "y justifica el protocolo. Juntos forman el diagnóstico híbrido."
            ),
            "VeredictoEsperado": (
                "Derivar a neurología con prioridad — lesión > 2 cm en región temporal crítica."
            ),
        }

    @staticmethod
    def ObtenerPasosPipeline():
        return [
            {
                "Id": "entrada",
                "Titulo": "1. MRI real",
                "Icono": "🏥",
                "Descripcion": "El hospital envía el estudio 3D del paciente.",
                "Color": "neutro",
                "Responsable": "Equipo clínico",
            },
            {
                "Id": "cnn",
                "Titulo": "2. CNN-3D",
                "Icono": "👁",
                "Descripcion": "La red detecta y cuantifica la lesión en el volumen.",
                "Color": "cnn",
                "Responsable": "Ojos del sistema",
            },
            {
                "Id": "hechos",
                "Titulo": "3. Puente",
                "Icono": "🔄",
                "Descripcion": "La salida de la CNN se convierte en hechos para el SE.",
                "Color": "puente",
                "Responsable": "Traducción automática",
            },
            {
                "Id": "se",
                "Titulo": "4. SE",
                "Icono": "🧠",
                "Descripcion": "El motor aplica reglas clínicas sobre esos hechos.",
                "Color": "se",
                "Responsable": "Cerebro del sistema",
            },
            {
                "Id": "veredicto",
                "Titulo": "5. Decisión",
                "Icono": "✅",
                "Descripcion": "Veredicto conjunto: detección + recomendación explicable.",
                "Color": "oro",
                "Responsable": "CNN + SE juntos",
            },
        ]

    @staticmethod
    def ObtenerMapaHechosLegibles():
        return {
            "LesionGrande": "Lesión mayor a 2 cm (hallazgo CNN)",
            "RegionCritica": "Zona neurológica crítica — lóbulo temporal",
            "OpacidadImagen": "Opacidad visible en el volumen MRI",
            "ConfianzaAlta": "Confianza CNN ≥ 85 %",
            "Fiebre": "Fiebre reportada",
            "Tos": "Tos reportada",
            "DolorToracico": "Dolor torácico reportado",
        }

    @staticmethod
    def ObtenerHechosLegibles(Hechos):
        Mapa = ContenidoHibrido.ObtenerMapaHechosLegibles()
        return [
            Mapa[Clave]
            for Clave, Valor in (Hechos or {}).items()
            if Valor is True and Clave in Mapa
        ]

    @staticmethod
    def ObtenerTraduccionCnn(Hechos):
        """Explica en lenguaje clínico cómo la CNN alimenta al SE."""
        Legibles = ContenidoHibrido.ObtenerHechosLegibles(Hechos)
        if not Legibles:
            return "Sin hechos activos para el motor SE."
        return (
            "La CNN encontró la lesión; el sistema traduce eso a hechos que "
            f"el SE puede evaluar: {'; '.join(Legibles)}."
        )
