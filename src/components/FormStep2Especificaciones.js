import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, Tooltip, Zoom } from '@material-ui/core';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { store } from 'react-notifications-component';
import CatalogosServices from '../services/CatalogosServices';

const schema = yup.object().shape({
    capacidad: yup.number("El campo debe ser númerico.").required("El campo es requerido.").min(1, "El mínimo debe ser 1 toneladas"),
    claro: yup.number().required().min(0.1, "El mínimo debe ser 0.1 mt").max(15.25, "El máximo debe ser 15.25 mts"),
    alturaTotal: yup.number().required().min(0.1, "El mínimo debe ser 0.1 mts").max(8, "El máximo debe ser 8 mts"),
    alturaIzaje: yup.number().required().min(0.1, "El mínimo debe ser 0.1 mts").max(8, "El máximo debe ser 8 mts"),
    // alturaColumna: yup.number().required().min(1, "El mínimo debe ser 1 mt"),
    recorrido: yup.number("Debe ingresar un número válido").required("Debe ingresar un número válido").min(1, "El mínimo debe ser 1 mts").max(1000, "El máximo debe ser 1000 mts")
});

const useStyles = makeStyles((theme) => ({
    root: {
        '& button': {
            margin: "0px 5px"
        },
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

    .mx-1{
        border-radius: 10px;
        border: 1px solid;
        padding: 5px;
    }

    .mx-1:hover{
        cursor:pointer;
        background-color: rgba(0,0,0,0.5);
        color:white;
    }

    .selected{
        background-color: rgba(0,0,0,0.5);
        color:white;
    }
`;

const FormStep2Especificaciones = (props) => {
    const cotizacion = props.cotizacion;
    const setCotizacion = props.setCotizacion;
    const setHandleNextFunction = props.setHandleNextFunction;
    const handleNext = props.handleNext;
    const refBtn = useRef();
    const [capacidades, setCapacidades] = React.useState([]);

    useEffect(() => {
        setHandleNextFunction(() => clickBtn);
        getCapacidades();
    }, []);

    const clickBtn = () => {
        refBtn.current.click()
    }

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            capacidad: cotizacion.capacidad || 1,
            claro: cotizacion.claro || 0.1,
            alturaTotal: cotizacion.alturaTotal || 0.1,
            alturaIzaje: cotizacion.alturaIzaje || 0.1,
            alturaColumna: cotizacion.alturaColumna || 0,
            recorrido: cotizacion.recorrido || 1,
            distancia: cotizacion.distancia || 0
        }
    });

    const getCapacidades = async () => {
        const capacidadesResult = await CatalogosServices.GetCapacidades();
        setCapacidades(capacidadesResult.data);
    }

    const submitForm = (data, e) => {
        const cotizacionUpdated = Object.assign({}, cotizacion);
        cotizacionUpdated.capacidad = data.capacidad;
        cotizacionUpdated.claro = data.claro;
        cotizacionUpdated.alturaTotal = data.alturaTotal;
        cotizacionUpdated.alturaIzaje = data.alturaIzaje;
        cotizacionUpdated.alturaColumna = data.alturaColumna;
        cotizacionUpdated.recorrido = data.recorrido;
        setCotizacion(cotizacionUpdated)
        // alert(JSON.stringify(data));
        handleNext();
    }

    const changeTon = (ton) => {
        setValue("capacidad", ton, {
            shouldValidate: true,
            shouldDirty: true
        });


        const cotizacionUpdated = Object.assign({}, cotizacion);
        cotizacionUpdated.polipasto = null;
        cotizacionUpdated.trole = null;
        // cotizacionUpdated.troleNombre = "NO_TROLE";
        setCotizacion(cotizacionUpdated)

    }

    return (
        <>
            <Styles>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
                    <Grid container spacing={2} className="animate__animated animate__fadeIn">
                        <Grid item md={12} xs={12}>
                            Seleccione la capacidad adecuada
                        </Grid>

                        {capacidades.map(cp => {
                            return <Grid item md={4} xs={12} className="text-center">
                                <div type="button" variant="outlined" color="primary" size="lg" className={`${getValues("capacidad") === cp.capacidad ? "selected" : ""} mx-1`} onClick={() => changeTon(cp.capacidad)}>
                                    {cp.capacidad} ton
                                </div>
                            </Grid>
                        })}

                        <Grid item md={12} xs={12} className="text-center">

                            <FormHelperText>{errors?.capacidad?.message}</FormHelperText>

                        </Grid>

                        <Grid item md={3} xs={12}>
                            <TextField
                                autoFocus
                                fullWidth
                                type="text"
                                name="claro"
                                label="Claro"
                                helperText={errors?.claro?.message}
                                {...register('claro')}
                                inputProps={{
                                    pattern: "\d*",
                                    maxLength: 5,
                                    min: 0.1,
                                    max: 15.25,
                                    step: 0.01
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            mts
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                type="text"
                                name="alturaTotal"
                                label="Altura total"
                                helperText={errors?.alturaTotal?.message}
                                {...register('alturaTotal')}
                                inputProps={{
                                    pattern: "\d*",
                                    maxLength: 3,
                                    min: 0.1,
                                    max: 8,
                                    step: 0.01
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            mts
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                type="text"
                                name="alturaIzaje"
                                label="Altura izaje"
                                helperText={errors?.alturaIzaje?.message}
                                {...register('alturaIzaje')}
                                inputProps={{
                                    pattern: "\d*",
                                    maxLength: 3,
                                    min: 0.1,
                                    max: 8,
                                    step: 0.01
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            mts
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        {/* <Grid item md={2} xs={12}>
                                <TextField
                                    fullWidth
                                    type="number"
                                    name="alturaColumna"
                                    label="Altura columna"
                                    helperText={errors?.alturaColumna?.message}
                                    {...register('alturaColumna')}
                                    inputProps={{
                                        maxLength: 20,
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                mts
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid> */}

                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth

                                type="text"
                                name="recorrido"
                                label="Recorrido"
                                helperText={errors?.recorrido?.message}
                                {...register('recorrido')}
                                inputProps={{
                                    pattern: "\d*",
                                    maxLength: 4,
                                    min: 1,
                                    max: 1000,
                                    step: 0.01
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            mts
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        {/* <Grid item md={12} xs={12}>
                            Imagenes ilustrativas...
                        </Grid> */}

                        <Button type="submit" ref={refBtn} hidden> Submit </Button>

                    </Grid>
                </form>
            </Styles>
        </>
    )

}

export default FormStep2Especificaciones;