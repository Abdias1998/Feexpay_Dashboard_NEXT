export const defaultMetadata = {
  title: 'FeexPay Dashboard',
  description: 'Plateforme de gestion des paiements FeexPay',
  keywords: 'paiement, dashboard, feexpay, transactions',
  authors: [{ name: 'FeexPay' }],
  creator: 'FeexPay',
  publisher: 'FeexPay',
  robots: 'index, follow',
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/assets/icons/bank_card.png',
    shortcut: '/assets/icons/bank.png',
    apple: '/assets/icons/bank.png',
  },
};

export const generateMetadata = ({ title, description, ...customMetadata }) => {
  return {
    ...defaultMetadata,
    title: title ? `${title} | FeexPay Dashboard` : defaultMetadata.title,
    description: description || defaultMetadata.description,
    ...customMetadata,
  };
};
