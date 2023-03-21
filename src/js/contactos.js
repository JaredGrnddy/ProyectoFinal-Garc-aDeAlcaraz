const btnCreateContact = document.getElementById("btn-create-contact");
const formContact = document.getElementById("form-contact");
const imgContacts = document.getElementById("imgContacts");
const closeFormButton = document.getElementById("close-form");
const saveButton = document.getElementById("save-contact");
const contactsTable = document.getElementById("contactsTable");
const contactInfoTable = document.getElementById("contactInfoTable");
const containerContactsTable = document.getElementById("containerContactsTable");
const searchInput = document.getElementById("searchContact");
const errorCreateContact = document.getElementById("errorNameContact");

const inputFields = {
  nameContact: document.getElementById("nameContact"),
  surnameContact: document.getElementById("surnameContact"),
  emailContact: document.getElementById("emailContact"),
  phoneContact: document.getElementById("phoneContact"),
  businessContact: document.getElementById("businessContact"),
  annotationContact: document.getElementById("annotationContact"),
};

let totalContacts = 0;
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function toggleForm() {
  formContact.classList.toggle("hidden");
}

function resetForm() {
  Object.values(inputFields).forEach((field) => {
    field.value = "";
  });
}

function saveContact(event) {
  event.preventDefault();

  const name = inputFields.nameContact.value;

  if (!name) {
    errorCreateContact.innerText = "Por favor ingrese el nombre del contacto";
    errorCreateContact.style.display = "block";
    return;
  }

  errorCreateContact.style.display = "none";

  const contact = {
    name: name,
    surname: inputFields.surnameContact.value,
    email: inputFields.emailContact.value,
    phone: inputFields.phoneContact.value,
    business: inputFields.businessContact.value,
    annotation: inputFields.annotationContact.value,
  };

  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));

  addRowToTable(contact);

  toggleForm();

  totalContacts++;
  localStorage.setItem("totalContacts", totalContacts);

  if (totalContacts > 0) {
    imgContacts.style.display = "none";
    contactInfoTable.style.display = "block";
    containerContactsTable.style.display = "block";
  }
}

function populateCompanies() {
  const companies = JSON.parse(localStorage.getItem("companies")) || [];

  companies.forEach((company) => {
    const option = document.createElement("option");
    option.text = company.nameCompany;
    option.value = company.nameCompany;
    inputFields.businessContact.add(option);
  });
}

function addRowToTable(contact) {
  const newRow = document.createElement("tr");
  newRow.classList.add("bg-white", "border-b");

  const properties = ["name", "business", "email", "phone", "annotation"];

  properties.forEach((property) => {
    const cell = document.createElement("td");
    cell.classList.add("px-6", "py-4");

    if (property === "name") {
      cell.innerText = contact.name + " " + contact.surname;
    } else {
      cell.innerText = contact[property];
    }

    newRow.appendChild(cell);
  });

  const iconCell = createIconCell();
  newRow.appendChild(iconCell);
  contactsTable.appendChild(newRow);
}

function createIconCell() {
  const iconCell = document.createElement("td");
  iconCell.classList.add("px-6", "py-4", "text-end");

  const editIcon = createIcon("edit", "edit");
  const deleteIcon = createIcon("solid", "trash-alt");

  editIcon.addEventListener("click", (event) => {
    editContact(event);
  });

  deleteIcon.addEventListener("click", (event) => {
    deleteContact(event);
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

btnCreateContact.addEventListener("click", () => {
  toggleForm();
  resetForm();
});

closeFormButton.addEventListener("click", toggleForm);
saveButton.addEventListener("click", saveContact);

populateCompanies();

if (contacts.length > 0) {
  contacts.forEach((contact) => {
    addRowToTable(contact);
  });

  imgContacts.style.display = "none";
  contactInfoTable.style.display = "block";
  containerContactsTable.style.display = "block";
}

function editContact(event) {
	window.scrollTo(0, 0);
	const row = event.target.parentElement.parentElement;
  
	const [name, surname] = row.children[0].textContent.split(" ");
	const business = row.children[1].textContent;
	const email = row.children[2].textContent;
	const phone = row.children[3].textContent;
	const annotation = row.children[4].textContent;
  
	formContact.classList.remove("hidden");
  
	inputFields.nameContact.value = name;
	inputFields.surnameContact.value = surname;
	inputFields.emailContact.value = email;
	inputFields.phoneContact.value = phone;
	inputFields.businessContact.value = business;
	inputFields.annotationContact.value = annotation;
  
	saveButton.classList.add("hidden");
  
	const existingUpdateButton = document.getElementById("update-contact");
	if (existingUpdateButton) {
	  existingUpdateButton.remove();
	}
  
	const updateButton = document.createElement("button");
	updateButton.innerText = "Actualizar";
	updateButton.setAttribute("id", "update-contact");
	updateButton.classList.add("custom-button");
	formContact.appendChild(updateButton);
  
	updateButton.addEventListener("click", (event) => updateContact(event, row));
  
	function updateContact(event, row) {
	  event.preventDefault();
  
	  const updatedContact = {
		name: inputFields.nameContact.value,
		surname: inputFields.surnameContact.value,
		email: inputFields.emailContact.value,
		phone: inputFields.phoneContact.value,
		business: inputFields.businessContact.value,
		annotation: inputFields.annotationContact.value,
	  };
  
	  row.children[0].textContent = updatedContact.name + " " + updatedContact.surname;
	  row.children[1].textContent = updatedContact.business;
	  row.children[2].textContent = updatedContact.email;
	  row.children[3].textContent = updatedContact.phone;
	  row.children[4].textContent = updatedContact.annotation;
  
	  const index = contacts.findIndex(
		(contact) => contact.name + " " + contact.surname === row.children[0].textContent
	  );
	  contacts[index] = updatedContact;
  
	  localStorage.setItem("contacts", JSON.stringify(contacts));
  
	  formContact.classList.add("hidden");
	  updateButton.remove();
	  saveButton.classList.remove("hidden");
	}
  }

function deleteContact(event) {
  event.preventDefault();

  const parentRow = event.target.parentNode.parentNode;
  const name = parentRow.querySelector("td:first-child").textContent;

  parentRow.remove();

  const index = contacts.findIndex(
    (contact) => contact.name + " " + contact.surname === name
  );
  contacts.splice(index, 1);

  localStorage.setItem("contacts", JSON.stringify(contacts));

  totalContacts--;
  totalContacts = Math.max(totalContacts, 0); // Asegura que totalContacts no sea menor que 0
  localStorage.setItem("totalContacts", totalContacts);

  if (totalContacts === 0) {
    imgContacts.style.display = "block";
    contactInfoTable.style.display = "none";
    containerContactsTable.style.display = "none";
  }
}

searchInput.addEventListener("keyup", searchContacts);

function searchContacts() {
  const searchValue = searchInput.value.toLowerCase();
  const table = document.getElementById("contactsTable");
  const rows = table.querySelectorAll("tr");

  rows.forEach((row) => {
    const name = row.querySelector("td:first-child");
    if (name) {
      const nameValue = name.textContent || name.innerText;
      row.style.display = nameValue.toLowerCase().includes(searchValue) ? "" : "none";
    }
  });
}
