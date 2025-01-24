
const timeFacts = [
    "A day on Venus is longer than its year!",
    "The concept of time zones was proposed in the 1870s.",
    "The first mechanical clock was invented in 725 CE.",
    "Humans can perceive time differences as small as 2 milliseconds.",
    "The Earth's rotation is gradually slowing down."
];

const timeBackgrounds = {
    morning: "linear-gradient(120deg, #f6d365, #fda085)",
    afternoon: "linear-gradient(120deg, #2980b9, #8e44ad)",
    evening: "linear-gradient(120deg, #ff758c, #ff7eb3)",
    night: "linear-gradient(120deg, #141e30, #243b55)"
};

function updateClock() {
    const now = new Date();
    const timeZone = document.getElementById('timezone-select').value;
    
    let timeString = now.toLocaleTimeString('en-US', { 
        timeZone: timeZone === 'local' ? undefined : timeZone,
        hour12: false 
    });
    
    let dateString = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: timeZone === 'local' ? undefined : timeZone
    });

    document.getElementById('clock').textContent = timeString;
    document.getElementById('date').textContent = dateString;


    const hour = now.getHours();
    let greeting = '';
    if (hour < 12) {
        greeting = 'Good Morning!';
        document.body.style.background = timeBackgrounds.morning;
    } else if (hour < 17) {
        greeting = 'Good Afternoon!';
        document.body.style.background = timeBackgrounds.afternoon;
    } else if (hour < 20) {
        greeting = 'Good Evening!';
        document.body.style.background = timeBackgrounds.evening;
    } else {
        greeting = 'Good Night!';
        document.body.style.background = timeBackgrounds.night;
    }
    document.getElementById('greeting').textContent = greeting;
}


function updateTimeFact() {
    const factElement = document.getElementById('time-fact');
    const randomFact = timeFacts[Math.floor(Math.random() * timeFacts.length)];
    factElement.textContent = "Did you know? " + randomFact;
}


function updateWeather() {
    const weatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'];
    const temperatures = Array.from({length: 30}, (_, i) => i + 10); 
    
    const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const randomTemp = temperatures[Math.floor(Math.random() * temperatures.length)];
    
    document.querySelector('.weather-info').textContent = 
        `${randomCondition} ${randomTemp}°C`;
}


document.querySelectorAll('.style-btn').forEach(button => {
    button.addEventListener('click', () => {
        const style = button.dataset.style;
        document.querySelector('.clock-container').className = 
            `clock-container ${style}`;
    });
});

function init() {

    updateClock();
    setInterval(updateClock, 1000);

    updateWeather();
    setInterval(updateWeather, 300000);

    updateTimeFact();
    setInterval(updateTimeFact, 30000);

    document.getElementById('timezone-select').addEventListener('change', updateClock);
}

window.addEventListener('load', init);