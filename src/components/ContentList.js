import { Container, List, Paper } from "@mui/material";
import React, { useState } from "react";
import Content from "./Content";
import '../css/main.css';

function ContentList() {
    
    console.log('ContentList start');
    //const [contents, setContents] = useState([]);
    const contents = [];

    for(let i=0; i<13; i++) {
        let col = {column:'', value:''};
        col.column = 'column ' + i;
        col.value = 'value information ' + i;
        contents.push(col);
    }

    console.log(contents);
    const items = contents.map(item =>
        <Content key={item.column} item={item} />);
    
    return(
        <div className="wrapper">
            {/* <Container maxWidth="md" style={{marginTop: 100}}> */}
            <Container fixed style={{marginTop: 16}}>
                <Paper style={{margin: 16}}>
                    <List>
                        {items}
                    </List>
                </Paper>
            </Container>
        </div>
    );
}

export default ContentList;