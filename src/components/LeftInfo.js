import React from "react";
import Reader from "./Reader";
import SubComp from "./SubComp";

function LeftInfo({item}) {
    return(
        <div className="wrapper" style={{border:'solid 1px'}}>
            {
            item ? 
                <Reader/>
                 :
                <SubComp/>
            }
        </div>
    );
}

export default LeftInfo;