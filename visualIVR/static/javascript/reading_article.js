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
    case "Backspace":
      window.history.back();
      event.preventDefault();
      break;
    default:
      break;
  }
}

window.addEventListener("keydown", keyDownHandler);

window.addEventListener("load", function (event) {
  // alert(screen.width + " " + screen.height);
  if (this.screen.width == 240 && this.screen.height == 320) {
    let ele = this.document.getElementById("article-description");
    ele.style.display = "block";
    ele.focus();
  } else {
    let ele = this.document.getElementById("article-heading");
    ele.style.display = "block";
    ele.focus();
  }
});
