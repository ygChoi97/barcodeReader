import Reader from "./Reader";
import EnhancedTable from "./DataTable";
import AutoComplete from "./AutoComplete";
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

    console.log('LeftInfo() 렌더링')
    return (
        <div className="wrapper" style={{}}>
            <EnhancedTable doScan={doScan}/>
            {/* <EnhancedTable/> */}
            
            {doScan ? 
            <Reader doScan={doScan}/>
            : <></>
            }   
        </div>
    );
}

export default LeftInfo;