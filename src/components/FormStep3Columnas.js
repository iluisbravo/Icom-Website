import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Checkbox, CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, Switch, Tooltip, Zoom } from '@material-ui/core';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { store } from 'react-notifications-component';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ClientesServices from '../services/ClientesServices';
import CatalogosServices from '../services/CatalogosServices';

const schema = yup.object().shape({
    columnas: yup.string().required("El campo es requerido.")
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

    table, th, td {
        text-align: center;
        border: 1px solid black;
        border-collapse: collapse;
        padding: 10px
    }
`;

const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

const FormStep3Columnas = (props) => {

    const cotizacion = props.cotizacion;
    const setCotizacion = props.setCotizacion;
    const setHandleNextFunction = props.setHandleNextFunction;
    const handleNext = props.handleNext;
    const refBtn = useRef();
    const [distanciasColumnas, setDistanciaColumnas] = useState([]);
    const [numeroColumnas, setNumeroColumnas] = useState([]);

    useEffect(() => {
        setHandleNextFunction(() => clickBtn);
        // getDistancias();
        calcularColumnas(cotizacion.volado);
    }, [cotizacion.volado]);

    const clickBtn = () => {
        refBtn.current.click()
    }

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            columnas: cotizacion.columnas
        }
    });

    const calcularColumnas = async (volado) => {

        const columnasResult = await CatalogosServices.GetCantidadColumnas(cotizacion.recorrido, volado);
        setNumeroColumnas(columnasResult.data);

        let exist = columnasResult.data.find(opt =>
            opt.columnas === cotizacion.columnas
            && opt.distancia === cotizacion.distancia);

        if (!exist) {
            const cotizacionUpdated = Object.assign({}, cotizacion);
            cotizacionUpdated.distancia = columnasResult.data[0].distancia;
            cotizacionUpdated.columnas = columnasResult.data[0].columnas;
            setCotizacion(cotizacionUpdated);

            setValue("columnas", columnasResult.data[0].columnas, {
                shouldValidate: true,
                shouldDirty: true
            });
        }
    }

    const submitForm = (data, e) => {

        // const cotizacionUpdated = Object.assign({}, cotizacion);
        // cotizacionUpdated.columnas = data.columnas;
        // cotizacionUpdated.distancia = data.distancia;
        // setCotizacion(cotizacionUpdated);
        // alert(JSON.stringify(data));
        handleNext();
    }

    const handleChange = (event) => {

        // setState({ ...state, [event.target.name]: event.target.checked });
        let name = event.target.name;
        let value = event.target.checked;

        const cotizacionUpdated = Object.assign({}, cotizacion);
        switch (name) {
            case "volado":
                cotizacionUpdated.volado = value;
                setCotizacion(cotizacionUpdated);
                //calcularColumnas(value);
                break;
            case "cabrilla":
                cotizacionUpdated.cabrilla = value;
                setCotizacion(cotizacionUpdated);
                break;
            default:
                break;
        }


    };

    const handleChangeDistance = (event) => {
        // setState({ ...state, [event.target.name]: event.target.checked });
        let id = event.target.id;

        let option = numeroColumnas[id];

        const cotizacionUpdated = Object.assign({}, cotizacion);
        cotizacionUpdated.distancia = Number(option.distancia);
        cotizacionUpdated.columnas = Number(option.columnas);
        setCotizacion(cotizacionUpdated)
    };

    return (
        <>
            <Styles>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
                    <Grid container spacing={2} className="animate__animated animate__fadeIn">
                        <Grid item md={12} xs={12}>
                            Volado
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>No</Grid>
                                <Grid item>
                                    <AntSwitch name="volado" onChange={handleChange} checked={cotizacion.volado} />
                                </Grid>
                                <Grid item>Sí</Grid>
                            </Grid>
                        </Grid>

                        <Grid item md={12} xs={12}>
                            Cabrilla
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>No</Grid>
                                <Grid item>
                                    <AntSwitch name="cabrilla" onChange={handleChange} checked={cotizacion.cabrilla} />
                                </Grid>
                                <Grid item>Sí</Grid>
                            </Grid>
                        </Grid>

                        <Grid item md={12} xs={12}>
                            {/* <Autocomplete
                                    value={cotizacion.columns}
                                    id="free-solo-demo"
                                    freeSolo
                                    options={numeroColumnas.map(option => String(option.columns))}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            autoFocus
                                            label="Numero de columnas"
                                            margin="normal"
                                            variant="standard"
                                            helperText={errors?.columnas?.message}
                                        />
                                    )}
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                            setValue("columnas", newValue, {
                                                shouldValidate: true,
                                                shouldDirty: true
                                            });
                                        }
                                        else {

                                            setValue("columnas", 0, {
                                                shouldValidate: true,
                                                shouldDirty: true
                                            });
                                        }
                                    }}
                                    onInputChange={(event, newInputValue) => {

                                        setValue("columnas", 0, {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        });

                                    }}
                                /> */}

                            <FormControl fullWidth>
                                {/* <InputLabel id="demo-simple-select-label">Columnas</InputLabel> */}
                                {/* <Select
                                        fullWidth
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={String(cotizacion.columnas)}
                                        onChange={(event) => {
                                            let columns = event.target.value;
                                            setValue("columnas", columns, {
                                                shouldValidate: true,
                                                shouldDirty: true
                                            });
                                            const cotizacionUpdated = Object.assign({}, cotizacion);
                                            cotizacionUpdated.columnas = columns;
                                            setCotizacion(cotizacionUpdated);
                                        }}
                                    >

                                        {
                                            numeroColumnas.map(option => {
                                                return <MenuItem value={option.columns}>{option.columns}</MenuItem>
                                            })
                                        }
                                    </Select> */}
                                <table border="1">
                                    <thead>
                                        <th>Seleccionar</th>
                                        <th>Columnas</th>
                                        <th>Distancia</th>
                                        <th>Trabes</th>
                                        <th>Volado</th>
                                    </thead>
                                    <tbody>
                                        {
                                            numeroColumnas && (
                                                numeroColumnas.map((option, ix) => {
                                                    return <tr>
                                                        <td>
                                                            <Checkbox
                                                                checked={option.distancia === cotizacion.distancia && option.columnas === cotizacion.columnas}
                                                                onChange={handleChangeDistance}
                                                                name={ix}
                                                                id={ix}
                                                                color="primary"
                                                            />

                                                        </td>
                                                        <td>{option.columnas}</td>
                                                        <td>{option.distancia} mts</td>
                                                        <td>{option.trabes}</td>
                                                        <td>{option.volados}</td>
                                                    </tr>
                                                })
                                            )
                                        }
                                    </tbody>
                                </table>



                                <FormHelperText>{errors?.columnas?.message}</FormHelperText>
                            </FormControl>
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

export default FormStep3Columnas;