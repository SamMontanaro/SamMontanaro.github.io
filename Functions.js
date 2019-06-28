window.btnClicked = 0;
let bits = 0;
let clickBitsAmount = 1;

let keyloggerAmount = 0;
let keyloggerPrice = 10;
let phishingSiteAmount = 0;
let phishingSitePrice = 100;

function pageInit() {
	let btn = document.getElementById("btn");
	let clickerBtn = document.getElementById("clickerButton");
	let saveBtn = document.getElementById("saveBtn");
	let loadBtn = document.getElementById("loadBtn");
	
	let keyloggerBtn = document.getElementById("keyloggerBtn");
	let phishingSiteBtn = document.getElementById("phishingSiteBtn");

	btn.addEventListener('click', removeButton);
	clickerBtn.addEventListener('click', function(){updateBits(clickBitsAmount)});
	saveBtn.addEventListener('click', saveGameState);
	loadBtn.addEventListener('click', loadGameState);

	keyloggerBtn.addEventListener('click', function(){buyUpgrade(1)});
	phishingSiteBtn.addEventListener('click', function(){buyUpgrade(2)});
	
	loadGameState();
}

function removeButton() {
	window.btnClicked++;
	if (window.btnClicked == 1)
		document.getElementById("btn").value = "Are you sure?";
	else if (window.btnClicked == 2)
		document.getElementById("btn").value = "Then lets go!"
	else if (window.btnClicked >= 3) {
		createOverlay();
		var elem = document.getElementById("btn");
		elem.parentNode.removeChild(elem);
		delete window.btnClicked;
	}
	return false;
}

function updateBits(amount) {
	bits += amount;
	printBits();
}

function saveGameState() {
	updatePriceChanges();

	localStorage.setItem('bits', bits);
	localStorage.setItem('keyloggerAmount', keyloggerAmount);
	localStorage.setItem('keyloggerPrice', keyloggerPrice);
	localStorage.setItem('phishingSiteAmount', phishingSiteAmount);
	localStorage.setItem('phishingSitePrice', phishingSitePrice);
}

function autoSavePopup() {
	let autosaveArea = document.getElementById("autosaveArea");
	autosaveArea.classList.add("anim");
	setTimeout(function(){
		autosaveArea.classList.remove("anim");
	}, 4000)
}

function loadGameState() {
	if (localStorage.getItem('bits') !== null) {
		bits = parseFloat(localStorage.getItem('bits'));
		printBits();
	}
	if (localStorage.getItem('keyloggerAmount') !== null) {
		keyloggerAmount = parseInt(localStorage.getItem('keyloggerAmount'));
		keyloggerPrice = parseInt(localStorage.getItem('keyloggerPrice'));
		printKeyloggers();
	}
	if (localStorage.getItem('phishingSiteAmount') !== null) {
		phishingSiteAmount = parseInt(localStorage.getItem('phishingSiteAmount'));
		phishingSitePrice = parseInt(localStorage.getItem('phishingSitePrice'));
		printPhishingSites();
	}
}

function buyUpgrade(selector) {
	switch (selector) {
		case 1:
			if (bits >= keyloggerPrice) {
				bits -= keyloggerPrice;
				keyloggerAmount++;
				keyloggerPrice = Math.floor(10 * Math.pow(1.1, keyloggerAmount));
				
				printBits();
				printKeyloggers();
			}
		case 2:
			if (bits >= phishingSitePrice) {
				bits -= phishingSitePrice;
				phishingSiteAmount++;
				phishingSitePrice = Math.floor(100 * Math.pow(1.1, phishingSiteAmount));

				printBits();
				printPhishingSites();
			}
	}
}

function updatePriceChanges() {
	keyloggerPrice = Math.floor(10 * Math.pow(1.1, keyloggerAmount));
	phishingSitePrice = Math.floor(100 * Math.pow(1.1, phishingSiteAmount));
	printKeyloggers();
	printPhishingSites();
}

function printBits() {
	document.getElementById("bitsCounter").innerHTML = "Bits: " + bits.toFixed(1);
}

function printKeyloggers() {
	document.getElementById("keyloggerBtn").innerHTML = "Keyloggers: " + keyloggerAmount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + keyloggerAmount * 0.1 + `<br>` + "Price: " + keyloggerPrice;
}

function printPhishingSites() {
	document.getElementById("phishingSiteBtn").innerHTML = "Phishing Sites: " + phishingSiteAmount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + phishingSiteAmount * 1 + `<br>` + "Price: " + phishingSitePrice;
}

function createOverlay() {
	document.getElementById("animationArea").style.visibility = "visible";
	document.getElementById("upgradeArea").style.visibility = "visible";
}

window.setInterval(function() {
	updateBits(keyloggerAmount * 0.1);
	updateBits(phishingSiteAmount * 1);
}, 1000);

window.setInterval(function() {
	saveGameState();
	autoSavePopup();
}, 60000);