const loadPhone = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");

  // clear phone Container before adding carts
  phoneContainer.innerText = "";
  // display show all button if phone is greater than  10
  const showAllButton = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }
  // console.log("Is Show All", isShowAll);
  // display only first 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-grey-100 shadow-md`;
    phoneCard.innerHTML = `
    <figure>
    <img
      src="${phone.image}"
      alt="Shoes"
    />
   </figure>
   <div class="card-body">
     <h2 class="card-title">${phone.phone_name}</h2>
     <p>If a dog chews shoes whose shoes does he choose?</p>
     <div class="card-actions justify-end">
      <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary w-full">Show Details</button>
     </div>
   </div>    

    `;
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};
// handle Search Button
const searchButton = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("input-search");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isloading) => {
  const loadingSpinner = document.getElementById("spinner");
  if (isloading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
// const Show Details
const handleShowDetail = async (id) => {
  // console.log("click details", id);
  // load individual phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showphoneDetails(phone);
};

// show Phone Details
const showphoneDetails = (phone) => {
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
    <img class="mt-4 text-center w-1/3 mx-auto" src="${phone.image}" alt="" />
    <p class="text-center mt-1"><span class="text-lg font-semibold">Storage:</span>${phone.mainFeatures?.storage} </p>
    <p class="text-center  mt-1"><span class="text-lg font-semibold">Display:</span>${phone.mainFeatures?.displaySize} </p>
    <p class="text-center  mt-1"><span class="text-lg font-semibold">Memory:</span>${phone.mainFeatures?.memory} </p>
    <p class="text-center  mt-1"><span class="text-lg font-semibold">GPS:</span>${phone?.others?.GPS ||'No GPS'} </p>
   
   `;
  // show The Modal
  show_details_modal.showModal();
};
// handle show all
const handleShowAllPhone = () => {
  searchButton(true);
};
loadPhone();
