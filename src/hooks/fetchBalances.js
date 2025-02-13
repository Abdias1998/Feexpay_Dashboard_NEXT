import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setGetBalance } from "path/to/your/redux/actions";
import debounce from "lodash/debounce";

const useFetchBalances = (status, session, updateCountryBalances) => {
  const dispatch = useDispatch();

  const fetchBalances = debounce(async (shopId) => {
    try {
      // Vérifier que shopId est valide
      if (!shopId) {
        console.warn("Shop ID introuvable ou invalide");
        return;
      }

      // Récupération des données depuis le cache local
      const cacheKey = `balance_${shopId}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        const balanceData = JSON.parse(cachedData);
        dispatch(setGetBalance(balanceData.diff));
        updateCountryBalances(balanceData);
        return;
      }

      // Requête API pour récupérer les données
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/balance/${shopId}/get`);

      if (response.data?.balance?.diff) {
        // Stocker les données dans le cache local
        localStorage.setItem(cacheKey, JSON.stringify(response.data.balance));

        // Mise à jour des états Redux et locaux
        dispatch(setGetBalance(response.data.balance.diff));
        updateCountryBalances(response.data.balance);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des balances :", error);
    }
  }, 300); // Délai de 300 ms pour éviter les appels multiples

  useEffect(() => {
    if (status !== "authenticated" || !session?.user?.shops?.length) return;

    // Récupérer l'ID du shop actif
    const shopId = localStorage.getItem("shop_is_active") || session.user.shops[0]._id;
    localStorage.setItem("shop_is_active", shopId);

    // Appeler la fonction pour récupérer les balances
    fetchBalances(shopId);
  }, [status, session, dispatch]);
};

export default useFetchBalances;
