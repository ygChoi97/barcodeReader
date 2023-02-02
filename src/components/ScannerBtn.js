import { AddAPhotoOutlined, AddAPhotoRounded, AddAPhotoTwoTone, LinkedCameraRounded } from "@mui/icons-material";
import React, { useState } from "react";
import LeftInfo from "./LeftInfo";

function ScannerBtn() {
    const [doScan, setDoScan] = useState(false);
    const onToggleScanHandler = e => {
        setDoScan(!doScan);
        console.log(doScan);
    }

    return(
        // <div className="wrapper" style={{border:'solid 1px', width: '70%'}}>
        <div className="wrapper" style={{width: '100%', position: 'relative', zIndex: 1}}>

            <div>
            { doScan ?
                <LinkedCameraRounded  sx={{ fontSize: 25 }} onClick={onToggleScanHandler}/>
                :
                <AddAPhotoRounded  sx={{ fontSize: 25 }} onClick={onToggleScanHandler}/>
            }
            </div>
                
            
            <div>
                <LeftInfo item={doScan}/>
            </div>
        </div>
    );
}

export default ScannerBtn;