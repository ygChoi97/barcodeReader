import React, { useEffect } from "react";
import Reader from "./Reader";
import EnhancedTable from "./DataTable";
const BASE_URL = 'http://localhost:8181/api/pws';

function LeftInfo({doScan}) {

    // return(
    //     // <div className="wrapper" style={{border:'solid 1px'}}>
    //     <div className="wrapper">
    //         {
    //         doScan ? 
    //             <Reader/>
    //              :
    //             <EnhancedTable item={menu}/>
    //         }
    //     </div>
    // );

    return (
        <div className="wrapper" style={{}}>
            <Reader doScan={doScan}/>
            
            <EnhancedTable doScan={doScan}/>
            
        </div>
    );
}

export default LeftInfo;