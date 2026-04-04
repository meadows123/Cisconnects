import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2, Clock, Calendar, ChevronLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const getAvailableDates = () => {
  const dates = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (dates.length < 14) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(new Date(d));
    }
    d.setDate(d.getDate() + 1);
  }
  return dates;
};

const formatDate = (date) =>
  date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

const formatDateISO = (date) => date.toISOString().split('T')[0];

const ContactModal = () => {
  const { isOpen, closeBooking } = useBooking();

  const [step, setStep] = useState(1); // 1 = pick date/time, 2 = details, 3 = success
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const availableDates = getAvailableDates();

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  // Lock body scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      const y = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${y}px`;
      document.body.style.width = '100%';
    } else {
      const y = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(y || '0') * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  // Fetch available slots when date is selected
  useEffect(() => {
    if (step === 2 && selectedDate) {
      setLoadingSlots(true);
      const dateStr = formatDateISO(selectedDate);
      fetch(`/api/available-slots?date=${dateStr}`)
        .then(res => res.json())
        .then(data => {
          setAvailableSlots(data.availableSlots || []);
          setBookedSlots(data.bookedSlots || []);
          setSelectedTime(null); // Reset time selection
        })
        .catch(err => {
          console.error('Error fetching slots:', err);
          setAvailableSlots(timeSlots); // Fallback to all slots
        })
        .finally(() => setLoadingSlots(false));
    }
  }, [step, selectedDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in all fields');
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Save to leads database with date and time
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          source: 'contact-form',
          date: formatDateISO(selectedDate),
          time: selectedTime
        })
      });

      if (!response.ok) throw new Error('Failed to save lead');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '' });
      setTimeout(() => {
        setSubmitStatus(null);
        closeBooking();
        setStep(1);
        setSelectedDate(null);
        setSelectedTime(null);
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Something went wrong. Please try again.');
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeBooking}
          >
            <div
              className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-900">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-gray-400 hover:text-white transition p-1"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}
                <h2 className="text-2xl font-bold text-white flex-1">
                  {step === 1 ? 'Pick a Time' : step === 2 ? 'Your Details' : 'Confirmed'}
                </h2>
                <button
                  onClick={closeBooking}
                  className="text-gray-400 hover:text-white transition p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Success State */}
              {submitStatus === 'success' && (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="flex justify-center mb-4"
                  >
                    <div className="bg-green-500/20 p-4 rounded-full">
                      <CheckCircle className="w-12 h-12 text-green-400" />
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">Booking Confirmed!</h3>
                  <p className="text-gray-300 mb-4">Your appointment has been added to the calendar.</p>
                  <p className="text-sm text-gray-400">
                    {selectedDate && formatDate(selectedDate)} at {selectedTime}
                  </p>
                </div>
              )}

              {/* Step 1: Date Selection */}
              {step === 1 && submitStatus !== 'success' && (
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-gray-300 mb-4">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">Select a Date</span>
                  </div>
                  <div className="space-y-2">
                    {availableDates.map((date) => (
                      <motion.button
                        key={formatDateISO(date)}
                        onClick={() => {
                          setSelectedDate(date);
                          setStep(2);
                        }}
                        className={`w-full p-3 rounded-lg border transition text-left ${
                          selectedDate && formatDateISO(selectedDate) === formatDateISO(date)
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-slate-800 border-slate-600 text-gray-300 hover:border-blue-500'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {formatDate(date)}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Time & Details */}
              {step === 2 && submitStatus !== 'success' && (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Time Selection */}
                  <div>
                    <div className="flex items-center gap-2 text-gray-300 mb-3">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">Select a Time</span>
                      {bookedSlots.length > 0 && (
                        <span className="text-xs text-gray-500">({availableSlots.length} available)</span>
                      )}
                    </div>
                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                        <span className="ml-2 text-gray-400">Loading available times...</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-2 mb-6">
                        {timeSlots.map((time) => {
                          const isBooked = bookedSlots.includes(time);
                          const isAvailable = availableSlots.includes(time);
                          return (
                            <motion.button
                              key={time}
                              type="button"
                              onClick={() => !isBooked && setSelectedTime(time)}
                              disabled={isBooked}
                              className={`p-2 rounded-lg border text-sm transition relative group ${
                                selectedTime === time
                                  ? 'bg-blue-600 border-blue-500 text-white'
                                  : isBooked
                                  ? 'bg-slate-700 border-slate-600 text-gray-500 cursor-not-allowed opacity-50'
                                  : 'bg-slate-800 border-slate-600 text-gray-300 hover:border-blue-500'
                              }`}
                              whileHover={!isBooked ? { scale: 1.05 } : {}}
                              whileTap={!isBooked ? { scale: 0.95 } : {}}
                              title={isBooked ? 'Already booked' : ''}
                            >
                              {time}
                              {isBooked && (
                                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    )}
                    {bookedSlots.length > 0 && (
                      <p className="text-xs text-gray-500 mt-2">
                        Times with a red dot are already booked.
                      </p>
                    )}
                  </div>

                  {/* Contact Details */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                      required
                    />
                  </div>

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-sm text-red-300"
                    >
                      {errorMessage || 'Something went wrong. Please try again.'}
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedTime || loadingSlots}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-bold rounded-lg flex items-center justify-center gap-2 transition"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Booking...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Confirm</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
