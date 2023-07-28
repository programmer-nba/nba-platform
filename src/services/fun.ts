import dayjs from 'dayjs'


function numberFormat(num: number) {
  return num.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
}

function datetimeFormat(date: string) {
  return dayjs(date).format("DD/MM/YYYY เวลา HH:mm:ss");
}

function dateFormat(date: string) {
  return dayjs(date).format("DD/MM/YYYY");
}

function getImage(item: string){
  return "https://drive.google.com/uc?export=view&id=" + item;
}
export  { numberFormat, dateFormat, datetimeFormat, getImage, dayjs};