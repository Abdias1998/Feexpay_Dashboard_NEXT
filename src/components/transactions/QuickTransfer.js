import React from 'react';

const QuickTransfer = () => {
  const quickTransfers = [
    { id: 1, name: 'Lola Shop', email: 'lolashop@example.com' },
    { id: 2, name: 'Leslie House', email: 'lesliehouse@example.com' },
    { id: 3, name: 'Ella Beauty', email: 'ellabeauty@example.com' },
    { id: 4, name: 'Ella Beauty', email: 'ellabeauty@example.com' },  
    { id: 5, name: 'Ella Beauty', email: 'ellabeauty@example.com' },
  ];

  return (
    <div className="mb-8 rounded-[20px] p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Client existant</h3>
      <div className="flex flex-col gap-3 max-w-xs">
        {quickTransfers.map((transfer) => (
          <div key={transfer.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer rounded-lg">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-sm">{transfer.name}</p>
              <p className="text-xs text-gray-500">{transfer.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickTransfer;