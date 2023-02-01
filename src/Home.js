import React, { useState } from "react";
import ContentList from "./components/ContentList";
import ScannerBtn from "./components/ScannerBtn";
import PwsContext from "./components/PWS-Context";
function Home() {
    const [managementId, setManagementId] = useState("");
    const value = { managementId, setManagementId };
    return(
        <PwsContext.Provider value={value}>
            <h2>{managementId}</h2>
            <div className="wrapper" style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', border:'solid 3px'}}>
                <ScannerBtn />
                <ContentList />
            </div>
        </PwsContext.Provider>
    );
}

export default Home;