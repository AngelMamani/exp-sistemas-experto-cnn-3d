/**
 * ClienteApi.js
 * Responsabilidad: comunicación con endpoints Django.
 */
const ClienteApi = {
    BaseUrl: '/api',

    async Post(Endpoint, Cuerpo = {}) {
        const Respuesta = await fetch(`${this.BaseUrl}${Endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Cuerpo),
        });
        if (!Respuesta.ok) throw new Error(`Error API: ${Respuesta.status}`);
        return Respuesta.json();
    },

    FlujoHibrido() {
        return this.Post('/flujo-hibrido/');
    },

    Inferir(Hechos) {
        return this.Post('/inferir/', Hechos);
    },

    AnalizarVolumen(Cuerpo) {
        return this.Post('/analizar-volumen/', Cuerpo);
    },
};

window.ClienteApi = ClienteApi;
