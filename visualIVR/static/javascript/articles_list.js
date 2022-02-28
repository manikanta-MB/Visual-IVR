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
            let button = document.createElement("button")
            button.setAttribute("id","item"+index)
            button.setAttribute("onclick","readNews(event,'"+article["contentPath"]+"')")
            button.innerHTML = article["name"]
            articleListEle.append(button)
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

function readNews(event,fileName){
    event.preventDefault();
    let csrftoken = getCookie('csrftoken');
    let data = {
        "filename":fileName
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
    fetch("/generate_tts/",options)
    .then(res => res.json())
    .then(res => {
        if(res["success"]){
            let containerEle = document.querySelector('.container')
            let audioEle = document.createElement("audio")
            audioEle.setAttribute("controls",true)
            audioEle.setAttribute("autoplay",true)
            let sourceEle = document.createElement("source")
            sourceEle.setAttribute("src","/static/Audio News/"+fileName.slice(0,-4)+".mp3")
            sourceEle.setAttribute("type","audio/mpeg")
            audioEle.append(sourceEle)
            containerEle.append(audioEle)
        }
    })
    .catch(console.log)
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
            $("#nta").click()
            break;
        case "7":
            let audioEle = document.querySelector("audio")
            if(audioEle.paused){
                audioEle.play()
            }
            else{
                audioEle.pause()
            }
            break;
        case "9":
            $("#prev-menu").click()
            break;
        case "*":
            break;
        case "#":
            break;
        default:
            break;
    }
}

window.addEventListener('keydown',handleKeyEvent)
