import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import FormDetalleAvanzadoCotizacionComponent from './FormDetalleAvanzadoCotizacionComponent';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


const ModalDetalleAvanzadoCotizacionComponent = (props) => {
    const user = props.user;
    const open = props.openModal;
    const handleClose = props.handleClose;
    const tableData = props.tableData;
    const setTableData = props.setTableData;
    const cotizacionSelected = props.cotizacionSelected;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth={'lg'}
                disableBackdropClick
            >

                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Detalle Avanzado de Cotización
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <FormDetalleAvanzadoCotizacionComponent
                            user={user}
                            cancelFunction={handleClose}
                            tableData={tableData}
                            setTableData={setTableData}
                            cotizacionSelected={cotizacionSelected}
                        />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default ModalDetalleAvanzadoCotizacionComponent;