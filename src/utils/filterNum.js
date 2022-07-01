export const numberFormat = function (value) {
  const param = {};
  let k = 10000,
    sizes = ['', '万', '亿', '万亿'],
    i;
  if (value < k) {
    param.value = value
    param.unit = ''
  } else {
    i = Math.floor(Math.log(value) / Math.log(k));

    param.value = ((value / Math.pow(k, i))).toFixed(2);
    param.unit = sizes[i];
  }
  return param;
}
export const durationTrans = function (value) {
  let num = ''
  let [h,m,s]=[parseInt(value/3600),parseInt(value%3600/60),parseInt(value%3600%60)]
  if(h>0){
   h=ltn(h)
    num+=`${h}:`
  }
  m=ltn(m)
  s=ltn(s)
  num+=`${m}:${s}`
  return num
}
const ltn= n=>n<10?`0${n}`:n
