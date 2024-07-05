let taskInput = document.getElementById("task_input"); // 입력 필드를 가져옴
let addButton = document.getElementById("add_button"); // 추가 버튼을 가져옴
let tabs = document.querySelectorAll(".tabs div");
let underLine = document.getElementById("under_line");
let taskList = []; // 할 일 목록을 저장할 빈 배열로 초기화
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask); // 추가 버튼 클릭 시 addTask 함수 실행
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
console.log(tabs);

// 할 일을 추가하는 함수
function addTask() {
  let taskValue = taskInput.value;
  if (taskValue === "") return alert("할 일을 입력하세요");

  let task = {
    id: randomIDGenerate(), // 고유 ID 생성
    taskContent: taskInput.value, // 입력 필드의 값을 할 일 내용으로 저장
    isComplete: false, // 초기 상태는 완료되지 않음
  };
  taskList.push(task); // 새 할 일을 목록에 추가
  console.log(taskList); // 현재 할 일 목록을 콘솔에 출력
  taskInput.value = "";
  render(); // 할 일 목록을 화면에 렌더링
}

// 할 일 목록을 화면에 렌더링하는 함수
function render() {
  // 선택한 탭에 따라
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  // 다르게 보여준다

  let resultHTML = ""; // 결과 HTML을 저장할 변수 초기화
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task task_done">
                <span>${list[i].taskContent}</span>
                <div class="button-box">
                  <button onclick="toggleComplete('${list[i].id}')"><i class="fa fa-rotate-left"></i></button>
                  <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash-can"></i></button>
                </div>
              </div>`;
    } else {
      resultHTML += `<div class="task">
        <span>${list[i].taskContent}</span>
        <div class="button-box">
          <button onclick="toggleComplete('${list[i].id}')"><i class="fa fa-check"></i></button>
          <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash-can"></i></button>
        </div>
      </div>`;
    }
  }
  document.getElementById("task_area").innerHTML = resultHTML; // 결과 HTML을 할 일 영역에 삽입
}

// 할 일 완료 상태를 토글하는 함수
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete; // 완료 상태를 반전
      break;
    }
  }
  filter(); // 현재 모드로 필터를 다시 적용
  render(); // 변경된 상태를 화면에 렌더링
  console.log(taskList); // 현재 할 일 목록을 콘솔에 출력
}

// 할 일을 삭제하는 함수
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter(); // 현재 모드로 필터를 다시 적용
  render();
}

function filter(event) {
  if (event) {
    mode = event.target.id; // 각 탭의 아이디를 변수로 지정해서 사용
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top =
      event.target.offsetTop + event.target.offsetHeight - 3 + "px";
  }

  filterList = [];
  if (mode === "all") {
    // 전체 할 일를 보여줌
    render();
  } else if (mode === "ongoing") {
    // 진행중인 할 일을 보여줌
    // task.isComplete = false
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("진행중", filterList);
  } else if (mode === "done") {
    // 끝나는 일
    // task.isComplete = true
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

// 고유 ID를 생성하는 함수
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9); // 랜덤한 문자열 생성
}
