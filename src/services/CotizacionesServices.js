import validator from 'validator';
import Authorization from './Authorization';

const apiURL = "https://icom-api-test.herokuapp.com";
const newApiUrl = "http://52.53.201.154/api";

const CotizacionesServices = {
    GetCotizaciones: async () => {

        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/cotizaciones`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    GetCotizacionesByUser: async (statusId, userId) => {

        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/cotizaciones?idStatus=${statusId}&idUsuario=${userId}`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    GetCotizacionesByStatus: async (statusId) => {
        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/cotizaciones?idStatus=${statusId}`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    GetCotizacionById: async (cotizacionId) => {
        
        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/cotizaciones/${cotizacionId}/detalle`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    NewCotizacion: async (
        {
            userId,
            clienteId,
            ciudadId,
            capacidad,
            claro,
            recorrido,
            alturaTotal,
            alturaIzaje,
            columnas,
            distancia,
            volado,
            cabrilla,
            puentes,
            polipastoId,
            troleId,
            accesorios
        }) => {


        
        //Validaciones
        if (!userId)
            return { hasError: true, message: 'No se ha especificado el usuario.' };
        if (!clienteId)
            return { hasError: true, message: 'No se ha especificado el cliente.' };
        if (!capacidad)
            return { hasError: true, message: 'No se ha especificado la capacidad.' };
        if (!claro)
            return { hasError: true, message: 'No se ha especificado el claro.' };
        if (!recorrido)
            return { hasError: true, message: 'No se ha especificado el recorrido.' };
        if (!alturaTotal)
            return { hasError: true, message: 'No se ha especificado la alturaTotal.' };
        if (!alturaIzaje)
            return { hasError: true, message: 'No se ha especificado la altura izaje.' };
        if (!columnas)
            return { hasError: true, message: 'No se ha especificado las columnas.' };
        if (!distancia)
            return { hasError: true, message: 'No se ha especificado la distancia.' };
        if (volado == null || volado === undefined)
            return { hasError: true, message: 'No se ha especificado el volado.' };
        if (cabrilla == null || cabrilla === undefined)
            return { hasError: true, message: 'No se ha especificado la cabrilla.' };
        if (!puentes)
            return { hasError: true, message: 'No se ha especificado los puentes.' };
        if (!polipastoId)
            return { hasError: true, message: 'No se ha especificado el polipasto.' };
        if (!troleId)
            return { hasError: true, message: 'No se ha especificado los troles.' };
        // if (!accesorios)
        //     return { hasError: true, message: 'No se ha especificado los puentes.' };

        const data = {
            idUsuario: userId,
            idCliente: clienteId,
            idCiudad: ciudadId,
            capacidad: capacidad,
            claro: claro,
            recorrido: recorrido,
            alturaTotal: alturaTotal,
            alturaIzaje: alturaIzaje,
            columnas: columnas,
            distanciaColumnas: distancia,
            volado: volado,
            cabrilla: cabrilla,
            numeroPuentes: puentes,
            idPolipasto: polipastoId,
            idTrole: troleId,
            accesorios: accesorios
        };

        const url = `${newApiUrl}/cotizaciones`;
        var params = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: await Authorization.GetHeaders(),
            // mode: 'no-cors',
            cache: 'default'
        };

        const rawResponse = await fetch(url, params);
        if (rawResponse.status === 201) {
            const responseData = await rawResponse.json();
            const result = responseData;
            return result;
        }


        console.error(rawResponse);
        return { hasError: true, message: `Status ${rawResponse.status}: Error ${rawResponse.statusText}` };

    },
    EditCotizacion: async ({
        cotizacionId,
        userId,
        clienteId,
        folio,
        ciudadId,
        capacidad,
        claro,
        recorrido,
        alturaTotal,
        alturaIzaje,
        columnas,
        distancia,
        volado,
        cabrilla,
        puentes,
        polipastoId,
        troleId,
        accesorios
    }) => {

        //Validaciones
        if (!cotizacionId)
            return { hasError: true, message: 'No se ha especificado la cotización.' };
        if (!userId)
            return { hasError: true, message: 'No se ha especificado el usuario.' };
        if (!clienteId)
            return { hasError: true, message: 'No se ha especificado el cliente.' };
        if (!capacidad)
            return { hasError: true, message: 'No se ha especificado la capacidad.' };
        if (!claro)
            return { hasError: true, message: 'No se ha especificado el claro.' };
        if (!recorrido)
            return { hasError: true, message: 'No se ha especificado el recorrido.' };
        if (!alturaTotal)
            return { hasError: true, message: 'No se ha especificado la alturaTotal.' };
        if (!alturaIzaje)
            return { hasError: true, message: 'No se ha especificado la altura izaje.' };
        if (!columnas)
            return { hasError: true, message: 'No se ha especificado las columnas.' };
        if (!distancia)
            return { hasError: true, message: 'No se ha especificado la distancia.' };
        if (volado == null || volado == undefined)
            return { hasError: true, message: 'No se ha especificado el volado.' };
        if (cabrilla == null || cabrilla == undefined)
            return { hasError: true, message: 'No se ha especificado la cabrilla.' };
        if (!puentes)
            return { hasError: true, message: 'No se ha especificado los puentes.' };
        if (!polipastoId)
            return { hasError: true, message: 'No se ha especificado el polipasto.' };
        if (!troleId)
            return { hasError: true, message: 'No se ha especificado los troles.' };
        // if (!accesorios)
        //     return { hasError: true, message: 'No se ha especificado los puentes.' };

        const data = {
            "id": cotizacionId,
            "idUsuario": userId,
            "idCliente": clienteId,
            "folio": folio,
            "idCiudad": ciudadId,
            "capacidad": capacidad,
            "claro": claro,
            "recorrido": recorrido,
            "alturaTotal": alturaTotal,
            "alturaIzaje": alturaIzaje,
            "columnas": columnas,
            "distanciaColumnas": distancia,
            "volado": volado,
            "cabrilla": cabrilla,
            "numeroPuentes": puentes,
            "idPolipasto": polipastoId,
            "idTrole": troleId,
            "accesorios": accesorios
        };



        const url = `${newApiUrl}/cotizaciones/${cotizacionId}`;
        var params = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: await Authorization.GetHeaders(),
            // mode: 'no-cors',
            cache: 'default'
        };

        const rawResponse = await fetch(url, params);
        if (rawResponse.status === 200) {
            const responseData = await rawResponse.json();
            const result = responseData;
            return result;
        }

        console.error(rawResponse);
        return { hasError: true, message: "Hubo un error en la conexón con el servicio API." };

    },
    updateStatusCotiacion: async ({ cotizacionId, statusId, userId, comment }) => {
        //Validaciones

        if (!cotizacionId)
            return { hasError: true, message: 'No se ha especificado el id cotización.' };
        if (!statusId)
            return { hasError: true, message: 'No se ha especificado el id estado.' };
        if (!userId)
            return { hasError: true, message: 'No se ha especificado el id usuario.' };

        const data = {
            idCotizacion: cotizacionId,
            idTransaccionTipo: statusId,
            idUsuario: userId,
            comentarios: comment
        };

        const url = `${newApiUrl}/cotizaciones/${cotizacionId}/transacciones`;
        var params = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: await Authorization.GetHeaders(),
            // mode: 'no-cors',
            cache: 'default'
        };

        const rawResponse = await fetch(url, params);
        if (rawResponse.status === 200) {
            const responseData = await rawResponse.json();
            const result = responseData;
            return result;
        }

        console.error(rawResponse);
        return { hasError: true, message: "Hubo un error en la conexón con el servicio API." };

    },
    getComentariosByCotizacion: async (cotizacionId) => {
        //Validaciones

        if (!cotizacionId)
            return { hasError: true, message: 'No se ha especificado el id cotización.' };

        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/cotizaciones/${cotizacionId}/mensajes`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }

    },
    getLogByCotizacion: async (cotizacionId) => {
        try {
            //Validaciones
            if (!cotizacionId)
                return { hasError: true, message: 'No se ha especificado el id cotización.' };

            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/cotizaciones/${cotizacionId}/transacciones`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }

    },
    EditarEquipamientoPuente: async (
        {
            idCotizacion,
            puentes,
            idPolipasto,
            idTrole,
            montoTablero,
            montoElectrificacionRecorrido,
            montoElectrificacionPuente
        }) => {



        //Validaciones
        if (!idCotizacion)
            return { hasError: true, message: 'No se ha especificado la cotización.' };
        if (!puentes)
            return { hasError: true, message: 'No se ha especificado el puentes.' };
        if (!idPolipasto)
            return { hasError: true, message: 'No se ha especificado el polipasto.' };
        if (!idTrole)
            return { hasError: true, message: 'No se ha especificado el trole.' };
        if (!montoTablero)
            return { hasError: true, message: 'No se ha especificado monto tablero.' };
        if (!montoElectrificacionRecorrido)
            return { hasError: true, message: 'No se ha especificado monto electrificación recorrido.' };
        if (!montoElectrificacionPuente)
            return { hasError: true, message: 'No se ha especificado monto electrificación puente.' };

        const data = {
            puentes,
            idPolipasto,
            idTrole,
            montoTablero,
            montoElectrificacionRecorrido,
            montoElectrificacionPuente
        };

        const url = `${newApiUrl}/cotizaciones/${idCotizacion}/puente`;
        var params = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: await Authorization.GetHeaders(),
            // mode: 'no-cors',
            cache: 'default'
        };

        const rawResponse = await fetch(url, params);
        if (rawResponse.status === 200) {
            const responseData = await rawResponse.json();
            const result = responseData;
            return result;
        }


        console.error(rawResponse);
        return { hasError: true, message: `Status ${rawResponse.status}: Error ${rawResponse.statusText}` };

    },
    EditarOtros: async ({
        idCotizacion,
        conceptos
    }) => {



        //Validaciones
        if (!idCotizacion)
            return { hasError: true, message: 'No se ha especificado la cotización.' };
        if (!conceptos.length === 0)
            return { hasError: true, message: 'No se ha especificado conceptos.' };


        const url = `${newApiUrl}/cotizaciones/${idCotizacion}/otros`;
        var params = {
            method: 'POST',
            body: JSON.stringify(conceptos),
            headers: await Authorization.GetHeaders(),
            // mode: 'no-cors',
            cache: 'default'
        };



        const rawResponse = await fetch(url, params);
        if (rawResponse.status === 200) {
            const responseData = await rawResponse.json();
            const result = responseData;
            return result;
        }


        console.error(rawResponse);
        return { hasError: true, message: `Status ${rawResponse.status}: Error ${rawResponse.statusText}` };

    },
    EditarInstalacion: async ({
        idCotizacion,
        conceptos
    }) => {



        //Validaciones
        if (!idCotizacion)
            return { hasError: true, message: 'No se ha especificado la cotización.' };
        if (!conceptos.length === 0)
            return { hasError: true, message: 'No se ha especificado conceptos.' };


        const url = `${newApiUrl}/cotizaciones/${idCotizacion}/instalacion`;
        var params = {
            method: 'POST',
            body: JSON.stringify(conceptos),
            headers: await Authorization.GetHeaders(),
            // mode: 'no-cors',
            cache: 'default'
        };



        const rawResponse = await fetch(url, params);
        if (rawResponse.status === 200) {
            const responseData = await rawResponse.json();
            const result = responseData;
            return result;
        }


        console.error(rawResponse);
        return { hasError: true, message: `Status ${rawResponse.status}: Error ${rawResponse.statusText}` };

    },
    GetTotalCotizacionById: async (cotizacionId) => {

        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/cotizaciones/${cotizacionId}/totales`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    EditarMargen: async ({
        idCotizacion,
        margen,
        tipoCambio,
        moneda
    }) => {

        //         {
        // "margen": 22,
        // "tipoCambio": 21,
        // "moneda": "MXN"
        // }


        //Validaciones
        if (!idCotizacion)
            return { hasError: true, message: 'No se ha especificado la cotización.' };
        if (!margen)
            return { hasError: true, message: 'No se ha especificado el margen.' };
        if (!tipoCambio)
            return { hasError: true, message: 'No se ha especificado el tipo de cambio.' };
        if (!moneda)
            return { hasError: true, message: 'No se ha especificado la moneda.' };



        const url = `${newApiUrl}/cotizaciones/${idCotizacion}/margen`;
        var params = {
            method: 'POST',
            body: JSON.stringify({
                margen,
                tipoCambio,
                moneda
            }),
            headers: await Authorization.GetHeaders(),
            // mode: 'no-cors',
            cache: 'default'
        };



        const rawResponse = await fetch(url, params);
        if (rawResponse.status === 200) {
            const responseData = await rawResponse.json();
            const result = responseData;
            return result;
        }


        console.error(rawResponse);
        return { hasError: true, message: `Status ${rawResponse.status}: Error ${rawResponse.statusText}` };

    },
}

export default CotizacionesServices;