const express = require('express');
const cors = require('cors');
const app = express();

// הגדרת CORS - קריטי כדי שצד הלקוח יוכל למשוך נתונים מהשרת
app.use(cors());

// נתיב (Route) פשוט לבדיקה
app.get('/api/hello', (req, res) => {
    res.json({ message: "שיניתי את זה בהצלחה" });
});

// הגדרת הפורט - בענן (Render) המערכת תזריק את הפורט למשתנה הסביבה
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
