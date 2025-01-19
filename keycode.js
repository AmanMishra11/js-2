document.addEventListener('DOMContentLoaded', () => {

    const keyPressed = document.getElementById('keyPressed');
    const keyCode = document.getElementById('keyCode');
    const keyCombo = document.getElementById('keyCombo');
    const keyHistory = document.getElementById('keyHistory');
    const soundToggle = document.getElementById('soundToggle');

    let audioContext = null;
    let oscillator = null;

    const maxHistoryItems = 15;
    const keyHistoryArray = [];

    function initAudio() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    function playSound(frequency = 440, duration = 50) {
        if (!audioContext || !soundToggle.checked) return;

        oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        gainNode.gain.value = 0.1;

        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
        }, duration);
    }

    function addToHistory(key, code) {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.textContent = `${key} (${code})`;

        keyHistoryArray.unshift({ key, code });
        if (keyHistoryArray.length > maxHistoryItems) {
            keyHistoryArray.pop();
        }

        keyHistory.insertBefore(historyItem, keyHistory.firstChild);
        if (keyHistory.children.length > maxHistoryItems) {
            keyHistory.removeChild(keyHistory.lastChild);
        }
    }

    function updateDisplay(event) {

        if (event.ctrlKey || event.altKey || event.metaKey) {
            event.preventDefault();
        }

        keyPressed.textContent = event.key === ' ' ? 'Space' : event.key;
        keyPressed.classList.add('active');

        keyCode.textContent = event.keyCode;
        keyCode.classList.add('active');

        const combo = [];
        if (event.ctrlKey) combo.push('Ctrl');
        if (event.altKey) combo.push('Alt');
        if (event.shiftKey) combo.push('Shift');
        if (event.metaKey) combo.push('Meta');
        if (event.key !== 'Control' && event.key !== 'Alt' && 
            event.key !== 'Shift' && event.key !== 'Meta') {
            combo.push(event.key);
        }
        keyCombo.textContent = combo.length ? combo.join(' + ') : '-';
        keyCombo.classList.add('active');

        addToHistory(event.key, event.keyCode);

        playSound(event.keyCode * 2);

        setTimeout(() => {
            keyPressed.classList.remove('active');
            keyCode.classList.remove('active');
            keyCombo.classList.remove('active');
        }, 200);
    }

    document.addEventListener('keydown', (event) => {
        if (!audioContext) {
            initAudio();
        }
        updateDisplay(event);
    });

    soundToggle.addEventListener('change', () => {
        if (soundToggle.checked && !audioContext) {
            initAudio();
        }
    });
});

