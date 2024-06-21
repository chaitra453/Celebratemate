const reminderForm = document.getElementById('reminderForm');

reminderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const eventType = formData.get('eventType');
    const name = formData.get('name');
    const eventDate = formData.get('eventDate');
    const email = formData.get('email');
    const phone = formData.get('phone');

    const reminderData = {
        eventType,
        name,
        eventDate,
        email,
        phone
    };

    fetch('/reminders', {
        method: 'POST',
        body: JSON.stringify(reminderData),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            console.log('Reminder set successfully!');
            reminderForm.reset();
        } else {
            console.error('Failed to set reminder.');
        }
    }).catch(error => {
        console.error('Error:', error);
    });
});
