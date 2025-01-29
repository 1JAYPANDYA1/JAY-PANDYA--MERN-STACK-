require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const cors =require('cors')
const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,              
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
