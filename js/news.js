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
        <a  href="#">${catagori.category_name}</a>
        `
        catagoriesContainer.appendChild(catagoriesDiv)
    });

};
catagoriesLoaded()

