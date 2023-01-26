import { Button, Container, List, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Content from "./Content";
import '../css/main.css';
import PwsContext from "./PWS-Context";

const BASE_URL = 'http://localhost:8181/api/pws';

function ContentList() {
    const { managementId, setManagementId } = useContext(PwsContext);
    const colName = 'idasset';
    console.log('ContentList start');
    
    // PWS UI정보
    // const [contents, setContents] = useState([
    //                 {columnName:"자산관리번호", dbColumn:"idasset", data:"", req:"y"}, {columnName:"사용구분", dbColumn:"uptake", data:"", req:"y"}, {columnName:"회사", dbColumn:"company", data:"", req:"y"}, 
    //                 {columnName:"본부", dbColumn:"headquarters", data:"", req:"n"}, {columnName:"센터", dbColumn:"center", data:"", req:"y"}, {columnName:"관리부서", dbColumn:"department", data:"", req:"y"}, 
    //                 {columnName:"사용자", dbColumn:"username", data:"", req:"y"},{columnName:"사용자ID", dbColumn:"userid", data:"", req:"y"}, {columnName:"코스트센터CD", dbColumn:"centercd", data:"", req:"y"}, 
    //                 {columnName:"모델명", dbColumn:"model", data:"", req:"y"},{columnName:"자산번호", dbColumn:"assetno", data:"", req:"y"}, {columnName:"S/N", dbColumn:"sn", data:"", req:"y"},
    //                 {columnName:"그래픽카드", dbColumn:"graphic", data:"", req:"n"}, {columnName:"모니터", dbColumn:"monitor", data:"", req:"y"}, {columnName:"지역", dbColumn:"area", data:"", req:"y"},
    //                 {columnName:"건물명", dbColumn:"building", data:"", req:"y"}, {columnName:"층수", dbColumn:"storey", data:"", req:"y"}, {columnName:"상세위치", dbColumn:"location", data:"", req:"n"},                         
    //                 {columnName:"구매용도", dbColumn:"objpurchase", data:"", req:"y"}, {columnName:"사용용도", dbColumn:"objuse", data:"", req:"y"}, {columnName:"도입년월", dbColumn:"introductiondate", data:"", req:"y"},
    //                 {columnName:"비고", dbColumn:"note", data:"", req:"n"}, {columnName:"상세업무", dbColumn:"desctask", data:"", req:"n"}]);
    
    const [contents, setContents] = useState([]);
    const [pwsInfo, setPwsInfo] = useState({});
    const [bUploadDisabled, setBUploadDisabled] = useState(true);
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

        let info = {};
        for(let i=0; i<copyContents.length; i++){
            info[copyContents[i].dbColumn] = copyContents[i].data;
        }
        setPwsInfo(info);
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
        // console.log(contents);
        let info = {};
        for(let i=0; i<copyContents.length; i++){
            info[copyContents[i].dbColumn] = copyContents[i].data;
        }
        setPwsInfo(info);

        setBUploadDisabled(false);
    };

    // DB에서 읽은 PWS정보를 PWS UI정보에 저장
    function insertPwsFromDB(pws) {
        let copyContents = [...contents];
        for(let dbCol in pws) {
            loop: for(let i=0; i<copyContents.length; i++) {
                for(let item in copyContents[i]) {
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
    
    useEffect(() => {
        fetch(BASE_URL+`/menu`)
        .then(res => {
            if(!res.ok) {alert('메뉴를 가져오지 못했습니다.');throw new Error(res.status);}
            else {console.log(res); return res.json();}
        })
        .then(json => {
            console.log(json);
            
            // 메뉴등록
            let copyContents = [];
            for(let i=0; i<json.length; i++) {
                let copyContent = {};
                copyContent.columnName = json[i].column_comment;
                copyContent.dbColumn = json[i].column_name;
                if(json[i].column_name == 'idasset')
                    copyContent.req = 'y';
                console.log(copyContent);
                copyContents.push(copyContent);
            }
            console.log(copyContents);
            setContents(copyContents);
        })
        .catch((error) => {
            console.log('error: ' + error);
        })
    }, []);

    // 자산관리번호 스캔 발생하면 자산관리번호 update 함수 호출하고 재랜더링
    useEffect(() => {
        console.log("update : ", managementId);
        
        if(managementId != '') {
            modifyContents();
            fetch(BASE_URL + `/${managementId}`)
                .then(res => {
                    if(!res.ok) {alert('등록할까요?');throw new Error(res.status);}
                    else return res.json();          
                })
                .then(json => {                    
                    console.log('json : ', json);                   
                    insertPwsFromDB(json);
                })
                .catch((error) => {
                    console.log('error: ' + error);
                })
        }
    },[managementId]);

    const onClickUploadHandler = e => {
        
        console.log('pwsInfo : ',pwsInfo);
        fetch(BASE_URL, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(pwsInfo)
        })
        .then(res => {
            if(!res.ok) {console.log(JSON.stringify(pwsInfo));throw new Error(res.status);}
            else return res.json();          
        })
        .then(json=>{console.log(json);
        })
        .catch(error => {
            console.log('error: ' + error);
        });
    }

    const onClickModifyHandler = e => {
        fetch(BASE_URL, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(pwsInfo)
        })
        .then(res => {
            if(!res.ok) {console.log(JSON.stringify(pwsInfo));throw new Error(res.status);}
            else return res.json();          
        })
        .then(json=>{console.log(json);
        })
        .catch(error => {
            console.log('error: ' + error);
        });
    }
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
                    <Button variant="contained" disabled={bUploadDisabled} onClick={onClickUploadHandler}>업로드</Button>
                </Paper>
        </div>
    );
}

export default ContentList;