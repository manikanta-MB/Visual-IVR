function doCorrespondingActivity(pressedKey) {
  const ele = document.getElementById(`item${pressedKey}`);
  if (ele) {
    if (ele == document.activeElement) {
      ele.click();
    } else {
      ele.focus();
    }
  }
}
function handleKeyDownEvent(event) {
  // document.getElementById("key").innerHTML = event.key;
  switch (event.key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      doCorrespondingActivity(event.key);
      break;
    default:
      break;
  }
  console.log("pressed ", event.key);
}

window.addEventListener("keydown", handleKeyDownEvent);

window.addEventListener("load", (e) => {
  document.getElementById("options-heading").focus();
});
