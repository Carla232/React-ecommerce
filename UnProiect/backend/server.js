const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mime = require('mime-types');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const Promise = require('bluebird');

// Define the database connection settings
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'sss',
  password: 'sss',
  database: 'sss'
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database...");
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/upload', express.static('upload'));
app.use(session({
  secret: 'secretCarlaKey', // replace with your own secret key
  resave: false,
  saveUninitialized: false
}));
const uploadDir = 'upload/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });
app.post('/upload', upload.single('image'), (req, res, next) => {
    const { title, old_price, new_price, stars, description, reviews, brand, color, size, product_id, category_id, subcategory_id } = req.body;
    const imagePath = uploadDir + req.file.filename;
    if (!req.file) {
      const error = new Error('Please upload a file');
      error.status = 400;
      return next(error);
    }
    if (req.file.mimetype !== 'image/jpeg' && req.file.mimetype !== 'image/png') {
      const error = new Error('Invalid file type');
      error.status = 400;
      return next(error);
    }
    console.log('Product data:', req.body);
    connection.query(
      'INSERT INTO products (title, image, old_price, new_price, stars, description, reviews, brand, color, size, product_id, category_id, subcategory_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)',
      [title, imagePath, old_price, new_price, stars, description, reviews, brand, color, size, product_id, category_id, subcategory_id],
      (err, results, fields) => {
        if (err) {
          console.error(err);
          return res.status(500).send('An error occurred while uploading the product');
        }     
        console.log('Product uploaded successfully!');
        console.log('Result:', results);
        res.send('Product uploaded successfully!');
      }
    );
  });
  app.get('/products/:id/image', (req, res) => {
    const productId = req.params.id;
    connection.query(
      'SELECT image FROM products WHERE id = ?',
      [productId],
      (err, results, fields) => {
        if (err) {
          console.error(err);
          return res.status(500).send('An error occurred while retrieving the product image');
        }
        if (results.length > 0) {
          const imagePath = uploadDir + req.file.filename;
          const fileType = mime.contentType(path.extname(imagePath));
      res.set('Content-Type', fileType);
      res.sendFile(imagePath, { root: __dirname }); 
        } else {
          res.status(404).send('Product not found');
        }
      }
    );
  });
  app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    connection.query('SELECT * FROM products WHERE id = ?', [productId], (err, results, fields) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while retrieving the product');
      }
      const product = results[0]; 

      // Convert image to string
      const baseUrl = 'http://localhost:4000/';    
      product.image = product.image.toString('utf8');
      product.image = baseUrl + product.image;
  
      res.json(product);
    });
  });
  app.get('/products', (req, res) => {
    const { category_id, subcategory_id } = req.query;
    let query = 'SELECT * FROM products';
    let params = [];
  
    if (category_id && subcategory_id) {
      query += ' WHERE category_id = ? AND subcategory_id = ?';
      params = [category_id, subcategory_id];
    } else if (category_id) {
      query += ' WHERE category_id = ?';
      params = [category_id];
    }
  
    connection.query(query, params, (err, results, fields) => {
      if (err) {
        console.error(err);
        return res.status(500).send('An error occurred while retrieving products');
      }
  
      const baseUrl = 'http://localhost:4000/';
      results.forEach((product) => {
        product.image = baseUrl + product.image;
      });
      res.json(results);
    });
  });
app.get('/upload/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'upload', filename);
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred while retrieving image');
    }
    const contentType = mime.lookup(imagePath);
    res.set('Content-Type', contentType);
    res.send(data);
  });
});
app.post("/users", (req, res) => {
  const {name,username, email, password } = req.body;
  const sql = "INSERT INTO users (name,username, email, password) VALUES (?,?, ?, ?)";
  connection.query(sql, [name,username, email, password], (err, result) => {
    if (err) throw err;
    console.log(`User ${username} registered with id ${result.insertId}`);
    res.json({ message: "User registered successfully" });
  });
});
app.get("/users", (req, res) => {
  const { email, username } = req.query;
  const checkSql = "SELECT * FROM users WHERE username = ? OR email = ?";
  connection.query(checkSql, [username, email], (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  });
});
app.post("/login", (req, res) => {
  const { emailOrUsername, password } = req.body;
  const sql = `SELECT * FROM users WHERE (email = '${emailOrUsername}' OR username = '${emailOrUsername}') AND password = '${password}'`;
  console.log("sql: ",sql);
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    if (rows.length > 0) {
      const user = rows[0];
      if (!req.session) {
        req.session = {};
      }
      req.session.user = user;
      req.session.userId = user.id;
      const userId=user.id;
      
      res.json({ success: true, user,userId }); // Return the user data and userId along with the success response
    } else {
      res.json({ success: false });
    }
    console.log("params: ",[emailOrUsername,password]);
  });
});
app.post('/add-to-cart', (req, res) => {
  const { userId, productId } = req.body;
  const sql = "INSERT INTO cart (user_id, product_id) VALUES (?, ?)";
  connection.query(sql, [userId, productId], (err, result) => {
    if (err) throw err;
    console.log(`Product ${productId} added to cart for user ${userId}`);
    res.json({ message: "Product added to cart successfully" });
  });
});
app.get('/user-products', async (req, res) => {
  const { userId } = req.query;
 
  try {
    const rows = await Promise.fromCallback(cb => connection.query(
      `SELECT products.* FROM products INNER JOIN cart ON products.id = cart.product_id WHERE cart.user_id = '${userId}'`,
      cb
    ));
    const baseUrl = 'http://localhost:4000/';

    rows.forEach(product => {
      product.image = product.image.toString('utf8');
      product.image = baseUrl + product.image;
    });
    res.json({ products: rows });
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// server.js

app.delete('/user-products', async (req, res) => {
  const { userId } = req.body;

  try {
    await connection.query(
      `DELETE FROM cart WHERE user_id = ?`,
      [userId]  
    );
    res.sendStatus(200);

  } catch (error) {
    console.error('Error deleting user products', error);
    res.status(500).json({ error: 'Internal server error'});
  }
});
app.get("/api/categories", (req, res) => {
  const query = `
    SELECT categories.id AS categoryId, categories.name AS categoryName,
    subcategories.id AS subcategoryId, subcategories.name AS subcategoryName
    FROM categories LEFT JOIN subcategories ON categories.id = subcategories.category_id
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving categories");
    } else {
      const categories = [];
      results.forEach((row) => {
        let category = categories.find((c) => c.id === row.categoryId);
        if (!category) {
          category = {
            id: row.categoryId,
            name: row.categoryName,
            subcategories: [],
          };
          categories.push(category);
        }
        if (row.subcategoryId) {
          const subcategory = {
            id: row.subcategoryId,
            name: row.subcategoryName,
          };
          category.subcategories.push(subcategory);
        }
      });
      res.json(categories);
    }
  });
});
app.get("/categories", (req, res) => {
  const query = `
    SELECT id, name, image
    FROM categories
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving categories");
    } else {
      const categories = results.map((row) => ({
        id: row.id,
        name: row.name,
        image: row.image,
      }));
      res.json(categories);
    }
  });
});
app.get("/api/categories/:categoryId/subcategories", (req, res) => {
  const categoryId = req.params.categoryId;
  const query = `
    SELECT id, name
    FROM subcategories
    WHERE category_id = ?
  `;
  connection.query(query, [categoryId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving subcategories");
    } else {
      res.json(results);
    }
  });
});
app.post('/comments', (req, res) => {
  const { comment,productId } = req.body;
  const timestamp = new Date().toISOString();
  const { userId } = req.session;
  const sql = `INSERT INTO comments (comment, timestamp, product_id, user_id) VALUES (?, ?, ?, ?)`;
  connection.query(sql, [comment, timestamp, productId, userId], (err, result) => {
    if (err) throw err;
    console.log(`Added comment with id ${result.insertId}`);
    res.status(201).json({ id: result.insertId });
  });
});
app.get('/comments', (req, res) => {
  const { productId } = req.query;
  let sql = `SELECT comments.*, users.username 
             FROM comments 
             JOIN users ON comments.user_id = users.id
             WHERE comments.product_id = ?`;

  connection.query(sql, [productId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM comments WHERE id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    console.log(`Deleted comment with id ${id}`);
    res.sendStatus(204);
  });
});
app.listen(4000, () => {
  console.log('Server started on port 4000');
});
