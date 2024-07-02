// 유저가 값을 클릭한다
// + 버튼을 클릭하면 할일이 true가 된다
// delete를 클릭하면 할일이 삭제된다
// check를 클릭하면 줄긋기
// 진행중 끝남 탭을 누르면 언더바가 이동
// 끝남 탭은 끝난 아이템만 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 전체 아이템으로 이동

let taskInput = document.querySelector(".task_input");
let addButton = document.querySelector(".add_button");
let taskList = []; // 빈 배열로 초기화

addButton.addEventListener("click", addTask);

function addTask() {
  let taskContent = taskInput.value; // taskInput의 밸류를 가져옴
  taskList.push(taskContent);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `  <div class="task">
              <div>${taskList[i]}</div>
              <div>
                <button>Check</button>
                <button>Delete</button>
              </div>
            </div>`;
  }
  document.getElementById("task_area").innerHTML = resultHTML;
}
