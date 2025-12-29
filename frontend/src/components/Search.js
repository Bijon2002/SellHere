import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {

    const [keyword,setKeyword]=  useState("")

   const navigate = useNavigate();


    const searchHandler=(e)=>{
        navigate('/search?keyword='+keyword)

    }



    return (
              <div className="col-12 col-md-6 mt-2 mt-md-0 d-flex justify-content-center">
        <div className="input-group">
          <input
            type="text"
            id="search_field"
            //getting the value and store to the state  that we  are created
            onChange={(e) => setKeyword(e.target.value)}
            className="form-control"
            onBlur={searchHandler}
            placeholder="Enter Product Name ..."/>
          <div className="input-group-append">
            <button onClick={searchHandler} id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

    )


}

