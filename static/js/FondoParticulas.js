/**
 * FondoParticulas.js
 * Responsabilidad: fondo animado de partículas en canvas.
 */
const FondoParticulas = {
    Canvas: null,
    Contexto: null,
    Particulas: [],
    AnimacionId: null,

    Inicializar() {
        this.Canvas = document.getElementById('fondoParticulas');
        if (!this.Canvas) return;

        this.Contexto = this.Canvas.getContext('2d');
        this.Redimensionar();
        window.addEventListener('resize', () => this.Redimensionar());

        for (let I = 0; I < 80; I++) {
            this.Particulas.push({
                x: Math.random() * this.Canvas.width,
                y: Math.random() * this.Canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radio: Math.random() * 2 + 0.5,
            });
        }

        this.Animar();
    },

    Redimensionar() {
        this.Canvas.width = window.innerWidth;
        this.Canvas.height = window.innerHeight;
    },

    Animar() {
        const Ctx = this.Contexto;
        const W = this.Canvas.width;
        const H = this.Canvas.height;

        Ctx.clearRect(0, 0, W, H);

        this.Particulas.forEach((P) => {
            P.x += P.vx;
            P.y += P.vy;
            if (P.x < 0 || P.x > W) P.vx *= -1;
            if (P.y < 0 || P.y > H) P.vy *= -1;

            Ctx.beginPath();
            Ctx.arc(P.x, P.y, P.radio, 0, Math.PI * 2);
            Ctx.fillStyle = 'rgba(99, 102, 241, 0.35)';
            Ctx.fill();
        });

        for (let I = 0; I < this.Particulas.length; I++) {
            for (let J = I + 1; J < this.Particulas.length; J++) {
                const Dx = this.Particulas[I].x - this.Particulas[J].x;
                const Dy = this.Particulas[I].y - this.Particulas[J].y;
                const Dist = Math.sqrt(Dx * Dx + Dy * Dy);
                if (Dist < 120) {
                    Ctx.beginPath();
                    Ctx.moveTo(this.Particulas[I].x, this.Particulas[I].y);
                    Ctx.lineTo(this.Particulas[J].x, this.Particulas[J].y);
                    Ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - Dist / 120)})`;
                    Ctx.stroke();
                }
            }
        }

        this.AnimacionId = requestAnimationFrame(() => this.Animar());
    },
};

window.FondoParticulas = FondoParticulas;
