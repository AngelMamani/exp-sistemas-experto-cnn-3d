/**
 * VisualizadorCnn.js
 * Responsabilidad: renderizar volumen 3D simulado en canvas.
 */
class VisualizadorCnn {
    constructor(CanvasId) {
        this.Canvas = document.getElementById(CanvasId);
        if (!this.Canvas) return;

        this.Contexto = this.Canvas.getContext('2d');
        this.Plano = 'axial';
        this.IndiceCorte = 50;
        this.Tamano = 64;
        this.Lesion = { x: 38, y: 32, z: 32, radio: 8 };

        this._InicializarControles();
        this.Dibujar();
    }

    _InicializarControles() {
        const Select = document.getElementById('planoVolumen');
        const Slider = document.getElementById('sliderCorte');
        const Valor = document.getElementById('valorCorte');

        Select?.addEventListener('change', (E) => {
            this.Plano = E.target.value;
            this.Dibujar();
        });

        Slider?.addEventListener('input', (E) => {
            this.IndiceCorte = parseInt(E.target.value, 10);
            if (Valor) Valor.textContent = this.IndiceCorte;
            this.Dibujar();
        });
    }

    _IndiceReal() {
        return Math.floor((this.IndiceCorte / 100) * (this.Tamano - 1));
    }

    _Intensidad(X, Y, Z) {
        const C = this.Tamano / 2;
        const D = Math.sqrt((X - C) ** 2 + (Y - C) ** 2 + (Z - C) ** 2);
        let I = Math.max(0, 180 - D * 4);
        const Dl = Math.sqrt(
            (X - this.Lesion.x) ** 2 + (Y - this.Lesion.y) ** 2 + (Z - this.Lesion.z) ** 2
        );
        if (Dl < this.Lesion.radio) I = 220 + Math.random() * 35;
        return Math.max(0, Math.min(255, I + (Math.random() - 0.5) * 15));
    }

    _EnLesion(X, Y, Z) {
        const D = Math.sqrt(
            (X - this.Lesion.x) ** 2 + (Y - this.Lesion.y) ** 2 + (Z - this.Lesion.z) ** 2
        );
        return D < this.Lesion.radio;
    }

    Dibujar() {
        if (!this.Contexto) return;

        const W = this.Canvas.width;
        const H = this.Canvas.height;
        const Idx = this._IndiceReal();
        const Esc = W / this.Tamano;
        const Img = this.Contexto.createImageData(W, H);
        const D = Img.data;

        for (let F = 0; F < this.Tamano; F++) {
            for (let C = 0; C < this.Tamano; C++) {
                let I, Lesion;
                if (this.Plano === 'axial') {
                    I = this._Intensidad(C, F, Idx);
                    Lesion = this._EnLesion(C, F, Idx);
                } else if (this.Plano === 'coronal') {
                    I = this._Intensidad(C, Idx, F);
                    Lesion = this._EnLesion(C, Idx, F);
                } else {
                    I = this._Intensidad(Idx, C, F);
                    Lesion = this._EnLesion(Idx, C, F);
                }

                const Px = Math.floor(C * Esc);
                const Py = Math.floor(F * Esc);

                for (let Dy = 0; Dy < Esc; Dy++) {
                    for (let Dx = 0; Dx < Esc; Dx++) {
                        const X = Px + Dx;
                        const Y = Py + Dy;
                        if (X >= W || Y >= H) continue;
                        const O = (Y * W + X) * 4;
                        D[O] = Lesion ? Math.min(255, I + 80) : I;
                        D[O + 1] = Lesion ? Math.max(0, I - 60) : I;
                        D[O + 2] = Lesion ? Math.max(0, I - 60) : I;
                        D[O + 3] = 255;
                    }
                }
            }
        }

        this.Contexto.putImageData(Img, 0, 0);

        if (this._PlanoContieneLesion(Idx)) {
            let Cx, Cy;
            if (this.Plano === 'axial') {
                Cx = this.Lesion.x * Esc;
                Cy = this.Lesion.y * Esc;
            } else if (this.Plano === 'coronal') {
                Cx = this.Lesion.x * Esc;
                Cy = this.Lesion.z * Esc;
            } else {
                Cx = this.Lesion.y * Esc;
                Cy = this.Lesion.z * Esc;
            }
            const R = this.Lesion.radio * Esc;
            this.Contexto.strokeStyle = '#ef4444';
            this.Contexto.lineWidth = 2;
            this.Contexto.setLineDash([5, 4]);
            this.Contexto.strokeRect(Cx - R, Cy - R, R * 2, R * 2);
            this.Contexto.setLineDash([]);
        }
    }

    _PlanoContieneLesion(Idx) {
        if (this.Plano === 'axial') return Math.abs(Idx - this.Lesion.z) <= 3;
        if (this.Plano === 'coronal') return Math.abs(Idx - this.Lesion.y) <= 3;
        return Math.abs(Idx - this.Lesion.x) <= 3;
    }
}

window.VisualizadorCnn = VisualizadorCnn;
