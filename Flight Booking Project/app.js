// Flight Booking Application - Main JavaScript

// Navigation between pages
function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.classList.add('hidden');
  });

  // Show selected page
  const targetPage = document.getElementById(page);
  if (targetPage) {
    targetPage.classList.remove('hidden');
    window.scrollTo(0, 0);
  }
}

// Mock flight data
const mockFlights = [
  {
    id: 'flt_1',
    airline: 'Air France',
    code: 'AF',
    flightNumber: 'AF3607',
    aircraft: 'A321',
    departure: 'DEL',
    departTime: '09:55',
    departDate: '20 Mar',
    arrival: 'DXB',
    arrivalTime: '13:38',
    arrivalDate: '20 Mar',
    duration: '3h 43m',
    stops: 0,
    stopInfo: 'Non-stop',
    price: 3900,
    baggage: '7 kg cabin · 15 kg check-in',
    features: ['USB Power', 'In-flight entertainment', 'Extra legroom'],
    seatsLeft: 8,
    color: 'rgb(0, 33, 87)'
  },
  {
    id: 'flt_2',
    airline: 'Qatar Airways',
    code: 'QR',
    flightNumber: 'QR2391',
    aircraft: 'B777-300ER',
    departure: 'DEL',
    departTime: '00:25',
    departDate: '20 Mar',
    arrival: 'DXB',
    arrivalTime: '08:39',
    arrivalDate: '21 Mar',
    duration: '8h 14m',
    stops: 1,
    stopInfo: '1 stop · BKK',
    price: 4200,
    baggage: '7 kg cabin · 23 kg check-in',
    features: ['Meal service', 'Premium entertainment', 'Extra legroom'],
    seatsLeft: 12,
    color: 'rgb(92, 15, 42)'
  },
  {
    id: 'flt_3',
    airline: 'Emirates',
    code: 'EK',
    flightNumber: 'EK501',
    aircraft: 'B777-300ER',
    departure: 'DEL',
    departTime: '14:30',
    departDate: '20 Mar',
    arrival: 'DXB',
    arrivalTime: '18:15',
    arrivalDate: '20 Mar',
    duration: '3h 45m',
    stops: 0,
    stopInfo: 'Non-stop',
    price: 5200,
    baggage: '7 kg cabin · 23 kg check-in',
    features: ['Meal service', 'Premium entertainment', 'Shower spa'],
    seatsLeft: 5,
    color: 'rgb(255, 0, 0)'
  },
  {
    id: 'flt_4',
    airline: 'Indigo',
    code: '6E',
    flightNumber: '6E2456',
    aircraft: 'A320',
    departure: 'DEL',
    departTime: '11:00',
    departDate: '20 Mar',
    arrival: 'DXB',
    arrivalTime: '14:45',
    arrivalDate: '20 Mar',
    duration: '3h 45m',
    stops: 0,
    stopInfo: 'Non-stop',
    price: 3500,
    baggage: '5 kg cabin · 15 kg check-in',
    features: ['USB Power', 'Snack service'],
    seatsLeft: 15,
    color: 'rgb(16, 61, 184)'
  }
];

// Global state
let bookingState = {
  searchParams: {
    from: 'DEL',
    to: 'DXB',
    date: '2026-03-20',
    travelers: '1',
    cabin: 'Economy'
  },
  selectedFlight: null,
  selectedSeats: [],
  passengers: [],
  paymentInfo: null
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  console.log('Flight Booking App Initialized');
  navigateTo('home');
});

// Scroll to search form
function scrollToSearch() {
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.scrollIntoView({ behavior: 'smooth' });
  }
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(amount);
}

// Show alert message
function showAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `
    <span>${message}</span>
  `;
  
  const container = document.querySelector('.container');
  if (container) {
    container.insertBefore(alertDiv, container.firstChild);
    setTimeout(() => {
      alertDiv.remove();
    }, 3000);
  }
}

// Validate email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone
function isValidPhone(phone) {
  const re = /^[\d\s\-\+\(\)]{10,}$/;
  return re.test(phone);
}

// Format card number
function formatCardNumber(value) {
  return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
}

// Format expiry date
function formatExpiryDate(value) {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
  }
  return cleaned;
}

// Generate booking reference
function generateBookingReference() {
  return 'SL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Local storage helpers
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

// Export functions for use in HTML
window.app = {
  navigateTo,
  scrollToSearch,
  formatCurrency,
  showAlert,
  isValidEmail,
  isValidPhone,
  formatCardNumber,
  formatExpiryDate,
  generateBookingReference,
  saveToLocalStorage,
  getFromLocalStorage,
  bookingState,
  mockFlights
};
