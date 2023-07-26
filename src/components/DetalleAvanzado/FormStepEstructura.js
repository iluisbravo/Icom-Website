import { Button, Grid, IconButton, Input, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import Formatos from "../../utils/Formatos";

const useStyles = makeStyles((theme) => ({
    margin: {

    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const Styles = styled.div`
    table, th, td {
        /* text-align: right; */
        /* border: 1px solid black;
        border-collapse: collapse; */
        /* padding: 10px */
    }

    table, thead, th {
        /* padding: 10px */
    }
`;

const FormStepEstructura = (props) => {
    const classes = useStyles();
    const user = props.user;
    const isAdmin = props.isAdmin;
    const setStepValue = props.setStepValue;
    const value = props.value;
    const nextStep = props.nextStep;
    const backStep = props.backStep;
    const cotizacion = props.cotizacion;
    const setCotizacion = props.setCotizacion;

    console.log(cotizacion, "COTIZACION");

    return (
        <Styles>
            <div>
                <form noValidate autoComplete="off">
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            <h6 className="orange">Estructura</h6>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            {/* {
                            showDetalle === true && (
                                <FormDetalleEstructura setShowDetalle={setShowDetalle} />
                            )
                        } */}

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12}>
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead className="text-right">
                                                <tr>
                                                    <th>Concepto</th>
                                                    <th>Tipo Viga</th>
                                                    <th>Alto</th>
                                                    <th>Ancho</th>
                                                    <th>Peso Metro</th>
                                                    <th>Precio Kilo</th>
                                                    <th>Metros Lineales</th>
                                                    <th>Peso Total</th>
                                                    <th>Costo</th>
                                                    <th>Costo Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (cotizacion.estructura.puente.material) && (
                                                        <tr className="text-right">
                                                            <td>Puente</td>
                                                            <td>{cotizacion.estructura.puente.material.tipoViga}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.puente.material.alto)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.puente.material.ancho)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.puente.material.pesoMetro)}</td>
                                                            <td>{Formatos.GetFormatoMoneda(cotizacion.estructura.puente.material.precioKilo)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.puente.metrosLineales)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.puente.peso)}</td>
                                                            <td>{Formatos.GetFormatoMoneda(cotizacion.estructura.puente.costo)}</td>
                                                            <td rowSpan={6}></td>
                                                        </tr>
                                                    )
                                                }

                                                {
                                                    (cotizacion.estructura.canalPuente.material) && (
                                                        <tr className="text-right">
                                                            <td>Canal Puente</td>
                                                            <td>{cotizacion.estructura.canalPuente.material.tipoViga}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.canalPuente.material.alto)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.canalPuente.material.ancho)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.canalPuente.material.pesoMetro)}</td>
                                                            <td>{Formatos.GetFormatoMoneda(cotizacion.estructura.canalPuente.material.precioKilo)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.canalPuente.metrosLineales)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.canalPuente.peso)}</td>
                                                            <td>{Formatos.GetFormatoMoneda(cotizacion.estructura.canalPuente.costo)}</td>
                                                        </tr>
                                                    )
                                                }
                                                {
                                                    (cotizacion.estructura.trabes.material) && (
                                                        <tr className="text-right">
                                                            <td>Trabes</td>
                                                            <td>{cotizacion.estructura.trabes.material.tipoViga}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.trabes.material.alto)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.trabes.material.ancho)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.trabes.material.pesoMetro)}</td>
                                                            <td>{Formatos.GetFormatoMoneda(cotizacion.estructura.trabes.material.precioKilo)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.trabes.metrosLineales)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.trabes.peso)}</td>
                                                            <td>{Formatos.GetFormatoMoneda(cotizacion.estructura.trabes.costo)}</td>
                                                        </tr>
                                                    )
                                                }
                                                {
                                                    (cotizacion.estructura.columnas.material) && (
                                                        <tr className="text-right">
                                                            <td>Columnas</td>
                                                            <td>{cotizacion.estructura.columnas.material.tipoViga}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.columnas.material.alto)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.columnas.material.ancho)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.columnas.material.pesoMetro)}</td>
                                                            <td>{Formatos.GetFormatoMoneda(cotizacion.estructura.columnas.material.precioKilo)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.columnas.metrosLineales)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.columnas.peso)}</td>
                                                            <td>{Formatos.GetFormatoMoneda(cotizacion.estructura.columnas.costo)}</td>
                                                        </tr>
                                                    )
                                                }

                                                {
                                                    (cotizacion.estructura.patasGallo.material) && (
                                                        <tr className="text-right">
                                                            <td>Patas de Gallo</td>
                                                            <td>{cotizacion.estructura.patasGallo.material.tipoViga}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.patasGallo.material.alto)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.patasGallo.material.ancho)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.patasGallo.material.pesoMetro)}</td>
                                                            <td>{Formatos.GetFormatoMoneda(cotizacion.estructura.patasGallo.material.precioKilo)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.patasGallo.metrosLineales)}</td>
                                                            <td>{Formatos.GetFormatoNumero(cotizacion.estructura.patasGallo.peso)}</td>
                                                            <td>{Formatos.GetFormatoMoneda(cotizacion.estructura.patasGallo.costo)}</td>
                                                        </tr>
                                                    )
                                                }

                                                <tr className="text-right">
                                                    <td colSpan={8}></td>
                                                    <th>
                                                        {
                                                            Formatos.GetFormatoMoneda(
                                                                cotizacion.estructura.puente.costo +
                                                                cotizacion.estructura.canalPuente.costo +
                                                                cotizacion.estructura.trabes.costo +
                                                                cotizacion.estructura.columnas.costo +
                                                                cotizacion.estructura.patasGallo.costo
                                                            )}
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={10}>Acero</th>
                                                </tr>
                                                <tr>
                                                    <td colSpan={7} className="text-left">Placas Base</td>
                                                    <td className="text-right">{Formatos.GetFormatoNumero(cotizacion.estructura.acero.placas.pesoPlacasBase)}</td>
                                                    <td rowSpan={6}> </td>
                                                    <td rowSpan={7}></td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={7} className="text-left">Placas Asiento</td>
                                                    <td className="text-right">{Formatos.GetFormatoNumero(cotizacion.estructura.acero.placas.pesoPlacasAsiento)}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={7} className="text-left">Placas Patas de Gallo</td>
                                                    <td className="text-right">{Formatos.GetFormatoNumero(cotizacion.estructura.acero.placas.pesoPlacasPatasGallo)}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={7} className="text-left">Placas Tapas de Viga</td>
                                                    <td className="text-right">{Formatos.GetFormatoNumero(cotizacion.estructura.acero.placas.pesoPlacasTapasViga)}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={7} className="text-left">Placas Unión de Cabezales</td>
                                                    <td className="text-right">{Formatos.GetFormatoNumero(cotizacion.estructura.acero.placas.pesoPlacasUnionCabezales)}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={7} className="text-left">Cartabones</td>
                                                    <td className="text-right">{Formatos.GetFormatoNumero(cotizacion.estructura.acero.placas.pesoCartabones)}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={7}></td>
                                                    <td className="text-right">{Formatos.GetFormatoNumero(cotizacion.estructura.acero.peso)}</td>
                                                    <th className="text-right">{Formatos.GetFormatoMoneda(cotizacion.estructura.acero.costo)}</th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={10}>Riel para Trabe</th>
                                                </tr>
                                                <tr>
                                                    <td colSpan={6}>Riel {Formatos.GetFormatoNumero(cotizacion.estructura.rielParaTrabe.piezas)} Pz</td>
                                                    {/* <td>{Formatos.GetFormatoNumero(cotizacion.estructura.rielParaTrabe.piezas)}</td> */}
                                                    <td className="text-right">{Formatos.GetFormatoNumero(cotizacion.estructura.rielParaTrabe.metrosLineales)}</td>
                                                    <td></td>
                                                    <th className="text-right">{Formatos.GetFormatoMoneda(cotizacion.estructura.rielParaTrabe.costo)}</th>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={9}></th>
                                                    <th className="text-right">{Formatos.GetFormatoMoneda(cotizacion.estructura.total)}</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </Grid>

                            </Grid>
                        </Grid>



                        <Grid className="text-right" item md={12} xs={12}>
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
                                onClick={nextStep}>
                                Siguiente
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Styles>
    )
}

export default FormStepEstructura;