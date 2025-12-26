import { Fragment, useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import { use } from "react"

export default function Home() {

    const [products,setProducts]=useState([]);

    useEffect(()=>{

    return <Fragment>
    
    <h1 id="products_heading">Latest Products</h1>

    <section id="products" className="container mt-5">
      <div className="row">
      

      <ProductCard />
        
      </div>
    </section>


    </Fragment>



}


