import React from 'react';

const CreateFeexLink = () => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h3 className="text-md font-semibold">Créer un nouveau lien</h3>
      <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Lien de paiement
      </button>
    </div>
  );
};

export default CreateFeexLink;
