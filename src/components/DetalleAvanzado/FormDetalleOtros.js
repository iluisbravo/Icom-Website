import { Button, FormControl, FormHelperText, FormLabel, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Formatos from "../../utils/Formatos";
import CotizacionesServices from "../../services/CotizacionesServices";
import { store } from "react-notifications-component";

const schema = yup.object().shape({
    memoriaCalculo: yup.number("El campo debe ser numerico.").required("El campo es requerido.").min(1, "Debe ser un valor mayor a 0"),
    manoObra: yup.number("El campo debe ser numerico.").required("El campo es requerido.").min(1, "Debe ser un valor mayor a 0"),
    flete: yup.number("El campo debe ser numerico.").required("El campo es requerido.").min(1, "Debe ser un valor mayor a 0"),
    otros: yup.number("El campo debe ser numerico.").required("El campo es requerido.").min(1, "Debe ser un valor mayor a 0")
});

const Styles = styled.div` 
    /* table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    } */
`;

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        // position: 'relative',
        // right: theme.spacing(0),
        color: theme.palette.grey[500],
        float: 'right'
    },
}));



const FormDetalleOtros = (props) => {
    const setShowDetalle = props.setShowDetalle;
    const isAdmin = props.isAdmin;
    const cotizacion = props.cotizacion;
    const setCotizacion = props.setCotizacion;
    const editar = props.editar;
    const setEditar = props.setEditar;
    const [polipasto, setPolipasto] = useState(cotizacion.polipasto);
    const [trole, setTrole] = useState(cotizacion.trole);
    const classes = useStyles();

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            memoriaCalculo: cotizacion.otros.memoriaCalculo.monto,
            manoObra: cotizacion.otros.manoObra.monto,
            referenciaManoObra: Formatos.GetFormatoNumero(cotizacion.otros.manoObra.referencia),
            flete: cotizacion.otros.flete.monto,
            otros: cotizacion.otros.otros.monto
        }
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

    const editarBtnClick = () => {
        setEditar(true);
    }

    const cancelarBtnClick = () => {
        setEditar(false);
    }

    const submitForm = async (data, e) => {
        console.log(data, "OTROS EDITADO")

        let objetoConceptos = [
            {
                "idConcepto": 17,
                "concepto": "Memoria de cálculo",
                "monto": Number(data.memoriaCalculo)
            },
            {
                "idConcepto": 18,
                "concepto": "M.O. Fabricación mecánica",
                "monto": Number(data.manoObra)
            },
            {
                "idConcepto": 19,
                "concepto": "Flete",
                "monto": Number(data.flete)
            },
            {
                "idConcepto": 20,
                "concepto": "Otros",
                "monto": Number(data.otros)
            }
        ];
        
        const edicionResult = await CotizacionesServices.EditarOtros({
            idCotizacion: cotizacion.encabezado.id,
            conceptos: objetoConceptos
        });

        if (!edicionResult.hasError) {
            showAlert("Excelente", "Otros editado con éxito", "success");
            
            setCotizacion({ ...cotizacion, ...{ otros: edicionResult.data } });
        }
        else {
            showAlert("Error", edicionResult.message || edicionResult.detail, "danger");
        }
        setEditar(false);

        // setCotizacion({ ...cotizacion, ...data });
        setEditar(false);
    }

    return (
        <>
            <Styles>
                <IconButton className={classes.closeButton} aria-label="close" onClick={() => { setEditar(false); setShowDetalle(false); }}>
                    <CloseIcon />
                </IconButton>
                <form className="formBorder" noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <h6 className="text-center">Detalle Otros</h6>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <label className="inputLabel">Memoria de cálculo</label>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <Input
                                    type="number"
                                    name="memoriaCalculo"
                                    {...register('memoriaCalculo')}
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                    disabled={isAdmin() && !editar}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                                <FormHelperText>{errors?.memoriaCalculo?.message}</FormHelperText>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12} md={6}>
                            <label className="inputLabel">M.O. Fabricación mecánica</label>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <Input
                                    type="number"
                                    name="manoObra"
                                    helperText={errors?.manoObra?.message}
                                    {...register('manoObra')}
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                    disabled={isAdmin() && !editar}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                                <FormHelperText>{errors?.manoObra?.message}</FormHelperText>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12} md={6}>
                            <label className="inputLabel">M.O. Referencia (kg)</label>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <Input
                                    type="text"
                                    name="referenciaManoObra"
                                    helperText={errors?.referenciaManoObra?.message}
                                    {...register('referenciaManoObra')}
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                    disabled
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                                <FormHelperText>{errors?.referenciaManoObra?.message}</FormHelperText>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12} md={6}>
                            <label className="inputLabel">Flete</label>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <Input
                                    type="number"
                                    name="flete"
                                    helperText={errors?.flete?.message}
                                    {...register('flete')}
                                    inputProps={{
                                        maxLength: 20,
                                        step: 0.1
                                    }}
                                    disabled={isAdmin() && !editar}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                                <FormHelperText>{errors?.flete?.message}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormLabel className="inputLabel">Otros</FormLabel>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                                <Input
                                    type="number"
                                    name="otros"
                                    helperText={errors?.otros?.message}
                                    {...register('otros')}
                                    inputProps={{
                                        maxLength: 20,
                                        step: 0.1,
                                        min: 0
                                    }}
                                    disabled={isAdmin() && !editar}
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                                <FormHelperText>{errors?.otros?.message}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <Button
                                type="submit"
                                disabled={!editar}
                            // onClick={backStep}
                            >
                                Guardar
                            </Button>

                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                onClick={editar === true ? cancelarBtnClick : editarBtnClick}
                            >
                                {editar === true ? "Cancelar" : "Editar"}
                            </Button>
                        </Grid>
                    </Grid>




                </form>
            </Styles>
        </>
    )
}

export default FormDetalleOtros;