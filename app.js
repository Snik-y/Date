let datesToDisplay = [
  { value: "2024-01-06" },
  { value: "2024-01-13" },
  { value: "2024-01-20" },
  { value: "2024-01-27" },
];

function populateDateSelect(selectElement, dates) {
  selectElement.innerHTML = "";
  dates.forEach(function (date) {
    let option = document.createElement("option");
    option.value = date.value;
    option.textContent = date.value;
    selectElement.appendChild(option);
  });
}

// Initialisation du premier sélecteur de date
let dateSelect = document.querySelector(".date");
populateDateSelect(dateSelect, datesToDisplay);

// Fonction pour ajouter une nouvelle réservation
function addReservation() {
  // Récupérer les dates sélectionnées pour les éléments existants
  let selectedDates = Array.from(document.querySelectorAll(".date")).map(
    (select) => select.value
  );

  // Filtrer les dates disponibles pour le nouvel élément
  let availableDates = datesToDisplay.filter(
    (date) => !selectedDates.includes(date.value)
  );

  // Cloner l'élément fieldset
  let newFieldset = document.querySelector(".fieldset").cloneNode(true);
  let newDateSelect = newFieldset.querySelector(".date");
  newFieldset.querySelector(".quantite").value = "1";

  // Remplir le sélecteur de date avec les dates disponibles
  populateDateSelect(newDateSelect, availableDates);

  // Ajouter le nouvel élément fieldset avant le bouton "add"
  document
    .querySelector("form")
    .insertBefore(newFieldset, document.querySelector("#add"));

  // Ajouter un écouteur d'événement au bouton supprimer
  newFieldset.querySelector(".remove").addEventListener("click", function () {
    removeReservation(newFieldset);
  });

  checkAddButtonState();
}

function checkAddButtonState() {
    let availableDates = datesToDisplay.filter(date => {
        return !Array.from(document.querySelectorAll('.date')).map(select => select.value).includes(date.value);
    });
    document.querySelector('#add').disabled = availableDates.length === 0;
}

// Fonction pour supprimer une réservation
function removeReservation(fieldset) {
  let selectedDate = fieldset.querySelector(".date").value;

  // Ajouter la date supprimée à la liste des dates disponibles
  if (!datesToDisplay.some((date) => date.value === selectedDate)) {
    datesToDisplay.push({ value: selectedDate });
    datesToDisplay.sort((a, b) => new Date(a.value) - new Date(b.value));
  }

  // Supprimer le fieldset du DOM
  fieldset.remove();

  // Mettre à jour les dates disponibles pour tous les sélecteurs de date
  document.querySelectorAll(".date").forEach((select) => {
    let currentFieldset = select.closest(".fieldset");
    let currentSelectedDate = select.value;

    // Filtrer les dates disponibles en excluant les dates sélectionnées par les autres éléments
    let availableDates = datesToDisplay.filter((date) => {
      return (
        !Array.from(document.querySelectorAll(".date"))
          .map((select) => select.value)
          .includes(date.value) || date.value === currentSelectedDate
      );
    });
    populateDateSelect(select, availableDates);
    select.value = currentSelectedDate;
  });
}

document.querySelector("#add").addEventListener("click", function (event) {
  event.preventDefault();
  addReservation();
});

document.querySelector("#add").classList.remove("disabled");

// Ajouter l'écouteur d'événement au bouton supprimer du premier fieldset
document.querySelector(".remove").addEventListener("click", function () {
  removeReservation(document.querySelector(".fieldset"));
});

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  let reservations = [];
  document.querySelectorAll(".fieldset").forEach(function (fieldset) {
    let date = fieldset.querySelector(".date").value;
    let quantite = fieldset.querySelector(".quantite").value;
    reservations.push({ date: date, quantite: quantite });
  });
  console.log("Réservations enregistrées:", reservations);
});

checkAddButtonState();

