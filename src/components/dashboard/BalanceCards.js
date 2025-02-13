// import { CalendarIcon } from '@chakra-ui/icons';
// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import { useSelector } from 'react-redux';

// const BalanceCards = ({ 
//   selectedCountry, 
//   totalBalance, 
//   globalTotals, 
//   COUNTRY_BALANCES, 
//   accountId, 
//   copyToClipboard, 
//   copied 
// }) => {
//   const router = useRouter();
//   const balances = useSelector((state) => state?.balances?.balances);
//   const isLoading = !balances || balances.length === 0;

//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         {/* Carte Solde Mobile */}
//         <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-gray h-[160px] sm:h-[180px] lg:h-[200px] animate-pulse">
//           <div className="flex flex-col h-full justify-between">
//             <div className="flex justify-between items-start">
//               <div className="p-2 rounded-lg bg-gray-200 w-12 h-12"></div>
//               <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
//             </div>
//             <div className="space-y-2">
//               <div className="h-4 bg-gray-200 rounded w-32"></div>
//               <div className="h-6 bg-gray-200 rounded w-40"></div>
//             </div>
//           </div>
//         </div>

//         {/* Carte Solde Bancaire */}
//         <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-gray h-[160px] sm:h-[180px] lg:h-[200px] animate-pulse">
//           <div className="flex flex-col h-full justify-between">
//             <div className="flex justify-between items-start">
//               <div className="p-2 rounded-lg bg-gray-200 w-12 h-12"></div>
//               <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
//             </div>
//             <div className="space-y-2">
//               <div className="h-4 bg-gray-200 rounded w-32"></div>
//               <div className="h-6 bg-gray-200 rounded w-40"></div>
//             </div>
//           </div>
//         </div>

//         {/* Carte Commissions */}
//         <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-gray h-[160px] sm:h-[180px] lg:h-[200px] animate-pulse">
//           <div className="flex flex-col h-full justify-between">
//             <div className="flex justify-between items-start">
//               <div className="p-2 rounded-lg bg-gray-200 w-12 h-12"></div>
//               <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
//             </div>
//             <div className="space-y-2">
//               <div className="h-4 bg-gray-200 rounded w-32"></div>
//               <div className="h-6 bg-gray-200 rounded w-40"></div>
//             </div>
//           </div>
//         </div>

//         {/* Carte Réserve */}
//         <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-gray h-[160px] sm:h-[180px] lg:h-[200px] animate-pulse">
//           <div className="flex flex-col h-full justify-between">
//             <div className="flex justify-between items-start">
//               <div className="p-2 rounded-lg bg-gray-200 w-12 h-12"></div>
//               <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
//             </div>
//             <div className="space-y-2">
//               <div className="h-4 bg-gray-200 rounded w-32"></div>
//               <div className="h-6 bg-gray-200 rounded w-40"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const handleRefresh = () => {
//     // router.reload();
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full">
//       {/* Carte Solde Total */}
//       <div className="col-span-1 sm:col-span-2 lg:col-span-1">
//         <div 
//         style={{
//           backgroundImage: 'url(/assets/images/background_login.jpeg)',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           opacity: '1'
//         }}  
//           className="bg-primary rounded-[20px] p-4 sm:p-6 text-white relative overflow-hidden border border-primary h-[160px] sm:h-[180px] lg:h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
         
//         >
//           <div className="absolute inset-0 bg-primary opacity-80"></div>
//           <div className="relative z-10 h-full flex flex-col justify-between">
//             <div>
//               <p className="text-sm mb-2">Solde Total {selectedCountry && `- ${selectedCountry}`}</p>
//               <h2 className="text-xl sm:text-2xl md:text-3xl text-white font-bold">
//                 {selectedCountry 
//                   ? `${totalBalance.toLocaleString()} `
//                   : `${globalTotals.grandTotal.toLocaleString()}`}
//                 <span className="font-light"> XOF</span>
//               </h2>
//             </div>
//             <div className="flex justify-between items-end">
//               <div>
//                 <p className="text-sm">ID du compte</p> 
//                 <div className="flex items-center gap-2">
//                   <p className="text-xs sm:text-xs">{accountId}</p>
//                   <button 
//                     onClick={copyToClipboard}
//                     className="hover:bg-orange-500 p-1 rounded-md transition-colors duration-200"
//                   >
//                     <Image
//                       src="/assets/icons/copy_clipboard.png"
//                       alt="Copy"
//                       width={24}
//                       height={24}
//                       className="rounded-full"
//                     />
//                   </button>
//                   {copied && <span className="text-xs sm:text-sm text-secondary">Copié!</span>} 
//                 </div>
//               </div>
//               <div className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2">
//                 <div className="rounded-lg" style={{ backgroundColor: 'rgba(212, 93, 1, 0.1)' }}>
//                   <button 
//                     onClick={handleRefresh}
//                     className="p-2 sm:px-4 sm:py-3 rounded-lg bg-primary hover:bg-orange-500 transition-colors duration-200 flex items-center justify-center"
//                   >
//                     <Image
//                       src="/assets/icons/refresh.png"
//                       alt="Refresh"
//                       width={24}
//                       height={24}
//                       className="rounded-full"
//                     />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Carte des dernières 24h */}
//       <div className="col-span-1 w-full">
//         <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-primary h-[160px] sm:h-[180px] lg:h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//           <div className="flex flex-col items-start space-y-4">
//             <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 93, 1, 0.1)' }}>
              
//               {/* <Image
//                 src="/assets/icons/24hours.png"
//                 alt="24 heures"
//                 className="w-6 h-6 sm:w-8 sm:h-8"
//                 width={32}
//                 height={32}
//                 priority
//               /> */}

// <CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8" />

//             </div>
//             <div className="space-y-1">
//               <p className="text-gray-600 text-xs sm:text-sm">Dernières 24h</p>
//               <h3 className="text-lg sm:text-xl md:text-2xl font-black">
//                 {selectedCountry 
//                   ? `${COUNTRY_BALANCES[selectedCountry].last24h.toLocaleString()}`
//                   : `${globalTotals.total24h?.toLocaleString()}`}
//                 <span className="text-lg sm:text-xl md:text-2xl font-light"> XOF</span>
//               </h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Cartes Mobile Money */}
//       {selectedCountry ? (
//         Object.entries(COUNTRY_BALANCES[selectedCountry].mobileBalance).map(([provider, amount]) => (
//           <div key={provider} className="col-span-1 w-full">
//             <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-primary h-[160px] sm:h-[180px] lg:h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//               <div className="flex flex-col items-start space-y-4">
//                 <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 93, 1, 0.1)' }}>
//                 <Image
//                src={`/assets/icons/${provider.toLowerCase().replace(' ', '_')}.png`} 
//              alt={provider}
//               className="w-6 h-6 sm:w-8 sm:h-8"
//                 width={120}
//                 height={40}
//                 priority
//              style={{objectFit:"contain"}}
//               />
              
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-gray-600 text-xs sm:text-sm"> Solde {provider}</p>
//                   <h3 className="text-lg sm:text-xl md:text-2xl font-black">
//                     {amount.toLocaleString()} 
//                     <span className="text-lg sm:text-xl md:text-2xl font-light"> XOF</span>
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="col-span-1 w-full">
//           <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-primary h-[160px] sm:h-[180px] lg:h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//             <div className="flex flex-col items-start space-y-4">
//               <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 93, 1, 0.1)' }}>
             
//                 <Image
//                   src="/assets/icons/bank_mobile.png" 
//                   alt="Mobile Money" 
//                   className="w-6 h-6 sm:w-8 sm:h-8"
//                       width={24}
//                       height={24}
                    
//                     />
//               </div>
//               <div className="space-y-1">
//                 <p className="text-gray-600 text-xs sm:text-sm">Total Mobile Money</p>
//                 <h3 className="text-lg sm:text-xl md:text-2xl font-black">
//                   {globalTotals.totalMobileBalance.toLocaleString()}
//                   <span className="text-lg sm:text-xl md:text-2xl font-light"> XOF</span>
//                 </h3>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}


//       {/* Carte Solde Bancaire */}
//       <div className="col-span-1 w-full">
//         <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-primary h-[160px] sm:h-[180px] lg:h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//           <div className="flex flex-col items-start space-y-4">
//             <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 93, 1, 0.1)' }}>
          
//               <Image
//             src="/assets/icons/bank_card.png" alt="Bank"
//                   className="w-6 h-6 sm:w-8 sm:h-8"
//                       width={24}
//                       height={24}
                    
//                     />
//             </div>
//             <div className="space-y-1">
//               <p className="text-gray-600 text-xs sm:text-sm">Total Solde Bancaire</p>
//               <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
//                 {selectedCountry 
//                   ? `${COUNTRY_BALANCES[selectedCountry].bankBalance.toLocaleString()}` 
//                   : `${globalTotals.totalBankBalance.toLocaleString()}`}
//                 <span className="font-light"> XOF</span>
//               </h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Carte Commissions */}
//       <div className="col-span-1 w-full">
//         <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-primary h-[160px] sm:h-[180px] lg:h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//           <div className="flex flex-col items-start space-y-4">
//             <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 93, 1, 0.1)' }}>
        
//               <Image
//           src="/assets/icons/total_transaction.png" alt="Commissions"
//                   className="w-6 h-6 sm:w-8 sm:h-8"
//                       width={24}
//                       height={24}
                    
//                     />
//             </div>
//             <div className="space-y-1">
//               <p className="text-gray-600 text-xs sm:text-sm">Commission payout</p>
//               <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
//                 {selectedCountry 
//                   ? COUNTRY_BALANCES[selectedCountry].commissions
//                   : globalTotals.totalCommissions}
//               </h3>
//             </div>
//           </div>
//         </div>
//       </div>

//         {/* Carte Reserve */}
//         <div className="col-span-1 w-full">
//         <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-primary h-[160px] sm:h-[180px] lg:h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
//           <div className="flex flex-col items-start space-y-4">
//             <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 93, 1, 0.1)' }}>
        
//               <Image
//           src="/assets/icons/total_transaction.png" alt="Commissions"
//                   className="w-6 h-6 sm:w-8 sm:h-8"
//                       width={24}
//                       height={24}
                    
//                     />
//             </div>
//             <div className="space-y-1">
//               <p className="text-gray-600 text-xs sm:text-sm">Réserve</p>
//               <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
//                 {selectedCountry 
//                   ? COUNTRY_BALANCES[selectedCountry].reserve
//                   : globalTotals.totalReserve}
//               </h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BalanceCards;



import { CalendarIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const BalanceCards = ({ 
  selectedCountry, 
  totalBalance, 
  globalTotals, 
  COUNTRY_BALANCES, 
  accountId, 
  copyToClipboard, 
  copied 
}) => {
  const router = useRouter();
  const balances = useSelector((state) => state?.balances?.balances);
  const isLoading = !balances || balances.length === 0;

  if (!isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Carte Solde Mobile */}
        <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-gray h-[160px] sm:h-[180px] lg:h-[200px] animate-pulse">
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-gray-200 w-12 h-12"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded w-40"></div>
            </div>
          </div>
        </div>

        {/* Carte Solde Bancaire */}
        <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-gray h-[160px] sm:h-[180px] lg:h-[200px] animate-pulse">
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-gray-200 w-12 h-12"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded w-40"></div>
            </div>
          </div>
        </div>

        {/* Carte Commissions */}
        <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-gray h-[160px] sm:h-[180px] lg:h-[200px] animate-pulse">
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-gray-200 w-12 h-12"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded w-40"></div>
            </div>
          </div>
        </div>

        {/* Carte Réserve */}
        <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-gray h-[160px] sm:h-[180px] lg:h-[200px] animate-pulse">
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-gray-200 w-12 h-12"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded w-40"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleRefresh = () => {
    // router.reload();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full">
      {/* Carte Solde Total */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-1">
        <div 
        style={{
          backgroundImage: 'url(/assets/images/background_login.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: '1'
        }}  
          className="bg-primary rounded-[20px] p-4 sm:p-6 text-white relative overflow-hidden border border-primary h-[160px] sm:h-[180px] lg:h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
         
        >
          <div className="absolute inset-0 bg-primary opacity-80"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <p className="text-sm mb-2">Solde Total {selectedCountry && `- ${selectedCountry}`}</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-white font-bold">
                {selectedCountry 
                  ? `${totalBalance.toLocaleString()} `
                  : `${globalTotals.grandTotal.toLocaleString()}`}
                <span className="font-light"> XOF</span>
              </h2>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm">ID du compte</p> 
                <div className="flex items-center gap-2">
                  <p className="text-xs sm:text-xs">273738390303030303003</p>
                  <button 
                    onClick={copyToClipboard}
                    className="hover:bg-orange-500 p-1 rounded-md transition-colors duration-200"
                  >
                    <Image
                      src="/assets/icons/copy_clipboard.png"
                      alt="Copy"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </button>
                  {copied && <span className="text-xs sm:text-sm text-secondary">Copié!</span>} 
                </div>
              </div>
              <div className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2">
                <div className="rounded-lg" style={{ backgroundColor: 'rgba(212, 93, 1, 0.1)' }}>
                  <button 
                    onClick={handleRefresh}
                    className="p-2 sm:px-4 sm:py-3 rounded-lg bg-primary hover:bg-orange-500 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Image
                      src="/assets/icons/refresh.png"
                      alt="Refresh"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carte des dernières 24h */}
      <div className="col-span-1 w-full">
        <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-primary h-[160px] sm:h-[180px] lg:h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex flex-col items-start space-y-4">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 93, 1, 0.1)' }}>
              
              {/* <Image
                src="/assets/icons/24hours.png"
                alt="24 heures"
                className="w-6 h-6 sm:w-8 sm:h-8"
                width={32}
                height={32}
                priority
              /> */}

<CalendarIcon className="w-6 h-6 sm:w-8 sm:h-8" />

            </div>
            <div className="space-y-1">
              <p className="text-gray-600 text-xs sm:text-sm">Dernières 24h</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-black">
                {selectedCountry 
                  ? `${COUNTRY_BALANCES[selectedCountry].last24h.toLocaleString()}`
                  : `${globalTotals.total24h?.toLocaleString()}`}
                <span className="text-lg sm:text-xl md:text-2xl font-light"> XOF</span>
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Cartes Mobile Money */}
      {selectedCountry ? (
        Object.entries(COUNTRY_BALANCES[selectedCountry].mobileBalance).map(([provider, amount]) => (
          <div key={provider} className="col-span-1 w-full">
            <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-primary h-[160px] sm:h-[180px] lg:h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex flex-col items-start space-y-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 93, 1, 0.1)' }}>
                <Image
               src={`/assets/icons/${provider.toLowerCase().replace(' ', '_')}.png`} 
             alt={provider}
              className="w-6 h-6 sm:w-8 sm:h-8"
                width={120}
                height={40}
                priority
             style={{objectFit:"contain"}}
              />
              
                </div>
                <div className="space-y-1">
                  <p className="text-gray-600 text-xs sm:text-sm"> Solde {provider}</p>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black">
                    {amount.toLocaleString()} 
                    <span className="text-lg sm:text-xl md:text-2xl font-light"> XOF</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-1 w-full">
          <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-primary h-[160px] sm:h-[180px] lg:h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex flex-col items-start space-y-4">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 93, 1, 0.1)' }}>
             
                <Image
                  src="/assets/icons/bank_mobile.png" 
                  alt="Mobile Money" 
                  className="w-6 h-6 sm:w-8 sm:h-8"
                      width={24}
                      height={24}
                    
                    />
              </div>
              <div className="space-y-1">
                <p className="text-gray-600 text-xs sm:text-sm">Total Mobile Money</p>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black">
                  {globalTotals.totalMobileBalance.toLocaleString()}
                  <span className="text-lg sm:text-xl md:text-2xl font-light"> XOF</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Carte Solde Bancaire */}
      <div className="col-span-1 w-full">
        <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-primary h-[160px] sm:h-[180px] lg:h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex flex-col items-start space-y-4">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 93, 1, 0.1)' }}>
          
              <Image
            src="/assets/icons/bank_card.png" alt="Bank"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                      width={24}
                      height={24}
                    
                    />
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 text-xs sm:text-sm">Total Solde Bancaire</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                {selectedCountry 
                  ? `${COUNTRY_BALANCES[selectedCountry].bankBalance.toLocaleString()}` 
                  : `${globalTotals.totalBankBalance.toLocaleString()}`}
                <span className="font-light"> XOF</span>
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Carte Commissions */}
      <div className="col-span-1 w-full">
        <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-primary h-[160px] sm:h-[180px] lg:h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex flex-col items-start space-y-4">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 93, 1, 0.1)' }}>
        
              <Image
          src="/assets/icons/total_transaction.png" alt="Commissions"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                      width={24}
                      height={24}
                    
                    />
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 text-xs sm:text-sm">Commission payout</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                {selectedCountry 
                  ? COUNTRY_BALANCES[selectedCountry].commissions
                  : globalTotals.totalCommissions}
              </h3>
            </div>
          </div>
        </div>
      </div>

        {/* Carte Reserve */}
        <div className="col-span-1 w-full">
        <div className="bg-white rounded-[20px] p-4 sm:p-6 shadow-sm border border-primary h-[160px] sm:h-[180px] lg:h-[200px] w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="flex flex-col items-start space-y-4">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(212, 93, 1, 0.1)' }}>
        
              <Image
          src="/assets/icons/total_transaction.png" alt="Commissions"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                      width={24}
                      height={24}
                    
                    />
            </div>
            <div className="space-y-1">
              <p className="text-gray-600 text-xs sm:text-sm">Réserve</p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                {selectedCountry 
                  ? COUNTRY_BALANCES[selectedCountry].reserve
                  : globalTotals.totalReserve}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCards;