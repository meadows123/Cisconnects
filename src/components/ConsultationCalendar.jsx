import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Mail, Phone, MessageSquare, CheckCircle, XCircle, Loader } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

const ConsultationCalendar = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchConsultations();
    // Refresh every 30 seconds
    const interval = setInterval(fetchConsultations, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await fetch('/api/consultations');
      const data = await response.json();
      setConsultations(data);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`/api/consultations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchConsultations();
    } catch (error) {
      console.error('Error updating consultation:', error);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredConsultations = consultations.filter(consultation => {
    const consultationDate = consultation.date.split('T')[0];
    const dateMatch = selectedDate ? consultationDate === selectedDate : true;
    const statusMatch = filter === 'all' ? true : consultation.status === filter;
    return dateMatch && statusMatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 border-green-500/50 text-green-400';
      case 'completed':
        return 'bg-blue-500/10 border-blue-500/50 text-blue-400';
      case 'cancelled':
        return 'bg-red-500/10 border-red-500/50 text-red-400';
      default:
        return 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      <div className="pt-12 pb-8 px-3 sm:px-6 lg:px-8 md:pt-24 md:pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
              <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Consultation Calendar</h1>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-400">Manage and track all consultation bookings</p>
          </motion.div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
            {[
              { label: 'Total', count: consultations.length, color: 'blue' },
              { label: 'Pending', count: consultations.filter(c => c.status === 'pending').length, color: 'yellow' },
              { label: 'Confirmed', count: consultations.filter(c => c.status === 'confirmed').length, color: 'green' },
              { label: 'Completed', count: consultations.filter(c => c.status === 'completed').length, color: 'purple' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-${stat.color}-500/10 border border-${stat.color}-500/30 rounded-lg p-3 sm:p-6`}
              >
                <p className={`text-${stat.color}-400 text-xs sm:text-sm font-medium mb-1 sm:mb-2`}>{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{stat.count}</p>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-white font-medium text-sm sm:text-base mb-2 sm:mb-3">Filter by Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-white font-medium text-sm sm:text-base mb-2 sm:mb-3">Filter by Status</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Consultations List */}
          {loading ? (
            <div className="flex justify-center items-center py-16 sm:py-20">
              <Loader className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500 animate-spin" />
            </div>
          ) : filteredConsultations.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-400 text-sm sm:text-lg">No consultations found</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredConsultations.map((consultation) => (
                <motion.div
                  key={consultation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-slate-700 transition"
                >
                  <div className="p-3 sm:p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 sm:mb-4 gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-1 sm:mb-2 truncate">{consultation.name}</h3>
                        <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-2 sm:mb-3 truncate">
                          <Mail className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          <span className="truncate">{consultation.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm truncate">
                          <Phone className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          <span className="truncate">{consultation.phone}</span>
                        </div>
                      </div>

                      <div className={`border rounded-full px-3 md:px-4 py-1.5 md:py-2 flex items-center gap-2 font-medium text-xs md:text-sm flex-shrink-0 ${getStatusColor(consultation.status)}`}>
                        {getStatusIcon(consultation.status)}
                        <span className="capitalize hidden sm:inline">{consultation.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 pt-3 sm:pt-4 border-t border-slate-800">
                      <div>
                        <p className="text-gray-400 text-xs md:text-sm mb-1">Date & Time</p>
                        <p className="text-white font-medium text-xs md:text-sm flex items-center gap-2">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4 text-blue-500 flex-shrink-0" />
                          {formatDate(consultation.date)} at {consultation.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs md:text-sm mb-1">Company & Status</p>
                        <p className="text-white font-medium text-xs md:text-sm">
                          {consultation.company || 'Not provided'} • {consultation.currentStatus}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 sm:mb-6">
                      <p className="text-gray-400 text-xs md:text-sm mb-1 sm:mb-2">Reason for Consultation</p>
                      <p className="text-gray-300 text-xs md:text-sm">{consultation.reason}</p>
                    </div>

                    {consultation.comments && (
                      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        <p className="text-gray-400 text-xs md:text-sm mb-1 sm:mb-2 flex items-center gap-2">
                          <MessageSquare className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          Additional Comments
                        </p>
                        <p className="text-gray-300 text-xs md:text-sm">{consultation.comments}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-3 sm:pt-4 border-t border-slate-800">
                      {consultation.status !== 'cancelled' && consultation.status !== 'completed' && (
                        <>
                          {consultation.status === 'pending' && (
                            <button
                              onClick={() => updateStatus(consultation.id, 'confirmed')}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm rounded-lg transition"
                            >
                              Confirm
                            </button>
                          )}
                          <button
                            onClick={() => updateStatus(consultation.id, 'completed')}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm rounded-lg transition"
                          >
                            Mark Complete
                          </button>
                        </>
                      )}
                      {consultation.status !== 'cancelled' && (
                        <button
                          onClick={() => updateStatus(consultation.id, 'cancelled')}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm rounded-lg transition ml-auto"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConsultationCalendar;
