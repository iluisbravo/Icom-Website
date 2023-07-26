import { Button, Grid, Input, TextField } from "@material-ui/core";
import { useState } from "react";
import FormDetalleOtros from './FormDetalleOtros';
import Formatos from "../../utils/Formatos";




const FormStepOtros = (props) => {
    const setStepValue = props.setStepValue;
    const value = props.value;
    const nextStep = props.nextStep;
    const backStep = props.backStep;

    const isAdmin = props.isAdmin;
    const cotizacion = props.cotizacion;
    const setCotizacion = props.setCotizacion;
    const [editar, setEditar] = useState(false);

    const [showDetalle, setShowDetalle] = useState(false);

    const showDetalleClickButton = () => {
        setShowDetalle(!showDetalle)
    }

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item md={12} xs={12} >
                    <h6 className="orange">Otros</h6>
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
                                    <td>Memoria de Cálculo</td>
                                    <td>{Formatos.GetFormatoMoneda(cotizacion.otros.memoriaCalculo.monto)}</td>
                                </tr>
                                <tr>
                                    <td>M.O. Fabricación Mecánica</td>
                                    <td>{Formatos.GetFormatoMoneda(cotizacion.otros.manoObra.monto)}</td>
                                </tr>
                                <tr>
                                    <td>Flete</td>
                                    <td>{Formatos.GetFormatoMoneda(cotizacion.otros.flete.monto)}</td>
                                </tr>
                                <tr>
                                    <td>Otros</td>
                                    <td>{Formatos.GetFormatoMoneda(cotizacion.otros.otros.monto)}</td>
                                </tr>                               
                                <tr>
                                    <th>Total</th>
                                    <th>{Formatos.GetFormatoMoneda(cotizacion.otros.total)}</th>
                                </tr>
                            </tbody>
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
                <Grid item xs={6} md={6}>
                    {
                        showDetalle === true && (
                            <FormDetalleOtros
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

export default FormStepOtros;