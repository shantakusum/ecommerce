require("dotenv").config();



const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const sequelize = require("./db");
const User = require("./models/User");
const Product = require("./models/Product");
const auth = require("./midleware/auth");
const isRoleAllowed = require("./midleware/roleAllowed");
//const Category = require("./models/Category");

const app = express();
app.use(cors());
app.use(express.json());

const roles = [

  {
    email: "admin@test.com",
    role: "admin"
  },

  {
    email: "shand@test.com",
    role: "user"
  }

];

// relations
// Category.hasMany(Product);

// Product.belongsTo(Category);

sequelize.sync()
  .then(() => console.log("Database synced"));

app.get("/", (req, res) => {
  res.send("API is running ");
});
//GET (DB se data fetch)
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});
app.get("/products", async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});
// POST API to insert data
// app.post("/users", async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
app.post("/users", async (req, res) => {
  
  try {
    const { name, age, contact_no, email, address, password, role } = req.body;
    // password hash
    const hashedPassword = await bcrypt.hash(password, 10);
    // user create
    const user = await User.create({
      name,
      age,
      contact_no,
      email,
      address,
      password: hashedPassword,
      role
    });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
app.post("/products", auth, isRoleAllowed, async (req, res) => {
  
  try {
    // product create
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
// app.post("/categories", async (req, res) => {
  
//   try {
//     // product create
//     const category = await Category.create(req.body);
//     res.json(category);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//PUT API
app.put("/users/:id", async (req, res) => {
  await User.update(req.body, {
    where: {
      id: req.params.id
    }
  });

  res.json({
    message: "User updated"
  });
});
// DELETE API
app.delete("/users/:id", async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id
    }
  });

  res.json({
    message: "User deleted"
  });
});

//login api

app.post("/login", async (req, res) => {

  try {

    const { id, email, password } = req.body;

    // email check
    const user = await User.findOne({
      where: {
        email: email
      }
    });
    
    // user not found
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

     // password check
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    if (!isMatch) {
      return res.send("Invalid password");
     }

      // role array check
      const roleData = roles.find(
        (r) => r.email === user.email
      );
     
      // role not found
    if (!roleData) {

      return res.status(404).json({
        message: "Role not found"
      });

    }
      // JWT token
      const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: roleData.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    // success
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: roleData.role
      }
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});