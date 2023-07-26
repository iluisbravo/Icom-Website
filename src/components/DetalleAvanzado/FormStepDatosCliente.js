import { Button, FormControl, Grid, Input, InputLabel, TextField } from "@material-ui/core";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object().shape();


const FormStepDatosCliente = (props) => {
    const setStepValue = props.setStepValue;
    const isAdmin = props.isAdmin;
    const value = props.value;
    const nextStep = props.nextStep;
    const backStep = props.backStep;
    const cotizacion = props.cotizacion;
    const setCotizacion = props.setCotizacion;
    const [editar, setEditar] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            nombre: cotizacion.encabezado.cliente.nombre,
            ciudad: cotizacion.encabezado.ciudad.ciudad,
            contacto: cotizacion.encabezado.cliente.contacto,
            telefono: cotizacion.encabezado.cliente.telefono,
            correo: cotizacion.encabezado.cliente.correo,
            ubicacion: cotizacion.encabezado.cliente.ubicacion,
            direccion: cotizacion.encabezado.cliente.direccion
        }
    });

    const editarBtnClick = () => {
        setEditar(true);
    }

    const cancelarBtnClick = () => {
        setEditar(false);
    }

    const submitForm = (data, e) => {
        setCotizacion({ ...cotizacion, ...data });
        setEditar(false);
    }

    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
                <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                        <h6 className="orange">Información del Cliente</h6>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Grid container spacing={3}>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    label="Nombre"
                                    type="text"
                                    name="nombre"
                                    helperText={errors?.nombre?.message}
                                    {...register('nombre')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={6} xs={12}>

                                <TextField
                                    label="Ciudad de Instalación"
                                    type="text"
                                    name="ciudad"
                                    helperText={errors?.ciudad?.message}
                                    {...register('ciudad')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={4} xs={12}>

                                <TextField
                                    label="Contacto"
                                    type="text"
                                    name="contacto"
                                    helperText={errors?.contacto?.message}
                                    {...register('contacto')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={4} xs={12}>

                                <TextField
                                    label="Teléfono"
                                    type="text"
                                    name="telefono"
                                    helperText={errors?.telefono?.message}
                                    {...register('telefono')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={4} xs={12}>

                                <TextField
                                    label="Correo"
                                    type="text"
                                    name="correo"
                                    helperText={errors?.correo?.message}
                                    {...register('correo')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={6} xs={12}>

                                <TextField
                                    label="Ubicación"
                                    type="text"
                                    name="ubicacion"
                                    helperText={errors?.ubicacion?.message}
                                    {...register('ubicacion')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={6} xs={12}>

                                <TextField
                                    label="Direccion"
                                    type="text"
                                    name="direccion"
                                    helperText={errors?.direccion?.message}
                                    {...register('direccion')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>

                        </Grid>
                    </Grid>

                    {/* {isAdmin() === true && (
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
                    )} */}

                    <Grid item md={12} xs={12} className="text-right">
                        <Button
                            type="button"
                            disabled={value === 0}
                            onClick={backStep}
                        >
                            Regresar
                        </Button>

                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={nextStep}
                            disabled={editar}
                        >
                            Siguiente
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default FormStepDatosCliente;