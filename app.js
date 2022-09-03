const newsData = () =>{
    fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(res => res.json())
    .then(data=>displayCategory(data))
    // console.log(data);

}

const displayCategory = (data) =>{
    document.getElementById("spiner").style.display="block"
    const categoryList=document.getElementById("category-list");
    data.data.news_category.forEach((datas) => {
        const {category_name,category_id}=datas
        
        const createDiv=document.createElement("div")
        createDiv.classList.add("cata-list-style")
        createDiv.innerHTML=`
        <p onclick="getNews('${category_id}')" class="btn btn-light">${category_name}</p>
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
    newsPost.innerHTML=""
    data.forEach((datas) => {
        const createDiv=document.createElement("div")
        createDiv.innerHTML=`
        <div class="card mb-3" >
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${datas.image_url ? datas.image_url:"N/A" }" class="img-fluid rounded-start" style="height:100%" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-text">${datas.title}</h5>
                    <p>${datas.details.slice(0,200)}</p>
                    <div class="d-flex p-2">
                    <img src="img/Avatar.png" alt="" class="mx-3">
                    <p>${datas.author.name}</p>
                    </div>
                    <p class="card-text text-center"><small class="text-muted"> ${datas.total_view}view</small></p>
                    <button type="button" onclick="catagoryNews('${datas._id}')"   class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Detail post
                    </button>
                    </div>
                </div>
            </div>
        </div>
        `
        newsPost.appendChild(createDiv); 
    });
}
const catagoryNews = (id) =>{
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res=>res.json())
    .then(data=>newsModal(data.data))
} 

const newsModal = (data) =>{
    console.log(data);
    const setModal = document.getElementById("set-modal");
    setModal.innerHTML=""
    data.forEach((datas) => {
        const createDiv=document.createElement("div")
        createDiv.innerHTML=`
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${datas.title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <img src="${datas.thumbnail_url}" style="width:80%" alt="">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
    
        `
        setModal.appendChild(createDiv); 
    });
}



catagoryNews()
newsData();
getNews()