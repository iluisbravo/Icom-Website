import validator from 'validator';
import Authorization from './Authorization';

const apiURL = "https://icom-api-test.herokuapp.com";

const newApiUrl = "http://52.53.201.154/api";

const UserServices = {
    logIn: async ({ id, token }) => {
        //Validaciones

        if (!id)
            return { hasError: true, message: 'No se ha especificado el id.' };
        if (!token)
            return { hasError: true, message: 'No se ha especificado el token.' };

        const data = {
            id,
            token
        };

        const url = `${newApiUrl}/user/login`;
        var params = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "content-type": 'application/json'
            },
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
    GetUserTypes: async () => {
        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/usuarios/tipos`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    GetUsers: async () => {
        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/usuarios`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    GetUserById: async (userId) => {
        try {
            var requestOptions = {
                method: 'GET',
                headers: await Authorization.GetHeaders(),
                redirect: 'follow'
            };

            const url = `${newApiUrl}/usuarios/${userId}`;
            const rawResponse = await fetch(url, requestOptions);
            const responseData = await rawResponse.json();
            const response = responseData;
            return response;
        } catch (e) {
            console.error(e);
            return { hasError: true, message: e.message };
        }
    },
    NewUser: async ({ id, nombre, apellido, correo, direccion, ciudad, telefono, idTipoUsuario }) => {
        //Validaciones
        if (!id)
            return { hasError: true, message: 'No se ha especificado el id.' };
        if (!nombre)
            return { hasError: true, message: 'No se ha especificado el nombre.' };
        if (!apellido)
            return { hasError: true, message: 'No se ha especificado el apellido.' };
        if (!validator.isEmail(correo))
            return { hasError: true, message: 'Ingrese un correo válido.' };
        if (!direccion)
            return { hasError: true, message: 'No se ha especificado la dirección.' };
        if (!ciudad)
            return { hasError: true, message: 'No se ha especificado la ciudad.' };
        if (!validator.isMobilePhone(telefono))
            return { hasError: true, message: 'Ingrese un teléfono válido.' };
        if (!idTipoUsuario)
            return { hasError: true, message: 'No se ha especificado el id del tipo de usuario.' };

        const data = {
            id,
            token: await Authorization.GetToken(),
            nombre,
            apellido,
            correo,
            direccion,
            ciudad,
            telefono,
            idTipoUsuario
        };

        const url = `${newApiUrl}/usuarios`;
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
    EditUser: async ({ id, tkn, nombre, apellido, direccion, ciudad, telefono, correo, idTipoUsuario, imgUrl, imgNombre }) => {
        //Validaciones
        if (!id)
            return { hasError: true, message: 'No se ha especificado el id.' };
        if (!tkn)
            return { hasError: true, message: 'No se ha especificado el token.' };
        if (!nombre)
            return { hasError: true, message: 'No se ha especificado el nombre.' };
        if (!apellido)
            return { hasError: true, message: 'No se ha especificado el apellido.' };
        if (!direccion)
            return { hasError: true, message: 'No se ha especificado la dirección.' };
        if (!ciudad)
            return { hasError: true, message: 'No se ha especificado la ciudad.' };
        if (!validator.isMobilePhone(telefono))
            return { hasError: true, message: 'Ingrese un teléfono valido.' };
        if (!validator.isEmail(correo))
            return { hasError: true, message: 'Ingrese un correo válido.' };
        if (!idTipoUsuario)
            return { hasError: true, message: 'No se ha especificado el id del tipo de usuario.' };

        const data = {
            id: id,
            token: await Authorization.GetToken(),
            idTipoUsuario,
            nombre,
            apellido,
            telefono,
            correo,
            direccion,
            ciudad,
            imgUrl,
            imgNombre
        };

        const url = `${newApiUrl}/usuarios/${id}`;
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
    onOffUser: async ({ id, activo }) => {
        //Validaciones

        if (!id)
            return { hasError: true, message: 'No se ha especificado el id.' };
        if (activo === undefined)
            return { hasError: true, message: 'No se ha especificado el active.' };

        const data = {
            id,
            activo
        };

        const url = `${newApiUrl}/usuarios/${id}?activo=${activo}`;
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
    DeleteUserImageById: async ({ userId }) => {

        //Validaciones      
        if (!userId)
            return { hasError: true, message: 'No se ha especificado el id del usuario.' };

        const url = `${newApiUrl}/usuarios/${userId}/foto`;
        var params = {
            method: 'DELETE', // Method itself
            headers: await Authorization.GetHeaders(),
            // No need to have body, because we don't send nothing to the server.
        }

        const rawResponse = await fetch(url, params);
        if (rawResponse.status === 200) {
            const responseData = await rawResponse.json();
            const result = responseData;
            return result;
        }

        console.error(rawResponse);
        return { hasError: true, message: "Hubo un error en la conexón con el servicio API." };

    },

}

export default UserServices;