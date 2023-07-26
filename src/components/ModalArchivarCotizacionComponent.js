import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import CotizacionServices from '../services/CotizacionesServices';
import { store } from 'react-notifications-component';
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

const ModalArchivarCotizacionComponent = (props) => {
    const open = props.openModal;
    const handleClose = props.handleClose;
    const user = props.user;
    const tableData = props.tableData;
    const setTableData = props.setTableData;
    const cotizacionSelected = props.cotizacionSelected;
    const classes = useStyles();

    const [isLoading, setIsLoading] = React.useState(false);

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

    const archivar = async () => {
       
        setIsLoading(true);
        const resultRevision = await CotizacionServices.updateStatusCotiacion({
            cotizacionId: cotizacionSelected.id,
            statusId: 6,
            userId: user.attributes.id
        })

        if (resultRevision.status === 200) {
            showAlert("Excelente", "La cotización se archivo.", "success");
            const cotizacionesUpdated = tableData.filter(td => td.id !== cotizacionSelected.id);
            setTableData(cotizacionesUpdated);
            handleClose();
        }
        else {
            showAlert("Error", resultRevision.message, "danger");
        }

        setIsLoading(false);
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
                <DialogTitle id="alert-dialog-title">{"Archivar Cotización"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <Grid container spacing={1} className="text-center">
                            <Grid item xs={12} md={12}>
                                <h5 className="orange">¿Esta seguro de archivar la Cotización?</h5>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <h6 className="orange"><b>Cliente</b></h6>
                                <p className="inputData">{cotizacionSelected.cliente}</p>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <h6 className="orange"><b>Folio</b></h6>
                                <p className="inputData"> {cotizacionSelected.folio}</p>
                            </Grid>

                            <Grid item xs={12} md={12} className="text-right">
                                <Button
                                    type="button"
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleClose}
                                    className={classes.bootonMargin}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    onClick={archivar}
                                    disabled={isLoading}
                                >
                                    Archivar
                                    {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                                </Button>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>



            </Dialog>


        </Styles>
    );
}

export default ModalArchivarCotizacionComponent;