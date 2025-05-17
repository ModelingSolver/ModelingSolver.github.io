const inputMessage = document.getElementById('input-message');
const envoyerMessageButton = document.getElementById('envoyer-message');
const verifierConnexionButton = document.getElementById('verifier-connexion');
const messagesElement = document.getElementById('messages');

// Vérifier la connexion au serveur
verifierConnexionButton.addEventListener('click', () => {
    fetch('http://localhost:8000/verifier_connexion/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Connexion établie : ' + data.connecte);
        })
        .catch(error => console.error('Erreur :', error));
});

// Envoyer un message au serveur
envoyerMessageButton.addEventListener('click', () => {
    const message = inputMessage.value;
    if (message !== '') {
        fetch('http://localhost:8000/chat/envoyer_message/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                inputMessage.value = '';
                recupererMessages();
            })
            .catch(error => console.error('Erreur :', error));
    }
});

// Récupérer les messages du serveur
function recupererMessages() {
    fetch('http://localhost:8000/chat/recuperer_messages/')
        .then(response => response.json())
        .then(data => {
            messagesElement.innerHTML = '';
            data.forEach(message => {
                const messageElement = document.createElement('p');
                messageElement.textContent = message.message;
                messagesElement.appendChild(messageElement);
            });
        })
        .catch(error => console.error('Erreur :', error));
}

// Récupérer les messages toutes les 5 secondes
setInterval(recupererMessages, 5000);