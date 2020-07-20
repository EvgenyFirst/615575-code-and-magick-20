'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var numberWizards = 4;
var setupSimilar = document.querySelector('.setup-similar');
var setupSimilarList = document.querySelector('.setup-similar-list');
var templateWizards = document.querySelector('template').content;
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyeColors = ['black', 'red', 'blue', 'yellow', 'green'];

var setRandomOptions = function (length) {
  var options = Math.floor(Math.random() * length);

  return options;
};

var generateData = function () {
  var data = [];

  for (var i = 0; i < numberWizards; i++) {

    data[i] = {
      name: names[setRandomOptions(names.length)] + ' ' + surnames[setRandomOptions(surnames.length)],
      coatColor: coatColors[setRandomOptions(coatColors.length)],
      eyeColor: eyeColors[setRandomOptions(eyeColors.length)]
    };

  }

  return data;

};

var wizards = generateData();

var fragment = document.createDocumentFragment();

for (var i = 0; i < numberWizards; i++) {
  var wizardElement = templateWizards.cloneNode(true);

  wizardElement.querySelector('.setup-similar-item');
  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].eyeColor;

  fragment.appendChild(wizardElement);
}

setupSimilarList.appendChild(fragment);

setupSimilar.classList.remove('hidden');

// Открытие и закрытие модального окна

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closePopup();
  }
});


// Валидация форм

var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var userNameInput = document.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function () {
  var valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
});
