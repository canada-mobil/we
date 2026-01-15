'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Package, CheckCircle, Clock, Truck, AlertTriangle, RefreshCw, User, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

interface TrackingInfo {
  id: string
  trackingNumber: string
  customerName: string
  email: string
  phone?: string
  status: string
  statusMessage: string
  createdAt: string
  timeline: Array<{
    status: string
    label: string
    description: string
    timestamp: string
    completed: boolean
  }>
  order?: {
    id: string
    orderNumber: string
    total: number
    orderItems: Array<{
      id: string
      quantity: number
      price: number
      product: {
        name: string
        images?: string
      }
    }>
  }
}

function TrackOrderContent() {
  const searchParams = useSearchParams()
  const initialTracking = searchParams?.get('tracking') || ''
  
  const [trackingNumber, setTrackingNumber] = useState(initialTracking)
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  useEffect(() => {
    if (initialTracking) {
      searchTracking(initialTracking)
    }
  }, [initialTracking])

  const searchTracking = async (number: string) => {
    if (!number.trim()) {
      setError('Veuillez entrer un numéro de suivi')
      return
    }

    setLoading(true)
    setError('')
    setTrackingInfo(null)

    try {
      const response = await fetch(`/api/tracking/${number.trim()}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Numéro de suivi introuvable')
        }
        throw new Error('Erreur lors de la recherche')
      }

      const data = await response.json()
      setTrackingInfo(data)
    } catch (error: any) {
      setError(error.message || 'Erreur lors de la recherche')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    searchTracking(trackingNumber)
  }

  const handleInputChange = (e: any) => {
    setTrackingNumber(e.target.value.toUpperCase())
  }

  const getStatusIcon = (status: string, completed: boolean) => {
    if (!completed) {
      return <Clock className="w-5 h-5 text-gray-400" />
    }

    switch (status) {
      case 'confirmation':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'confirmed':
        return <Package className="w-5 h-5 text-blue-500" />
      case 'in_transit':
        return <Truck className="w-5 h-5 text-orange-500" />
      case 'delivery_issue':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'refund_processing':
        return <RefreshCw className="w-5 h-5 text-purple-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmation':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'confirmed':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'in_transit':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'delivery_issue':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'refund_processing':
        return 'text-purple-600 bg-purple-50 border-purple-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <Package className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Suivi de Commande
          </h1>
          <p className="text-gray-600">
            Entrez votre numéro de suivi pour voir l'état de votre commande
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de Suivi
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="tracking"
                  value={trackingNumber}
                  onChange={handleInputChange}
                  placeholder="Ex: LM4K123456ABCD"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Tracking Results */}
        {trackingInfo && (
          <div className="space-y-6">
            {/* Current Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Statut Actuel
              </h2>
              <div className={`p-4 rounded-lg border ${getStatusColor(trackingInfo.status)}`}>
                <div className="flex items-center mb-2">
                  {getStatusIcon(trackingInfo.status, true)}
                  <span className="ml-2 font-semibold capitalize">
                    {trackingInfo.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm">
                  {trackingInfo.statusMessage}
                </p>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Informations Client
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Nom</p>
                    <p className="font-medium">{trackingInfo.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{trackingInfo.email}</p>
                  </div>
                </div>
                {trackingInfo.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Téléphone</p>
                      <p className="font-medium">{trackingInfo.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Historique de la Commande
              </h2>
              <div className="space-y-4">
                {trackingInfo.timeline.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {getStatusIcon(step.status, step.completed)}
                      </div>
                      {index < trackingInfo.timeline.length - 1 && (
                        <div className={`w-0.5 h-8 mx-auto mt-2 ${
                          step.completed ? 'bg-green-300' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${
                          step.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </h3>
                        {step.timestamp && (
                          <span className="text-sm text-gray-500">
                            {new Date(step.timestamp).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm mt-1 ${
                        step.completed ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details */}
            {trackingInfo.order && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Détails de la Commande
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="text-gray-600">Numéro de commande:</span>
                    <span className="font-medium">{trackingInfo.order.orderNumber}</span>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Articles commandés:</h3>
                    {trackingInfo.order.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="flex items-center">
                          {item.product.images && (
                            <img 
                              src={JSON.parse(item.product.images)[0]} 
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded mr-3"
                            />
                          )}
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t font-semibold">
                    <span>Total:</span>
                    <span>${trackingInfo.order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        {!trackingInfo && !loading && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Besoin d'aide ?
            </h2>
            <div className="space-y-3 text-gray-600">
              <p>• Votre numéro de suivi commence par "LM4K" suivi de chiffres et lettres</p>
              <p>• Vous avez reçu ce numéro par email après votre commande</p>
              <p>• Le suivi est mis à jour automatiquement</p>
              <p>• En cas de problème, contactez notre service client</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Nous Contacter
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  )
}
