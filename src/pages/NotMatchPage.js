import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Grid, Link } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Account from '../components/AccountContext';



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },

        '& button': {
            margin: theme.spacing(1)
        },
    },
}));


const Styles = styled.div` 
    form {   
        width: 270px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        /* background-color: gray; */
        border: 1px solid gray;
        padding: 20px;
        border-radius: 5px;
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
`;

const LogIn = (props) => {

    const history = useHistory();
    const auth = props.auth;


    return (
        <>
            <Styles>
                {
                    (!auth.isAuthenticated) && (
                        <form>
                            <div className="text-center">
                                <Grid container spacing={4}>
                                    <Grid item md={12} xs={12}>
                                        <h4 className="orange">No se encontro la pagina...</h4>
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    )

                }
                {
                    (auth.isAuthenticated) && (
                        history.push("/Cotizaciones")
                    )
                }
            </Styles>
        </>
    )
}

export default LogIn;