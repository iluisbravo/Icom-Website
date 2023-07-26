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
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import CotizacionServices from '../services/CotizacionesServices';
import { store } from 'react-notifications-component';
const Styles = styled.div` 

`;

const useStyles = makeStyles((theme) => ({
    bootonMargin: {
        marginRight: theme.spacing(2)
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const ModalComentariosCotizacionComponent = (props) => {
    const open = props.openModal;
    const handleClose = props.handleClose;
    const user = props.user;
    const tableData = props.tableData;
    const setTableData = props.setTableData;
    const cotizacionSelected = props.cotizacionSelected;
    const classes = useStyles();
    const imgDefault = "/img/user-profile.png";

    const [comentarios, setComentarios] = React.useState([]);

    React.useEffect(() => {

        if (cotizacionSelected.id && open)
            getComentarios();

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

    const getComentarios = async () => {
        
        const resultComentarios = await CotizacionServices.getComentariosByCotizacion(cotizacionSelected.id);
        
        if (resultComentarios.status === 200) {
            const cotizacionesComentarios = resultComentarios.data;
            setComentarios(cotizacionesComentarios);
        }
        else {
            showAlert("Error", resultComentarios.message, "danger");
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
                <DialogTitle id="alert-dialog-title">{"Comentarios"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <Grid container spacing={1} className="animate__animated animate__fadeIn text-center">
                            <Grid item xs={12} md={6}>
                                <h6 className="orange"><b>Cliente</b></h6>
                                <p className="inputData">{cotizacionSelected.cliente}</p>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <h6 className="orange"><b>Folio</b></h6>
                                <p className="inputData"> {cotizacionSelected.folio}</p>
                            </Grid>

                            <Grid item xs={12} md={12}>

                                {
                                    comentarios.length > 0
                                        ? comentarios.map((c, ix, arr) => {

                                            let lr = "left";
                                            let contentMsg = "";
                                            let userAnterior = arr[ix - 1] ? arr[ix - 1].idUsuario : arr[ix].idUsuario;
                                            let esElMismoUsuario = userAnterior === c.idUsuario;

                                            if (!esElMismoUsuario && lr === "left") {
                                                lr = "right";
                                            }

                                            else if (!esElMismoUsuario && lr === "right") {
                                                lr = "left"
                                            }

                                            return <Grid container spacing={2}>
                                                {
                                                    (lr === "left") && <Grid item xs={12} md={2}>
                                                        <img className="imgMessage" src={c.imagenUrl || imgDefault} data-aos="zoom-in" alt="" height="80" width="80" />
                                                    </Grid>
                                                }


                                                <Grid item xs={12} md={10}>

                                                    <blockquote data-aos="fade-left" class={`triangle-border ${lr}`}>
                                                        <p>
                                                            <p><b>{c.nombreUsuario + " " + c.apellidoUsuario}</b></p>
                                                            <p><i>{c.comentarios} </i></p>
                                                            <small>{moment(c.fecha).locale('es').format('DD/MMM/yyyy HH:mm')}</small>

                                                        </p>
                                                    </blockquote>
                                                </Grid>

                                                {
                                                    (lr === "right") && <Grid item xs={12} md={2}>
                                                        <img className="imgMessage" src={c.imagenUrl || imgDefault} data-aos="zoom-in" alt="" height="80" width="80" />
                                                    </Grid>
                                                }


                                            </Grid>;


                                        })
                                        : <p>No exiten comentarios.</p>

                                }

                            </Grid>


                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <div className="text-right">
                        <Button
                            type="button"
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                            className={classes.bootonMargin}
                        >
                            Cerrar
                        </Button>
                        {/* <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    onClick={revision}
                                    disabled={isLoading}
                                >
                                    Enviar a Revisión
                                    {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </Button> */}
                    </div>
                </DialogActions>



            </Dialog>


        </Styles>
    );
}

export default ModalComentariosCotizacionComponent;