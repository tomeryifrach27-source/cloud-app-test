import { useState, useEffect } from 'react'

function App() {
  const [servers, setServers] = useState([]);
  const [newServer, setNewServer] = useState({ name: '', ip_address: '' });

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // משיכת נתונים בטעינה הראשונית
  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = () => {
    fetch(`${apiUrl}/api/servers`)
      .then(res => res.json())
      .then(data => setServers(data))
      .catch(err => console.error("Error fetching data: ", err));
  };

  // פונקציה לשליחת הטופס
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiUrl}/api/servers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newServer)
    })
    .then(res => res.json())
    .then(() => {
      fetchServers(); // רענון הרשימה אחרי הוספה
      setNewServer({ name: '', ip_address: '' }); // איפוס הטופס
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>מערכת ניהול נכסי IT 🖥️</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
        <h3>הוסף שרת חדש</h3>
        <input 
          type="text" 
          placeholder="שם השרת (לדוגמה: Exchange-01)" 
          value={newServer.name}
          onChange={(e) => setNewServer({...newServer, name: e.target.value})}
          required
          style={{ margin: '5px', padding: '8px' }}
        />
        <input 
          type="text" 
          placeholder="כתובת IP" 
          value={newServer.ip_address}
          onChange={(e) => setNewServer({...newServer, ip_address: e.target.value})}
          required
          style={{ margin: '5px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          הוסף שרת
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {servers.map(server => (
          <li key={server.id} style={{ borderBottom: '1px solid #ddd', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <strong>{server.name}</strong> 
            <span>{server.ip_address}</span>
            <span style={{ color: server.status === 'Active' ? 'green' : 'orange' }}>[{server.status}]</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App