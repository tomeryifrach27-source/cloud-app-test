require('dotenv').config(); // טוען את משתני הסביבה מקובץ ה-.env
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// החלק שחזר - יצירת החיבור למסד הנתונים!
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/api/servers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM servers ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'שגיאה בשליפת נתונים' });
  }
});

app.post('/api/servers', async (req, res) => {
  const { name, ip_address, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO servers (name, ip_address, status) VALUES ($1, $2, $3) RETURNING *',
      [name, ip_address, status || 'Active']
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'שגיאה בשמירת נתונים' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});