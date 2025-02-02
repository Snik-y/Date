document.addEventListener('DOMContentLoaded', function() {
let datesToDisplay = [
    {value:"2024-01-06"},
    {value:"2024-01-13"},
    {value:"2024-01-20"},
    {value:"2024-01-27"},
]
});

let dateSelect = document.querySelector('.date');
datesToDisplay.forEach(function(date) {
    let option = document.createElement('option');
    option.value = date.value;
    option.textContent = date.value;
    dateSelect.appendChild(option);
});