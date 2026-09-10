const response = await fetch('https://n.account.post.ch/v1/session/subscribe', {
  credentials: 'include',
});
const json = await response.json();
const user = json?.data; // { name, surname, email, ... }
