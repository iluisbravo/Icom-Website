import { Button, Grid, Input, TextField } from "@material-ui/core";
import { useState } from "react";
import Formatos from "../../utils/Formatos";
import FormDetalleInstalacion from './FormDetalleInstalacion';



const FormStepInstalacion = (props) => {
    const setStepValue = props.setStepValue;
    const value = props.value;
    const nextStep = props.nextStep;
    const backStep = props.backStep;
    const [showDetalle, setShowDetalle] = useState(false);

    const isAdmin = props.isAdmin;
    const cotizacion = props.cotizacion;
    const setCotizacion = props.setCotizacion;
    const [editar, setEditar] = useState(false);

    const showDetalleClickButton = () => {
        setShowDetalle(!showDetalle)
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <h6 className="orange">Instalación</h6>
                </Grid>
                <Grid item xs={12} md={6}>

                    <div className="table-responsive">
                        <table border={1} className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Concepto</th>
                                    <th>Monto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cotizacion.instalacion.conceptos.map(c => {
                                    return <tr>
                                        <td>{c.Concepto}</td>
                                        <td>{Formatos.GetFormatoMoneda(c.Monto)}</td>
                                    </tr>
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Total</th>
                                    <th>{Formatos.GetFormatoMoneda(cotizacion.instalacion.total)}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>



                    {
                        isAdmin() === true && (
                            <Button aria-label="detalle" variant="contained" color="primary" size="medium" onClick={showDetalleClickButton}>
                                Detalle
                            </Button>
                        )
                    }


                </Grid>
                <Grid item xs={12} md={6}>
                    {
                        showDetalle === true && (
                            <FormDetalleInstalacion
                                setShowDetalle={setShowDetalle}
                                isAdmin={isAdmin}
                                cotizacion={cotizacion}
                                setCotizacion={setCotizacion}
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

export default FormStepInstalacion;