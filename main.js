//GET ELEMENTS
var inventoryList = document.getElementById('inventoryList');
var button = document.getElementById("submitButton");
var inventories = inventoryList.getElementsByTagName("tbody")[0];
var product = document.querySelector('#product');
var pricePerQty = document.getElementById('pricePerQty');
var quantity = document.getElementById('quantity');
var total = document.getElementById('total');



//EVENT LISTENER
button.addEventListener("click", runEvent);
document.addEventListener("DOMContentLoaded", getTasks);

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



/*

  if (formData != storeTaskInLocalStorage()) {
    var tr = document.createElement("tr");
    total.appendChild(tr);
    tr.appendChild(document.createTextNode("TOTAL"));
    }

*/
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

  });



}


//ADDING INPUT TO TABLE

function addRecord(item) {
  var tr = document.createElement("tr");
  inventories.appendChild(tr);
    cell1 = tr.insertCell(0);
    cell1.appendChild(document.createTextNode(product.value));
    cell2 = tr.insertCell(1);
    cell2.appendChild(document.createTextNode(pricePerQty.value));
    cell3 = tr.insertCell(2);
    cell3.className = "loop";
    cell3.appendChild(document.createTextNode(quantity.value));
    cell4 = tr.insertCell(3);
    cell4.appendChild(document.createTextNode(`${quantity.value * pricePerQty.value}`));

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

  let totalForCell3 = Array.from(table.rows).slice(0).reduce((total, row) => {
    return total + parseFloat(row.cells[2].innerHTML);
  }, 0);
  cell3.appendChild(document.createTextNode(totalForCell3));

   let totalForCell4 = Array.from(table.rows).slice(0).reduce((total, row) => {
     return total + parseFloat(row.cells[3].innerHTML);
   }, 0);
    cell4.appendChild(document.createTextNode(totalForCell4));

}

/*
function onClickRemove(deleteButton) {
  let row = deleteButton.parentElement.parentElement;
  row.parentNode.removeChild(row);
  updateSubTotal(); // Call after delete
}
*/
