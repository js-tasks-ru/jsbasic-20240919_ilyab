function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  for (let name of friends) {
      let li = document.createElement('li');
      li.innerHTML = name.firstName +' '+ name.lastName;
      ul.appendChild(li);
  }
  return ul;
}