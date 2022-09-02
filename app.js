const newsData = () =>{
    fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(res => res.json())
    .then(data=>displayCategory(data))

}

const displayCategory = (data) =>{
    console.log(data);
    const categoryList=document.getElementById("category-list");
    data.data.news_category.forEach((datas) => {
        const {category_name}=datas
        
        const createDiv=document.createElement("div")
        createDiv.classList.add("cata-list-style")
        createDiv.innerText=`
        ${category_name}
        `
        categoryList.appendChild(createDiv);
    });
}
newsData();