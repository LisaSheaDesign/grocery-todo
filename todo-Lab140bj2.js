//create object for updated todo list items inputed from the FORM
function Todo(id, task, who, dueDate, local) {
    this.id = id;
    this.task = task;
    this.who = who;
    this.dueDate = dueDate;
    this.done = false;
    this.getLocal = getLocal;
}


//variable for todo list
var todos = new Array();
var todosSearch = new Array();
    
//window.onload = init;

//google map api code
var map = null;

function init() {
	
	var submitButton = document.getElementById("submit");
	submitButton.onclick = getFormData;
	
	var searchBtn = document.getElementById("searchButton");
	searchBtn.onclick = searchList; 

}//init

//add feature message to DOM
function addFeature(featureMessage) {
    var ul = document.getElementById("features");
    var li = document.createElement("li");
    li.innerHTML = featureMessage;
    ul.appendChild(li);
}
       


function addTodosToPage() {
    var ul = document.getElementById("todoList");
    
    //add fragment so content loads at one time
    var listFragment = document.createDocumentFragment();
    for (var i = 0; i < todos.length; i++) {
         var todoItem = todos[i];
     
        //putting all task/who to an array thats been add to the todo list
       //trimming task/who of spaces and separating the string get from task
	todosSearch.push(todoItem.task.trim());
	todosSearch.push(todoItem.who.trim());
     	
        //create function to call to create li
        var li = createNewTodo(todoItem);
        ul.appendChild(li);
        listFragment.appendChild(li);
    } 
    ul.appendChild(listFragment);    
}

//with a parameter for updated items inputed from the FORM
function addTodoToPage(todoItem) {
    var ul = document.getElementById("todoList");
    	
    //create function to call to create li
    var li = createNewTodo(todoItem);
    ul.appendChild(li);
    
    //spanLocal.innerHTML = "add to page ";
    //console.log("add to page todoItem " + getLocal);
   
    //putting add all task to an array thats been add from the FORM
    todosSearch.push(todoItem.task.trim());
    todosSearch.push(todoItem.who.trim());
    document.forms[0].reset();
}
//function to called to create li
function createNewTodo(todoItem) {

getTodoLocation();

//look for undefined elements
	noLocal = todoItem.getLocal;
       if (noLocal == undefined) {
       todoItem.getLocal = '(' + 'No Location Found' + ')';
       //console.log("this is empty");
       }
       
       noDays = daysMgs;
       if (noDays == undefined) {
       daysMgs = '(' + 'Not Found' + ')';
       //console.log("this is empty");
       }
	  	
    //converts dueDate string in to a Date
    var aDateMillis = Date.parse(todoItem.dueDate);
    var listDate = new Date(aDateMillis).toLocaleDateString();
    
    //get days from due and overdue
    var now = new Date();
    var diff = aDateMillis - now.getTime();
    var days = Math.floor(diff / 1000 / 60 / 60 / 24);
    
    //days before due date
    if (days == days) {
    	var daysMgs = '(' + 'Due Today' + ')';
    }
    
    if (days > 0) {
    	var daysMgs = '(' + days + ' Days Left' + ')';
    }
    
     //days after due date
    if (days < 0) {
    	days = Math.abs(days); //convert negative number into positive
    	var daysMgs = '(' + 'Overdue by ' + days + ' days' + ')';
    }
    
    //add li to DOM with todoItems
	var li = document.createElement("li");
	li.setAttribute("id", todoItem.id);
	
	//console.log("getFormData " + getLocal);
    	var spanTodo = document.createElement("span");
    	spanTodo.innerHTML = todoItem.getLocal + ' ' + todoItem.who + " needs to " + todoItem.task + " by " + listDate + ' ' + daysMgs;
       
        var spanDone = document.createElement("span");
        if(!todoItem.done) {
        	spanDone.setAttribute("class", "notDone");
        	spanDone.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        } else {
        	spanDone.setAttribute("class","done");
        	spanDone.innerHTML ="&nbsp;&#10004;&nbsp;";
        }
        
        var spanDelete = document.createElement("span");
        
        //spanDelete.setAttribute("id", todoItem.id); remove from span and move to parent li
        spanDelete.setAttribute("class", "delete");
        spanDelete.innerHTML = "&nbsp;&#10007;&nbsp;";
        
        spanDelete.onclick = deleteItem;
        spanDone.onclick = updateDone;
        
        //adding geolocation to the DOM
        li.appendChild(spanDone);
        li.appendChild(spanTodo);
   	li.appendChild(spanDelete);
   	
    	return li;
    	
    	function updateDone(e) {
	var span = e.target;
	//find the class and update the span and object
	var isItDone = span.getAttribute("class", "notDone");
	
		//update class, inner text, and done boolean when clicked to the array and Local Storage
		if (isItDone == "notDone") {
			span.setAttribute("class", "done")
			span.innerHTML = "&nbsp;&#10004;&nbsp;";
			todoItem.done = true;
			saveTodoItem(todoItem)
		} else {
			span.setAttribute("class", "notDone")
			span.innerHTML ="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			todoItem.done = false;
			saveTodoItem(todoItem)
		}
	
	} //updateDone END

} //createNewTodo END

function getFormData() {
    var task = document.getElementById("task").value;
    if (checkInputText(task, "Please enter a task")) return;

    var who = document.getElementById("who").value;
    if (checkInputText(who, "Please enter a person to do the task")) return;

    var date = document.getElementById("dueDate").value;
    if (checkInputText(date, "Please enter a due date")) return;
    
    //Store the geo location put it in todoItem getLocal object
    	getLocal = geoLocation;
    
    //try catch date processing
    var dateInput = Date.parse(date);
   try {
        if (isNaN(dateInput)) {
            throw new Error("Date format error. Please enter the date in the format MM/DD/YYYY, YYYY/MM/DD, or January 1, 2015");
        } else {
        
    	//pushes the updated todo list items to todos array inputed from the FORM
   	 //var id = todos.length; using the getTime to set id instead of array length
    	var id = (new Date()).getTime();
    	var todoItem = new Todo(id, task, who, date, getLocal);
    	todos.push(todoItem);
   
    	//adds the todo list to page passing thru with a parameter inputed from the FORM
    	addTodoToPage(todoItem);
    
    	//created to save the updated list items to the JSON file inputed from the FORM
    	saveTodoItem(todoItem); 
        }
    }
    catch (ex) {
        alert(ex.message);
    }
    
}//getFormData 

//check to see if the blank has been filled out
function checkInputText(value, msg) {
    if (value == null || value == "") {
        alert(msg);
        return true;
    }
    return false;
}        

function saveTodoItem(todoItem) {
    if (localStorage) {
        var key = "todo" + todoItem.id;
        var item = JSON.stringify(todoItem);
        localStorage.setItem(key, item);
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
    
}

function deleteItem(e) {
	//var id = e.target.id; remove for span get id from parentElement
	var span = e.target;
    	var id = span.parentElement.id;
	//console.log("delete an item: " + id);
	
	//find and remove the item in localStorage
	var key = "todo" + id;
	localStorage.removeItem(key);
	
	//find and remove the item in the array
	for (var i = 0; i < todos.length; i++) {
		if (todos[i].id == id) {
		todos.splice(i,1);
		break;
		}
	}
	//find and remove the item in the page
	var li = e.target.parentElement;
	var ul = document.getElementById("todoList");
	ul.removeChild(li);
}

//search task and who for search results
function searchList() {
	//gets value of search input and check to see if its blank
	var searchTodo = document.getElementById("searchTodo").value;
	searchTodo = searchTodo.trim();
	//change the array into characters match Method is now matching the letters in todosSearch array to searchTodo word
	var matchTerms = todosSearch.join();
	
	if (searchTodo == null || searchTodo == "") {
        alert("Please enter a task or name to search for");
        return;
    	}
    	//create an RegExp for \b to match only the word in task and who
    	var pattern = "\\" + "b" + searchTodo + "\\" + "b";
    	var re = new RegExp(pattern, "ig");
    	var results = matchTerms.match(re);
    		if (results == null || results == "") {
        	var ul = document.getElementById("taskResults");
        	
        	clearResultsList(ul);
        	
        	var frag = document.createDocumentFragment();
        	var li = document.createElement("li");
        	li.innerHTML = "No match found";
        	frag.appendChild(li);
        	ul.appendChild(frag);
    		}
    		else {
        	// Show the matches in the page
        	showResults(results);
        	
    		}
	//console.log("search item: " + searchTodo);
    	//console.log("Found " + results.length + " instances of " + searchTodo + " out of a total of " + todosSearch.length + " words!");
}

function clearResultsList(ul) {
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
}

// show results of search input in list
function showResults(results) {
	var ul = document.getElementById("taskResults");
	
	//clear list results with new search
	clearResultsList(ul);
    	
    	var frag = document.createDocumentFragment();
       
       //show the word that was searched
      	var li = document.createElement("li");
      	li.innerHTML = '"' + results[0] + '"' ;
         
        frag.appendChild(li);
        
        //show the todos that match the search results
        for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        	if (results[0] == todoItem.task || results[0] == todoItem.who) {
      			li.innerHTML += '<br />' + ' Todo Item: ' + todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;
         	}
    
         }//for loop todos
         
         
         	
      //to find the exacted match to task and who then add it to the results
    	
    ul.appendChild(frag);
    
}//showResults of search