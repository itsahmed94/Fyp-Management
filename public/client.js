const socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');
const userID = "614888134708ed8fe2fa7640"
socket.emit('online' , {userID})

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on(`${userID}-message`, function({message}) {
    var item = document.createElement('li');
    item.textContent = message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });


