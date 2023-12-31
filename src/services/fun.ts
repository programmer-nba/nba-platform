import dayjs from 'dayjs';

function numberFormat(num: number) {
  return num.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
}

function datetimeFormat(date: string) {
  return dayjs(date).format("DD/MM/YYYY เวลา HH:mm:ss");
}

function datetimeFormatLimit(date: string) {
  return dayjs(date).format("YYYY-MM-DDT00:00:00");
}

function dateFormat(date: string) {
  return dayjs(date).format("DD/MM/YYYY");
}
function dateFormatValue(date: any) {
  return dayjs(date).format("YYYY-MM-DD");
}

function dateFormatDefaultToTh(date: any) {
  const deta = new Date(date)
  return toThaiDateString(deta);
}
function dateFormatDefaultToEn(date: any) {
  const deta = new Date(date)
  return toEnDateString(deta);
}
function getImage(item: string) {
  return "https://drive.google.com/uc?export=view&id=" + item;
}


function toThaiDateString(date: any) {
  let monthNames = [
    "ม.ค.", "ก.พ.", "	มี.ค.", "เม.ย.",
    "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.",
    "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
  ];
  let day = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."]

  let days = day[date.getDay()];
  let year = date.getFullYear() + 543;
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();


  return `${days} ${numOfDay} ${month} ${year}`;
}

function toEnDateString(date: any) {
  let monthNames = [
    "Jan", "Feb", "	Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];
  let day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  let days = day[date.getDay()];
  let year = date.getFullYear() + 543;
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();


  return `${days} ${numOfDay} ${month} ${year}`;
}

export { dateFormat, dateFormatDefaultToEn, dateFormatDefaultToTh, dateFormatValue, datetimeFormat, datetimeFormatLimit, dayjs, getImage, numberFormat, toEnDateString, toThaiDateString };

