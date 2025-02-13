import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { generateMetadata } from '../utils/metadata';
import Chatbot from '../components/common/Chatbot';

export const metadata = generateMetadata({
  title: 'Accueil',
  description: 'Bienvenue sur le tableau de bord FeexPay - Gérez vos paiements en toute simplicité',
  keywords: 'feexpay, dashboard, paiements, accueil',
});

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    // Afficher un écran de chargement pendant que l'état de la session est vérifié
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  // Afficher la page d'accueil pour les utilisateurs non connectés
  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen flex flex-col md:flex-row m-4 rounded-[40px] overflow-hidden shadow-lg">
        {/* Left side with background image and welcome text */}

        <div className="flex-1 flex items-center justify-center p-8 bg-gray-100">
          <div className="w-full max-w-md text-center">
            <div className="mb-8 flex justify-center items-center">
              <img src="/assets/images/svg/logo.svg" alt="FeexPay" className="h-10" />
              
            </div>
            <h1 className="mb-8 justify-center items-center text-center text-4xl">
              Votre passerelle de paiement <span className='text-primary'>rapide</span> et <span className='text-primary'>sécurisée</span>
            </h1>
            <div className="space-y-4">
              <button
                onClick={() => router.push('/signin')}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-orange-500"
              >
                Démarrer
              </button>
            </div>
          </div>
        </div>


        {/* Right side with buttons and additional information */}
        <div
          style={{
            backgroundImage: 'url(/assets/images/home_picture.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'justify',
            backgroundRepeat: 'no-repeat',
            opacity: '0.95',
          }}
          className="flex-1 flex items-center justify-center p-8"
        >
        </div>

        <Chatbot />
      </div>
    );
  }

  // Par défaut, un écran de chargement ou un fallback est affiché (ne devrait pas être atteint)
  return null;
}
