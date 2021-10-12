const ERROR_GENERAL = {
  empty: 'This field is required',
};

const ERROR_NAME = {
  wrongLength: 'Type 3 to 15 characters',
  wrongPattern: 'Only Russian/English letters and spaces are allowed',
};

const ERROR_EMAIL = {
  wrongPattern: 'Pattern username@example.com is required',
};

const ERROR_PHONE = {
  wrongPattern: 'Max 10 digits possibly split by 2-3 digits with space or hiphen',
  wrongLength: 'Maximum length - 10 digits',
};

export { ERROR_GENERAL, ERROR_NAME, ERROR_EMAIL, ERROR_PHONE };
