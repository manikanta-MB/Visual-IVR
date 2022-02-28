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

// function readNews(event,fileName){
//     event.preventDefault();
//     let csrftoken = getCookie('csrftoken');
//     let data = {
//         "filename":fileName
//     }
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             "X-CSRFToken": csrftoken
//         },
//         mode: 'same-origin',
//         body: JSON.stringify(data)
//     }
//     fetch("/generate_tts/",options)
//     .then(res => res.json())
//     .then(res => {
//         if(res["success"]){
//             let containerEle = document.querySelector('.container')
//             let audioEle = document.createElement("audio")
//             audioEle.setAttribute("controls",true)
//             audioEle.setAttribute("autoplay",true)
//             let sourceEle = document.createElement("source")
//             sourceEle.setAttribute("src","/static/Audio News/"+fileName.slice(0,-4)+".mp3")
//             sourceEle.setAttribute("type","audio/mpeg")
//             audioEle.append(sourceEle)
//             containerEle.append(audioEle)
//         }
//     })
//     .catch(console.log)
// }

function readNews(){
    let ele = document.createElement("div")
    ele.setAttribute("tabindex","-1")
    ele.setAttribute("class","sr-only")
    ele.innerHTML="some random text to read."
    parentEle.innerHTML = ""
    parentEle.append(ele)
    ele.focus();
}

function handleKeyDownEvent(event){
    switch(event.key){
        case "1":
            $("#item1").click();
            break;
        case "2":
            $("#item2").click();
            break;
        case "3":
            $("#item3").click();
            break;
        case "4":
            $("#item4").click();
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
        case "*":
            break;
        case "#":
            break;
        default:
            break;
    }
    console.log("pressed ",event.key);
}

function handleKeyUpEvent(event){
    console.log(document.activeElement.innerHTML);
}

window.addEventListener('keydown',handleKeyDownEvent)
window.addEventListener('keyup',handleKeyUpEvent)

// window.addEventListener('load', e => {
//     let panel = document.querySelector(".panel")
//     let windowHeight = $(window).height()
//     alert(windowHeight);
//     panel.setAttribute("style",`height:${windowHeight}px`)
// });
