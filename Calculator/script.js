document.addEventListener('DOMContentLoaded', () => {
    const priceInput = document.getElementById('basic-price');
    const discountInput = document.getElementById('basic-discount');
    const finalPriceDisplay = document.getElementById('final-price');
    const savingsAmountDisplay = document.getElementById('savings-amount');

    function calculate() {
        const price = parseFloat(priceInput.value) || 0;
        const discount = parseFloat(discountInput.value) || 0;
        
        const savings = (price * discount) / 100;
        const finalPrice = price - savings;

        finalPriceDisplay.textContent = `$${finalPrice.toFixed(2)}`;
        savingsAmountDisplay.textContent = `$${savings.toFixed(2)}`;
    }

    priceInput.addEventListener('input', calculate);
    discountInput.addEventListener('input', calculate);

    // Initial calculation
    calculate();
});
