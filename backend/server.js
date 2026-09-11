const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Fake database (in-memory)
const menuItems = [
  { id: 1, name: "Mocha Mousse Roast", category: "brew", price: 4.50 },
  { id: 2, name: "Ethereal Cold Brew", category: "cold", price: 5.00 },
  { id: 3, name: "Moonlit Reserve Flat White", category: "brew", price: 4.75 }
];

let orders = [];

// ==========================================
// GET /menu : Retrieve all coffee items
// Safe, idempotent retrieval
// ==========================================
app.get('/menu', function(req, res) {
  // 200 OK
  res.status(200).json(menuItems);
});

// ==========================================
// POST /orders : Submit a new coffee order
// Unsafe, creates new data
// ==========================================
app.post('/orders', function(req, res) {
  const customerName = req.body.customerName;
  const itemId = req.body.itemId;

  // 1. Syntactic Validation (Gatekeeper Rule)
  if (!customerName || !itemId) {
    return res.status(400).json({ 
      error: "Bad Request: Missing customerName or itemId" 
    });
  }

  // 2. Semantic Validation (Gatekeeper Rule)
  const coffee = menuItems.find(item => item.id === itemId);
  
  if (!coffee) {
    return res.status(404).json({ 
      error: "Not Found: That coffee item does not exist in our menu." 
    });
  }

  // 3. Create the order
  const newOrder = {
    orderId: orders.length + 1,
    customerName: customerName,
    item: coffee.name,
    total: coffee.price,
    status: "Preparing"
  };

  orders.push(newOrder);

  // 201 Created
  res.status(201).json({
    message: "Order placed successfully!",
    order: newOrder
  });
});

// Fallback for missing routes
app.use(function(req, res) {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, function() {
  console.log(`Kova API is running on http://localhost:${PORT}`);
});