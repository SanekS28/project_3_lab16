const express = require('express');
const app = express();
const apartmentRoutes = require('./routes/apartmentRoutes');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use('/apartments', apartmentRoutes);

app.listen(3000, () => console.log(' Server started on http://localhost:3000/apartments'));
