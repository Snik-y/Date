
let datesToDisplay = [
    {value:"2024-01-06"},
    {value:"2024-01-13"},
    {value:"2024-01-20"},
    {value:"2024-01-27"},
]

let dateSelect = document.querySelector('.date');
datesToDisplay.forEach(function(date) {
    let option = document.createElement('option');
    option.value = date.value;
    option.textContent = date.value;
    dateSelect.appendChild(option);
});

document.querySelector('#add').addEventListener('click', function(event) {
    event.preventDefault();
    let newFieldset = document.querySelector('.fieldset').cloneNode(true);
    newFieldset.querySelector('.date').value = '';
    newFieldset.querySelector('.quantite').value = '1';
    document.querySelector('form').insertBefore(newFieldset, document.querySelector('#add'));

    let selectedDate = dateSelect.value;
    datesToDisplay = datesToDisplay.filter(function(date) {
        return date.value !== selectedDate;
    });
    
    dateSelect.innerHTML = '';
    datesToDisplay.forEach(function(date) {
        let option = document.createElement('option');
        option.value = date.value;
        option.textContent = date.value;
        dateSelect.appendChild(option);
    });
});

document.querySelector('#add').classList.remove('disabled');

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    let reservations = [];
    document.querySelectorAll('.fieldset').forEach(function(fieldset) {
        let date = fieldset.querySelector('.date').value;
        let quantite = fieldset.querySelector('.quantite').value;
        reservations.push({date: date, quantite: quantite});
    });
    console.log('Réservations enregistrées:', reservations);
});