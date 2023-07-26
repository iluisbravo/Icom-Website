import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, Tooltip, Zoom } from '@material-ui/core';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { store } from 'react-notifications-component';
import ClientesServices from '../services/ClientesServices';
import CatalogosServices from '../services/CatalogosServices';

const schema = yup.object().shape({
    //puentes: yup.number("El campo debe ser númerico.").required("El campo es requerido.").min(0),
    // polipasto: yup.number().required().min(0),
    // trole: yup.bool()
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

const FormStep6Accesorios = (props) => {

    const cotizacion = props.cotizacion;
    const setCotizacion = props.setCotizacion;
    const setHandleNextFunction = props.setHandleNextFunction;
    const handleNext = props.handleNext;
    const refBtn = useRef();
    const [accesorios, setAccesorios] = React.useState([]);

    useEffect(() => {
        setHandleNextFunction(() => clickBtn);
        getAccesorios();
    }, []);

    const clickBtn = () => {
        refBtn.current.click()
    }

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            // puentes: cotizacion.puentes || 0,
            // polipasto: cotizacion.polipasto || 0,
            // trole: cotizacion.trole || false,
        }
    });

    const submitForm = (data, e) => {

        // const cotizacionUpdated = Object.assign({}, cotizacion);
        // cotizacionUpdated.puentes = data.puentes;
        // cotizacionUpdated.polipasto = data.polipasto;
        // cotizacionUpdated.trole = data.trole;
        // setCotizacion(cotizacionUpdated)
        // alert(JSON.stringify(data));
        handleNext();
    }

    const getAccesorios = async () => {
        
        const accesoriosResult = await CatalogosServices.getAccesoriosByPolipasto(cotizacion.polipastoId);

        if (cotizacion.accesorios.length > 0) {
            const cotizacionUpdated = Object.assign({}, cotizacion);
            cotizacionUpdated.accesorios = cotizacionUpdated.accesorios.map(ac => {
                let acc = accesoriosResult.data.find(ard => ard.id == ac.id)
                return { id: Number(acc.id), nombre: acc.nombre }
            })
            setCotizacion(cotizacionUpdated);
        }

        setAccesorios(accesoriosResult.data);
    }

    const handleChange = (event) => {
        // setState({ ...state, [event.target.name]: event.target.checked });
        

        let name = event.target.name;
        let id = event.target.id;
        let checked = event.target.checked;

        const cotizacionUpdated = Object.assign({}, cotizacion);

        if (checked) {
            cotizacionUpdated.accesorios.push({ id: Number(id), nombre: name });
        }
        else {
            cotizacionUpdated.accesorios = cotizacionUpdated.accesorios.filter(ac => ac.id != id);
        }

        setCotizacion(cotizacionUpdated)
    };

    const isChecked = (idAccesorio) => {

        let exist = cotizacion.accesorios.find(ac => ac.id == idAccesorio);

        if (exist) {
            return true
        }
        else {
            return false;
        }
    }

    return (
        <>
            <Styles>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
                    <Grid container spacing={2} className="animate__animated animate__fadeIn">


                        <Grid item md={4} xs={12}>
                            Seleccione Accesorios:
                            <FormGroup>
                                {accesorios.map(ac => {
                                    return <FormControlLabel
                                        control={<Checkbox color="primary" checked={isChecked(ac.id)} onChange={handleChange} name={ac.nombre} id={ac.id} />}
                                        label={ac.nombre}
                                    />
                                })}                             
                            </FormGroup>
                        </Grid>



                        <Button type="submit" ref={refBtn} hidden> Submit </Button>

                    </Grid>
                </form>
            </Styles>
        </>
    )

}

export default FormStep6Accesorios;