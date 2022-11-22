const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

// converts body of every request into an object
app.use(express.json());
app.use('/build', express.static(path.join(__dirname, '../build')));
// GET method route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
})

// POST method route
// app.post('/', (req, res) => {
//   res.send('POST request to the homepage')
// })

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;