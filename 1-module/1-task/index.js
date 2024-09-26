function factorial(n) {
  let i = 1;
  let result = 1;
  
  while (i <= n)  { 
      result *= i++; 
    }
  
  return result;
  
  }