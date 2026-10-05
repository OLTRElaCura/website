// Simulazione o integrazione API Gemini
const apiKey = ""; // Inserisci la tua API Key qui se usi GitHub Pages
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
const systemPrompt = "Sei l'assistente virtuale di 'OLTRE la cura', un'associazione no-profit dedicata alla ricerca oncologica. Sii empatico e conciso.";

async function sendMessage() {
    const inputEl = document.getElementById('ai-chat-input');
    const outputEl = document.getElementById('ai-chat-output');
    const query = inputEl.value.trim();
    
    if (!query) return;

    // Aggiungi messaggio utente
    outputEl.innerHTML += `<div class="bg-primary text-white p-3 rounded-xl self-end max-w-[85%] mb-3 shadow-md rounded-br-sm"><span class="sr-only">Tu dici:</span> ${query}</div>`;
    inputEl.value = '';
    outputEl.scrollTop = outputEl.scrollHeight;
    
    // Mostra caricamento (con aria-live per screen reader)
    const loadingId = 'loading-' + Date.now();
    outputEl.innerHTML += `<div id="${loadingId}" class="bg-white border border-gray-200 text-gray-800 p-3 rounded-xl self-start max-w-[85%] mb-3 shadow-sm rounded-bl-sm" aria-live="polite"><em>Sto elaborando...</em></div>`;
    outputEl.scrollTop = outputEl.scrollHeight;

    // Se l'API key non c'è, mock della risposta (Utile per test Github Pages)
    if (!apiKey) {
        setTimeout(() => {
            document.getElementById(loadingId)?.remove();
            outputEl.innerHTML += `<div class="bg-bgdark text-gray-800 p-3 rounded-xl self-start max-w-[85%] mb-3 shadow-sm rounded-bl-sm"><strong>OLTRE:</strong> Per abilitare l'IA, inserisci una chiave API valida nel file js/ai-chat.js. Nel frattempo, esplora il nostro sito!</div>`;
            outputEl.scrollTop = outputEl.scrollHeight;
        }, 1500);
        return;
    }

    // Richiesta reale
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: query }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] }
            })
        });

        const result = await response.json();
        document.getElementById(loadingId)?.remove();

        if (result.candidates && result.candidates[0].content) {
            const text = result.candidates[0].content.parts[0].text.replace(/\n/g, '<br>');
            outputEl.innerHTML += `<div class="bg-bgdark text-gray-800 p-3 rounded-xl self-start max-w-[85%] mb-3 shadow-sm rounded-bl-sm"><strong>OLTRE:</strong> ${text}</div>`;
        } else {
            outputEl.innerHTML += `<div class="bg-red-100 text-red-700 p-3 rounded-xl self-center text-center w-full mb-3">Errore nella risposta. Riprova.</div>`;
        }
    } catch (error) {
        document.getElementById(loadingId)?.remove();
        outputEl.innerHTML += `<div class="bg-red-100 text-red-700 p-3 rounded-xl self-center text-center w-full mb-3">Errore di connessione ai nostri sistemi.</div>`;
    }
    outputEl.scrollTop = outputEl.scrollHeight;
}

// Supporto per il tasto invio
document.addEventListener('DOMContentLoaded', () => {
    const inputEl = document.getElementById('ai-chat-input');
    if(inputEl) {
        inputEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
});
