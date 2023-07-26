import moment from "moment";

const Formatos = {
    GetFormatoFechaHora: (fecha) => {
        return moment(fecha).locale('es').format('DD/MMM/yyyy HH:mm')
    },
    GetFormatoNumero: (numero) => {
        return (numero).toLocaleString('en-US',
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
    },
    GetFormatoMoneda: (numero) => {
        return (numero).toLocaleString('en-US',
            {
                style: 'currency',
                currency: 'USD',
            });
    },
    GetCapitalizeTexto: (texto) => {
        return texto[0].toUpperCase() + texto.slice(1).toLowerCase();
    }

}

export default Formatos;