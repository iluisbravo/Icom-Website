import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Account from './AccountContext';
import { useHistory } from 'react-router';
import { store } from 'react-notifications-component';

const schema = yup.object().shape({
    codigo: yup.string().required(),
    password1: yup.string().min(4).max(15).required(),
    password2: yup.string().required().oneOf([yup.ref("password1"), null])
});

const useStyles = makeStyles((theme) => ({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));



const FormVerificacionCodigoContraseñaComponent = (props) => {
    const history = useHistory();
    const setStage = props.setStage;
    const correo = props.correo;

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
        Account.resetPassword(correo, recuperarContraseñaData.codigo, recuperarContraseñaData.password1)
            .then(data => {
                setLoading(false);
                setStage(1);
                // alert("Contraseña actualizada!");
                showAlert("Excelente", "Contraseña actualizada", "success");
            })
            .catch(err => {
                setLoading(false);
                alert(err);
                showAlert("Error", err.status + " " + err.statusText, "warning");
            });
    }

    return (
        <>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                        <div className="text-center">
                            <h4 className="orange">Cambiar Contraseña</h4>
                        </div>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
                            name="codigo"
                            label="Código de Verificación"
                            type="text"
                            helperText={errors?.codigo?.message}
                            {...register('codigo')}
                            inputProps={{
                                maxLength: 20,
                            }}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
                            name="password1"
                            label="Password Nueva"
                            type="password"
                            helperText={errors?.password1?.message}
                            {...register('password1')}
                            inputProps={{
                                maxLength: 16,
                            }}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
                            name="password2"
                            label="Confirmar Password"
                            type="password"
                            helperText={errors?.password2?.message}
                            {...register('password2')}
                            inputProps={{
                                maxLength: 16,
                            }}
                        />
                    </Grid>

                    <Grid item md={12} xs={12} >
                        <Button fullWidth type="submit" variant="contained" color="primary" disabled={loading}>
                            {!loading && "Cambiar"}
                            {loading && "Cambiando"}
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Button>

                    </Grid>
                </Grid>
            </form>
        </>
    )
}

export default FormVerificacionCodigoContraseñaComponent;