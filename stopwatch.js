document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const millisecondsDisplay = document.getElementById('milliseconds');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapTimes = document.getElementById('lapTimes');
    const stopwatch = document.querySelector('.stopwatch');

    let intervalId = null;
    let startTime = 0;
    let elapsedTime = 0;
    let lapNumber = 1;

    // Format time to display
    function formatTime(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);

        return {
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
            milliseconds: milliseconds.toString().padStart(2, '0')
        };
    }

    // Update display
    function updateDisplay(timeObj) {
        minutesDisplay.textContent = timeObj.minutes;
        secondsDisplay.textContent = timeObj.seconds;
        millisecondsDisplay.textContent = timeObj.milliseconds;
    }

    // Start the stopwatch
    function start() {
        if (intervalId) return;

        stopwatch.classList.add('running');
        startBtn.disabled = true;
        const timeStart = Date.now() - elapsedTime;

        intervalId = setInterval(() => {
            elapsedTime = Date.now() - timeStart;
            updateDisplay(formatTime(elapsedTime));
        }, 10);
    }

    // Stop the stopwatch
    function stop() {
        if (!intervalId) return;

        stopwatch.classList.remove('running');
        startBtn.disabled = false;
        clearInterval(intervalId);
        intervalId = null;
    }

    // Reset the stopwatch
    function reset() {
        stop();
        elapsedTime = 0;
        updateDisplay(formatTime(0));
        lapTimes.innerHTML = '';
        lapNumber = 1;
    }

    // Record lap time
    function lap() {
        if (!intervalId) return;

        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapNumber} - ${lapTime.minutes}:${lapTime.seconds}:${lapTime.milliseconds}`;
        
        // Add with animation
        lapItem.style.opacity = '0';
        lapTimes.insertBefore(lapItem, lapTimes.firstChild);
        
        // Trigger animation
        setTimeout(() => {
            lapItem.style.transition = 'opacity 0.3s ease';
            lapItem.style.opacity = '1';
        }, 10);

        lapNumber++;
    }

    // Event listeners
    startBtn.addEventListener('click', start);
    stopBtn.addEventListener('click', stop);
    resetBtn.addEventListener('click', reset);
    lapBtn.addEventListener('click', lap);

    // Keyboard shortcuts
    document.addEventListener('keypress', (e) => {
        switch(e.key.toLowerCase()) {
            case 's':
                start();
                break;
            case 'p':
                stop();
                break;
            case 'r':
                reset();
                break;
            case 'l':
                lap();
                break;
        }
    });
});