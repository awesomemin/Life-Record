const date_display = document.getElementById('date');
const dateObj = new Date();
const year = String(dateObj.getFullYear());
const month = String(dateObj.getMonth() + 1).padStart(2, "0");
const date = String(dateObj.getDate()).padStart(2, "0");

function setDate() {
  date_display.innerText = `${year}-${month}-${date}`;
}

setDate();