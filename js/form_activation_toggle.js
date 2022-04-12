const adForm = document.querySelector('.ad-form');
const adFormFields = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const MapFilterSelects = mapFilters.querySelectorAll('select');
const mapFiltersFileds = mapFilters.querySelectorAll('fieldset');
const adFieldsets = [adFormFields, MapFilterSelects, mapFiltersFileds];

const activateForm = () => {
  adForm.classList.remove('ad-form-disabled');
  mapFilters.classList.remove('map__filters--disabled');
  adFieldsets.forEach((i) => {i.disabled = false;});
};

const disactivateForm = () => {
  adForm.classList.add('ad-form-disabled');
  mapFilters.classList.add('map__filters--disabled');
  adFieldsets.forEach((i) => {i.disabled = true;});
};

export {
  disactivateForm,
  activateForm,
};
