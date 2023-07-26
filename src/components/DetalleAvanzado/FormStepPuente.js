import { Button, Grid, IconButton, Input, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import FormDetallePuente from './FormDetallePuente';

import Formatos from "../../utils/Formatos";


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const FormStepPuente = (props) => {
    const classes = useStyles();
    const isAdmin = props.isAdmin;
    const setStepValue = props.setStepValue;
    const value = props.value;
    const nextStep = props.nextStep;
    const backStep = props.backStep;
    const cotizacion = props.cotizacion;
    const setCotizacion = props.setCotizacion;
    const [showDetalle, setShowDetalle] = useState(false);
    const [editar, setEditar] = useState(false);



    const showDetalleClickButton = () => {
        setShowDetalle(!showDetalle)
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <h6 className="orange">Equipamiento Puente</h6>
                </Grid>
                <Grid item xs={6} md={6}>
                    <div className="table-responsive">
                        <table border={1} className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Concepto</th>
                                    <th>Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Polipasto</td>
                                    <td>{Formatos.GetFormatoMoneda(cotizacion.puente.polipasto.monto)}</td>
                                </tr>
                                <tr>
                                    <td>Trole</td>
                                    <td>{Formatos.GetFormatoMoneda(cotizacion.puente.trole.monto)}</td>
                                </tr>
                                <tr>
                                    <td>Tablero</td>
                                    <td>{Formatos.GetFormatoMoneda(cotizacion.puente.tablero.monto)}</td>
                                </tr>
                                <tr>
                                    <td>Cabezales</td>
                                    <td>{Formatos.GetFormatoMoneda(cotizacion.puente.cabezales.monto)}</td>
                                </tr>
                                <tr>
                                    <td>Electrificación Puente</td>
                                    <td>{Formatos.GetFormatoMoneda(cotizacion.puente.electrificacionPuente.monto)}</td>
                                </tr>
                                <tr>
                                    <td>Electrificación Recorrido</td>
                                    <td>{Formatos.GetFormatoMoneda(cotizacion.puente.electrificacionRecorrido.monto)}</td>
                                </tr>
                                <tr>
                                    <td>Accesorios</td>
                                    <td>{Formatos.GetFormatoMoneda(cotizacion.puente.accesorios.monto)}</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <th>{Formatos.GetFormatoMoneda(cotizacion.puente.total)}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {
                        isAdmin() === true && (
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                onClick={showDetalleClickButton}
                            >
                                Detalle
                            </Button>
                        )
                    }

                </Grid>

                <Grid item xs={6} md={6}>
                    {
                        showDetalle === true && (
                            <FormDetallePuente
                                isAdmin={isAdmin}
                                cotizacion={cotizacion}
                                setCotizacion={setCotizacion}
                                setShowDetalle={setShowDetalle}
                                editar={editar}
                                setEditar={setEditar}
                            />
                        )
                    }
                </Grid>

                <Grid item md={12} xs={12} className="text-right">
                    <Button
                        type="button"
                        disabled={value === 0 || editar}
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
        </div>
    )
}

export default FormStepPuente;