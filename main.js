let taskInput = document.getElementById("task_input"); // 입력 필드를 가져옴
let addButton = document.getElementById("add_button"); // 추가 버튼을 가져옴
let taskList = []; // 할 일 목록을 저장할 빈 배열로 초기화

addButton.addEventListener("click", addTask); // 추가 버튼 클릭 시 addTask 함수 실행
taskInput.addEventListener("keydown", function (event) {
  if (event.key === `Enter`) {
    addTask();
  }
});
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
  let resultHTML = ""; // 결과 HTML을 저장할 변수 초기화
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `<div class="task task_done">
                <span>${taskList[i].taskContent}</span>
                <div class="button-box">
                  <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa fa-rotate-left"></i></button>
                  <button onclick="deleteTask('${taskList[i].id}')"><i class="fa fa-trash-can"></i></button>
                </div>
              </div>`;
    } else {
      resultHTML += `<div class="task">
        <span>${taskList[i].taskContent}</span>
        <div class="button-box">
          <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa fa-check"></i></button>
          <button onclick="deleteTask('${taskList[i].id}')"><i class="fa fa-trash-can"></i></button>
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
  render();
}

// 고유 ID를 생성하는 함수
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9); // 랜덤한 문자열 생성
}
