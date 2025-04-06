document.addEventListener("DOMContentLoaded", () => {
	// get all elements
	const batterySection = document.getElementById("battery");
	const chargeStatusDD = batterySection.querySelectorAll("dd")[0];
	const progressBar = batterySection.querySelector("progress");
	const output = batterySection.querySelector("output");

	// Create and append image element
	const image = document.createElement("img");
	image.alt = "Robo Battery Image";
	image.style.marginTop = "20px";
	batterySection.appendChild(image);

	// Update UI with battery info
	function updateBatteryInfo(battery) {
		const percentage = Math.round(battery.level * 100);
		const charging = battery.charging;

		// Update charge status and progress
		chargeStatusDD.textContent = charging ? "Charging" : "Not charging";
		progressBar.value = percentage;
		output.textContent = `${percentage}%`;

		// Fetch and display image based on battery percentage
		image.src = `https://robohash.org/${percentage}.png`;
	}

	// Get battery info
	if (navigator.getBattery) {
		navigator.getBattery().then(battery => {
			// Initial update
			updateBatteryInfo(battery);

			// event listener for battery level or charging changes
			battery.addEventListener("levelchange", () => updateBatteryInfo(battery));
			battery.addEventListener("chargingchange", () => updateBatteryInfo(battery));
		});
	} else {
		alert("Battery Status API is not supported by your browser.");
	}
});
