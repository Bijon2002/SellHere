import { Fragment, useState, useEffect } from "react"
import ProductCard from "../components/ProductCard"
import { use } from "react"

export default function Home() {

    const [products,setProducts]=useState([]);

    useEffect(()=>{
        fetch(process.env.REACT_APP_API_URL + '/products')
        .then(res=>res.json())
        .then(res => setProducts(res.products))

    },[])


    return <Fragment>
    
    <h1 id="products_heading">Latest Products</h1>

    <section id="products" className="container mt-5">
      <div className="row">
      
      {products.map(product=><ProductCard product={product}/>)}


{/* //Home = parent component
//ProductCard = child component
product = prop name
// product = value being passed
#props = the object that holds all passed values
 */}

        
      </div>
    </section>


    </Fragment>



}


