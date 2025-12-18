import { useState } from 'react'

const services = [
  { id: '', name: 'Selecione um serviço', price: 0, duration: 0 },
  { id: 'manicure', name: 'Manicure Completa', price: 45.00, duration: 60 },
  { id: 'pedicure', name: 'Pedicure Completa', price: 50.00, duration: 60 },
  { id: 'combo', name: 'Combo Mão e Pé', price: 85.00, duration: 120 },
  { id: 'gel', name: 'Unha em Gel', price: 80.00, duration: 90 },
  { id: 'alongamento', name: 'Alongamento', price: 120.00, duration: 120 },
  { id: 'decoracao', name: 'Decoração Especial', price: 35.00, duration: 0 },
]

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']

function App() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    service: '',
    date: '',
    time: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTimeSelect = (time) => {
    setFormData(prev => ({
      ...prev,
      time: prev.time === time ? '' : time
    }))
  }

  const formatWhatsApp = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    
    // Format as (XX) XXXXX-XXXX
    if (digits.length <= 2) {
      return digits
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
    }
  }

  const handleWhatsAppChange = (e) => {
    const formatted = formatWhatsApp(e.target.value)
    setFormData(prev => ({
      ...prev,
      whatsapp: formatted
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.whatsapp || !formData.service || !formData.date || !formData.time) {
      alert('Por favor, preencha todos os campos')
      return
    }

    const selectedService = services.find(s => s.id === formData.service)
    const phoneNumber = formData.whatsapp.replace(/\D/g, '')
    const message = `Olá! Gostaria de agendar:\n\n` +
      `Nome: ${formData.name}\n` +
      `Serviço: ${selectedService.name} - R$ ${selectedService.price.toFixed(2)}\n` +
      `Data: ${formData.date}\n` +
      `Horário: ${formData.time}`

    const whatsappUrl = `https://wa.me/55${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const selectedService = services.find(s => s.id === formData.service)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center">
            <a 
              href="https://wa.me/5511999999999" 
              className="text-lg font-medium text-gray-700 hover:text-pink-600 transition-colors"
            >
              (11) 99999-9999
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Suas unhas sempre perfeitas
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Agende seu horário de forma rápida e receba confirmação direto no WhatsApp
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-700">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">São Paulo, SP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="font-medium">4.9/5</span>
              <span className="text-gray-500">(127 avaliações)</span>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Nossos Serviços
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter(s => s.id !== '').map(service => (
              <div
                key={service.id}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border-2 ${
                  formData.service === service.id
                    ? 'border-pink-500 shadow-xl scale-105'
                    : 'border-transparent hover:border-pink-200'
                }`}
                onClick={() => {
                  setFormData(prev => ({ ...prev, service: service.id }))
                  // Scroll to form
                  document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-pink-600">
                    R$ {service.price.toFixed(2)}
                  </span>
                  {service.duration > 0 && (
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {service.duration} min
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Form Section */}
        <section id="booking-form" className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
              Agende seu Horário
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Seu Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Digite seu nome completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              {/* WhatsApp Field */}
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp
                </label>
                <input
                  type="text"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleWhatsAppChange}
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Serviço Desejado
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-white"
                  required
                >
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.id === '' ? service.name : `${service.name} - R$ ${service.price.toFixed(2)}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Field */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Data
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Horário
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleTimeSelect(time)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        formData.time === time
                          ? 'bg-pink-600 text-white shadow-md transform scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Confirmar Agendamento via WhatsApp
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-600 text-center">
              Você receberá uma mensagem de confirmação no WhatsApp após o agendamento
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-gray-600 text-sm">
        <p>&copy; 2024 Belisi.IA - Agendamento de Manicure</p>
      </footer>
    </div>
  )
}

export default App

