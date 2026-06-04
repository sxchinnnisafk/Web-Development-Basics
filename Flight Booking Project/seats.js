// Seat Selection Page - JavaScript

// Generate seat map
function generateSeatMap() {
  const seatMap = document.getElementById('seat-map');
  if (!seatMap) return;

  const rows = 20;
  const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
  let html = '<div style="display: inline-block;">';

  for (let row = 1; row <= rows; row++) {
    html += '<div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem; align-items: center;">';
    html += `<div style="width: 2rem; text-align: right; font-size: 0.75rem; color: var(--text-light);">${row}</div>`;
    html += '<div style="display: flex; gap: 0.5rem;">';

    columns.forEach(col => {
      const seatId = `${row}${col}`;
      const isOccupied = Math.random() > 0.7;
      const isExtraLegroom = row <= 3;
      const isEmergencyExit = row === 10 || row === 11;

      let bgColor = '#E5E7EB';
      let cursor = 'pointer';
      let title = `${seatId} - Standard`;

      if (isOccupied) {
        bgColor = '#999';
        cursor = 'not-allowed';
        title = `${seatId} - Occupied`;
      } else if (isExtraLegroom) {
        bgColor = 'var(--accent-orange)';
        title = `${seatId} - Extra Legroom`;
      } else if (isEmergencyExit) {
        bgColor = '#999';
        title = `${seatId} - Emergency Exit`;
      }

      html += `
        <button 
          type="button"
          class="seat-btn"
          data-seat-id="${seatId}"
          data-occupied="${isOccupied}"
          data-price="${isExtraLegroom ? 500 : isEmergencyExit ? 300 : 0}"
          title="${title}"
          style="
            width: 2rem;
            height: 2rem;
            border: none;
            border-radius: 0.25rem;
            background-color: ${bgColor};
            color: white;
            font-weight: bold;
            font-size: 0.75rem;
            cursor: ${cursor};
            transition: all 0.2s;
          "
          onclick="toggleSeat(this)"
          ${isOccupied ? 'disabled' : ''}
        >
          ${columns.indexOf(col) + 1}
        </button>
      `;
    });

    html += '</div></div>';
  }

  html += '</div>';
  seatMap.innerHTML = html;

  // Add event listeners
  document.querySelectorAll('.seat-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      toggleSeat(this);
    });
  });
}

// Toggle seat selection
function toggleSeat(btn) {
  if (btn.dataset.occupied === 'true') return;

  const seatId = btn.dataset.seatId;
  const isSelected = app.bookingState.selectedSeats.includes(seatId);

  if (isSelected) {
    app.bookingState.selectedSeats = app.bookingState.selectedSeats.filter(s => s !== seatId);
    btn.style.backgroundColor = btn.dataset.price > 0 ? 'var(--accent-orange)' : '#E5E7EB';
  } else {
    if (app.bookingState.selectedSeats.length < 4) {
      app.bookingState.selectedSeats.push(seatId);
      btn.style.backgroundColor = 'var(--primary-blue)';
    } else {
      app.showAlert('You can select up to 4 seats only', 'warning');
      return;
    }
  }

  updateSeatsSummary();
}

// Update seats summary
function updateSeatsSummary() {
  const selectedList = document.getElementById('selected-seats-list');
  const totalPrice = document.getElementById('total-price');

  if (app.bookingState.selectedSeats.length === 0) {
    selectedList.innerHTML = '<p style="color: var(--text-light); font-size: 0.875rem;">No seats selected yet</p>';
  } else {
    let total = 3900;
    let html = '';

    app.bookingState.selectedSeats.forEach(seatId => {
      const btn = document.querySelector(`[data-seat-id="${seatId}"]`);
      const price = parseInt(btn.dataset.price);
      total += price;

      const seatType = price > 0 ? (price === 500 ? 'Extra Legroom' : 'Emergency Exit') : 'Standard';
      html += `
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; margin-bottom: 0.5rem;">
          <span style="font-weight: bold;">${seatId}</span>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 0.75rem; color: var(--text-light);">${seatType}</span>
            ${price > 0 ? `<span style="font-weight: bold; color: var(--primary-blue);">+₹${price}</span>` : ''}
          </div>
        </div>
      `;
    });

    selectedList.innerHTML = html;
  }

  // Update total price
  let total = 3900;
  app.bookingState.selectedSeats.forEach(seatId => {
    const btn = document.querySelector(`[data-seat-id="${seatId}"]`);
    total += parseInt(btn.dataset.price);
  });

  totalPrice.textContent = app.formatCurrency(total);
}

// Initialize seat selection page
document.addEventListener('DOMContentLoaded', function() {
  // Generate seat map when seats page is accessed
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      const seatsPage = document.getElementById('seats');
      if (seatsPage && !seatsPage.classList.contains('hidden')) {
        if (!document.querySelector('.seat-btn')) {
          generateSeatMap();
        }
      }
    });
  });

  const seatsPage = document.getElementById('seats');
  if (seatsPage) {
    observer.observe(seatsPage, { attributes: true, attributeFilter: ['class'] });
  }
});
