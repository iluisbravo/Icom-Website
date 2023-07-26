import { Grid } from '@material-ui/core';
import styled from 'styled-components';
const Styles = styled.div` 
    

`;

const HomePage = () => {

    return (
        <>
            <Styles>
                <Grid container spacing={4} className="contentPage">
                    <Grid item xs={12} md={3}>
                        <div className="contentForm">
                            <h4 className="orange">Home Page</h4>
                        </div>
                    </Grid>
                </Grid>
            </Styles>
        </>
    )
}

export default HomePage;