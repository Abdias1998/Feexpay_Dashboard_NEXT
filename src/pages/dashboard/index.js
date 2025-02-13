// import { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
// import MainLayout from '../../components/layout/MainLayout';
// import BalanceCards from '../../components/dashboard/BalanceCards';
// import Statistics from '../../components/dashboard/Statistics';
// import OperatorChart from '../../components/dashboard/OperatorChart';
// import CountrySelector from '../../components/dashboard/CountrySelector';
// import { generateMetadata } from '../../utils/metadata';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { setGetBalance } from '../../features/balance/balanceSlice';
// import { setGetOperatorsStats } from '../../features/balance/operatorsSlice';


// export const metadata = generateMetadata({
//   title: 'Tableau de bord',
//   description: 'Vue d\'ensemble des statistiques et des performances de FeexPay'
// });


// // Données de démonstration pour les statistiques de paiement
// const paymentStats = [
//   { name: 'Visa', percentage: 2 },
//   { name: 'MasterCard', percentage: 3 },
// ];

// // Au début du fichier, ajoutez ces données de démonstration
// const COUNTRY_BALANCES = {
//   'Bénin': {
//     mobileBalance: {
//       'MTN Money': 0,
//       'Moov Money': 0,
//       'Coris Money': 0,
//       'Celtis Money': 0,
//     },
//     bankBalance: 0,
//     commissions: 0,
//     last24h: 0,
//     reserve : 0,
//   },
//   'Burkina-Faso': {
//     mobileBalance: {
//       'Moov Money': 0,
//       'Orange Money': 0,
//     },
//     bankBalance: 0,
//     commissions: 0,
//     last24h: 0,
//     reserve : 0,
//   },
//   'Cameroun': {
//     mobileBalance: {
//       'MTN Money': 0,
//       'Orange Money': 0,
//     },
//     bankBalance: 0,
//     commissions: 0,
//     last24h: 0,
//     reserve : 0,
//   },
//   'Congo Brazzaville': {
//     mobileBalance: {
//       'MTN Money': 0
//     },
//     bankBalance: 0,
//     commissions: 0,
//     last24h: 0,
//     reserve : 0,
//   },
//   "Côte d'Ivoire": {
//     mobileBalance: {
//       'MTN Money': 0,
//       'Moov Money': 0,
//       'Orange Money': 0,
//       'Wave': 0
//     },
//     bankBalance: 0,
//     commissions: 0,
//     last24h: 0,
//     reserve : 0,
//   },
//   'Nigeria': {
//     mobileBalance: {
//       'Nigeria Money': 0
//     },
//     bankBalance: 0,
//     commissions: 0,
//     last24h: 0,
//     reserve : 0,
//   },
//   'Sénégal': {
//     mobileBalance: {
//       'Orange Money': 0,
//       'Free Money': 0
//     },
//     bankBalance: 0,
//     commissions: 0,
//     last24h: 0,
//     reserve : 0,
//   },
//   'Togo': {
//     mobileBalance: {
//       'Moov Money': 0,
//       'Yas Money': 0,
//     },
//     bankBalance: 0,
//     commissions: 0,
//     last24h: 0,
//     reserve : 0,
//   }
// };


// // Au début du fichier, ajoutez cette fonction utilitaire
// function calculateGlobalTotals(countryBalances = COUNTRY_BALANCES) {
//   let totalMobileBalance = 0;


//   // On prend le bankBalance du premier pays qui n'est pas 0 (ils sont tous identiques)
//   const totalBankBalance = Object.values(countryBalances).find(country => country.bankBalance > 0)?.bankBalance || 0;

//   const totalCommissions =Object.values(countryBalances).find(country => country.commissions> 0)?.commissions || 0; 

//   const totalReserve =Object.values(countryBalances).find(country => country.reserve> 0)?.reserve || 0;
  
//   const total24h =Object.values(countryBalances).find(country => country.last24h> 0)?.last24h || 0;
  

//   Object.values(countryBalances).forEach(country => {
//     totalMobileBalance += Object.values(country.mobileBalance).reduce((a, b) => a + b, 0);
    
 
//   });

//   return {
//     totalMobileBalance,
//     totalBankBalance,
//     totalCommissions,
//     totalReserve,
//     total24h,
//     grandTotal: totalMobileBalance + totalBankBalance
//   };
// }

// export default function Dashboard() {
  
  
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [totalBalance, setTotalBalance] = useState(0);
//   const [globalTotals, setGlobalTotals] = useState(calculateGlobalTotals());
//   const [copied, setCopied] = useState(false);
//   const [operatorStats, setOperatorStats] = useState([]);
//   const accountId = session?.user?._id;
//   const balances = useSelector((state) => state?.balances?.balances);

// // console.log(session);

//   const dispatch = useDispatch();

//   // Fonction pour copier l'ID du compte dans le presse-papier
//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(accountId).then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   useEffect(() => {
   
//     if (status !== "authenticated" || !session?.user?.shops?.length) return;

//     const shopId = localStorage.getItem('shop_is_active') || session.user.shops[0]._id;
//     localStorage.setItem('shop_is_active', shopId);
//         const fetchBalances = async () => {
//           try {
//              await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/balance/${shopId}/get`).then((response)=>{
//               if (response.data?.balance?.diff) {
//                 dispatch(setGetBalance(response.data.balance.diff)); // Mettre à jour le state Redux (balance) avec les nouvelles données (response.data)
//                 const newCountryBalances = { ...COUNTRY_BALANCES };
//                 // Mettre à jour le bankBalance une seule fois pour tous les pays
//                 const globalBankBalance = (response.data.balance.diff.card - response.data.balance.solds?.solde_collect_reserve) || 0;
                
//                 if (newCountryBalances['Bénin']) {
//                   newCountryBalances['Bénin'].mobileBalance = {
//                     'MTN Money': response.data.balance.diff.mtn || 0,
//                     'Moov Money': response.data.balance.diff.moov || 0,
//                     'Coris Money': response.data.balance.diff.coris_benin || 0,
//                     'Celtis Money': response.data.balance.diff.celtiis_benin || 0
//                   };
                  
//                   newCountryBalances['Bénin'].bankBalance = globalBankBalance;
//                   newCountryBalances['Bénin'].commissions = response.data.balance.commission_payout;
//                   newCountryBalances['Bénin'].reserve = response.data.balance?.solds.solde_collect_reserve;
//                   // newCountryBalances['Bénin'].last24h = response.data.balance?.last24h;
  
  
//                 }
//                 if (newCountryBalances['Burkina-Faso']) {
//                   newCountryBalances['Burkina-Faso'].mobileBalance = {
//                     'Moov Money': response.data.balance.diff.moov_burkina || 0,
//                     'Orange Money': response.data.balance.diff.orange_burkina || 0
//                   };
//                   newCountryBalances['Burkina-Faso'].bankBalance = globalBankBalance;
//                   newCountryBalances['Burkina-Faso'].commissions = response.data.balance.commission_payout;
//                   newCountryBalances['Burkina-Faso'].reserve = response.data.balance?.solds.solde_collect_reserve;
//                   // newCountryBalances['Burkina-Faso'].last24h = response.data.balance?.last24h;
  
//                 }
//                 if (newCountryBalances['Cameroun']) {
//                   newCountryBalances['Cameroun'].mobileBalance = {
//                     'MTN Money': response.data.balance.diff.mmtn_cm || 0,
//                     'Orange Money': response.data.balance.diff.orange_cm || 0
//                   };
//                   newCountryBalances['Cameroun'].bankBalance = globalBankBalance;
//                   newCountryBalances['Cameroun'].commissions = response.data.balance.commission_payout;
//                   newCountryBalances['Cameroun'].reserve = response.data.balance?.solds.solde_collect_reserve;
//                   // newCountryBalances['Cameroun'].last24h = response.data.balance?.last24h;
  
//                 }
//                 if (newCountryBalances['Congo Brazzaville']) {
//                   newCountryBalances['Congo Brazzaville'].mobileBalance = {
//                     'MTN Money': response.data.balance.diff.mtn_cg || 0
//                   };
//                   newCountryBalances['Congo Brazzaville'].bankBalance = globalBankBalance;
//                   newCountryBalances['Congo Brazzaville'].commissions = response.data.balance.commission_payout;
//                   newCountryBalances['Congo Brazzaville'].reserve = response.data.balance?.solds.solde_collect_reserve;
//                   // newCountryBalances['Congo Brazzaville'].last24h = response.data.balance?.last24h;
  
//                 }
//                 if (newCountryBalances["Côte d'Ivoire"]) {
//                   newCountryBalances["Côte d'Ivoire"].mobileBalance = {
//                     'MTN Money': response.data.balance.diff.mtn_ci || 0,
//                     'Moov Money': response.data.balance.diff.moov_ci || 0,
//                     'Orange Money': response.data.balance.diff.orange_ci || 0,
//                     'Wave': response.data.balance.diff.wave_ci || 0
//                   };
//                   newCountryBalances["Côte d'Ivoire"].bankBalance = globalBankBalance;
//                   newCountryBalances["Côte d'Ivoire"].commissions = response.data.balance.commission_payout;
//                   newCountryBalances["Côte d'Ivoire"].reserve = response.data.balance?.solds.solde_collect_reserve;
//                   // newCountryBalances["Côte d'Ivoire"].last24h = response.data.balance?.last24h;
  
//                 }
//                 if (newCountryBalances['Nigeria']) {
//                   newCountryBalances['Nigeria'].mobileBalance = {
//                     'Nigeria Money': response.data.balance.diff.enaira + response.data.balance.diff.ussd + response.data.balance.diff.bank_transfer || 0
//                   };
//                   newCountryBalances['Nigeria'].bankBalance = globalBankBalance;
//                   newCountryBalances['Nigeria'].commissions = response.data.balance.commission_payout;
//                   newCountryBalances['Nigeria'].reserve = response.data.balance?.solds.solde_collect_reserve;
//                   // newCountryBalances['Nigeria'].last24h = response.data.balance?.last24h;
  
//                 }
//                 if (newCountryBalances['Sénégal']) {
//                   newCountryBalances['Sénégal'].mobileBalance = {
//                     'Orange Money': response.data.balance.diff.orange_senegal || 0,
//                     'Free Money': response.data.balance.diff.free_senegal || 0
//                   };
//                   newCountryBalances['Sénégal'].bankBalance = globalBankBalance;
//                   newCountryBalances['Sénégal'].commissions = response.data.balance.commission_payout;
//                   newCountryBalances['Sénégal'].reserve = response.data.balance?.solds.solde_collect_reserve;
//                   // newCountryBalances['Sénégal'].last24h = response.data.balance?.last24h;
//                 }
//                 if (newCountryBalances['Togo']) {
//                   newCountryBalances['Togo'].mobileBalance = {
//                     'Moov Money': response.data.balance.diff.moov_togo || 0,
//                     'Yas Money': response.data.balance.diff.togocom || 0
//                   };
//                   newCountryBalances['Togo'].bankBalance = globalBankBalance;
//                   newCountryBalances['Togo'].commissions = response.data.balance.commission_payout;
//                   newCountryBalances['Togo'].reserve = response.data.balance?.solds.solde_collect_reserve;
//                   // newCountryBalances['Togo'].last24h = response.data.balance?.last24h;
//                 }
                
//                 // Mettre à jour l'état global
//                 setGlobalTotals(calculateGlobalTotals(newCountryBalances));
//               }
//                axios.post(
//                 `${process.env.NEXT_PUBLIC_API_URL}/shop/getmainpercent`,
//                 { shop: shopId, mode: 1 },
//                 {
//                   headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${session?.user?.token}`,
//                   },
//                 }
//               ).then((res)=>{

//                 setOperatorStats(res.data);
//               }).catch((err)=>{
//                 console.log(err);
                
//               })
//               // setGetOperatorsStats(response.data);
//             }).catch((error)=>{
//               console.log(error);
//             });
          
//           } catch (error) {
//             console.error('Erreur lors de la récupération des données:', error);
//           }
//         };

//         fetchBalances();
      
      
    
//   }, [status, dispatch, session]);



//   // useEffect(() => {
//   //   // Récupérer l'ID et faire la requête API avec délai
//   //   const shopId = localStorage.getItem('shop_is_active');
  
//   //   const fetchOperatorStats = async () => {
//   //     console.log(shopId);
  
//   //     try {
//   //       const response = await axios.post(
//   //         `${process.env.NEXT_PUBLIC_API_URL}/shop/getmainpercent`,
//   //         { shop: shopId, mode: 1 },
//   //         {
//   //           headers: {
//   //             "Content-Type": "application/json",
//   //             "Authorization": `Bearer ${session?.user?.token}`,
//   //           },
//   //         }
//   //       );
      
//   //     } catch (error) {
//   //       console.error('Error fetching operator stats:', error);
//   //     }
//   //   };
  
//   //   const delayFetch = setTimeout(() => {
//   //     fetchOperatorStats();
//   //   }, 2000); // 2000 ms (2 secondes)
  
//   //   // Nettoyage (clear timeout) au cas où le composant serait démonté
//   //   return () => clearTimeout(delayFetch);
//   // }, [session]);
  


//     // Calculer le solde total quand le pays change
   
   
//     useEffect(() => {
//       if (selectedCountry && COUNTRY_BALANCES[selectedCountry]) {
//         const countryData = COUNTRY_BALANCES[selectedCountry];
//         // On calcule uniquement le total des soldes mobiles, sans inclure le bankBalance
//         const mobileTotal = Object.values(countryData.mobileBalance).reduce((a, b) => a + b, 0);
//         setTotalBalance(mobileTotal);
//       }
  
//     }, [selectedCountry]);




  
//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   if (!session) {
//     return null;
//   }

//   return (
//     <MainLayout>
//       <div className="container mx-auto px-4 py-8">
      
//         <div className="bg-white p-5 rounded-[40px] mt-12">
//         <CountrySelector 
//           selectedCountry={selectedCountry}
//           setSelectedCountry={setSelectedCountry}
//         />
//         {session.user.shops && session.user.shops.length > 0 ? (
//           <>
//             <BalanceCards 
//             selectedCountry={selectedCountry}
//             totalBalance={totalBalance}
//             globalTotals={globalTotals}
//             COUNTRY_BALANCES={COUNTRY_BALANCES}
//             accountId={accountId}
//             copyToClipboard={copyToClipboard}
//             copied={copied}
//           />
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//             <Statistics paymentStats={operatorStats} />
//             <OperatorChart operatorStats={operatorStats} />
//           </div>
//           </>
      
//         ) : <p className='text-center text-gray-500 text-sm mt-4 '>
//             Aucune boutique attribuée,veuillez creer une boutique
//         </p>}
        
          
     
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import MainLayout from '../../components/layout/MainLayout';
import BalanceCards from '../../components/dashboard/BalanceCards';
import Statistics from '../../components/dashboard/Statistics';
import OperatorChart from '../../components/dashboard/OperatorChart';
import CountrySelector from '../../components/dashboard/CountrySelector';
import { generateMetadata } from '../../utils/metadata';

export const metadata = generateMetadata({
  title: 'Tableau de bord',
  description: 'Vue d\'ensemble des statistiques et des performances de FeexPay'
});


// Données de démonstration pour les statistiques de paiement
const paymentStats = [
  { name: 'Visa', percentage: 2 },
  { name: 'MasterCard', percentage: 3 },
];

// Données de démonstration pour les soldes par pays
const COUNTRY_BALANCES = {
  'Bénin': {
    mobileBalance: {
      'MTN Money': 200000,
      'Moov Money': 900000,
      'Coris Money': 4000000,
      'Celtis Money': 9500000,
    },
    bankBalance: 7000000,
    commissions: 30000,
    last24h: 3030303,
    reserve : 353535,
  },
  'Burkina-Faso': {
    mobileBalance: {
      'Moov Money': 0,
      'Orange Money': 0,
    },
    bankBalance: 0,
    commissions: 0,
    last24h: 0,
    reserve : 0,
  },
  'Cameroun': {
    mobileBalance: {
      'MTN Money': 0,
      'Orange Money': 0,
    },
    bankBalance: 0,
    commissions: 0,
    last24h: 0,
    reserve : 0,
  },
  'Congo Brazzaville': {
    mobileBalance: {
      'MTN Money': 0
    },
    bankBalance: 0,
    commissions: 0,
    last24h: 0,
    reserve : 0,
  },
  "Côte d'Ivoire": {
    mobileBalance: {
      'MTN Money': 0,
      'Moov Money': 0,
      'Orange Money': 0,
      'Wave': 0
    },
    bankBalance: 0,
    commissions: 0,
    last24h: 0,
    reserve : 0,
  },
  'Nigeria': {
    mobileBalance: {
      'Nigeria Money': 0
    },
    bankBalance: 0,
    commissions: 0,
    last24h: 0,
    reserve : 0,
  },
  'Sénégal': {
    mobileBalance: {
      'Orange Money': 0,
      'Free Money': 0
    },
    bankBalance: 0,
    commissions: 0,
    last24h: 0,
    reserve : 0,
  },
  'Togo': {
    mobileBalance: {
      'Moov Money': 0,
      'Yas Money': 0,
    },
    bankBalance: 0,
    commissions: 0,
    last24h: 0,
    reserve : 0,
  }
};


// Fonction utilitaire pour calculer les totaux globaux
function calculateGlobalTotals(countryBalances) {
  let totalMobileBalance = 0;
  const totalBankBalance = Object.values(countryBalances).find(country => country.bankBalance > 0)?.bankBalance || 0;
  const totalCommissions = Object.values(countryBalances).find(country => country.commissions > 0)?.commissions || 0;
  const totalReserve = Object.values(countryBalances).find(country => country.reserve > 0)?.reserve || 0;
  const total24h = Object.values(countryBalances).find(country => country.last24h > 0)?.last24h || 0;

  Object.values(countryBalances).forEach(country => {
    totalMobileBalance += Object.values(country.mobileBalance).reduce((a, b) => a + b, 0);
  });

  return {
    totalMobileBalance,
    totalBankBalance,
    totalCommissions,
    totalReserve,
    total24h,
    grandTotal: totalMobileBalance + totalBankBalance,
  };
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);
  const [globalTotals, setGlobalTotals] = useState(calculateGlobalTotals(COUNTRY_BALANCES));
  const [copied, setCopied] = useState(false);
  const [operatorStats, setOperatorStats] = useState(paymentStats);

  // Fonction pour copier l'ID du compte dans le presse-papier
  const copyToClipboard = () => {
    navigator.clipboard.writeText(session?.user?._id || '').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Mettre à jour le solde total quand le pays change
  useEffect(() => {
    if (selectedCountry && COUNTRY_BALANCES[selectedCountry]) {
      const countryData = COUNTRY_BALANCES[selectedCountry];
      const mobileTotal = Object.values(countryData.mobileBalance).reduce((a, b) => a + b, 0);
      setTotalBalance(mobileTotal);
    }
  }, [selectedCountry]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-5 rounded-[40px] mt-12">
          <CountrySelector
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
          {!session.user.shops || session.user.shops.length === 0 ? (
            <>
              <BalanceCards
                selectedCountry={selectedCountry}
                totalBalance={totalBalance}
                globalTotals={globalTotals}
                COUNTRY_BALANCES={COUNTRY_BALANCES}
                accountId={session.user._id}
                copyToClipboard={copyToClipboard}
                copied={copied}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <Statistics paymentStats={operatorStats} />
                <OperatorChart operatorStats={operatorStats} />
              </div>
            </>
          ) : (
            <p className='text-center text-gray-500 text-sm mt-4'>
              Aucune boutique attribuée, veuillez créer une boutique.
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}