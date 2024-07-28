/* ===========================================================
-- copyright 2024 (Todox App)
-- Project Creator: Ashfaque Hossain Abir 
-- Github Id: https://github.com/ashfaquehossainabir 
-- Email: ashfaquehossain300@gmail.com
=========================================================== */


const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");

// Import task complete sound
const taskCompleteSound = new Audio("./sounds/task-complete.mp3");


//========================================================================
//-- Username Popup Box
//========================================================================

const submitButton = document.querySelector('.submitBtn');
const userPopup = document.querySelector('.user-popup');
const overlay = document.getElementById('overlay');
const closeButton = document.querySelector("#close");

closeButton.addEventListener("click", function() {
  overlay.style.display = "none";
  userPopup.style.display = "none";
});

// After Submission User popup will close
submitButton.addEventListener('click', () => {
  userPopup.style.display = 'none';
  overlay.style.display = 'none';
});

window.onload = function() {
    const displayUsername = document.getElementById("greet");
    const userPopup = document.querySelector('.user-popup');
    const overlay = document.getElementById('overlay');
    var storedData = localStorage.getItem("name");

    if(storedData) {
        overlay.style.display = "none";
        userPopup.style.display = "none";

        var totalHrs = date.getHours(); // Get time in 24 Hours Format

        if (totalHrs >= 5 && totalHrs <= 11) {
          //5:00 am to 12:00 pm 
          displayUsername.innerHTML = "Good Morning" + ", " + storedData.charAt(0).toUpperCase() + storedData.slice(1) +"!";
          
        } else if (totalHrs >= 12 && totalHrs <= 13) {
          // 12:00 pm to 2:00 pm
          displayUsername.innerHTML = "Good Noon" + ", " + storedData.charAt(0).toUpperCase() + storedData.slice(1) +"!";

        } else if (totalHrs >= 14 && totalHrs <= 15) {
          // 2:00 pm to 4:00 pm
          displayUsername.innerHTML = "Good Afternoon" + ", " + storedData.charAt(0).toUpperCase() + storedData.slice(1) +"!";

        } else if (totalHrs >= 16 && totalHrs <= 18) {
          // 4:00 pm to 7:00 pm
          displayUsername.innerHTML = "Good Evening" + ", " + storedData.charAt(0).toUpperCase() + storedData.slice(1) +"!";

        } else {
          displayUsername.innerHTML = "Good Night" + ", " + storedData.charAt(0).toUpperCase() + storedData.slice(1) +"!";

        }
    } else {
        overlay.style.display = "block";
        userPopup.style.display = "block";
    }
}


//========================================================================
//-- Time Settings
//========================================================================

// creating a function and calling it in every seconds
setInterval(()=>{

  let date = new Date(),
  hour = date.getHours(),
  min = date.getMinutes(),
  sec = date.getSeconds();

  let d;
  d = hour < 12 ? "AM" : "PM"; //if hour is smaller than 12, than its value will be AM else its value will be pm
  hour = hour > 12 ? hour - 12 : hour; //if hour value is greater than 12 than 12 will subtracted ( by doing this we will get value till 12 not 13,14 or 24 )
  hour = hour == 0 ? hour = 12 : hour; // if hour value is  0 than it value will be 12

  // adding 0 to the front of all the value if they will less than 10
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  document.querySelector(".hour_num").innerText = hour;
  document.querySelector(".min_num").innerText = min;
  // document.querySelector(".sec_num").innerText = sec;
  document.querySelector(".am_pm").innerText = d;

}, 1000); // 1000 milliseconds = 1s
// --------------------------------------------------------------------------

// Import Header Time
const headerTime = document.querySelector("[data-header-time]");

// store current date from build-in date object
const date = new Date();



// --------------------------------------------------------------------------
/**
 * convert weekday number to weekday name
 * totalParameter: 1;
 * parameterValue: <number> 0-6;
 */

const getWeekDayName = function (dayNumber) {
    switch (dayNumber) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "Not a valid day";
    }
  }
  
  
  
  /**
   * convert month number to month name
   * totalParameter: 1;
   * parameterValue: <number> 0-11;
   */
  
  const getMonthName = function (monthNumber) {
    switch (monthNumber) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
      default:
        return "Not a valid month";
    }
  }
  
  
  
  // store weekday name, month name & month-of-day number
  const weekDayName = getWeekDayName(date.getDay());
  const monthName = getMonthName(date.getMonth());
  const monthOfDay = date.getDate();
  
  // update headerTime date
  headerTime.textContent = `${weekDayName}, ${monthName} ${monthOfDay}`;
// --------------------------------------------------------------------------

//========================================================================
//-- Todo App Functionalities
//========================================================================

let editId,
isEditTask = false,
todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});

function showTodo(filter) {
    let liTag = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completed = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter == "all") {
                liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" style="cursor: pointer;" id="${id}" ${completed}>
                                <p class="${completed}">${todo.name}</p>
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
                                    <li onclick='editTask(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
    let checkTask = taskBox.querySelectorAll(".task");
    !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
}
showTodo("all");

function showMenu(selectedTask) {
    let menuDiv = selectedTask.parentElement.lastElementChild;
    menuDiv.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask) {
            menuDiv.classList.remove("show");
        }
    });
}

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked) {
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
        taskCompleteSound.play();  // Task Complete Sound will play after clicking checked button
    } else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}

function editTask(taskId, textName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = textName;
    taskInput.focus();
    taskInput.classList.add("active");
}

function deleteTask(deleteId, filter) {
    isEditTask = false;
    if(confirm("Are you sure, you want to delete this task?") == true) {
      todos.splice(deleteId, 1);
      localStorage.setItem("todo-list", JSON.stringify(todos));
      showTodo(filter);
    }
}

clearAll.addEventListener("click", () => {
    isEditTask = false;
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo()
});

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask) {
        if(!isEditTask) {
            todos = !todos ? [] : todos;
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo(document.querySelector("span.active").id);
    }
});


//========================================================================
//-- Custom Background & Input Submission Functionalities
//========================================================================

var totalHrs = date.getHours(); // Get time in 24 Hours Format

function customBg(url) {
  document.body.style.background =
    "linear-gradient(#00000050, #00000050),url(" + url + ")";
  document.body.style.backgroundColor = "#000000";
  // document.body.style.backgroundImage = "url(" + url + ")";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
}

if (totalHrs >= 5 && totalHrs <= 11) {
  //5:00 am to 12:00 pm 
  function submit() {
    var inputValue = document.getElementById("userInput").value;
    if (inputValue == "" || inputValue == null) {
    document.getElementById("greet").innerHTML = "Good Morning" + ", " + "User" +"!";
    }else {
    document.getElementById('greet').innerHTML = "Good Morning" + ", " + inputValue.charAt(0).toUpperCase() + inputValue.slice(1) +"!";
    localStorage.setItem("name", inputValue);
    }
  };
  document.querySelector("#close").addEventListener("click", function() {
    document.getElementById("greet").innerHTML = "Good Morning" + ", " + "User" +"!";
  });
  customBg("'images/morning.jpg'");
} else if (totalHrs >= 12 && totalHrs <= 13) {
  // 12:00 pm to 2:00 pm
  function submit() {
    var inputValue = document.getElementById("userInput").value;
    if (inputValue == "" || inputValue == null) {
    document.getElementById("greet").innerHTML = "Good Noon" + ", " + "User" +"!";
    }else {
    document.getElementById('greet').innerHTML = "Good Noon" + ", " + inputValue.charAt(0).toUpperCase() + inputValue.slice(1) +"!";
    localStorage.setItem("name", inputValue);
    }
  };
  document.querySelector("#close").addEventListener("click", function() {
    document.getElementById("greet").innerHTML = "Good Noon" + ", " + "User" +"!";
  });
  customBg("'images/noon.jpg'");
} else if (totalHrs >= 14 && totalHrs <= 15) {
  // 2:00 pm to 4:00 pm
  function submit() {
    var inputValue = document.getElementById("userInput").value;
    if (inputValue == "" || inputValue == null) {
    document.getElementById("greet").innerHTML = "Good Afternoon" + ", " + "User" +"!";
    }else {
    document.getElementById('greet').innerHTML = "Good Afternoon" + ", " + inputValue.charAt(0).toUpperCase() + inputValue.slice(1) +"!";
    localStorage.setItem("name", inputValue);
    }
  };
  document.querySelector("#close").addEventListener("click", function() {
    document.getElementById("greet").innerHTML = "Good Afternoon" + ", " + "User" +"!";
  });
  customBg("'images/afternoon.jpg'");
} else if (totalHrs >= 16 && totalHrs <= 18) {
  // 4:00 pm to 7:00 pm
  function submit() {
    var inputValue = document.getElementById("userInput").value;
    if (inputValue == "" || inputValue == null) {
    document.getElementById("greet").innerHTML = "Good Evening" + ", " + "User" +"!";
    }else {
    document.getElementById('greet').innerHTML = "Good Evening" + ", " + inputValue.charAt(0).toUpperCase() + inputValue.slice(1) +"!";
    localStorage.setItem("name", inputValue);
    }
  };
  document.querySelector("#close").addEventListener("click", function() {
    document.getElementById("greet").innerHTML = "Good Evening" + ", " + "User" +"!";
  });
  customBg("'images/evening.jpg'");
} else {
  function submit() {
    var inputValue = document.getElementById("userInput").value;
    if (inputValue == "" || inputValue == null) {
    document.getElementById("greet").innerHTML = "Good Night" + ", " + "User" +"!";
    }else {
    document.getElementById('greet').innerHTML = "Good Night" + ", " + inputValue.charAt(0).toUpperCase() + inputValue.slice(1) +"!";
    localStorage.setItem("name", inputValue);
    }
  };
  document.querySelector("#close").addEventListener("click", function() {
    document.getElementById("greet").innerHTML = "Good Night" + ", " + "User" +"!";
  });
  customBg("'images/night.jpg'");
}


//========================================================================
//-- Disabling Context Menu & Some Keys
//========================================================================

//-------------- For prevent hacking -----------------

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
}, false);

// Disable “Ctrl+Shift+I”, “Ctrl+U” and ”F12 key
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.keyCode==123) {
   e.stopPropagation();
   e.preventDefault();
  }
});