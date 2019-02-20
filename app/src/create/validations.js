import { THOUSAND_SEPARATOR } from '../state/static-data.js';
import i18n from '../commons/utils/i18n.js';
import { capitalize } from '../commons/utils/_.js';

export function validate (data) {
  let messages = new Set();
  let items = new Set();

  if (!isSet(data.name)) {
    messages.add(t('field is required', { fieldName: i18n.t('name') }));
    items.add('name');
  }

  if (!isSet(data.location)) {
    messages.add(t('field is required', { fieldName: i18n.t('location') }));
    items.add('location');
  }

  if (!isSet(data.startDate)) {
    messages.add(t('field is required', { fieldName: i18n.t('start date') }));
    items.add('startDate');
  } else if (!isValidDate(data.startDate)) {
    messages.add(t('not a valid date', { fieldName: i18n.t('start date') }));
    items.add('startDate');
  }

  if (!isSet(data.endDate)) {
    messages.add(t('field is required', { fieldName: i18n.t('end date') }));
    items.add('endDate');
  } else if (!isValidDate(data.endDate)) {
    messages.add(t('not a valid date', { fieldName: i18n.t('end date') }));
    items.add('endDate');
  }

  if (new Date(data.startDate) > new Date(data.endDate)) {
    messages.add(t('field1 before field2', { fieldName1: i18n.t('start date'), fieldName2: i18n.t('end date') }));
    items.add('startDate');
    items.add('endDate');
  }

  if (!isSet(data.type)) {
    messages.add(t('field is required', { fieldName: i18n.t('type') }));
    items.add('type');
  }

  return messages.size ? { messages, items } : null;
};

function t (str, payload) {
  return capitalize(i18n.t(str, payload));
}

function isSet (value) {
  return [undefined, null, ''].every(v => value !== v);
}

function isNumber (value, options) {
  let defaultSeparators = {
    allowThousandSeparator: false,
    thousandSeparator: THOUSAND_SEPARATOR
  };
  let { allowThousandSeparator, thousandSeparator } = Object.assign(defaultSeparators, options);
  let decimalSeparator = thousandSeparator === ',' ? '.' : ',';
  let integralPart;
  let decimalPart;
  let invalidParts;
  let integralPattern = new RegExp(
    `${'^' +
    // there could be a sign
    '(\\-|\\+)?' +
    // start the integral part
    '('}${
    // accepts numbers in the form 12,234,345
      allowThousandSeparator ? `(([1-9]\\d{0,2}\\${thousandSeparator}){1}(\\d{3}\\${thousandSeparator})*(\\d{3})+)|` : ''
    // or any number of digits starting with a non-zero
    }([1-9]\\d*)|` +
    // or a zero
    '(0)' +
    // end the integral part
    ')' +
    '$'
  );
  let decimalPattern = new RegExp(`^(\\${decimalSeparator}(\\d+))$`);

  if (!isSet(value) || typeof value !== 'string' && typeof value !== 'number') return false;

  if (value === '-' || value === '+') return false;

  [integralPart, decimalPart, ...invalidParts] = value.toString().split(decimalSeparator);
  // if we have invalid parts return false
  if (invalidParts.length) return false;

  if (integralPart !== undefined && integralPart !== '' && integralPart !== '-' && integralPart !== '+' && !integralPattern.test(integralPart)) return false;

  if (decimalPart !== undefined && !decimalPattern.test(decimalSeparator + decimalPart)) return false;

  return true;
}

function isInRange (value, limit1, limit2) {
  let [l1, l2] = limit1 > limit2 ? [limit2, limit1] : [limit1, limit2];

  // if the value is not number or string return false
  if (typeof value !== 'string' && typeof value !== 'number') return false;

  return !isNaN(value) && value !== '' && l1 <= value && value <= l2;
}

function isLeapYear (year) {
  if (['number', 'string'].every(t => typeof year !== t)) return false;
  if (!isSet(year)) return false;

  const LEAP_YEAR_DEFAULT_FREQUENCY = 4;
  const LEAP_YEAR_EXCEPTION_FREQUENCY = 100;
  const LEAP_YEAR_EXCEPTION_OVERRIDE_FREQUENCY = 400;
  return year % LEAP_YEAR_DEFAULT_FREQUENCY === 0 &&
    (year % LEAP_YEAR_EXCEPTION_FREQUENCY !== 0 || year % LEAP_YEAR_EXCEPTION_OVERRIDE_FREQUENCY === 0);
}

function isValidDateFormat (value) {
  return /^(\d{4})-(\d{1,2})-(\d{1,2})$/.test(value);
}

function isValidDate (value, minYear = new Date().getFullYear() - 50, maxYear = minYear + 100) {
  let year, month, day;

  // return false if the format is invalid
  if (!isValidDateFormat(value)) return false;

  [, year, month, day] = value.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);

  month = month.replace(/0(\d)/, '$1');
  day = day.replace(/0(\d)/, '$1');

  // the values should be numbers
  if (!isNumber(year) || !isNumber(month) || !isNumber(day)) return false;

  // the month should be between 1 and 12
  const MONTHS_PER_YEAR = 12;
  if (!isInRange(month, 1, MONTHS_PER_YEAR)) return false;

  // the year should be between minYear and maxYear
  if (!isInRange(year, minYear, maxYear)) return false;

  // the day should be between 1 and 31 for some months
  if (['1', '3', '5', '7', '8', '10', '12'].indexOf(month) !== -1 && !isInRange(day, 1, 31)) return false;

  // the day should be between 1 and 30 for other months
  if (['4', '6', '9', '11'].indexOf(month) !== -1 && !isInRange(day, 1, 30)) return false;

  // the day should me max 29 for month 2 for leap years and max 28 the rest of the time
  if (month === '2' && (isLeapYear(year) ? !isInRange(day, 1, 29) : !isInRange(day, 1, 28))) return false;

  return true;
}
