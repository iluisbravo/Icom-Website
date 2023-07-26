import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import FormStepMargen from './DetalleAvanzado/FormStepMargen';
import FormStepEstructura from './DetalleAvanzado/FormStepEstructura';
import FormStepPuente from './DetalleAvanzado/FormStepPuente';
import FormStepOtros from './DetalleAvanzado/FormStepOtros';
import FormStepInstalacion from './DetalleAvanzado/FormStepInstalacion';
import FormStepDatosCliente from './DetalleAvanzado/FormStepDatosCliente';
import CotizacionesServices from '../services/CotizacionesServices';
import { store } from 'react-notifications-component';
import FormStepDatosGenerales from './DetalleAvanzado/FormStepDatosGenerales';
import Formatos from '../utils/Formatos';

const Styles = styled.div`
    #vertical-tabpanel-0{
        width: 100%;
    }

    @media (min-width: 600px){
        .MuiTab-root {
        min-width: auto; 
     }
    }

    .inputLabel{
        margin:0px 10px 20px 0px;       
        min-width: 200px;
    }

    .formBorder{
        border: 1px solid gray;
        border-radius: 10px;
        padding: 15px 25px 25px 25px;
    }

    .totalContainer{
        color: #fff;
        background-color: #f05522;
        opacity: 1 !important;
        margin: 10px
    }
    

`;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (

        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>


    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 'auto',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tabsContent: {
        width: '100%'
    }
}));

export default function VerticalTabs(props) {
    const classes = useStyles();
    const [value, setStepValue] = React.useState(0);
    const user = props.user;
    const cotizacionSelected = props.cotizacionSelected;
    const [cotizacion, setCotizacion] = useState();
    const [totalCotizacion, setTotalCotizacion] = useState(0);
    const [monedaCotizacion, setMonedaCotizacion] = useState("MXN");
    const cancelFunction = props.cancelFunction;

    useEffect(() => {
        getDetalleCotizacionById();
    }, [cotizacionSelected]);

    useEffect(() => {

        if (cotizacion)
            getTotalCotizacionById(cotizacion);

    }, [cotizacion]);



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
        
        const resultLog = await CotizacionesServices.GetCotizacionById(cotizacionSelected.id);

        if (resultLog.status === 200) {
            const detalleCotizacionByID = resultLog.data;
            console.log(detalleCotizacionByID, "Detalle COTIZACION");
            detalleCotizacionByID.encabezado.moneda = "MXN";
            setCotizacion(detalleCotizacionByID);
        }
        else {
            showAlert("Error", resultLog.message || resultLog.detail, "danger");
            cancelFunction();
        }
    }

    const getTotalCotizacionById = async (cotizacion) => {
        
        const resultLog = await CotizacionesServices.GetTotalCotizacionById(cotizacionSelected.id);

        if (resultLog.status === 200) {
            const totalCotizacionByID = resultLog.data;

            const totalByMoneda = cotizacion.encabezado.moneda === "MXN" ? totalCotizacionByID.pesos.total : totalCotizacionByID.dolares.total;

            console.log(totalByMoneda, "Total COTIZACION");
            setTotalCotizacion(Formatos.GetFormatoMoneda(totalByMoneda));
        }
        else {
            showAlert("Error", resultLog.message, "danger");
        }
    }

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

    const handleChange = (event, newValue) => {
        setStepValue(newValue);
    };

    const nextStep = (currentStep) => {
        // if (currentStep !== 5 && (currentStep !== 2 && isAdmin() === false)) {
        setStepValue(currentStep + 1);
        // }
        // else {
        //     setStepValue(0);
        // }
    }

    const backStep = (currentStep) => {
        setStepValue(currentStep !== 0 ? currentStep - 1 : 0);
    }

    const getModalBody = () => {
        let body;

        if (isAdmin() === true) {
            body = <>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Cliente" {...a11yProps(0)} />
                    <Tab label="Datos Generales" {...a11yProps(1)} />
                    <Tab label="Estructura" {...a11yProps(2)} />
                    <Tab label="Equipamiento Puente" {...a11yProps(3)} />
                    <Tab label="Otros" {...a11yProps(4)} />
                    <Tab label="Instalación" {...a11yProps(5)} />
                    <Tab label="Margen" {...a11yProps(6)} />
                    <Tab className='totalContainer' label={totalCotizacion + " " + cotizacion.encabezado.moneda} disabled>

                    </Tab>

                </Tabs>
                <TabPanel value={value} index={0} className={classes.tabsContent}>
                    <FormStepDatosCliente
                        user={user}
                        isAdmin={isAdmin}
                        nextStep={() => nextStep(value)}
                        backStep={() => backStep(value)}
                        value={value}
                        cotizacion={cotizacion}
                        setCotizacion={setCotizacion}
                    />
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.tabsContent}>
                    <FormStepDatosGenerales
                        user={user}
                        isAdmin={isAdmin}
                        nextStep={() => nextStep(value)}
                        backStep={() => backStep(value)}
                        value={value}
                        cotizacion={cotizacion}
                        setCotizacion={setCotizacion}
                    />
                </TabPanel>
                <TabPanel value={value} index={2} className={classes.tabsContent}>
                    <FormStepEstructura
                        user={user}
                        isAdmin={isAdmin}
                        nextStep={() => nextStep(value)}
                        backStep={() => backStep(value)}
                        value={value}
                        cotizacion={cotizacion}
                        setCotizacion={setCotizacion}
                    />
                </TabPanel>
                <TabPanel value={value} index={3} className={classes.tabsContent}>
                    <FormStepPuente
                        user={user}
                        isAdmin={isAdmin}
                        nextStep={() => nextStep(value)}
                        backStep={() => backStep(value)}
                        value={value}
                        cotizacion={cotizacion}
                        setCotizacion={setCotizacion}
                    />
                </TabPanel>
                <TabPanel value={value} index={4} className={classes.tabsContent}>
                    <FormStepOtros
                        user={user}
                        isAdmin={isAdmin}
                        nextStep={() => nextStep(value)}
                        backStep={() => backStep(value)}
                        value={value}
                        cotizacion={cotizacion}
                        setCotizacion={setCotizacion}
                    />
                </TabPanel>
                <TabPanel value={value} index={5} className={classes.tabsContent}>
                    <FormStepInstalacion
                        user={user}
                        isAdmin={isAdmin}
                        nextStep={() => nextStep(value)}
                        backStep={() => backStep(value)}
                        value={value}
                        cotizacion={cotizacion}
                        setCotizacion={setCotizacion}
                    />
                </TabPanel>
                <TabPanel value={value} index={6} className={classes.tabsContent}>
                    <FormStepMargen
                        user={user}
                        isAdmin={isAdmin}
                        nextStep={() => nextStep(value)}
                        backStep={() => backStep(value)}
                        value={value}
                        cotizacion={cotizacion}
                        setCotizacion={setCotizacion}
                        cancelFunction={cancelFunction}
                    />
                </TabPanel>
            </>
        }
        else {
            body = <>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Cliente" {...a11yProps(0)} />
                    <Tab label="Datos Generales" {...a11yProps(1)} />
                    <Tab label="Estructura" {...a11yProps(2)} />
                    <Tab label="Equipamiento Puente" {...a11yProps(3)} />
                    <Tab className='totalContainer' label={totalCotizacion + " " + cotizacion.encabezado.moneda} disabled>

                    </Tab>
                </Tabs>
                <TabPanel value={value} index={0} className={classes.tabsContent}>
                    <FormStepDatosCliente
                        user={user}
                        isAdmin={isAdmin}
                        nextStep={() => nextStep(value)}
                        backStep={() => backStep(value)}
                        value={value}
                        cotizacion={cotizacion}
                        setCotizacion={setCotizacion}
                    />
                </TabPanel>
                <TabPanel value={value} index={1} className={classes.tabsContent}>
                    <FormStepDatosGenerales
                        user={user}
                        isAdmin={isAdmin}
                        nextStep={() => nextStep(value)}
                        backStep={() => backStep(value)}
                        value={value}
                        cotizacion={cotizacion}
                        setCotizacion={setCotizacion}
                    />
                </TabPanel>
                <TabPanel value={value} index={2} className={classes.tabsContent}>
                    <FormStepEstructura
                        user={user}
                        isAdmin={isAdmin}
                        nextStep={() => nextStep(value)}
                        backStep={() => backStep(value)}
                        value={value}
                        cotizacion={cotizacion}
                        setCotizacion={setCotizacion}
                    />
                </TabPanel>
                <TabPanel value={value} index={3} className={classes.tabsContent}>
                    <FormStepPuente
                        user={user}
                        isAdmin={isAdmin}
                        nextStep={() => nextStep(value)}
                        backStep={() => backStep(value)}
                        value={value}
                        cotizacion={cotizacion}
                        setCotizacion={setCotizacion}
                    />
                </TabPanel>

            </>
        }

        return body;
    }

    return (
        <Styles>
            <div className={classes.root}>
                {cotizacion && getModalBody()}
            </div>
        </Styles>
    );
}
