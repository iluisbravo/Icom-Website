import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Account from './AccountContext';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import ImgUserProfileComponent from './ImgUserProfileComponent';
import UserServices from '../services/UsersServices';

import { store } from 'react-notifications-component';

const schema = yup.object().shape({
    nombre: yup.string().required("Campo requerido").matches(/^([a-zA-Z]+(\s+[a-zA-Z]+){0,3})$/g, "Ingrese un nombre válido"),
    apellido: yup.string().required("Campo requerido").matches(/^([a-zA-Z]+(\s+[a-zA-Z]+){0,1})$/g, "Ingrese un nombre válido"),
    prefijoTelefono: yup.string().required("Campo requerido"),
    telefono: yup.string().required("Campo requerido").matches(/^([0-9]{10})$/g, "Ingrese un teléfono válido"),
    correo: yup.string().required("Campo requerido").email("Ingrese un correo válido"),
    direccion: yup.string().required("Campo requerido"),
    ciudad: yup.string().required("Campo requerido"),
    idTipoUsuario: yup.string().required("Campo requerido"),
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

const FormMiPerfilComponent = (props) => {
    const isAdmin = props.isAdmin || false;
    const auth = props.auth;
    const userAuth = auth?.user;
    const userSelected = props.userSelected;
    const setUserSelected = props.setUserSelected;

    const classes = useStyles();
    const handleClose = props.handleClose;
    const [tiposUsuarios, setTiposUsuarios] = useState([]);
    const [canEdit, setCanEdit] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const [registroData, setRegistroData] = React.useState({
        id: null,
        tkn: null,
        nombre: null,
        apellido: null,
        prefijoTelefono: null,
        telefono: null,
        correo: null,
        direccion: null,
        ciudad: null,
        tipoUsuario: null,
        idTipoUsuario: null,
        imgUrl: null,
        imgNombre: null
    });

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: registroData
    });

    useEffect(() => {
        
        let userToUpdate = {};
        if (userSelected) {
            userToUpdate.attributes = userSelected;
        }
        else {
            userToUpdate = userAuth;
        }

        let getRegistroData = {};
        getRegistroData = {
            id: userToUpdate.attributes.id,
            token: userToUpdate.attributes.token,
            nombre: userToUpdate.attributes.nombre,
            apellido: userToUpdate.attributes.apellido,
            prefijoTelefono: userToUpdate.attributes.telefono.substring(0, 3),
            telefono: userToUpdate.attributes.telefono.substring(3),
            correo: userToUpdate.attributes.correo,
            direccion: userToUpdate.attributes.direccion,
            ciudad: userToUpdate.attributes.ciudad,
            tipoUsuario: userToUpdate.attributes.tipoUsuario,
            idTipoUsuario: userToUpdate.attributes.idTipoUsuario,
            imgUrl: userToUpdate.attributes.imgUrl,
            imgNombre: userToUpdate.attributes.imgNombre
        }

        setRegistroData(getRegistroData);
        getTiposUsuarios(getRegistroData.idTipoUsuario);
        reset(getRegistroData);       

    }, [reset]);

    const tiposUsuariosDefault = [
        // { idTipoUsuario: "", tipoUsuario: "Selecciona tipo de usuario" },
        { id: "1", user_type: "Ventas" },
        { id: "2", user_type: "Gerente" },
        { id: "3", user_type: "Administrador" }
    ];

    const getTiposUsuarios = async (idTipoUsuario) => {

        if (idTipoUsuario !== "3" && idTipoUsuario !== "2" && idTipoUsuario !== "1") {
            const resultUserTypes = await UserServices.GetUserTypes();
            setTiposUsuarios(resultUserTypes.data);
        }
        else {
            setTiposUsuarios(tiposUsuariosDefault);
        }
    }

    const getTipoUsuario = (idUserType) => {
        let tipoUsuario;

        tipoUsuario = tiposUsuarios.find(tu => tu.id === idUserType)?.tipoUsuario;

        if (!tipoUsuario) {
            tipoUsuario = tiposUsuariosDefault.find(tu => tu.id === idUserType).tipoUsuario;
        }

        return tipoUsuario;
    }

    const codigosPorPais = [
        // { idTipoUsuario: "", tipoUsuario: "Selecciona tipo de usuario" },
        { codigo: "+52", pais: "México" },
        // { codigo: "+51", pais: "USA" },
        // { codigo: "+34", pais: "España" }
    ];


    const editUserData = () => {
        setCanEdit(true);
    }

    const cancelEditUserData = () => {
        setCanEdit(false);
    }

    const submitForm = (data, e) => {
        console.log(data);
        const registroDataReg = data;
        registroDataReg.telefono = data.prefijoTelefono + "" + data.telefono;

        setLoading(true);

        saveUserData(registroDataReg);

    }

    const saveUserData = async (registroDataReg) => {

        const editUserResult = await UserServices.EditUser({
            id: registroData.id,
            tkn: registroData.token,
            nombre: registroDataReg.nombre,
            apellido: registroDataReg.apellido,
            direccion: registroDataReg.direccion,
            ciudad: registroDataReg.ciudad,
            telefono: registroDataReg.telefono,
            correo: registroData.correo,
            // tipoUsuario: getTipoUsuario(registroDataReg.idTipoUsuario),
            idTipoUsuario: registroDataReg.idTipoUsuario,
            imgUrl: registroData.imgUrl,
            imgNombre: registroData.imgNombre
        });

        if (editUserResult.status === 200) {

            if (userAuth) {

                const userSession = {
                    idToken: userAuth.idToken,
                    attributes: editUserResult.data
                }

                auth.setUser(userSession);
            }

            if (userSelected) {
                const userUpdated = editUserResult.data;

                userSelected.id = userUpdated.id;
                userSelected.nombre = userUpdated.nombre;
                userSelected.apellido = userUpdated.apellido;
                userSelected.telefono = userUpdated.telefono;
                userSelected.direccion = userUpdated.direccion;
                userSelected.ciudad = userUpdated.ciudad;
                userSelected.activo = userUpdated.activo;
                userSelected.correo = userUpdated.correo;
                userSelected.imgUrl = userUpdated.imgUrl;
                userSelected.imgNombre = userUpdated.imgNombre;
                userSelected.tipoUsuario = userUpdated.tipoUsuario;
                userSelected.idTipoUsuario = userUpdated.idTipoUsuario;

                setUserSelected(userSelected);
            }

            showAlert("Excelente", "Información del perfil actualizada!", "success");
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

    const saveMyUserDataCognito = (registroDataReg) => {
        Account.getSession()
            .then(({ user, email }) => {

                const attributeList = [];
                attributeList.push(new CognitoUserAttribute({ Name: "name", Value: registroDataReg.nombre }));
                attributeList.push(new CognitoUserAttribute({ Name: "family_name", Value: registroDataReg.apellido }));
                attributeList.push(new CognitoUserAttribute({ Name: "phone_number", Value: registroDataReg.telefono }));
                // attributeList.push(new CognitoUserAttribute({ Name: "email", Value: registroData.correo }));
                attributeList.push(new CognitoUserAttribute({ Name: "address", Value: registroDataReg.direccion }));
                attributeList.push(new CognitoUserAttribute({ Name: "custom:city", Value: registroDataReg.ciudad }));

                user.updateAttributes(attributeList, (err, result) => {
                    if (err) {
                        showAlert("Error", err, "danger");
                        console.errlor(err);
                    }
                    else {
                        console.log(result);
                        Account.getUserAttributes()
                            .then(async (attributes) => {

                                let userActualizado = Object.assign({}, auth.user);

                                userActualizado.attributes.nombre = attributes.nombre;
                                userActualizado.attributes.family_name = attributes.family_name;
                                userActualizado.attributes.phone_number = attributes.phone_number;
                                userActualizado.attributes.correo = attributes.correo;

                                userActualizado.attributes.direccion = {};

                                userActualizado.attributes.direccion.formatted = attributes.direccion;
                                userActualizado.attributes["custom:city"] = attributes["custom:city"];
                                userActualizado.attributes["custom:type_user"] = attributes["custom:type_user"];
                                userActualizado.attributes["custom:type_user_id"] = attributes["custom:type_user_id"];


                                const editUserResult = await UserServices.EditUser({
                                    id: userActualizado.attributes.sub,
                                    name: registroDataReg.nombre,
                                    lastName: registroDataReg.apellido,
                                    address: registroDataReg.direccion,
                                    city: registroDataReg.ciudad,
                                    phone: registroDataReg.telefono,
                                    typeUser: getTipoUsuario(registroDataReg.idTipoUsuario),
                                    typeUserId: registroDataReg.idTipoUsuario
                                });

                                if (editUserResult.status === 200) {
                                    auth.setUser(userActualizado);
                                    showAlert("Excelente", "Información del perfil actualizada!", "success");
                                    setCanEdit(false);
                                }

                            })
                            .catch(err => {
                                console.error("Session error: ", err);
                                showAlert("Error", err, "danger");
                            });
                    }
                });

            })
            .catch(err => {
                console.error(err);
                showAlert("Error", err, "danger");
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
                            {
                                registroData.nombre &&
                                <>
                                    {

                                        (!userSelected) && (
                                            <>
                                                <Grid item md={12} xs={12}>
                                                    <div className="text-center">
                                                        <ImgUserProfileComponent
                                                            imgUrl={registroData.imgUrl}
                                                            imgName={registroData.imgNombre}
                                                            userId={registroData.id}
                                                            auth={auth}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <h4 className="orange">Mi Perfil</h4>
                                                </Grid>
                                            </>
                                        )

                                    }

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
                                                maxLength: 20,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            name="apellido"
                                            label="Apellido"
                                            defaultValue={registroData.apellido}
                                            helperText={errors?.apellido?.message}
                                            {...register('apellido')}
                                            disabled={!canEdit}
                                            inputProps={{
                                                maxLength: 20,
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
                                            disabled
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

                                    {isAdmin && (
                                        <Grid item md={12} xs={12}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="tipo-usuario-select">
                                                    Tipo de Usuario
                                                </InputLabel>
                                                <Controller
                                                    control={control}
                                                    name="idTipoUsuario"
                                                    render={({ field: { onChange, value } }) => (
                                                        <>
                                                            <Select
                                                                id="tipo-usuario-select"
                                                                onChange={onChange}
                                                                defaultValue={registroData.idTipoUsuario}
                                                                value={value}
                                                                disabled={isAdmin === true && canEdit === true ? false : true}>
                                                                {tiposUsuarios.map((tu) => {
                                                                    return (
                                                                        <MenuItem value={tu.id}>
                                                                            {tu.tipoUsuario}
                                                                        </MenuItem>)
                                                                })}
                                                            </Select>
                                                            <FormHelperText>{errors?.tipoUsuario?.message}</FormHelperText>
                                                        </>
                                                    )}

                                                />
                                            </FormControl>
                                        </Grid>
                                    )}

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
                                                            onClick={editUserData}
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
                                                            onClick={cancelEditUserData}
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

export default FormMiPerfilComponent;