function ProductCard() {
  return (
    <div className="card p-3">

      <img
        src="https://amzn.in/d/0e20Mx6L"
        className="card-img-top" 
      />

      <div className="card-body">

        <h5>Product Name</h5>

        <p>₹500</p>

        <button className="btn btn-dark">
          Add To Cart
        </button>

      </div>
    </div>
  )
}

export default ProductCard
