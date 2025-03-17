document.querySelector('form').onsubmit = (e) => {
  e.preventDefault();
  const when = new Date().getTime();

  chrome.alarms.create('4Daagse', { when: when, periodInMinutes: 0.5 }, () => alert('Pinger gestart!'));
}

document.getElementById('clear').onclick = (e) => {
  chrome.alarms.clear('4Daagse', (wasCleared) => {
    if (wasCleared) {
      alert("Pinger gestopt")
    }
  });
}

document.getElementById('test').onclick = (e) => {
  chrome.runtime.sendMessage({type: "notify", title: "4Daagse extension", message: "Testnotificatie!"});
}