export function formatDate(dateString) {
    // Crée un objet Date à partir de la chaîne UTC
    const date = new Date(dateString);
  
    // Récupère les composants de la date
    const day = String(date.getUTCDate()).padStart(2, '0'); // Jour (avec 0 devant si nécessaire)
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Mois (indexé à partir de 0)
    const year = date.getUTCFullYear();
  
    // Récupère les composants de l'heure
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
    // Construit la chaîne formatée
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  
 
  