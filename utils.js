const sum = (array) => array.reduce((a, b) => a + b, 0);
const ave = (array) => sum(array) / array.length;

const freqDist = (array) => {
  const countObj = {};

  array.forEach((x) => { countObj[x] = (countObj[x] || 0) + 1; });

  return countObj;
};

const isPrime = (n) => {
  for (let i = 2, s = Math.sqrt(n); i <= s; i += 1) {
    if (n % i === 0) {
      return false;
    }
  }

  return (n > 1);
};

const isPrimeStar = (n) => (isPrime(n) ? '*' : '');

const longDivision = (nominator, denominator, maxDecimalPlaces) => {
  const quotientArray = [];
  const remainderArray = [];

  const fractionInteger = Math.floor(nominator / denominator);
  const fractionNoRepeat = [];
  const fractionRepeat = [];

  let curNom = nominator;
  let curRem;
  let cycleStart;
  let cycleEnd;
  let count = 0;

  const createFractionString = () => {
    if (fractionRepeat.length) {
      return `${fractionInteger}.${fractionNoRepeat.join('')}${fractionRepeat.join('')}|${fractionRepeat.slice(0, 4).join('')}...`;
    }

    // a repeating period has not been within the defined maximum
    // decimal places, so display only non-repeating fraction.

    return `${fractionInteger}.${fractionNoRepeat.join('')}${fractionRepeat.join('')}...`;
  };

  do {
    quotientArray.push(Math.floor(curNom / denominator));
    remainderArray.push(curNom % denominator);

    curRem = remainderArray[remainderArray.length - 1];
    curNom = curRem * 10;

    // check if the current remainder has been encountered
    // on a previous occasion. If so, a repeating decimal
    // fraction has been detected.

    cycleStart = remainderArray.indexOf(curRem);
    cycleEnd = remainderArray.length - 1;

    count += 1;

    if (cycleStart !== cycleEnd) {
      for (let i = 0; i < cycleStart; i += 1) {
        fractionNoRepeat.push(quotientArray[i + 1]);
      }

      for (let i = cycleStart; i < cycleEnd; i += 1) {
        fractionRepeat.push(quotientArray[i + 1]);
      }
    } else if (count > maxDecimalPlaces) {
      // a repeating period has not been found over
      // the defined maximum number of decimal places.

      for (let i = 0; i < cycleEnd; i += 1) {
        fractionNoRepeat.push(quotientArray[i + 1]);
      }
    }
  } while (count <= maxDecimalPlaces && !fractionRepeat.length);

  return {
    fractionInteger,
    fractionNoRepeat,
    fractionRepeat,
    fractionString: createFractionString(),
  };
};

const fraction = (a, b, n = 500) => {
  const d = longDivision(a, b, n);

  return {
    nominator: a,
    denominator: b,
    fractionString: d.fractionString,
    fractionRepeat: d.fractionRepeat,
    fractionNoRepeat: d.fractionNoRepeat,
    frequency: freqDist(d.fractionRepeat),
    repeatLength: d.fractionRepeat.length,
  };
};

const showFraction = (a, b) => {
  const f = fraction(a, b);

  console.log('Nominator   :', f.nominator);
  console.log('Denominator :', f.denominator);
  console.log('Fraction    :', f.fractionString);
  console.log('RepValue    :', f.fractionRepeat.join(''));
  console.log('Rep Length  :', f.repeatLength);
  console.log('Rep FreqDist:', freqDist(f.fractionRepeat));
};

const showPeriods = (n) => {
  // show the repeating decimal for reciprocals in the range 1..n

  for (let i = 1; i <= n; i += 1) {
    const f = fraction(1, i);
    console.log(i, ' , ', f.repeatLength, ' , ', f.fractionRepeat.join(''));
  }
};

module.exports = {
  sum,
  ave,
  freqDist,
  isPrime,
  isPrimeStar,
  fraction,
  showFraction,
  showPeriods,
};
