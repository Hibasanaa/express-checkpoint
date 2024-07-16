// app.js
const express = require('express');
const app = express();
const path = require('path');

// Middleware to check working hours
function workingHoursMiddleware(req, res, next) {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const hour = currentDate.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send("The web application is only available during working hours (Monday to Friday, from 9 to 17).");
  }
}

// Set view engine to EJS
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Use working hours middleware
app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
