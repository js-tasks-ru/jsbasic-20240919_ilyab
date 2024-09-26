function ucFirst(str) {
  if (str === '') {
    return str;
  } else {
  let a = str[0].toUpperCase();
  let b = str.slice(1);
  return a+b;
   }
}