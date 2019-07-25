'use strict';
let bits = 0;
let bitsPerSec = 0;
let bitsPerClick = 1;
let buttonClicked = 0;

let keyloggerAmount = 0;
let keyloggerPrice = 10;
let phishingSiteAmount = 0;
let phishingSitePrice = 100;
let botnetAmount = 0;
let botnetPrice = 1000;
let superComputerAmount = 0;
let superComputerPrice = 10000;

let clickerAchievements = [500, 2500, 5000, 9001];
let clickerUpgradesUnlocked = [false, false, false, false];
let clickerUpgradesBought = [false, false, false, false];
let clickerUpgrades = [];
let keyloggerUpgrades = [];

let largeNums = [1000, 1000000, 1000000000, 1000000000000, 1000000000000000, 1000000000000000000, 1000000000000000000000, 1000000000000000000000000, 1000000000000000000000000000, 1000000000000000000000000000000, 1000000000000000000000000000000000];
let largeNumAbbr = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];

window.onload = function() {
	let closeBtn = document.getElementById("closeBtn");
	let saveBtn = document.getElementById("saveBtn");
	let loadBtn = document.getElementById("loadBtn");
	let resetBtn = document.getElementById("resetBtn");

	let clickerBtn = document.getElementById("clickerButton");
	let keyloggerBtn = document.getElementById("keyloggerBtn");
	let phishingSiteBtn = document.getElementById("phishingSiteBtn");
	let botnetBtn = document.getElementById("botnetBtn");
	let superComputerBtn = document.getElementById("superComputerBtn");

	let CU1 = document.getElementById("clickerUpgrade1");
	let CU2 = document.getElementById("clickerUpgrade2");
	let CU3 = document.getElementById("clickerUpgrade3");
	let CU4 = document.getElementById("clickerUpgrade4");
	clickerUpgrades = [CU1, CU2, CU3, CU4];

	let KU1 = document.getElementById("keyloggerUpgrade1");
	let KU2 = document.getElementById("keyloggerUpgrade2");
	let KU3 = document.getElementById("keyloggerUpgrade3");
	let KU4 = document.getElementById("keyloggerUpgrade4");
	keyloggerUpgrades = [KU1, KU2, KU3, KU4];

	closeBtn.addEventListener('click', closeModal);
	clickerBtn.addEventListener('click', clickerButtonClicked);
	saveBtn.addEventListener('click', saveGameState);
	loadBtn.addEventListener('click', loadGameState);
	resetBtn.addEventListener('click', resetGameState);

	keyloggerBtn.addEventListener('click', function(){buyUpgrade(1)});
	phishingSiteBtn.addEventListener('click', function(){buyUpgrade(2)});
	botnetBtn.addEventListener('click', function(){buyUpgrade(3)});
	superComputerBtn.addEventListener('click', function(){buyUpgrade(4)});
	
	CU1.addEventListener('click', function(){buyUpgrade(5)});
	CU1.addEventListener('mouseenter', function(){document.getElementById("CU1-hoverText").style.display = "block";});
	CU1.addEventListener('mouseout', function(){document.getElementById("CU1-hoverText").style.display = "none";});
	CU2.addEventListener('click', function(){buyUpgrade(6)});
	CU2.addEventListener('mouseenter', function(){document.getElementById("CU2-hoverText").style.display = "block";});
	CU2.addEventListener('mouseout', function(){document.getElementById("CU2-hoverText").style.display = "none";});
	CU3.addEventListener('click', function(){buyUpgrade(7)});
	CU3.addEventListener('mouseenter', function(){document.getElementById("CU3-hoverText").style.display = "block";});
	CU3.addEventListener('mouseout', function(){document.getElementById("CU3-hoverText").style.display = "none";});
	CU4.addEventListener('click', function(){buyUpgrade(8)});
	CU4.addEventListener('mouseenter', function(){document.getElementById("CU4-hoverText").style.display = "block";});
	CU4.addEventListener('mouseout', function(){document.getElementById("CU4-hoverText").style.display = "none";});

	loadGameState();
	updatePriceChanges();
	checkUpgradesAffordability();
	printBits();
}

window.onclick = function(event) {
	if (event.target == updateLogModal) {
		updateLogModal.style.display = "none";
	}
}

function closeModal() {
	document.getElementById("updateLogModal").style.display = "none";
}

function clickerButtonClicked() {
	buttonClicked++;
	if (obj !== null)
		obj.clickerAchievementTracker();
	animateButton();
	updateBits(bitsPerClick);
}

function updateBits(amount) {
	bits += amount;
	checkUpgradesAffordability();
	printBits();
}

function checkUpgradesAffordability() {
	var upgradePrices = [
		keyloggerPrice,
		phishingSitePrice,
		botnetPrice,
		superComputerPrice
	];

	var upgrades = [
		keyloggerBtn,
		phishingSiteBtn,
		botnetBtn,
		superComputerBtn
	];

	for (let [i, price] of upgradePrices.entries()) {
		if (bits < price)
			upgrades[i].classList.add("greyedOut");
		else if (upgrades[i].classList.contains("greyedOut"))
			upgrades[i].classList.remove("greyedOut");
	}
}

function animateButton() {
	let clickerBtn = document.getElementById("clickerButton");
	clickerBtn.classList.add("clickerButtonClicked");
	setTimeout(function(){
		clickerBtn.classList.remove("clickerButtonClicked");
	}, 100);
}

function saveGameState() {
	localStorage.setItem('bits', bits);
	localStorage.setItem('buttonClicked', buttonClicked);
	localStorage.setItem('bitsPerClick', bitsPerClick);
	localStorage.setItem('keyloggerAmount', keyloggerAmount);
	localStorage.setItem('phishingSiteAmount', phishingSiteAmount);
	localStorage.setItem('botnetAmount', botnetAmount);
	localStorage.setItem('superComputerAmount', superComputerAmount);
	
	localStorage.setItem('clickerUpgradesUnlocked', JSON.stringify(clickerUpgradesUnlocked));
	localStorage.setItem('clickerUpgradesBought', JSON.stringify(clickerUpgradesBought));
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
	}
	if (localStorage.getItem('buttonClicked') !== null) {
		buttonClicked = parseInt(localStorage.getItem('buttonClicked'));
	}
	if (localStorage.getItem('bitsPerClick', bitsPerClick) !== null) {
		bitsPerClick = parseFloat(localStorage.getItem('bitsPerClick'));
	}
	if (localStorage.getItem('keyloggerAmount') !== null) {
		keyloggerAmount = parseInt(localStorage.getItem('keyloggerAmount'));
		printKeyloggers();
	}
	if (localStorage.getItem('phishingSiteAmount') !== null) {
		phishingSiteAmount = parseInt(localStorage.getItem('phishingSiteAmount'));
		printPhishingSites();
	}
	if (localStorage.getItem('botnetAmount') !== null) {
		botnetAmount = parseInt(localStorage.getItem('botnetAmount'));
		printBotnets();
	}
	if (localStorage.getItem('superComputerAmount') !== null) {
		superComputerAmount = parseInt(localStorage.getItem('superComputerAmount'));
		printSuperComputers();
	}
	if (JSON.parse(localStorage.getItem('clickerUpgradesUnlocked')) !==null) {
		clickerUpgradesUnlocked = JSON.parse(localStorage.getItem('clickerUpgradesUnlocked'));
	}
	if (JSON.parse(localStorage.getItem('clickerUpgradesBought')) !== null) {
		clickerUpgradesBought = JSON.parse(localStorage.getItem('clickerUpgradesBought'));
		for (let [i, upgrade] of clickerUpgradesBought.entries()) {
			if (upgrade === true)
				clickerUpgrades[i].style.display = "none";
			else if (clickerUpgradesUnlocked[i] === true)
				clickerUpgrades[i].style.display = "inline-block";
		}
	}
	updateBitsPerClick();
	updatePriceChanges();
	printBits();
}

function resetGameState() {
	bits = 0;
	buttonClicked = 0;
	bitsPerClick = 1;
	keyloggerAmount = 0;
	phishingSiteAmount = 0;
	botnetAmount = 0;
	superComputerAmount = 0;
	updatePriceChanges();
	
	for (let [i, v] of clickerUpgradesBought.entries())
		clickerUpgradesBought[i] = false;
	for (let [i, v] of clickerUpgradesUnlocked.entries())
		clickerUpgradesUnlocked[i] = false;
	for (let [i, v] of clickerUpgrades.entries())
		clickerUpgrades[i].style.display = "none";

	localStorage.clear();
	saveGameState();
	loadGameState();
}

function buyUpgrade(selector) {
	switch (selector) {
		case 1:
			if (bits >= keyloggerPrice) {
				bits -= keyloggerPrice;
				keyloggerAmount++;
				keyloggerPrice = Math.floor(10 * Math.pow(1.1, keyloggerAmount));
				
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printKeyloggers();
			}
			break;
		case 2:
			if (bits >= phishingSitePrice) {
				bits -= phishingSitePrice;
				phishingSiteAmount++;
				phishingSitePrice = Math.floor(100 * Math.pow(1.15, phishingSiteAmount));

				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printPhishingSites();
			}
			break;
		case 3:
			if (bits >= botnetPrice) {
				bits -= botnetPrice;
				botnetAmount++;
				botnetPrice = Math.floor(1000 * Math.pow(1.2, botnetAmount));

				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printBotnets();
			}
			break;
		case 4:
			if (bits >= superComputerPrice) {
				bits -= superComputerPrice;
				superComputerAmount++;
				superComputerPrice = Math.floor(10000 * Math.pow(1.25, superComputerAmount));

				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printSuperComputers();
			}
			break;
		case 5:
			if (bits >= 750) {
				bits -= 750;
				clickerUpgradesBought[0] = true;
				document.getElementById("clickerUpgrade1").style.display = "none";

				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
			}
			break;
		case 6:
			if (bits >= 5000) {
				bits -= 5000;
				clickerUpgradesBought[1] = true;
				document.getElementById("clickerUpgrade2").style.display = "none";

				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
			}
			break;
		case 7:
			if (bits >= 10000) {
				bits -= 10000;
				clickerUpgradesBought[2] = true;
				document.getElementById("clickerUpgrade3").style.display = "none";

				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
			}
			break;
		case 8:
			if (bits >= 20000) {
				bits -= 20000;
				clickerUpgradesBought[3] = true;
				document.getElementById("clickerUpgrade4").style.display = "none";

				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
			}
			break;
	}
}

function updateBitsPerClick() {
	bitsPerClick = 1;
	for (let [i, upgrade] of clickerUpgradesBought.entries()) {
		if (upgrade)
			bitsPerClick += (bitsPerSec * ((i + 1) / 100));
	}
	printBits();
}

function updatePriceChanges() {
	keyloggerPrice = Math.floor(10 * Math.pow(1.1, keyloggerAmount));
	phishingSitePrice = Math.floor(100 * Math.pow(1.15, phishingSiteAmount));
	botnetPrice = Math.floor(1000 * Math.pow(1.2, botnetAmount));
	superComputerPrice = Math.floor(10000 * Math.pow(1.25, superComputerAmount));

	checkUpgradesAffordability();
	printKeyloggers();
	printPhishingSites();
	printBotnets();
	printSuperComputers();
}

function printBits() {
	bitsPerSec = keyloggerAmount * 0.1 + phishingSiteAmount * 1 + botnetAmount * 10 + superComputerAmount * 100;
	document.getElementById("bitsCounter").innerHTML = "Bits: " + numberToLetter(bits.toFixed(1)) + "<br/>Bits Per Sec: " + numberToLetter(bitsPerSec.toFixed(1)) + "<br/>Bits Per Click: " + numberToLetter(bitsPerClick.toFixed(1));
}

function numberToLetter(number) {
	if (number < 1000)
		return number;

	for (let [i, v] of largeNums.entries()) {
		if ((number / v) < 1000)
			return (number / v).toFixed(2) + largeNumAbbr[i];
	}
}

function printKeyloggers() {
	document.getElementById("keyloggerBtn").innerHTML = "Keyloggers: " + keyloggerAmount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + numberToLetter((keyloggerAmount * 0.1).toFixed(1)) + `<br>` + "Price: " + numberToLetter(keyloggerPrice);
}

function printPhishingSites() {
	document.getElementById("phishingSiteBtn").innerHTML = "Phishing Sites: " + phishingSiteAmount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + numberToLetter((phishingSiteAmount * 1).toFixed(1)) + `<br>` + "Price: " + numberToLetter(phishingSitePrice);
}

function printBotnets() {
	document.getElementById("botnetBtn").innerHTML = "Botnets: " + botnetAmount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + numberToLetter((botnetAmount * 10).toFixed(1)) + `<br>` + "Price: " + numberToLetter(botnetPrice);
}

function printSuperComputers() {
	document.getElementById("superComputerBtn").innerHTML = "Super Computers: " + superComputerAmount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + numberToLetter((superComputerAmount * 100).toFixed(1)) + `<br>` + "Price: " + numberToLetter(superComputerPrice);
}

var obj = {
	clickerAchievementTracker: function() {
		for (let [i, value] of clickerAchievements.entries()) {
			if (buttonClicked >= value) {
				clickerUpgradesUnlocked[i] = true;
				if (!clickerUpgradesBought[i])
					clickerUpgrades[i].style.display = "inline-block";
			}
		}
	}
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