let bits = 0;
let clickBitsAmount = 1;

let keyloggerAmount = 0;
let keyloggerPrice = 10;
let phishingSiteAmount = 0;
let phishingSitePrice = 100;
let botnetAmount = 0;
let botnetPrice = 1000;
let superComputerAmount = 0;
let superComputerPrice = 10000;

function pageInit() {
	let closeBtn = document.getElementById("closeBtn");
	let clickerBtn = document.getElementById("clickerButton");
	let saveBtn = document.getElementById("saveBtn");
	let loadBtn = document.getElementById("loadBtn");
	
	let keyloggerBtn = document.getElementById("keyloggerBtn");
	let phishingSiteBtn = document.getElementById("phishingSiteBtn");
	let botnetBtn = document.getElementById("botnetBtn");
	let superComputerBtn = document.getElementById("superComputerBtn");

	closeBtn.addEventListener('click', closeModal);
	clickerBtn.addEventListener('click', function(){updateBits(clickBitsAmount)});
	saveBtn.addEventListener('click', saveGameState);
	loadBtn.addEventListener('click', loadGameState);

	keyloggerBtn.addEventListener('click', function(){buyUpgrade(1)});
	phishingSiteBtn.addEventListener('click', function(){buyUpgrade(2)});
	botnetBtn.addEventListener('click', function(){buyUpgrade(3)});
	superComputerBtn.addEventListener('click', function(){buyUpgrade(4)});
	
	loadGameState();
}

window.onclick = function(event) {
	if (event.target == updateLogModal) {
		updateLogModal.style.display = "none";
	}
}

function closeModal() {
	document.getElementById("updateLogModal").style.display = "none";
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
	localStorage.setItem('botnetAmount', botnetAmount);
	localStorage.setItem('botnetPrice', botnetPrice);
	localStorage.setItem('superComputerAmount', superComputerAmount);
	localStorage.setItem('superComputerPrice', superComputerPrice);
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
	if (localStorage.getItem('botnetAmount') !== null) {
		botnetAmount = parseInt(localStorage.getItem('botnetAmount'));
		botnetPrice = parseInt(localStorage.getItem('botnetPrice'));
		printBotnets();
	}
	if (localStorage.getItem('superComputerAmount') !== null) {
		superComputerAmount = parseInt(localStorage.getItem('superComputerAmount'));
		superComputerPrice = parseInt(localStorage.getItem('superComputerPrice'));
		printSuperComputers();
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
				break;
			}
		case 2:
			if (bits >= phishingSitePrice) {
				bits -= phishingSitePrice;
				phishingSiteAmount++;
				phishingSitePrice = Math.floor(100 * Math.pow(1.15, phishingSiteAmount));

				printBits();
				printPhishingSites();
				break;
			}
		case 3:
			if (bits >= botnetPrice) {
				bits -= botnetPrice;
				botnetAmount++;
				botnetPrice = Math.floor(1000 * Math.pow(1.2, botnetAmount));

				printBits();
				printBotnets();
				break;
			}
		case 4:
			if (bits >= superComputerPrice) {
				bits -= superComputerPrice;
				superComputerAmount++;
				superComputerPrice = Math.floor(10000 * Math.pow(1.25, superComputerAmount));

				printBits();
				printSuperComputers();
				break;
			}
	}
}

function updatePriceChanges() {
	keyloggerPrice = Math.floor(10 * Math.pow(1.1, keyloggerAmount));
	phishingSitePrice = Math.floor(100 * Math.pow(1.15, phishingSiteAmount));
	botnetPrice = Math.floor(1000 * Math.pow(1.2, botnetAmount));
	superComputerPrice = Math.floor(10000 * Math.pow(1.25, superComputerAmount));

	printKeyloggers();
	printPhishingSites();
	printBotnets();
	printSuperComputers();
}

function printBits() {
	justifyCounter();
	document.getElementById("bitsCounter").innerHTML = "Bits: " + bits.toFixed(1);
}

function justifyCounter() {
	if (bits > 100)
		document.getElementById("bitsCounter").style.left = "9%";
	if (bits > 1000)
		document.getElementById("bitsCounter").style.left = "10%";
	if (bits > 10000) {
		document.getElementById("bitsCounter").style.left = "11%";
		justifyCounter = function(){};
	}
}

function printKeyloggers() {
	document.getElementById("keyloggerBtn").innerHTML = "Keyloggers: " + keyloggerAmount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + (keyloggerAmount * 0.1).toFixed(1) + `<br>` + "Price: " + keyloggerPrice;
}

function printPhishingSites() {
	document.getElementById("phishingSiteBtn").innerHTML = "Phishing Sites: " + phishingSiteAmount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + (phishingSiteAmount * 1).toFixed(1) + `<br>` + "Price: " + phishingSitePrice;
}

function printBotnets() {
	document.getElementById("botnetBtn").innerHTML = "Botnets: " + botnetAmount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + (botnetAmount * 10).toFixed(1) + `<br>` + "Price: " + botnetPrice;
}

function printSuperComputers() {
	document.getElementById("superComputerBtn").innerHTML = "Super Computers: " + superComputerAmount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + (superComputerAmount * 100).toFixed(1) + `<br>` + "Price: " + superComputerPrice;
}

window.setInterval(function() {
	updateBits(keyloggerAmount * 0.1);
	updateBits(phishingSiteAmount * 1);
	updateBits(botnetAmount * 10);
	updateBits(superComputerAmount * 100);
}, 1000);

window.setInterval(function() {
	saveGameState();
	autoSavePopup();
}, 60000);