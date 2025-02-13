import React from 'react';

const CreateTransaction = () => {
  return (
    <div className="flex items-center gap-4 mb-8">
    <h4 className="text-xs md:text-lg font-semibold">Créer une transaction</h4>
    <button className="bg-primary text-white px-4 py-2 rounded-[20px] flex items-center gap-2 hover:bg-orange-500 ">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
      Mobile
    </button>
    {/* <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-orange-500">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
      </svg>
      Lien de paiement
    </button> */}
  </div>
  
  );
};

export default CreateTransaction;
