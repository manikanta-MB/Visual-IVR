function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function nextTopArticles(event,categoryName){
    event.preventDefault();
    let csrftoken = getCookie('csrftoken');
    let data = {
        "categoryName":categoryName,
        "nextIndex":$("#nta").attr("value")
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": csrftoken
        },
        mode: 'same-origin',
        body: JSON.stringify(data)
    }
    fetch("/next_top_articles/",options)
    .then(res => res.json())
    .then(res => {
        let articleListEle = document.getElementById("article-list")
        articleListEle.innerHTML = ""
        let index = 0
        for(let article of res["data"]){
            index += 1
            let divEle = document.createElement("div")
            let anchorEle = document.createElement("a")
            anchorEle.setAttribute("id","item"+index)
            anchorEle.setAttribute("href",article["contentPath"])
            anchorEle.innerHTML = article["name"]
            divEle.append(anchorEle)
            articleListEle.append(divEle)
        }
        if(res["nextIndex"]){
            $("#nta").attr("value",res["nextIndex"])
        }
        else{
            $("#nta").remove()
        }
    })
    .catch(console.log)
}

function goBack(event){
    event.preventDefault();
    history.back();
}