import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('טוען נתונים מהשרת...')

  useEffect(() => {
    // משיכת הכתובת ממשתני הסביבה. אם אין (פיתוח מקומי), יפנה לפורט 5000
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

    fetch(`${apiUrl}/api/hello`)
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => {
        console.error('Error fetching data:', error)
        setMessage('שגיאה בחיבור לשרת ❌')
      })
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h1>אפליקציית הניסוי הראשונה שלי באוויר</h1>
      <h2 style={{ color: 'blue' }}>{message}</h2>
    </div>
  )
}

export default App