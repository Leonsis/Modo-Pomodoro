// Estado do Pomodoro
let state = {
    isRunning: false,
    isPaused: false,
    currentMode: 'pomodoro', // 'pomodoro', 'shortBreak', 'longBreak'
    timeLeft: 25 * 60, // segundos
    pomodoroCount: 0,
    sessionCount: 1,
    totalPomodoros: 0,
    interval: null
};

// Configurações padrão
let settings = {
    pomodoroTime: 25, // minutos
    shortBreakTime: 5, // minutos
    longBreakTime: 15 // minutos
};

// Elementos DOM
const timerDisplay = document.getElementById('timerDisplay');
const timerLabel = document.getElementById('timerLabel');
const statusText = document.getElementById('statusText');
const statusIndicator = document.getElementById('statusIndicator');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const pomodoroCountEl = document.getElementById('pomodoroCount');
const sessionCountEl = document.getElementById('sessionCount');
const progressCircle = document.getElementById('progressCircle');
const timerCard = document.querySelector('.timer-card');
const arrowDown = document.getElementById('arrowDown');
const instructionsAccordion = document.getElementById('instructionsAccordion');

// Inputs de configuração
const pomodoroTimeInput = document.getElementById('pomodoroTime');
const shortBreakTimeInput = document.getElementById('shortBreakTime');
const longBreakTimeInput = document.getElementById('longBreakTime');

// Inicialização
function init() {
    loadSettings();
    setupEventListeners();
    updateProgress(); // Inicializar progresso primeiro
    updateDisplay();
    updateTimerLabel();
    updateCounters();
    updateStatus();
    updateButtons();
}

// Carregar configurações
function loadSettings() {
    settings.pomodoroTime = parseInt(pomodoroTimeInput.value) || 25;
    settings.shortBreakTime = parseInt(shortBreakTimeInput.value) || 5;
    settings.longBreakTime = parseInt(longBreakTimeInput.value) || 15;
    state.timeLeft = settings.pomodoroTime * 60;
}

// Event Listeners
function setupEventListeners() {
    pomodoroTimeInput.addEventListener('change', () => {
        if (!state.isRunning && state.currentMode === 'pomodoro') {
            loadSettings();
            updateDisplay();
            updateProgress();
        }
    });

    shortBreakTimeInput.addEventListener('change', () => {
        loadSettings();
    });

    longBreakTimeInput.addEventListener('change', () => {
        loadSettings();
    });

    // Recalcular progresso ao redimensionar
    window.addEventListener('resize', () => {
        updateProgress();
    });
}

// Formatar tempo (segundos -> MM:SS)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Atualizar display do timer
function updateDisplay() {
    timerDisplay.textContent = formatTime(state.timeLeft);
    updateProgress();
}

// Atualizar barra de progresso circular
function updateProgress() {
    let totalTime;
    if (state.currentMode === 'pomodoro') {
        totalTime = settings.pomodoroTime * 60;
    } else if (state.currentMode === 'shortBreak') {
        totalTime = settings.shortBreakTime * 60;
    } else {
        totalTime = settings.longBreakTime * 60;
    }

    // Calcular raio baseado no tamanho da tela
    const isMobile = window.innerWidth <= 480;
    const radius = isMobile ? 110 : 130;
    const circumference = 2 * Math.PI * radius;
    
    // Atualizar stroke-dasharray se necessário
    progressCircle.style.strokeDasharray = circumference;
    
    const progress = (totalTime - state.timeLeft) / totalTime;
    const offset = circumference * (1 - progress);

    progressCircle.style.strokeDashoffset = offset;
}

// Atualizar status
function updateStatus() {
    const statusIcon = statusIndicator.querySelector('i');
    
    if (state.isRunning) {
        if (state.currentMode === 'pomodoro') {
            statusText.textContent = 'Foque na sua tarefa!';
            statusText.className = 'status-working';
            statusIcon.className = 'fas fa-fire';
            statusIcon.style.color = '#4A90E2';
        } else {
            statusText.textContent = 'Hora de descansar!';
            statusText.className = 'status-break';
            statusIcon.className = 'fas fa-coffee';
            statusIcon.style.color = '#27AE60';
        }
        timerCard.classList.add('timer-active');
        // Esconder seta quando timer está rodando
        arrowDown.classList.add('hidden');
        // Fechar accordion se estiver aberto
        closeInstructions();
    } else if (state.isPaused) {
        statusText.textContent = 'Pausado';
        statusText.className = 'status-paused';
        statusIcon.className = 'fas fa-pause-circle';
        statusIcon.style.color = '#BDC3C7';
        timerCard.classList.remove('timer-active');
        // Esconder seta quando pausado
        arrowDown.classList.add('hidden');
    } else {
        statusText.textContent = 'Pronto para começar';
        statusText.className = '';
        statusIcon.className = 'fas fa-play-circle';
        statusIcon.style.color = '#4A90E2';
        timerCard.classList.remove('timer-active');
        // Mostrar seta quando pronto para começar
        arrowDown.classList.remove('hidden');
    }
}

// Atualizar label do timer
function updateTimerLabel() {
    if (state.currentMode === 'pomodoro') {
        timerLabel.textContent = 'Tempo de Foco';
    } else if (state.currentMode === 'shortBreak') {
        timerLabel.textContent = 'Pausa Curta';
    } else {
        timerLabel.textContent = 'Pausa Longa';
    }
}

// Atualizar contadores
function updateCounters() {
    pomodoroCountEl.textContent = state.totalPomodoros;
    sessionCountEl.textContent = state.sessionCount;
}

// Play som de notificação
function playNotification() {
    // Criar som de notificação usando Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Notificação do navegador
function sendNotification(title, message) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            body: message,
            icon: 'https://cdn-icons-png.flaticon.com/512/3163/3163478.png'
        });
    }
}

// Solicitar permissão de notificação
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Mudar para próximo modo
function switchMode() {
    if (state.currentMode === 'pomodoro') {
        state.totalPomodoros++;
        updateCounters();

        // Verificar se precisa de pausa longa (a cada 4 Pomodoros)
        if (state.totalPomodoros % 4 === 0) {
            state.currentMode = 'longBreak';
            state.timeLeft = settings.longBreakTime * 60;
            playNotification();
            sendNotification('Pomodoro Completo!', 'Parabéns! Hora da pausa longa de ' + settings.longBreakTime + ' minutos.');
        } else {
            state.currentMode = 'shortBreak';
            state.timeLeft = settings.shortBreakTime * 60;
            playNotification();
            sendNotification('Pomodoro Completo!', 'Hora da pausa curta de ' + settings.shortBreakTime + ' minutos.');
        }
    } else {
        // Voltar para Pomodoro
        state.currentMode = 'pomodoro';
        state.timeLeft = settings.pomodoroTime * 60;
        state.sessionCount++;
        updateCounters();
        playNotification();
        sendNotification('Pausa Finalizada!', 'Vamos focar novamente!');
    }

    updateTimerLabel();
    updateDisplay();
    updateStatus();
}

// Tick do timer
function tick() {
    if (state.timeLeft > 0) {
        state.timeLeft--;
        updateDisplay();
    } else {
        // Timer acabou
        clearInterval(state.interval);
        state.isRunning = false;
        switchMode();
        updateButtons();
    }
}

// Iniciar timer
function startTimer() {
    if (state.isPaused) {
        // Continuar de onde parou
        state.isPaused = false;
        state.isRunning = true;
    } else {
        // Iniciar novo timer
        loadSettings();
        state.isRunning = true;
        state.isPaused = false;
        
        if (state.currentMode === 'pomodoro') {
            state.timeLeft = settings.pomodoroTime * 60;
        } else if (state.currentMode === 'shortBreak') {
            state.timeLeft = settings.shortBreakTime * 60;
        } else {
            state.timeLeft = settings.longBreakTime * 60;
        }
    }

    state.interval = setInterval(tick, 1000);
    updateButtons();
    updateStatus();
}

// Pausar timer
function pauseTimer() {
    clearInterval(state.interval);
    state.isRunning = false;
    state.isPaused = true;
    updateButtons();
    updateStatus();
}

// Reiniciar timer
function resetTimer() {
    clearInterval(state.interval);
    state.isRunning = false;
    state.isPaused = false;
    
    loadSettings();
    
    // Resetar para modo Pomodoro
    state.currentMode = 'pomodoro';
    state.timeLeft = settings.pomodoroTime * 60;
    state.totalPomodoros = 0;
    state.sessionCount = 1;
    
    updateDisplay();
    updateButtons();
    updateStatus();
    updateTimerLabel();
    updateCounters();
}

// Atualizar botões
function updateButtons() {
    if (state.isRunning) {
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-flex';
    } else {
        startBtn.style.display = 'inline-flex';
        pauseBtn.style.display = 'none';
    }
}

// Toggle Instructions Accordion
function toggleInstructions() {
    instructionsAccordion.classList.toggle('expanded');
    
    // Atualizar ícone da seta
    const arrowIcon = arrowDown.querySelector('i');
    if (instructionsAccordion.classList.contains('expanded')) {
        arrowIcon.className = 'fas fa-chevron-up';
    } else {
        arrowIcon.className = 'fas fa-chevron-down';
    }
}

// Fechar Instructions
function closeInstructions() {
    instructionsAccordion.classList.remove('expanded');
    const arrowIcon = arrowDown.querySelector('i');
    arrowIcon.className = 'fas fa-chevron-down';
}

// Inicializar quando a página carregar
init();

