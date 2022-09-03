//catagoried loaded
const catagoriesLoaded = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => categories(data.data.news_category))
    .catch((error) => console.log(error));
};
const categories = (datas) => {
  const categoryLinkContainer = document.getElementById("categories-links");
  datas.forEach((data) => {
    const categoryId = data.category_id;
    const categoryName = data.category_name;
    const li = document.createElement("li");
    li.innerHTML = `
            <a class="nav-link myred-textcolor text-primary fs-5" href="#" onclick="createNewsId(${categoryId})">${categoryName}</a>
        `;
    categoryLinkContainer.appendChild(li);
  });
};
catagoriesLoaded();

/*------------------------------------
 all news section 
 -------------------------------------*/
const createNewsId = (id) => {
  // loding spinner
  spinnerLading(true);
  const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => news(data.data))
    .catch((error) => console.log(error));
};
const news = (datas) => {


  // sorting total view
  const sortTotalView = (a, b) => {
    return b.total_view - a.total_view;
  };
  datas.sort(sortTotalView);

  // founding news results count
  const foundItems = document.getElementById("foundItems");
  if (datas.length === 0) {
    foundItems.innerText = "no news found";
  } else {
    foundItems.innerText = `${datas.length} news found `;
  }

  // adding results inside card
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = ``;
  datas.forEach((data) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
              <div class="bg-dark text-white card h-100 hover-card rounded mydark-bgcolor mylight-textcolor">
                <img src="${data.image_url}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${data.title}</h5>
                  <p class="card-text card-fontsize">${data.details.slice(
      0,
      150
    )}...</p>
                  <div class="row">
                  <div class="d-flex align-items-center justify-content-evenly col-12 mb-2 ">
                  <img src="${data.author.img
      }" class = "img-fluid rounded rounded-pill w-25 red-borderimg mb-2" alt=".." />
                  <div>
                      <p class = "myred-color">${data.author.name ? data.author.name : "no name found"
      }</p>
                      <p>${data.author.published_date
        ? data.author.published_date
        : "no date found"
      }</p>
                  </div>
                  </div>
                  <div class="col-6 text-center">
                      <p><i class="fa-solid fa-eye"></i> <span>${data.total_view ? data.total_view : "no view found"
      }<span><p></p>
                  </div>
                  <div class="col-6 text-center">
                      <button type="button" class="btn btn-primary mylight-textcolor" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                       onclick="createDetailsById('${data._id
      }')">Details</button>
                  </div>
              </div>
                  `;
    cardContainer.appendChild(div);
  });
  /* --------------------------
sorting data
--------------------------- */
  const sortingContainer = document.getElementById("sorting-container");
  sortingContainer.innerHTML = `
        <div>
           <div class="d-flex">
                <strong>Sort By View :</strong>
                <div class="dropdown">
                  <button
                    class="mydark-bgcolor mylight-textcolor rounded px-1 ms-2 dropdown-toggle"
                    type="button"
                    disabled
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Default
                  </button>
                  <ul class="dropdown-menu"></ul>
                </div>
              </div>
            </div>
        `;
  // spinner loading end
  spinnerLading(false);
};






/* ------------------------------------
  create details by id and open details
-------------------------------------- */
const createDetailsById = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => openDetails(data.data[0]))
    .catch((error) => console.log(error));
};

const openDetails = (data) => {
  const title = document.getElementById("staticBackdropLabel");
  const body = document.getElementById("modal-body");
  title.innerHTML = `
  <h5 class = "myred-color">
      Author Name : ${data.author.name ? data.author.name : "no name found"}  
  </h5>
  <p> 
      Publish Date : ${data.author.published_date
      ? data.author.published_date
      : "no date found"
    }
  </p>
  <div class = "text-center">
  <img src="${data.author.img ? data.author.img : "img not found"
    }" class="img-fluid w-25 rounded-pill mb-2" alt="">
  <p class="myred-color">Total View : ${data.total_view ? data.total_view : "no view found"
    }</p>
  </div>
  `;
  body.innerHTML = `
  <h6 class = "text-center border-bottom pb-2">Post Details</h6>
  <p>
    ${data.details ? data.details : "details not found"}
  </p>  
  `;
};
/* ---------------------------
loading spinner
-------------------------------*/
const spinnerLading = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
createDetailsById()

createNewsId(8);