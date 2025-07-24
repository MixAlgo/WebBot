document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation ---
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mainNav = document.getElementById('main-nav');

    mobileNavToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
    
    // Close mobile nav when a link is clicked
    mainNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mainNav.classList.remove('active');
        }
    });


    // --- Modal Logic ---
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('.close-modal-btn');
    const overlay = document.getElementById('overlay');

    const openModal = (modal) => {
        if (modal == null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
    };

    const closeModal = (modal) => {
        if (modal == null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
    };

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });


    // --- Calculator Logic ---
    const calculatorForm = document.getElementById('profit-calculator');
    const resultsOutput = document.getElementById('results-output');

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const calculateAndDisplay = () => {
        const initialDeposit = parseFloat(document.getElementById('initial-deposit').value) || 0;
        const monthlyDeposit = parseFloat(document.getElementById('monthly-deposit').value) || 0;
        const duration = parseInt(document.getElementById('duration').value) || 0;
        const monthlyProfitRate = (parseFloat(document.getElementById('monthly-profit').value) || 0) / 100;

        if (duration <= 0) {
             resultsOutput.innerHTML = `<p>Hisoblash uchun ma'lumotlarni to'g'ri kiriting.</p>`;
             return;
        }

        let totalBalance = initialDeposit;
        let totalInvested = initialDeposit;

        for (let i = 1; i <= duration; i++) {
            // Oylik daromadni hisoblash (reinvestitsiya)
            const profitThisMonth = totalBalance * monthlyProfitRate;
            totalBalance += profitThisMonth;
            
            // Keyingi oy uchun qo'shimcha sarmoyani qo'shish (oxirgi oydan keyin qo'shilmaydi)
            if (i < duration) {
                 totalBalance += monthlyDeposit;
                 totalInvested += monthlyDeposit;
            }
        }

        const totalProfit = totalBalance - totalInvested;

        resultsOutput.innerHTML = `
            <h4>${duration} oydan keyingi natija:</h4>
            <p>Boshlang'ich sarmoya: <span>${formatCurrency(initialDeposit)}</span></p>
            <p>Qo'shimcha sarmoyalar: <span>${formatCurrency(totalInvested - initialDeposit)}</span></p>
            <p>Jami sarmoya: <span>${formatCurrency(totalInvested)}</span></p>
            <p>Sof foyda: <span style="color: var(--secondary-color);">${formatCurrency(totalProfit)}</span></p>
            <p class="total-balance">Umumiy balans: <span>${formatCurrency(totalBalance)}</span></p>
        `;
    };

    calculatorForm.addEventListener('submit', function(event) {
        event.preventDefault();
        calculateAndDisplay();
    });
    
    // Input o'zgarganda avtomatik hisoblash
    calculatorForm.addEventListener('input', calculateAndDisplay);

    // Sahifa yuklanganda bir marta hisoblash
    calculateAndDisplay();

});
