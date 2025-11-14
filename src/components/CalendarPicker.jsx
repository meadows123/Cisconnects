import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const CalendarPicker = ({ selectedDate, onDateSelect, minDate = null }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [isOpen, setIsOpen] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateDisabled = (date) => {
    if (minDate) {
      const min = new Date(minDate);
      min.setHours(0, 0, 0, 0);
      const check = new Date(date);
      check.setHours(0, 0, 0, 0);
      return check < min;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const check = new Date(date);
    check.setHours(0, 0, 0, 0);
    return check < today;
  };

  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate);
    const check = new Date(date);
    return (
      selected.getDate() === check.getDate() &&
      selected.getMonth() === check.getMonth() &&
      selected.getFullYear() === check.getFullYear()
    );
  };

  const isToday = (date) => {
    const today = new Date();
    const check = new Date(date);
    return (
      today.getDate() === check.getDate() &&
      today.getMonth() === check.getMonth() &&
      today.getFullYear() === check.getFullYear()
    );
  };

  const handleDateClick = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    if (!isDateDisabled(date)) {
      onDateSelect(date.toISOString().split('T')[0]);
      setIsOpen(false);
    }
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const disabled = isDateDisabled(date);
      const selected = isDateSelected(date);
      const today = isToday(date);

      days.push({
        day,
        date,
        disabled,
        selected,
        today
      });
    }

    return days;
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return 'Choose a date';
    const date = new Date(selectedDate);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-left flex items-center justify-between"
      >
        <span className={selectedDate ? 'text-white' : 'text-slate-500'}>
          {formatSelectedDate()}
        </span>
        <CalendarIcon className="w-5 h-5 text-slate-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            
            {/* Calendar Popup */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 mt-2 bg-slate-800 border border-white/10 rounded-xl shadow-2xl z-50 p-4 w-[calc(100vw-2rem)] max-w-[320px] md:min-w-[320px]"
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold text-lg">
                    {months[currentMonth]} {currentYear}
                  </h3>
                  <button
                    onClick={goToToday}
                    className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    Today
                  </button>
                </div>
                
                <button
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-semibold text-slate-400 py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar().map((dayData, index) => {
                  if (dayData === null) {
                    return <div key={index} className="aspect-square" />;
                  }

                  const { day, disabled, selected, today } = dayData;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDateClick(day)}
                      disabled={disabled}
                      className={`
                        aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all min-h-[44px] min-w-[44px]
                        ${disabled
                          ? 'text-slate-600 cursor-not-allowed'
                          : selected
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg active:scale-95'
                          : today
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 active:scale-95'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-white active:scale-95'
                        }
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Year Navigation */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setCurrentYear(currentYear - 1)}
                  className="px-3 py-1 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  ← {currentYear - 1}
                </button>
                <span className="text-xs text-slate-500">Year</span>
                <button
                  onClick={() => setCurrentYear(currentYear + 1)}
                  className="px-3 py-1 text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {currentYear + 1} →
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarPicker;

