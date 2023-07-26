import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import React, { useEffect, useRef, useState } from 'react';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@material-ui/core';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CatalogosServices from '../services/CatalogosServices';


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

const FormStep4Puente = (props) => {

    const cotizacion = props.cotizacion;
    const setCotizacion = props.setCotizacion;
    const setHandleNextFunction = props.setHandleNextFunction;
    const handleNext = props.handleNext;
    const refBtn = useRef();

    const schema = cotizacion.capacidad < 3 ? yup.object().shape({
        puentes: yup.number("El campo debe ser númerico.").required("El campo es requerido.").min(0),
        polipasto: yup.string("El campo es requerido.").nullable(false, "El campo es requerido.").required("El campo es requerido."),
        trole: yup.string("El campo es requerido.").nullable(false, "El campo es requerido.").required("El campo es requerido.")
    })
        :
        yup.object().shape({
            puentes: yup.number("El campo debe ser númerico.").required("El campo es requerido.").min(0),
            polipasto: yup.string("El campo es requerido.").nullable(false, "El campo es requerido.").required("El campo es requerido."),
            trole: yup.string("El campo es requerido.").nullable(false, "El campo es requerido.")
        });

    const [puentes, setPuentes] = useState([]);
    const [polipastos, setPolipastos] = useState([]);
    const [troles, setTroles] = useState([]);

    useEffect(() => {
        setHandleNextFunction(() => clickBtn);
        getPuentes();
        getPolipastos();
        getTroles();
    }, []);

    useEffect(() => {

        if (!cotizacion.polipasto
            && !cotizacion.trole
            && polipastos.length > 0
            && troles.length > 0)
            getDefaultValues();

    }, [polipastos, troles]);

    const clickBtn = () => {
        refBtn.current.click()
    }

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            puentes: cotizacion.puentes || 0,
            polipasto: cotizacion.polipasto?.id || "",
            trole: cotizacion.trole?.id || "",
        }
    });

    const getPuentes = async () => {

        const puenteResult = ["1", "2", "3", "4", "5", "6", "7", "8"];

        if (cotizacion.puentes === 0) {
            setValue("puentes", puenteResult[0], {
                shouldValidate: true,
                shouldDirty: true
            });
        }
        else {
            setValue("puentes", cotizacion.puentes, {
                shouldValidate: true,
                shouldDirty: true
            });
        }

        setPuentes(puenteResult);
    }

    const getPolipastos = async () => {
        const polipastosResult = await CatalogosServices.GetPolipastosPorCapacidad(cotizacion.capacidad);
        setPolipastos(polipastosResult.data);
    }

    const getTroles = async () => {
        
        const troleResult = await CatalogosServices.GetTrolesPorCapacidad(cotizacion.capacidad);
        setTroles(troleResult.data);
    }

    const getDefaultValues = () => {
        setValue("polipasto", polipastos[0].id, {
            shouldValidate: true,
            shouldDirty: true
        });

        setValue("trole", troles[0].id, {
            shouldValidate: true,
            shouldDirty: true
        });

        const cotizacionUpdated = Object.assign({}, cotizacion);
        cotizacionUpdated.trole = troles[0];
        cotizacionUpdated.polipasto = polipastos[0];
        setCotizacion(cotizacionUpdated);
    }

    const submitForm = (data, e) => {
        const cotizacionUpdated = Object.assign({}, cotizacion);
        cotizacionUpdated.puentes = data.puentes;
        setCotizacion(cotizacionUpdated)
        handleNext();
    }

    const handleChange = (event) => {
        let id = event.target.parentElement.parentElement.parentElement.id;
        let name = event.target.name;
        let value = event.target.parentElement.parentElement.parentElement.textContent;
        const cotizacionUpdated = Object.assign({}, cotizacion);
        switch (name) {
            case "polipasto":
                cotizacionUpdated.polipasto = polipastos.find(p => p.id === Number(id));
                // cotizacionUpdated.polipastoNombre = value;
                setValue("polipasto", value, {
                    shouldValidate: true,
                    shouldDirty: true
                });
                break;
            case "trole":
                cotizacionUpdated.trole = troles.find(t => t.id === Number(id));
                // cotizacionUpdated.troleNombre = value;
                setValue("trole", value, {
                    shouldValidate: true,
                    shouldDirty: true
                });
                break;

            default:
                break;
        }
        setCotizacion(cotizacionUpdated)
    };



    return (
        <>
            <Styles>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
                    <Grid container spacing={2} className="animate__animated animate__fadeIn">


                        <Grid item md={4} xs={12}>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Número de puentes</InputLabel>
                                <Select
                                    autoFocus
                                    fullWidth
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={String(cotizacion.puentes)}
                                    onChange={(event) => {
                                        let puentes = event.target.value;
                                        setValue("puentes", puentes, {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        });
                                        const cotizacionUpdated = Object.assign({}, cotizacion);
                                        cotizacionUpdated.puentes = puentes;
                                        setCotizacion(cotizacionUpdated)

                                    }}
                                >

                                    {
                                        puentes.map(option => {
                                            return <MenuItem value={option}>{option}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item md={8} xs={12}>
                        </Grid>

                        <Grid item md={12} xs={12}>
                            {/* Seleccione tipo de Polipasto:
                                <label htmlFor="field-rain">
                                    <input
                                        {...register("polipasto")}
                                        type="radio"
                                        name="polipasto"
                                        value="Marca A"
                                        id="field-rain"
                                    />
                                    Marca A
                                </label>
                                <label htmlFor="field-wind">
                                    <input
                                        {...register("polipasto")}
                                        type="radio"
                                        name="polipasto"
                                        value="Marca B"
                                        id="field-wind"
                                    />
                                    Marca B
                                </label>
                                <label htmlFor="field-sun">
                                    <input
                                        {...register("polipasto")}
                                        type="radio"
                                        name="polipasto"
                                        value="Marca C"
                                        id="field-sun"
                                    />
                                    Marca C
                                </label> */}

                            {
                                polipastos.length > 0 && (
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Polipasto: </FormLabel>
                                        <RadioGroup aria-label="polipasto" name="polipasto" value={cotizacion.polipasto?.id || polipastos[0].id} onChange={handleChange}>
                                            {/* <FormControlLabel value="marcaA" control={<Radio />} label="Marca A" />
                                        <FormControlLabel value="marcaB" control={<Radio />} label="Marca B" />
                                        <FormControlLabel value="marcaC" control={<Radio />} label="Marca C" /> */}
                                            {polipastos.map(pp => {
                                                return <FormControlLabel key={pp.id} value={pp.id} control={<Radio />} label={`${pp.modelo} ${pp.marca.marca} ${pp.capacidad} TON`} id={pp.id} />
                                            })}
                                        </RadioGroup>
                                        <FormHelperText>{errors?.polipasto?.message}</FormHelperText>
                                    </FormControl>
                                )
                            }


                        </Grid>

                        {
                            troles.length > 0 && cotizacion.capacidad < 3 && (
                                <Grid item md={12} xs={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Trole: </FormLabel>
                                        <RadioGroup aria-label="trole" name="trole" value={cotizacion.trole?.id || troles[0].id} onChange={handleChange}>
                                            {/* <FormControlLabel value="marcaA" control={<Radio />} label="Marca A" />
                                            <FormControlLabel value="marcaB" control={<Radio />} label="Marca B" />
                                            <FormControlLabel value="marcaC" control={<Radio />} label="Marca C" /> */}
                                            {troles.map(pp => {
                                                return <FormControlLabel value={pp.id} control={<Radio />} label={`${pp.modelo} ${pp.marca.marca} ${pp.capacidad} TON`} id={pp.id} />
                                            })}
                                        </RadioGroup>
                                        <FormHelperText>{errors?.trole?.message}</FormHelperText>
                                    </FormControl>
                                </Grid>
                            )}



                        {/* <Grid item md={6} xs={12}>
                            Imagenes ilustrativas...
                        </Grid> */}

                        <Button type="submit" ref={refBtn} hidden> Submit </Button>

                    </Grid>
                </form>
            </Styles>
        </>
    )

}

export default FormStep4Puente;