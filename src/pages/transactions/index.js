import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import MainLayout from '../../components/layout/MainLayout';
import TransactionTable from '../../components/transactions/TransactionTable';
import QuickTransfer from '../../components/transactions/QuickTransfer';
import CreateTransaction from '../../components/transactions/CreateTransaction';
import { generateMetadata } from '../../utils/metadata';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setGetTransactions } from '../../features/transactions/transactionsSlice';

export const metadata = generateMetadata({
  title: 'Transactions',
  description: 'Gérez et suivez toutes vos transactions FeexPay',
  keywords: 'transactions, paiements, historique, feexpay'
});

export default function Transactions() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const balances = useSelector((state) => state?.balances?.balances);
  // const [transactions, setTransactions] = useState([]);
  const shopInfo = session?.user?.shops[1];
  console.log(shopInfo);


  
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push('/signin');
  //   }
  // }, [status, router]);
  
  useEffect(() => {
      
    if (status !== "authenticated" || !session?.user?.shops?.length) return;
    const shopId = localStorage.getItem('shop_is_active') || session.user.shops[0]._id;
    localStorage.setItem('shop_is_active', shopId);
    const fetchTransaction = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/transactions/readall`,
          {
            shop: localStorage.getItem('shop_is_active'),
            mode: 1,
            page: 1,
            limit: 300,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${session?.user?.token}`,
            },
          }
        );
        const data = await response.data;
        // setTransactions(data);
        dispatch(setGetTransactions(data));
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const delayFetch = setTimeout(() => {
      fetchTransaction();
    }, 3000); // 2000 ms (2 secondes)
  
    // Nettoyage en cas de démontage du composant
    return () => clearTimeout(delayFetch);
  }, [status,session,dispatch]); 
  
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-[20px] sm:rounded-[40px] mt-4 sm:mt-12">
           {/* <CreateTransaction />  */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
            <div className="col-span-1 md:col-span-12">
              <TransactionTable  />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}