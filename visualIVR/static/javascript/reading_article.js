window.addEventListener("load", (e) => {
  document.getElementById("article-description").focus();
});

function keyDownHandler(event) {
  switch (event.key) {
    case "1":
      document.getElementById("article-content").focus();
      break;
    case "2":
      document.getElementById("empty-content").focus();
      break;
    default:
      break;
  }
}

window.addEventListener("keydown", keyDownHandler);
