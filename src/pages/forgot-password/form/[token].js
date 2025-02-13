import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { generateMetadata } from '../../../utils/metadata';
import { getCsrfToken } from "next-auth/react";
import { EyeIcon, EyeSlashIcon,EnvelopeIcon,LockClosedIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import axios from "axios";

export const metadata = generateMetadata({
title: 'Connexion',
description: 'Connectez-vous à votre compte FeexPay',
robots: 'noindex, nofollow' // Protection de la page de connexion
});


export default function FormResetPassword({csrfToken}) {
const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
});
const [errors, setErrors] = useState({});
const [submitError, setSubmitError] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const router = useRouter();
const dispatch = useDispatch();
const { data: session } = useSession();

useEffect(() => {
    if (session) {
    router.push('/');
    }
}, [session, router]);

const validateForm = () => {
    const newErrors = {};

    // Validation de l'email
    //if (!formData.email) {
    //newErrors.email = 'L\'email est requis';
    //} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //newErrors.email = 'Email invalide';
    //}

    //Validation du mot de passe
    if (!formData.password) {
    newErrors.password = 'Le mot de passe est requis';
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
    newErrors.password = 'Le mot de passe doit contenir au moins une lettre minuscule';
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
    newErrors.password = 'Le mot de passe doit contenir au moins une lettre majuscule';
    } else if (!/(?=.*\d)/.test(formData.password)) {
    newErrors.password = 'Le mot de passe doit contenir au moins un chiffre';
    } else if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(formData.password)) {
    newErrors.password = 'Le mot de passe doit contenir au moins un caractère spécial';
    }
        else if (formData.password.length < 8) {
    newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    return newErrors;
};


const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
    ...prev,
    [name]: value
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
    setErrors(prev => ({
        ...prev,
        [name]: ''
    }));
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError('');

    if (!navigator.onLine) {
    setSubmitError('Vous êtes hors ligne. Veuillez vérifier votre connexion Internet.');
    setIsLoading(false);
    return;
    }

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
    setIsLoading(false);
    return;
    }

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/users/verify-mail-resetpassword`,
            {
                email: formData.email,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // Vérifie la réponse du serveur
        if (response && response.data) {
            console.log(response.data);
            router.push('/forgot-password/confirmation');
        } else {
            // Si la réponse est vide ou incorrecte
            setSubmitError('Aucune réponse valide reçue du serveur.');
        }
    } catch (error) {
        // Gestion des erreurs avec affichage
        console.error(error);
        // Vérifie si l'erreur est un problème réseau ou autre
        if (error.response) {
            setSubmitError('Erreur du serveur : ' + (error.response.data.message || 'Veuillez réessayer.'));
        } else if (error.request) {
            setSubmitError('Problème de connexion au serveur. Veuillez réessayer.');
        } else {
            setSubmitError('Une erreur inattendue est survenue. Veuillez réessayer.');
        }
    } finally {
        setIsLoading(false);
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
        <h1 className="text-6xl text-white font-black mb-4">Bienvenu(e)</h1>
        <p className="text-xl">Connectez-vous pour accéder à votre tableau de bord</p>
        </div>
    </div>

    {/* Right side with login form */}
    <div className="flex-1 flex items-center justify-center  p-8 xs:rounded-[40px] md:rounded-bl-none md:rounded-tr-[40px] md:rounded-br-[40px] shadow">
        <div className="w-full max-w-md ">
        <div className="mb-8 flex justify-center items-center">
    
            <Image src="/assets/images/svg/logo.svg" alt="FeexPay" width={175} height={175}className='mb-8'/>
        </div>
        <h2 className="text-lg font-bold mb-6">Verification d'e-mail</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        
{/*<div className="space-y-2">
<div className="relative">
    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
    <EnvelopeIcon className="h-5 w-5 text-gray-800" />
    </span>
    <input
    type="email"
    id="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    className={`mt-1 block w-full pl-10 py-2.5 border text-gray-900 ${
        errors.email ? 'border-red-600' : 'border-gray-300'
    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm lg:text-base`}
    placeholder="Email"
    />
</div>
{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
</div>*/}
        

<div className="space-y-2">
<div className="relative">
    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
    <LockClosedIcon className="h-5 w-5 text-gray-800" />
    </span>
    <input
    type={showPassword ? 'text' : 'password'}
    id="new password"
    name="new password"
    value={formData.password}
    onChange={handleChange}
    className={`mt-1 block w-full pl-10 pr-10 py-2.5 border text-gray-900 ${
        errors.password ? 'border-red-600' : 'border-gray-300'
    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm lg:text-base`}
    placeholder="Nouveau Mot de passe"
    />
    <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
    >
    {showPassword ? (
        <EyeSlashIcon className="h-5 w-5" />
    ) : (
        <EyeIcon className="h-5 w-5" />
    )}
    </button>
    </div>
</div>
<div className="space-y-2">
<div className="relative">
    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
    <LockClosedIcon className="h-5 w-5 text-gray-800" />
    </span>
    <input
    type={showPassword ? 'text' : 'password'}
    id="confirm new password"
    name="confirm new password"
    value={formData.confirmPassword}
    onChange={handleChange}
    className={`mt-1 block w-full pl-10 pr-10 py-2.5 border text-gray-900 ${
        errors.password ? 'border-red-600' : 'border-gray-300'
    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm lg:text-base`}
    placeholder="Confirmer le  Mot de passe"
    />
    <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
    >
    {showConfirmPassword ? (
        <EyeSlashIcon className="h-5 w-5" />
    ) : (
        <EyeIcon className="h-5 w-5" />
    )}
    </button>
</div>
{errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
</div>

            {submitError && (
            <div className="bg-red-50 text-red-900 p-3 rounded-lg text-sm">
                {submitError}
            </div>
            )}
            
            <div className="flex items-center justify-between">
            {/*<label className="flex items-center">
                <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => setFormData(prev => ({
                    ...prev,
                    rememberMe: e.target.checked
                }))}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
            </label>*/}
            {/* <Link
                href="/forgot-password"
                className="text-sm text-primary hover:text-orange-500"
            >
                Mot de passe oublié ?
            </Link> */}
            </div>

            <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {isLoading ? 'Connexion...' : 'Continuer'}
            </button>

            {/*<div className="text-center text-sm text-gray-600">
            Vous n'avez pas de compte ?{' '}
            <Link href="/signup" className="text-primary hover:text-orange-500">
                Créer un compte
            </Link>
            </div>*/}
        </form>
        </div>
    </div>
    </div>
);
} 


export async function getServerSideProps(context) {
    const { token } = context.params;

    // Validation du token (exemple simple)
    if (!token || isNaN(token) || token.length < 10) { // Vérifiez la longueur ou d'autres critères
        console.log(token);
        return {
            props: {
                error: 'Token utilisateur invalide',
            },
        };
    }

    return {
        props: {
            token,
        },
    };
}
