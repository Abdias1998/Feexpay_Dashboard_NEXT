import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setUser, logout } from '../features/auth/authSlice';
import { axiosInstance } from '../libs/axiosInstance';
import { useEffect, useState } from 'react';

/**
 * Hook personnalisé pour gérer l'authentification.
 * Fournit des méthodes pour se connecter, se déconnecter et vérifier l'état de l'utilisateur.
 */
const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Récupère l'utilisateur et le token depuis le store Redux
  const { user, token } = useSelector((state) => state.auth);

  // État local pour gérer le chargement des données utilisateur
  const [loading, setLoading] = useState(false);

  /**
   * Fonction pour gérer la connexion de l'utilisateur.
   * @param {Object} credentials - Les informations d'identification (email, password).
   */
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/auth/signin', credentials);
      const { user, token } = response.data;

      // Stocker l'utilisateur et le token dans Redux
      dispatch(setUser({ user, token }));

      // Rediriger vers le tableau de bord
      router.push('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      throw new Error(error.response?.data?.message || 'Connexion échouée.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fonction pour déconnecter l'utilisateur.
   */
  const logoutUser = () => {
    // Supprimer les informations utilisateur de Redux
    dispatch(logout());

    // Rediriger vers la page de connexion
    router.push('/signin');
  };

  /**
   * Vérifie si l'utilisateur est connecté au chargement de la page.
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUser(response.data));
      } catch (error) {
        console.error('Erreur lors de la vérification de la session utilisateur :', error);
        logoutUser();
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      checkAuth();
    }
  }, [token, dispatch]);

  return { user, token, login, logoutUser, loading };
};

export default useAuth;
