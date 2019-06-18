var btnClicked = 0;

function removeButton() {
	btnClicked++;
	if (btnClicked == 1)
		document.getElementById("btn").value = "Are you sure?";
	else if (btnClicked == 2)
		document.getElementById("btn").value = "Then lets go!"
	else if (btnClicked >= 3) {
		var elem = document.getElementById("btn");
		elem.parentNode.removeChild(elem);
	}
	return false;
}

function pageInit() {
	var btn = document.getElementById("btn");
	if (btn.addEventListener) {
		btn.addEventListener('click', removeButton, false);
	}
	else if (btn.attachEvent) {
		btn.attachEvent('click', removeButton);
	}
	else {
		btn.onclick = removeDummy;
	}
}
