import validator from 'validator';
import Authorization from './Authorization';

const apiURL = "https://icom-api-test.herokuapp.com";

const newApiUrl = "http://52.53.201.154/api";

const CatalogosServices = {
    GetCiudadInstalacion: async () => {

        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/fletes`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    GetPolipastos: async () => {
        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/polipastos/marcas`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    GetTroles: async () => {
        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };
            const url = `${newApiUrl}/troles/marcas`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    GetCantidadColumnas: async (recorrido, volado) => {
        try {

            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/calculos/opciones?recorrido=${recorrido}&permiteVolados=${volado}`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    GetCapacidades: async () => {
        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };
            const url = `${newApiUrl}/polipastos/capacidades`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    getAccesoriosByPolipasto: async (polipastiId) => {
        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };
            const url = `${newApiUrl}/polipastos/${polipastiId}/accesorios `;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    GetTablerosCabezales: async () => {
        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };
            const url = `${newApiUrl}/gabinetes `;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    GetPolipastosPorCapacidad: async (capacidad) => {
        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };
            const url = `${newApiUrl}/polipastos?capacidad=${capacidad}`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    GetTrolesPorCapacidad: async (capacidad) => {
        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };
            const url = `${newApiUrl}/troles?capacidad=${capacidad}`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    }
}

export default CatalogosServices;