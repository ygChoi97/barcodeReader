import React, { useEffect } from "react";
import Reader from "./Reader";
import EnhancedTable from "./DataTable";
const BASE_URL = 'http://localhost:8181/api/pws';

function LeftInfo({item}) {
    const [menu, setMenu] = React.useState([]);

    useEffect(()=>{
        fetch(BASE_URL+`/menu`)
        .then(res => {
            if(!res.ok) {
                throw new Error(res.status);
            }
            else { 
                return res.json();
            }
        })
        .then(json => {
          let copyMenu = [];
          for(let i=0; i<json.length; i++) {
            copyMenu.push(json[i]);
          }
          setMenu(copyMenu);
          console.log(copyMenu);
        })
      },[]);
    return(
        // <div className="wrapper" style={{border:'solid 1px'}}>
        <div className="wrapper">
            {
            item ? 
                <Reader/>
                 :
                <EnhancedTable item={menu}/>
            }
        </div>
    );
}

export default LeftInfo;