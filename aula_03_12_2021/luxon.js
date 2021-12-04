const { DateTime, Interval } = require("luxon");

const apertei = DateTime.local(); //pega o momento atual

//Algum tempo depois...
const now = DateTime.local(); //pega o momento atual de novo
const i = Interval.fromDateTimes(apertei, now);
console.log(i.length('millisecond'));

const now2 = DateTime.local();
console.log(now2.toLocaleString()); 
console.log(now2.toLocaleString(DateTime.DATETIME_SHORT)); 
console.log(DateTime.now().setLocale('en-gb').toLocaleString())

const isoDate = '2020-11-19T21:22:00-0300';
const date = DateTime.fromISO(isoDate);
console.log(date.toLocaleString({ locale: 'pt-BR' }));

const RFC = 'Thu, 19 Nov 2020 21:22:00 -0300';
const date2 = DateTime.fromRFC2822(isoDate);

console.log(date2)