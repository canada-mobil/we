'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { CheckCircle, Package, Copy, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface TrackingInfo {
  id: string
  trackingNumber: string
  customerName: string
  email: string
  status: string
  statusMessage: string
}

export default function OrderSuccessPage() {
  const params = useParams()
  const orderId = params?.orderId as string
  
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (orderId) {
      generateTrackingNumber()
    }
  }, [orderId])

  const generateTrackingNumber = async () => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/tracking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId })
      })

      if (!response.ok) {
        throw new Error('Failed to generate tracking number')
      }

      const data = await response.json()
      setTrackingInfo(data)
    } catch (error) {
      console.error('Error generating tracking:', error)
      setError('Erreur lors de la génération du numéro de suivi')
    } finally {
      setLoading(false)
    }
  }

  const copyTrackingNumber = () => {
    if (trackingInfo?.trackingNumber) {
      navigator.clipboard.writeText(trackingInfo.trackingNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Génération de votre numéro de suivi...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">❌</div>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={generateTrackingNumber}
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Commande Confirmée !
          </h1>
          <p className="text-gray-600">
            Merci pour votre achat. Votre commande a été traitée avec succès.
          </p>
        </div>

        {/* Tracking Information */}
        {trackingInfo && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <Package className="w-6 h-6 text-orange-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">
                Informations de Suivi
              </h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de Suivi
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 p-3 bg-gray-50 border rounded-lg font-mono text-lg">
                    {trackingInfo.trackingNumber}
                  </div>
                  <button
                    onClick={copyTrackingNumber}
                    className="p-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    title="Copier le numéro de suivi"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
                {copied && (
                  <p className="text-sm text-green-600 mt-1">
                    ✓ Numéro copié dans le presse-papiers
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client
                </label>
                <p className="p-3 bg-gray-50 border rounded-lg">
                  {trackingInfo.customerName}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut Actuel
                </label>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="font-medium text-blue-800 capitalize">
                      {trackingInfo.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-blue-700 mt-1 text-sm">
                    {trackingInfo.statusMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/track-order?tracking=${trackingInfo?.trackingNumber}`}
            className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Package className="w-5 h-5 mr-2" />
            Suivre ma Commande
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Retour à l'Accueil
          </Link>
        </div>

        {/* Important Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            📧 Informations Importantes
          </h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Un email de confirmation a été envoyé à votre adresse</li>
            <li>• Conservez votre numéro de suivi pour suivre votre commande</li>
            <li>• Le suivi sera mis à jour automatiquement</li>
            <li>• En cas de problème, contactez notre service client</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
