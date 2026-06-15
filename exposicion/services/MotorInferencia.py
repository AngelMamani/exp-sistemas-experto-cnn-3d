"""
MotorInferencia.py
Responsabilidad: motor de reglas con encadenamiento hacia adelante.
"""


class MotorInferencia:
    def __init__(self):
        self.Reglas = [
            {
                "Id": "R1",
                "Nombre": "Lesión de tamaño significativo",
                "Condiciones": {"LesionGrande": True},
                "Conclusion": "Lesión mayor a 2 cm: requiere evaluación especializada.",
                "Prioridad": 3,
            },
            {
                "Id": "R2",
                "Nombre": "Lesión en zona crítica",
                "Condiciones": {"LesionGrande": True, "RegionCritica": True},
                "Conclusion": "Lesión en región crítica: derivar a neurología con prioridad.",
                "Prioridad": 5,
            },
            {
                "Id": "R3",
                "Nombre": "Seguimiento neurológico",
                "Condiciones": {"LesionGrande": True, "RegionCritica": False},
                "Conclusion": "Recomendar seguimiento neurológico en 30 días.",
                "Prioridad": 4,
            },
            {
                "Id": "R4",
                "Nombre": "Opacidad con dolor",
                "Condiciones": {"OpacidadImagen": True, "DolorToracico": True},
                "Conclusion": "Opacidad con dolor torácico: estudios urgentes.",
                "Prioridad": 4,
            },
            {
                "Id": "R5",
                "Nombre": "Síndrome respiratorio",
                "Condiciones": {"Fiebre": True, "Tos": True},
                "Conclusion": "Posible infección respiratoria: solicitar radiografía.",
                "Prioridad": 2,
            },
            {
                "Id": "R6",
                "Nombre": "Cuadro respiratorio completo",
                "Condiciones": {"Fiebre": True, "Tos": True, "DolorToracico": True},
                "Conclusion": "Cuadro respiratorio completo: evaluar hospitalización.",
                "Prioridad": 5,
            },
            {
                "Id": "R7",
                "Nombre": "Fiebre aislada",
                "Condiciones": {"Fiebre": True, "Tos": False, "DolorToracico": False},
                "Conclusion": "Fiebre sin síntomas respiratorios: observación 48 h.",
                "Prioridad": 1,
            },
            {
                "Id": "R8",
                "Nombre": "Opacidad sin dolor",
                "Condiciones": {"OpacidadImagen": True, "DolorToracico": False},
                "Conclusion": "Opacidad sin dolor: correlacionar y repetir estudio.",
                "Prioridad": 2,
            },
            {
                "Id": "R9",
                "Nombre": "Sin indicadores de riesgo",
                "Condiciones": {
                    "Fiebre": False,
                    "LesionGrande": False,
                    "DolorToracico": False,
                    "OpacidadImagen": False,
                },
                "Conclusion": "Sin indicadores de riesgo alto: control ambulatorio.",
                "Prioridad": 0,
            },
            {
                "Id": "R10",
                "Nombre": "Alta confianza CNN",
                "Condiciones": {"ConfianzaAlta": True, "LesionGrande": True},
                "Conclusion": "Detección CNN con alta confianza: validar con protocolo clínico.",
                "Prioridad": 3,
            },
        ]

    def EvaluarCondiciones(self, Regla, Hechos):
        return all(
            Hechos.get(Clave, False) is ValorEsperado
            for Clave, ValorEsperado in Regla["Condiciones"].items()
        )

    def Inferir(self, Hechos):
        Log = []
        ReglasActivadas = []
        Conclusiones = []

        Log.append(
            {
                "Tipo": "inicio",
                "Mensaje": "Motor de inferencia — encadenamiento hacia adelante",
            }
        )
        Log.append(
            {
                "Tipo": "hechos",
                "Mensaje": f"Hechos: {self._FormatearHechos(Hechos)}",
            }
        )

        for Regla in sorted(self.Reglas, key=lambda R: R["Prioridad"], reverse=True):
            Activa = self.EvaluarCondiciones(Regla, Hechos)
            Log.append(
                {
                    "Tipo": "evaluacion",
                    "Mensaje": f"{Regla['Id']} ({Regla['Nombre']}): {'ACTIVADA' if Activa else 'no aplica'}",
                    "ReglaId": Regla["Id"] if Activa else None,
                }
            )
            if Activa:
                ReglasActivadas.append(Regla)
                Conclusiones.append(Regla["Conclusion"])
                Log.append(
                    {
                        "Tipo": "regla",
                        "Mensaje": Regla["Conclusion"],
                        "ReglaId": Regla["Id"],
                    }
                )

        if not Conclusiones:
            Conclusiones.append(
                "No se activó ninguna regla. Revise los hechos o consulte al especialista."
            )

        Log.append(
            {
                "Tipo": "fin",
                "Mensaje": f"Inferencia completada — {len(ReglasActivadas)} regla(s) activa(s).",
            }
        )

        return {
            "ConclusionPrincipal": Conclusiones[0],
            "Conclusiones": Conclusiones,
            "ReglasActivadas": ReglasActivadas,
            "Log": Log,
        }

    def HechosDesdeCnn(self, ResultadoCnn):
        return {
            "Fiebre": False,
            "Tos": False,
            "DolorToracico": False,
            "OpacidadImagen": ResultadoCnn.get("Opacidad", False),
            "LesionGrande": ResultadoCnn.get("TamanoLesion", 0) >= 2.0,
            "RegionCritica": ResultadoCnn.get("RegionCritica", False),
            "ConfianzaAlta": ResultadoCnn.get("Confianza", 0) >= 85,
        }

    def _FormatearHechos(self, Hechos):
        Activos = [K for K, V in Hechos.items() if V is True]
        return ", ".join(Activos) if Activos else "ninguno"
