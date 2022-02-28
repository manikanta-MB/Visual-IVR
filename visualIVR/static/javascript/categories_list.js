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
            let button = document.createElement("button")
            button.setAttribute("id","item"+index)
            button.setAttribute("onclick","window.location='/articles/"+category["name"]+"'")
            button.innerHTML = category["name"]
            categoryListEle.append(button)
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

function handleKeyEvent(event){
    switch(event.key){
        case "1":
            $("#item1").click()
            break;
        case "2":
            $("#item2").click()
            break;
        case "3":
            $("#item3").click()
            break;
        case "4":
            $("#item4").click()
            break;
        case "5":
            $("#ntc").click()
            break;
        case "9":
            $("#prev-menu").click()
            break;
        default:
            break;
    }
}

window.addEventListener('keydown',handleKeyEvent)