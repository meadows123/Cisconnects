import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, ChevronLeft, CheckCircle, Loader2, Globe } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

// Generate the next 14 weekdays starting tomorrow
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

const formatDateLong = (date) =>
  date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

const formatDateISO = (date) => date.toISOString().split('T')[0];

const BookingModal = () => {
  const { isOpen, closeBooking } = useBooking();

  const [step, setStep] = useState(1); // 1 = pick date/time, 2 = details, 3 = success
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const availableDates = getAvailableDates();

  // Lock body scroll
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
      document.body.style.width = '';
      if (y) window.scrollTo(0, parseInt(y, 10) * -1);
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1); setSelectedDate(null); setSelectedTime(null);
        setSlots([]); setForm({ firstName: '', lastName: '', email: '', phone: '' });
        setError('');
      }, 300);
    }
  }, [isOpen]);

  // Load slots when date chosen
  const loadSlots = useCallback(async (date) => {
    setSlotsLoading(true);
    setSlots([]);
    setSelectedTime(null);
    try {
      const res = await fetch(`/api/ghl-slots?date=${formatDateISO(date)}`);
      const data = await res.json();
      setSlots(data.slots || []);
    } catch {
      // Fallback default slots
      setSlots([
        '09:00','09:30','10:00','10:30','11:00','11:30',
        '13:00','13:30','14:00','14:30','15:00','15:30',
      ].map(t => ({ time: t })));
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    loadSlots(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setSelectedTime(null);
    setError('');
  };

  const handleClose = () => {
    closeBooking();
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.firstName || !form.email || !form.phone) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          company: '',
          date: formatDateISO(selectedDate),
          time: selectedTime,
          currentStatus: 'Website Booking',
          reason: 'Demo booking via website',
          comments: '',
        }),
      });
      if (!res.ok) throw new Error('Failed to save booking');
      setStep(3);
    } catch (err) {
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full sm:max-w-2xl bg-white sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ height: '100dvh', maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white flex-shrink-0">
              <div className="flex items-center gap-3">
                {step === 2 && (
                  <button
                    onClick={handleBack}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <h2 className="text-base font-semibold text-slate-900">Book a Demo</h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1" style={{ WebkitOverflowScrolling: 'touch' }}>

              {/* STEP 1: Date + Time */}
              {step === 1 && (
                <div className="p-6 space-y-6">
                  {/* Meeting info */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-semibold text-slate-900">1-to-1 Meeting</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 30 Mins</span>
                      <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> Europe/London (GMT)</span>
                    </div>
                  </div>

                  {/* Date picker */}
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> Select a date
                    </p>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {availableDates.map((date, i) => {
                        const isSelected = selectedDate && formatDateISO(date) === formatDateISO(selectedDate);
                        return (
                          <button
                            key={i}
                            onClick={() => handleDateSelect(date)}
                            className={`flex flex-col items-center p-2 rounded-xl border text-sm font-medium transition-all ${
                              isSelected
                                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                : 'border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50'
                            }`}
                          >
                            <span className="text-xs opacity-70">
                              {date.toLocaleDateString('en-GB', { weekday: 'short' })}
                            </span>
                            <span className="text-base font-bold">{date.getDate()}</span>
                            <span className="text-xs opacity-70">
                              {date.toLocaleDateString('en-GB', { month: 'short' })}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots */}
                  {selectedDate && (
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-3">
                        Available times for {formatDateLong(selectedDate)}
                      </p>
                      {slotsLoading ? (
                        <div className="flex items-center gap-2 text-slate-500 text-sm py-4">
                          <Loader2 className="w-4 h-4 animate-spin" /> Loading available slots...
                        </div>
                      ) : slots.length === 0 ? (
                        <p className="text-sm text-slate-500 py-4">No slots available for this date. Please choose another day.</p>
                      ) : (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {slots.map(({ time }, i) => (
                            <button
                              key={i}
                              onClick={() => handleTimeSelect(time)}
                              className="py-2.5 px-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-all"
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {!selectedDate && (
                    <p className="text-sm text-slate-400 text-center pt-2">← Select a date to see available times</p>
                  )}
                </div>
              )}

              {/* STEP 2: Enter Details */}
              {step === 2 && (
                <div className="p-6">
                  {/* Selected slot summary */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-6 flex flex-wrap gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-500" /> 30 Mins</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      {selectedTime} · {formatDateLong(selectedDate)}
                    </span>
                    <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-blue-500" /> Europe/London (GMT)</span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mb-5">Enter your details</h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={form.firstName}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          placeholder="Smith"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="+44 7700 900000"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 mt-2"
                    >
                      {submitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Confirming booking...</>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 3: Success */}
              {step === 3 && (
                <div className="p-8 flex flex-col items-center justify-center text-center min-h-[400px] space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900">You're booked!</h3>
                  <p className="text-slate-500 text-sm max-w-xs">
                    Your demo is confirmed for <strong>{selectedTime}</strong> on{' '}
                    <strong>{formatDateLong(selectedDate)}</strong>. We'll send a confirmation to{' '}
                    <strong>{form.email}</strong>.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-4 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
