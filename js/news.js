const catagoriesLoaded = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res => res.json())
    .then(data => displayCatagories(data.data))
}

//loading catagories items
const displayCatagories = (catagories) => {
  // console.log(catagories)
  const catagoriesContainer = document.getElementById('catagories-container');
  catagories.news_category.forEach(catagori => {
    const catagoriesDiv = document.createElement('div');
    catagoriesDiv.classList.add('catagories-item')
    catagoriesDiv.innerHTML = `
        <a id=""  href="">${catagori.category_name}</a>
        `
    catagoriesContainer.appendChild(catagoriesDiv)
  });

};
//loading news 

const newsLoader = id => {
  fetch(`https://openapi.programming-hero.com/api/news/category/1${id}`)
    .then(res => res.json())
    .then(data => displayNewsLoader(data.data))
}
const displayNewsLoader = items => {
  console.log(items)
  const displayNewscontainer = document.getElementById('news-loader-container');
  items.forEach(item => {
    const newsDiv = document.createElement('div')
    newsDiv.classList.add('row')
    newsDiv.innerHTML = `
        <div class="col-lg-12 news-item">
          <div class="row g-4">
            <div class="col-md-4">
              <img src="${item.image_url}" class="img-fluid w-100 rounded-start" alt="...">
          </div>
         <div class="col-md-8">
           <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.details.length > 300 ? item.details.slice(0, 200) + '...' : item.details}</p>
          </div>
          <div class=" mt-3 col-md-12 d-flex justify-content-between">

            <div class="d-flex col-md-4">
            <img col-md-1 style="width: 60px;" class="rounded-circle" style src="${item.author.img}">
                <div class="ms-3">
                <p>${item.author.name ? item.author.name : 'data no found'}</p>
                <p>${item.author.published_date ? item.author.published_date : 'data no found'}</p>
                </div>
            </div>

            <div class="d-flex">
            <i class="fa-regular fa-eye mt-1"></i>
            <p class="ms-4">${item.total_view ? item.total_view : 'data no found'}</p>
            </div>

            <div>
            <button onclick="loadModal()" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
            </div>
          </div>
        </div>
      </div>
                </div>
        `
    displayNewscontainer.appendChild(newsDiv)
  })

}

const loadModal = id => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`
  fetch(url)
    .then(res => res.json())
    .then(data => modalDetails(data));
}
const modalDetails = data => {
  const modalTitle = document.getElementById('exampleModalLabel');
  const modalBody = document.getElementById('modal-body');
  modalTitle.innerHTML = `
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
  modalBody.innerHTML = `
<h6 class = "text-center border-bottom pb-2">Post Details</h6>
<p>
${data.details ? data.details : "details not found"}
</p>  
  `

}


catagoriesLoaded();
newsLoader()
