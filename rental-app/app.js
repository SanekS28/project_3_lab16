const express = require('express');
const app = express();
const path = require('path');

// Роуты
const apartmentRoutes = require('./routes/apartmentRoutes');
const apiApartmentRoutes = require('./routes/api/apartments');

// Настройки шаблонизатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static('public'));

// Веб-интерфейс
app.use('/apartments', apartmentRoutes);

// REST API
app.use('/api/apartments', apiApartmentRoutes);

// Запуск сервера
app.listen(3000, () => {
    console.log('Server started at http://localhost:3000/apartments');
    console.log('REST API available at http://localhost:3000/api/apartments');
});
