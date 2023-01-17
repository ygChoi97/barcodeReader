import { Grid, ListItem, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react";

function Content({item}) {
    const theme = createTheme({
        typography: {
          // In Chinese and Japanese the characters are usually larger,
          // so a smaller fontsize may be appropriate.
          fontSize: 7,
          
        },
      });

    console.log(item.req);

    return(
        <ListItem sx={{
            height: 32}}
            >
            
            <Grid container spacing={1} alignItems="center">
                <ThemeProvider theme={theme}>
                    <Grid xs={4}>            
                        <Typography>
                            {item.column}
                        </Typography>        
                    </Grid>
                    <Grid  xs={8}>
                        {item.req == 'y' ?  
                        <TextField
                            // placeholder={item.value}
                            fullWidth
                            requierd
                            id="filled-required"
                            label="Required"
                            // defaultValue="Hello World"
                            size="small"
                        /> 
                        : <TextField
                        //placeholder={item.value}
                        fullWidth
                        id="standard-basic"
                        label="Standard"
                        //defaultValue="Hello World"
                        size="small"
                    /> }
                    </Grid>
                </ThemeProvider> 
            </Grid>
           
        </ListItem>
    );
}

export default Content;