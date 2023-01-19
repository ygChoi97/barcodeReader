import { Container, List, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Content from "./Content";
import '../css/main.css';
import PwsContext from "./PWS-Context";

const BASE_URL = 'http://localhost:8181/api/pws';

function ContentList() {
    const { managementId, setManagementId } = useContext(PwsContext);
    console.log('ContentList start');
    
    // PWS UI정보
    const [contents, setContents] = useState([
                    {columnName:"자산관리번호", dbColumn:"idasset", data:"", req:"y"}, {columnName:"사용구분", dbColumn:"uptake", data:"", req:"y"}, {columnName:"회사", dbColumn:"company", data:"", req:"y"}, 
                    {columnName:"본부", dbColumn:"headquarters", data:"", req:"n"}, {columnName:"센터", dbColumn:"center", data:"", req:"y"}, {columnName:"관리부서", dbColumn:"department", data:"", req:"y"}, 
                    {columnName:"사용자", dbColumn:"username", data:"", req:"y"},{columnName:"사용자ID", dbColumn:"userid", data:"", req:"y"}, {columnName:"코스트센터CD", dbColumn:"centercd", data:"", req:"y"}, 
                    {columnName:"모델명", dbColumn:"model", data:"", req:"y"},{columnName:"자산번호", dbColumn:"assetno", data:"", req:"y"}, {columnName:"S/N", dbColumn:"sn", data:"", req:"y"},
                    {columnName:"그래픽카드", dbColumn:"graphic", data:"", req:"n"}, {columnName:"모니터", dbColumn:"monitor", data:"", req:"y"}, {columnName:"지역", dbColumn:"area", data:"", req:"y"},
                    {columnName:"건물명", dbColumn:"building", data:"", req:"y"}, {columnName:"층수", dbColumn:"storey", data:"", req:"y"}, {columnName:"상세위치", dbColumn:"location", data:"", req:"n"},                         
                    {columnName:"구매용도", dbColumn:"objpurchase", data:"", req:"y"}, {columnName:"사용용도", dbColumn:"", data:"", req:"y"}, {columnName:"도입년월", dbColumn:"introductiondate", data:"", req:"y"},
                    {columnName:"비고", dbColumn:"note", data:"", req:"n"}, {columnName:"상세업무", dbColumn:"desctask", data:"", req:"n"}]);

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

    // 각 PWS 입력 항목 update 함수
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

    // DB에서 읽은 PWS정보를 PWS UI정보에 저장
    function insertPwsFromDB(pws) {
        let copyContents = [...contents];
        for(let dbCol in pws) {
            loop:for(let i=0; i<copyContents.length; i++) {
                for(let item in copyContents[i]) {
                    //console.log('item : ', item, '  dbCol: ', dbCol);
                    if(dbCol == copyContents[i][item]) {
                        copyContents[i].data = pws[dbCol];                     
                        break loop;
                    }
                }
            }
        }
        setContents(copyContents);
        console.log('contents : ', contents);
    }

    // PWS 정보 렌더링 
    const items = contents.map(item =>
        <Content key={item.columnName} item={item} update={update}/>);
    
    
    // 자산관리번호 스캔 발생하면 자산관리번호 update 함수 호출하고 재랜더링
    useEffect(() => {
        console.log("update : ", managementId);
        if(managementId != '') {
            modifyContents();
            fetch(BASE_URL + `/${managementId}`)
                .then(res => res.json())
                .then(json => {
                    
                    console.log('json : ', json);
                    
                    insertPwsFromDB(json);
                })
        }
    },[managementId]);

    // useEffect(() => {
    //     console.log('contents modified!')
        
    // }, [contents]);

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