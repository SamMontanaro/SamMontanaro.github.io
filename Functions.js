'use strict';
let FPS = 60;

let bitsCounter = new Object;
let bits = 0;
let bitsPerSec = 0;
let bitsPerClick = 1;
let buttonClicked = 0;

class Building {
	constructor(amount, price, BPS) {
		this.amount = amount;
		this.price = price;
		this.BPS = BPS;
	}
};

let keylogger = new Building(0, 10, 0.1);
let phishingSite = new Building(0, 100, 1);
let ransomware = new Building(0, 1000, 10);
let botnet = new Building(0, 10000, 100);
let superComputer = new Building(0, 100000, 1000);

let clickerAchievements = [500, 2500, 5000, 9001];
let clickerUpgradesUnlocked = [false, false, false, false];
let clickerUpgradesBought = [false, false, false, false];

let keyloggerAchievements = [10, 25, 50, 100];
let keyloggerUpgradesUnlocked = [false, false, false, false];
let keyloggerUpgradesBought = [false, false, false, false];

let phishingAchievements = [10, 25, 50, 100];
let phishingUpgradesUnlocked = [false, false, false, false];
let phishingUpgradesBought = [false, false, false, false];

let largeNumAbbr = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc", "Ud", "Dd", "Td", "Qad", "Qid", "Sxd", "Spd", "Ocd", "Nod", "Vg"];

let clickTextDiv = undefined;
let clickTextElements = new Array;

var achievements = {
	clickerAchievementTracker: function() {
		for (let [i, value] of clickerAchievements.entries()) {
			if (buttonClicked >= value) {
				clickerUpgradesUnlocked[i] = true;
				if (!clickerUpgradesBought[i]) {
					if (document.getElementById("clickerUpgrade" + (i + 1).toString()) === null) {
						var button = document.createElement("button");
						button.id = "clickerUpgrade" + (i + 1).toString();
						button.style.display = "inline-block";
						button.addEventListener('click', function(){buyUpgrade(i + 6)});
						button.addEventListener('mouseenter', function(){document.getElementById("CU" + (i + 1).toString() + "-hoverText").style.display = "block";});
						button.addEventListener('mouseout', function(){document.getElementById("CU" + (i + 1).toString() + "-hoverText").style.display = "none";});
						document.getElementById("unlockedUpgrades").appendChild(button);
					}
				}
				else
					if (document.getElementById("clickerUpgrade" + (i + 1).toString()) !== null) {
						document.getElementById("unlockedUpgrades").removeChild(document.getElementById("clickerUpgrade" + (i + 1).toString()));
						document.getElementById("CU" + (i + 1).toString() + "-hoverText").style.display = "none";
					}
			}
			else
				if (document.getElementById("clickerUpgrade" + (i + 1).toString()) !== null) {
					document.getElementById("unlockedUpgrades").removeChild(document.getElementById("clickerUpgrade" + (i + 1).toString()));
					document.getElementById("CU" + (i + 1).toString() + "-hoverText").style.display = "none";
				}
		}
	},
	keyloggerAchievementTracker: function() {
		for (let [i, value] of keyloggerAchievements.entries()) {
			if (keylogger.amount >= value) {
				keyloggerUpgradesUnlocked[i] = true;
				if (!keyloggerUpgradesBought[i]) {
					if (document.getElementById("keyloggerUpgrade" + (i + 1).toString()) === null) {
						var button = document.createElement("button");
						button.id = "keyloggerUpgrade" + (i + 1).toString();
						button.style.display = "inline-block";
						button.addEventListener('click', function(){buyUpgrade(i + 10)});
						button.addEventListener('mouseenter', function(){document.getElementById("KU" + (i + 1).toString() + "-hoverText").style.display = "block";});
						button.addEventListener('mouseout', function(){document.getElementById("KU" + (i + 1).toString() + "-hoverText").style.display = "none";});
						document.getElementById("unlockedUpgrades").appendChild(button);
					}
				}
				else
					if (document.getElementById("keyloggerUpgrade" + (i + 1).toString()) !== null) {
						document.getElementById("unlockedUpgrades").removeChild(document.getElementById("keyloggerUpgrade" + (i + 1).toString()));
						document.getElementById("KU" + (i + 1).toString() + "-hoverText").style.display = "none";
					}
			}
			else
				if (document.getElementById("keyloggerUpgrade" + (i + 1).toString()) !== null) {
					document.getElementById("unlockedUpgrades").removeChild(document.getElementById("keyloggerUpgrade" + (i + 1).toString()));
					document.getElementById("KU" + (i + 1).toString() + "-hoverText").style.display = "none";
				}
		}
	},
	phishingAchievementTracker: function() {
		for (let [i, value] of phishingAchievements.entries()) {
			if (phishingSite.amount >= value) {
				phishingUpgradesUnlocked[i] = true;
				if (!phishingUpgradesBought[i]) {
					if (document.getElementById("phishingUpgrade" + (i + 1).toString()) === null) {
						var button = document.createElement("button");
						button.id = "phishingUpgrade" + (i + 1).toString();
						button.style.display = "inline-block";
						button.addEventListener('click', function(){buyUpgrade(i + 14)});
						button.addEventListener('mouseenter', function(){document.getElementById("PU" + (i + 1).toString() + "-hoverText").style.display = "block";});
						button.addEventListener('mouseout', function(){document.getElementById("PU" + (i + 1).toString() + "-hoverText").style.display = "none";});
						document.getElementById("unlockedUpgrades").appendChild(button);
					}
				}
				else
					if (document.getElementById("phishingUpgrade" + (i + 1).toString()) !== null) {
						document.getElementById("unlockedUpgrades").removeChild(document.getElementById("phishingUpgrade" + (i + 1).toString()));
						document.getElementById("PU" + (i + 1).toString() + "-hoverText").style.display = "none";
					}
			}
			else
				if (document.getElementById("phishingUpgrade" + (i + 1).toString()) !== null) {
					document.getElementById("unlockedUpgrades").removeChild(document.getElementById("phishingUpgrade" + (i + 1).toString()));
					document.getElementById("PU" + (i + 1).toString() + "-hoverText").style.display = "none";
				}
		}
	}
};

window.onload = function() {
	let closeBtn = document.getElementById("closeBtn");
	let saveBtn = document.getElementById("saveBtn");
	let loadBtn = document.getElementById("loadBtn");
	let resetBtn = document.getElementById("resetBtn");

	let clickerBtn = document.getElementById("clickerButton");
	let keyloggerBtn = document.getElementById("keyloggerBtn");
	let phishingSiteBtn = document.getElementById("phishingSiteBtn");
	let ransomwareBtn = document.getElementById("ransomwareBtn");
	let botnetBtn = document.getElementById("botnetBtn");
	let superComputerBtn = document.getElementById("superComputerBtn");

	bitsCounter = document.getElementById("bitsCounter");
	clickTextDiv = document.getElementById("clickText");

	closeBtn.addEventListener('mouseup', closeUpdateLog);
	clickerBtn.addEventListener('mouseup', clickerButtonClicked);
	saveBtn.addEventListener('mouseup', saveGameState);
	loadBtn.addEventListener('mouseup', loadGameState);
	resetBtn.addEventListener('mouseup', resetGameState);

	keyloggerBtn.addEventListener('mouseup', function(){buyUpgrade(1)});
	phishingSiteBtn.addEventListener('mouseup', function(){buyUpgrade(2)});
	ransomwareBtn.addEventListener('mouseup', function(){buyUpgrade(3)});
	botnetBtn.addEventListener('mouseup', function(){buyUpgrade(4)});
	superComputerBtn.addEventListener('mouseup', function(){buyUpgrade(5)});

	loadGameState();
}

var closeModal = window.onclick = function(event) {
	if (event.target == updateLogModal) {
		updateLogModal.style.display = "none";
		closeModal = null;
	}
}

function closeUpdateLog() {
	document.getElementById("updateLogModal").style.display = "none";
	closeModal = null;
}

function clickerButtonClicked() {
	buttonClicked++;
	createClickerText();
	achievements.clickerAchievementTracker();
	animateButton();
	updateBits(bitsPerClick);
}

function createClickerText() {
	var p = document.createElement("p");
	p.textContent = "+" + numberToLetter(bitsPerClick.toFixed(2));
	createClickerText.randomX = Math.random() * 20 - 10;
	
    p.style.left = window.event.clientX - p.offsetWidth - vmax(("+" + numberToLetter(bitsPerClick.toFixed(2))).length / 2) + Math.ceil(createClickerText.randomX) + "px";
	p.style.top = window.event.clientY - p.offsetHeight + "px";
	
	clickTextElements.push(p);
    clickTextDiv.appendChild(p);
	p = deleteClickerText(p);
}

function deleteClickerText(p) {
	if (clickTextElements.length > 15) {
		clickTextDiv.removeChild(clickTextElements[0]);
		clickTextElements.shift();
		p = null;
		return null;
	}
	else {
		setTimeout(function() {
			clickTextDiv.removeChild(clickTextElements[0]);
			clickTextElements.shift();
			p = null;
			return null;
		}, 1000);
	}
}

function updateBits(amount) {
	bits += amount;
	checkUpgradesAffordability();
	printBits();
}

function checkUpgradesAffordability() {
	checkUpgradesAffordability.upgradePrices = [
		keylogger.price,
		phishingSite.price,
		ransomware.price,
		botnet.price,
		superComputer.price
	];

	checkUpgradesAffordability.upgrades = [
		keyloggerBtn,
		phishingSiteBtn,
		ransomwareBtn,
		botnetBtn,
		superComputerBtn
	];

	for (let [i, price] of checkUpgradesAffordability.upgradePrices.entries()) {
		if (bits < price)
			checkUpgradesAffordability.upgrades[i].classList.add("greyedOut");
		else if (checkUpgradesAffordability.upgrades[i].classList.contains("greyedOut"))
			checkUpgradesAffordability.upgrades[i].classList.remove("greyedOut");
	}
}

function animateButton() {
	document.getElementById("clickerButton").classList.add("clickerButtonClicked");
	setTimeout(function(){
		document.getElementById("clickerButton").classList.remove("clickerButtonClicked");
	}, 100);
}

function saveGameState() {
	localStorage.setItem('bits', bits);
	localStorage.setItem('buttonClicked', buttonClicked);
	localStorage.setItem('bitsPerClick', bitsPerClick);

	localStorage.setItem('keylogger', JSON.stringify(keylogger));
	localStorage.setItem('phishingSite', JSON.stringify(phishingSite));
	localStorage.setItem('ransomware', JSON.stringify(ransomware));
	localStorage.setItem('botnet', JSON.stringify(botnet));
	localStorage.setItem('superComputer', JSON.stringify(superComputer));

	localStorage.setItem('clickerUpgradesUnlocked', JSON.stringify(clickerUpgradesUnlocked));
	localStorage.setItem('clickerUpgradesBought', JSON.stringify(clickerUpgradesBought));

	localStorage.setItem('keyloggerUpgradesUnlocked', JSON.stringify(keyloggerUpgradesUnlocked));
	localStorage.setItem('keyloggerUpgradesBought', JSON.stringify(keyloggerUpgradesBought));

	localStorage.setItem('phishingUpgradesUnlocked', JSON.stringify(phishingUpgradesUnlocked));
	localStorage.setItem('phishingUpgradesBought', JSON.stringify(phishingUpgradesBought));
}

function autoSavePopup() {
	document.getElementById("autosaveArea").classList.add("anim");
	setTimeout(function(){
		document.getElementById("autosaveArea").classList.remove("anim");
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
	if (JSON.parse(localStorage.getItem('keylogger')) !== null) {
		keylogger = JSON.parse(localStorage.getItem('keylogger'));
		printKeyloggers();
	}
	if (JSON.parse(localStorage.getItem('phishingSite')) !== null) {
		phishingSite = JSON.parse(localStorage.getItem('phishingSite'));
		printPhishingSites();
	}
	if (JSON.parse(localStorage.getItem('ransomware')) !== null) {
		ransomware = JSON.parse(localStorage.getItem('ransomware'));
		printRansomwares();
	}
	if (JSON.parse(localStorage.getItem('botnet')) !== null) {
		botnet = JSON.parse(localStorage.getItem('botnet'));
		printBotnets();
	}
	if (JSON.parse(localStorage.getItem('superComputer')) !== null) {
		superComputer = JSON.parse(localStorage.getItem('superComputer'));
		printSuperComputers();
	}
	if (JSON.parse(localStorage.getItem('clickerUpgradesUnlocked')) !== null) {
		clickerUpgradesUnlocked = JSON.parse(localStorage.getItem('clickerUpgradesUnlocked'));
	}
	if (JSON.parse(localStorage.getItem('clickerUpgradesBought')) !== null) {
		clickerUpgradesBought = JSON.parse(localStorage.getItem('clickerUpgradesBought'));
		achievements.clickerAchievementTracker();
	}
	if (JSON.parse(localStorage.getItem('keyloggerUpgradesUnlocked')) !== null) {
		keyloggerUpgradesUnlocked = JSON.parse(localStorage.getItem('keyloggerUpgradesUnlocked'));
	}
	if (JSON.parse(localStorage.getItem('keyloggerUpgradesBought')) !== null) {
		keyloggerUpgradesBought = JSON.parse(localStorage.getItem('keyloggerUpgradesBought'));
		achievements.keyloggerAchievementTracker();
	}
	if (JSON.parse(localStorage.getItem('phishingUpgradesUnlocked')) !== null) {
		phishingUpgradesUnlocked = JSON.parse(localStorage.getItem('phishingUpgradesUnlocked'));
	}
	if (JSON.parse(localStorage.getItem('phishingUpgradesBought')) !== null) {
		phishingUpgradesBought = JSON.parse(localStorage.getItem('phishingUpgradesBought'));
		achievements.phishingAchievementTracker();
	}

	updateBitsPerSec();
	updateBitsPerClick();
	updatePriceChanges();
	printBits();
}

function resetGameState() {
	bits = 0;
	buttonClicked = 0;
	bitsPerClick = 1;
	
	keylogger.amount = 0;
	keylogger.BPS = 0.1;
	phishingSite.amount = 0;
	phishingSite.BPS = 1;
	ransomware.amount = 0;
	ransomware.BPS = 10;
	botnet.amount = 0;
	botnet.BPS = 100;
	superComputer.amount = 0;
	superComputer.BPS = 1000;

	updatePriceChanges();
	
	for (let i = 0; i < 4; i++) {
		clickerUpgradesBought[i] = false;
		clickerUpgradesUnlocked[i] = false;

		keyloggerUpgradesBought[i] = false;
		keyloggerUpgradesUnlocked[i] = false;

		phishingUpgradesBought[i] = false;
		phishingUpgradesUnlocked[i] = false;
	}

	localStorage.clear();
	saveGameState();
	loadGameState();
}

function buyUpgrade(selector) {
	switch (selector) {
		case 1:
			if (bits >= keylogger.price) {
				bits -= keylogger.price;
				keylogger.amount++;
				keylogger.price = Math.floor(10 * Math.pow(1.1, keylogger.amount));
				
				achievements.keyloggerAchievementTracker();
				updateBitsPerSec();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printKeyloggers();
			}
			break;
		case 2:
			if (bits >= phishingSite.price) {
				bits -= phishingSite.price;
				phishingSite.amount++;
				phishingSite.price = Math.floor(100 * Math.pow(1.15, phishingSite.amount));

				achievements.phishingAchievementTracker();
				updateBitsPerSec();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printPhishingSites();
			}
			break;
		case 3:
			if (bits >= ransomware.price) {
				bits -= ransomware.price;
				ransomware.amount++;
				ransomware.price = Math.floor(1000 * Math.pow(1.2, ransomware.amount));

				updateBitsPerSec();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printRansomwares();
			}
			break;
		case 4:
			if (bits >= botnet.price) {
				bits -= botnet.price;
				botnet.amount++;
				botnet.price = Math.floor(10000 * Math.pow(1.25, botnet.amount));

				updateBitsPerSec();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printBotnets();
			}
			break;
		case 5:
			if (bits >= superComputer.price) {
				bits -= superComputer.price;
				superComputer.amount++;
				superComputer.price = Math.floor(100000 * Math.pow(1.3, superComputer.amount));

				updateBitsPerSec();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printSuperComputers();
			}
			break;
		case 6:
			if (bits >= 750) {
				bits -= 750;
				clickerUpgradesBought[0] = true;

				achievements.clickerAchievementTracker();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
			}
			break;
		case 7:
			if (bits >= 5000) {
				bits -= 5000;
				clickerUpgradesBought[1] = true;

				achievements.clickerAchievementTracker();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
			}
			break;
		case 8:
			if (bits >= 10000) {
				bits -= 10000;
				clickerUpgradesBought[2] = true;

				achievements.clickerAchievementTracker();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
			}
			break;
		case 9:
			if (bits >= 20000) {
				bits -= 20000;
				clickerUpgradesBought[3] = true;

				achievements.clickerAchievementTracker();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
			}
			break;
		case 10:
			if (bits >= 100) {
				bits -= 100;
				keylogger.BPS *= 2;
				keyloggerUpgradesBought[0] = true;

				achievements.keyloggerAchievementTracker();
				updateBitsPerSec();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printKeyloggers();
			}
			break;
		case 11:
			if (bits >= 500) {
				bits -= 500;
				keylogger.BPS *= 2;
				keyloggerUpgradesBought[1] = true;

				achievements.keyloggerAchievementTracker();
				updateBitsPerSec();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printKeyloggers();
			}
			break;
		case 12:
			if (bits >= 2500) {
				bits -= 2500;
				keylogger.BPS *= 2;
				keyloggerUpgradesBought[2] = true;

				achievements.keyloggerAchievementTracker();
				updateBitsPerSec();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printKeyloggers();
			}
			break;
		case 13:
			if (bits >= 200000) {
				bits -= 200000;
				keylogger.BPS *= 2;
				keyloggerUpgradesBought[3] = true;

				achievements.keyloggerAchievementTracker();
				updateBitsPerSec();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printKeyloggers();
			}
			break;
		case 14:
			if (bits >= 2500) {
				bits -= 2500;
				phishingSite.BPS *= 2;
				phishingUpgradesBought[0] = true;

				achievements.phishingAchievementTracker();
				updateBitsPerSec();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printPhishingSites();
			}
			break;
		case 15:
			if (bits >= 50000) {
				bits -= 50000;
				phishingSite.BPS *= 2;
				phishingUpgradesBought[1] = true;

				achievements.phishingAchievementTracker();
				updateBitsPerSec();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printPhishingSites();
			}
			break;
		case 16:
			if (bits >= 100000) {
				bits -= 100000;
				phishingSite.BPS *= 2;
				phishingUpgradesBought[2] = true;

				achievements.phishingAchievementTracker();
				updateBitsPerSec();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printPhishingSites();
			}
			break;
		case 17:
			if (bits >= 500000) {
				bits -= 500000;
				phishingSite.BPS *= 2;
				phishingUpgradesBought[3] = true;

				achievements.phishingAchievementTracker();
				updateBitsPerSec();
				updateBitsPerClick();
				printBits();
				checkUpgradesAffordability();
				printPhishingSites();
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
}

function updateBitsPerSec() {
	bitsPerSec = keylogger.amount * keylogger.BPS + phishingSite.amount * phishingSite.BPS + ransomware.amount * ransomware.BPS + botnet.amount * botnet.BPS + superComputer.amount * superComputer.BPS;
}

function updatePriceChanges() {
	keylogger.price = Math.floor(10 * Math.pow(1.1, keylogger.amount));
	phishingSite.price = Math.floor(100 * Math.pow(1.15, phishingSite.amount));
	ransomware.price = Math.floor(1000 * Math.pow(1.2, ransomware.amount));
	botnet.price = Math.floor(10000 * Math.pow(1.25, botnet.amount));
	superComputer.price = Math.floor(100000 * Math.pow(1.3, superComputer.amount));

	checkUpgradesAffordability();
	printKeyloggers();
	printPhishingSites();
	printRansomwares();
	printBotnets();
	printSuperComputers();
}

function printBits() {
	  bitsCounter.innerHTML = `Bits: ${numberToLetter(bits.toFixed(2))} <br/>Bits Per Sec: ${numberToLetter(bitsPerSec.toFixed(2))} <br/>Bits Per Click: ${numberToLetter(bitsPerClick.toFixed(2))}`;
}

function numberToLetter(number) {
	if (number < 1000)
		return number;

	let n = Math.floor(Math.log10(number) / Math.log10(1000))
	let suffix = largeNumAbbr[n - 1];
	let prefix = number / Math.pow(1000, n);
	return prefix.toFixed(2) + suffix;
}

function printKeyloggers() {
	document.getElementById("keyloggerBtn").innerHTML = "Keyloggers: " + keylogger.amount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + numberToLetter((keylogger.amount * keylogger.BPS).toFixed(1)) + `<br>` + "Price: " + numberToLetter(keylogger.price);
}

function printPhishingSites() {
	document.getElementById("phishingSiteBtn").innerHTML = "Phishing Sites: " + phishingSite.amount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + numberToLetter((phishingSite.amount * phishingSite.BPS).toFixed(1)) + `<br>` + "Price: " + numberToLetter(phishingSite.price);
}

function printRansomwares() {
	document.getElementById("ransomwareBtn").innerHTML = "Ransomwares: " + ransomware.amount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + numberToLetter((ransomware.amount * ransomware.BPS).toFixed(1)) + `<br>` + "Price: " + numberToLetter(ransomware.price);
}

function printBotnets() {
	document.getElementById("botnetBtn").innerHTML = "Botnets: " + botnet.amount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + numberToLetter((botnet.amount * botnet.BPS).toFixed(1)) + `<br>` + "Price: " + numberToLetter(botnet.price);
}

function printSuperComputers() {
	document.getElementById("superComputerBtn").innerHTML = "Super Computers: " + superComputer.amount + `&nbsp;&nbsp;&nbsp;&nbsp;` + "Bits/Sec: " + numberToLetter((superComputer.amount * superComputer.BPS).toFixed(1)) + `<br>` + "Price: " + numberToLetter(superComputer.price);
}

function vh(v) {
	return (v * Math.max(document.documentElement.clientHeight, window.innerHeight || 0)) / 100;
}

function vw(v) {
	return (v * Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100;
}

let vmin = v => Math.min(vh(v), vw(v));
let vmax = v => Math.max(vh(v), vw(v));

window.setInterval(function() {
	updateBits(bitsPerSec / FPS);
}, 1000 / FPS);

window.setInterval(function() {
	saveGameState();
	autoSavePopup();
}, 60000);