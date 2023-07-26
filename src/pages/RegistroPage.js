import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },

        '& button': {
            margin: theme.spacing(1)
        },
    },
}));


const Styles = styled.div` 
    form {
        width: fit-content;
        /* margin-right:auto;
        margin-left:auto;     */
    }

    .text-rigth{
        text-align: right !important;
    }

    .text-small{
        font-size: small;
    }

    .text-small:hover{
        cursor:pointer;
    }
`;

const Registro = () => {
    const history = useHistory();
    const classes = useStyles();

    const [registroData, setRegistroData] = React.useState({
        nombre: null,
        apellido: null,
        telefono: null,
        correo: null,
        direccion: null,
        ciudad: null,
        password1: null,
        passwor2: null,
        tipoUsuario: null,
        idTipoUsuario: null
    });

    const inputChange = (evt) => {

        const target = evt.target.name;
        const value = evt.target.value;

        switch (target) {
            case "nombre":
                registroData.nombre = value;
                break;
            case "apellido":
                registroData.apellido = value;
                break;
            case "telefono":
                registroData.telefono = value;
                break;
            case "correo":
                registroData.correo = value;
                break;
            case "direccion":
                registroData.direccion = value;
                break;
            case "ciudad":
                registroData.ciudad = value;
                break;
            case "password1":
                registroData.password1 = value;
                break;
            case "password2":
                registroData.password2 = value;
                break;
            default:
                break;
        }

        setRegistroData(registroData);

    }

    const registro = (evt) => {
        evt.preventDefault();
        //conectar con el servicio para login
        alert(JSON.stringify(registroData));
    }

    return (
        <>
            <Styles>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={registro}>
                    <div className="text-left">
                        <h4 className="orange">Usuarios</h4>

                        <TextField
                            id="nombre"
                            name="nombre"
                            onInput={inputChange}
                            label="Nombre"
                            helperText="Ingresa tu nombre"
                        />

                        <TextField
                            id="apellido"
                            name="apellido"
                            onInput={inputChange}
                            label="Apellido"
                            helperText="Ingresa tu apellido"
                        />
                        <br />
                        <TextField
                            id="telefono"
                            name="telefono"
                            onInput={inputChange}
                            label="Teléfono"
                            helperText="Ingresa tu teléfono"
                        />

                        <TextField
                            id="correo"
                            name="correo"
                            onInput={inputChange}
                            label="Correo"
                            helperText="Ingresa tu correo"
                        />

                        <br />
                        <TextField
                            id="direccion"
                            name="direccion"
                            onInput={inputChange}
                            label="Dirección"
                            helperText="Ingresa tu dirección"
                        />



                        <TextField
                            id="ciudad"
                            name="ciudad"
                            onInput={inputChange}
                            label="Ciudad"
                            helperText="Ingresa tu ciudad"
                        />

                        <br />

                        <TextField
                            id="password1"
                            name="password1"
                            onInput={inputChange}
                            label="Password"
                            type="password"
                            helperText="Ingresa tu password"
                        />

                        <TextField
                            id="password2"
                            name="password2"
                            onInput={inputChange}
                            label="Confirma password"
                            type="password"
                            helperText="Confirma tu password"

                        />
                        <br />
                        <br />

                        <div className="text-rigth">
                            <Button type="submit" variant="contained" color="primary">
                                Registro
                            </Button>
                            {/* 
                            <Button type="button" variant="outlined" color="secondary" onClick={() => history.push("/")}>
                                Log In
                            </Button> */}
                        </div>

                    </div>
                </form>
            </Styles>
        </>
    )
}

export default Registro;