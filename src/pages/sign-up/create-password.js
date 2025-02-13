'use client'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
//import StepIndicator from '../../../components/common/StepIndicator'
import { Card, CardBody } from '@chakra-ui/react'

export default function CreatePassword() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    try {
      // In a real application, you would make an API call here
      console.log('Password created successfully')
      
      // Redirect to dashboard index page
      await router.push('/dashboard/index')
    } catch (error) {
      console.error('Error creating password:', error)
      setError('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  return ( 
    <>
    <Card>
      <CardBody className="flex min-h-screen bg-white ">
      {/* Left side - Orange background with text */}
      <div className="hidden w-1/2 bg-no-repeat bg-center bg-cover lg:flex flex-col justify-center px-12 rounded-l-2xl" 
           style={{backgroundImage: 'url(/assets/images/background_login.jpeg)'}}>
        <h1 className="text-white text-5xl font-bold mb-4">Création du mot de passe</h1>
        <p className="text-white text-xl">
          Sécurisez votre compte avec un mot de passe fort
        </p>
      </div>

      {/* Right side - White background with form */}
      <div className="w-full lg:w-1/2 flex flex-col px-8 py-12 lg:px-12 rounded-r-2xl">
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <Image src="/assets/images/Logo FeexPay 1.png" alt="FeexPay Logo" width={120} height={30} />
          </div>
        </div>

       {/*<StepIndicator currentStep={4} totalSteps={5} /> */} 

        <h2 className="text-2xl font-semibold mb-6">Créez votre mot de passe</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-xl">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="password" className="sr-only">Mot de passe</label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-[#F26C1C] focus:border-[#F26C1C]"
              placeholder="Mot de passe*"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="sr-only">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-[#F26C1C] focus:border-[#F26C1C]"
              placeholder="Confirmer le mot de passe*"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div>
            <button
              type="submit"
               className="flex items-center justify-center mx-auto w-fit bg-[#D45D01] text-white py-1 px-2 rounded-xl hover:bg-[#E05B0B] transition duration-300"
            >
              Créer mon mot de passe
            </button>
          </div>
        </form>
      </div>
      </CardBody>
</Card>
</>
  )
}
