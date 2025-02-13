import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../features/layout/layoutSlice';
import { logout } from '../../features/auth/authSlice';
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Bars3Icon, BellIcon, Cog6ToothIcon, ShoppingBagIcon, ChevronDownIcon, ChevronUpIcon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'; // Import de l'icône ChevronDown
import Image from 'next/image';
import { useRouter } from 'next/router';
const PAGE_INFO = {
  '/dashboard': {
    title: 'Tableau de bord',
    description: 'Contrôle votre business en temps réel'
  },
  '/transactions': {
    title: 'Transactions',
    description: 'Gérez et suivez toutes vos transactions FeexPay'
  },
  '/feexlink': {
    title: 'FeexLink',
    description: 'Gérez vos liens de paiement'
  },
  '/feexcorporate': {
    title: 'FeexCorporate',
    description: 'Solutions de paiement pour entreprises'
  },
  '/feexpage': {
    title: 'FeexPage',
    description: 'Personnalisez votre page de paiement'
  },
  '/refunds': {
    title: 'Remboursements',
    description: 'Gérez vos remboursements'
  },
  '/payouts_api': {
    title: 'Payouts Api',
    description: 'Intégrez nos API de paiement'
  },
  '/customers': {
    title: 'Clients',
    description: 'Gérez votre base clients'
  },
  '/payouts': {
    title: 'Reversements',
    description: 'Suivez vos reversements'
  },
  '/developers': {
    title: 'Développeurs',
    description: 'Accédez à la documentation technique'
  },
  '/team': {
    title: 'Équipe',
    description: 'Gérez les membres de votre équipe'
  }
};

const Navbar = ({ onMobileMenuClick, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { data: session, status } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showShopPanel, setShowShopPanel] = useState(false); // État pour le panneau boutique
  const [showProfilePanel, setShowProfilePanel] = useState(false); // État pour le panneau Profil
  const isSidebarCollapsed = useSelector((state) => state.layout.isSidebarCollapsed);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentPageInfo = PAGE_INFO[router.pathname] || {
    title: 'Dashboard',
    description: 'Control your business'
  };

  // Ajouter un effet pour fermer le menu mobile lors de la navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.pathname, setIsMobileMenuOpen]);

  const names = `${session?.user?.profile?.first_name} ${session?.user?.profile?.last_name}`;
  // Vérification et extraction des premières lettres
const initials = `${session?.user?.profile?.first_name?.charAt(0).toUpperCase() || ''}${
  session?.user?.profile?.last_name?.charAt(0).toUpperCase() || ''
}`;

  const toggleShopPanel = () => {
    setShowShopPanel(!showShopPanel);
  };

  const toggleProfilePanel = () => {
    setShowProfilePanel(!showProfilePanel); // Afficher/masquer le panneau profil
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      dispatch(logout());
      router.push('/signin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Fermer les panels si on clique en dehors
      if (!event.target.closest('.shop-panel-container')) {
        setShowShopPanel(false);
      }
      if (!event.target.closest('.profile-panel-container')) {
        setShowProfilePanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm h-16 z-50 w-full">
      <div className="h-full px-4 md:px-6">
        <div className="flex items-center justify-between h-full">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMobileMenuClick}
              className="block lg:hidden -ml-2 p-2 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-500" />
              )}
            </button>

            <div className="hidden lg:flex items-center gap-4">
              <Image
                src="/assets/images/svg/logo.svg"
                alt="Logo Feexpay"
                width={120}
                height={120}
                priority
              />
              <button
                onClick={() => dispatch(toggleSidebar())}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
              {!isSidebarCollapsed ?  <ChevronLeftIcon className="h-6 w-6 text-gray-500 text-secondary " />: <ChevronRightIcon className="h-6 w-6 text-gray-500 text-primary " />}  
              </button>
            </div>

            <div className="text-center md:text-left lg:ml-24">
              <h1 className="text-sm md:text-lg font-bold text-gray-900">{currentPageInfo.title}</h1>
              <p className="text-sm md:text-md  text-gray-500 hidden md:block">{currentPageInfo.description}</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <button>
                <Image
                  src="/assets/icons/fr-fr.png"
                  alt="French"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </button>
            </div>

            <div className="hidden md:flex relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 relative"
              >
                <BellIcon className="h-6 w-6 text-gray-500" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            <div className="hidden md:flex relative">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Cog6ToothIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Ajout de boutique */}
            <div className="relative shop-panel-container">
              <button 
                onClick={toggleShopPanel}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <ShoppingBagIcon className={`h-6 w-6 ${showShopPanel ? 'text-primary' : 'text-gray-500'}`} />
              </button>
              {showShopPanel && (
                <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-lg">
                  <button 
                    className="flex items-center w-full text-left px-4 py-2  hover:bg-orange-burnt"
                    onClick={() => alert('Ajouter une boutique')}
                  >
                  <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-gray-500 mr-3" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8H5a1 1 0 110-2h4V5a1 1 0 112 0v3h4a1 1 0 110 2h-4v3a1 1 0 11-2 0V10z" 
                        clipRule="evenodd" 
                      />
                    </svg>  Ajouter une boutique   
                    
                  </button>
                  <button 
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-orange-burnt"
                    onClick={() => alert('Changer de boutique')}
                  >
                  <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-gray-500 mr-3 " 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M5.293 9.707a1 1 0 011.414 0L10 13.586l3.293-3.879a1 1 0 111.414 1.415l-4 4.707a1 1 0 01-1.414 0l-4-4.707a1 1 0 010-1.415z" 
                        clipRule="evenodd" 
                      />
                      <path 
                        d="M4 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4zm1 2h10v10H5V5z" 
                      />
                    </svg>   Changer de boutique
                   
                  </button>
                </div>
              )}
            </div>

            {/* Profil avec flèche */}
            <div className="relative profile-panel-container">
              <div className="flex items-center gap-3 cursor-pointer" onClick={toggleProfilePanel}>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium">{names}</p>
                  <p className="text-xs text-gray-500">Administrateur</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                  <span className="text-white text-sm">{initials}</span>
                </div>
                {showProfilePanel ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-500 ml-2" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-500 ml-2" />
                )}
              </div>
              {showProfilePanel && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => alert('Voir Profil')}
                  >
                    Profil
                  </button>
                  <button 
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
