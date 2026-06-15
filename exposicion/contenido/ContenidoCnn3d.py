"""
ContenidoCnn3d.py
Responsabilidad: contenido educativo del módulo CNN-3D.
"""


class ContenidoCnn3d:
    @staticmethod
    def ObtenerDefinicion():
        return {
            "Titulo": "¿Qué es una CNN-3D?",
            "Texto": (
                "Es una red neuronal convolucional que procesa datos con tres dimensiones espaciales "
                "—o espacio más tiempo— como resonancias magnéticas, tomografías o videos. "
                "Aprende patrones visuales complejos sin reglas escritas a mano."
            ),
            "Formula": "Volumen 3D + Capas Conv3D + Aprendizaje profundo = Detección automática",
        }

    @staticmethod
    def ObtenerPuntosClave():
        return [
            {
                "Titulo": "¿Qué hace la CNN-3D?",
                "Texto": (
                    "Analiza volúmenes completos (cortes apilados) o secuencias de video. "
                    "Detecta bordes, texturas y formas en profundidad — algo imposible con una sola imagen 2D."
                ),
            },
            {
                "Titulo": "¿Cómo aprende?",
                "Texto": (
                    "Se entrena con miles de ejemplos etiquetados. Los filtros Conv3D se deslizan en X, Y y Z "
                    "extrayendo características hasta clasificar: tumor, acción, defecto, etc."
                ),
            },
            {
                "Titulo": "¿Cuál es su límite?",
                "Texto": (
                    "Es una «caja negra»: da probabilidades pero no explica con reglas SI-ENTONCES. "
                    "Por eso en medicina e industria se combina con un Sistema Experto."
                ),
            },
        ]

    @staticmethod
    def ObtenerPasosPipeline():
        return [
            {
                "Id": "entrada",
                "Titulo": "Volumen 3D",
                "Descripcion": "Entrada: pila de cortes (MRI, CT) o frames de video apilados en el tiempo.",
                "Ejemplo": "Ej: 128×128×64 voxels de un cerebro completo.",
            },
            {
                "Id": "conv3d",
                "Titulo": "Conv3D",
                "Descripcion": "Filtros 3D detectan patrones locales en volumen: bordes, manchas, texturas.",
                "Ejemplo": "Kernel 3×3×3 recorre todo el volumen extrayendo características.",
            },
            {
                "Id": "pooling",
                "Titulo": "ReLU + Pooling",
                "Descripcion": "ReLU activa neuronas; pooling reduce tamaño conservando lo importante.",
                "Ejemplo": "MaxPool3D: de 64×64×32 pasa a 32×32×16 manteniendo rasgos fuertes.",
            },
            {
                "Id": "densas",
                "Titulo": "Capas densas",
                "Descripcion": "Las características se aplanan y capas fully-connected integran la decisión global.",
                "Ejemplo": "Vector de 512 valores → capas ocultas → salida.",
            },
            {
                "Id": "salida",
                "Titulo": "Clasificación",
                "Descripcion": "Softmax devuelve probabilidades por clase: tumor benigno/maligno, acción, defecto.",
                "Ejemplo": "Tumor maligno: 87% · Benigno: 9% · Normal: 4%.",
            },
        ]

    @staticmethod
    def ObtenerComparacion2d3d():
        return [
            {
                "Id": "2d",
                "Titulo": "CNN 2D",
                "Descripcion": "Procesa una imagen plana. Ideal para fotos, radiografías simples o un solo corte.",
                "Analogia": "Como mirar una sola foto de un objeto.",
            },
            {
                "Id": "3d",
                "Titulo": "CNN 3D",
                "Descripcion": "Procesa volumen o video. Captura profundidad y evolución temporal.",
                "Analogia": "Como recorrer el objeto capa por capa o frame por frame.",
            },
        ]

    @staticmethod
    def ObtenerCasosReales():
        return [
            {
                "Id": "mri-tumor",
                "Titulo": "BraTS · Tumor cerebral",
                "Subtitulo": "Segmentación en resonancia magnética",
                "Dominio": "Medicina",
                "Anio": "2015–actual",
                "Descripcion": (
                    "El desafío BraTS usa CNN-3D y U-Net 3D para segmentar gliomas en MRI multimodal "
                    "(T1, T1ce, T2, FLAIR). Detecta núcleo tumoral, edema y zona activa."
                ),
                "EntradaLegible": [
                    "Volumen MRI: 240×240×155 voxels",
                    "Modalidades: T1, T1ce, T2, FLAIR",
                    "Paciente con sospecha de glioma",
                ],
                "ResultadoEsperado": "Lesión 2.4 cm en región temporal — confianza 87%.",
                "SalidaCnn": {
                    "TamanoLesion": 2.4,
                    "Region": "temporal izquierda",
                    "RegionCritica": True,
                    "Confianza": 87,
                    "Opacidad": True,
                    "Unidad": "cm",
                    "Clase": "Glioma de alto grado",
                },
            },
            {
                "Id": "video-acciones",
                "Titulo": "C3D / I3D",
                "Subtitulo": "Reconocimiento de acciones en video",
                "Dominio": "Visión por computadora",
                "Anio": "2012–actual",
                "Descripcion": (
                    "Redes como C3D e I3D apilan frames como un volumen 3D (ancho × alto × tiempo) "
                    "para clasificar acciones: caminar, caer, patear, gestos en vigilancia o deportes."
                ),
                "EntradaLegible": [
                    "Clip de video: 16 frames consecutivos",
                    "Resolución: 112×112 por frame",
                    "Tarea: detectar caída de persona",
                ],
                "ResultadoEsperado": "Acción detectada: CAÍDA — confianza 92%.",
                "SalidaCnn": {
                    "TamanoLesion": 0,
                    "Region": "escena completa",
                    "RegionCritica": True,
                    "Confianza": 92,
                    "Opacidad": False,
                    "Unidad": "acción",
                    "Clase": "Caída detectada",
                },
            },
            {
                "Id": "ct-industrial",
                "Titulo": "CT industrial",
                "Subtitulo": "Defectos internos en piezas metálicas",
                "Dominio": "Industria",
                "Anio": "Actual",
                "Descripcion": (
                    "Tomografía computarizada industrial genera volúmenes 3D de piezas. "
                    "CNN-3D localiza poros, grietas o inclusiones que no se ven a simple vista."
                ),
                "EntradaLegible": [
                    "Volumen CT: pieza de aleación aeronáutica",
                    "Resolución: 512×512×300 voxels",
                    "Inspección de línea de producción",
                ],
                "ResultadoEsperado": "Defecto interno 1.8 mm — zona estructural crítica.",
                "SalidaCnn": {
                    "TamanoLesion": 1.8,
                    "Region": "ala estructural",
                    "RegionCritica": True,
                    "Confianza": 94,
                    "Opacidad": True,
                    "Unidad": "mm",
                    "Clase": "Grieta interna",
                },
            },
        ]

    @staticmethod
    def ObtenerSalidaCnnPorCaso(CasoId):
        for Caso in ContenidoCnn3d.ObtenerCasosReales():
            if Caso["Id"] == CasoId:
                return dict(Caso["SalidaCnn"])
        return dict(ContenidoCnn3d.ObtenerCasosReales()[0]["SalidaCnn"])
