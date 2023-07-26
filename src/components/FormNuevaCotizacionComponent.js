import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { store } from 'react-notifications-component';
import styled from 'styled-components';
import FormStep1General from './FormStep1General';
import FormStep2Especificaciones from './FormStep2Especificaciones';
import FormStep3Columnas from './FormStep3Columnas';
import FormStep4Puente from './FormStep4Puente';
import FormStep5Anclaje from './FormStep5Anclaje';
import FormStep6Accesorios from './FormStep6Accesorios';
import CotizacionesServices from '../services/CotizacionesServices';

import { CircularProgress, Grid } from '@material-ui/core';
import FormStep7Resumen from './FormStep7Resumen';



const Styles = styled.div`
    /* .MuiStepLabel-label.MuiStepLabel-alternativeLabel{
        margin-top: 8px;
    } */

    .MuiStepper-root{
        padding: 12px 0px;
    }

    .text-right{
        text-align: right !important;
    }

    form{
        min-height: 350px;
        padding: 0px 12px;
    }
/* 
    p{
        margin: 5px;
    } */

`;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}));



const FormNuevaCotizacionComponent = (props) => {

    const user = props.user;
    const classes = useStyles();
    const cancelFunction = props.cancelFunction;
    const [activeStep, setActiveStep] = React.useState(0);
    const [handleNextFunction, setHandleNextFunction] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const tableData = props.tableData;
    const setTableData = props.setTableData;
    const cotizacionSelected = props.cotizacionSelected;
    const [cotizacion, setCotizacion] = useState();

    React.useEffect(() => {
        if (cotizacionSelected) {

            CotizacionesServices.GetCotizacionById(cotizacionSelected.id)
                .then(resultLog => {

                    if (resultLog.status === 200) {
                        const detalleCotizacionByID = resultLog.data;
                        console.log(detalleCotizacionByID, "Detalle COTIZACION");
                        setCotizacion({
                            cotizacionId: detalleCotizacionByID.encabezado.id,
                            folio: detalleCotizacionByID.encabezado.folio,
                            clienteId: detalleCotizacionByID.encabezado.cliente.id,
                            clienteNombre: detalleCotizacionByID.encabezado.cliente.nombre,
                            ciudadId: detalleCotizacionByID.encabezado.ciudad.id,
                            ciudadNombre: detalleCotizacionByID.encabezado.ciudad.ciudad,
                            capacidad: detalleCotizacionByID.encabezado.capacidad,
                            claro: detalleCotizacionByID.encabezado.claro,
                            recorrido: detalleCotizacionByID.encabezado.recorrido,
                            alturaTotal: detalleCotizacionByID.encabezado.alturaTotal,
                            alturaIzaje: detalleCotizacionByID.encabezado.alturaIzaje,
                            columnas: detalleCotizacionByID.encabezado.columnas,
                            distancia: detalleCotizacionByID.encabezado.distancia,
                            volado: detalleCotizacionByID.encabezado.usaVolado,
                            cabrilla: detalleCotizacionByID.encabezado.cabrilla,
                            puentes: detalleCotizacionByID.puente.puentes,
                            polipasto: detalleCotizacionByID.puente.polipasto.polipasto,
                            // polipastoNombre: detalleCotizacionByID.puente.polipasto.polipasto.modelo,
                            trole: detalleCotizacionByID.puente.trole.trole,
                            // troleNombre: detalleCotizacionByID.puente.trole.trole.modelo,
                            accesorios: detalleCotizacionByID.puente.accesorios.conceptos.map(ac => { return { id: ac.id } })
                        });
                    }
                    else {
                        cancelFunction();
                        showAlert("Error", resultLog.message || resultLog.detail, "danger");
                    }
                })
                .catch(err => {
                    cancelFunction();
                    showAlert("Error", err.message, "danger");
                });

        } else {
            setCotizacion({
                cotizacionId: null,
                folio: null,
                clienteId: null,
                ciudadId: null,
                ciudadNombre: null,
                clienteNombre: null,
                capacidad: 1,
                claro: null,
                recorrido: null,
                alturaTotal: null,
                alturaIzaje: null,
                alturaColumna: null,
                columnas: null,
                distancia: null,
                volado: false,
                cabrilla: false,
                puentes: 1,
                polipasto: null,
                // polipastoNombre: "",
                trole: null,
                // troleNombre: 7 "NO_TROLE",
                accesorios: []
            })
        }
    }, [cotizacionSelected])

    const getSteps = () => {
        return [
            'General',
            'Especificaciones',
            'Columnas',
            'Puente',
            // 'Anclaje o Cimentación',
            'Accesorios',
            // 'Resumen Cotización'
        ];
    }

    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
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

    const terminarCotizacion = async () => {
        setLoading(true);
        

        const dataResult = await CotizacionesServices.NewCotizacion({
            userId: user.attributes.id,
            clienteId: cotizacion.clienteId,
            ciudadId: cotizacion.ciudadId,
            capacidad: cotizacion.capacidad,
            claro: cotizacion.claro,
            recorrido: cotizacion.recorrido,
            alturaTotal: cotizacion.alturaTotal,
            alturaIzaje: cotizacion.alturaIzaje,
            columnas: Number(cotizacion.columnas),
            distancia: Number(cotizacion.distancia),
            volado: cotizacion.volado,
            cabrilla: cotizacion.cabrilla,
            // puentes: Array(cotizacion.puentes).fill(0).map(p => {
            //     return {
            //         capacidad: cotizacion.capacidad,
            //         polipasto_marca_id: Number(cotizacion.polipasto.id),
            //         trole_marca_id: cotizacion.capacidad < 3 ? Number(cotizacion.trole.id) : 0
            //     }
            // }),
            puentes: cotizacion.puentes,
            polipastoId: cotizacion.polipasto.id,
            troleId: cotizacion.trole.id,
            accesorios: cotizacion.accesorios.length > 0 ? cotizacion.accesorios
                .map(ac => {
                    return {
                        id: Number(ac.id),
                        nombre: ac.nombre
                    }
                })
                : []
        });

        if (dataResult.status === 201) {
            showAlert("Excelente", "Cotización guardada correctamente.", "success");
            const cotizacionesUpdated = [dataResult.data, ...tableData];
            setTableData(cotizacionesUpdated);
            cancelFunction();
        } else {
            showAlert("Error", dataResult.message, "danger");
        }
        setLoading(false);
    }

    const editarCotizacion = async () => {

        setLoading(true);
        const dataResult = await CotizacionesServices.EditCotizacion({
            cotizacionId: cotizacion.cotizacionId,
            userId: user.attributes.id,
            clienteId: cotizacion.clienteId,
            folio: cotizacion.folio,
            ciudadId: cotizacion.ciudadId,
            capacidad: cotizacion.capacidad,
            claro: cotizacion.claro,
            recorrido: cotizacion.recorrido,
            alturaTotal: cotizacion.alturaTotal,
            alturaIzaje: cotizacion.alturaIzaje,
            columnas: Number(cotizacion.columnas),
            distancia: Number(cotizacion.distancia),
            volado: cotizacion.volado,
            cabrilla: cotizacion.cabrilla,
            // puentes: Array(cotizacion.puentes).fill(0).map(p => {
            //     return {
            //         capacidad: cotizacion.capacidad,
            //         polipasto_marca_id: Number(cotizacion.polipasto.id),
            //         trole_marca_id: Number(cotizacion.trole.id)
            //     }
            // }),
            puentes: cotizacion.puentes,
            polipastoId: cotizacion.polipasto.id,
            troleId: cotizacion.trole.id && cotizacion.capacidad < 3 ? cotizacion.trole.id : 7,
            accesorios: cotizacion.accesorios.length > 0 ? cotizacion.accesorios
                .map(ac => {
                    return {
                        id: Number(ac.id),
                        nombre: ac.nombre
                    }
                })
                : []
        });

        if (dataResult.status === 200) {
            showAlert("Excelente", "Cotización editada correctamente.", "success");
            const tableDataFiltered = tableData.filter(td => td.id !== cotizacionSelected.id);
            const cotizacionesUpdated = [dataResult.data, ...tableDataFiltered];
            setTableData(cotizacionesUpdated);
        } else {
            showAlert("Error", "Al parecer hubo algun problema, intente mas tarde.", "danger");
        }

        setLoading(false);


        cancelFunction();
    }

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <FormStep1General
                    cotizacion={cotizacion}
                    setCotizacion={setCotizacion}
                    setHandleNextFunction={setHandleNextFunction}
                    handleNext={handleNext} />
            case 1:
                return <FormStep2Especificaciones
                    cotizacion={cotizacion}
                    setCotizacion={setCotizacion}
                    setHandleNextFunction={setHandleNextFunction}
                    handleNext={handleNext} />
            case 2:
                return <FormStep3Columnas
                    cotizacion={cotizacion}
                    setCotizacion={setCotizacion}
                    setHandleNextFunction={setHandleNextFunction}
                    handleNext={handleNext} />
            case 3:
                return <FormStep4Puente
                    cotizacion={cotizacion}
                    setCotizacion={setCotizacion}
                    setHandleNextFunction={setHandleNextFunction}
                    handleNext={handleNext} />
            // case 4:
            //     return <FormStep5Anclaje
            //         cotizacion={cotizacion}
            //         setCotizacion={setCotizacion}
            //         setHandleNextFunction={setHandleNextFunction}
            //         handleNext={handleNext} />
            case 4:
                return <FormStep6Accesorios
                    cotizacion={cotizacion}
                    setCotizacion={setCotizacion}
                    setHandleNextFunction={setHandleNextFunction}
                    handleNext={handleNext} />
            // case 6:
            //     return <FormStep7Resumen
            //         cotizacion={cotizacion}
            //         setCotizacion={setCotizacion}
            //         setHandleNextFunction={setHandleNextFunction}
            //         handleNext={handleNext} />
            default:
                return 'Unknown stepIndex';
        }
    }

    return (
        <Styles>

            {cotizacion && (
                <div className={classes.root}>

                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === steps.length ? (
                            <div>
                                <Grid container spacing={3} className="animate__animated animate__fadeIn">

                                    <Grid item md={12} xs={12}>
                                        <Typography className="text-center">
                                            <h5 className="orange"><b>Detalle de la cotización</b></h5>
                                        </Typography>
                                    </Grid>

                                    <Grid item md={4} xs={12}>
                                        <Typography className="text-center">
                                            <h6 className="orange">1. General</h6>
                                            <p><b>Cliente:</b> {cotizacion.clienteNombre} </p>
                                            <p><b>Ciudad:</b> {cotizacion.ciudadNombre} </p>
                                        </Typography>
                                    </Grid>

                                    <Grid item md={4} xs={12}>
                                        <Typography className="text-center">
                                            <h6 className="orange">2. Especificaciones</h6>
                                            <p><b>Capacidad:</b> {cotizacion.capacidad} toneladas</p>
                                            <p><b>Claro:</b> {cotizacion.claro} mts</p>
                                            <p><b>Altura Total:</b> {cotizacion.alturaTotal} mts</p>
                                            <p><b>Altura Izaje:</b> {cotizacion.alturaIzaje} mts</p>
                                            {/* <p><b>Altura Columna:</b> {cotizacion.alturaColumna} mts</p> */}
                                            <p><b>Recorrido:</b> {cotizacion.recorrido} mts</p>
                                        </Typography>
                                    </Grid>

                                    <Grid item md={4} xs={12}>
                                        <Typography className="text-center">
                                            <h6 className="orange">3. Columnas</h6>
                                            <p><b>Número de Columnas:</b> {cotizacion.columnas}</p>
                                            <p><b>Distancia:</b> {cotizacion.distancia} mts</p>
                                            <p><b>Volado:</b> {cotizacion.volado ? "Sí" : "No"}</p>
                                            <p><b>Cabrilla:</b> {cotizacion.cabrilla ? "Sí" : "No"}</p>
                                        </Typography>
                                    </Grid>

                                    <Grid item md={4} xs={12}>
                                        <Typography className="text-center">
                                            <h6 className="orange">4. Puentes</h6>
                                            <p><b>Número de Puentes:</b> {cotizacion.puentes}</p>
                                            <p><b>Polipasto:</b> {`${cotizacion.polipasto.modelo} ${cotizacion.polipasto.marca.marca} ${cotizacion.polipasto.capacidad} TON`}</p>
                                            <p><b>Trole:</b> {cotizacion.trole.id && cotizacion.capacidad < 3
                                                ? `${cotizacion.trole.modelo} ${cotizacion.trole.marca.marca} ${cotizacion.trole.capacidad} TON`
                                                : "N/A"}</p>
                                        </Typography>
                                    </Grid>

                                    {/* <Grid item md={4} xs={12}>
                                        <Typography className="text-center">
                                            <h6 className="orange">5. Anclaje o Cimentación</h6>
                                            <p>proximamente</p>
                                        </Typography>
                                    </Grid> */}


                                    <Grid item md={4} xs={12}>
                                        <Typography className="text-center">
                                            <h6 className="orange">5. Accesorios</h6>
                                            {/* <p>{cotizacion.accesorios.map(ac => ac.name).join(',')}</p> */}
                                            {cotizacion.accesorios.map(ac => {
                                                return <p>{ac.nombre}</p>
                                            })}
                                        </Typography>
                                    </Grid>

                                    <Grid item md={12} xs={12} className="text-right">
                                        <Button
                                            type="button"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            className={classes.backButton}
                                        >
                                            Regresar
                                        </Button>


                                        {
                                            cotizacionSelected
                                                ? (<Button type="button" variant="contained" color="primary" autoFocus onClick={editarCotizacion} disabled={loading}>
                                                    {loading ? "Editando" : "Editar"}
                                                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                                </Button>)
                                                : (<Button type="button" variant="contained" color="primary" autoFocus onClick={terminarCotizacion} disabled={loading}>
                                                    {loading ? "Guardando" : "Guardar"}
                                                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                                </Button>)
                                        }
                                    </Grid>

                                </Grid>

                            </div>
                        ) : (
                            <div>
                                <Typography className={classes.instructions}>

                                    {getStepContent(activeStep)}

                                </Typography>
                                <div className="text-right">
                                    <Button
                                        type="button"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.backButton}
                                    >
                                        Regresar
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNextFunction}>
                                        Siguiente
                                    </Button>

                                </div>
                            </div>
                        )}
                    </div>

                </div>
            )}


        </Styles>
    );
}


export default FormNuevaCotizacionComponent;
