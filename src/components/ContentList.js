import { Container, List, Paper } from "@mui/material";
import React, { useState } from "react";
import Content from "./Content";
import '../css/main.css';

function ContentList() {
    
    console.log('ContentList start');
    //const [contents, setContents] = useState([]);
    const contents = [{column:"사용구분", value:"", req:"y"}, {column:"회사", value:"", req:"y"}, {column:"본부", value:"", req:"n"},
                    {column:"센터", value:"", req:"y"}, {column:"관리부서", value:"", req:"y"}, {column:"사용자", value:"", req:"y"},
                    {column:"사용자ID", value:"", req:"y"}, {column:"코스트센터CD", value:"", req:"y"}, {column:"모델명", value:"", req:"y"},
                    {column:"자산번호", value:"", req:"y"}, {column:"자산관리번호", value:"", req:"y"}, {column:"S/N", value:"", req:"y"},
                    {column:"그래픽카드", value:"", req:"n"}, {column:"모니터", value:"", req:"y"}, {column:"지역", value:"", req:"y"},
                    {column:"건물명", value:"", req:"y"}, {column:"층수", value:"", req:"y"}, {column:"상세위치", value:"", req:"n"},                         
                    {column:"구매용도", value:"", req:"y"}, {column:"사용용도", value:"", req:"y"}, {column:"도입년월", value:"", req:"y"},
                    {column:"비고", value:"", req:"n"}, {column:"상세업무", value:"", req:"n"}];

    // for(let i=0; i<13; i++) {
    //     let col = {column:'', value:''};
    //     col.column = 'column ' + i;
    //     col.value = 'value information ' + i;
    //     contents.push(col);
    // }

    console.log(contents);
    const items = contents.map(item =>
        <Content key={item.column} item={item} />);
    
    return(
        <div className="wrapper" style={{border:'solid 1px', display:'flex', justifyContent:'flex-end'}}>
        
    
                <Paper sx={{
                  
                  width: 420,
                //   backgroundColor: (theme) =>
                //     theme.palette.mode === 'dark' ? '#1A2027' : '#ff3',
                }}>
                    <List>
                        {items}
                    </List>
                </Paper>
        </div>
        
    );
}

export default ContentList;