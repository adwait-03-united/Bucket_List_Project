// Initial categories array with emoji icons
let categories = [
  { title: "Personal", icon: "👤" },
  { title: "Work", icon: "💼" },
  { title: "Shopping", icon: "🛒" },
];

// Available icons for selection (expanded to 75 icons)
const availableIcons = [
  { value: "👤", label: "Person" },
  { value: "💼", label: "Briefcase" },
  { value: "🛒", label: "Shopping Cart" },
  { value: "📚", label: "Books" },
  { value: "🏋️", label: "Fitness" },
  { value: "🍽️", label: "Food" },
  { value: "✈️", label: "Airplane" },
  { value: "🏖️", label: "Beach" },
  { value: "⛰️", label: "Mountain" },
  { value: "🌍", label: "Globe" },
  { value: "🚗", label: "Car" },
  { value: "🚲", label: "Bicycle" },
  { value: "🎸", label: "Guitar" },
  { value: "🎨", label: "Art" },
  { value: "🎥", label: "Movie" },
  { value: "🎮", label: "Gaming" },
  { value: "📷", label: "Camera" },
  { value: "🎤", label: "Microphone" },
  { value: "🏀", label: "Basketball" },
  { value: "⚽", label: "Soccer" },
  { value: "🏈", label: "Football" },
  { value: "🏊", label: "Swimming" },
  { value: "⛷️", label: "Skiing" },
  { value: "🏄", label: "Surfing" },
  { value: "🌳", label: "Tree" },
  { value: "🌺", label: "Flower" },
  { value: "🐶", label: "Dog" },
  { value: "🐱", label: "Cat" },
  { value: "🐠", label: "Fish" },
  { value: "🐦", label: "Bird" },
  { value: "💻", label: "Laptop" },
  { value: "📱", label: "Smartphone" },
  { value: "⌚", label: "Watch" },
  { value: "🖥️", label: "Computer" },
  { value: "🎧", label: "Headphones" },
  { value: "💡", label: "Light Bulb" },
  { value: "🔧", label: "Tools" },
  { value: "🏠", label: "House" },
  { value: "🏢", label: "Building" },
  { value: "🏡", label: "Home" },
  { value: "🌇", label: "City" },
  { value: "🏞️", label: "Nature" },
  { value: "⭐", label: "Star" },
  { value: "🌙", label: "Moon" },
  { value: "☀️", label: "Sun" },
  { value: "⛅", label: "Cloud" },
  { value: "🌈", label: "Rainbow" },
  { value: "❄️", label: "Snowflake" },
  { value: "⚡", label: "Lightning" },
  { value: "🔥", label: "Fire" },
  { value: "💧", label: "Water" },
  { value: "🍎", label: "Apple" },
  { value: "🍕", label: "Pizza" },
  { value: "🍔", label: "Burger" },
  { value: "🍦", label: "Ice Cream" },
  { value: "☕", label: "Coffee" },
  { value: "🍷", label: "Wine" },
  { value: "🎉", label: "Party" },
  { value: "🎁", label: "Gift" },
  { value: "🎂", label: "Cake" },
  { value: "🎄", label: "Christmas Tree" },
  { value: "🎃", label: "Pumpkin" },
  { value: "💌", label: "Love Letter" },
  { value: "💍", label: "Ring" },
  { value: "💒", label: "Wedding" },
  { value: "👶", label: "Baby" },
  { value: "👨‍👩‍👧", label: "Family" },
  { value: "📅", label: "Calendar" },
  { value: "⏰", label: "Clock" },
  { value: "✍️", label: "Writing" },
  { value: "📝", label: "Notes" },
  { value: "🔍", label: "Search" },
  { value: "🚀", label: "Rocket" },
  { value: "🧩", label: "Puzzle" },
  { value: "🎯", label: "Target" },
];

// Initial lists array
let lists = [
  { id: 1, list: "Go to market", category: "Shopping", completed: false },
  { id: 2, list: "Read a chapter", category: "Personal", completed: false },
  { id: 3, list: "Prepare presentation", category: "Work", completed: false },
];

// Local storage functions
const saveLocal = () => {
  localStorage.setItem("lists", JSON.stringify(lists));
  localStorage.setItem("categories", JSON.stringify(categories));
  localStorage.setItem("heading", document.getElementById("user-name").textContent);
};

const getLocal = () => {
  const listsLocal = JSON.parse(localStorage.getItem("lists"));
  const categoriesLocal = JSON.parse(localStorage.getItem("categories"));
  const headingLocal = localStorage.getItem("heading");
  if (listsLocal) lists = listsLocal;
  if (categoriesLocal) categories = categoriesLocal;
  if (headingLocal) document.getElementById("user-name").textContent = headingLocal;
};

// Toggle screen
const toggleScreen = () => {
  const wrapper = document.querySelector(".wrapper");
  wrapper.classList.toggle("show-category");
  updateTotals();
};

// Update totals (only category lists now)
const updateTotals = () => {
  const categoryLists = lists.filter(
    (list) => list.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );
  document.getElementById("num-lists").innerHTML = `${categoryLists.length} Lists`;
};

// Add new category
const addCategory = (title, icon) => {
  if (!title || !icon) {
    alert("Please provide a title and select an icon!");
    return;
  }
  // Check if category already exists
  if (categories.some((cat) => cat.title.toLowerCase() === title.toLowerCase())) {
    alert("Category already exists!");
    return;
  }

  categories.push({ title, icon });
  saveLocal();
  renderCategories();
  updateCategorySelect();
};

// Delete category
const deleteCategory = (title) => {
  const categoryLists = lists.filter(
    (list) => list.category.toLowerCase() === title.toLowerCase()
  );
  if (categoryLists.length > 0) {
    if (
      !confirm(
        `"${title}" has ${categoryLists.length} lists. Deleting this will remove them. Proceed?`
      )
    ) {
      return;
    }
    lists = lists.filter((list) => list.category.toLowerCase() !== title.toLowerCase());
  }
  categories = categories.filter((category) => category.title.toLowerCase() !== title.toLowerCase());
  saveLocal();
  renderCategories();
  updateCategorySelect();
  if (selectedCategory.title.toLowerCase() === title.toLowerCase()) {
    selectedCategory = categories[0] || { title: "", icon: "👤" };
    renderLists();
  }
};

// Render categories
const renderCategories = () => {
  const categoriesContainer = document.querySelector(".categories");
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    const categoryLists = lists.filter(
      (list) => list.category.toLowerCase() === category.title.toLowerCase()
    );
    const div = document.createElement("div");
    div.classList.add("category");
    div.innerHTML = `
      <div class="left">
        <span class="category-icon">${category.icon}</span>
        <div class="content">
          <h1>${category.title}</h1>
          <p>${categoryLists.length} Lists</p>
        </div>
      </div>
      <div class="options">
        <div class="toggle-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </div>
        <div class="delete-category">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    `;
    div.addEventListener("click", (e) => {
      if (e.target.closest(".delete-category")) {
        deleteCategory(category.title);
      } else {
        selectedCategory = category;
        toggleScreen();
        renderLists();
        updateTotals();
      }
    });
    categoriesContainer.appendChild(div);
  });
};

// Render lists
const renderLists = () => {
  const categoryScreen = document.querySelector(".category-screen");
  const categoryLists = lists.filter(
    (list) => list.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );
  categoryScreen.innerHTML = `
    <div class="head-wrapper">
      <div class="back-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
      </div>
      <div class="options">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
      </div>
    </div>
    <div class="category-details">
      <span class="category-icon">${selectedCategory.icon}</span>
      <div class="details">
        <p id="num-lists">${categoryLists.length} Lists</p>
        <h1 id="category-title">${selectedCategory.title}</h1>
      </div>
    </div>
    <div class="lists-wrapper">
      <div class="lists">
        ${
          categoryLists.length
            ? categoryLists
                .map(
                  (list) => `
          <div class="list-wrapper">
            <label for="${list.id}" class="list">
              <input type="checkbox" name="list" id="${list.id}" ${list.completed ? "checked" : ""}>
              <span class="checkmark">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              <p>${list.list}</p>
            </label>
            <div class="delete" onclick="deleteList(${list.id})">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>
          </div>
        `
                )
                .join("")
            : "<p class='no-lists'>No lists yet</p>"
        }
      </div>
    </div>
  `;

  // Reattach event listener for back button
  document.querySelector(".back-btn").addEventListener("click", toggleScreen);

  // Add event listeners for checkboxes
  categoryLists.forEach((list) => {
    const checkbox = document.getElementById(list.id);
    if (checkbox) {
      checkbox.addEventListener("change", () => {
        list.completed = checkbox.checked;
        saveLocal();
      });
    }
  });
};

// Delete list
const deleteList = (listId) => {
  lists = lists.filter((list) => list.id !== listId);
  saveLocal();
  renderLists();
  updateTotals();
};

// Toggle add options
const toggleAddOptions = () => {
  const addOptions = document.querySelector(".add-options");
  const blackBackdrop = document.querySelector(".black-backdrop");
  addOptions.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
};

// Toggle add list form
const toggleAddListForm = () => {
  const addListForm = document.querySelector(".add-list-form");
  const addOptions = document.querySelector(".add-options");
  addOptions.classList.remove("active");
  addListForm.classList.toggle("active");
};

// Toggle add category form
const toggleAddCategoryForm = () => {
  const addCategoryForm = document.querySelector(".add-category-form");
  const addOptions = document.querySelector(".add-options");
  const blackBackdrop = document.querySelector(".black-backdrop");
  addOptions.classList.remove("active");
  addCategoryForm.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  updateIconSelect(); // Update icon dropdown when opening form
};

// Toggle edit heading modal
const toggleEditHeadingModal = () => {
  const editNameModal = document.querySelector(".edit-name-modal");
  const blackBackdrop = document.querySelector(".black-backdrop");
  editNameModal.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  document.getElementById("edit-name-input").value = document.getElementById("user-name").textContent;
};

// Save new heading
const saveNewHeading = () => {
  const newHeading = document.getElementById("edit-name-input").value.trim();
  if (newHeading) {
    document.getElementById("user-name").textContent = newHeading;
    saveLocal();
    toggleEditHeadingModal();
  } else {
    alert("Please enter a heading!");
  }
};

// Add list
const addList = (e) => {
  e.preventDefault();
  const listText = document.getElementById("list-input").value.trim();
  const category = document.getElementById("category-select").value;

  if (listText === "") {
    alert("Please enter a list item");
    return;
  }

  const newList = {
    id: lists.length + 1,
    list: listText,
    category: categories.find((c) => c.title.toLowerCase() === category).title,
    completed: false,
  };

  lists.push(newList);
  saveLocal();
  toggleAddListForm();
  if (selectedCategory.title.toLowerCase() === newList.category.toLowerCase()) {
    renderLists();
  }
  updateTotals();
  document.getElementById("list-input").value = ""; // Clear input after adding
};

// Add new category from form
const addNewCategory = (e) => {
  e.preventDefault();
  const title = document.getElementById("new-category-title").value.trim();
  const icon = document.getElementById("new-category-icon").value;
  if (title && icon) {
    addCategory(title, icon);
    document.getElementById("new-category-title").value = "";
    toggleAddCategoryForm();
    renderCategories(); // Refresh categories display
  } else {
    alert("Please enter a title and select an icon!");
  }
};

// Update category select dropdown
const updateCategorySelect = () => {
  const categorySelect = document.getElementById("category-select");
  categorySelect.innerHTML = "";
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.title.toLowerCase();
    option.textContent = category.title;
    categorySelect.appendChild(option);
  });
};

// Update icon select dropdown
const updateIconSelect = () => {
  const iconSelect = document.getElementById("new-category-icon");
  iconSelect.innerHTML = "";
  availableIcons.forEach((icon) => {
    const option = document.createElement("option");
    option.value = icon.value;
    option.textContent = `${icon.value} ${icon.label}`;
    iconSelect.appendChild(option);
  });
};

// Initialize
let selectedCategory = categories[0];
document.addEventListener("DOMContentLoaded", () => {
  getLocal();
  renderCategories();
  updateCategorySelect();
  updateTotals();

  // Event listeners
  document.querySelector(".menu-btn").addEventListener("click", toggleScreen);
  document.querySelector(".add-list-btn").addEventListener("click", toggleAddOptions);
  document.querySelector(".black-backdrop").addEventListener("click", () => {
    document.querySelector(".add-options").classList.remove("active");
    document.querySelector(".add-list-form").classList.remove("active");
    document.querySelector(".add-category-form").classList.remove("active");
    document.querySelector(".edit-name-modal").classList.remove("active");
    document.querySelector(".black-backdrop").classList.remove("active");
  });
  document.querySelector(".add-list-option").addEventListener("click", toggleAddListForm);
  document.querySelector(".add-category-option").addEventListener("click", toggleAddCategoryForm);
  document.querySelector(".add-list-form .add-btn").addEventListener("click", addList);
  document.querySelector(".add-list-form .cancel-btn").addEventListener("click", toggleAddListForm);
  document.querySelector(".add-category-form .add-btn").addEventListener("click", addNewCategory);
  document.querySelector(".add-category-form .cancel-btn").addEventListener("click", toggleAddCategoryForm);
  document.querySelector(".edit-name-btn").addEventListener("click", toggleEditHeadingModal);
  document.querySelector(".save-name-btn").addEventListener("click", saveNewHeading);
  document.querySelector(".edit-name-modal .cancel-btn").addEventListener("click", toggleEditHeadingModal);
});