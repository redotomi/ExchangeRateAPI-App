
document.querySelector('#update-currency').onclick = () => {
  const selectedCurrency = document.querySelector('#select-currency').value;
  removePreviousTable(); 
  updateBaseCurrency(selectedCurrency);
}


function appendCurrency(currency, rate) {
  const $tableBody = document.querySelector('#table-body');
  const $listItem = document.createElement('tr');
  const $listItemCurrency = document.createElement('th');
  const $listItemRate = document.createElement('th');
  
  $listItemCurrency.textContent = `${currency}`;
  $listItemRate.textContent = `$${rate}`
  $listItem.className = 'currency';
  $listItem.append($listItemCurrency, $listItemRate);
  $tableBody.appendChild($listItem);
}

function addCurrencyToButton(currency) {
  const $button = document.querySelector('#select-currency');
  const $option = document.createElement('option');

  $option.setAttribute('value', `${currency}`);
  $option.textContent = `${currency}`;

  $button.appendChild($option);
}

function updateTitleState(currency) {
  const $title = document.querySelector('#cambio-base');
  $title.textContent = `$${currency}`;
}

function updateDate(date) {
  const $date = document.querySelector('#date');
  $date.textContent = `${date}`;
}
  
function updateBaseCurrency(currency) {
  fetch(`https://v6.exchangerate-api.com/v6/877b7b6d8250db1e8df606bf/latest/${currency}`)
    .then(response => response.json())
    .then(responseJSON => {
      Object.entries(responseJSON.conversion_rates).forEach(([currency, value]) => {
        appendCurrency(currency, value);
      });
    updateTitleState(responseJSON.base_code);
  });
}

function removePreviousTable() {
  const $previosTableItems = document.querySelectorAll('.currency');
  $previosTableItems.forEach((item) => {
    item.innerHTML = '';
  });
}

function fetchAndDisplayCurrencies() {
  fetchCurrencies()
    .then(data => printCurrencies(data))
    .catch(error => console.log(error));
}

function printCurrencies(ratesData) {
  Object.entries(ratesData.conversion_rates).forEach(([currency, value]) => {
    appendCurrency(currency, value);
    addCurrencyToButton(currency);
  });

  updateTitleState(ratesData.base_code);
  updateDate(ratesData.time_last_update_utc);
}


async function fetchCurrencies() {
  const response = await fetch('https://v6.exchangerate-api.com/v6/877b7b6d8250db1e8df606bf/latest/ARS');
  if (!response.ok)
    throw new Error(response.error);
  return response.json();
}

fetchAndDisplayCurrencies();
