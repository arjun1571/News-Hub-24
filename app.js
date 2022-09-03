const newsData = () =>{
    document.getElementById("spiner").style.display="block"
    fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(res => res.json())
    .then(data=>displayCategory(data))
    .catch(error => {
        console.log(error);
    });
    // console.log(data);

}

const displayCategory = (data) =>{
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
    .then(data=>displayNews(data))
    .catch(error => {
        console.log(error);
    });

}
const displayNews = (data) =>{
    
    // item length count 
    const postLen = data.data.length;
    const item=document.getElementById("on-item");
    item.innerText=`${postLen} items found for category Entertainment`

    // news show section 
    const newsPost = document.getElementById("news-detail");
    newsPost.innerHTML=""
    data.data.forEach((datas) => {
        
        document.getElementById("spiner").style.display="none";
        const {title,details,image_url,author,_id,total_view}=datas;
        console.log(details);
        const createDiv=document.createElement("div")
        createDiv.innerHTML=`
        <div class="card mb-3" >
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${image_url ? image_url:"N/A" }" class="img-fluid rounded-start" style="height:100%" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-text">${title}</h5>
                    <p class="text-truncate">${details}</p>
                    <div class="d-flex p-2">
                    <div class="d-flex  align-items-center">
                    <img src="${author.img}" style="height:60px" class="rounded-circle p-2" alt=""  >
                    <p>${author.name}</p></div>
                    </div>
                    
                    <button type="button" onclick="catagoryNews('${_id}')"   class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Detail post
                    </button>
                    <p class="card-text text-center"><small class="text-muted"> <i class="fa-solid fa-eye"></i> ${total_view ? total_view:"N/A"}</small></p>
                    </div>
                </div>
            </div>
        </div>
        `
        newsPost.appendChild(createDiv); 
    });
}
const catagoryNews = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res=>res.json())
    .then(data=>newsModal(data.data))
    .catch(error => {
        console.log(error);
    });
} 

const newsModal = (data) =>{
    const setModal = document.getElementById("set-modal");
    setModal.innerHTML=""
    data.forEach((datas) => {
        const {title,thumbnail_url,details}=datas;
        const createDiv=document.createElement("div")
        createDiv.innerHTML=`

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                    <div class="modal-body">
                    <img class="mx-auto d-block" src="${thumbnail_url}" style="width:80%" alt="">
                    <p>${details}</p>
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
getNews("01")