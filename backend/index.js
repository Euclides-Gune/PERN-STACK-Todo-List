const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./routes/route');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(router);

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));