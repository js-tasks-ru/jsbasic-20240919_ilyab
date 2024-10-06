function getMinMax(str) {
  let str1;

  str = str.replace(' - ', ' ');
  str = str.replace(/[^0-9. -]/g,'');

  str1 = str.split(' ')

  let result = {
  min: Math.min(...str1),
  max: Math.max(...str1),
  }
  
return result;
}
