import { Grid, ListItem, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect, useState } from "react";

function Content({item, update}) {

    
    const [value, setValue] = useState(null);
    
    useEffect(()=> {
        if(item.dbColumn === 'introductiondate' && item.data != null) {
            
            setValue(new Date(item.data));
        }
        else if(item.dbColumn === 'introductiondate' && (item.data === null || item.data === '')) {
            setValue(null);
        }
    },[item.data]);
    
    
    
    const theme = createTheme({
        typography: {
            fontFamily: [
              '-apple-system',
              'BlinkMacSystemFont',
              '"Segoe UI"',
              'Roboto',
              '"Helvetica Neue"',
              'Arial',
              'sans-serif',
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
            ].join(','),
          },
        // palette: {
        //     primary: {
        //       main: purple[500],
        //     },
        //     secondary: {
        //       main: blueGrey[400],
        //     },
        //   },

    });
    
    const handleChangeInput = (e) => {
        console.log(e.target);
        // const copyItem = item;
        // copyItem.data = e.target.value;
        item.data = e.target.value;
        update(item);
    };
    
    console.log(`${item.dbColumn} ${value} 리렌더링`);
    const color = "#399939";
    
    return(
        <ListItem 
        sx={{
            height: 32}}
            >
            
            <Grid container spacing={1} alignItems="center">
                <ThemeProvider theme={theme}>
                    <Grid item xs={3}>            
                        <Typography 
                            sx = {{fontSize: '0.7rem', fontWeight:600}}
                        >
                            {item.columnName}
                        </Typography>        
                    </Grid>
                    <Grid item xs={9}>
                        {item.req === 'y' ?
                        item.dbColumn === 'idasset' ?  
                        <TextField
                            // placeholder={item.value}
                            fullWidth
                            id="standard-read-only-input"
                            label={item.columnName}
                            InputProps={{
                                readOnly: true,
                                style: { height: '1rem', fontSize:'0.9rem', fontWeight: 600 }
                              }}
                            defaultValue={''}
                            variant = "standard"
                            value = {item.data}
                            size="small"
                            color="secondary"
                            focused
                        /> : 
                        item.dbColumn === 'introductiondate' ?
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker value={value}  inputFormat={"YYYY-MM-DD"} showToolbar                            
                            onChange={(newValue) => {
                                setValue(newValue);
                                                                
                                if(newValue != null) {
                                    item.data = newValue.format("YYYY-MM-DD");
                                    update(item);
                                    console.log(newValue);
                                }
                                else
                                    item.data = null;
                            }}
                            renderInput={(params) => <TextField size="small" {...params} 
                            sx={{
                                width: 1,
                                "& .MuiInputBase-root": {
                                    height: '1.6rem', fontSize: '0.7rem'
                                }
                            }}
                              />}
                            />
                          </LocalizationProvider> :
                        <TextField
                            fullWidth
                            requierd='true'
                            id="outlined-required"
                            //label={item.columnName}
                            inputProps={{style: {height: 9, fontSize:'1rem', fontWeight: 400}}}
                            defaultValue=''
                            value = {item.data}
                            onChange={handleChangeInput}
                            size="small"
                        /> 
                        : <TextField
                        //placeholder={item.value}
                        fullWidth
                        id="standard-basic"
                        inputProps={{style: {height: 9, fontSize:'0.7rem', fontWeight: 400}}}
                        //label={item.columnName}
                        defaultValue=''
                        value = {item.data}
                        onChange={handleChangeInput}                        
                        sx={{
                            width: 1,
                            "& .MuiInputBase-root": {
                                height: '1.6rem'
                            }
                        }}
                    /> }
                    </Grid>
                </ThemeProvider> 
            </Grid>
        </ListItem>
    );
}

export default Content;