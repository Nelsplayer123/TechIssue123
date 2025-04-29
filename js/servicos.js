/**
 * TechIssue - Services Page JavaScript
 * Handles interactive elements on the services page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize accordions for FAQs
    initAccordions();
    
    // Initialize ROI calculator
    initRoiCalculator();
    
    // Initialize service comparisons
    initServiceComparisons();
    
    // Initialize investment calculator
    initInvestmentCalculator();
    
    // Initialize plan modal and PDF download
    initPlanosFeatures();
});

/**
 * Initialize accordions for FAQ section
 */
function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion__header');
        
        if (header) {
            header.addEventListener('click', () => {
                // Close all other accordions
                accordions.forEach(item => {
                    if (item !== accordion && item.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current accordion
                accordion.classList.toggle('active');
            });
        }
    });
}

/**
 * Initialize ROI calculator
 */
function initRoiCalculator() {
    const calculator = document.querySelector('.calculator');
    
    if (calculator) {
        const form = calculator.querySelector('.calculator__form');
        const resultElement = calculator.querySelector('.resultado-valor');
        
        if (form && resultElement) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get input values
                const investimento = parseFloat(document.getElementById('investimento').value) || 0;
                const retorno = parseFloat(document.getElementById('retorno').value) || 0;
                const periodo = parseInt(document.getElementById('periodo').value) || 1;
                
                // Calculate ROI
                const roi = calculateROI(investimento, retorno, periodo);
                
                // Display result
                resultElement.textContent = `${roi.toFixed(2)}%`;
                
                // Show result with animation
                resultElement.classList.add('animated');
                setTimeout(() => {
                    resultElement.classList.remove('animated');
                }, 1000);
            });
        }
    }
}

/**
 * Calculate ROI based on investment, return and period
 */
function calculateROI(investimento, retorno, periodo) {
    // Simple ROI calculation: (Net Return / Cost of Investment) * 100
    const netReturn = (retorno * periodo) - investimento;
    const roi = (netReturn / investimento) * 100;
    
    return roi > 0 ? roi : 0;
}

/**
 * Initialize service comparisons functionality
 */
function initServiceComparisons() {
    const comparisonTabs = document.querySelectorAll('.comparison-tab');
    const comparisonPanels = document.querySelectorAll('.comparison-panel');
    
    if (comparisonTabs.length && comparisonPanels.length) {
        comparisonTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and panels
                comparisonTabs.forEach(tab => tab.classList.remove('active'));
                comparisonPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding panel
                tab.classList.add('active');
                comparisonPanels[index].classList.add('active');
            });
        });
    }
    
    // Initialize comparison filters
    const filterButtons = document.querySelectorAll('.filter-button');
    const tableRows = document.querySelectorAll('.comparativo-servicos tbody tr');
    
    if (filterButtons.length && tableRows.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter value
                const filter = button.getAttribute('data-filter');
                
                // Filter table rows
                tableRows.forEach(row => {
                    if (filter === 'all') {
                        row.style.display = '';
                    } else {
                        const category = row.getAttribute('data-category');
                        row.style.display = category === filter ? '' : 'none';
                    }
                });
            });
        });
    }
}

/**
 * Initialize investment calculator for the Plans section
 */
function initInvestmentCalculator() {
    const calculatorBtn = document.getElementById('calcular-investimento');
    const resultadoElement = document.getElementById('resultado-investimento');
    const economiaElement = document.getElementById('economia-anual');
    
    if (calculatorBtn && resultadoElement) {
        calculatorBtn.addEventListener('click', function() {
            // Get selected values
            const planoValue = parseFloat(document.getElementById('plano-site').value) || 0;
            const dominioValue = parseFloat(document.getElementById('dominio-site').value) || 0;
            
            // Calculate monthly cost including domain (amortized)
            const domainMonthly = dominioValue / 12;
            const totalMonthly = planoValue + domainMonthly;
            
            // Calculate annual savings (10% discount for annual payment)
            const annualSavings = planoValue * 0.1;
            const savingsPercentage = (annualSavings / planoValue) * 100;
            
            // Update result display
            if (planoValue === 0) {
                resultadoElement.textContent = 'Consultar';
                economiaElement.textContent = 'N/A';
            } else {
                resultadoElement.textContent = `${totalMonthly.toFixed(0)} AKZ`;
                economiaElement.textContent = `${savingsPercentage.toFixed(0)}% (${annualSavings.toFixed(0)} AKZ)`;
            }
            
            // Add animation
            resultadoElement.classList.add('pulse');
            setTimeout(() => {
                resultadoElement.classList.remove('pulse');
            }, 1000);
        });
    }
}

/**
 * Initialize Planos section features
 */
function initPlanosFeatures() {
    // Modal for request custom quote
    const solicitarOrcamentoBtn = document.getElementById('solicitar-orcamento');
    
    if (solicitarOrcamentoBtn) {
        solicitarOrcamentoBtn.addEventListener('click', function() {
            // Here you would normally open a modal
            // For simplicity, let's redirect to contact page
            window.location.href = 'contato.html?tipo=orcamento';
        });
    }
    
    // PDF Download functionality
    const downloadPdfBtn = document.getElementById('download-pdf');
    
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Here you would normally trigger PDF download
            // For demo, we'll just show an alert
            alert('O download do PDF será disponibilizado em breve!');
        });
    }
    
    // Domain prices data for integration with any component
    const domainPrices = [
        { tipo: '.it.ao', preco: 5900 },
        { tipo: '.edu.ao', preco: 35900 },
        { tipo: '.org.ao', preco: 35900 },
        { tipo: '.co.ao', preco: 35900 },
        { tipo: '.ao', preco: 25900 },
        { tipo: '.com', preco: 25900 }
    ];
    
    // Web hosting plans data
    const hostingPlans = [
        { tipo: 'Pequeno Porte', preco: 1100, capacidade: '5 páginas' },
        { tipo: 'Médio Porte', preco: 18600, capacidade: '15 páginas' },
        { tipo: 'Grande Porte', preco: 0, capacidade: 'Ilimitadas' },
        { tipo: 'Loja Virtual', preco: 0, capacidade: 'Até 1000 produtos' }
    ];
    
    // Function to calculate total (can be used by any component)
    function calculateTotal(planPrice, domainPrice) {
        // Monthly cost including domain (domain is annual)
        return planPrice + (domainPrice / 12);
    }
    
    // Currency converter (AKZ to USD)
    function convertToUSD(valueAKZ) {
        // Using a sample exchange rate (this should be updated dynamically)
        const exchangeRate = 0.001; // 1 AKZ = 0.001 USD
        return valueAKZ * exchangeRate;
    }
}
