import { Button, FormControl, FormHelperText, FormLabel, Grid, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle';
import CotizacionesServices from "../../services/CotizacionesServices";
import { store } from "react-notifications-component";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Formatos from "../../utils/Formatos";

const Styles = styled.div` 
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

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

const FormDetalleInstalacion = (props) => {
    const setShowDetalle = props.setShowDetalle;
    const isAdmin = props.isAdmin;
    const cotizacion = props.cotizacion;
    const setCotizacion = props.setCotizacion;
    const editar = props.editar;
    const setEditar = props.setEditar;
    const [polipasto, setPolipasto] = useState(cotizacion.polipasto);
    const [trole, setTrole] = useState(cotizacion.trole);
    const classes = useStyles();

    

    const constrains = cotizacion.instalacion.conceptos
        .reduce((acc, cur) =>
        (
            {
                ...acc, [cur.Concepto.replace(/\./g, '').replace(/\s/g, '')]:
                    yup.number("El campo debe ser numerico.").required("El campo es requerido.").min(1, "Debe ser un valor mayor a 0")
            }
        ), {});

    const schema = yup.object().shape(constrains);
    
    const defaultValues = cotizacion.instalacion.conceptos
        .reduce((acc, cur) =>
        (
            {
                ...acc, [cur.Concepto.replace(/\./g, '').replace(/\s/g, '')]:
                    cur.Monto
            }
        ), {});



    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
        // defaultValues: {
        //     montacargas: cotizacion.montacargas,
        //     gradall: cotizacion.gradall,
        //     diesel: cotizacion.diesel,
        //     mo_instalacion_electrica: cotizacion.mo_instalacion_electrica,
        //     mo_instalacion_mecanica: cotizacion.mo_instalacion_mecanica,
        //     tijeras_elevacion: cotizacion.tijeras_elevacion,
        //     viaticos: cotizacion.viaticos,
        //     cimentacion: cotizacion.cimentacion,
        //     anclaje: cotizacion.anclaje,
        //     otros_instalacion: cotizacion.otros_instalacion,
        //     calcular_con: cotizacion.calcular_con
        // }
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
        console.log(data, "INSTALACION DATA");

        let objetoConceptos = [
            {
                "idConcepto": 22,
                "concepto": "Montacargas",
                "monto": Number(data.Montacargas)
            },
            {
                "idConcepto": 23,
                "concepto": "Gradall",
                "monto": Number(data.Gradall)
            },
            {
                "idConcepto": 24,
                "concepto": "Diesel",
                "monto": Number(data.Diesel)
            },
            {
                "idConcepto": 25,
                "concepto": "M.O. Instalación elétrica",
                "monto": Number(data.MOInstalaciónelétrica)
            },
            {
                "idConcepto": 26,
                "concepto": "M.O. Instalación mecánica",
                "monto": Number(data.MOInstalaciónmecánica)
            },
            {
                "idConcepto": 27,
                "concepto": "Tijeras de elevación",
                "monto": Number(data.Tijerasdeelevación)
            },
            {
                "idConcepto": 28,
                "concepto": "Viáticos",
                "monto": Number(data.Viáticos)
            },
            {
                "idConcepto": 29,
                "concepto": "Cimentación",
                "monto": Number(data.Cimentación)
            },
            {
                "idConcepto": 30,
                "concepto": "Anclaje",
                "monto": Number(data.Anclaje)
            },
            {
                "idConcepto": 31,
                "concepto": "Otros",
                "monto": Number(data.Otros)
            }
        ];

        
        
        const edicionResult = await CotizacionesServices.EditarInstalacion({
            idCotizacion: cotizacion.encabezado.id,
            conceptos: objetoConceptos
        });

        if (!edicionResult.hasError) {
            showAlert("Excelente", "Otros editado con éxito", "success");
            
            setCotizacion({ ...cotizacion, ...{ instalacion: edicionResult.data } });
        }
        else {
            showAlert("Error", edicionResult.message || edicionResult.detail, "danger");
        }
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
                        <Grid item sm={12} md={12}>
                            <h6 className="text-center">Detalle Instalación</h6>
                        </Grid>
                        {
                            cotizacion.instalacion.conceptos.map(c => {
                                return <>

                                    <Grid item sm={12} md={6}>
                                        <InputLabel>{c.Concepto}</InputLabel>
                                    </Grid>
                                    <Grid item sm={12} md={6}>
                                        <FormControl fullWidth>
                                            <Input
                                                id={c.id}
                                                type="number"
                                                name={c.Concepto}
                                                defaultValue={c.Monto}
                                                {...register(c.Concepto.replace(/\./g, '').replace(/\s/g, ''))}
                                                inputProps={{
                                                    maxLength: 20,
                                                }}
                                                disabled={isAdmin() && !editar}
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            />
                                            <FormHelperText>{errors?.[c.Concepto.replace(/\./g, '').replace(/\s/g, '')]?.message}</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </>
                            })
                        }
                        <Grid item sm={12} md={12}>
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

export default FormDetalleInstalacion;