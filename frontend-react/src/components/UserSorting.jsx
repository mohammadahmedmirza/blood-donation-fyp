import React, {useState,useEffect} from 'react'
// import ArrowDown from '../imgs/icons/arrowDownGrey.png'
// import ArrowUp from '../imgs/icons/arrow-up-grey.png'
// import { Globals } from './DashboardBody';
import { useContext } from 'react';
function UserSorting({name,col,url,setFunction,setsorting, sorting}) {
    // const {setAllUsers} = useContext(Globals);
//     const [column,setColumn] = useState("");
//     const [order,setOrder] = useState("");
//     setsorting(true)
//     const orderBy = async(column,order) => {
//       if(sorting){
//         try {
//           const response = await fetch(`${url}`, {
//             method: "POST",
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               "column": col,
//               "order": order
//             })
//           });
//           const data = await response.json();
//           setFunction(data);
//         } catch (e) {
//           console.log(e);
//         }

//       }
//       }
// const handleClickAsc = (e) => { 
//   // setsorting(true)
// setColumn({col}); setOrder("asc"); 
// orderBy(column.col, "asc");
// }

// const handleClickDesc = (e) => { 
// setColumn({col}); setOrder("desc"); 
// orderBy(column.col, "desc"); 
// }

//     useEffect(()=>{
//         orderBy(column.col,order);
//       },[])
    return (
        <div style={{ display: "flex" }}>
            <div style={{ marginRight: "3px" }}>{name}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {/* <img onClick={handleClickAsc} 
                style={{ width: "10px", color: "black", cursor: "pointer", padding: "1px 1px 0px 1px" }} 
                src={ArrowUp} alt="arrow up" /> */}
                {/* <img onClick={handleClickDesc} 
                style={{ width: "10px", color: "black", cursor: "pointer", padding: "1px 1px 0px 1px" }} 
                src={ArrowDown} alt="arrow up" /> */}
            </div>
        </div>
    )
}

export default UserSorting