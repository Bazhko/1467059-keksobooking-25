import {newObject} from '/js/data.js';

const similarNotices = Array.from({length: 10}, newObject);
const mapCanvas = document.querySelector('.map__canvas');
const noticeCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const typesDictionary = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const generateNoticeTemplate = ({author, offer}, template) => {
  const noticeCardEl = template.cloneNode(true);
  const features = noticeCardEl.querySelector('.popup__features');
  const title = noticeCardEl.querySelector('.popup__title');
  const address = noticeCardEl.querySelector('.popup__text--address');
  const apartmentType = noticeCardEl.querySelector('.popup__type');
  const price = noticeCardEl.querySelector('.popup__text--price');
  const capacity = noticeCardEl.querySelector('.popup__text--capacity');
  const checkTime = noticeCardEl.querySelector('.popup__text--time');
  const description = noticeCardEl.querySelector('.popup__description');
  const photos = noticeCardEl.querySelector('.popup__photos');
  const avatar = noticeCardEl.querySelector('.popup__avatar');

  const getPhotos = () => {
    const photosFragment = document.createDocumentFragment();
    const photosContainer = photos.cloneNode(false);

    for (let i = 0; i < offer.photos.length - 1; i++) {
      const newElement = noticeCardEl.querySelector('.popup__photo').cloneNode(false);
      newElement.src = offer.photos[i];
      photosFragment.appendChild(newElement);
    }

    photosContainer.append(photosFragment);

    return photosContainer;
  };

  const getApartmentFeatures = () => {
    const apartmentFeatures = offer.features;
    const featuresContainer = noticeCardEl.querySelector('.popup__features');
    const featuresList = featuresContainer.querySelectorAll('.popup__feature');

    featuresList.forEach((featuresListItem) => {
      const isInclude = apartmentFeatures.some(
        (apartmentFeature) => featuresListItem.classList.contains(`popup__feature--${apartmentFeature}`),
      );

      if(!isInclude) {
        featuresListItem.remove();
      }
    });

    return featuresContainer;
  };

  const setDataToNode = (data, node) => {
    if(!data) {
      node.classList.add('hidden');
    } else {
      node.textContent = data;
    }
  };

  setDataToNode(offer.title, title);
  setDataToNode(offer.address, address);
  setDataToNode(offer.description, description);


  if (!offer.apartmentType) {
    apartmentType.classList.add('hidden');
  } else {
    apartmentType.textContent = typesDictionary[offer.type];
  }

  if (!offer.price) {
    price.classList.add('hidden');
  } else {
    price.textContent = `${offer.price} ₽/ночь`;
  }

  if (!offer.capacity) {
    capacity.classList.add('hidden');
  } else {
    capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }

  if (!offer.checkTime) {
    checkTime.classList.add('hidden');
  } else {
    checkTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  }

  if (!author.avatar) {
    avatar.classList.add('hidden');
  } else {
    avatar.src = author.avatar;
  }

  if (!offer.photos) {
    photos.classList.add('hidden');
  } else {
    noticeCardEl.replaceChild(getPhotos(), photos);
  }

  if (!offer.features) {
    features.classList.add('hidden');
  } else {
    noticeCardEl.replaceChild(getApartmentFeatures(), features);
  }

  return noticeCardEl;
};

// similarNotices.forEach((notice) => {
//   const template = generateNoticeTemplate(notice, noticeCardTemplate);
//   noticeWindow.append(template);
// });

export {similarNotices};
