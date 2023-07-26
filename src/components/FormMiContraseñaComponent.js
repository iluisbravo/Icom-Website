import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';


import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Account from './AccountContext';

import { store } from 'react-notifications-component';

const schema = yup.object().shape({
    password1: yup.string().min(8,"Mínimo 8 caracteres.").max(16,"Máximo 16 caracteres.").required(),
    password2: yup.string().min(8,"Mínimo 8 caracteres.").max(16,"Máximo 16 caracteres.").required()
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

`;

const FormMiContraseñaComponent = (props) => {
    const auth = props.auth;
    const userAuth = auth.user;

    const classes = useStyles();
    const cancelFunction = props.cancelFunction;
    const [canEdit, setCanEdit] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const [passwords, setPasswords] = useState(null);

    useEffect(() => {
        setPasswords({
            password1: "",
            password2: ""
        });
    }, []);

    useEffect(() => {
        reset(passwords);
    }, [passwords]);

    const editUserData = () => {
        setCanEdit(true);
    }

    const cancelEditUserData = () => {
        setCanEdit(false);
    }

    const submitForm = (data, e) => {
        
        const registroData = data;
        setLoading(true);
        Account.getSession()
            .then(({ user }) => {
                user.changePassword(registroData.password1, registroData.password2, (err, result) => {
                    if (err) {
                        console.error(err);
                        showAlert("Error", String(err), "danger");
                    }
                    else {
                        showAlert("Excelente", "Contraseña actualizada!", "success");
                    }
                    
                    setPasswords({
                        password1: "",
                        password2: ""
                    });
                    
                    setCanEdit(false);
                    setLoading(false);
                });
            })
            .catch(err => {
                setCanEdit(false);
                setLoading(false);
                console.error("Error password: ", err);
                showAlert("Error", String(err || err.message), "danger");
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
                            <Grid item md={12} xs={12}>
                                <h4 className="orange">Mi Contraseña</h4>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    fullWidth
                                    name="password1"
                                    label="Password Actual"
                                    type="password"
                                    helperText={errors?.password1?.message}
                                    {...register('password1')}
                                    disabled={!canEdit}
                                    inputProps={{
                                        maxLength: 16,
                                        minLength:8
                                    }}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    fullWidth
                                    name="password2"
                                    label="Password Nueva"
                                    type="password"
                                    helperText={errors?.password2?.message}
                                    {...register('password2')}
                                    disabled={!canEdit}
                                    inputProps={{
                                        maxLength: 16,
                                        minLength:8
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className="text-rigth">

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
                                                    onClick={cancelEditUserData}
                                                    className={classes.bootonMargin}
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
                        </Grid>
                    </div>
                </form>
            </Styles>
        </>
    )
}

export default FormMiContraseñaComponent;