import app from './app.js'; // Importation correcte du fichier app.js
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
