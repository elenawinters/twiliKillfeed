
window.addEventListener("message", (event) => {
	const data = event.data;

	// alert('FUCK');
	// console.log(data);

	if (data.action === "update_feed") {
		addKillFeedMessage(data.payload.killer, data.payload.victim, data.payload.icon)
	}
});

const killfeedContainer = document.getElementById('killfeed-container');

function addKillFeedMessage(killer, victim, weapon) {
    // Create kill feed message HTML element
    const message = document.createElement('div');
    message.classList.add('killfeed-message');

    // Generate kill feed message content based on provided information
    // Example: <killer> <weapon_icon> <victim> (<assisted_by>)
    message.innerHTML = `
		<span class="killer">${killer}</span>
		<img class="kill-icon" src="https://cfx-nui-twiliKillfeed/icons/skull.png" alt="Kill Icon" />
		<span class="victim">${victim}</span>
	`;

    // Add message to kill feed container
    killfeedContainer.appendChild(message);

    // Remove message after a certain duration (e.g., 5 seconds)
    setTimeout(() => {
        killfeedContainer.removeChild(message);
    }, 10000);
}