import axios from 'axios';

// Importation des variables d'environnement
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

// Création d'une instance d'Axios avec des configurations de base
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Temps limite pour une requête (10 secondes)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour inclure le token d'authentification dans chaque requête
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Récupérer le token depuis le stockage local
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Gestion du token expiré (code HTTP 401)
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
          localStorage.setItem('accessToken', data.accessToken);
          error.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return axiosInstance(error.config);
        }
      } catch (refreshError) {
        console.error('Erreur de rafraîchissement du token:', refreshError);
        localStorage.clear();
        window.location.href = '/signin'; // Redirection vers la page de connexion
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
