import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { CircularProgress, Grid, Link, Collapse, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Account from '../components/AccountContext';
import Alert from '@material-ui/lab/Alert';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UserServices from '../services/UsersServices';

import { store } from 'react-notifications-component';

const schema = yup.object().shape({
    correo: yup.string().email().required(),
    password: yup.string().required()
});

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
        padding:0px !important;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px !important;
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

    .imgSection{
        /* background-image: url("https://images.unsplash.com/photo-1620656596956-193d23950929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1270&q=80"); */
        background-image: url("./img/IcomGrua.png");
        background-position: left;
        background-size: cover;
        height    : 100% ;
        border-top-right-radius: 10px !important;
        border-bottom-right-radius: 10px !important;
    }

    .formPadding{
        padding: 30px ;
        padding-bottom: 45px;
    }

    .imgLogoIcom{
        height: 18vh;
        /* border: 1px solid; */
        padding: 15px;
        margin: 15px;
        /* border-radius: 100px;
        box-shadow: rgb(99 99 99 / 50%) 0px 2px 8px 0px; */

        border: 4px solid gray;
        padding: 2px;
        border-radius: 50%;
        border-top-color: #f05522;
        border-left-color: #f05522;
    }
`;

const LogIn = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const auth = props.auth;

    const [loading, setLoading] = React.useState(false);


    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema)
    });

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

    const logIn = (data, e) => {
        //conectar con el servicio para login
        setLoading(true);
        const loginData = data;
        Account.authenticate(loginData.correo, loginData.password)
            .then(async (data) => {

                let userSession = {
                    idToken: data.idToken.jwtToken,
                    attributes: data.idToken.payload
                }

                //usar servicio login
                const userLoginResult = await UserServices.logIn({ id: userSession.attributes.sub, token: userSession.idToken });

                //Obtener informacion del usuario de la bd
                const userDataResult = await UserServices.GetUserById(userSession.attributes.sub);

                //Formato para atributos del usuario
                userSession.attributes = userDataResult.data;

                if (userDataResult.status === 200) {
                    if (userSession.attributes.activo === true) {
                        auth.setUser(userSession);
                        auth.setIsAuthenticated(true);
                        history.push("/Cotizaciones");
                    }
                    else {
                        showAlert("Aviso", "El usuario esta desactivado", "warning");
                        Account.logOut();
                    }
                }
                else {
                    showAlert("Aviso", userDataResult.detail, "warning");
                    Account.logOut();
                }


                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                showAlert("Error", err.message, "danger");
                console.error(err);
            });
    }

    return (
        <>
            <Styles>
                {
                    (auth.isAuthenticated) && (
                        history.push("/Cotizaciones")
                    )
                }
                {
                    (!auth.isAuthenticated) && (
                        <form className="contentForm" noValidate autoComplete="off" onSubmit={handleSubmit(logIn)}>
                            <div className="text-center">

                                <Grid container spacing={0}>
                                    <Grid item md={6} xs={12}>
                                        <Grid container className="formPadding" spacing={2}>
                                            <Grid item md={12} xs={12}>
                                                <img className="imgLogoIcom" src='https://www.industrialcom.com.mx/wp-content/uploads/2020/07/cropped-icom-1-192x192.png' alt="logo.img" />
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <h4 className="orange">Hola, ¡Bienvenid@!</h4>
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <h6 className="gray">Sistema de Cotizaciones</h6>
                                            </Grid>
                                            <Grid item md={1} xs={12}>

                                            </Grid>
                                            <Grid item md={10} xs={12}>
                                                <Grid container spacing={2}>
                                                    <Grid item md={12} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            name="correo"
                                                            label="Correo"
                                                            helperText={errors?.correo?.message}
                                                            {...register('correo')}
                                                            inputProps={{
                                                                maxLength: 50,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={12} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            name="password"
                                                            label="Password"
                                                            type="password"
                                                            helperText={errors?.password?.message}
                                                            {...register('password')}
                                                            inputProps={{
                                                                maxLength: 16,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item md={12} xs={12}>
                                                        <div className="text-rigth text-small">
                                                            <Link onClick={() => history.push("/RecuperarContraseña")}>Recuperar contraseña</Link>
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={12} xs={12}>
                                                        <Button fullWidth type="submit" variant="contained" color="primary" disabled={loading}>
                                                            {!loading && "Entrar"}
                                                            {loading && "Entrando"}
                                                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <div className="imgSection">

                                        </div>
                                        {/* <img src={image} alt="Icom.img" height="350" /> */}
                                    </Grid>
                                </Grid>


                            </div>
                        </form>
                    )

                }
            </Styles>
        </>
    )
}

export default LogIn;