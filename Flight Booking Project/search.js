// Search Results Page - JavaScript

// Render flights based on filters and sort
function renderFlights() {
  const flightsList = document.getElementById('flights-list');
  const sortBy = flightsList.dataset.sort || 'price';
  const stopsFilter = flightsList.dataset.stops || '2';

  let flights = [...app.mockFlights];

  // Filter by stops
  if (stopsFilter === '0') {
    flights = flights.filter(f => f.stops === 0);
  } else if (stopsFilter === '1') {
    flights = flights.filter(f => f.stops <= 1);
  }

  // Sort flights
  if (sortBy === 'price') {
    flights.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'duration') {
    flights.sort((a, b) => {
      const aDuration = parseInt(a.duration);
      const bDuration = parseInt(b.duration);
      return aDuration - bDuration;
    });
  } else if (sortBy === 'departure') {
    flights.sort((a, b) => a.departTime.localeCompare(b.departTime));
  }

  // Render HTML
  flightsList.innerHTML = flights.map(flight => `
    <div class="card" style="margin-bottom: 1rem;">
      <div style="display: grid; grid-template-columns: 200px 1fr 200px; gap: 2rem; align-items: center;">
        <!-- Airline Info -->
        <div style="display: flex; gap: 1rem; align-items: center;">
          <div style="width: 2.75rem; height: 2.75rem; border-radius: 0.5rem; background-color: ${flight.color}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.875rem;">
            ${flight.code}
          </div>
          <div>
            <div style="font-weight: bold; font-size: 0.875rem;">${flight.airline}</div>
            <div style="font-size: 0.75rem; color: var(--text-light);">${flight.flightNumber} · ${flight.aircraft}</div>
          </div>
        </div>

        <!-- Flight Times -->
        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; align-items: center;">
          <div>
            <div style="font-size: 1.5rem; font-weight: bold;">${flight.departTime}</div>
            <div style="font-size: 0.75rem; color: var(--text-light);">${flight.departure} · ${flight.departDate}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-light); margin-bottom: 0.5rem; font-weight: bold;">
              ${flight.duration}
            </div>
            <div style="border-top: 1px solid var(--border-color); position: relative; height: 1px; margin: 0.5rem 0;">
              <span style="position: absolute; top: -0.75rem; left: 50%; transform: translateX(-50%); background: white; padding: 0 0.25rem; font-size: 1rem;">✈️</span>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-light); margin-top: 0.5rem;">
              ${flight.stopInfo}
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.5rem; font-weight: bold;">${flight.arrivalTime}</div>
            <div style="font-size: 0.75rem; color: var(--text-light);">${flight.arrival} · ${flight.arrivalDate}</div>
          </div>
        </div>

        <!-- Price and CTA -->
        <div style="text-align: right;">
          <div style="display: inline-block; background: var(--accent-orange); color: white; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.625rem; font-weight: bold; margin-bottom: 0.5rem;">
            ${sortBy === 'price' ? 'CHEAPEST' : 'BEST'}
          </div>
          <div style="font-size: 0.75rem; color: var(--text-light); text-transform: uppercase; font-weight: bold; margin-bottom: 0.25rem;">
            From
          </div>
          <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary-blue); margin-bottom: 1rem;">
            ₹${flight.price.toLocaleString()}
          </div>
          <button class="btn btn-secondary" onclick="selectFlight('${flight.id}')">
            Select →
          </button>
        </div>
      </div>

      <!-- Flight Features -->
      <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed var(--border-color); display: flex; flex-wrap: wrap; gap: 1.5rem; font-size: 0.75rem; color: var(--text-light);">
        <span>💼 ${flight.baggage}</span>
        ${flight.features.map(f => `<span>📡 ${f}</span>`).join('')}
        <span>⏱️ ${flight.seatsLeft} seats left</span>
      </div>
    </div>
  `).join('');
}

// Select flight and navigate to seats
function selectFlight(flightId) {
  app.bookingState.selectedFlight = flightId;
  app.navigateTo('seats');
}

// Initialize search page
document.addEventListener('DOMContentLoaded', function() {
  // Render flights when search page is accessed
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      const searchPage = document.getElementById('search');
      if (searchPage && !searchPage.classList.contains('hidden')) {
        renderFlights();
      }
    });
  });

  const searchPage = document.getElementById('search');
  if (searchPage) {
    observer.observe(searchPage, { attributes: true, attributeFilter: ['class'] });
  }
});
