import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import MainLayout from '../../components/layout/MainLayout';

import { generateMetadata } from '../../utils/metadata';

import FeexLinkTable from '../../components/feexlink/FeexLinkTable';
import CreateFeexLink from '../../components/feexlink/CreateFeexLink';

export const metadata = generateMetadata({
  title: 'FeexLink',
  description: 'Gérez et suivez toutes vos transactions FeexPay',
  keywords: 'transactions, paiements, historique, feexpay'
});

export default function Feexlink() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/sigin');
    }
  }, [status, router]);

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
          <CreateFeexLink/>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
            <div className="col-span-1 md:col-span-12">
              <FeexLinkTable />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}