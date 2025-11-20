import React, { useState, useEffect } from 'react';
import { Calendar, Clock, X, User, Mail, Building, MessageSquare, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingData {
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  consultationType: string;
  message: string;
}

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SchedulingModal: React.FC<SchedulingModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<'calendar' | 'details' | 'confirmation'>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    consultationType: 'ai-strategy',
    message: ''
  });

  // Available time slots (EST/EDT)
  const timeSlots: TimeSlot[] = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: true }
  ];

  // Generate calendar days
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = currentDate.getMonth() === month;
      const isPast = currentDate < today;
      const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
      const isAvailable = isCurrentMonth && !isPast && !isWeekend;
      
      days.push({
        date: currentDate,
        isCurrentMonth,
        isAvailable,
        isPast,
        isWeekend
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays(currentMonth);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNextStep = () => {
    if (currentStep === 'calendar' && selectedDate && selectedTime) {
      setBookingData(prev => ({
        ...prev,
        date: selectedDate.toLocaleDateString(),
        time: selectedTime
      }));
      setCurrentStep('details');
    }
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);

    try {
      const bookingDateObj = selectedDate;
      if (!bookingDateObj) throw new Error('No date selected');

      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          first_name: bookingData.firstName,
          last_name: bookingData.lastName,
          email: bookingData.email,
          phone: bookingData.phone || null,
          company: bookingData.company || null,
          consultation_type: bookingData.consultationType,
          message: bookingData.message || null,
          booking_date: bookingDateObj.toISOString().split('T')[0],
          booking_time: selectedTime,
          status: 'confirmed'
        })
        .select()
        .single();

      if (bookingError) {
        console.error('Failed to create booking:', bookingError);
        throw new Error('Failed to create booking');
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      await fetch(`${supabaseUrl}/functions/v1/create-calendar-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          bookingId: booking.id,
          firstName: bookingData.firstName,
          lastName: bookingData.lastName,
          email: bookingData.email,
          company: bookingData.company,
          consultationType: bookingData.consultationType,
          message: bookingData.message,
          bookingDate: bookingDateObj.toISOString().split('T')[0],
          bookingTime: selectedTime
        })
      });

      await fetch(`${supabaseUrl}/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          firstName: bookingData.firstName,
          lastName: bookingData.lastName,
          email: bookingData.email,
          company: bookingData.company,
          service: `Booking: ${bookingData.consultationType}`,
          message: `Date: ${bookingData.date}\nTime: ${bookingData.time}\n\n${bookingData.message || 'No additional message'}`
        })
      });

      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Booking error:', error);
      alert('There was an error booking your session. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setCurrentStep('calendar');
    setSelectedDate(null);
    setSelectedTime('');
    setBookingData({
      date: '',
      time: '',
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: '',
      consultationType: 'ai-strategy',
      message: ''
    });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-600">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-6 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Schedule AI Strategy Session</h2>
              <p className="text-white/90">Book your free 60-minute consultation</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="p-6 border-b border-slate-600">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${currentStep === 'calendar' ? 'text-cyan-400' : currentStep === 'details' || currentStep === 'confirmation' ? 'text-green-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'calendar' ? 'bg-cyan-500' : currentStep === 'details' || currentStep === 'confirmation' ? 'bg-green-500' : 'bg-gray-600'}`}>
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">Select Date & Time</span>
            </div>
            <div className={`w-8 h-px ${currentStep === 'details' || currentStep === 'confirmation' ? 'bg-green-400' : 'bg-gray-600'}`}></div>
            <div className={`flex items-center space-x-2 ${currentStep === 'details' ? 'text-cyan-400' : currentStep === 'confirmation' ? 'text-green-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'details' ? 'bg-cyan-500' : currentStep === 'confirmation' ? 'bg-green-500' : 'bg-gray-600'}`}>
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">Your Details</span>
            </div>
            <div className={`w-8 h-px ${currentStep === 'confirmation' ? 'bg-green-400' : 'bg-gray-600'}`}></div>
            <div className={`flex items-center space-x-2 ${currentStep === 'confirmation' ? 'text-green-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'confirmation' ? 'bg-green-500' : 'bg-gray-600'}`}>
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Calendar Step */}
        {currentStep === 'calendar' && (
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Calendar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Select Date</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="text-white font-medium min-w-[120px] text-center">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-gray-400 text-sm font-medium">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day.isAvailable ? handleDateSelect(day.date) : null}
                      disabled={!day.isAvailable}
                      className={`p-2 text-sm rounded-lg transition-all ${
                        !day.isCurrentMonth
                          ? 'text-gray-600 cursor-not-allowed'
                          : !day.isAvailable
                          ? 'text-gray-500 cursor-not-allowed'
                          : selectedDate?.toDateString() === day.date.toDateString()
                          ? 'bg-cyan-500 text-white'
                          : 'text-white hover:bg-slate-700'
                      }`}
                    >
                      {day.date.getDate()}
                    </button>
                  ))}
                </div>

                <div className="mt-4 text-sm text-gray-400">
                  <p>• Available Monday - Friday</p>
                  <p>• Times shown in Eastern Time</p>
                  <p>• Sessions are 60 minutes</p>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Select Time {selectedDate && `for ${selectedDate.toLocaleDateString()}`}
                </h3>
                
                {selectedDate ? (
                  <div className="space-y-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => slot.available ? handleTimeSelect(slot.time) : null}
                        disabled={!slot.available}
                        className={`w-full p-3 rounded-lg text-left transition-all ${
                          !slot.available
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : selectedTime === slot.time
                            ? 'bg-cyan-500 text-white'
                            : 'bg-slate-700 text-white hover:bg-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{slot.time} EST</span>
                          </div>
                          {slot.available ? (
                            <span className="text-green-400 text-sm">Available</span>
                          ) : (
                            <span className="text-red-400 text-sm">Booked</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Please select a date first</p>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="mt-6 p-4 bg-green-900/30 border border-green-700 rounded-lg">
                    <h4 className="text-green-400 font-semibold mb-2">Selected Session:</h4>
                    <p className="text-white">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-white">{selectedTime} EST (60 minutes)</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleNextStep}
                disabled={!selectedDate || !selectedTime}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Details
              </button>
            </div>
          </div>
        )}

        {/* Details Step */}
        {currentStep === 'details' && (
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Your Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={bookingData.firstName}
                      onChange={(e) => setBookingData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={bookingData.lastName}
                      onChange={(e) => setBookingData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      placeholder="Smith"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    value={bookingData.company}
                    onChange={(e) => setBookingData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Consultation Focus</label>
                  <select
                    value={bookingData.consultationType}
                    onChange={(e) => setBookingData(prev => ({ ...prev, consultationType: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  >
                    <option value="ai-strategy">AI Strategy & Implementation</option>
                    <option value="process-automation">Process Automation</option>
                    <option value="ai-analytics">AI Analytics & Insights</option>
                    <option value="custom-development">Custom AI Development</option>
                    <option value="general-consultation">General AI Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tell us about your goals</label>
                  <textarea
                    rows={6}
                    value={bookingData.message}
                    onChange={(e) => setBookingData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-none"
                    placeholder="Describe your current challenges and how you envision AI helping your business..."
                  />
                </div>

                {/* Session Summary */}
                <div className="p-4 bg-cyan-900/30 border border-cyan-700 rounded-lg">
                  <h4 className="text-cyan-400 font-semibold mb-2">Session Details:</h4>
                  <div className="space-y-1 text-sm text-white">
                    <p><strong>Date:</strong> {bookingData.date}</p>
                    <p><strong>Time:</strong> {bookingData.time} EST</p>
                    <p><strong>Duration:</strong> 60 minutes</p>
                    <p><strong>Format:</strong> Video call (Zoom link will be sent)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep('calendar')}
                className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg hover:bg-slate-700 transition-all"
              >
                Back to Calendar
              </button>
              <button
                onClick={handleSubmitBooking}
                disabled={!bookingData.firstName || !bookingData.lastName || !bookingData.email || isSubmitting}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Step */}
        {currentStep === 'confirmation' && (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">Booking Confirmed! 🎉</h3>
            <p className="text-gray-300 mb-6">
              Your AI Strategy Session has been successfully booked. You'll receive a confirmation email shortly with the Zoom meeting details.
            </p>

            <div className="bg-slate-700 p-6 rounded-xl mb-6 text-left max-w-md mx-auto">
              <h4 className="text-white font-semibold mb-4">Session Details:</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Date:</strong> {bookingData.date}</p>
                <p><strong>Time:</strong> {bookingData.time} EST</p>
                <p><strong>Duration:</strong> 60 minutes</p>
                <p><strong>Attendee:</strong> {bookingData.firstName} {bookingData.lastName}</p>
                <p><strong>Email:</strong> {bookingData.email}</p>
                {bookingData.company && <p><strong>Company:</strong> {bookingData.company}</p>}
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-400 mb-8">
              <p>✅ Confirmation email sent to {bookingData.email}</p>
              <p>✅ Calendar invite will be sent within 24 hours</p>
              <p>✅ Zoom meeting link included in calendar invite</p>
              <p>✅ Daniel will personally conduct your session</p>
            </div>

            <button
              onClick={handleClose}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulingModal;