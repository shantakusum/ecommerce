import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Navbar() {
  const navigate = useNavigate();
  //const email = localStorage.getItem("email");
  const [userEmail, setUserEmail] = useState(
  localStorage.getItem("email")
  );
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };
  const handleSubmit = async () => {

  const res = await fetch(
    "http://localhost:5000/login",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(formData)
    }
  );

  const data = await res.json();

  // token save
  localStorage.setItem(
    "token",
    data.token
  );

  // email save
  localStorage.setItem(
    "email",
    data.user.email
  );
  setUserEmail(data.user.email);
  // admin check
  if (data.user.email === "admin@test.com") {

    navigate("/admin");

  } else {

    navigate("/");
  }

  };
  const handleLogout = () => {

  localStorage.removeItem("email");

  localStorage.removeItem("token");
  setUserEmail(null);

  navigate("/");

  };

  //product submit
  const [productData, setProductData] = useState({
  category: "",
  title: "",
  price: "",
  image: "",
  description: ""
  });
  const handleProductChange = (e) => {
  setProductData({
    ...productData,
    [e.target.name]: e.target.value
  });

  };
  const handleProductSubmit = async () => {
  const resp = await fetch(
      "http://localhost:5000/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // backend ko batata hai json data bheja ja raha
          authorization: `Bearer ${localStorage.getItem("token")}`
        },

        body: JSON.stringify(productData) //object ko json string me convert krta hai
      }
  );  //
  const productDetails = await resp.json();   // json data ko object me convert krta hai 
   // token expired
  if (productDetails.message === "jwt expired") {

    localStorage.removeItem("token");

    localStorage.removeItem("email");

    setUserEmail(null);

    navigate("/");

  }
 
};

  return (
    <>

    <nav className="navbar navbar-dark bg-dark p-3">
      <div className="container">
        <h3 className="text-white">Ecommerce</h3>

        <div>

  {
    userEmail === "admin@test.com" ? (

      <>

        <button className="btn btn-light me-2" data-bs-toggle="modal" data-bs-target="#addProductModal">Add Product</button>

        <button className="btn btn-warning" onClick={handleLogout}>
          Logout
        </button>

      </>

    ) : (

      <>

        <button className="btn btn-light me-2" data-bs-toggle="modal" data-bs-target="#addUserModal">
          Login
        </button>

        <button className="btn btn-warning">
          Cart
        </button>

      </>

    )
  }

</div>

      </div>
    </nav>
    <div className="modal fade"  id="addUserModal"  tabIndex="-1"  aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header" style={{ backgroundColor:  '#f5b325', height: '50px' }} >
            <h5 className="modal-title">Login</h5>
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            <form>
              
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="" />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
               <input name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="" />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            
            <button type="button" className="btn btn-success" onClick={handleSubmit} style={{ backgroundColor:  '#000601' }} >
              Login
            </button>
          </div>

        </div>
      </div>
    </div>
    {/*product model */}
        <div className="modal fade"  id="addProductModal"  tabIndex="-1"  aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header" style={{ backgroundColor:  '#f5b325', height: '50px' }} >
            <h5 className="modal-title">Add Products</h5>
            <button 
              type="button" 
              className="btn-close" 
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            <form>
              
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input name="category" value={productData.category} onChange={handleProductChange} className="form-control" placeholder="" />
              </div>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input name="title" value={productData.title} onChange={handleProductChange} className="form-control" placeholder="" />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input name="price" value={productData.price} onChange={handleProductChange} className="form-control" placeholder="" />
              </div>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input name="image" value={productData.image} onChange={handleProductChange} className="form-control" placeholder="" />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
               <input name="description" value={productData.description} onChange={handleProductChange} className="form-control" placeholder="" />
              </div>
            </form>
          </div>

          <div className="modal-footer">
            
            <button type="button" className="btn btn-success" onClick={handleProductSubmit} style={{ backgroundColor:  '#000601' }} >
              Add Product
            </button>
          </div>

        </div>
      </div>
    </div> 
    </>
  );
}

export default Navbar