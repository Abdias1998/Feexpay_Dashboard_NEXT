'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import StepIndicator from '../../components/common/StepIndicator'
import { Card, CardBody } from '@chakra-ui/react'

export default function SignUpFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    entreprise: '',
    password: '',
    confirmPassword: ''
  })

  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted with:', formData)
    
    setCurrentStep(2)
    // In a real application, you would make an API call here
    try {
      console.log('Attempting to navigate to confirmation page...')
      await router.push({
        pathname: '/sign-up/confirmation',
        query: { email: formData.email }
      })
    } catch (error) {
      console.error('Navigation error:', error)
    }
  }

  return (
    <>
    <Card>
      <CardBody className="flex min-h-screen bg-white ">
      {/* Left side - Orange background with text */}
      <div className="hidden w-1/2 bg-no-repeat bg-center bg-cover lg:flex flex-col justify-center px-12 rounded-l-2xl" style={{backgroundImage: 'url(/assets/images/background_login.jpeg)', backgroundSize: 'cover'}}>
        <h1 className="text-white text-5xl font-bold mb-4">Inscription</h1>
        <p className="text-white text-xl">
          Inscrivez-vous pour créer une boutique sur FeexPay
        </p>
      </div>

      {/* Right side - White background with form */}
      <div className="w-full lg:w-1/2 flex flex-col px-8 py-12 lg:px-12  rounded-r-2xl">
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <Image src="/assets/images/Logo FeexPay 1.png" alt="FeexPay Logo" width={120} height={30} />
          </div>
        </div>

        

        <h2 className="text-2xl font-semibold mb-6">Inscrivez-vous</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nom" className="sr-only">Nom</label>
            <input
              id="nom"
              name="nom"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-[#F26C1C] focus:border-[#F26C1C]"
              placeholder="Nom*"
              value={formData.nom}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="prenom" className="sr-only">Prénom</label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-[#F26C1C] focus:border-[#F26C1C]"
              placeholder="Prénom*"
              value={formData.prenom}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-[#F26C1C] focus:border-[#F26C1C]"
              placeholder="Email*"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="entreprise" className="sr-only">Nom de l&apos;entreprise</label>
            <input
              id="entreprise"
              name="entreprise"
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-[#F26C1C] focus:border-[#F26C1C]"
              placeholder="Nom de l'entreprise*"
              value={formData.entreprise}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex items-center justify-center mx-auto w-fit bg-[#D45D01] text-white py-1 px-2 rounded-xl hover:bg-[#E05B0B] transition duration-300"
            >
              S&apos;inscrire
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Vous avez déjà un compte?{' '}
          <a href="/signin" className="text-[#D45D01] hover:underline">
            Se connecter
          </a>
        </p>
      </div>
    </CardBody>
</Card>
</>
  )
}
