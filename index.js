const {
  fraction,
  showFraction,
  showPeriods,
  isPrimeStar,
} = require('./utils.js');

// showFraction(1, 52);
// showPeriods(1140);

for (let i = 1; i <= 100; i += 1) {
  const f = fraction(1, i);
  if (f.fractionString !== '-') {
    console.log(i + isPrimeStar(i), ' , ', f.repeatLength, ' , ', f.fractionString);
  }
}
