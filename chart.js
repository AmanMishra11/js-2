// Data sets
const data = {
    weekly: {
        revenue: [12500, 15000, 17500, 21000, 19500, 22000, 24500],
        users: [120, 150, 170, 190, 185, 195, 210],
        performance: [85, 88, 87, 89, 91, 90, 92]
    },
    monthly: {
        revenue: [45000, 52000, 58000, 63000, 68000, 72000, 78000],
        users: [450, 520, 580, 630, 680, 720, 780],
        performance: [86, 87, 89, 88, 90, 91, 92]
    },
    yearly: {
        revenue: [540000, 624000, 696000, 756000, 816000, 864000, 936000],
        users: [5400, 6240, 6960, 7560, 8160, 8640, 9360],
        performance: [87, 88, 89, 90, 91, 92, 93]
    }
};

// Chart instances
let revenueChart, userChart, performanceChart;

// Update the Chart.js defaults to match the dark theme
Chart.defaults.color = '#94a3b8';
Chart.defaults.borderColor = '#334155';
Chart.defaults.scale.grid.color = '#334155';

// Initialize charts
function initializeCharts(period = 'weekly') {
    // Revenue Line Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
            datasets: [{
                label: 'Revenue',
                data: data[period].revenue,
                borderColor: '#7c3aed',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(124, 58, 237, 0.1)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleColor: '#f8fafc',
                    bodyColor: '#f8fafc',
                    borderColor: '#334155',
                    borderWidth: 1
                }
            }
        }
    });

    // User Distribution Pie Chart
    const userCtx = document.getElementById('userChart').getContext('2d');
    userChart = new Chart(userCtx, {
        type: 'doughnut',
        data: {
            labels: ['Mobile', 'Desktop', 'Tablet'],
            datasets: [{
                data: [45, 40, 15],
                backgroundColor: ['#7c3aed', '#4f46e5', '#818cf8']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#94a3b8'
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleColor: '#f8fafc',
                    bodyColor: '#f8fafc',
                    borderColor: '#334155',
                    borderWidth: 1
                }
            }
        }
    });

    // Performance Bar Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    performanceChart = new Chart(performanceCtx, {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
            datasets: [{
                label: 'Performance Score',
                data: data[period].performance,
                backgroundColor: '#4f46e5'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleColor: '#f8fafc',
                    bodyColor: '#f8fafc',
                    borderColor: '#334155',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#334155'
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                },
                x: {
                    grid: {
                        color: '#334155'
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                }
            }
        }
    });
}

// Update stats with animation
function updateStats(period) {
    const stats = {
        totalRevenue: data[period].revenue[data[period].revenue.length - 1],
        activeUsers: data[period].users[data[period].users.length - 1],
        growthRate: 12.5
    };

    anime({
        targets: '#totalRevenue .value',
        innerHTML: [0, stats.totalRevenue],
        round: 1,
        duration: 1200,
        easing: 'easeInOutExpo',
        update: function(anim) {
            document.querySelector('#totalRevenue .value').innerHTML = 
                '$' + Math.floor(anim.animations[0].currentValue).toLocaleString();
        }
    });

    anime({
        targets: '#activeUsers .value',
        innerHTML: [0, stats.activeUsers],
        round: 1,
        duration: 1200,
        easing: 'easeInOutExpo',
        update: function(anim) {
            document.querySelector('#activeUsers .value').innerHTML = 
                Math.floor(anim.animations[0].currentValue).toLocaleString();
        }
    });

    anime({
        targets: '#growthRate .value',
        innerHTML: [0, stats.growthRate],
        round: 1,
        duration: 1200,
        easing: 'easeInOutExpo',
        update: function(anim) {
            document.querySelector('#growthRate .value').innerHTML = 
                Math.floor(anim.animations[0].currentValue) + '%';
        }
    });
}

// Handle time filter clicks
document.querySelectorAll('.time-filter button').forEach(button => {
    button.addEventListener('click', () => {
        // Update active state
        document.querySelector('.time-filter button.active').classList.remove('active');
        button.classList.add('active');

        // Update charts
        const period = button.dataset.period;
        revenueChart.data.datasets[0].data = data[period].revenue;
        performanceChart.data.datasets[0].data = data[period].performance;
        
        revenueChart.update();
        performanceChart.update();

        // Update stats with animation
        updateStats(period);
    });
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    updateStats('weekly');
});