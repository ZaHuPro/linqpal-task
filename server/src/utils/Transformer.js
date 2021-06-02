// Removing if +1 exist in start and extracting only digits
export const handleSetPhoneNumber = (_input) => {
  if (new RegExp(/^\+1/).test(_input)) {
    _input = _input.slice(2);
  }
  return _input.replace(new RegExp(/\D+/g), '');
};

// Transforming the phone number in US formate
export const handleGetPhoneNumber = (_input) => _input.replace(new RegExp(/^(\d{3})(\d{3})(\d{4}).*/), '($1) $2-$3');

export const handleSetSSN = (_input) => _input;

export const handleGetSSN = (_input) => _input;
