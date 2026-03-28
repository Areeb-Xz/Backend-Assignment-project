require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/v1/authRoutes');
const taskRoutes = require('./routes/v1/taskRoutes');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
    credentials: false
  })
);
app.use(morgan('dev'));

// Swagger docs
const swaggerFile = path.join(__dirname, 'swagger.json');
let swaggerDoc = {};
if (fs.existsSync(swaggerFile)) {
  swaggerDoc = JSON.parse(fs.readFileSync(swaggerFile, 'utf-8'));
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Versioned routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);