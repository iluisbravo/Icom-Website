import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import HelpIcon from '@material-ui/icons/Help';
import { CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, Tooltip, Zoom } from '@material-ui/core';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';
import UserServices from '../services/UsersServices';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { store } from 'react-notifications-component';

const schema = yup.object().shape({
    nombre: yup.string().required("Campo requerido").matches(/^([A-zÀ-ú]+(\s+[A-zÀ-ú]+){0,3})$/g, "Ingrese un nombre válido"),
    apellido: yup.string().required("Campo requerido").matches(/^([A-zÀ-ú]+(\s+[A-zÀ-ú]+){0,1})$/g, "Ingrese un nombre válido"),
    prefijoTelefono: yup.string().required("Campo requerido"),
    telefono: yup.string().required("Campo requerido").matches(/^([0-9]{10})$/g, "Ingrese un teléfono válido"),
    correo: yup.string().required("Campo requerido").email("Ingrese un correo válido"),
    direccion: yup.string().required("Campo requerido"),
    ciudad: yup.string().required("Campo requerido"),
    idTipoUsuario: yup.string().required("Campo requerido"),
    password1: yup.string().min(8,"Mínimo 8 caracteres.").max(16,"Máximo 16 caracteres.").required("Campo requerido"),
    password2: yup.string().required("Campo requerido").oneOf([yup.ref("password1"), null], "No coincide con el password")
});

const useStyles = makeStyles((theme) => ({
    root: {
        // '& button': {
        //     marginRight: theme.spacing(2)
        // },
    },
    bootonMargin: {
        marginRight: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    telMargin: {
        marginRight: theme.spacing(1)
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));


const Styles = styled.div` 
    form {
        /* width: fit-content; */
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

const FormNuevoUsuarioComponent = (props) => {
    const classes = useStyles();
    const cancelFunction = props.cancelFunction;
    const [tiposUsuarios, setTiposUsuarios] = useState([]);

    const users = props.users || [];
    const setUsers = props.setUsers;

    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        getTiposUsuarios();
    }, []);

    const getTiposUsuarios = async () => {
        const resultUserTypes = await UserServices.GetUserTypes();
        setTiposUsuarios(resultUserTypes.data);
    }

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            prefijoTelefono: "+52"
        }
    });

    // const tiposUsuarios = [
    //     // { idTipoUsuario: "", tipoUsuario: "Selecciona tipo de usuario" },
    //     { idTipoUsuario: "1", tipoUsuario: "Ventas" },
    //     { idTipoUsuario: "2", tipoUsuario: "Gerente" },
    //     { idTipoUsuario: "3", tipoUsuario: "Administrador" }
    // ];

    const codigosPorPais = [
        // { idTipoUsuario: "", tipoUsuario: "Selecciona tipo de usuario" },
        { codigo: "+52", pais: "México" },
        // { codigo: "+51", pais: "USA" },
        // { codigo: "+34", pais: "España" }
    ];

    const soloLetras = (evt) => {
        const key = evt.key;
        const value = evt.target.value;
        console.log(key, value);
        if (
            (key === " " && value.length === 0)
            || (key === " " && /\s/g.test(value))
            || !(/^([a-zA-Z\s])/g.test(key))
        ) {
            return evt.preventDefault();
        }
    }

    const submitForm = (data, e) => {
        setLoading(true);
        console.log(data);
        const registroData = data;
        registroData.telefono = data.prefijoTelefono + "" + data.telefono;

        const attributeList = [];
        attributeList.push(new CognitoUserAttribute({ Name: "name", Value: registroData.nombre }));
        attributeList.push(new CognitoUserAttribute({ Name: "family_name", Value: registroData.apellido }));
        attributeList.push(new CognitoUserAttribute({ Name: "phone_number", Value: registroData.telefono }));
        attributeList.push(new CognitoUserAttribute({ Name: "email", Value: registroData.correo }));
        attributeList.push(new CognitoUserAttribute({ Name: "address", Value: registroData.direccion }));
        attributeList.push(new CognitoUserAttribute({ Name: "custom:city", Value: registroData.ciudad }));
        attributeList.push(new CognitoUserAttribute({ Name: "custom:type_user_id", Value: registroData.idTipoUsuario }));
        attributeList.push(new CognitoUserAttribute({ Name: "custom:type_user", Value: tiposUsuarios.find(tu => tu.id === registroData.idTipoUsuario).tipoUsuario }));

        UserPool.signUp(registroData.correo, registroData.password1, attributeList, null, async (err, data) => {
            if (err) {
                console.error(err);
                showAlert("Error", err.message, "danger");
                setLoading(false);
            }
            else {
                console.log(data);

                const newUser = {
                    id: data.userSub,
                    nombre: registroData.nombre,
                    apellido: registroData.apellido,
                    correo: registroData.correo,
                    direccion: registroData.direccion,
                    ciudad: registroData.ciudad,
                    telefono: registroData.telefono,
                    idTipoUsuario: registroData.idTipoUsuario,
                    // tipoUsuario: tiposUsuarios.find(tu => tu.id === registroData.idTipoUsuario).tipoUsuario,
                    // activo: true
                };

                const newUserResult = await UserServices.NewUser(newUser);

                if (newUserResult.status === 201) {
                    let userUpdated = [newUserResult.data, ...users];
                    setUsers(userUpdated);
                    showAlert("Excelente", "Registro exitoso...", "success");
                    e.target.reset();
                    if (cancelFunction) {
                        cancelFunction();
                    }
                }
                else {
                    showAlert("Error", newUserResult.message, "danger");
                }

                setLoading(false);
            }
        });
    }

    const showAlert = (title, message, type) => {

        store.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "center",
            animationIn: ["animate__animated", "animate__zoomIn"],
            animationOut: ["animate__animated", "animate__zoomOut"],
            dismiss: {
                duration: 5000,
                onScreen: true,
                showIcon: true
            },
            touchSlidingExit: {
                swipe: {
                    duration: 400,
                    timingFunction: 'ease-out',
                    delay: 0,
                },
                fade: {
                    duration: 400,
                    timingFunction: 'ease-out',
                    delay: 0
                }
            }
        });

    }

    return (
        <>
            <Styles>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
                    <div className="text-left">
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    name="nombre"
                                    label="Nombre *"
                                    helperText={errors?.nombre?.message}
                                    {...register('nombre')}
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="apellido"
                                    label="Apellido *"
                                    helperText={errors?.apellido?.message}
                                    {...register('apellido')}
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                />
                            </Grid>
                            <Grid item md={2} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="prefijo-select">
                                        Prefijo *
                                    </InputLabel>
                                    <Controller
                                        control={control}
                                        name="prefijoTelefono"
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <Select id="prefijo-select" onChange={onChange} value={value}>
                                                    {codigosPorPais.map(cpp => {
                                                        return <MenuItem value={cpp.codigo}>{cpp.codigo}</MenuItem>
                                                    })}
                                                </Select>
                                                <FormHelperText>{errors?.prefijoTelefono?.message}</FormHelperText>
                                            </>
                                        )}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <TextField
                                    fullWidth
                                    name="telefono"
                                    label="Teléfono *"
                                    helperText={errors?.telefono?.message}
                                    {...register('telefono')}
                                    inputProps={{
                                        maxLength: 10,
                                    }}

                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="correo"
                                    label="Correo *"
                                    helperText={errors?.correo?.message}
                                    {...register('correo')}
                                    inputProps={{
                                        maxLength: 50,
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="direccion"
                                    label="Dirección *"
                                    helperText={errors?.direccion?.message}
                                    {...register('direccion')}
                                    inputProps={{
                                        maxLength: 50,
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="ciudad"
                                    label="Ciudad *"
                                    helperText={errors?.ciudad?.message}
                                    {...register('ciudad')}
                                    inputProps={{
                                        maxLength: 50,
                                    }}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="tipo-usuario-select">
                                        Tipo de Usuario *
                                    </InputLabel>
                                    <Controller
                                        control={control}
                                        name="idTipoUsuario"
                                        render={({ field: { onChange, value } }) => (
                                            <>
                                                <Select id="tipo-usuario-select" onChange={onChange} value={value}>
                                                    {tiposUsuarios.map((tu) => {
                                                        return (
                                                            <MenuItem key={tu.id} value={tu.id}>
                                                                {tu.tipoUsuario}
                                                            </MenuItem>)
                                                    })}
                                                </Select>
                                                <FormHelperText>{errors?.idTipoUsuario?.message}</FormHelperText>
                                            </>
                                        )}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="password1"
                                    label="Password *"
                                    type="password"
                                    helperText={errors?.password1?.message}
                                    {...register('password1')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Tooltip TransitionComponent={Zoom} title={
                                                    <React.Fragment>
                                                        <p>
                                                            La contraseña debe contener de 8 a 16 caracteres.
                                                            {/* <ul>
                                                                <li>Requiere de por lo menos un numero</li>
                                                                <li>Requiere de por lo menos una letra minúscula</li>
                                                                <li>Requiere de por lo menos una letra mayúscula</li>
                                                                <li>
                                                                    {`Requiere un caracter especial:
                                                                                = + - ^ $ * . [ ] {} ( ) ? " ! @ # % & / \ , > < ' : ; | _ ~  \` `}
                                                                </li>
                                                            </ul> */}

                                                        </p>
                                                    </React.Fragment>
                                                }>
                                                    <IconButton aria-label="delete">
                                                        <HelpIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </InputAdornment>
                                        )
                                    }}
                                    inputProps={{
                                        maxLength: 16,
                                        minLength:8
                                    }}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="password2"
                                    label="Confirma password *"
                                    type="password"
                                    helperText={errors?.password2?.message}
                                    {...register('password2')}
                                    inputProps={{
                                        maxLength: 16,
                                    }}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <div className="text-rigth">
                                    <Button className={classes.bootonMargin} type="button" variant="outlined" color="secondary" onClick={cancelFunction ? cancelFunction : () => { }} >
                                        Cancelar
                                    </Button>
                                    <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                        {!loading && "Registrar"}
                                        {loading && "Registrando"}
                                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </Styles>
        </>
    )
}

export default FormNuevoUsuarioComponent;