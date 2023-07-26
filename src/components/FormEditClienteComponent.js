import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ImgUserProfileComponent from './ImgUserProfileComponent';
import ClientesServices from '../services/ClientesServices';

import { store } from 'react-notifications-component';

const schema = yup.object().shape({
    nombre: yup.string().required("Campo requerido").matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Ingrese un nombre válido"),
    prefijoTelefono: yup.string().required("Campo requerido"),
    telefono: yup.string().required("Campo requerido").matches(/^([0-9]{10})$/g, "Ingrese un teléfono válido"),
    correo: yup.string().required("Campo requerido").email("Ingrese un correo válido"),
    direccion: yup.string().required("Campo requerido"),
    ciudad: yup.string().required("Campo requerido"),
    contacto:  yup.string().required("Campo requerido").matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g, "Ingrese un nombre válido"),
    comentario: yup.string().required("Campo requerido")
});

const useStyles = makeStyles((theme) => ({
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
    .text-right{
      text-align: right !important;
    }
`;

const FormEditClienteComponent = (props) => {
    const isAdmin = props.isAdmin || false;
    const auth = props.auth;
    const userAuth = auth?.user;
    const clienteSelected = props.clienteSelected;
    const setClienteSelected = props.setClienteSelected;

    const classes = useStyles();
    const handleClose = props.handleClose;
    const [canEdit, setCanEdit] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const [registroData, setRegistroData] = React.useState({
        id: null,
        nombre: null,
        prefijoTelefono: null,
        telefono: null,
        correo: null,
        direccion: null,
        ciudad: null,
        contacto: null,
        comentario: null
    });

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: registroData
    });

    useEffect(() => {

        let userToUpdate = clienteSelected;

        let getRegistroData = {};
        getRegistroData = {
            id: userToUpdate.id,
            nombre: userToUpdate.nombre,
            prefijoTelefono: userToUpdate.telefono.substring(0, 3),
            telefono: userToUpdate.telefono.substring(3),
            correo: userToUpdate.correo,
            direccion: userToUpdate.direccion,
            ciudad: userToUpdate.ubicacion,
            contacto: userToUpdate.contacto,
            comentario: userToUpdate.comentarios
        }

        setRegistroData(getRegistroData);
        reset(getRegistroData);

    }, [reset]);


    const codigosPorPais = [
        // { idTipoUsuario: "", tipoUsuario: "Selecciona tipo de usuario" },
        { codigo: "+52", pais: "México" },
        // { codigo: "+51", pais: "USA" },
        // { codigo: "+34", pais: "España" }
    ];


    const editClienteData = () => {
        setCanEdit(true);
    }

    const cancelEditClientData = () => {
        setCanEdit(false);
    }

    const submitForm = async (data, e) => {

        console.log(data);
        const registroDataReg = data;
        registroDataReg.telefono = data.prefijoTelefono + "" + data.telefono;
        setLoading(true);
        await saveUserData(registroDataReg);
    }

    const saveUserData = async (registroDataReg) => {

        const editUserResult = await ClientesServices.EditCliente({
            id: registroData.id,
            nombre: registroDataReg.nombre,
            correo: registroDataReg.correo,
            direccion: registroDataReg.direccion,
            ubicacion: registroDataReg.ciudad,
            telefono: registroDataReg.telefono,
            comentarios: registroDataReg.comentario,
            contacto: registroDataReg.contacto
        });

        if (editUserResult.status === 200) {
            const userUpdated = editUserResult.data;

            clienteSelected.id = userUpdated.id;
            clienteSelected.nombre = userUpdated.nombre;
            clienteSelected.telefono = userUpdated.telefono;
            clienteSelected.direccion = userUpdated.direccion;
            clienteSelected.ubicacion = userUpdated.ubicacion;
            clienteSelected.activo = userUpdated.activo;
            clienteSelected.correo = userUpdated.correo;
            clienteSelected.comentarios = userUpdated.comentarios;
            clienteSelected.contacto = userUpdated.contacto;

            setClienteSelected(clienteSelected);


            showAlert("Excelente", "Información del cliente actualizada!", "success");
            setCanEdit(false);
            setLoading(false);

            if (handleClose) {
                handleClose();
            }
        }
        else {
            showAlert("Error", "Error al actualizar los datos, intententa de nuevo...", "danger");
            setCanEdit(false);
            setLoading(false);
        }
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
                            {
                                registroData.nombre &&
                                <>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            name="nombre"
                                            label="Nombre"
                                            defaultValue={registroData.nombre}
                                            helperText={errors?.nombre?.message}
                                            {...register('nombre')}
                                            disabled={!canEdit}
                                            inputProps={{
                                                maxLength: 50,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={2} xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="prefijo-select">
                                                Prefijo
                                            </InputLabel>
                                            <Controller
                                                control={control}
                                                name="prefijoTelefono"
                                                render={({ field: { onChange, value } }) => (
                                                    <>
                                                        <Select
                                                            id="prefijo-select"
                                                            onChange={onChange}
                                                            defaultValue={registroData.prefijoTelefono}
                                                            value={value}
                                                            disabled={!canEdit}>
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
                                            label="Teléfono"
                                            defaultValue={registroData.telefono}
                                            helperText={errors?.telefono?.message}
                                            {...register('telefono')}
                                            disabled={!canEdit}
                                            inputProps={{
                                                maxLength: 10,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            name="correo"
                                            label="Correo"
                                            defaultValue={registroData.correo}
                                            helperText={errors?.correo?.message}
                                            {...register('correo')}
                                            disabled={!canEdit}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            name="direccion"
                                            label="Dirección"
                                            defaultValue={registroData.direccion}
                                            helperText={errors?.direccion?.message}
                                            {...register('direccion')}
                                            disabled={!canEdit}
                                            inputProps={{
                                                maxLength: 50,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            name="ciudad"
                                            label="Ciudad"
                                            defaultValue={registroData.ciudad}
                                            helperText={errors?.ciudad?.message}
                                            {...register('ciudad')}
                                            disabled={!canEdit}
                                            inputProps={{
                                                maxLength: 50,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            name="contacto"
                                            label="Contacto"
                                            defaultValue={registroData.contacto}
                                            helperText={errors?.contacto?.message}
                                            {...register('contacto')}
                                            disabled={!canEdit}
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
                                            defaultValue={registroData.comentario}
                                            helperText={errors?.comentario?.message}
                                            {...register('comentario')}
                                            disabled={!canEdit}
                                            inputProps={{
                                                maxLength: 250,
                                            }}
                                        />
                                    </Grid>



                                    <Grid item xs={12} md={12} className="text-right">
                                        <div className="text-right">

                                            {
                                                (!canEdit && handleClose) && (
                                                    <>
                                                        <Button type="button" className={classes.bootonMargin} variant="outlined" color="secondary" onClick={handleClose ? handleClose : () => { }} >
                                                            Cerrar
                                                        </Button>
                                                    </>

                                                )
                                            }

                                            {
                                                !canEdit && (
                                                    <>
                                                        <Button
                                                            type="button"
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={editClienteData}
                                                        >
                                                            Editar
                                                        </Button>
                                                    </>

                                                )
                                            }

                                            {
                                                canEdit && (
                                                    <>
                                                        <Button
                                                            type="button"
                                                            variant="outlined"
                                                            color="secondary"
                                                            className={classes.bootonMargin}
                                                            onClick={cancelEditClientData}
                                                        >
                                                            Cancelar
                                                        </Button>

                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            color="primary"
                                                            disabled={loading}
                                                        >
                                                            {!loading && "Guardar"}
                                                            {loading && "Guardando"}
                                                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                                        </Button>
                                                    </>

                                                )
                                            }

                                        </div>

                                    </Grid>
                                </>
                            }
                        </Grid>
                    </div>
                </form>
            </Styles>
        </>
    )
}

export default FormEditClienteComponent;