const btnCreateCustomer = document.getElementById("btn-create-customer");
const formCustomer = document.getElementById("form-customer");
const imgCustomers = document.getElementById("imgCustomer");
const closeFormButton = document.getElementById("close-form-customer");
const saveButton = document.getElementById("save-customer");
const customersTable = document.getElementById("customerTable");
const customerInfoTable = document.getElementById("customerInfoTable");
const containerCustomersTable = document.getElementById("containerCustomerTable");
const searchInput = document.getElementById("searchCustomer");
const errorCreateCustomer = document.getElementById("errorNameCustomer");

const inputFields = {
  nameCustomer: document.getElementById("nameCustomer"),
  surnameCustomer: document.getElementById("surnameCustomer"),
  emailCustomer: document.getElementById("emailCustomer"),
  numberCustomer: document.getElementById("numberCustomer"),
  businessCustomer: document.getElementById("businessCustomer"),
  annotationCustomer: document.getElementById("annotationCustomer"),
};

let totalCustomers = 0;
let customers = JSON.parse(localStorage.getItem("customers")) || [];

function toggleFormCustomer() {
  formCustomer.classList.toggle("hidden");
}

function resetFormCustomer() {
  Object.values(inputFields).forEach((field) => {
    field.value = "";
  });
}

function saveCustomer(event) {
  event.preventDefault();

  const name = inputFields.nameCustomer.value;

  if (!name) {
    errorCreateCustomer.innerText = "Por favor ingrese el nombre del customer";
    errorCreateCustomer.style.display = "block";
    return;
  }

  errorCreateCustomer.style.display = "none";

  const customer = {
    name: name,
    surname: inputFields.surnameCustomer.value,
    email: inputFields.emailCustomer.value,
    phone: inputFields.numberCustomer.value,
    business: inputFields.businessCustomer.value,
    annotation: inputFields.annotationCustomer.value,
  };

  customers.push(customer);
  localStorage.setItem("customers", JSON.stringify(customers));

  addRowToTableCustomer(customer);

  toggleFormCustomer();

  totalCustomers++;
  localStorage.setItem("totalCustomers", totalCustomers);

  if (totalCustomers > 0) {
    imgCustomers.style.display = "none";
    customerInfoTable.style.display = "block";
    containerCustomersTable.style.display = "block";
  }
}

function populateCompanies() {
  const companies = JSON.parse(localStorage.getItem("companies")) || [];

  companies.forEach((company) => {
    const option = document.createElement("option");
    option.text = company.nameCompany;
    option.value = company.nameCompany;
    inputFields.businessCustomer.add(option);
  });
}

function addRowToTableCustomer(customer) {
  const newRowCustomer = document.createElement("tr");
  newRowCustomer.classList.add("bg-white", "border-b");

  const properties = ["name", "business", "email", "phone", "annotation"];

  properties.forEach((property) => {
    const cell = document.createElement("td");
    cell.classList.add("px-6", "py-4");

    if (property === "name") {
      cell.innerText = customer.name + " " + customer.surname;
    } else {
      cell.innerText = customer[property];
    }

    newRowCustomer.appendChild(cell);
});

const iconCell = createIconCell();
newRowCustomer.appendChild(iconCell);
customersTable.appendChild(newRowCustomer);
}

function createIconCell() {
const iconCell = document.createElement("td");
iconCell.classList.add("px-6", "py-4", "text-end");

const editIcon = createIcon("edit", "edit");
const deleteIcon = createIcon("solid", "trash-alt");

editIcon.addEventListener("click", (event) => {
  editCustomer(event);
});

deleteIcon.addEventListener("click", (event) => {
  deleteCustomer(event);
});

iconCell.appendChild(editIcon);
iconCell.appendChild(deleteIcon);

return iconCell;
}

function createIcon(type, name) {
const icon = document.createElement("box-icon");
icon.setAttribute("type", type);
icon.setAttribute("name", name);
icon.classList.add("custom-icon");

return icon;
}

btnCreateCustomer.addEventListener("click", () => {
toggleFormCustomer();
resetFormCustomer();
});

closeFormButton.addEventListener("click", toggleFormCustomer);
saveButton.addEventListener("click", saveCustomer);

populateCompanies();

if (customers.length > 0) {
customers.forEach((customer) => {
  addRowToTableCustomer(customer);
});

imgCustomers.style.display = "none";
customerInfoTable.style.display = "block";
containerCustomersTable.style.display = "block";
}

function editCustomer(event) {
window.scrollTo(0, 0);
const row = event.target.parentElement.parentElement;

const [name, surname] = row.children[0].textContent.split(" ");
const business = row.children[1].textContent;
const email = row.children[2].textContent;
const phone = row.children[3].textContent;
const annotation = row.children[4].textContent;

formCustomer.classList.remove("hidden");

inputFields.nameCustomer.value = name;
inputFields.surnameCustomer.value = surname;
inputFields.emailCustomer.value = email;
inputFields.numberCustomer.value = phone;
inputFields.businessCustomer.value = business;
inputFields.annotationCustomer.value = annotation;

saveButton.classList.add("hidden");

const existingUpdateButton = document.getElementById("update-customer");
if (existingUpdateButton) {
  existingUpdateButton.remove();
}

const updateButton = document.createElement("button");
updateButton.innerText = "Actualizar";
updateButton.setAttribute("id", "update-customer");
updateButton.classList.add("custom-button");
formCustomer.appendChild(updateButton);

updateButton.addEventListener("click", (event) => updateCustomer(event, row));

function updateCustomer(event, row) {
  event.preventDefault();

  const updatedCustomer = {
	name: inputFields.nameCustomer.value,
	surname: inputFields.surnameCustomer.value,
	email: inputFields.emailCustomer.value,
	phone: inputFields.numberCustomer.value,
	business: inputFields.businessCustomer.value,
	annotation: inputFields.annotationCustomer.value,
  };

  row.children[0].textContent = updatedCustomer.name + " " + updatedCustomer.surname;
  row.children[1].textContent = updatedCustomer.business;
  row.children[2].textContent = updatedCustomer.email;
  row.children[3].textContent = updatedCustomer.phone;
  row.children[4].textContent = updatedCustomer.annotation;

  const index = customers.findIndex(
	(customer) => customer.name + " " + customer.surname === row.children[0].textContent
  );
  customers[index] = updatedCustomer;

  localStorage.setItem("customers", JSON.stringify(customers));

  formCustomer.classList.add("hidden");
  updateButton.remove();
  saveButton.classList.remove("hidden");
}
}

function deleteCustomer(event) {
  event.preventDefault();

  const parentRow = event.target.parentNode.parentNode;
  const name = parentRow.querySelector("td:first-child").textContent;

  parentRow.remove();

  const index = customers.findIndex(
    (customer) => customer.name + " " + customer.surname === name
  );
  customers.splice(index, 1);

  localStorage.setItem("customers", JSON.stringify(customers));

  totalCustomers--;
  totalCustomers = Math.max(totalCustomers, 0);
  localStorage.setItem("totalCustomers", totalCustomers);

  if (totalCustomers === 0) {
    imgCustomers.style.display = "block";
    customerInfoTable.style.display = "none";
    containerCustomersTable.style.display = "none";
  }
}

searchInput.addEventListener("keyup", searchCustomers);

function searchCustomers() {
const searchValue = searchInput.value.toLowerCase();
const table = document.getElementById("customersTable");
const rows = table.querySelectorAll("tr");

rows.forEach((row) => {
  const name = row.querySelector("td:first-child");
  if (name) {
	const nameValue = name.textContent || name.innerText;
	row.style.display = nameValue.toLowerCase().includes(searchValue) ? "" : "none";
  }
});
}
