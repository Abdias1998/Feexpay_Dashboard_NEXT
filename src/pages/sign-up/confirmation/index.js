'use client'

import Image from 'next/image'
import { CheckCircle2, Mail } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
//import StepIndicator from '../../../components/common/StepIndicator'
import { Card, CardBody } from '@chakra-ui/react'

export default function ConfirmationPage() {
  const router = useRouter()
  const { email } = router.query
  const [isEmailVerified, setIsEmailVerified] = useState(false)

  useEffect(() => {
    console.log('Confirmation page loaded with email:', email)
  }, [email])

  const maskedEmail = email ? email.replace(/(.{1})(.*)(?=@)/, (_, a, b) => a + '*'.repeat(b.length)) : ''

  const handleVerifyEmail = () => {
    console.log('Verifying email...')
    // Simulate email verification
    setIsEmailVerified(true)
    // In a real application, you would verify the email token here
    setTimeout(() => {
      console.log('Redirecting to create password page...')
      router.push('/sign-up/create-password')
    }, 2000)
  }

  return (
    <>
    <Card>
      <CardBody className="flex min-h-screen bg-white ">
    
      {/* Left side - Orange background with text */}
      <div className="hidden w-1/2 bg-no-repeat bg-center bg-cover lg:flex flex-col justify-center px-12 rounded-l-2xl" 
      style={{backgroundImage: 'url(/assets/images/background_login.jpeg)', backgroundSize: 'cover'}}>
        <h1 className="text-white text-5xl font-bold mb-4">Confirmation de l&apos;email</h1>
        <p className="text-white text-xl">
          Vérifiez votre boîte mail pour confirmer votre adresse email
        </p>
      </div>

      {/* Right side - White background with form */}
      <div className="w-full lg:w-1/2 flex flex-col px-8 py-12 lg:px-12  rounded-r-2xl">
      <div className="mb-12">
          <div className="flex items-center justify-center">
            <Image src="/assets/images/Logo FeexPay 1.png" alt="FeexPay Logo" width={120} height={30} />
          </div>
        </div>

        <h2 className="text-2xl font-semibold flex items-center justify-center mb-6">Confirmation de l&apos;email</h2>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-6">
            {isEmailVerified ? (
              <Image src="/assets/images/lets-icons_check-fill.png" alt="Vérifié" width={200} height={200} />
            ) : (
              <Mail className="w-10 h-10 text-gray-500" />
            )}
          </div>

          {!isEmailVerified ? (
            <>
              <p className="text-center mb-2">
                Nous avons envoyé un mail de confirmation à l&apos;adresse
              </p>
              <p className="text-center mb-6 font-medium">
                {maskedEmail}
              </p>
              <p className="text-gray-600 mb-8">
              <strong> Veuillez vérifier votre boîte mail ou vos spams.</strong>
              </p>

              <div className="text-sm">
                <span className="text-gray-600">Vous n&apos;avez pas reçu le mail ? </span>
                <button 
                  onClick={handleVerifyEmail} 
                  className="text-[#D45D01] hover:underline"
                >
                  Renvoyer le mail
                </button>
              </div>
            </>
          ) : (
            <>
             <div className="flex items-center justify-center mb-2">
             
                <p className="text-[#D45D01] ml-2 font-medium">
                  Email vérifié avec succès !
                </p>
              </div>
              <p className="text-gray-600">
                Redirection vers la création de mot de passe...
              </p>
            </>
          )}
        </div>
      </div>
    
  </CardBody>
</Card>
</>
  )
}
