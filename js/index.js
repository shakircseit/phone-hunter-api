const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phoneContainer=document.getElementById('phone-container');

  // clear phone Container before adding carts
  phoneContainer.innerText='';
  // display show all button if phone is greater than  10
  const showAllButton=document.getElementById('show-all-container');
  if(phones.length>12){
   showAllButton.classList.remove('hidden');
  }
  else{
    showAllButton.classList.add('hidden');
  }

  // display only first 10 phones
   phones=phones.slice(0,10);
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
      <button class="btn btn-primary w-full">Buy Now</button>
     </div>
   </div>    

    `;
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};
// handle Search Button
const searchButton=()=>{
  toggleLoadingSpinner(true);
  const searchField=document.getElementById('input-search');
  const searchText=searchField.value;
  console.log(searchText);
  loadPhone(searchText);
}
// loadPhone();
const toggleLoadingSpinner=(isloading)=>{
  const loadingSpinner=document.getElementById('spinner');
  if(isloading){
    loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}
