
const express = require('express');
const app = express();
app.use(express.json());
let etudiants = [
  { id: 1, nom: "Rajosefa", age: 18 },
  { id: 2, nom: "Rakoto", age: 20 },
  { id: 3, nom: "Ketaka", age: 17 }
];

function existenceEtudiant(req, res, next) {
  const id = parseInt(req.params.id);
  const etudiant = etudiants.find(e => e.id === id);

  if (!etudiant) {
    return res.status(404).json({ message: "Étudiant introuvable" });
  }

  req.etudiant = etudiant; 
  next(); 
};

app.get('/etudiants', (req, res) => {
  res.status(200).json(etudiants);
});

app.get('/etudiants/:id', existenceEtudiant, (req, res) => {
  res.json(req.etudiant);
});

app.post('/etudiants', (req, res) => {
  const nouvelEtudiant = {
    id: etudiants.length + 1,
    nom: req.body.nom,
    age: req.body.age,
  }
  etudiants.push(nouvelEtudiant);
  res.status(201).json(nouvelEtudiant);
});

app.put('/etudiants/:id', existenceEtudiant, (req, res) => {
  req.etudiant.nom = req.body.nom;
  req.etudiant.age = req.body.age;
  res.status(200).json(req.etudiant);
});

app.patch('/etudiants/:id', existenceEtudiant, (req, res) => {
  if(req.body.nom){
    req.etudiant.nom = req.body.nom;
  }
  if(req.body.age){
    req.etudiant.age = req.body.age;
  }
  
  res.status(200).json(req.etudiant);
});

app.delete('/etudiants/:id',existenceEtudiant, (req, res) => {
  etudiants = etudiants.filter(e => e.id !== req.etudiant.id);
  res.status(200).json({ message: "etudiant supprimé" });
});
app.listen(3000, () => {
  console.log('Lien: http://localhost:3000/etudiants');
});