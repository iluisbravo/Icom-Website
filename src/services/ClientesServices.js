import validator from 'validator';
import Authorization from './Authorization';

const apiURL = "https://icom-api-test.herokuapp.com";

const newApiUrl = "http://52.53.201.154/api";

const ClientesServices = {
    GetClientes: async () => {
        try {

            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/clientes`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;

        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    GetClienteById: async (clienteId) => {
        try {

            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/clientes/${clienteId}`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    NewCliente: async ({ nombre, correo, ubicacion, telefono, direccion, comentarios, contacto, activo }) => {
        //Validaciones
        if (!nombre)
            return { hasError: true, message: 'No se ha especificado el apellido.' };
        if (!validator.isEmail(correo))
            return { hasError: true, message: 'Ingrese un email válido.' };
        if (!ubicacion)
            return { hasError: true, message: 'No se ha especificado la ciudad.' };
        if (!direccion)
            return { hasError: true, message: 'No se ha especificado la dirección.' };
        // if (!comentarios)
        //     return { hasError: true, message: 'No se ha especificado comentario.' };
        if (!contacto)
            return { hasError: true, message: 'No se ha especificado el nombre de contacto.' };
        if (!validator.isMobilePhone(telefono))
            return { hasError: true, message: 'Ingrese un teléfono valido.' };

        const data = {
            nombre,
            correo,
            ubicacion,
            direccion,
            telefono,
            comentarios,
            contacto,
            activo
        };

        const url = `${newApiUrl}/clientes`;
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
        return { hasError: true, message: "Hubo un error en la conexón con el servicio API." };

    },
    EditCliente: async ({ id, nombre, correo, ubicacion, telefono, direccion, comentarios, contacto }) => {
        //Validaciones

        if (!id)
            return { hasError: true, message: 'No se ha especificado el id.' };
        if (!nombre)
            return { hasError: true, message: 'No se ha especificado el nombre.' };
        if (!ubicacion)
            return { hasError: true, message: 'No se ha especificado la ciudad.' };
        if (!comentarios)
            return { hasError: true, message: 'No se ha especificado comentario.' };
        if (!contacto)
            return { hasError: true, message: 'No se ha especificado el nombre de contacto.' };
        if (!direccion)
            return { hasError: true, message: 'No se ha especificado la dirección.' };
        if (!validator.isMobilePhone(telefono))
            return { hasError: true, message: 'Ingrese un telefono válido.' };
        if (!validator.isEmail(correo))
            return { hasError: true, message: 'No se ha especificado el tipo de usuario' };

        const data = {
            id,
            nombre,
            ubicacion,
            direccion,
            telefono,
            correo,
            comentarios,
            contacto
        };

        const url = `${newApiUrl}/clientes/${id}`;
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
    onOffClientes: async ({ id, activo }) => {
        //Validaciones

        if (!id)
            return { hasError: true, message: 'No se ha especificado el id.' };
        if (activo === undefined)
            return { hasError: true, message: 'No se ha especificado el activo.' };

        const data = {
            id,
            activo
        };

        const url = `${newApiUrl}/clientes/${id}?activo=${activo}`;
        var params = {
            method: 'PATCH',
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
    searchClientes: async (text) => {
        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/clientes?text=${text}`;
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

export default ClientesServices;