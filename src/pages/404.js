import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Redirection automatique après 5 secondes
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-xl w-full px-4 py-8 text-center">
        {/* Animation SVG */}
        <div className="relative mx-auto w-64 h-64 mb-8">
          <div className="absolute inset-0 animate-pulse">
            {/* <svg
              className="w-full h-full text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg> */}
             <Image
              className="w-full h-full text-primary"
                src="/assets/images/svg/logo.svg"
                alt="Logo Feexpay"
                width={120}
                height={120}
                priority
              />
          </div>
        </div>
        
        {/* <Image
                src="/assets/images/svg/logo.svg"
                alt="Logo Feexpay"
                width={120}
                height={120}
                priority
              /> */}
        {/* Texte d'erreur */}
        <Image
              className="w-full h-full text-primary"
                src="/assets/images/404.jpg"
                alt="404 Feexpay"
                width={120}
                height={120}
                priority
              />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page introuvable
        </h2>
        <p className="text-gray-600 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          <br />
          Vous serez redirigé vers la page d'accueil dans quelques secondes...
        </p>

        {/* Boutons d'action */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Retour à l'accueil
          </Link>
          <div className="mt-4">
            <button
              onClick={() => router.back()}
              className="text-primary hover:text-orange-600 font-medium transition-colors duration-200"
            >
              Retourner à la page précédente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
