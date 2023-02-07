export const monthName = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const getTime = (mode) => {
  let currentTime = new Date();

  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let day = currentTime.getDate();
  let month = `${monthName[currentTime.getMonth()]}`;
  let years = currentTime.getFullYear();

  if (hours.length < 2) hours = `0${hours}`;
  if (minutes.length < 2) minutes = `0${minutes}`;

  if (mode === 'date') return `${date}`;
  if (mode === 'month') return `${month}`;
  if (mode === 'years') return `${years}`;
  if (mode === 'fullDate') return `${day} ${month} ${years}`;
  if (mode === 'time') return `${hours}:${minutes}`;
  if (mode === 'noDay') return `${month} ${years}`;
};
