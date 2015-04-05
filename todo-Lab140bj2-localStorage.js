getTodoItems();

//function that deserializing object, loops then push to the todos array
function getTodoItems() {
    if (localStorage) {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.substring(0, 4) == "todo") {
                var item = localStorage.getItem(key);
                var todoItem = JSON.parse(item);
                todos.push(todoItem);
           }
           
        }
        
       addTodosToPage();
    }
  
}//getTodoItems