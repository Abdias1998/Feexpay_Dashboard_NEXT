import React, { useState, useEffect } from 'react';
import TransactionFilter from './TransactionFilter';
import { useSelector } from 'react-redux';
import { tr } from 'date-fns/locale';
import { useSession } from 'next-auth/react';
// import { formatDate } from '../../hooks/dateFormat';

const TransactionTable = () => {
  const { data: session, status } = useSession();
  const transactions = useSelector(state => state?.transactions?.transactions);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: { start: null, end: null },
    networks: ['all'],
    status: ['all'],
    type: ['all']
  });


  const taxe_array = {
    "MTN": 1.7,
    "MOOV": 1.7,
    "MOOV TG": 3,
    "TOGOCOM TG": 3,
    "ORANGE CI": 2.9,
    "MTN CI": 2.9,
    "MOOV CI": 2.9,
    "ORANGE SN": 1.9,
    "FREE SN": 1.9,
    "MOOV BF": 3.2,
    "ORANGE BF": 3.9,
    "VISA": 4.5,
    "MASTERCARD": 4.5,
    "AMEX": 4.5,
    "GOOGLE PAY": 4.5,
    "APPLE PAY": 4.5,
  };

  function formatDateWithHourOffset(dateString, offsetHours = 1) {
    // Crée un objet Date à partir de la chaîne UTC
    const date = new Date(dateString);
  
    // Ajoute l'offset (par défaut 1 heure)
    date.setUTCHours(date.getUTCHours() + offsetHours);
  
    // Récupère les composants de la date
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
  
    // Récupère les composants de l'heure
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
    // Construit la chaîne formatée
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  
  // // Exemple d'utilisation
  // const isoDate = "2024-12-10T12:04:36.722Z";
  // const formattedDate = formatDateWithHourOffset(isoDate);
  // console.log(formattedDate); // 10/12/2024 13:04:36
  
  const calculateCommission = (reseau, amount, commissionAmount) => {
    // Récupération des informations de la boutique depuis les cookies
  const shopInfo = session?.user?.shops[1]
  
    let commission = 0; 
   
  
    let taxe = taxe_array[reseau] || 1.7;
  
    if (shopInfo?.taxe_collection !== undefined && shopInfo?.taxe_collection !== null) {
      taxe = shopInfo.taxe_collection;
    }
    
    if (shopInfo?.without_taxe === true) {
      const montantTotal = Number(amount) * Number(taxe / 100);
      commission = commissionAmount;
      // commission = montantTotal - Number(amount);
    }
    console.log(taxe,shopInfo?.taxe_collection,commissionAmount,commission);
  
    return Math.ceil(commission);
  };
  useEffect(() => {
    if (transactions?.queryset !== undefined) {
      setIsLoading(false);
    }
  }, [transactions]);

  useEffect(() => {
    if (!transactions?.queryset || !Array.isArray(transactions.queryset)) {
      setFilteredTransactions([]);
      return;
    }
    
    let filtered = transactions.queryset.filter(transaction => {
      if (!transaction) return false;

      // Filter by network
      const networkFilter = filters.networks.includes('all') || filters.networks.length === 0 || filters.networks.includes(transaction?.reseau);
      if (!networkFilter) return false;

      // Filter by status
      const statusFilter = filters.status.includes('all') || filters.status.length === 0 || filters.status.includes(transaction?.status);
      if (!statusFilter) return false;

      // Filter by type
      const typeFilter = filters.type.includes('all') || filters.type.length === 0 || filters.type.includes(transaction?.type);
      if (!typeFilter) return false;

      // Filter by date range
      if (filters.dateRange.start || filters.dateRange.end) {
        const transactionDate = new Date(transaction.date);
        
        if (filters.dateRange.start && transactionDate < filters.dateRange.start) {
          return false;
        }
        
        if (filters.dateRange.end && transactionDate > filters.dateRange.end) {
          return false;
        }
      }

      return true;
    });

    // Apply search filter if there is a search term
    if (searchTerm) {
      filtered = filtered.filter(transaction => {
        const searchableValues = [
          transaction.first_name,
          transaction.email,
          transaction.phoneNumber,
          transaction.reference,
          transaction.type,
          transaction.status,
          transaction.amount,
        ].filter(Boolean);

        return searchableValues.some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    
    setFilteredTransactions(filtered);
  }, [filters, transactions, searchTerm]);

  // Calculer l'index de début et de fin pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= totalPages) {
      setCurrentPage(value);
    }
  };

  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Réinitialiser à la page 1 quand les filtres changent
  };

  return (
    <div className="mb-8 rounded-[20px] p-6 shadow-sm border border-gray-200 ">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-medium">Transactions</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(true)} 
              className="flex items-center gap-2 text-xs hover:bg-gray-50 px-3 py-2 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              Filter
            </button>
            <TransactionFilter
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              onApplyFilter={handleApplyFilter}
            />
          </div>
          <button className="flex items-center gap-2 text-xs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Exporter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {/* Desktop view */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="bg-orange-burnt">
                <th className="text-left p-2 text-xs font-medium text-gray-600">Status</th>
                <th className="text-left p-2 text-xs font-medium text-gray-600">Montant</th>
                <th className="text-left p-2 text-xs font-medium text-gray-600">Commission</th>
                <th className="text-left p-2 text-xs font-medium text-gray-600">Client</th>
                <th className="text-left p-2 text-xs font-medium text-gray-600">Numéro</th>
                <th className="text-left p-2 text-xs font-medium text-gray-600">Référence</th>
                <th className="text-left p-2 text-xs font-medium text-gray-600">Email</th>
                <th className="text-left p-2 text-xs font-medium text-gray-600">Type</th>
                <th className="text-left p-2 text-xs font-medium text-gray-600">Date</th>
                <th className="text-left p-2 text-xs font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // Skeleton loader
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="p-4"><div className="h-6 bg-gray-200 rounded w-16"></div></td>
                    <td className="p-4"><div className="h-6 bg-gray-200 rounded w-20"></div></td>
                    <td className="p-4"><div className="h-6 bg-gray-200 rounded w-20"></div></td>
                    <td className="p-4"><div className="h-6 bg-gray-200 rounded w-24"></div></td>
                    <td className="p-4"><div className="h-6 bg-gray-200 rounded w-28"></div></td>
                    <td className="p-4"><div className="h-6 bg-gray-200 rounded w-32"></div></td>
                    <td className="p-4"><div className="h-6 bg-gray-200 rounded w-40"></div></td>
                    <td className="p-4"><div className="h-6 bg-gray-200 rounded w-16"></div></td>
                    <td className="p-4"><div className="h-6 bg-gray-200 rounded w-24"></div></td>
                    <td className="p-4"><div className="h-6 bg-gray-200 rounded w-16"></div></td>
                  </tr>
                ))
              ) : currentItems?.length === 0 ? (
                // Message quand il n'y a pas de données
                <tr>
                  <td colSpan="10" className="text-center py-8 text-gray-500">
                    Aucune donnée à afficher
                  </td>
                </tr>
              ) : (
                // Affichage normal des données
                currentItems?.map((transaction, index) => (
                  <tr key={transaction?._id} className={`border-b hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-md text-xs ${
                        transaction?.status === 'SUCCESSFUL' ? 'bg-green-100 text-green-800' :transaction?.status === 'FAILED' ? 'bg-red-100 text-red-800' : transaction?.status === 'PENDING' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction?.status === 'SUCCESSFUL' ? 'SUCCES' :transaction?.status === 'FAILED' ? 'ECHEC' : transaction?.status === 'PENDING' ? 'EN COURS' : 'ECHEC'}
                      </span>
                    </td>
                    <td className="p-2 text-xs">{transaction?.amount}</td>

{/* 
                    <td className="p-2 text-xs">{calculateCommission(transaction?.reseau,transaction?.amount, transaction?.commission_amount)}</td> */}
                    <td className="p-2 text-xs">{transaction?.commission_amount}</td>


                    <td className="p-2">
                      <div className="flex items-center gap-3">
                      
                        <span className="text-xs">{transaction?.first_name}</span>
                      </div>
                    </td>
                    <td className="p-2 text-xs">{transaction?.phoneNumber}</td>

                    <td className="p-2 text-xs font-mono">{transaction?.reference}</td>
                    <td className="p-2 text-xs">{transaction?.email || ''}</td>
                    <td className="p-2 text-xs">{transaction?.type}</td>
                 
                
                
                    <td className="p-2 text-xs">{formatDateWithHourOffset(transaction?.date)}</td>
                 
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden space-y-4">
          {isLoading ? (
            // Skeleton loader mobile
            [...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 space-y-3 animate-pulse">
                <div className="flex justify-between">
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : currentItems?.length === 0 ? (
            // Message pour mobile quand il n'y a pas de données
            <div className="text-center py-8 text-gray-500">
              Aucune donnée à afficher
            </div>
          ) : (
            // Affichage normal des données mobile
            currentItems?.map((transaction, index) => (
              <div key={transaction?._id} className={`bg-white rounded-xl p-2 shadow-sm border border-gray-100 space-y-3 ${index % 2 === 1 ? 'bg-gray-50' : ''}`}>
                {/* Header with client and status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{transaction?.first_name}</h3>
                      <p className="text-xs text-gray-500">{transaction?.date}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    transaction?.status === 'SUCCESSFUL' ? 'bg-green-100 text-green-800' :transaction?.status === 'FAILED' ? 'bg-red-100 text-red-800' : transaction?.status === 'PENDING' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                  }`}>
                     {transaction?.status === 'SUCCESSFUL' ? 'SUCCES' :transaction?.status === 'FAILED' ? 'ECHEC' : transaction?.status === 'PENDING' ? 'EN COURS' : 'ECHEC'}
                  </span>
                </div>

                {/* Transaction details */}
                <div className="space-y-3">
                  {/* Email */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-xs font-medium">{transaction?.email || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110-2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="text-xs font-medium">{transaction?.type}</p>
                    </div>
                  </div>

                  {/* Phone number */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Numéro</p>
                      <p className="text-xs font-medium">{transaction?.phoneNumber}</p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Montant</p>
                      <p className="text-xs font-medium">{transaction?.amount}</p>
                    </div>
                  </div>

                  {/* Commission */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Commission</p>
                      <p className="text-xs font-medium">{transaction?.commission_amount}</p>
                    </div>
                  </div>

                  {/* Reference */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Référence</p>
                      <p className="text-xs font-medium">{transaction?.reference}</p>
                    </div>
                  </div>
                </div>
              

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                  <button className="p-2 hover:bg-gray-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0111 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-2 mt-6">
        <button 
          onClick={() => handlePageChange(1)}
          className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Aller à la page 1
        </button>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-8 h-8 rounded border border-gray-300 ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Page</span>
            <input 
              type="number" 
              className="w-12 h-8 text-center border border-gray-300 rounded text-xs" 
              value={currentPage}
              onChange={handleInputChange}
              min={1}
              max={totalPages}
            />
            <span className="text-xs text-gray-600">sur {totalPages}</span>
          </div>
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-8 h-8 rounded border border-gray-300 ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-primary text-white rounded text-xs ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500'
            }`}
          >
            Page suivante
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;