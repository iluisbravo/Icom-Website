import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import React, { useEffect, useRef, useState } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';
import { CircularProgress, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, Tooltip, Zoom } from '@material-ui/core';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { store } from 'react-notifications-component';
import TablaClientesComponent from './TablaClientesComponent';
import ClientesServices from '../services/ClientesServices';
import CatalogosServices from '../services/CatalogosServices';

const schema = yup.object().shape({
    buscar_cliente: yup.string("El campo debe ser texto."),
    cliente_nombre: yup.string("El campo debe ser texto.").required("El campo es requerido."),
    ciudad: yup.string("El campo debe ser texto.").required("El campo es requerido.")
    // cliente_id: yup.string().required(),
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
`;

const FormStep1General = (props) => {

    const classes = useStyles();
    const cotizacion = props.cotizacion;
    const setCotizacion = props.setCotizacion;
    const setHandleNextFunction = props.setHandleNextFunction;
    const handleNext = props.handleNext;
    const refBtn = useRef();

    const [isHiddenTableClientes, setIsHiddenTableClientes] = useState(true);
    const [clientes, setClientes] = useState([]);
    const [cdsInstalacion, setCdsInstalacion] = useState([]);
    const [isHiddenDetail, setIsHiddenDetail] = useState(true);
    const [clienteSelected, setClienteSelected] = useState(cotizacion.clienteId ? {
        clienteId: cotizacion.clienteId,
        clienteNombre: cotizacion.clienteNombre
    } : {});
    
    const [cdInstalacionSelected, setCdInstalacionSelected] = useState(cotizacion.ciuadId ? {
        ciudadId: cotizacion.ciudadId,
        ciudadNombre: cotizacion.ciudadNombre
    } : {});

    useEffect(() => {
        setHandleNextFunction(() => clickBtn);
        getClientes();
        getCiudadInstalacion();
    }, []);

    const clickBtn = () => {
        refBtn.current.click()
    }

    const { register, handleSubmit, formState: { errors }, control, setValue, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            cliente_nombre: cotizacion.clienteNombre || "",
            ciudad: cotizacion.ciudadNombre || "",
            ciudadId: cotizacion.ciuadId || ""
        }
    });

    const getClientes = async () => {
        const clientesResult = await ClientesServices.GetClientes();
        const clientesActivos = clientesResult.data.filter(cl => cl.activo === true) || [];
        setClientes(clientesActivos);

        if (cotizacion.clienteId) {
            // seleccionarCliente(cotizacion.clienteNombre);
            setValue("cliente_nombre", cotizacion.clienteNombre, {
                shouldValidate: true,
                shouldDirty: true
            });

            const clienteCompleto = clientesResult.data.find(c => c.id === cotizacion.clienteId);

            setClienteSelected(clienteCompleto);
            setIsHiddenTableClientes(true);

            const cotizacionUpdated = Object.assign({}, cotizacion);
            cotizacionUpdated.clienteId = clienteCompleto.id;
            cotizacionUpdated.clienteNombre = clienteCompleto.nombre;
            setCotizacion(cotizacionUpdated);
            setIsHiddenDetail(false);
        }
    }

    const getCiudadInstalacion = async () => {
        const ciudadesResult = await CatalogosServices.GetCiudadInstalacion();
        setCdsInstalacion(ciudadesResult.data);
    }

    const buscarCliente = async () => {
        setIsHiddenTableClientes(false);
        //Buscar clientes
        const clientesResult = await ClientesServices.searchClientes(getValues("buscar_cliente"));
        console.log(clientesResult.data);
        setClientes(clientesResult.data);
    }

    const seleccionarCliente = (cliente) => {
        setValue("cliente_nombre", cliente, {
            shouldValidate: true,
            shouldDirty: true
        });

        const clienteCompleto = clientes.find(c => c.nombre === cliente);

        setClienteSelected(clienteCompleto);
        setIsHiddenTableClientes(true);

        const cotizacionUpdated = Object.assign({}, cotizacion);
        cotizacionUpdated.clienteId = clienteCompleto.id;
        cotizacionUpdated.clienteNombre = clienteCompleto.nombre;
        setCotizacion(cotizacionUpdated);
        setIsHiddenDetail(false);
    }

    const seleccionarCiudadInstalacion = (ciudad) => {

        setValue("ciudad", ciudad, {
            shouldValidate: true,
            shouldDirty: true
        });

        const cdCompleto = cdsInstalacion.find(c => c.ciudadDestino === ciudad);

        setCdInstalacionSelected(cdCompleto);

        const cotizacionUpdated = Object.assign({}, cotizacion);
        cotizacionUpdated.ciudadId = cdCompleto.id;
        cotizacionUpdated.ciudadNombre = cdCompleto.ciudadDestino;
        setCotizacion(cotizacionUpdated);
    }

    const submitForm = (data, e) => {

        // alert(JSON.stringify(data));
        handleNext();
    }

    return (
        <>
            <Styles>
                <form noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
                    <Grid container spacing={2}>

                        <Grid item md={6} xs={12}>
                            <Autocomplete
                                value={cotizacion.clienteNombre}
                                id="free-solo-demo"
                                freeSolo
                                options={clientes.map((option) => option.nombre)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        autoFocus
                                        label="Cliente"
                                        margin="normal"
                                        variant="standard"
                                        helperText={errors?.cliente_nombre?.message}
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        seleccionarCliente(newValue);
                                    }
                                    else {
                                        setValue("cliente_nombre", "", {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        });
                                        setClienteSelected({});
                                        setIsHiddenDetail(true);
                                    }
                                }}
                                onInputChange={(event, newInputValue) => {
                                    setClienteSelected({});
                                    setIsHiddenDetail(true);
                                }}
                            />
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <Autocomplete
                                value={cotizacion.ciudadNombre}
                                id="free-solo-demo"
                                freeSolo
                                options={cdsInstalacion.map((option) => option.ciudadDestino)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Ciudad de Instalación"
                                        margin="normal"
                                        variant="standard"
                                        helperText={errors?.ciudad?.message}
                                    />
                                )}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        seleccionarCiudadInstalacion(newValue);
                                    }
                                    else {
                                        setValue("ciudad", "", {
                                            shouldValidate: true,
                                            shouldDirty: true
                                        });
                                        setCdInstalacionSelected({});
                                    }
                                }}
                                onInputChange={(event, newInputValue) => {
                                    setCdInstalacionSelected({});
                                }}
                            />
                        </Grid>

                        {/* <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="buscar_cliente"
                                    label="Buscar Cliente"
                                    type="text"
                                    helperText={errors?.buscar_cliente?.message}
                                    {...register('buscar_cliente')}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">

                                                <IconButton aria-label="search" onClick={buscarCliente}>
                                                    <SearchIcon />
                                                </IconButton>

                                            </InputAdornment>
                                        )
                                    }}
                                    inputProps={{
                                        maxLength: 16,
                                    }}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    name="cliente_nombre"
                                    label="Cliente seleccionado"
                                    type="text"
                                    helperText={errors?.cliente_nombre?.message}
                                    {...register('cliente_nombre')}
                                    value={getValues("cliente_nombre") || "Asigne un cliente"}
                                    InputProps={getValues("cliente_nombre") ? {
                                        endAdornment: (
                                            <InputAdornment position="end">

                                                <IconButton aria-label="search" disabled>
                                                    <CheckIcon />
                                                </IconButton>

                                            </InputAdornment>
                                        )
                                    } : ""}
                                    disabled
                                />
                            </Grid> */}

                        <Grid item md={12} xs={12} hidden={isHiddenTableClientes}>
                            <Grid container spacing={3}>
                                <Grid item md={12} xs={12}>
                                    <TablaClientesComponent
                                        title="Clientes Encontrados"
                                        columns={[
                                            { title: 'Id', field: 'id', hidden: true },
                                            { title: 'Nombre', field: 'name' },
                                            { title: 'Teléfono', field: 'phone', type: 'numeric' },
                                            { title: 'Correo', field: 'email' },
                                            // { title: 'Ciudad', field: 'city' },
                                        ]}
                                        data={clientes}
                                        actions={[
                                            rowData => ({
                                                icon: () => <CheckIcon />,
                                                tooltip: 'Seleccionar Cliente',
                                                onClick: (event, rowData) => seleccionarCliente(rowData)
                                            })
                                        ]}
                                        options={{
                                            search: false,
                                            toolbar: false,
                                            paging: false,
                                            actionsColumnIndex: -1
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        {
                            !isHiddenDetail && clienteSelected && (
                                <Grid item md={12} xs={12} className="animate__animated animate__fadeIn">
                                    <Grid container spacing={3}>
                                        <Grid item md={12} xs={12}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                type="text"
                                                name="nombre"
                                                label="Nombre"
                                                helperText={errors?.nombre?.message}
                                                // {...register('nombre')}
                                                inputProps={{
                                                    maxLength: 20,
                                                }}
                                                value={clienteSelected.nombre}
                                            />
                                        </Grid>

                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                name="telefono"
                                                label="Teléfono"
                                                helperText={errors?.telefono?.message}
                                                // {...register('telefono')}
                                                inputProps={
                                                    {
                                                        maxLength: 10,
                                                    }
                                                }
                                                value={clienteSelected.telefono}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                name="correo"
                                                label="Correo"
                                                helperText={errors?.correo?.message}
                                                // {...register('correo')}
                                                inputProps={{
                                                    maxLength: 50,
                                                }}
                                                value={clienteSelected.correo}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                name="direccion"
                                                label="Dirección"
                                                helperText={errors?.direccion?.message}
                                                // {...register('direccion')}
                                                inputProps={{
                                                    maxLength: 50,
                                                }}
                                                value={clienteSelected.direccion}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                disabled
                                                fullWidth
                                                name="ciudad"
                                                label="Ciudad"
                                                helperText={errors?.ciudad?.message}
                                                // {...register('ciudad')}
                                                inputProps={{
                                                    maxLength: 50,
                                                }}
                                                value={clienteSelected.ubicacion}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        }


                        <Grid item md={12} xs={12}>
                            <Button type="submit" ref={refBtn} hidden> Submit </Button>
                        </Grid>
                    </Grid>
                </form>
            </Styles>
        </>
    )

}

export default FormStep1General;