// import { useSelector } from "react-redux";

// const COUNTRY_DATA = [
//   { code: 'BJ', name: 'Bénin', flag: '🇧🇯' },
//   { code: 'BF', name: 'Burkina-Faso', flag: '🇧🇫' },
//   { code: 'CM', name: 'Cameroun', flag: '🇨🇲' },
//   { code: 'CG', name: 'Congo Brazzaville', flag: '🇨🇬' },
//   { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮' },
//   { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
//   { code: 'SN', name: 'Sénégal', flag: '🇸🇳' },
//   { code: 'TG', name: 'Togo', flag: '🇹🇬' },
// ];
// const CountrySelector = ({ selectedCountry, setSelectedCountry }) => {
//   const balances = useSelector((state) => state?.balances?.balances);
//   const isLoading = !balances || balances.length === 0;

//   if (isLoading) {
//     return (
//       <div className="flex justify-end mt-4">
//         <div className="relative w-full sm:w-64 mb-4 animate-pulse">
//           <div className="block w-full h-10 bg-gray-200 rounded-[60px]"></div>
//         </div>
//       </div>
//     );
//   }
//   return (
    
//     <div className="flex justify-end mt-4">
//       <div className="relative w-full sm:w-64 mb-4">
//         <select
//           value={selectedCountry}
//           onChange={(e) => setSelectedCountry(e.target.value)}
//           className="block w-full pl-10 pr-4 py-2.5 text-base border border-primary focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm md:text-md rounded-[60px] appearance-none bg-white shadow-sm"
//           >
//           <option value="" className="py-2 text-sm md:text-md">Sélectionner un pays</option>
//           {COUNTRY_DATA.map((country) => (
//             <option 
//               key={country.code} 
//               value={country.name}
//               className="flex items-center gap-2 py-2 text-sm md:text-md"
//             >
//               {`${country.flag} ${country.name}`}
//             </option>
//           ))}
//         </select>
//         <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//           <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CountrySelector;



import { useSelector } from "react-redux";

const COUNTRY_DATA = [
  { code: 'BJ', name: 'Bénin', flag: '🇧🇯' },
  { code: 'BF', name: 'Burkina-Faso', flag: '🇧🇫' },
  { code: 'CM', name: 'Cameroun', flag: '🇨🇲' },
  { code: 'CG', name: 'Congo Brazzaville', flag: '🇨🇬' },
  { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'SN', name: 'Sénégal', flag: '🇸🇳' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬' },
];
const CountrySelector = ({ selectedCountry, setSelectedCountry }) => {
  const balances = useSelector((state) => state?.balances?.balances);
  const isLoading = !balances || balances.length === 0;

  if (!isLoading) {
    return (
      <div className="flex justify-end mt-4">
        <div className="relative w-full sm:w-64 mb-4 animate-pulse">
          <div className="block w-full h-10 bg-gray-200 rounded-[60px]"></div>
        </div>
      </div>
    );
  }
  return (
    
    <div className="flex justify-end mt-4">
      <div className="relative w-full sm:w-64 mb-4">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="block w-full pl-10 pr-4 py-2.5 text-base border border-primary focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm md:text-md rounded-[60px] appearance-none bg-white shadow-sm"
          >
          <option value="" className="py-2 text-sm md:text-md">Sélectionner un pays</option>
          {COUNTRY_DATA.map((country) => (
            <option 
              key={country.code} 
              value={country.name}
              className="flex items-center gap-2 py-2 text-sm md:text-md"
            >
              {`${country.flag} ${country.name}`}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default CountrySelector;

