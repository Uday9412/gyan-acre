(function () {
    var loanForm = document.getElementById('loan-form');
    if (!loanForm) {
        return;
    }

    loanForm.addEventListener('submit', calculateResults);

    function calculateResults(e) {
        e.preventDefault();

        var amount = document.getElementById('amount');
        var interest = document.getElementById('interest');
        var years = document.getElementById('years');
        var monthlyPayment = document.getElementById('monthly-payment');
        var totalPayment = document.getElementById('total-payment');
        var totalInterest = document.getElementById('total-interest');
        var results = document.getElementById('results');

        var principal = parseFloat(amount.value);
        var annualRate = parseFloat(interest.value);
        var yearCount = parseFloat(years.value);
        var months = yearCount * 12;

        if (!principal || !annualRate || !yearCount || principal <= 0 || annualRate <= 0 || yearCount <= 0) {
            showError('Please enter valid loan amount, interest rate, and years.');
            return;
        }

        var monthlyRate = annualRate / 100 / 12;
        var monthly;

        if (monthlyRate === 0) {
            monthly = principal / months;
        } else {
            var factor = Math.pow(1 + monthlyRate, months);
            monthly = (principal * factor * monthlyRate) / (factor - 1);
        }

        if (isFinite(monthly)) {
            monthlyPayment.value = monthly.toFixed(2);
            totalPayment.value = (monthly * months).toFixed(2);
            totalInterest.value = ((monthly * months) - principal).toFixed(2);
            if (results) {
                results.style.display = 'block';
            }
        } else {
            showError('Please check your numbers');
        }
    }

    function showError(message) {
        var container = document.querySelector('.emi_calculator_sidebar_po');
        if (!container) {
            return;
        }

        clearError();

        var errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger loan-calculator-error';
        errorDiv.textContent = message;
        container.insertBefore(errorDiv, container.querySelector('h3').nextSibling);
        setTimeout(clearError, 3000);
    }

    function clearError() {
        var existing = document.querySelector('.loan-calculator-error');
        if (existing) {
            existing.remove();
        }
    }

    if (typeof jQuery !== 'undefined') {
        jQuery('#results').on('click', function () {
            jQuery(this).toggle();
            jQuery('body').toggleClass('over_hidden');
        });
    }
})();
