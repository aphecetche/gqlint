const gqLint = require('../../lib/gqlint');

const options = {
  rules: {
    'enum.casing': 'warn'
  }
};

const invalid = {
  lowercase: `
    enum Currency {
      eur
      usd
    }
  `
};
const valid = {
  uppercase: `
    enum Currency {
      EUR
      USD
    }
  `
};

describe('Rule: ENUM Casing', () => {
  test('Invalid value', () => {
    const results = gqLint(invalid.lowercase, '', options);
    expect(results[0].warningCount).toBe(1);
    expect(results[0].messages[0].message).toBe(
      `Property 'Currency' has invalidly cased values. Please uppercase them.`
    );
  });
  test('Valid value', () => {
    const results = gqLint(valid.uppercase, '', options);
    expect(results[0].warningCount).toBe(0);
  });
});
