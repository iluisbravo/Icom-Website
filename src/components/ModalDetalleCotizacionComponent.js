import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormNuevaCotizacionComponent from './FormNuevaCotizacionComponent';
import CotizacionServices from '../services/CotizacionesServices';
import { store } from 'react-notifications-component';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
const Styles = styled.div` 
    /* font-family: "Poppins", sans-serif; */
        /* .inputData{
            border: 1px solid !important;
            border-radius: 5px !important;
            background: rgba(1,1,1,0.3) !important;
            color: white !important;
            font-weight: 500 !important;
        } */

`;

const ModalDetalleCotizacionComponent = (props) => {
    const open = props.openModal;
    const handleClose = props.handleClose;
    const tableData = props.tableData;
    const setTableData = props.setTableData;
    const cotizacionSelected = props.cotizacionSelected;

    const [detalleCotizacion, setDetalleCotizacion] = React.useState();

    React.useEffect(() => {

        if (cotizacionSelected.id && open)
            getDetalleCotizacionById();

    }, [open]);


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

    const getDetalleCotizacionById = async () => {
        const resultLog = await CotizacionServices.GetCotizacionById(cotizacionSelected.id);

        if (resultLog.status === 200) {
            const detalleCotizacionByID = resultLog.data;
            setDetalleCotizacion(detalleCotizacionByID);
        }
        else {
            showAlert("Error", resultLog.message, "danger");
        }
    }

    return (
        <Styles>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">{"Detalle Cotización"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {detalleCotizacion && (
                            <Grid container spacing={1} className="text-center">
                                <Grid item xs={12} md={6}>
                                    <h6 className="orange"><b>Cliente</b></h6>
                                    <p className="inputData">{detalleCotizacion.encabezado.cliente.nombre}</p>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <h6 className="orange"><b>Folio</b></h6>
                                    <p className="inputData"> {detalleCotizacion.encabezado.folio}</p>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <h6 className="orange"><b>Cotización</b></h6>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <p><b>Capacidad:</b></p>
                                    <p className="inputData">{detalleCotizacion.encabezado.capacidad} toneladas</p>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <p><b>Claro:</b></p>
                                    <p className="inputData">{detalleCotizacion.encabezado.claro} mts</p>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <p><b>Recorrido:</b></p>
                                    <p className="inputData">{detalleCotizacion.encabezado.recorrido} mts</p>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <p><b>Altura Total:</b></p>
                                    <p className="inputData"> {detalleCotizacion.encabezado.alturaTotal} mts</p>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <p><b>Altura Izaje:</b></p>
                                    <p className="inputData"> {detalleCotizacion.encabezado.alturaIzaje} mts</p>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <p><b>Altura Columna:</b> </p>
                                    <p className="inputData">{detalleCotizacion.encabezado.alturaColumnas} mts</p>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <h6 className="orange"><b>Responsables</b></h6>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <p><b>Fecha Registro:</b> </p>
                                    <p className="inputData">{moment(detalleCotizacion.encabezado.fecha).locale('es').format('DD/MMM/yyyy HH:mm')}</p>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <p><b>Usuario Registro:</b> </p>
                                    <p className="inputData">{detalleCotizacion.encabezado.usuario.nombre + " " + detalleCotizacion.encabezado.usuario.apellido}</p>
                                </Grid>
                                <Grid item xs={12} md={12} className="text-right">
                                    <Button type="button" variant="outlined" color="secondary" onClick={handleClose}>
                                        Cerrar
                                    </Button>
                                </Grid>
                            </Grid>
                        )}


                    </DialogContentText>
                </DialogContent>



            </Dialog>


        </Styles>
    );
}

export default ModalDetalleCotizacionComponent;