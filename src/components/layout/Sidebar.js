import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../features/layout/layoutSlice';
import { 
  Bars3Icon,
  HomeIcon,
  CreditCardIcon,
  LinkIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  CodeBracketIcon,
  UserGroupIcon,
  ChevronDownIcon,
  UsersIcon,
  ArrowsRightLeftIcon,
  WrenchScrewdriverIcon,
  } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: HomeIcon },
  { name: 'Transactions', href: '/transactions', icon: CreditCardIcon },
  { name: 'FeexLink', href: '/feexlink', icon: LinkIcon },
  { name: 'FeexCorporate', href: '/feexcorporate', icon: BuildingOfficeIcon },
  { name: 'FeexPage', href: '/feexpage', icon: DocumentTextIcon },
  { name: 'Remboursements', href: '/refunds', icon: ArrowPathIcon },
  { 
    name: 'Payouts Api', 
    href: '/payouts_api', 
    icon: CodeBracketIcon, 
    isPanel: true,
    subItems: [
      { name: 'Liste', href: '/payouts_api/list' }
    ]
  },
];

const navigation_second = [
  { name: 'Clients', href: '/customers', icon: UsersIcon }, 
  { name: 'Reversements', href: '/payouts', icon: ArrowsRightLeftIcon },
  { 
    name: 'Développeurs', 
    href: '/developers', 
    icon: WrenchScrewdriverIcon, 
    isPanel: true,
    subItems: [
      { name: 'Webhook', href: '/developers/webhook' }
    ]
  },
  { name: 'Equipe', href: '/team', icon: UserGroupIcon },
]

export default function Sidebar({ isOpen, onClose }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isSidebarCollapsed = useSelector((state) => state.layout.isSidebarCollapsed);

  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 lg:hidden ${isOpen ? '' : 'hidden'}`}>
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75" 
          onClick={onClose} 
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <SidebarContent 
            currentPath={router.pathname} 
            isCollapsed={false}
            onCloseMobileMenu={onClose}
            isMobile={true}
          />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
      }`}>
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <SidebarContent 
            currentPath={router.pathname} 
            isCollapsed={isSidebarCollapsed}
            isMobile={false}
          />
        </div>
      </div>
    </>
  );
}

function SidebarContent({ currentPath, isCollapsed, onCloseMobileMenu, isMobile }) {
  const dispatch = useDispatch();
  const [expandedPanels, setExpandedPanels] = useState({});
  const [activeToggle, setActiveToggle] = useState('live'); 

  const togglePanel = (itemName, e) => {
    e.preventDefault();
    setExpandedPanels(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const renderNavItem = (item) => {
    const isActive = currentPath === item.href || 
      (item.subItems && item.subItems.some(sub => currentPath === sub.href));
    
    return (
      <div key={item.name}>
        <Link
          href={item.href}
          // style={{
          //   backgroundColor: isActive ? 'rgba(212, 93, 1, 0.1)' : 'transparent',
          //   textDecoration: isActive ? 'none' : 'none',
          // }} 
          className={`${
            isActive
              ? 'bg-orange-burnt text-primary hover:no-underline'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 transparent hover:no-underline' 
          }  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${isCollapsed ? 'flex items-center justify-center' : ''}`}
        >
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''} w-full`}>
            <item.icon
              className={`${
                isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-500'
              } flex-shrink-0 h-6 w-6`}
              aria-hidden="true"
            />
            {!isCollapsed && (
              <div className="flex items-center justify-between flex-1 ml-4">
                <span>{item.name}</span>
                {item.isPanel && (
                  <button
                    onClick={(e) => togglePanel(item.name, e)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-transform duration-200"
                    style={{
                      transform: expandedPanels[item.name] ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  </button>
                )}
              </div>
            )}
          </div>
        </Link>
        
        {/* Sous-liens du panel */}
        {!isCollapsed && item.isPanel && expandedPanels[item.name] && (
          <div className="ml-12 mt-1 space-y-1">
            {item.subItems.map((subItem) => (
              <Link
                key={subItem.name}
                href={subItem.href}
                style={{
                  backgroundColor: currentPath === subItem.href ? 'rgba(212, 93, 1, 0.1)' : 'transparent',
                  textDecoration: currentPath === subItem.href ? 'none' : 'none',
                }} 
                className={`${
                  currentPath === subItem.href
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } block px-3 py-2 rounded-md text-sm transition-colors duration-200`}
              >
                {subItem.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`flex flex-1 flex-col pt-5 pb-4 ${!isCollapsed ? '':""}`}>
      <div className="flex flex-shrink-0 items-center justify-between px-4">
        <div className="flex-shrink-0">
          <Image
            src="/assets/images/svg/logo.svg"
            alt="Logo"
            width={isCollapsed ? 40 : 120}
            height={40}
            priority
            className="transition-all duration-300"
          />
        </div>
        {!isMobile && (
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Bars3Icon className="h-6 w-6 text-gray-500" />
          </button>
        )}
      </div>

      <nav className="mt-12 flex-1 space-y-3 bg-white px-2">
        {navigation.map(renderNavItem)}
        <hr className="my-4 border-gray-200" />
        {navigation_second.map(renderNavItem)}

        {/* Test/Live Toggle */}
        {!isCollapsed && (
          <div className="mt-auto px-2 py-4">
            <div className="flex rounded-full bg-[#757575] overflow-hidden">
              <button 
                onClick={() => setActiveToggle('test')}
                className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                  activeToggle === 'test' 
                    ? 'bg-white text-primary' 
                    : 'bg-[#757575] text-gray-900'
                }`}
              >
                Test
              </button>
              <button 
                onClick={() => setActiveToggle('live')}
                className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                  activeToggle === 'live' 
                    ? 'bg-white' 
                    : 'bg-[#757575]'
                } text-primary`}
              >
                Live
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}