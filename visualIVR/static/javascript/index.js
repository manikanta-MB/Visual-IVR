function nav(direction) {
  const currentIndex = Number(document.activeElement.tabIndex);
  const numberOfButtons = document.querySelectorAll("button").length;
  console.log("no of buttons" + numberOfButtons);
  if (direction == "down") {
    const ele = document.querySelector(`[tabindex='${currentIndex + 1}']`);
    if (ele) {
      ele.focus();
    } else {
      document.querySelector("[tabindex='0']").focus();
    }
  } else if (direction == "up") {
    const ele = document.querySelector(`[tabindex='${currentIndex - 1}']`);
    if (ele) {
      ele.focus();
    } else {
      document.querySelector(`[tabindex='${numberOfButtons}']`).focus();
    }
  }
}

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
    case "ArrowUp":
      nav("up");
      break;
    case "ArrowDown":
      nav("down");
      break;
    case "Enter":
      document.activeElement.click();
      break;
    case "Backspace":
      window.history.back();
      if (window.location.pathname != "/home/") {
        event.preventDefault();
      }
      break;
    default:
      break;
  }
  console.log("pressed ", event.key);
}

window.addEventListener("keydown", handleKeyDownEvent);

document.querySelector(".panel-heading").focus();

console.log(window.location.pathname);
