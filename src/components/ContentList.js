import { Container, List, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Content from "./Content";
import '../css/main.css';
import PwsContext from "./PWS-Context";

function ContentList() {
    const { managementId, setManagementId } = useContext(PwsContext);
    console.log('ContentList start');
    const [contents, setContents] = useState([
                    {columnName:"자산관리번호", data:"", req:"y"}, {columnName:"사용구분", data:"사용", req:"y"}, {columnName:"회사", data:"", req:"y"}, 
                    {columnName:"본부", data:"", req:"n"}, {columnName:"센터", data:"", req:"y"}, {columnName:"관리부서", data:"", req:"y"}, 
                    {columnName:"사용자", data:"", req:"y"},{columnName:"사용자ID", data:"", req:"y"}, {columnName:"코스트센터CD", data:"", req:"y"}, 
                    {columnName:"모델명", data:"", req:"y"},{columnName:"자산번호", data:"", req:"y"}, {columnName:"S/N", data:"", req:"y"},
                    {columnName:"그래픽카드", data:"", req:"n"}, {columnName:"모니터", data:"", req:"y"}, {columnName:"지역", data:"", req:"y"},
                    {columnName:"건물명", data:"", req:"y"}, {columnName:"층수", data:"", req:"y"}, {columnName:"상세위치", data:"", req:"n"},                         
                    {columnName:"구매용도", data:"", req:"y"}, {columnName:"사용용도", data:"", req:"y"}, {columnName:"도입년월", data:"", req:"y"},
                    {columnName:"비고", data:"", req:"n"}, {columnName:"상세업무", data:"", req:"n"}]);

        
    // 자산관리번호 update 함수
    const modifyContents = () => {
        let copyContents = [...contents];
        for(let i=0; i<copyContents.length; i++) {
            if(copyContents[i].columnName == '자산관리번호') {
                copyContents[i].data = managementId;
                console.log('pk : ', copyContents[i].data);
                break;
            }
        }
        setContents(copyContents);
    }

    // 각 입력 항목 update 함수
    const update = item => {
        let copyContents = [...contents];
        for(let i=0; i<copyContents.length; i++) {
            if(copyContents[i].columnName == item.columnName) {
                copyContents[i].data = item.data;
                break;
            }
        }
        setContents(copyContents);
        console.log(contents);
    };

    // PWS 정보 
    const items = contents.map(item =>
        <Content key={item.columnName} item={item} update={update}/>);
    
    // 자산관리번호 스캔 발생하면 자산관리번호 update 함수 호출하고 재랜더링
    useEffect(() => {
        console.log("update : ", managementId);
        modifyContents();
    },[managementId]);

    return(
        <div className="wrapper" style={{border:'solid 1px', display:'flex', justifyContent:'flex-end'}}>                
                <Paper sx={{
                  
                  width: 420,
                //   backgroundColor: (theme) =>
                //     theme.palette.mode === 'dark' ? '#1A2027' : '#ff3',
                }}>
                    <List>
                        {items}
                        {/* <Content key={contents[0].column} item={contents[0]} />
                        <Content key={contents[1].column} item={contents[1]} />
                        <Content key={contents[2].column} item={contents[2]} />
                        <Content key={contents[3].column} item={contents[3]} />
                        <Content key={contents[4].column} item={contents[4]} />
                        <Content key={contents[5].column} item={contents[5]} />
                        <Content key={contents[6].column} item={contents[6]} />
                        <Content key={contents[7].column} item={contents[7]} />
                        <Content key={contents[8].column} item={contents[8]} />
                        <Content key={contents[9].column} item={contents[9]} />
                        <Content key={contents[10].column} item={contents[10]} />
                        <Content key={contents[11].column} item={contents[11]} />
                        <Content key={contents[12].column} item={contents[12]} />
                        <Content key={contents[13].column} item={contents[13]} />
                        <Content key={contents[14].column} item={contents[14]} />
                        <Content key={contents[15].column} item={contents[15]} />
                        <Content key={contents[16].column} item={contents[16]} />
                        <Content key={contents[17].column} item={contents[17]} />
                        <Content key={contents[18].column} item={contents[18]} />
                        <Content key={contents[19].column} item={contents[19]} />
                        <Content key={contents[20].column} item={contents[20]} />
                        <Content key={contents[21].column} item={contents[21]} />
                        <Content key={contents[22].column} item={contents[22]} /> */}
                    </List>
                </Paper>
        </div>
    );
}

export default ContentList;