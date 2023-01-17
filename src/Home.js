import React, { createContext } from "react";
import ContentList from "./components/ContentList";
import ScannerBtn from "./components/ScannerBtn";

function Home() {
    return(
        
            <div className="wrapper" style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'flex-start', border:'solid 3px'}}>
                <ScannerBtn/>
                <ContentList/>
            </div>
    );
}

export default Home;