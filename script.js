let currentMockEmails = [];

window.onload = function() {
    console.log('Window loaded');
    fetch('mockEmails.json')
        .then(response => {
            console.log('Fetched mockEmails.json');
            return response.json();
        })
        .then(mockEmails => {
            console.log('Loaded mock emails:', mockEmails);
            currentMockEmails = mockEmails;
            loadMockEmail(currentMockEmails);
        })
        .catch(error => console.error('Error loading mock emails:', error));
};

function loadMockEmail(mockEmails) {
    console.log('Loading a mock email');
    const emailSimulation = document.getElementById('email-simulation');
    if (!emailSimulation) {
        console.error('Email simulation element not found');
        return;
    }
    const randomEmail = mockEmails[Math.floor(Math.random() * mockEmails.length)];
    console.log('Random email selected:', randomEmail);
    emailSimulation.innerHTML = `
        <div class="email-header">
            <p><strong>From:</strong> ${randomEmail.sender}</p>
            <p><strong>Subject:</strong> ${randomEmail.subject}</p>
        </div>
        <div class="email-body">
            <p>${randomEmail.body}</p>
        </div>
    `;
    emailSimulation.dataset.correctAnswer = randomEmail.correctAnswer;
}

function showExampleEmail(id) {
    console.log('Showing example email:', id);
    const exampleEmail = document.getElementById(id + '-email');
    const details = document.getElementById(id + '-details');
    if (exampleEmail.style.display === 'none' || exampleEmail.style.display === '') {
        exampleEmail.style.display = 'block';
        details.style.display = 'block';
    } else {
        exampleEmail.style.display = 'none';
        details.style.display = 'none';
    }
}

function showLinkHover(id) {
    console.log('Showing link hover details for:', id);
    const linkHover = document.getElementById(id + '-link-hover');
    if (linkHover.style.display === 'none' || linkHover.style.display === '') {
        linkHover.style.display = 'block';
    } else {
        linkHover.style.display = 'none';
    }
}

function showAdditionalInfo(id) {
    console.log('Showing additional info for:', id);
    const additionalInfo = document.getElementById(id + '-additional-info');
    if (additionalInfo.style.display === 'none' || additionalInfo.style.display === '') {
        additionalInfo.style.display = 'block';
    } else {
        additionalInfo.style.display = 'none';
    }
}

function submitAnswer() {
    console.log('Submitting answer');
    const radios = document.getElementsByName('answer');
    let selectedAnswer = null;
    for (const radio of radios) {
        if (radio.checked) {
            selectedAnswer = radio.value;
            break;
        }
    }
    console.log('Selected answer:', selectedAnswer);

    const feedback = document.getElementById('feedback');
    const emailSimulation = document.getElementById('email-simulation');
    const correctAnswer = emailSimulation.dataset.correctAnswer;
    console.log('Correct answer:', correctAnswer);

    if (!selectedAnswer) {
        feedback.textContent = 'Please select an answer before submitting.';
        feedback.style.color = 'orange';
    } else if (selectedAnswer === correctAnswer) {
        feedback.textContent = 'Correct! Great job recognizing the phishing clue.';
        feedback.style.color = 'green';
        document.getElementById('next-question-button').style.display = 'block';
    } else {
        feedback.textContent = `Incorrect. The correct answer was: ${correctAnswer}. Here's why: ${getExplanation(correctAnswer)}.`;
        feedback.style.color = 'red';
        document.getElementById('next-question-button').style.display = 'block';
    }
}

function getExplanation(correctAnswer) {
    console.log('Getting explanation for:', correctAnswer);
    switch (correctAnswer) {
        case 'Sender':
            return 'The sender\'s email address looked suspicious or had subtle spelling differences.';
        case 'Subject':
            return 'The subject line had urgency or scare tactics often used in phishing.';
        case 'Body':
            return 'The body contained a suspicious link or unrealistic offer.';
        case 'Safe':
            return 'This email did not contain any phishing indicators.';
        default:
            return '';
    }
}

function loadNextQuestion() {
    console.log('Loading next question');
    loadMockEmail(currentMockEmails);
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-question-button').style.display = 'none';
    const radios = document.getElementsByName('answer');
    for (const radio of radios) {
        radio.checked = false;
    }
}
