import { AddAPhotoRounded,  LinkedCameraRounded } from "@mui/icons-material";
import React, { useState } from "react";
import LeftInfo from "./LeftInfo";

function ScannerBtn() {
    const [doScan, setDoScan] = useState(false);
    const onToggleScanHandler = e => {
        setDoScan(!doScan);
        console.log(doScan);
    }

    console.log('ScannerBtn() 렌더링');
    return(
        // <div className="wrapper" style={{border:'solid 1px', width: '70%'}}>
        <div className="wrapper" style={{position: 'relative', zIndex: 1}}>

            <div>
                {doScan ?
                    <LinkedCameraRounded sx={{ fontSize: 25 }} onClick={onToggleScanHandler} />
                    :
                    <AddAPhotoRounded sx={{ fontSize: 25 }} onClick={onToggleScanHandler} />
                }
            </div>

            <div className="wrapper">
                <LeftInfo doScan={doScan} />
            </div>
        </div>
    );
}

export default ScannerBtn;