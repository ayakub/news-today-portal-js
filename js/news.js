const catagoriesLoaded = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayCatagories(data.data))
}

//loading catagories items
const displayCatagories = catagories => {
    console.log(catagories)
    const catagoriesContainer = document.getElementById('catagories-container');
    catagories.news_category.forEach(catagori => {
        const catagoriesDiv = document.createElement('div');
        catagoriesDiv.classList.add('catagories-item')
        catagoriesDiv.innerHTML = `
        <a id=""  href="#">${catagori.category_name}</a>
        `
        catagoriesContainer.appendChild(catagoriesDiv)
    });

};
//loading news 
const newsLoader = () => {
    fetch(`https://openapi.programming-hero.com/api/news/category/01`)
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
        <div class="row g-0">
        <div class="col-md-4">
          <img src="${item.image_url}" class="img-fluid w-100 rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
                </div>
        `
        displayNewscontainer.appendChild(newsDiv)
    })

}
newsLoader()


catagoriesLoaded()

