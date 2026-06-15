/**
 * MotorPresentacion.js
 * Responsabilidad: navegación fullscreen entre diapositivas (teclado, botones, nav).
 */
const MotorPresentacion = {
    IndiceActual: 0,
    Slides: [],
    Transicionando: false,

    Inicializar() {
        this.Slides = Array.from(document.querySelectorAll('.Slide'));
        this.Total = this.Slides.length;
        this.BotonAnterior = document.getElementById('btnAnterior');
        this.BotonSiguiente = document.getElementById('btnSiguiente');
        this.BarraProgreso = document.getElementById('barraProgreso');
        this.Contador = document.getElementById('contadorSlide');
        this.NavItems = document.querySelectorAll('.NavLateral__Item');

        this.BotonAnterior?.addEventListener('click', () => this.Anterior());
        this.BotonSiguiente?.addEventListener('click', () => this.Siguiente());

        this.NavItems.forEach((Item) => {
            Item.addEventListener('click', () => {
                this.IrA(parseInt(Item.dataset.indice, 10));
            });
        });

        document.querySelectorAll('[data-ir-slide]').forEach((Btn) => {
            Btn.addEventListener('click', () => {
                this.IrA(parseInt(Btn.dataset.irSlide, 10));
            });
        });

        document.addEventListener('keydown', (E) => this.ManejarTeclado(E));

        document.getElementById('btnPantallaCompleta')?.addEventListener('click', () => {
            this.ToggleFullscreen();
        });

        this.ModalAyuda = document.getElementById('ayudaModal');

        document.getElementById('btnAyuda')?.addEventListener('click', () => this.AbrirAyuda());
        document.getElementById('btnCerrarAyuda')?.addEventListener('click', () => this.CerrarAyuda());

        this.ModalAyuda?.addEventListener('click', (E) => {
            if (E.target === this.ModalAyuda) this.CerrarAyuda();
        });

        this.ModalAyuda?.querySelector('.AyudaModal__Contenido')?.addEventListener('click', (E) => {
            E.stopPropagation();
        });

        this.ActualizarUi();
        this.DispararEventoSlide(this.IndiceActual);
    },

    ManejarTeclado(E) {
        if (E.target.matches('input, textarea, select')) return;

        if (E.key === '?' || E.key === 'h') {
            this.ModalAyuda?.hidden ? this.AbrirAyuda() : this.CerrarAyuda();
            return;
        }
        if (this.ModalAyuda && !this.ModalAyuda.hidden && E.key === 'Escape') {
            this.CerrarAyuda();
            return;
        }

        switch (E.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
            case 'PageDown':
                E.preventDefault();
                this.Siguiente();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                E.preventDefault();
                this.Anterior();
                break;
            case 'Home':
                E.preventDefault();
                this.IrA(0);
                break;
            case 'End':
                E.preventDefault();
                this.IrA(this.Total - 1);
                break;
            case 'f':
            case 'F':
                this.ToggleFullscreen();
                break;
        }
    },

    Siguiente() {
        if (this.IndiceActual < this.Total - 1) this.IrA(this.IndiceActual + 1);
    },

    Anterior() {
        if (this.IndiceActual > 0) this.IrA(this.IndiceActual - 1);
    },

    IrA(Indice) {
        if (this.Transicionando || Indice === this.IndiceActual || Indice < 0 || Indice >= this.Total) return;

        this.Transicionando = true;
        const Anterior = this.Slides[this.IndiceActual];
        const Nueva = this.Slides[Indice];

        Anterior.classList.remove('is-active');
        Anterior.classList.add('is-saliendo');

        setTimeout(() => Anterior.classList.remove('is-saliendo'), 600);

        Nueva.classList.add('is-active');
        this.IndiceActual = Indice;

        this.ActualizarUi();
        this.DispararEventoSlide(Indice);

        setTimeout(() => { this.Transicionando = false; }, 500);
    },

    ActualizarUi() {
        const Porcentaje = ((this.IndiceActual + 1) / this.Total) * 100;
        if (this.BarraProgreso) this.BarraProgreso.style.width = `${Porcentaje}%`;
        if (this.Contador) this.Contador.textContent = `${this.IndiceActual + 1} / ${this.Total}`;

        this.NavItems.forEach((Item, I) => {
            Item.classList.toggle('NavLateral__Item--Activo', I === this.IndiceActual);
        });

        if (this.BotonAnterior) this.BotonAnterior.disabled = this.IndiceActual === 0;
        if (this.BotonSiguiente) this.BotonSiguiente.disabled = this.IndiceActual === this.Total - 1;
    },

    DispararEventoSlide(Indice) {
        window.dispatchEvent(new CustomEvent('slidechange', {
            detail: { indice: Indice, id: this.Slides[Indice]?.dataset.slideId },
        }));
    },

    AbrirAyuda() {
        if (!this.ModalAyuda) return;
        this.ModalAyuda.hidden = false;
        this.ModalAyuda.classList.add('is-abierto');
    },

    CerrarAyuda() {
        if (!this.ModalAyuda) return;
        this.ModalAyuda.hidden = true;
        this.ModalAyuda.classList.remove('is-abierto');
    },

    ToggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    },
};

window.MotorPresentacion = MotorPresentacion;
