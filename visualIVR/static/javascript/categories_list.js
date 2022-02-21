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

function nextTopCategories(event){
    event.preventDefault();
    let csrftoken = getCookie('csrftoken');
    let data = {
        "nextIndex":$("#ntc").attr("value")
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
    fetch("/next_top_categories/",options)
    .then(res => res.json())
    .then(res => {
        let categoryListEle = document.getElementById("category-list")
        categoryListEle.innerHTML = ""
        let index = 0
        for(let category of res["data"]){
            index += 1
            let divEle = document.createElement("div")
            let anchorEle = document.createElement("a")
            anchorEle.setAttribute("id","item"+index)
            anchorEle.setAttribute("href","/articles/"+category["name"])
            anchorEle.innerHTML = category["name"]
            divEle.append(anchorEle)
            categoryListEle.append(divEle)
        }
        if(res["nextIndex"]){
            $("#ntc").attr("value",res["nextIndex"])
        }
        else{
            $("#ntc").remove()
        }
    })
    .catch(console.log)
}

function goBack(event){
    event.preventDefault();
    history.back();
}