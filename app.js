const newsData = () =>{
    fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(res => res.json())
    .then(data=>displayCategory(data))
    // console.log(data);

}

const displayCategory = (data) =>{
    const categoryList=document.getElementById("category-list");
    data.data.news_category.forEach((datas) => {
        const {category_name,category_id}=datas
        
        const createDiv=document.createElement("div")
        createDiv.classList.add("cata-list-style")
        createDiv.innerHTML=`
        <p onclick="getNews('${category_id}')" >${category_name}</p>
        `
        categoryList.appendChild(createDiv);
    });
}


const getNews = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then(res => res.json())
    .then(data=>displayNews(data.data))

}
const displayNews = (data) =>{
    const newsPost = document.getElementById("news-detail");
    data.forEach((datas) => {

        const createDiv=document.createElement("div")
        createDiv.innerHTML=`
        <div class="card mb-3" >
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${datas.image_url ? datas.image_url:"N/A" }" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h3 class="card-text">${datas.title}</h3>
                    <div class="d-flex p-2">
                    <img src="img/Avatar.png" alt="" class="mx-3">
                    <p>${datas.author.name}</p>
                    </div>
                    <p class="card-text text-center"><small class="text-muted"> ${datas.total_view}view</small></p>
                </div>
                </div>
            </div>
            </div>
        `
        newsPost.appendChild(createDiv);

        
    });
   
}
newsData();
getNews()