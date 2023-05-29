import React, { useState, useEffect,forwardRef, useImperativeHandle  } from "react";

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone';


const SearchField = forwardRef((props, ref) =>{  
const { placeholder, url, state, setLoader, setInitialpage, data, setFilterState}  = props 

  const [keyword, setKeyword] = useState("");
  const [showClearIcon, setShowClearIcon] = useState(false);
    
 
  const search = async (value) => {
    setFilterState(true)
      console.log(value);
      setLoader(true)
      setKeyword(value);
      
      setShowClearIcon(true)
      try {
        const res = await fetch(    
          `${url}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              keyword: value
            }),
          }
        );
        const respnse = await res.json();
        setFilterState(true)
        setLoader(false)
        state(respnse);
      } catch (e) {
        console.log(e);
      }
    };

    useImperativeHandle(ref, () => ({
    async  searchByPage(url)  {
      setLoader(true)    
      setShowClearIcon(true)
      try {
        const res = await fetch(    
        `${url}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              keyword: keyword
            }),
          }
        );
        const respnse = await res.json();
        setLoader(false)
        state(respnse);
      } catch (e) {
        console.log(e);
      }
    }
      
    }))

    const handleClick = (e)=>{
    setKeyword('')
    setShowClearIcon(false)
    data()
    setFilterState(false)

  }

 useEffect(() => {
   setInitialpage(0);
 }, [ keyword ]);
  return (
    <>
    <div className="searchfilter">
    <SearchTwoToneIcon className="search-icon"/>
      <input
        id="inputstyle"
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => search(e.target.value)}
        style={{
          width: "95%",
          border: "none",
          outline: "none",
          fontSize: "18px",
          paddingRight: "10px",
          marginTop:"-1px",
          marginLeft:"7px"
        }}
      />
      {showClearIcon  ===true && keyword.length > 0 ? <button className="clear-button" onClick={handleClick}><ClearTwoToneIcon/></button> : ""}
      
    </div>
    </>)



})

export default SearchField;
