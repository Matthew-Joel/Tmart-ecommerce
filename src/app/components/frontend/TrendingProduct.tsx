"use client"
import { useEffect,useState } from "react"
import ProductCard from "./ProductCard";
import axios from "axios"
import { IProduct } from "@/app/Admin/dashboard/page";

interface propsType {
    _id:string;
    imgSrc:string;
    fileKey:string;
    name:string;
    category:string;
    price:number;
}
const TrendingProduct = () => {
    const [products,setProduct] = useState([]);
    useEffect(() => {
        axios
          .get("/api/get_products")
          .then((res) => {
            console.log(res.data);
            setProduct(res.data);
          })
          .catch((err) => {
            if (err.response) {
              console.log("Response error:", err.response);
            } else if (err.request) {
              console.log("Request error:", err.request);
            } else {
              console.log("Error:", err.message);
            }
          });
      }, []);
      
  return (
    <div className="container mt-32">
        <div className="sm:flex justify-between items-center">
            <h2 className="text-4xl font-medium">Trending Products</h2>

            <div className="text-gray-500 flex gap-4 text-xl mt-4 sm:mt-0">
                <div className="text-black">New</div>
                <div>Feature</div>
                <div>Top seller</div>
            </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {products.map((item:propsType) => (
                <ProductCard
                key={item._id}
                id={item._id}
                img={item.imgSrc}
                category={item.category}
                title={item.name}
                price={item.price}
                />
            ))}
        </div>
    </div>
  )
}

export default TrendingProduct