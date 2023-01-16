import { Grid, ListItem, TextField, Typography } from "@mui/material";
import React from "react";

function Content({item}) {
    console.log(item.column);
    return(
        <ListItem>
            <Grid container spacing={1} alignItems="center">
                <Grid xs={3} md={5} >
                    <Typography>
                        {item.column}
                    </Typography>
                </Grid>
                <Grid  xs={9} md={7}>
                    <TextField
                        placeholder={item.value}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default Content;