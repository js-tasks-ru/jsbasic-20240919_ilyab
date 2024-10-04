function showSalary(users, age) {
  let str = '';
  for (let i = 0; i < users.length; i++) {
    if (users[i].age <= age && i < users.length) {
      str += (users[i].name + ", " + users[i].balance+ "\n") }
  }
  return str.trim();
}