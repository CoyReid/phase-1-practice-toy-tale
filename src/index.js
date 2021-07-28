//Shows add new toy form, hides when clicked again
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  init();
});

//Initialize function, runs uploadToys and adds event listener for adding personal toys through form
function init() {
  uploadToys();
  const toyForm = document.querySelector(".add-toy-form")
  toyForm.addEventListener("submit", addNewToy)
}

//Uploads toys from json server, passes them to addNewToysToPage
function uploadToys(){
  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then(toys => toys.forEach(toy => addNewToysToPage(toy)))
}

//Creates toy div, adds info from db or submit form to that div, append to page
function addNewToysToPage(toy) {
  const toyDivContainer = document.querySelector("#toy-collection")
  const toyDiv = document.createElement("div");
  toyDiv.className = "card";
  
  const toyName = document.createElement("h2");
  toyName.innerText = toy.name;
  
  const toyImg = document.createElement("img");
  toyImg.src = toy.image;
  toyImg.className = "toy-avatar";
  
  const toyLikes = document.createElement("p");
  toyLikes.innerText = `Likes: ${toy.likes}`;
  
  const toyLikesBtn = document.createElement("button");
  toyLikesBtn.innerText = "Like <3";
  toyLikesBtn.className = "like-btn"
  toyLikesBtn.id = toy.id;
  toyLikesBtn.addEventListener("click", toyLikesBtnEvent)

  toyDiv.append(toyName, toyImg, toyLikes, toyLikesBtn)
  toyDivContainer.append(toyDiv)
}

//Event listener for submit new toy, passes it into addNewToysToPage
function addNewToy (e) {
  e.preventDefault();
  const toyForm = document.querySelector(".add-toy-form")
  const createToyForm = e.target;
  const newToyName = createToyForm.name.value;
  const newToyImage = createToyForm.image.value;
  if (newToyName !== "" && newToyImage !== "") {
    const toy = {
      name: newToyName,
      image: newToyImage,
      likes: 0
    }
    addNewToysToPage(toy);
    toyForm.reset();
  } else {
    alert("Please give a name and image url!")
  }
}

//Event handler for increasing num of likes on each toy card
function toyLikesBtnEvent (e) {
  const likesElement = e.target.previousElementSibling;
  const likesNum = likesElement.textContent.split(" ")
  const newLikesNum = parseInt(likesNum[1]) + 1;
  likesElement.innerText = `Likes: ${newLikesNum}`
}


