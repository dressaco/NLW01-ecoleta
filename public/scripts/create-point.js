//DADOS DA ENTIDADE

function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]');

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    // () => {} (função sem parametro arrow function)
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector('select[name=city]');
  const ufValue = event.target.value;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = '<option value="">Selecione a Cidade</option>';
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

const stateName = () => {
  const stateInput = document.querySelector('[name=state]');
  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;
};

const cityName = () => {
  const cityInput = document.querySelector('[name=cityname]');
  const indexOfSelectedCity = event.target.selectedIndex;
  cityInput.value = event.target.options[indexOfSelectedCity].text;
};

document.querySelector('[name=uf]').addEventListener('change', getCities);
document.querySelector('[name=uf]').addEventListener('change', stateName);
document.querySelector('[name=city]').addEventListener('change', cityName);
//https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios

//ITENS DE COLETA
const itemsToCollect = document.querySelectorAll('.items-grid li');
for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem);
}

const collectedItems = document.querySelector('[name=items]');

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;
  //adicionar ou remover uma classe com JS
  itemLi.classList.toggle('selected');
  const itemId = itemLi.dataset.id;
  const alreadySelected = selectedItems.findIndex((item) => item === itemId);

  //return alreadySelected >= 0

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDifferent = item !== itemId;
      return itemIsDifferent;
    });
    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }
  collectedItems.value = selectedItems;
}
