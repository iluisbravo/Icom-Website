import { Button, FormControl, Grid, Input, InputLabel, TextField } from "@material-ui/core";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import moment from "moment";
import Formatos from "../../utils/Formatos";

const schema = yup.object().shape();


const FormStepDatosGenerales = (props) => {
    
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
            folio: cotizacion.encabezado.folio,
            fecha: Formatos.GetFormatoFechaHora(cotizacion.encabezado.fecha),
            capacidad: Formatos.GetFormatoNumero(cotizacion.encabezado.capacidad) + " Toneladas",
            claro: Formatos.GetFormatoNumero(cotizacion.encabezado.claro) + " mts",
            recorrido: Formatos.GetFormatoNumero(cotizacion.encabezado.recorrido) + " mts",
            alturaTotal: Formatos.GetFormatoNumero(cotizacion.encabezado.alturaTotal) + " mts",
            alturaIzaje: Formatos.GetFormatoNumero(cotizacion.encabezado.alturaIzaje) + " mts",
            alturaColumnas: Formatos.GetFormatoNumero(cotizacion.encabezado.alturaColumnas) + " mts",
            cabrilla: cotizacion.encabezado.cabrilla === true ? "Sí" : "No",
            columnas: Formatos.GetFormatoNumero(cotizacion.encabezado.columnas),
            distancia: Formatos.GetFormatoNumero(cotizacion.encabezado.distancia) + " mts",
            trabes: Formatos.GetFormatoNumero(cotizacion.encabezado.trabes),
            patasGallo: Formatos.GetFormatoNumero(cotizacion.encabezado.patasGallo),
            volado: cotizacion.encabezado.usaVolado === true ? "Sí" : "No",
            volados: Formatos.GetFormatoNumero(cotizacion.encabezado.volados),
            usuario: cotizacion.encabezado.usuario.nombre + " " + cotizacion.encabezado.usuario.apellido
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
                        <h6 className="orange">Datos Generales</h6>
                    </Grid>
                    <Grid item md={12} xs={12}>

                        <Grid container spacing={3}>

                            <Grid item md={4} xs={12}>
                                <TextField
                                    label="Folio"
                                    type="text"
                                    name="folio"
                                    helperText={errors?.folio?.message}
                                    {...register('folio')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={4} xs={12}>

                                <TextField
                                    label="Fecha de Registro"
                                    type="text"
                                    name="fecha"
                                    helperText={errors?.fecha?.message}
                                    {...register('fecha')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={4} xs={12}>

                                <TextField
                                    label="Usuario Registro"
                                    type="text"
                                    name="usuario"
                                    helperText={errors?.usuario?.message}
                                    {...register('usuario')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={4} xs={12}>

                                <TextField
                                    label="Capacidad"
                                    type="text"
                                    name="capacidad"
                                    helperText={errors?.capacidad?.message}
                                    {...register('capacidad')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={2} xs={12}>

                                <TextField
                                    label="Claro"
                                    type="text"
                                    name="claro"
                                    helperText={errors?.claro?.message}
                                    {...register('claro')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={2} xs={12}>

                                <TextField
                                    label="Altura Izaje"
                                    type="text"
                                    name="alturaIzaje"
                                    helperText={errors?.alturaIzaje?.message}
                                    {...register('alturaIzaje')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={2} xs={12}>

                                <TextField
                                    label="Altura Total"
                                    type="text"
                                    name="alturaTotal"
                                    helperText={errors?.alturaTotal?.message}
                                    {...register('alturaTotal')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={2} xs={12}>

                                <TextField
                                    label="Recorrido"
                                    type="text"
                                    name="recorrido"
                                    helperText={errors?.recorrido?.message}
                                    {...register('recorrido')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={2} xs={12}>

                                <TextField
                                    label="Usa Volado"
                                    type="text"
                                    name="volado"
                                    helperText={errors?.volado?.message}
                                    {...register('volado')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={2} xs={12}>

                                <TextField
                                    label="Volados"
                                    type="text"
                                    name="volados"
                                    helperText={errors?.volados?.message}
                                    {...register('volados')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={2} xs={12}>

                                <TextField
                                    label="Usa Cabrilla"
                                    type="text"
                                    name="cabrilla"
                                    helperText={errors?.cabrilla?.message}
                                    {...register('cabrilla')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={2} xs={12}>

                                <TextField
                                    label="Columnas"
                                    type="text"
                                    name="columnas"
                                    helperText={errors?.columnas?.message}
                                    {...register('columnas')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={2} xs={12}>

                                <TextField
                                    label="Distancia"
                                    type="text"
                                    name="distancia"
                                    helperText={errors?.distancia?.message}
                                    {...register('distancia')}
                                    disabled={!editar}
                                    fullWidth
                                />

                            </Grid>
                            <Grid item md={2} xs={12}>

                                <TextField
                                    label="Trabes"
                                    type="text"
                                    name="trabes"
                                    helperText={errors?.trabes?.message}
                                    {...register('trabes')}
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

export default FormStepDatosGenerales;