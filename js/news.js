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