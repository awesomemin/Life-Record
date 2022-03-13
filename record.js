const category = document.querySelectorAll('.category');
const record_area = document.querySelectorAll('.record-area');
const btn_initialize = document.querySelector('#btn-initialize');

let Infos = {};

btn_initialize.addEventListener('click', () => {
  const agree = confirm("정말로 초기화하시겠습니까?");
  if (agree) {
    Infos = {};
    saveRecordingLocalstorge();
    loadRecordings();
    location.reload();
  }
})

function loadRecordings () {
  const recordings = localStorage.getItem('recordings');
  Infos = JSON.parse(recordings);
  console.log(Infos);
  category.forEach(
    (currentValue, currentIndex) => {
      if(Infos[currentIndex]) {
        currentValue.innerText = Infos[currentIndex].category;
        if (currentValue.innerText == "낭비") {
          currentValue.classList.toggle('bg-danger');
        } else if (currentValue.innerText == "투자") {
          currentValue.classList.toggle('bg-success');
        } else if (currentValue.innerText == "소비") {
          currentValue.classList.toggle('bg-warning');
        }
      }
    }
  )
  record_area.forEach(
    (currentValue, currentIndex) => {
      if(Infos[currentIndex]) {
        currentValue.value = Infos[currentIndex].content;
      }
    }
  )
}

window.onload = loadRecordings;

category.forEach(
  (currentValue, currentIndex) => {
    currentValue.addEventListener('click', (event) => {
      if (currentValue.innerText == "") {
        currentValue.innerText = "낭비";
        currentValue.classList.toggle('bg-danger');
      } else if (currentValue.innerText == "낭비") {
        currentValue.innerText = "투자";
        currentValue.classList.toggle('bg-danger');
        currentValue.classList.toggle('bg-success');
      } else if (currentValue.innerText == "투자") {
        currentValue.innerText = "소비";
        currentValue.classList.toggle('bg-success');
        currentValue.classList.toggle('bg-warning');
      } else if (currentValue.innerText == "소비") {
        currentValue.innerText = "낭비";
        currentValue.classList.toggle('bg-warning');
        currentValue.classList.toggle('bg-danger');
      }
      const recordedInfo = {
        content: "",
        category: ""
      }
      recordedInfo.content = event.path[1].children[1].children[0].value;
      recordedInfo.category = currentValue.innerText;
      Infos[currentIndex] = recordedInfo;
      console.dir(Infos);
      saveRecordingLocalstorge();
    });
  }
)

record_area.forEach(
  (currentValue, currentIndex) => {
    currentValue.addEventListener('keyup', (event) => {
      const recordedInfo = {
        content: "",
        category: ""
      }
      recordedInfo.content = currentValue.value;
      recordedInfo.category = event.path[2].children[2].innerText;
      Infos[currentIndex] = recordedInfo;
      console.log(Infos);
      saveRecordingLocalstorge();
    })
  }
)

function saveRecordingLocalstorge() {
  localStorage.setItem('recordings', JSON.stringify(Infos));
}