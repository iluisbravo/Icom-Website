import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, Input, InputAdornment, MenuItem, Select, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import styled from 'styled-components';
import CotizacionesServices from '../../services/CotizacionesServices';

import { IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CatalogosServices from "../../services/CatalogosServices";
import { store } from "react-notifications-component";
import Formatos from "../../utils/Formatos";

const schema = yup.object().shape({
    // polipastoId: yup.required("El campo es requerido.").min(1, "Debe ser un valor mayor a 0"),
    // troleId: yup.required("El campo es requerido.").min(1, "Debe ser un valor mayor a 0")
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


const FormDetallePuente = (props) => {
    const setShowDetalle = props.setShowDetalle;
    const isAdmin = props.isAdmin;
    const cotizacion = props.cotizacion;
    const setCotizacion = props.setCotizacion;
    const editar = props.editar;
    const setEditar = props.setEditar;

    const [polipastos, setPolipastos] = useState(null);
    const [troles, setTroles] = useState(null);
    const [accesorios, setAccesorios] = useState(null);

    const [accesoriosSelected, setAccesoriosSelected] = useState(cotizacion.puente.accesorios.conceptos);

    const classes = useStyles();

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            polipasto: cotizacion.puente.polipasto.polipasto.marca.id,
            trole: cotizacion.puente.trole.trole.marca.id,
            cabezales: cotizacion.puente.cabezales.monto,
            electrificacionPuente: cotizacion.puente.electrificacionPuente.monto,
            electrificacionRecorrido: cotizacion.puente.electrificacionRecorrido.monto,
            tablero: cotizacion.puente.tablero.monto,
            accesorios: cotizacion.puente.accesorios.conceptos,
            total: Formatos.GetFormatoMoneda(cotizacion.puente.total)
        }
    });

    useEffect(() => {
        getPolipastos();
        getTroles();
        getAccesorios();
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

    const getPolipastos = async () => {
        const polipastosResult = await CatalogosServices.GetPolipastos();
        setPolipastos(polipastosResult.data);
    }


    const getTroles = async () => {
        const troleResult = await CatalogosServices.GetTroles();
        setTroles(troleResult.data);
    }

    const getAccesorios = async () => {

        const polipastoId = getValues("polipasto");
        const accesoriosResult = await CatalogosServices.getAccesoriosByPolipasto(polipastoId);
        setAccesorios(accesoriosResult.data);
    }

    const changePolipasto = (event) => {
        let value = event.currentTarget.dataset.value;
        setValue("polipasto", Number(value))
        getAccesorios();

    }

    const handleChange = (event) => {

        let name = event.target.name;
        let id = Number(event.target.id);
        let checked = event.target.checked;

        let acc = accesoriosSelected.map(as => as);
        if (checked) {
            acc.push({ id: Number(id), nombre: name });
        }
        else {
            acc = acc.filter(ac => ac.id !== id);
        }

        setValue("accesorios", acc);
        setAccesoriosSelected(acc)
    };

    const isChecked = (idAccesorio) => {
        const accesoriosSelected = getValues("accesorios");
        let exist = accesoriosSelected.find(ac => ac.id === idAccesorio);

        if (exist) {
            return true
        }
        else {
            return false;
        }
    }

    const editarBtnClick = () => {
        setEditar(true);
    }

    const cancelarBtnClick = () => {
        setEditar(false);
    }

    const submitForm = async (data, e) => {
        console.log(data, "EQUIPAMIENTO PUENTE UPDATED")

        const edicionPuenteResult = await CotizacionesServices.EditarEquipamientoPuente({
            idCotizacion: cotizacion.encabezado.id,
            puentes: Number(cotizacion.puente.puentes),
            idPolipasto: data.polipasto,
            idTrole: data.trole,
            montoTablero: Number(data.tablero),
            montoElectrificacionRecorrido: Number(data.electrificacionRecorrido),
            montoElectrificacionPuente: Number(data.electrificacionPuente)
        });
        if (!edicionPuenteResult.hasError) {
            showAlert("Excelente", "Equipamiento editado con éxito", "success");
            
            setCotizacion({ ...cotizacion, ...{ puente: edicionPuenteResult.data } });
        }
        else {
            showAlert("Error", edicionPuenteResult.message || edicionPuenteResult.detail, "danger");
        }
        setEditar(false);
    }

    return (
        <>
            {polipastos && troles && accesorios &&
                (
                    <Styles>
                        <IconButton className={classes.closeButton} aria-label="close" onClick={() => { setEditar(false); setShowDetalle(false); }}>
                            <CloseIcon />
                        </IconButton>
                        <form className="formBorder" noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
                            <Grid container spacing={2}>

                                <Grid item sm={12} md={12}>
                                    <h6 className="text-center">Detalle Puente</h6>
                                </Grid>


                                <Grid item sm={12} md={6}>
                                    <label className="inputLabel">Polipasto</label>
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            control={control}
                                            name="polipasto"
                                            {...register('polipasto')}
                                            render={({ field: { onChange, value } }) => (
                                                <>
                                                    <Select
                                                        id="prefijo-select"
                                                        onChange={changePolipasto}
                                                        // defaultValue={registroData.polipasto}
                                                        value={value}
                                                        disabled={isAdmin() && !editar}
                                                    >
                                                        {polipastos.map(p => {
                                                            return <MenuItem value={p.id}>{p.marca}</MenuItem>
                                                        })}
                                                    </Select>
                                                    <FormHelperText hidden={!errors?.polipasto?.message}>{errors?.polipasto?.message}</FormHelperText>
                                                </>
                                            )}

                                        />
                                    </FormControl>
                                </Grid>


                                <Grid item sm={12} md={6}>
                                    <label className="inputLabel">Trole</label>
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <FormControl fullWidth>
                                        <Controller
                                            control={control}
                                            name="trole"
                                            {...register('trole')}
                                            render={({ field: { onChange, value } }) => (
                                                <>
                                                    <Select
                                                        id="prefijo-select"
                                                        onChange={onChange}
                                                        // defaultValue={registroData.trole}
                                                        value={value}
                                                        disabled={isAdmin() && !editar}
                                                    >
                                                        {troles.map(t => {
                                                            return <MenuItem value={t.id}>{t.marca}</MenuItem>
                                                        })}
                                                    </Select>
                                                    <FormHelperText hidden={!errors?.trole?.message}>{errors?.trole?.message}</FormHelperText>
                                                </>
                                            )}

                                        />
                                    </FormControl>
                                </Grid>


                                <Grid item sm={12} md={6}>
                                    <label className="inputLabel">Tablero para cabezal</label>
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <FormControl fullWidth>
                                        <Input
                                            type="number"
                                            name="tablero"
                                            helperText={errors?.tablero?.message}
                                            {...register('tablero')}
                                            inputProps={{
                                                maxLength: 20,
                                            }}
                                            disabled={isAdmin() && !editar}
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        />
                                        <FormHelperText hidden={!errors?.tablero?.message}>{errors?.tablero?.message}</FormHelperText>
                                    </FormControl>
                                </Grid>


                                <Grid item sm={12} md={6}>
                                    <label className="inputLabel">Cabezales</label>
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <FormControl fullWidth>
                                        <Input
                                            type="number"
                                            name="cabezales"
                                            helperText={errors?.cabezales?.message}
                                            {...register('cabezales')}
                                            inputProps={{
                                                maxLength: 20,
                                            }}
                                            disabled={true}
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        />
                                        <FormHelperText hidden={!errors?.cabezales?.message}>{errors?.cabezales?.message}</FormHelperText>
                                    </FormControl>
                                </Grid>


                                <Grid item sm={12} md={6}>
                                    <label className="inputLabel">Electrificación puente</label>
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <FormControl fullWidth>
                                        <Input
                                            type="number"
                                            name="electrificacionPuente"
                                            helperText={errors?.electrificacionPuente?.message}
                                            {...register('electrificacionPuente')}
                                            inputProps={{
                                                maxLength: 20,
                                            }}
                                            disabled={isAdmin() && !editar}
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        />
                                        <FormHelperText hidden={!errors?.electrificacionPuente?.message}>{errors?.electrificacionPuente?.message}</FormHelperText>
                                    </FormControl>
                                </Grid>



                                <Grid item sm={12} md={6}>
                                    <label className="inputLabel">Electrificación recorrido</label>
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <FormControl fullWidth>
                                        <Input
                                            type="number"
                                            name="electrificacionRecorrido"
                                            helperText={errors?.electrificacionRecorrido?.message}
                                            {...register('electrificacionRecorrido')}
                                            inputProps={{
                                                maxLength: 20,
                                            }}
                                            disabled={isAdmin() && !editar}
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        />
                                        <FormHelperText hidden={!errors?.electrificacionRecorrido?.message}>{errors?.electrificacionRecorrido?.message}</FormHelperText>
                                    </FormControl>
                                </Grid>



                                <Grid item sm={12} md={12}>
                                    <label className="inputLabel">Accesorios:</label>

                                    <FormControl fullWidth>
                                        <FormGroup>
                                            {accesorios.map(ac => {
                                                return <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isChecked(ac.id)}
                                                            onChange={handleChange}
                                                            name={ac.nombre}
                                                            id={ac.id}
                                                            disabled={true}
                                                        />}
                                                    label={`${ac.nombre} - ${ac.precio}`}
                                                />
                                            })}
                                        </FormGroup>
                                    </FormControl>
                                </Grid>


                                <Grid item sm={12} md={6}>
                                    <label className="inputLabel">Total</label>
                                </Grid>
                                <Grid item sm={12} md={6}>
                                    <FormControl fullWidth>
                                        <Input
                                            type="text"
                                            name="total"
                                            helperText={errors?.total?.message}
                                            {...register('total')}
                                            inputProps={{
                                                maxLength: 20,
                                            }}
                                            disabled={true}
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        />
                                        <FormHelperText hidden={!errors?.total?.message}>{errors?.total?.message}</FormHelperText>
                                    </FormControl>
                                </Grid>

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
                )
            }

        </>
    )
}

export default FormDetallePuente;