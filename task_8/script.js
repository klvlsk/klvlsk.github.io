const openFormBtn = document.getElementById('open-form-btn');
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('feedback-form');
const resultDiv = document.getElementById('feedback-result');

const localStorageKey = 'feedbackFormValues';

function openPopup() {
    popup.style.display = 'flex';
    window.history.pushState({ popup: true }, '', '#feedback-form');
    loadFormData();
}

function closePopup() {
    popup.style.display = 'none';
    resultDiv.textContent = '';
    window.history.back();
}

function saveFormData() {
    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        organization: form.organization.value,
        message: form.message.value,
    };
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

function loadFormData() {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
        const { name, email, phone, organization, message } = JSON.parse(savedData);
        form.name.value = name || '';
        form.email.value = email || '';
        form.phone.value = phone || '';
        form.organization.value = organization || '';
        form.message.value = message || '';
    }
}

function clearFormData() {
    localStorage.removeItem(localStorageKey);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultDiv.textContent = 'Отправка...';
    const formData = new FormData(form);

    try {
        const response = await fetch('https://formcarry.com/s/g7ga5yAahTs', {
            method: 'POST',
            body: formData,
        });

            resultDiv.textContent = 'Форма успешно отправлена!';
            clearFormData();
            form.reset();
        
    } catch (error) {
        resultDiv.textContent = 'Ошибка сети. Попробуйте позже.';
    }
});

openFormBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);

window.addEventListener('popstate', (event) => {
    if (!event.state?.popup) {
        closePopup();
    }
});

form.addEventListener('input', saveFormData);
