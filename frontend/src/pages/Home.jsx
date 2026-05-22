import ProductCard from "../component/ProductCard";

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

export default Home