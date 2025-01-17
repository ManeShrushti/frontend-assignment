import { replaceDotWithUnderscore } from './utils';

describe('replaceDotWithUnderscore', () => {
  test('replaces dot with underscore in object keys', () => {
    const inputData = [
      { 'first.name': 'John', 'last.name': 'Doe' },
      { 'email.address': 'john.doe@example.com' }
    ];

    const expectedOutput = [
      { first_name: 'John', last_name: 'Doe' },
      { email_address: 'john.doe@example.com' }
    ];

    const result = replaceDotWithUnderscore(inputData);

    expect(result).toEqual(expectedOutput);
  });

  test('does not modify objects without dot in keys', () => {
    const inputData = [
      { name: 'John', age: 30 },
      { city: 'New York', country: 'USA' }
    ];

    const expectedOutput = [
      { name: 'John', age: 30 },
      { city: 'New York', country: 'USA' }
    ];

    const result = replaceDotWithUnderscore(inputData);

    expect(result).toEqual(expectedOutput);
  });

  test('returns empty array when input is empty', () => {
    const result = replaceDotWithUnderscore([]);

    expect(result).toEqual([]);
  });
});
