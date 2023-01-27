import { Button, Grid, ListItem, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";

function Content({item, update}) {

    
    const [value, setValue] = useState((item.dbColumn == 'introductiondate' && item.data != '') ? new Date(item.data) : null);
    if(item.dbColumn == 'introductiondate' && item.data != null){
        //console.log(dayjs(item.data).format("YYYY-MM-DD"));
        //console.log('date : ' ,dayjs(item.data).format("YYYY-MM-DD").getMonth());
        //console.log(new Date(item.data));
        
    }
    
    
    
    const theme = createTheme({
        typography: {
          // In Chinese and Japanese the characters are usually larger,
          // so a smaller fontsize may be appropriate.
          fontSize: 8,
          
        },
    });
    
    const handleChangeInput = (e) => {
        console.log(e.target);
        // const copyItem = item;
        // copyItem.data = e.target.value;
        item.data = e.target.value;
        update(item);
    };

    console.log('content 리렌더링 ', value);
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
                        item.dbColumn == 'idasset' ?  
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
                        item.dbColumn == 'introductiondate' ?
                        // <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                        // <TextField
                        //     requierd='true'
                        //     id="standard-read-only-input"
                        //     InputProps={{
                        //         readOnly: true,
                        //       }}
                        //     defaultValue=''
                        //     value = {item.data}
                        //     size="small"
                        // /> <Button variant="contained" color="secondary">날짜</Button> 
                        // </div>:
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={value}  inputFormat={"YYYY-MM-DD"}
           onChange={(newValue) => {
                                setValue(newValue);
                                console.log(newValue);
                                //item.data = newValue;
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider> :
                        <TextField
                            fullWidth
                            requierd='true'
                            id="outlined-required"
                            //label={item.columnName}
                            defaultValue=''
                            value = {item.data}
                            onChange={handleChangeInput}
                            size="small"
                        /> 
                        : <TextField
                        //placeholder={item.value}
                        fullWidth
                        id="standard-basic"
                        //label={item.columnName}
                        defaultValue=''
                        value = {item.data}
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