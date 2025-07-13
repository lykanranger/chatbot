const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages-container');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        displayMessage(message, 'sent');
        const response = getBotResponse(message);
        setTimeout(() => {
            displayMessage(response, 'received');
        }, 500);
        messageInput.value = '';
    }
});

function displayMessage(message, type) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');
    if (type === 'sent') {
        messageBox.classList.add('sent');
    } else {
        messageBox.classList.add('received');
    }
    messageBox.textContent = message;
    messagesContainer.appendChild(messageBox);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(message) {
    const intents = {
        'greeting': ['hello', 'hi', 'hey'],
        'goodbye': ['bye', 'goodbye', 'see you later'],
        'thanks': ['thank you', 'thanks']
    };

    const responses = {
        'greeting': 'Hi, how are you?',
        'goodbye': 'See you later!',
        'thanks': 'You\'re welcome!',
    };

    const mathOperations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    };

    const lowerCaseMessage = message.toLowerCase();
    const mathRegex = /(\d+)\s*([+\-*/])\s*(\d+)/;
    const match = lowerCaseMessage.match(mathRegex);

    if (match) {
        const num1 = parseFloat(match[1]);
        const operator = match[2];
        const num2 = parseFloat(match[3]);
        const result = mathOperations[operator](num1, num2);
        return `The result is ${result}`;
    }

    // Handle other math-related inputs
    if (lowerCaseMessage.includes('pi')) {
        return `The value of pi is approximately 3.14159`;
    } else if (lowerCaseMessage.includes('sqrt')) {
        const sqrtRegex = /sqrt\s*(\d+)/;
        const sqrtMatch = lowerCaseMessage.match(sqrtRegex);
        if (sqrtMatch) {
            const num = parseFloat(sqrtMatch[1]);
            const result = Math.sqrt(num);
            return `The square root of ${num} is ${result}`;
        }
    }

    // Check intents
    for (const intent in intents) {
        for (const keyword of intents[intent]) {
            if (lowerCaseMessage.includes(keyword)) {
                return responses[intent];
            }
        }
    }

    // Default response
    return 'I didn\'t understand that. Can you please rephrase?';
}