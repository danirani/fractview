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

const fraction = (a, b, n = 50) => {
  const repValues = [];
  const repRemains = [];
  let fullFraction = '';

  const longDivision = (nominator, denominator) => {
    const quotientArray = [];
    const remainderArray = [];

    let curNom = nominator;
    let curRem;
    let cycleStart;
    let cycleEnd;
    let count = 0;

    do {
      quotientArray.push(Math.floor(curNom / denominator));
      remainderArray.push(curNom % denominator);

      curRem = remainderArray[remainderArray.length - 1];
      curNom = curRem * 10;

      cycleStart = remainderArray.indexOf(curRem);
      cycleEnd = remainderArray.length - 1;

      if (curRem === 0) {
        repValues.push(quotientArray.slice(1).join(''));
      }

      if (cycleStart !== cycleEnd) {
        for (let i = cycleStart; i < cycleEnd; i += 1) {
          repValues.push(quotientArray[i + 1]);
          repRemains.push(remainderArray[i]);
        }

        // console.log(cycleStart, ' , ' ,cycleEnd, ' , ', remainderArray);
      }

      count += 1;
    } while (count < 200 && !repValues.length);
  };

  const createFraction = () => {
    const intValue = Math.floor(a / b);
    if (repValues.length) {
      fullFraction = `${intValue}.${repValues.join('')}|${repValues.slice(0, 4).join('')} ...`;
    } else {
      fullFraction = `${intValue}`;
    }
  };

  if (b > 0) {
    longDivision(a, b, n);
    createFraction();
  }

  return {
    repValues,
    repRemains,
    fullFraction,
    frequency: freqDist(repValues),
    repLength: repValues.length,
    fraction: repValues.join(''),
    nominator: a,
    denominator: b,
  };
};

const showFraction = (a, b) => {
  const f = fraction(a, b);

  console.log('Nominator   :', f.nominator);
  console.log('Denominator :', f.denominator);
  console.log('Fraction    :', f.fullFraction);
  console.log('RepValue    :', f.repValues.join(''));
  console.log('Rep Length  :', f.repLength);
};

const showPeriods = (n) => {
  // period of decimal representation of 1/n

  for (let i = 1; i <= n; i += 1) {
    const f = fraction(1, i);
    console.log(i, ' , ', f.repLength);
  }
};

module.exports = {
  sum,
  ave,
  freqDist,
  isPrime,
  fraction,
  showFraction,
  showPeriods,
};
