import { useEffect, useState } from 'react';

export default function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const load=()=> { 
    fetch('http://localhost:3000/students')
        .then((r) => r.json())
        .then(setStudents);
  };
  useEffect(() => { 
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3000/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age: Number(age) }),
    });
    setName('');
    setAge('');
    load();
  };
  const handleDelete = async (id) => {
  await fetch(`http://localhost:3000/students/${id}`, { 
    method: 'DELETE' 
  });
  load();

};

const handleUpdate = async (id) => {
  const newName = prompt('Nouveau nom :');
 
  await fetch(`http://localhost:3000/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName }),
  });
  load(); 
};

  return (
    <div>
      <h1>Étudiants</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Âge" value={age} onChange={(e) => setAge(e.target.value)} required />
        <button>Ajouter</button>
      </form>
      <ul>
        {students.map((s) => <li key={s.id}>
          {s.name} - {s.age} ans
          <button onClick={() => handleUpdate(s.id)}>Modifier</button>
          <button onClick={() => handleDelete(s.id)}>Supprimer</button>

        </li>)}
      </ul>
    </div>
  );
}