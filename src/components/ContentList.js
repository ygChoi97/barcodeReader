import { Button, Container, List, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Content from "./Content";
import '../css/main.css';
import PwsContext from "./PWS-Context";
import { isSameDateError } from "@mui/x-date-pickers/internals/hooks/validation/useDateValidation";

const BASE_URL = 'http://localhost:8181/api/pws';

function ContentList() {
    const { managementId, setManagementId } = useContext(PwsContext);
    const colName = 'idasset';
    console.log('ContentList start');
    
    // PWS UI정보
    const [contents, setContents] = useState([]);

    // pws json
    const [pwsInfo, setPwsInfo] = useState({});

    const [bUploadDisabled, setBUploadDisabled] = useState(true);
    const [bModifyDisabled, setBModifyDisabled] = useState(true);
    const [btnMode, setBtnMode] = useState(true);
    
    // 자산관리번호 update 함수
    const modifyContents = () => {
        let copyContents = [...contents];
        for(let i=0; i<copyContents.length; i++) {
            if(copyContents[i].dbColumn == 'idasset') {
                copyContents[i].data = managementId;
                console.log('pk : ', copyContents[i].data);
            }
            else if(copyContents[i].dbColumn == 'introductiondate')            
                copyContents[i].data = null;
            else
                copyContents[i].data = '';
        }
        setContents(copyContents);
        console.log('contents updated: ', contents);

        let info = {};
        for(let i=0; i<copyContents.length; i++){
            info[copyContents[i].dbColumn] = copyContents[i].data;
        }
        setPwsInfo(info);

        console.log(pwsInfo);
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
        console.log('contents updated: ', contents);
        let info = {};
        for(let i=0; i<copyContents.length; i++){
            info[copyContents[i].dbColumn] = copyContents[i].data;
        }
        setPwsInfo(info);
        console.log(pwsInfo);
        if(contents[0].data != null) 
            setBtnMode(false);
        else
            setBtnMode(true);
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
        console.log('contents updated: ', contents);
    }

    // PWS 정보 렌더링 
    const items = contents.map(item => {
        return <Content key={item.columnName} item={item} update={update}/>;
    });
    
    useEffect(() => {
        fetch(BASE_URL+`/menu`)
        .then(res => {
            if(!res.ok) {alert('메뉴를 가져오지 못했습니다.');throw new Error(res.status);}
            else {console.log(res); return res.json();}
        })
        .then(json => {            
            // 메뉴등록

            const fetchMenu = async() =>{
                try {
                    let copyContents = [];
                    for(let i=0; i<json.length; i++) {
                        let copyContent = {};
                        copyContent.columnName = json[i].column_comment;
                        copyContent.dbColumn = json[i].column_name;
                        if(json[i].column_name == 'idasset' || json[i].column_name == 'introductiondate')
                            copyContent.req = 'y';
                        console.log(copyContent);
                        copyContents.push(copyContent);
                    }
                    setContents(copyContents);
                    console.log('contents updated: ', contents);
                }catch(e) {
                    console.log(e);
                }
            };
            fetchMenu();
        }, [])
        .catch((error) => {
            console.log('error: ' + error);
        })
    }, []);

    // 자산관리번호 스캔 발생하면 자산관리번호 update 함수 호출하고 재랜더링
    useEffect(() => {
        console.log("update : ", managementId);
        
        if(managementId != '') {
            
            fetch(BASE_URL + `/${managementId}`)
                .then(res => {
                    if(res.status == 404) {modifyContents(); console.log(res); setBtnMode(true); setBUploadDisabled(false); setBModifyDisabled(true); alert('등록할까요?'); return res.json();}
                    else if(!res.ok) {throw new Error(res.status);}
                    else {setBtnMode(true); setBModifyDisabled(false); setBUploadDisabled(true); return res.json();}
                })
                .then(json => { 
                    // if(json != undefined) {
                    //     console.log('json : ', json);                   
                    //     insertPwsFromDB(json);
                    // }
                    console.log('json : ', json);  
                    insertPwsFromDB(json);
                })
                .catch((error) => {
                    console.log('error: ' + error);
                })
        }
    },[managementId]);

    // useEffect(()=>{
    //     console.log('contents updated');
    // },[contents]);

    const onClickUploadHandler = e => {
        
        console.log('pwsInfo : ',pwsInfo);
        fetch(BASE_URL, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(pwsInfo)
        })
        .then(res => {
            if(!res.ok) {
                console.log(JSON.stringify(pwsInfo));
                throw new Error(res.status);}
            else { setBtnMode(true); setBUploadDisabled(true); setBModifyDisabled(false); return res.json(); }
        })
        .then(json=>{ 
            console.log(json);
            alert(`DB 저장 완료! - ${pwsInfo.idasset}`);
            
        })
        .catch(error => {
            alert(`DB 저장 실패! - ${error}`);
            console.log(error);
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
            else {setBtnMode(true); return res.json(); }      
        })
        .then(json=>{console.log(json);
        })
        .catch(error => {
            console.log(error);
        });
    }

    console.log('ContentList 리렌더링');
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
                    <Button variant="contained" color="secondary" sx={{ width: 80, height:27, padding: 1, margin: 1 }} disabled={bUploadDisabled | btnMode} onClick={onClickUploadHandler}>upload</Button>
                    <Button variant="contained" sx={{ width: 80, height:27, padding: 1, margin: 1 }} disabled={bModifyDisabled | btnMode} onClick={onClickModifyHandler}>modify</Button>
                </Paper>
        </div>
    );
}

export default ContentList;