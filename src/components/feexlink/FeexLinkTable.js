import { CopyIcon } from '@chakra-ui/icons';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';

const FeexLinkTable = () => {
    const feexlinks = [
        {
            id: 1,
            client: 'Lola Shop',
            numero: '229 016 121 535 6',
            montant: '15.000.000',
            commission: '15.000',
            reference: '0BLYNWMoDgzMofStn',
            date: '06/08/2024 12:44:49',
            type: 'FeexLink',
            status: 'Valide',
            moyenPaiement: 'Carte bancaire',
        },
        {
            id: 2,
            client: 'Leslie House',
            numero: '229 016 121 535 6',
            montant: '15.000.000',
            commission: '15.000',
            reference: '0BLYNWMoDgzMofStn',
            date: '06/08/2024 12:44:49',
            type: 'FeexLink',
            status: 'Valide',
            moyenPaiement: 'Mobile Money',
        },
        {
            id: 3,
            client: 'Ella Beauty',
            numero: '229 016 121 535 6',
            montant: '15.000.000',
            commission: '15.000',
            reference: '0BLYNWMoDgzMofStn',
            date: '06/08/2024 12:44:49',
            type: 'FeexLink',
            status: 'Expiré',
            moyenPaiement: 'Virement bancaire',
        },
    ];

    return (
        <div className="mb-8 rounded-[20px] p-6 shadow-sm border border-gray-200">
         
            <div className="flex justify-between items-center mb-6">
            <button className="bg-orange-burnt text-primary px-4 py-2 rounded-lg flex items-center gap-2 ">
       
      Actualiser  <FiRefreshCw/>
      </button>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                        </svg>
                        Filter
                    </button>
                    <button className="flex items-center gap-2 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Exporter
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-orange-burnt">
                            <th className="text-left p-4 text-sm font-medium text-gray-600">Référence du lien</th>
                            <th className="text-left p-4 text-sm font-medium text-gray-600">Montant</th>
                            <th className="text-left p-4 text-sm font-medium text-gray-600">Utilisateur</th>
                            <th className="text-left p-4 text-sm font-medium text-gray-600">Moyen de paiement</th>
                            <th className="text-left p-4 text-sm font-medium text-gray-600">Date</th>
                            <th className="text-left p-4 text-sm font-medium text-gray-600">Type</th>
                            <th className="text-left p-4 text-sm font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feexlinks?.map((transaction) => (
                            <tr key={transaction.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">
                                    <span className="text-sm">{transaction.reference}</span>
                                </td>
                                <td className="p-4 text-sm">{transaction.montant}</td>
                                <td className="p-4 text-sm">{transaction.client}</td>
                                <td className="p-4 text-sm">{transaction.moyenPaiement}</td>
                                <td className="p-4 text-sm">{transaction.date}</td>
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs ${
                                            transaction.status === 'Valide' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {transaction.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                      <button>

                                            <EyeIcon className='w-4 h-4' />
                                      </button>
                                      <button>

                                <CopyIcon className='w-4 h-4' />
                                      </button>
                                   
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default FeexLinkTable;
