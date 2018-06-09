$(document).ready(function(){
    var buzzer = $("#buzzer")[0];
    var ogCount = parseInt($("#num").html())
    var ogBreaktime = parseInt($("#breaknum").html())
    var ogLongbreaktime = parseInt($("#longbreaknum").html())
    var cycle = 0;

    $("#reset").hide();

    $("#start").click(function(){
      var counter = setInterval(timer, 1000);
      var count = ogCount * 60;
      var breaktime = ogBreaktime * 60;
      var longbreaktime = ogLongbreaktime * 60;

      function timer() {
        $("#timeType").show();
        //Hide Variables
        $("#start, #minus5clock, #add5clock, #minus5break, #add5break, #minus5longbreak, #add5longbreak, #breaknum, #longbreaknum, #title1, #title2, #title3").hide();
        $("#timeType").html("Session Time: ");
        count -= 1;
        if (count === 0) {
          cycle ++;
          buzzer.play();
          count = ogCount * 60;
          clearInterval(counter);
          if (cycle === 4) {
             cycle = 0;
             var startLongBreak = setInterval(longbreakTimer, 1000);
          } else {
             var startBreak = setInterval(breakTimer, 1000);
          }
          $("#num").hide();
        }
        if (count % 60 >= 10){
           $("#num").html(Math.floor(count/60) + ":" + count%60);
        } else {
          $("#num").html(Math.floor(count/60) + ":" + "0" + count%60);
        }

        function breakTimer() {
          $("#timeType").html("Break Time: ");
          $("#breaknum").show();
          $("#timeType").show();
          breaktime -= 1;
          if (breaktime === 0) {
            buzzer.play();
            clearInterval(startBreak);
            breaktime = ogBreaktime * 60;
            counter = setInterval(timer, 1000);
            $("#num").show();
            $("#breaknum").hide();
          }
          if (breaktime % 60 >= 10){
             $("#breaknum").html(Math.floor(breaktime/60) + ":" + breaktime%60);
          } else {
            $("#breaknum").html(Math.floor(breaktime/60) + ":" + "0" + breaktime%60);
          }
        }

        function longbreakTimer() {
          $("#timeType").html("Long Break Time: ");
          $("#longbreaknum").show();
          $("#timeType").show();
          longbreaktime -= 1;
          if (longbreaktime === 0) {
            buzzer.play();
            clearInterval(startLongBreak);
            longbreaktime = ogLongbreaktime * 60;
            $("#reset").show();
            $("#breaknum").hide();
          }
          if (longbreaktime % 60 >= 10){
             $("#longbreaknum").html(Math.floor(longbreaktime/60) + ":" + longbreaktime%60);
          } else {
            $("#longbreaknum").html(Math.floor(longbreaktime/60) + ":" + "0" + longbreaktime%60);
          }
        }
      }

    });

    $("#reset").click(function() {
      count = ogCount;
      breaktime = ogBreaktime;
      longbreaktime = longBreaktime;
      $("#num").html(count);
      $("#breaknum").html(breaktime);
      $("#start, #minus5clock, #add5clock, #minus5break, #add5break, #breaknum, #num, #title1, #title2, #title3, #add5longbreak, #minus5longbreak, #longbreaknum").show();
      $("#timeType, #reset").hide();

    });

    $("#minus5clock").click(function() {
      if (ogCount >= 5) {
        ogCount -= 5;
        $("#num").html(ogCount);
      }
    });

    $("#add5clock").click(function() {
        ogCount += 5;
        $("#num").html(ogCount);
    });

    $("#minus5break").click(function() {
      if (ogBreaktime >= 5) {
        ogBreaktime -= 5;
        $("#breaknum").html(ogBreaktime);
      }
    });

    $("#add5break").click(function() {
        ogBreaktime += 5;
        $("#breaknum").html(ogBreaktime);
    });
    $("#minus5longbreak").click(function() {
      if (ogLongbreaktime >= 5) {
        ogLongbreaktime -= 5;
        $("#longbreaknum").html(ogLongbreaktime);
      }
    });

    $("#add5longbreak").click(function() {
        ogLongbreaktime += 5;
        $("#longbreaknum").html(ogLongbreaktime);
    });


});

// Problem: User interaction doesn't provide desired results.
// Solution: Add interactivity so the user can manage daily tasks

var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incompleteTasksHolder = document.getElementById("incomplete-tasks");
var completedTasksHolder = document.getElementById("completed-tasks");

//New Task List Item
var createNewTaskElement = function(taskString) {
  //Create List Item
  var listItem = document.createElement("li");

  //input (checkbox)
  var checkBox = document.createElement("input"); // checkbox
  //label
  var label = document.createElement("label");
  //input (text)
  var editInput = document.createElement("input"); // text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");

      //Each element needs modifying

  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;


      // each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

// Add a new task
var addTask = function() {
  console.log("Add task...");
  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

// Edit an existing task
var editTask = function() {
  console.log("Edit Task...");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]")
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");
    //if the class of the parent is .editMode
  if(containsClass) {
      //switch from .editMode
      //Make label text become the input's value
    label.innerText = editInput.value;
  } else {
      //Switch to .editMode
      //input value becomes the label's text
    editInput.value = label.innerText;
  }

    // Toggle .editMode on the parent
  listItem.classList.toggle("editMode");

}


// Delete an existing task
var deleteTask = function() {
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

// Mark a task as complete
var taskCompleted = function() {
  console.log("Task complete...");
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark a task as incomplete
var taskIncomplete = function() {
  console.log("Task Incomplete...");
  // When checkbox is unchecked
  // Append the task list item #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  //bind editTask to edit button
  editButton.onclick = editTask;

  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;

  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

// Set the click handler to the addTask function
//addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


// Cycle over the incompleteTaskHolder ul list items
for(var i = 0; i <  incompleteTasksHolder.children.length; i++) {
    // bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
// Cycle over the completeTaskHolder ul list items
for(var i = 0; i <  completedTasksHolder.children.length; i++) {
    // bind events to list item's children (taskIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);

}
