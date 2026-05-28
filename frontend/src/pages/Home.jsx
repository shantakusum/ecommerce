import ProductCard from "../component/ProductCard";
import { useEffect, useState } from "react";

function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/products")

      .then((res) => res.json())

      .then((data) => setProducts(data));

  }, []);

  return (

    <div className="container mt-5">

      <div className="row">

        {
          products.map((item) => (

            <div className="col-md-3" key={item.id}>

              <ProductCard product={item} />

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Home;

{/*import ProductCard from "../component/ProductCard";

function Home() {
  return (

    <div className="container mt-5">

      <div className="row">

        <div className="col-md-3">
          <ProductCard />
        </div>

        <div className="col-md-3">
          <ProductCard />
        </div>

      </div>

    </div>
  )
}
  

export default Home */}