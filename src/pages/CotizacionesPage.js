import { FormControlLabel, Grid, Paper, Switch } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/es';
import IndicadorCotizacionesComponent from '../components/IndicadorCotizacionesComponent';
import styled from 'styled-components';
import TablaCotizacionesComponent from '../components/TablaCotizacionesComponent';
import React from 'react';
import ModalNuevaCotizacionComponent from '../components/ModalNuevaCotizacionComponent';
import ModalEditCotizacionComponent from '../components/ModalEditCotizacionComponent';
import ModalDetalleCotizacionComponent from '../components/ModalDetalleCotizacionComponent';
import ModalDetalleAvanzadoCotizacionComponent from '../components/ModalDetalleAvanzadoCotizacionComponent';
import ModalAutorizarCotizacionComponent from '../components/ModalAutorizarCotizacionComponent';
import ModalRechazarCotizacionComponent from '../components/ModalRechazarCotizacionComponent';
import ModalRevisionCotizacionComponent from '../components/ModalRevisionCotizacionComponent';
import ModalCancelarCotizacionComponent from '../components/ModalCancelarCotizacionComponent';
import ModalComentariosCotizacionComponent from '../components/ModalComentariosCotizacionComponent';
import ModalLogCotizacionComponent from '../components/ModalLogCotizacionComponent';
import ModalArchivarCotizacionComponent from '../components/ModalArchivarCotizacionComponent';
import CotizacionesServices from '../services/CotizacionesServices';
import DocumentComponent from '../components/DocumentComponent';
const Styles = styled.div` 
    .MuiIconButton-root{
        padding:5px;
    }

    .inputData{
            border: 1px solid;
            border-radius: 5px;
            background: rgba(1,1,1,0.3);
            color: white;
            font-weight: 500;
        }

`;

const CotizacionesPage = (props) => {

    const auth = props.auth;
    const user = auth.user;
    const [tableTitle, setTableTitle] = React.useState("");
    const [tipoCotizacion, setTipoCotizacion] = React.useState("");
    const [tableColumns, setTableColumns] = React.useState([]);
    const [tableData, setTableData] = React.useState([]);
    const [tableActions, setTableActions] = React.useState([]);

    const [cotizacionSelected, setCotizacionSelected] = React.useState({});

    const [openModalNuevaCotizacion, setOpenModalNuevaCotizacion] = React.useState(false);
    const [openModalEditCotizacion, setOpenModalEditCotizacion] = React.useState(false);
    const [openModalDetalleCotizacion, setOpenModalDetalleCotizacion] = React.useState(false);
    const [openModalDetalleAvanzadoCotizacion, setOpenModalDetalleAvanzadoCotizacion] = React.useState(false);
    const [openModalAutorizarCotizacion, setOpenModalAutorizarCotizacion] = React.useState(false);
    const [openModalRechazarCotizacion, setOpenModalRechazarCotizacion] = React.useState(false);
    const [openModalRevisionCotizacion, setOpenModalRevisionCotizacion] = React.useState(false);
    const [openModalCancelarCotizacion, setOpenModalCancelarCotizacion] = React.useState(false);
    const [openModalComentariosCotizacion, setOpenModalComentariosCotizacion] = React.useState(false);
    const [openModalLogCotizacion, setOpenModalLogCotizacion] = React.useState(false);
    const [openModalArchivarCotizacion, setOpenModalArchivarCotizacion] = React.useState(false);

    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
        changeStatusCotizacion("Abiertas");
    }, []);

    const isAdmin = () => {

        let isAdminReturn = false;


        if (user.attributes.idTipoUsuario === "2" ||
            user.attributes.idTipoUsuario === "6abb943c-215c-11ec-bc9f-0639eebd1841" ||
            user.attributes.idTipoUsuario === "3" ||
            user.attributes.idTipoUsuario === "6ab6120f-215c-11ec-bc9f-0639eebd1841") {
            isAdminReturn = true;
        }
        return isAdminReturn;

        // user.attributes.idTipoUsuario === "1" ||
        // user.attributes.idTipoUsuario === "6ac08b11-215c-11ec-bc9f-0639eebd1841"
    }

    const handleClickOpenNuevaCotizacion = () => {
        setOpenModalNuevaCotizacion(true);
    };

    const handleClickOpenEditCotizacion = (cotizacion) => {
        
        setCotizacionSelected(cotizacion);
        setOpenModalEditCotizacion(true);
    };

    const handleClickOpenDetalleCotizacion = (cotizacion) => {

        setCotizacionSelected(cotizacion);
        setOpenModalDetalleCotizacion(true);
    };

    const handleClickOpenDetalleAvanzadoCotizacion = (cotizacion) => {
        setCotizacionSelected(cotizacion);
        setOpenModalDetalleAvanzadoCotizacion(true);
    };

    const handleClickOpenAutorizarCotizacion = (cotizacion) => {

        setCotizacionSelected(cotizacion);
        setOpenModalAutorizarCotizacion(true);
    };

    const handleClickOpenRechazarCotizacion = (cotizacion) => {

        setCotizacionSelected(cotizacion);
        setOpenModalRechazarCotizacion(true);
    };

    const handleClickOpenRevisionCotizacion = (cotizacion) => {

        setCotizacionSelected(cotizacion);
        setOpenModalRevisionCotizacion(true);
    };

    const handleClickCancelarCotizacion = (cotizacion) => {

        setCotizacionSelected(cotizacion);
        setOpenModalCancelarCotizacion(true);
    };

    const handleClickComentariosCotizacion = (cotizacion) => {
        setCotizacionSelected(cotizacion);
        setOpenModalComentariosCotizacion(true);
    };

    const handleClickLogCotizacion = (cotizacion) => {
        setCotizacionSelected(cotizacion);
        setOpenModalLogCotizacion(true);
    };

    const handleClickOpenArchivarCotizacion = (cotizacion) => {
        setCotizacionSelected(cotizacion);
        setOpenModalArchivarCotizacion(true);
    };

    const handleClickDescargarCotizacion = async (cotizacion) => {
        await setCotizacionSelected(cotizacion);
        btnDescargaCotizacion.current.click();
    };

    const changeStatusCotizacion = async (tipoCotizacionSelected) => {
        setChecked(false);

        switch (tipoCotizacionSelected) {
            case "Abiertas":
                await getCotizacionesAbiertas();
                break;
            case "En Revisión":
                await getCotizacionesEnRevision();
                break;
            case "Autorizadas":
                await getCotizacionesAutorizadas();
                break;
            case "Rechazadas":
                await getCotizacionesRechazadas();
                break;
            case "Canceladas":
                await getCotizacionesCanceladas();
                break;
            case "Archivadas":
                await getCotizacionesArchivadas();
                break;

            default:
                break;
        }

        setTipoCotizacion(tipoCotizacionSelected);
        setChecked(true);
    }

    const getCotizacionesAbiertas = async () => {
        const columns = [
            { title: 'Folio', field: 'folio', type: 'text' },
            { title: 'Cliente', field: 'cliente', type: 'text' },
            {
                title: 'Última Actualización', field: 'fechaActualizacion', type: 'date',
                render: (rowData) => { return moment(rowData.fechaActualizacion).locale('es').format('DD/MMM/yyyy HH:mm') },
                customFilterAndSearch: (term, rowData) => (rowData.fechaActualizacion).indexOf(term) !== -1
            },
            {
                title: 'Usuario Registro', field: 'usuario_registro', type: 'text', hidden: !isAdmin(),
                render: (rowData) => { return rowData.nombreUsuario + " " + rowData.apellidoUsuario },
                customFilterAndSearch: (term, rowData) => (rowData.nombreUsuario + ' ' + rowData.apellidoUsuario).toLowerCase().indexOf(term.toLowerCase()) !== -1
            },
            // { title: 'Estado', field: 'status', type: 'text' },
            // { title: 'Total Cotización', field: 'total_cotizacion', type: 'numeric' }
        ];

        let data = [];

        if (isAdmin()) {
            data = await CotizacionesServices.GetCotizacionesByStatus(1);
        }
        else {
            data = await CotizacionesServices.GetCotizacionesByUser(1, user.attributes.id);
        }

        data = data.data;
        console.log(data);

        const actions = [
            // {
            //     icon: 'add',
            //     tooltip: 'Nueva Cotización',
            //     isFreeAction: true,
            //     onClick: (event) => handleClickOpenNuevaCotizacion()
            // },
            {
                icon: 'edit',
                tooltip: 'Editar',
                onClick: (event, rowData) => handleClickOpenEditCotizacion(rowData)
            },
            rowData => ({
                icon: 'delete',
                tooltip: 'Cancelar',
                onClick: (event, rowData) => handleClickCancelarCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
            rowData => ({
                icon: 'done',
                tooltip: 'Enviar a revisión',
                onClick: (event, rowData) => handleClickOpenRevisionCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
            // rowData => ({
            //     icon: 'list',
            //     tooltip: 'Detalle',
            //     onClick: (event, rowData) => handleClickOpenDetalleCotizacion(rowData),
            //     disabled: rowData.birthYear < 2000
            // }),
            rowData => ({
                icon: 'search',
                tooltip: 'Log',
                onClick: (event, rowData) => handleClickLogCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
        ];

        setTableColumns(columns);
        setTableData(data);
        setTableActions(actions);
    }

    const getCotizacionesEnRevision = async () => {
        const columns = [
            { title: 'Folio', field: 'folio', type: 'text' },
            { title: 'Cliente', field: 'cliente', type: 'text' },
            {
                title: 'Última Actualización', field: 'fechaActualizacion', type: 'date',
                render: (rowData) => { return moment(rowData.fechaActualizacion).locale('es').format('DD/MMM/yyyy HH:mm') },
                customFilterAndSearch: (term, rowData) => (rowData.fechaActualizacion).indexOf(term) !== -1
            },
            {
                title: 'Usuario Registro', field: 'usuario_registro', type: 'text', hidden: !isAdmin(),
                render: (rowData) => { return rowData.nombreUsuario + " " + rowData.apellidoUsuario },
                customFilterAndSearch: (term, rowData) => (rowData.nombreUsuario + ' ' + rowData.apellidoUsuario).toLowerCase().indexOf(term.toLowerCase()) !== -1
            },
            // { title: 'Estado', field: 'status', type: 'text' },
            // { title: 'Total Cotización', field: 'total_cotizacion', type: 'numeric' }
        ];

        let data = [];

        if (isAdmin()) {
            data = await CotizacionesServices.GetCotizacionesByStatus(2);
        }
        else {
            data = await CotizacionesServices.GetCotizacionesByUser(2, user.attributes.id);
        }
        data = data.data;

        const actions = [
            rowData => ({
                icon: 'edit',
                tooltip: 'Editar',
                onClick: (event, rowData) => handleClickOpenEditCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
            // rowData => ({
            //     icon: 'list',
            //     tooltip: 'Detalle',
            //     onClick: (event, rowData) => handleClickOpenDetalleCotizacion(rowData),
            //     disabled: rowData.birthYear < 2000
            // }),
            rowData => ({
                icon: 'list',
                tooltip: 'Detalle Avanzado',
                onClick: (event, rowData) => handleClickOpenDetalleAvanzadoCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
            rowData => ({
                icon: 'done',
                tooltip: 'Autorizar',
                onClick: (event, rowData) => handleClickOpenAutorizarCotizacion(rowData),
                hidden: !isAdmin()
            }),
            rowData => ({
                icon: 'close',
                tooltip: 'Rechazar',
                onClick: (event, rowData) => handleClickOpenRechazarCotizacion(rowData),
                hidden: !isAdmin()
            }),
            rowData => ({
                icon: 'search',
                tooltip: 'Log',
                onClick: (event, rowData) => handleClickLogCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
        ];


        setTableColumns(columns);
        setTableData(data);
        setTableActions(actions);
    }

    const getCotizacionesAutorizadas = async () => {
        const columns = [
            { title: 'Folio', field: 'folio', type: 'text' },
            { title: 'Cliente', field: 'cliente', type: 'text' },
            {
                title: 'Última Actualización', field: 'fechaActualizacion', type: 'date',
                render: (rowData) => { return moment(rowData.fechaActualizacion).locale('es').format('DD/MMM/yyyy HH:mm') },
                customFilterAndSearch: (term, rowData) => (rowData.fechaActualizacion).indexOf(term) !== -1
            },
            {
                title: 'Usuario Registro', field: 'usuario_registro', type: 'text', hidden: !isAdmin(),
                render: (rowData) => { return rowData.nombreUsuario + " " + rowData.apellidoUsuario },
                customFilterAndSearch: (term, rowData) => (rowData.nombreUsuario + ' ' + rowData.apellidoUsuario).toLowerCase().indexOf(term.toLowerCase()) !== -1
            },
            // { title: 'Estado', field: 'status', type: 'text' },
            // { title: 'Total Cotización', field: 'total_cotizacion', type: 'numeric' }
        ];

        let data = [];

        if (isAdmin()) {
            data = await CotizacionesServices.GetCotizacionesByStatus(3);
        }
        else {
            data = await CotizacionesServices.GetCotizacionesByUser(3, user.attributes.id);
        }
        data = data.data;

        const actions = [
            rowData => ({
                icon: 'archive',
                tooltip: 'Archivar',
                onClick: (event, rowData) => handleClickOpenArchivarCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
            // rowData => ({
            //     icon: 'list',
            //     tooltip: 'Detalle',
            //     onClick: (event, rowData) => handleClickOpenDetalleCotizacion(rowData),
            //     disabled: rowData.birthYear < 2000
            // }),
            rowData => ({
                icon: 'download',
                tooltip: 'Descargar',
                onClick: (event, rowData) => handleClickDescargarCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
            rowData => ({
                icon: 'search',
                tooltip: 'Log',
                onClick: (event, rowData) => handleClickLogCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
        ];

        setTableColumns(columns);
        setTableData(data);
        setTableActions(actions);
    }

    const getCotizacionesRechazadas = async () => {
        const columns = [
            { title: 'Folio', field: 'folio', type: 'text' },
            { title: 'Cliente', field: 'cliente', type: 'text' },
            {
                title: 'Última Actualización', field: 'fechaActualizacion', type: 'date',
                render: (rowData) => { return moment(rowData.fechaActualizacion).locale('es').format('DD/MMM/yyyy HH:mm') },
                customFilterAndSearch: (term, rowData) => (rowData.fechaActualizacion).indexOf(term) !== -1
            },
            {
                title: 'Usuario Registro', field: 'usuario_registro', type: 'text', hidden: !isAdmin(),
                render: (rowData) => { return rowData.nombreUsuario + " " + rowData.apellidoUsuario },
                customFilterAndSearch: (term, rowData) => (rowData.nombreUsuario + ' ' + rowData.apellidoUsuario).toLowerCase().indexOf(term.toLowerCase()) !== -1
            },
            // { title: 'Estado', field: 'status', type: 'text' },
            // { title: 'Total Cotización', field: 'total_cotizacion', type: 'numeric' }
        ];

        let data = [];

        if (isAdmin()) {
            data = await CotizacionesServices.GetCotizacionesByStatus(4);
        }
        else {
            data = await CotizacionesServices.GetCotizacionesByUser(4, user.attributes.id);
        }
        data = data.data;

        const actions = [
            rowData => ({
                icon: 'edit',
                tooltip: 'Editar',
                onClick: (event, rowData) => handleClickOpenEditCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
            rowData => ({
                icon: 'cancel',
                tooltip: 'Cancelar',
                onClick: (event, rowData) => handleClickCancelarCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
            rowData => ({
                icon: 'done',
                tooltip: 'Enviar a revisión',
                onClick: (event, rowData) => handleClickOpenRevisionCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
            // rowData => ({
            //     icon: 'list',
            //     tooltip: 'Detalle',
            //     onClick: (event, rowData) => handleClickOpenDetalleCotizacion(rowData),
            //     disabled: rowData.birthYear < 2000
            // }),
            rowData => ({
                icon: 'comments',
                tooltip: 'Comentarios',
                onClick: (event, rowData) => handleClickComentariosCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
            rowData => ({
                icon: 'search',
                tooltip: 'Log',
                onClick: (event, rowData) => handleClickLogCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
        ];


        setTableColumns(columns);
        setTableData(data);
        setTableActions(actions);
    }

    const getCotizacionesCanceladas = async () => {
        const columns = [
            { title: 'Folio', field: 'folio', type: 'text' },
            { title: 'Cliente', field: 'cliente', type: 'text' },
            {
                title: 'Última Actualización', field: 'fechaActualizacion', type: 'date',
                render: (rowData) => { return moment(rowData.fechaActualizacion).locale('es').format('DD/MMM/yyyy HH:mm') },
                customFilterAndSearch: (term, rowData) => (rowData.fechaActualizacion).indexOf(term) !== -1
            },
            {
                title: 'Usuario Registro', field: 'usuario_registro', type: 'text', hidden: !isAdmin(),
                render: (rowData) => { return rowData.nombreUsuario + " " + rowData.apellidoUsuario },
                customFilterAndSearch: (term, rowData) => (rowData.nombreUsuario + ' ' + rowData.apellidoUsuario).toLowerCase().indexOf(term.toLowerCase()) !== -1
            },
            // { title: 'Estado', field: 'status', type: 'text' },
            // { title: 'Total Cotización', field: 'total_cotizacion', type: 'numeric' }
        ];

        let data = [];

        if (isAdmin()) {
            data = await CotizacionesServices.GetCotizacionesByStatus(5);
        }
        else {
            data = await CotizacionesServices.GetCotizacionesByUser(5, user.attributes.id);
        }
        data = data.data;

        const actions = [
            // rowData => ({
            //     icon: 'list',
            //     tooltip: 'Detalle',
            //     onClick: (event, rowData) => handleClickOpenDetalleCotizacion(rowData),
            //     disabled: rowData.birthYear < 2000
            // }),
            rowData => ({
                icon: 'comments',
                tooltip: 'Comentarios',
                onClick: (event, rowData) => handleClickComentariosCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
            rowData => ({
                icon: 'search',
                tooltip: 'Log',
                onClick: (event, rowData) => handleClickLogCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
        ];


        setTableColumns(columns);
        setTableData(data);
        setTableActions(actions);
    }

    const getCotizacionesArchivadas = async () => {
        const columns = [
            { title: 'Folio', field: 'folio', type: 'text' },
            { title: 'Cliente', field: 'cliente', type: 'text' },
            {
                title: 'Última Actualización', field: 'fechaActualizacion', type: 'date',
                render: (rowData) => { return moment(rowData.fechaActualizacion).locale('es').format('DD/MMM/yyyy HH:mm') },
                customFilterAndSearch: (term, rowData) => (rowData.fechaActualizacion).indexOf(term) !== -1
            },
            {
                title: 'Usuario Registro', field: 'usuario_registro', type: 'text', hidden: !isAdmin(),
                render: (rowData) => { return rowData.nombreUsuario + " " + rowData.apellidoUsuario },
                customFilterAndSearch: (term, rowData) => (rowData.nombreUsuario + ' ' + rowData.apellidoUsuario).toLowerCase().indexOf(term.toLowerCase()) !== -1
            },
            // { title: 'Estado', field: 'status', type: 'text' },
            // { title: 'Total Cotización', field: 'total_cotizacion', type: 'numeric' }
        ];

        let data = [];

        if (isAdmin()) {
            data = await CotizacionesServices.GetCotizacionesByStatus(6);
        }
        else {
            data = await CotizacionesServices.GetCotizacionesByUser(6, user.attributes.id);
        }
        data = data.data;

        const actions = [
            // {
            //     icon: 'save',
            //     tooltip: 'Clonar',
            //     onClick: (event, rowData) => alert("You saved " + rowData.folio)
            // },
            // rowData => ({
            //     icon: 'list',
            //     tooltip: 'Detalle',
            //     onClick: (event, rowData) => handleClickOpenDetalleCotizacion(rowData),
            //     disabled: rowData.birthYear < 2000
            // }),
            rowData => ({
                icon: 'search',
                tooltip: 'Log',
                onClick: (event, rowData) => handleClickLogCotizacion(rowData),
                disabled: rowData.birthYear < 2000
            }),
        ];


        setTableColumns(columns);
        setTableData(data);
        setTableActions(actions);
    }

    const btnDescargaCotizacion = React.useRef();

    return (
        <>
            <Styles>
                <ModalNuevaCotizacionComponent
                    openModal={openModalNuevaCotizacion}
                    handleClose={() => { setOpenModalNuevaCotizacion(false) }}
                    tableData={tableData}
                    setTableData={setTableData}
                    user={user}
                />
                <ModalEditCotizacionComponent
                    openModal={openModalEditCotizacion}
                    handleClose={() => { setOpenModalEditCotizacion(false) }}
                    tableData={tableData}
                    setTableData={setTableData}
                    cotizacionSelected={cotizacionSelected}
                    user={user}
                />
                <ModalDetalleCotizacionComponent
                    openModal={openModalDetalleCotizacion}
                    handleClose={() => { setOpenModalDetalleCotizacion(false) }}
                    tableData={tableData}
                    setTableData={setTableData}
                    cotizacionSelected={cotizacionSelected}
                    user={user}
                />
                <ModalDetalleAvanzadoCotizacionComponent
                    openModal={openModalDetalleAvanzadoCotizacion}
                    handleClose={() => { setOpenModalDetalleAvanzadoCotizacion(false) }}
                    tableData={tableData}
                    setTableData={setTableData}
                    cotizacionSelected={cotizacionSelected}
                    user={user}
                />
                <ModalAutorizarCotizacionComponent
                    openModal={openModalAutorizarCotizacion}
                    handleClose={() => { setOpenModalAutorizarCotizacion(false) }}
                    tableData={tableData}
                    setTableData={setTableData}
                    cotizacionSelected={cotizacionSelected}
                    user={user}
                />
                <ModalRechazarCotizacionComponent
                    openModal={openModalRechazarCotizacion}
                    handleClose={() => { setOpenModalRechazarCotizacion(false) }}
                    tableData={tableData}
                    setTableData={setTableData}
                    cotizacionSelected={cotizacionSelected}
                    user={user}
                />
                <ModalRevisionCotizacionComponent
                    openModal={openModalRevisionCotizacion}
                    handleClose={() => { setOpenModalRevisionCotizacion(false) }}
                    tableData={tableData}
                    setTableData={setTableData}
                    cotizacionSelected={cotizacionSelected}
                    user={user}
                />
                <ModalCancelarCotizacionComponent
                    openModal={openModalCancelarCotizacion}
                    handleClose={() => { setOpenModalCancelarCotizacion(false) }}
                    tableData={tableData}
                    setTableData={setTableData}
                    cotizacionSelected={cotizacionSelected}
                    user={user}
                />
                <ModalComentariosCotizacionComponent
                    openModal={openModalComentariosCotizacion}
                    handleClose={() => { setOpenModalComentariosCotizacion(false) }}
                    tableData={tableData}
                    setTableData={setTableData}
                    cotizacionSelected={cotizacionSelected}
                    user={user}
                />
                <ModalLogCotizacionComponent
                    openModal={openModalLogCotizacion}
                    handleClose={() => { setOpenModalLogCotizacion(false) }}
                    tableData={tableData}
                    setTableData={setTableData}
                    cotizacionSelected={cotizacionSelected}
                    user={user}
                />
                <ModalArchivarCotizacionComponent
                    openModal={openModalArchivarCotizacion}
                    handleClose={() => { setOpenModalArchivarCotizacion(false) }}
                    tableData={tableData}
                    setTableData={setTableData}
                    cotizacionSelected={cotizacionSelected}
                    user={user}
                />

                <Grid container spacing={4} className="contentPage">
                    <Grid item xs={12} md={2}>
                        <div className="contentForm">
                            <Grid container spacing={1}>
                                <DocumentComponent
                                    btnRef={btnDescargaCotizacion}
                                    cotizacionSelected={cotizacionSelected}
                                />

                                <Grid item xs={12} md={12}>

                                    <IndicadorCotizacionesComponent
                                        title="Abiertas"
                                        number="20"
                                        // pendientes="5"
                                        color=""
                                        onClick={changeStatusCotizacion}
                                    />

                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <IndicadorCotizacionesComponent
                                        title="En Revisión"
                                        number="5"
                                        // pendientes="3"
                                        color="blue"
                                        onClick={changeStatusCotizacion}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <IndicadorCotizacionesComponent
                                        title="Autorizadas"
                                        number="8"
                                        // pendientes="1"
                                        color="green"
                                        onClick={changeStatusCotizacion}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <IndicadorCotizacionesComponent
                                        title="Rechazadas"
                                        number="2"
                                        color="orange"
                                        onClick={changeStatusCotizacion}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <IndicadorCotizacionesComponent
                                        title="Canceladas"
                                        number="0"
                                        color="red"
                                        onClick={changeStatusCotizacion}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <IndicadorCotizacionesComponent
                                        title="Archivadas"
                                        number="156"
                                        color="gray"
                                        onClick={changeStatusCotizacion}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <Fade in={checked}>

                            <div className="contentForm">
                                <TablaCotizacionesComponent
                                    title={tipoCotizacion}
                                    columns={tableColumns}
                                    data={tableData}
                                    actions={tableActions}
                                    handleClickOpenNuevaCotizacion={handleClickOpenNuevaCotizacion}
                                />
                            </div>

                        </Fade>
                    </Grid>
                </Grid>
            </Styles>
        </>
    )
}

export default CotizacionesPage;