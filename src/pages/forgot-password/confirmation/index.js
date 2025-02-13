import { useState, useEffect } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { generateMetadata } from '../../../utils/metadata';
import { getCsrfToken } from "next-auth/react";
import { EyeIcon, EyeSlashIcon,EnvelopeIcon,LockClosedIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

// Composant principal
export default function ResetPasswordConfirmation() {
    const router = useRouter();
    const { email } = router.query; // Récupérer l'email depuis les paramètres de la requête

    useEffect(() => {
        if (email) {
            // Vous pouvez maintenant utiliser l'email ici
            // console.log('Email récupéré :', email);
        }
    }, [email]);

    const handleResendEmailResetPassword = async () => {
        if (!email) return;

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/users/resend-mail-resetpassword`,
            {
                    email: email,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response && response.data) {
                console.log(response.data);
            } else {
                console.log('No response');
            }
        } catch (error) {
            console.log('Erreur:', error);
            if (error.response) {
                console.log('Erreur du serveur : ' + (error.response.data.message || 'Veuillez réessayer.'));
            } else if (error.request) {
                console.log('Problème de connexion au serveur. Veuillez réessayer.');
            } else {
                console.log('Une erreur inattendue est survenue. Veuillez réessayer.');
            }
        }
    };

  return (
    <div className="min-h-screen flex flex-col md:flex-row m-4 rounded-[40px] ">
        {/* Left side with orange background and welcome text */}
        <div style={{
            backgroundImage: 'url(/assets/images/background_login.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: '0.95'
            }} className="flex-1 hidden md:flex items-center justify-center p-8 rounded-tl-[40px] rounded-bl-[40px] shadow ">
            <div className="text-white max-w-xl">
            <h1 className="text-6xl text-white font-black mb-4">Confirmation</h1>
            <p className="text-xl">Confirmez d'adresse mail</p>
            </div>
        </div>

      {/* Côté droit (fond blanc) */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white xs:rounded-[40px] md:rounded-bl-none md:rounded-tr-[40px] md:rounded-br-[40px]">
        <div className="w-full max-w-md text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center items-center">
            <Image
              src="/assets/images/svg/logo.svg" 
              alt="FeexPay"
              width={150}
              height={150}
            />
          </div>
          <h2 className="text-lg font-bold mb-6">Confirmation</h2>

          {/* Icône de confirmation */}
          <div className="flex justify-center items-center ">
            
            <img
            src="/assets/images/icons_check-fill.png" 
            alt="Icône de vérification"
            className="h-24 w-24"
            />
                
          </div>

          <p className="text-gray-700 mb-2">
            Nous avons envoyé un mail de confirmation à l'adresse
          </p>
            {email ? (
                <p className="text-gray-700 mb-2">{email.substr(0,2)}*******{email.substr(-11)}.</p>
            ) : (
                <p className="text-gray-700 mb-2">qh******@gmail.com.</p>
            )}

          <p className="text-lg font-bold mb-8">
            Veuillez vérifier votre boîte mail ou vos spams.
          </p>

          <p className="text-gray-700">Vous n'avez pas reçu le mail?</p>
          <button onClick={handleResendEmailResetPassword} className="text-orange-500 font-bold hover:underline">
            Renvoyer le mail
          </button>
        </div>
      </div>
    </div>
  );
}

// Fonction pour récupérer le CSRF Token
export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      csrfToken,
    },
  };
}
