/**
 * Service chatbot pour répondre aux préoccupations courantes des utilisateurs 
 * d'une plateforme d'agrégation de paiement.
 */

 const getMainMenu = () => {
  return `Voici les options disponibles :

1️⃣ Transactions
2️⃣ Ouverture de compte
3️⃣ Sécurité
4️⃣ Moyens de paiement
5️⃣ Remboursements
6️⃣ Intégration
7️⃣ FeexMarket
8️⃣ Aide générale 

Tapez le numéro correspondant à votre choix.`;
};

const handleTransactions = () => {
  return `
 Le marchand peut choisir de prendre en charge les frais de transaction. 
 Contactez notre service client si tel est le cas : <a href="https://wa.me/22997430303" target="_blank">Cliquez ici</a>

  `;
};

const handleFeexMarket = () => {
  return `À propos de FeexMarket :

Vous avez la possibilité de créer plusieurs boutiques reliées au même compte marchand. Les données statistiques de ces boutiques seront différentes et vous permettront aisément de faire le point des différentes transactions par boutique.

La validation des comptes peut prendre un maximum de 24 heures ouvré.

Un numéro IFU est obligatoire pour la création d'un compte (qu’il s’agisse d’un compte particulier ou entreprise).

Pour trouver l’identifiant de ma boutique, vous pouvez le trouver dans l’onglet « Développeur » sous la section « id ».

Comment modifier mon adresse mail ?  
Pour modifier votre adresse mail, veuillez contacter notre service client via le lien suivant : <a href="https://wa.me/22997430303" target="_blank">Cliquez ici</a>
Service client</a>.
  `;
};

const handleAccountOpening = () => {
  return `Pour l'ouverture de compte, voici les informations importantes :

Votre inscription sur notre plateforme est totalement gratuite.

Aussitôt après l’inscription, vous aurez un mail vous demandant de fournir un lot de documents requis pour vérification et ce n’est qu’une fois cette étape passée que vous aurez la validation de votre compte.


Quelle information vous intéresse ?`;
};

const handleSecurity = () => {
  return `Nous vous assurons une totale sécurité de vos transactions à travers nos différents protocoles de sécurité que vous pouvez trouvez dans la rubrique sécurité de notre site web. 
  
  Assurez vous de garder vos différents mots de passe secrets. En dépit de cela, FeexPay vous offre le dispositif sécuritaire adéquat pour la protected vos données lors de votre passage sur la plateforme.`;
};

const handlePaymentMethods = () => {
  return `Voici les informations sur les moyens de paiement :

MTN Mobile Money / MOOV Money / VISA / MASTERCARD`;
};

const handleRefunds = () => {
  return `À propos des remboursements :

La plupart du temps, les remboursements ou reversements sont instantanés par paiement mobile. Par contre, il peut arriver que vos demandes soient traitées dans un délai maximum de 48h en fonction du montant demandé. En ce qui concerne le virement bancaire, le remboursement dépendra du temps de traitement de l'opération par la banque.

`;
};

const handleIntegration = () => {
  return `Pour l'intégration de FeexPay :

Vous bénéficierez d’un support dédié pour toute difficulté concernant les intégrations et n’importe quel problème rencontré dans l’utilisation de notre plateforme.`;
};



const handleGeneralHelp = () => {
  return `Aide générale :

1. FAQ
2. Contact support
3. Horaires d'ouverture
4. Tutoriels

Comment puis-je vous assister ?`;
};

 const processMessage = (message, balances, selectedCountry) => {
  const lowerMessage = message.toLowerCase().trim();

  // Menu principal
  if (lowerMessage === 'aide' || lowerMessage === 'menu') {
    return getMainMenu();
  }

  // Traitement des choix numériques
  switch (lowerMessage) {
    case '1':
      return handleTransactions();
    case '2':
      return handleAccountOpening();
    case '3':
      return handleSecurity();
    case '4':
      return handlePaymentMethods();
    case '5':
      return handleRefunds();
    case '6':
      return handleIntegration();
    case '7':
      return handleFeexMarket();
    case '8':
      return handleGeneralHelp();
  }

  // Recherche de mots-clés
  if (lowerMessage.includes('transaction')) {
    return handleTransactions();
  } else if (lowerMessage.includes('compte')) {
    return handleAccountOpening();
  } else if (lowerMessage.includes('sécurité') || lowerMessage.includes('securite')) {
    return handleSecurity();
  } else if (lowerMessage.includes('paiement')) {
    return handlePaymentMethods();
  } else if (lowerMessage.includes('rembours')) {
    return handleRefunds();
  } else if (lowerMessage.includes('api') || lowerMessage.includes('intégration') || lowerMessage.includes('integration')) {
    return handleIntegration();
  } else if (lowerMessage.includes('feexmarket') || lowerMessage.includes('market')) {
    return handleFeexMarket();
  }

  // Réponse par défaut
  return `Je ne suis pas sûr de comprendre votre demande. ${getMainMenu()}`;
};

// Utilisation de la syntaxe d'exportation ES Modules
export { processMessage, getMainMenu };