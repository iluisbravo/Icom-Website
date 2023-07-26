import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react';
import { CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, Tooltip, Zoom } from '@material-ui/core';
import ClientesServices from '../services/ClientesServices';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { store } from 'react-notifications-component';

import { v4 as uuidv4 } from 'uuid';

const schema = yup.object().shape({
    nombre: yup.string().required("Campo requerido").matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Ingrese un nombre válido"),
    prefijoTelefono: yup.string().required("Campo requerido"),
    telefono: yup.string().required("Campo requerido").matches(/^([0-9]{10})$/g, "Ingrese un teléfono válido"),
    correo: yup.string().required("Campo requerido").email("Ingrese un correo válido"),
    direccion: yup.string().required("Campo requerido"),
    ciudad: yup.string().required("Campo requerido"),
    contacto: yup.string().required("Campo requerido").matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Ingrese un nombre válido"),
    comentario: yup.string()
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

const FormNuevoClienteComponent = (props) => {
    const classes = useStyles();
    const cancelFunction = props.cancelFunction;

    const clientes = props.clientes || [];
    const setClientes = props.setClientes;

    const [loading, setLoading] = React.useState(false);

    useEffect(() => {

    }, []);

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

    const submitForm = async (data, e) => {

        setLoading(true);
        console.log(data);
        const registroData = data;
        registroData.telefono = data.prefijoTelefono + "" + data.telefono;
        
        const newClienteResult = await ClientesServices.NewCliente({
            nombre: registroData.nombre,
            correo: registroData.correo,
            direccion: registroData.direccion,
            ubicacion: registroData.ciudad,
            telefono: registroData.telefono,
            comentarios: registroData.comentario,
            contacto: registroData.contacto,
            activo: true
        });

        if (newClienteResult.status === 201) {
            let userUpdated = [newClienteResult.data, ...clientes];
            setClientes(userUpdated);
            showAlert("Excelente", "Registro exitoso...", "success");
            e.target.reset();
            if (cancelFunction) {
                cancelFunction();
            }
        }
        else {
            showAlert("Error", "Error al registrar al cliente, intente de nuevo...", "danger");
        }

        setLoading(false);
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
                                        maxLength: 50,
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
                                                <Select
                                                    id="prefijo-select"
                                                    onChange={onChange}
                                                    value={value}
                                                >
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

                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="contacto"
                                    label="Contacto *"
                                    helperText={errors?.contacto?.message}
                                    {...register('contacto')}
                                    inputProps={{
                                        maxLength: 50,
                                    }}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    fullWidth
                                    name="comentario"
                                    label="Comentario"
                                    helperText={errors?.comentario?.message}
                                    {...register('comentario')}
                                    inputProps={{
                                        maxLength: 250,
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

export default FormNuevoClienteComponent;