import { AddAPhotoOutlined, AddAPhotoRounded, AddAPhotoTwoTone, LinkedCameraRounded } from "@mui/icons-material";
import React, { useState } from "react";
import LeftInfo from "./LeftInfo";
import Reader from "./Reader";
import SubComp from "./SubComp";

function ScannerBtn() {
    const [doScan, setDoScan] = useState(false);
    const onToggleScanHandler = e => {
        setDoScan(!doScan);
        console.log(doScan);
    }

    return(
        <div className="wrapper" style={{border:'solid 1px'}}>

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