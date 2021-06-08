//GET ELEMENTS
var inventoryList = document.getElementById('inventoryList');
var button = document.getElementById("submitButton");
var inventories = inventoryList.getElementsByTagName("tbody")[0];
var product = document.querySelector('#product');
var pricePerQty = document.getElementById('pricePerQty');
var quantity = document.getElementById('quantity');
var total = document.getElementById('total');




//EVENT LISTENER
button.addEventListener("click", runEvent);//adding items to inventory
document.addEventListener("DOMContentLoaded", getTasks);//for attaching to DOM
inventories.addEventListener("click", removeItem);// for removing items from the table
//RUN EVENT
function runEvent(e) {
  e.preventDefault();
    addRecord();
//1a convert input to an object and pass it as a string
var formData = {
"product": document.querySelector('#product').value,
"pricePerQty": document.getElementById('pricePerQty').value,
"quantity": document.getElementById('quantity').value,
"amount": `${quantity.value * pricePerQty.value}`,
};
//console.log(formData);
//1b saving current data to local storage by passing as a string bcos local storage only accepts strings
localStorage.setItem('readData', JSON.stringify(formData));
//saving current and previous data to local storage
storeTaskInLocalStorage(formData);
updateSubTotal();
//updateItem();


}
//GET TASK FROM LOCAL STORAGE AND ATTACHING TO DOM
function getTasks() {
  let tasks = JSON.stringify(localStorage.getItem("tasks"));
  if(tasks === null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localStorage.getItem("tasks"));
  //  console.log(taskList);
  }


  taskList.forEach(function(task){
      var tr = document.createElement("tr");
      var btn = document.createElement("button");
      btn.className = "btn btn-danger btn-sm delete";
      btn.appendChild(document.createTextNode("X"));
      inventories.appendChild(tr);
        cell1 = tr.insertCell(0);
        cell1.appendChild(document.createTextNode(task["product"]));
        cell2 = tr.insertCell(1);
        cell2.appendChild(document.createTextNode(task["pricePerQty"]));
        cell3 = tr.insertCell(2);
        cell3.className = "loop";
        cell3.appendChild(document.createTextNode(task["quantity"]));
        cell4 = tr.insertCell(3);
        cell4.appendChild(document.createTextNode(task["amount"]));
        //console.log(cell3);
        cell4.appendChild(document.createTextNode(`${quantity.value * pricePerQty.value}`));
        cell5 = tr.insertCell(4);
        cell5.appendChild(btn);

  });



}


//ADDING INPUT TO TABLE

function addRecord(item) {
  var tr = document.createElement("tr");
  var btn = document.createElement("button");
  btn.className = "btn btn-danger btn-sm delete";
  btn.appendChild(document.createTextNode("X"));
  inventories.appendChild(tr);
    cell1 = tr.insertCell(0);
    cell1.appendChild(document.createTextNode(product.value));
    cell2 = tr.insertCell(1);
    cell2.appendChild(document.createTextNode(pricePerQty.value));
    cell3 = tr.insertCell(2);
    cell3.appendChild(document.createTextNode(quantity.value));
    cell4 = tr.insertCell(3);
    cell4.appendChild(document.createTextNode(`${quantity.value * pricePerQty.value}`));
    cell5 = tr.insertCell(4);
    cell5.appendChild(btn);


};



//STORING ALL TASKS(CURRENT AND PREVIOUS) IN LOCAL STORAGE

function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


//TOTALING THE QUANTITY AND AMOUNT
function updateSubTotal(item) {
  var table = document.getElementById("inventories");
  var tableFoot = document.getElementById("total");
  var footerRow = document.getElementById("total-row");
   cell1 = footerRow.insertCell(0);
   cell1.appendChild(document.createTextNode("TOTAL"));
   cell2 = footerRow.insertCell(1);
   cell2.appendChild(document.createTextNode(""));
   cell3 = footerRow.insertCell(2);
   cell4 = footerRow.insertCell(3);
   cell5 = footerRow.insertCell(4);
   cell5.appendChild(document.createTextNode(""));

  let totalForCell3 = Array.from(table.rows).slice(0).reduce((total, row) => {
    return total + parseFloat(row.cells[2].innerHTML);
  }, 0);
  cell3.appendChild(document.createTextNode(totalForCell3));

   let totalForCell4 = Array.from(table.rows).slice(0).reduce((total, row) => {
     return total + parseFloat(row.cells[3].innerHTML);
   }, 0);
    cell4.appendChild(document.createTextNode(totalForCell4));



}

//DELETING A TABLE ROW
function removeItem(e) {
  //console.log(e);
  if (e.target.classList.contains('delete')) {
    if (confirm("Are you sure ?")) {
      let row = e.target.parentElement.parentElement;
      row.parentNode.removeChild(row);
      //console.log(row);
      updateSubTotal();
    }
  }
};


//UPDATE AMOUNT AND QUANTITY IF ITEM IS THE SAME
/*
  function updateItem(item) {
          var table = document.getElementById("inventories");
          for (var i = 0, row; row = table.rows[i]; i++) {
            var objCells = table.rows.item(i).cells;
              console.log(objCells);
             //iterate through rows
             //rows would be accessed using the "row" variable assigned in the for loop
             for (var j = 0, col; col = row.cells[j]; j++) {
               var sobjCells = row.cells.item[j];
               console.log(sobjCells);
               }
               //iterate through columns
               //columns would be accessed using the "col" variable assigned in the for loop

               }
             }


             function start() {
                    var mybody = document.getElementsByTagName("body")[0];
                    mytable = document.createElement("table");
                    mytablebody = document.createElement("tbody");

                    for(var row = 0; row < 2; row++) {
                        mycurrent_row=document.createElement("tr");
                        for(var col = 0; col < 2; col++) {
                            mycurrent_cell = document.createElement("td");
                            currenttext = document.createTextNode("cell is: " + row + col);
                            mycurrent_cell.appendChild(currenttext);
                            mycurrent_row.appendChild(mycurrent_cell);
                            // set the cell background color
                            // if the column is 0. If the column is 1 hide the cell
                            if (col === 0) {
                                mycurrent_cell.style.background = "rgb(255,0,0)";
                            } else {
                                mycurrent_cell.style.display = "none";
                            }
                        }
                        mytablebody.appendChild(mycurrent_row);
                    }
                    mytable.appendChild(mytablebody);
                    mybody.appendChild(mytable);
                 }
*/
