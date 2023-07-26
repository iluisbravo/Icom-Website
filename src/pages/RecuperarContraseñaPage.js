import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { Grid } from '@material-ui/core';
import Account from '../components/AccountContext';

import FormRecuperarContraseñaComponent from '../components/FormRecuperarContraseñaComponent';
import FormVerificacionCodigoContraseñaComponent from '../components/FormVerificacionCodigoContraseñaComponent';

const Styles = styled.div` 
    .form {   
        padding:0px !important;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px !important;
    }

    .text-rigth{
        text-align: right !important;
    }

    .text-small{
        font-size: small;
    }

    .text-small:hover{
        cursor:pointer;
    }

    .imgSection{
        /* background-image: url("https://images.unsplash.com/photo-1620656596956-193d23950929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1270&q=80"); */
        background-image: url("./img/IcomGrua.png");
        background-position: left;
        background-size: cover;
        height    : 100% ;
        border-top-right-radius: 10px !important;
        border-bottom-right-radius: 10px !important;
    }

    .formPadding{
        padding: 30px ;
        padding-bottom: 45px;
    }

    .imgLogoIcom{
        height: 18vh;
        /* border: 1px solid; */
        padding: 15px;
        margin: 15px;
        /* border-radius: 100px;
        box-shadow: rgb(99 99 99 / 50%) 0px 2px 8px 0px; */

        border: 4px solid gray;
        padding: 2px;
        border-radius: 50%;
        border-top-color: #f05522;
        border-left-color: #f05522;
    }
`;

const RecuperarContraseña = (props) => {

    const history = useHistory();
    const auth = props.auth;

    const [stage, setStage] = React.useState(1);
    const [correo, setCorreo] = React.useState(null);

    return (
        <>
            <Styles>
                {
                    (auth.isAuthenticated) && (
                        history.push("/Cotizaciones")
                    )
                }


                <div className="contentForm form">
                    <div className="text-center">

                        <Grid container spacing={0}>
                            <Grid item md={6} xs={12}>
                                <Grid container className="formPadding" spacing={2}>
                                    <Grid item md={12} xs={12}>
                                        <img className="imgLogoIcom" src='https://www.industrialcom.com.mx/wp-content/uploads/2020/07/cropped-icom-1-192x192.png' alt="logo.img" />
                                    </Grid>
                                    {/* <Grid item md={12} xs={12}>
                                        <h4 className="orange">Recuperar Contraseña</h4>
                                    </Grid>
                                    <Grid item md={12} xs={12}>
                                        <h6 className="gray">Sistema de Cotizaciones</h6>
                                    </Grid> */}
                                    <Grid item md={1} xs={12}>

                                    </Grid>
                                    <Grid item md={10} xs={12}>
                                        {stage === 1 &&
                                            <FormRecuperarContraseñaComponent setStage={setStage} setCorreo={setCorreo} />
                                        }

                                        {stage === 2 &&
                                            <FormVerificacionCodigoContraseñaComponent setStage={setStage} correo={correo} />
                                        }
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div className="imgSection">

                                </div>
                                {/* <img src={image} alt="Icom.img" height="350" /> */}
                            </Grid>
                        </Grid>


                    </div>
                </div>






            </Styles>
        </>
    )
}

export default RecuperarContraseña;