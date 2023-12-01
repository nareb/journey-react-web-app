function toggleProfileEditing() {
    const saveButton = document.getElementById('saveButton');
    const cancelButton = document.getElementById('cancelButton');
    const editButton = document.querySelector('.btn.btn-primary');

    if (saveButton.classList.contains('d-none')) {
        saveButton.classList.remove('d-none');
        cancelButton.classList.remove('d-none');
        editButton.classList.add('d-none');
    } else {
        saveButton.classList.add('d-none');
        cancelButton.classList.add('d-none');
        editButton.classList.remove('d-none');
    }
}
