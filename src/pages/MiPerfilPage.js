import { Grid, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Account from '../components/AccountContext';
import FormMiContraseñaComponent from '../components/FormMiContraseñaComponent';
import FormMiPerfilComponent from '../components/FormMiPerfilComponent';

const Styles = styled.div` 
    .text-rigth{
        text-align: right !important;
    }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        // '& .MuiTextField-root': {
        //     margin: theme.spacing(1),
        //     width: '25ch',
        // },

        // '& button': {
        //     margin: theme.spacing(1)
        // },
    },
    bootonMargin: {
        marginRight: theme.spacing(2)
    }
}));

const MiPerfilPage = (props) => {

    const auth = props.auth;
    const userAuth = auth.user;

    useEffect(() => {

    }, []);

    return (
        <>
            <Styles>
                <Grid container spacing={4} className="contentPage">
                    <Grid item xs={12} md={6}>
                        <div className="contentForm">
                            <FormMiPerfilComponent auth={auth} />
                        </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <div className="contentForm">
                            <FormMiContraseñaComponent auth={auth} />
                        </div>
                    </Grid>
                </Grid>
            </Styles>
        </>
    )
}

export default MiPerfilPage;