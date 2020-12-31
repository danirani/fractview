const isPrime = (n) => {
  for (let i = 2, s = Math.sqrt(n); i <= s; i += 1) {
    if (n % i === 0) {
      return false;
    }
  }

  return (n > 1);
};

const fraction = (a, b, n = 50) => {
  let quotientArray = [];
  let remainderArray = [];

  const longDivision = (nom, denom) => {
    let curNom = nom;

    for (let i = 1; i <= n; i += 1) {
      quotientArray.push(Math.floor(curNom / denom));
      remainderArray.push(curNom % denom);

      curNom = remainderArray.slice(-1) * 10;
    }

    return [quotientArray, remainderArray];
  };

  [quotientArray, remainderArray] = longDivision(a, b, n);

  return {
    fraction: quotientArray.join(''),
    nominator: a,
    denominator: b,
    remainder: remainderArray.join(','),
  };
};

module.exports = {
  fraction,
  isPrime,
};
