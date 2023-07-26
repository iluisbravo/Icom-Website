import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Account from './AccountContext';
import { useHistory } from 'react-router';
import { store } from 'react-notifications-component';

const useStyles = makeStyles((theme) => ({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const schema = yup.object().shape({
    correo: yup.string().required(),
});


const FormMiContraseñaComponent = (props) => {
    const history = useHistory();
    const setStage = props.setStage;
    const setCorreo = props.setCorreo;

    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    useEffect(() => {

    }, []);

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

    const submitForm = (data, e) => {
        setLoading(true);
        console.log(data);
        const recuperarContraseñaData = data;
        Account.sendCodeToRevoveryPassword(recuperarContraseñaData.correo)
            .then(data => {
                // alert("Hemos mandado un codigo de verificación a tu correo....");
                showAlert("Excelente", "Hemos mandado un código de verificación a tu correo...", "success");
                setStage(2);
                setLoading(false);
                setCorreo(recuperarContraseñaData.correo);
            })
            .catch(err => {
                setLoading(false);
                alert(err);
                showAlert("Error", err.status + " " + err.statusText, "warning");
            })


    }

    return (
        <>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                        <div className="text-center">
                            <h4 className="orange">Recuperar Contraseña</h4>
                        </div>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
                            name="correo"
                            label="Correo"
                            type="email"
                            helperText={errors?.correo?.message}
                            {...register('correo')}
                            inputProps={{
                                maxLength: 50,
                            }}
                        />
                    </Grid>
                    <Grid item md={6} xs={12} >
                        <Button fullWidth type="submit" variant="contained" color="primary" disabled={loading}>
                            {!loading && "Recuperar"}
                            {loading && "Enviando"}
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Button>

                    </Grid>
                    <Grid item md={6} xs={12} >
                        <Button fullWidth type="button" variant="outlined" color="secondary" onClick={() => history.push("/")}>
                            Log In
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default FormMiContraseñaComponent;