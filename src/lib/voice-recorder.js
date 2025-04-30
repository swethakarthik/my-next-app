class VoiceRecorder {
    constructor() {
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.isRecording = false;
        this.stream = null;
        this.OPENAI_API_KEY = '';
        
        // DOM Elements
        this.startButton = document.getElementById('startRecording');
        this.stopButton = document.getElementById('stopRecording');
        this.transcriptionDiv = document.getElementById('transcription');
        this.statusIndicator = document.getElementById('recordingStatus');
        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.saveApiKeyButton = document.getElementById('saveApiKey');
        
        // Bind event listeners
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.startRecording());
        this.stopButton.addEventListener('click', () => this.stopRecording());
        this.saveApiKeyButton.addEventListener('click', () => this.saveApiKey());
    }

    saveApiKey() {
        const apiKey = this.apiKeyInput.value.trim();
        if (apiKey) {
            this.OPENAI_API_KEY = apiKey;
            this.startButton.disabled = false;
            this.apiKeyInput.value = '';
            this.transcriptionDiv.textContent = 'API key saved. Ready to record!';
            this.saveApiKeyButton.textContent = 'API Key Saved!';
        }
    }

    updateStatus(message, type) {
        this.statusIndicator.textContent = message;
        this.statusIndicator.className = 'status-indicator ' + type;
    }

    async startRecording() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(this.stream);
            this.audioChunks = [];
            this.isRecording = true;

            this.mediaRecorder.ondataavailable = (event) => {
                this.audioChunks.push(event.data);
            };

            this.mediaRecorder.start();
            this.startButton.disabled = true;
            this.stopButton.disabled = false;
            this.updateStatus('Recording in progress...', 'recording');
        } catch (error) {
            this.handleError('Error accessing microphone: ' + error.message);
        }
    }

    async stopRecording() {
        return new Promise((resolve) => {
            this.mediaRecorder.onstop = async () => {
                this.isRecording = false;
                this.startButton.disabled = false;
                this.stopButton.disabled = true;
                this.updateStatus('Processing audio...', 'processing');

                try {
                    const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                    const transcription = await this.sendToWhisper(audioBlob);
                    this.displayTranscription(transcription);
                    this.updateStatus('', '');
                } catch (error) {
                    this.handleError('Error processing audio: ' + error.message);
                }

                // Stop all tracks
                this.stream.getTracks().forEach(track => track.stop());
                resolve();
            };

            this.mediaRecorder.stop();
        });
    }

    async sendToWhisper(audioBlob) {
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.webm');
        formData.append('model', 'whisper-1');

        try {
            const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.OPENAI_API_KEY}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.text;
        } catch (error) {
            throw new Error('Error sending audio to Whisper: ' + error.message);
        }
    }

    displayTranscription(text) {
        this.transcriptionDiv.textContent = text;
    }

    handleError(message) {
        console.error(message);
        this.updateStatus('', '');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        this.transcriptionDiv.appendChild(errorDiv);
    }
}

// Initialize the voice recorder when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VoiceRecorder();
}); 
