import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useClickAway } from 'react-use';

const TransactionFilter = ({ isOpen, onClose, onApplyFilter }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedNetworks, setSelectedNetworks] = useState(['all']);
  const [selectedStatus, setSelectedStatus] = useState(['all']);
  const [selectedType, setSelectedType] = useState(['all']);
  const filterRef = useRef(null);

  useClickAway(filterRef, () => {
    if (isOpen) {
      onClose();
    }
  });

  const networks = [
    { id: 'all', label: 'Tous les réseaux' },
    { id: 'MTN CG', label: 'MTN Congo' },
    { id: 'WAVE CI', label: 'Wave CI' },
    { id: 'MOOV', label: 'Moov' },
    { id: 'CELTIIS BJ', label: 'Celtis' },
    { id: 'moov_togo', label: 'MOOV Togo' },
    { id: 'togocom', label: 'Togocom' },
    { id: 'mtn_ci', label: 'MTN CI' },
    { id: 'moov_ci', label: 'MOOV CI' },
    { id: 'orange_ci', label: 'Orange CI' },
  ];

  const statuses = [
    { id: 'all', label: 'Tous les statuts' },
    { id: 'SUCCESSFUL', label: 'Succès' },
    { id: 'PENDING', label: 'En cours' },
    { id: 'FAILED', label: 'Echec' },
  ];

  const types = [
    { id: 'all', label: 'Tous les types' },
    { id: 'Recharge', label: 'Recharge' },
    { id: 'Paiment', label: 'Paiement' },
    { id: 'FeexLink', label: 'FeexLink' },
    { id: 'Reserve', label: 'Reserve' },
    { id: 'Feexcorporate', label: 'Feexcorporate' },
    { id: 'FeexPage', label: 'FeexPage' },
  ];

  const handleNetworkChange = (networkId) => {
    if (networkId === 'all') {
      setSelectedNetworks(['all']);
    } else {
      const newSelection = selectedNetworks.includes(networkId)
        ? selectedNetworks.filter(id => id !== networkId)
        : [...selectedNetworks.filter(id => id !== 'all'), networkId];
      setSelectedNetworks(newSelection.length ? newSelection : ['all']);
    }
  };

  const handleStatusChange = (statusId) => {
    if (statusId === 'all') {
      setSelectedStatus(['all']);
    } else {
      const newSelection = selectedStatus.includes(statusId)
        ? selectedStatus.filter(id => id !== statusId)
        : [...selectedStatus.filter(id => id !== 'all'), statusId];
      setSelectedStatus(newSelection.length ? newSelection : ['all']);
    }
  };

  const handleTypeChange = (typeId) => {
    if (typeId === 'all') {
      setSelectedType(['all']);
    } else {
      const newSelection = selectedType.includes(typeId)
        ? selectedType.filter(id => id !== typeId)
        : [...selectedType.filter(id => id !== 'all'), typeId];
      setSelectedType(newSelection.length ? newSelection : ['all']);
    }
  };

  const handleApplyFilter = () => {
    onApplyFilter({
      dateRange: {
        start: startDate,
        end: endDate
      },
      networks: selectedNetworks.includes('all') ? [] : selectedNetworks,
      status: selectedStatus.includes('all') ? [] : selectedStatus,
      type: selectedType.includes('all') ? [] : selectedType
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={filterRef} className="fixed inset-0 bg-black bg-opacity-50 z-40 md:bg-transparent md:inset-auto">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-[90%] md:w-[300px] md:left-[-50px] md:translate-x-0 top-20 md:top-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Filtrer</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Date Range */}
            <div>
              <h4 className="text-sm font-medium mb-2">Date</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Du:</label>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="w-full p-1.5 text-sm border rounded focus:ring-orange-500 focus:border-orange-500"
                    dateFormat="dd-MM-yyyy"
                    placeholderText="01-01-2023"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Au:</label>
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="w-full p-1.5 text-sm border rounded focus:ring-orange-500 focus:border-orange-500"
                    dateFormat="dd-MM-yyyy"
                    placeholderText="29-11-2024"
                  />
                </div>
              </div>
            </div>

            {/* Networks */}
            <div>
              <h4 className="text-sm font-medium mb-2">Réseau</h4>
              <div className="space-y-1.5 max-h-[150px] overflow-y-auto">
                {networks.map(network => (
                  <label key={network.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedNetworks.includes(network.id)}
                      onChange={() => handleNetworkChange(network.id)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm">{network.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <h4 className="text-sm font-medium mb-2">Statut</h4>
              <div className="space-y-1.5 max-h-[150px] overflow-y-auto">
                {statuses.map(status => (
                  <label key={status.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedStatus.includes(status.id)}
                      onChange={() => handleStatusChange(status.id)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm">{status.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type */}
            <div>
              <h4 className="text-sm font-medium mb-2">Type</h4>
              <div className="space-y-1.5 max-h-[150px] overflow-y-auto">
                {types.map(type => (
                  <label key={type.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedType.includes(type.id)}
                      onChange={() => handleTypeChange(type.id)}
                      className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={handleApplyFilter}
              className="px-3 py-1.5 text-xs bg-primary text-white rounded hover:bg-orange-700"
            >
              Appliquer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilter;
