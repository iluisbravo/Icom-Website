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

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import NoteAddIcon from '@material-ui/icons/NoteAdd';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import ArchiveIcon from '@material-ui/icons/Archive';

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
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const ModalLogCotizacionComponent = (props) => {
    const open = props.openModal;
    const handleClose = props.handleClose;
    const user = props.user;
    const tableData = props.tableData;
    const setTableData = props.setTableData;
    const cotizacionSelected = props.cotizacionSelected;
    const classes = useStyles();
    const imgDefault = "/img/user-profile.png";

    const [logs, setLogs] = React.useState([]);

    React.useEffect(() => {

        if (cotizacionSelected.id && open)
            getLog();

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

    const getLog = async () => {
        const resultLog = await CotizacionServices.getLogByCotizacion(cotizacionSelected.id);
        
        if (resultLog.status === 200) {
            const cotizacionesLogs = resultLog.data;
            setLogs(cotizacionesLogs);
        }
        else {
            showAlert("Error", resultLog.message, "danger");
        }

    }

    const getLogIcon = (action) => {
        let logIcon = "";

        switch (action) {
            case 1:
                logIcon = <NoteAddIcon />;
                break;
            case 2:
                logIcon = <EditIcon />;
                break;
            case 3:
                logIcon = <VisibilityIcon />;
                break;
            case 4:
                logIcon = <CheckIcon />;
                break;
            case 5:
                logIcon = <CancelIcon />;
                break;
            case 6:
                logIcon = <DeleteIcon />;
                break;
            case 7:
                logIcon = <ArchiveIcon />;
                break;

            default:
                break;

        }

        return logIcon;
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
                <DialogTitle id="alert-dialog-title">{"Log de acciones"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <Grid container spacing={1} className="text-center">
                            <Grid item xs={12} md={6}>
                                <h6 className="orange"><b>Cliente</b></h6>
                                <p className="inputData">{cotizacionSelected.cliente}</p>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <h6 className="orange"><b>Folio</b></h6>
                                <p className="inputData"> {cotizacionSelected.folio}</p>
                            </Grid>

                            <Grid item xs={12} md={12} className="animate__animated animate__fadeIn">

                                <Timeline align="alternate">
                                    {
                                        logs.length > 0
                                            ? logs.map((c, ix, arr) => {

                                                const isFinal = arr.indexOf(c) + 1 === arr.length;


                                                return <TimelineItem>
                                                    <TimelineOppositeContent>

                                                    </TimelineOppositeContent>
                                                    <TimelineSeparator>
                                                        <TimelineDot color="primary" variant={!isFinal ? "outlined" : "default"} >
                                                            {getLogIcon(c.idTipoTransaccion)}
                                                        </TimelineDot>

                                                        {!isFinal && <TimelineConnector />}


                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                        <Paper elevation={3} className={classes.paper}>
                                                            <p>
                                                                <b>{c.nombreUsuario + " " + c.apellidoUsuario}</b>
                                                            </p>

                                                            <p><small>  {moment(c.fecha).locale('es').format('DD/MMM/yyyy HH:mm')}</small></p>

                                                            <p><b>{c.tipoTransaccion}</b></p>
                                                            <p><i>{c.comentarios ? `"${c.comentarios}"` : ""} </i></p>



                                                        </Paper>
                                                        <br />

                                                    </TimelineContent>
                                                </TimelineItem>


                                            })
                                            : <p>No exiten comentarios.</p>
                                    }

                                    {/* <TimelineItem>
                                        <TimelineOppositeContent>
                                            <Typography variant="body2" color="textSecondary">
                                                10:00 am
                                            </Typography>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot color="primary">
                                                <LaptopMacIcon />
                                            </TimelineDot>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Paper elevation={3} className={classes.paper}>
                                                <Typography variant="h6" component="h1">
                                                    Code
                                                </Typography>
                                                <Typography>Because it&apos;s awesome!</Typography>
                                            </Paper>
                                        </TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot color="primary" variant="outlined">
                                                <HotelIcon />
                                            </TimelineDot>
                                            <TimelineConnector className={classes.secondaryTail} />
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Paper elevation={3} className={classes.paper}>
                                                <Typography variant="h6" component="h1">
                                                    Sleep
                                                </Typography>
                                                <Typography>Because you need rest</Typography>
                                            </Paper>
                                        </TimelineContent>
                                    </TimelineItem>
                                    <TimelineItem>
                                        <TimelineSeparator>
                                            <TimelineDot color="secondary">
                                                <RepeatIcon />
                                            </TimelineDot>
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Paper elevation={3} className={classes.paper}>
                                                <Typography variant="h6" component="h1">
                                                    Repeat
                                                </Typography>
                                                <Typography>Because this is the life you love!</Typography>
                                            </Paper>
                                        </TimelineContent>
                                    </TimelineItem> */}
                                </Timeline>

                                {/* {
                                    comentarios.length > 0
                                        ? comentarios.map((c, ix, arr) => {

                                            let lr = "left";
                                            let contentMsg = "";
                                            let userAnterior = arr[ix - 1] ? arr[ix - 1].user_id : arr[ix].user_id;
                                            let esElMismoUsuario = userAnterior === c.user_id;

                                            if (!esElMismoUsuario && lr === "left") {
                                                lr = "right";
                                            }

                                            else if (!esElMismoUsuario && lr === "right") {
                                                lr = "left"
                                            }

                                            return <Grid container spacing={2}>
                                                {
                                                    (lr === "left") && <Grid item xs={12} md={2}>
                                                        <img className="imgMessage" src={c.user_img || imgDefault} data-aos="zoom-in" alt="" height="80" width="80" />
                                                    </Grid>
                                                }


                                                <Grid item xs={12} md={10}>

                                                    <blockquote data-aos="fade-left" class={`triangle-border ${lr}`}>
                                                        <p>
                                                            <p><b>{c.user_first_name + " " + c.user_last_name}</b></p>
                                                            <p><i>{c.transaction_type} </i></p>
                                                            <p><i>{c.comentarios} </i></p>
                                                            <small>{moment(c.message_date).locale('es').format('DD/MMM/yyyy HH:mm')}</small>

                                                        </p>
                                                    </blockquote>
                                                </Grid>

                                                {
                                                    (lr === "right") && <Grid item xs={12} md={2}>
                                                        <img className="imgMessage" src={c.user_img || imgDefault} data-aos="zoom-in" alt="" height="80" width="80" />
                                                    </Grid>
                                                }


                                            </Grid>;


                                        })
                                        : <p>No exiten comentarios.</p>

                                } */}

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

export default ModalLogCotizacionComponent;