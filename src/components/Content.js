import { Grid, ListItem, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from "react";

function Content({item, update}) {
    const theme = createTheme({
        typography: {
          // In Chinese and Japanese the characters are usually larger,
          // so a smaller fontsize may be appropriate.
          fontSize: 7,
          
        },
    });
    const [dataState, setDataState] = useState(item.data);
    
    const handleChangeInput = (e) => {
        setDataState(e.target.value);
        console.log(e.target);
        const copyItem = item;
        copyItem.data = e.target.value;
        
        update(item);
    };
    // useEffect(()=>{
    //     setDataState(item.columnName);
    //     setItemState()
    // },[data]);
    return(
        <ListItem 
        sx={{
            height: 39}}
            >
            
            <Grid container spacing={1} alignItems="center">
                <ThemeProvider theme={theme}>
                    <Grid xs={4}>            
                        <Typography>
                            {item.columnName}
                        </Typography>        
                    </Grid>
                    <Grid  xs={8}>
                        {item.req == 'y' ?
                        item.columnName == '자산관리번호' ?  
                        <TextField
                            // placeholder={item.value}
                            fullWidth
                            id="standard-read-only-input"
                            label={item.columnName}
                            InputProps={{
                                readOnly: true,
                              }}
                            defaultValue={''}
                            variant = "standard"
                            value = {item.data}
                            size="small"
                            color="secondary"
                            focused
                        /> :
                        <TextField
                            fullWidth
                            requierd='true'
                            id="outlined-required"
                            label={item.columnName}
                            defaultValue=''
                            value = {dataState}
                            onChange={handleChangeInput}
                            size="small"
                        /> 
                        : <TextField
                        //placeholder={item.value}
                        fullWidth
                        id="standard-basic"
                        label={item.columnName}
                        defaultValue=''
                        value = {dataState}
                        onChange={handleChangeInput}
                        size="small"
                    /> }
                    </Grid>
                </ThemeProvider> 
            </Grid>
        </ListItem>
    );
}

export default Content;