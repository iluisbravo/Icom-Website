import { Button, FormControl, FormHelperText, Grid, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CotizacionesServices from "../../services/CotizacionesServices";
import { store } from "react-notifications-component";

const schema = yup.object().shape({
    tipo_cambio: yup.number("El campo debe ser numerico.").required("El campo es requerido.").min(1, "Debe ser un valor mayor a 0"),
    margen: yup.number("El campo debe ser numerico.").required("El campo es requerido.").min(1, "Debe ser un valor mayor a 0"),
    //moneda: yup.number("El campo debe ser numerico.").required("El campo es requerido.").min(1, "Debe ser un valor mayor a 0"),
});


const FormStepMargen = (props) => {
    const setStepValue = props.setStepValue;
    const value = props.value;
    const nextStep = props.nextStep;
    const backStep = props.backStep;
    const isAdmin = props.isAdmin;
    const cotizacion = props.cotizacion;
    const setCotizacion = props.setCotizacion;
    const [editar, setEditar] = useState(false);
    const cancelFunction = props.cancelFunction;

    const [moneda, setMoneda] = useState(cotizacion.encabezado.moneda);

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            tipo_cambio: cotizacion.encabezado.tipoCambio,
            margen: cotizacion.encabezado.margen,
            moneda: cotizacion.encabezado.moneda,
        }
    });

    const editarBtnClick = () => {
        setEditar(true);
    }

    const cancelarBtnClick = () => {
        setEditar(false);
    }

    const handleChange = (event) => {
        setMoneda(event.target.value);
        // cotizacion.encabezado.moneda = event.target.value;
        // setCotizacion(cotizacion);
    };

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

    const submitForm = async (data, e) => {
        // setCotizacion({ ...cotizacion, ...data});
        // setEditar(false);

        const edicionResult = await CotizacionesServices.EditarMargen({
            idCotizacion: cotizacion.encabezado.id,
            margen: data.margen,
            moneda: moneda,
            tipoCambio: data.tipo_cambio
        });



        if (!edicionResult.hasError) {
            showAlert("Excelente", "Margen editado con éxito", "success");

            edicionResult.data.moneda = moneda;
            setCotizacion({ ...cotizacion, ...{ encabezado: edicionResult.data } });
        }
        else {
            showAlert("Error", edicionResult.message || edicionResult.detail, "danger");
        }
        setEditar(false);
    }

    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                        <h6 className="orange">Margen y tipo de cambio</h6>
                    </Grid>

                    <Grid item md={4} xs={12}>
                        <Grid container spacing={2}>

                            <Grid item md={6} xs={12}>
                                <label className="inputLabel">Tipo de cambio</label>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth>
                                    <Input
                                        type="number"
                                        name="tipo_cambio"
                                        helperText={errors?.tipo_cambio?.message}
                                        {...register('tipo_cambio')}
                                        inputProps={{
                                            maxLength: 20,
                                        }}
                                        disabled={!editar}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    />
                                    <FormHelperText>{errors?.tipo_cambio?.message}</FormHelperText>
                                </FormControl>
                            </Grid>


                            <Grid item md={6} xs={12}>
                                <label className="inputLabel">Margen</label>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth>
                                    <Input
                                        type="number"
                                        name="margen"
                                        helperText={errors?.margen?.message}
                                        {...register('margen')}
                                        inputProps={{
                                            maxLength: 20,
                                        }}
                                        disabled={!editar}
                                        startAdornment={<InputAdornment position="start">%</InputAdornment>}
                                    />
                                    <FormHelperText>{errors?.margen?.message}</FormHelperText>
                                </FormControl>
                            </Grid>



                            <Grid item md={6} xs={12}>
                                <label className="inputLabel">Moneda</label>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={moneda}
                                        onChange={handleChange}
                                        disabled={!editar}
                                    >
                                        <MenuItem value="MXN">MXN</MenuItem>
                                        <MenuItem value="USD">USD</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors?.moneda?.message}</FormHelperText>
                                </FormControl>
                            </Grid>

                        </Grid>
                    </Grid>

                    {isAdmin() === true && (
                        <Grid item md={12} xs={12} className="text-left">
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
                    )
                    }
                    <Grid item md={12} xs={12} className="text-right">
                        <Button
                            type="button"
                            disabled={value === 0 || editar}
                            onClick={backStep}
                        >
                            Regresar
                        </Button>

                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={cancelFunction}
                            disabled={editar}
                        >
                            Finalizar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default FormStepMargen;