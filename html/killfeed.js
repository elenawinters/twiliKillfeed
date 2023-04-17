
window.addEventListener("message", (event) => {
	const data = event.data;

	// alert('FUCK');
	// console.log(data);

	if (data.action === "update_feed") {
		addKillFeedMessage(
            data.payload.killer,
            data.payload.victim,
            data.payload.weapon,
            data.payload.type,
            data.payload.crit,
            data.payload.streak,
            data.payload.involvement
        )
	}
});

const killfeedContainer = document.getElementById('killfeed-container');

function addKillFeedMessage(killer, victim, weapon, dtype, crit, streak, involvement) {
    // Create kill feed message HTML element
    const message = document.createElement('div');
    message.classList.add('killfeed-message');
    let involvetype = 'standard'
    if (involvement != 'enemy') {
        involvetype = 'involved'
    }

    let suspect_involvement = 'enemy';
    let victim_involvement = 'enemy';
    if (involvement == 'suspect') { suspect_involvement = 'friend'; }
    if (involvement == 'victim') { victim_involvement = 'friend'; }

    message.classList.add(`kill-${involvetype}`);

    // if (involved == true) { message.classList.add('kill-involved'); } else { message.classList.add('kill-standard'); }

    // Generate kill feed message content based on provided information
    // Example: <killer> <weapon_icon> <victim> (<assisted_by>)
    // https://stackoverflow.com/a/9891041
    message.innerHTML = `
		<span class="killer-${suspect_involvement}">${killer}</span>
		<img class="kill-icon-${involvetype}" src="https://cfx-nui-twiliKillfeed/icons/skull.png" alt="Kill Icon" />
		<span class="victim-${victim_involvement}">${victim}</span>
	`;

    // Add message to kill feed container
    killfeedContainer.appendChild(message);

    // Remove message after a certain duration (e.g., 5 seconds)
    setTimeout(() => {
        killfeedContainer.removeChild(message);
    }, 5000);
}


// This is taken from TF2 Killfeed Generator by SeffUwU
// No idea what it does but, "Invert the colors of kill icon, if not initiationg a kill."
// let masked_img =
//     special == 1
//     ? masked_image(
//         this,
//         245,
//         229,
//         193,
//         255,
//         10,
//         w,
//         h,
//         image_scale_multiplier
//         )
//     : masked_image(
//         this,
//         64,
//         60,
//         36,
//         255,
//         55,
//         w,
//         h,
//         image_scale_multiplier
//         );

//     const temp_c = document.createElement("canvas");
//     const tempctx = temp_c.getContext("2d");
//     temp_c.width = cWidth;
//     temp_c.height = cHeight;

//     tempctx.drawImage(
//     this,
//     destX,
//     destY - h / 4,
//     w * image_scale_multiplier,
//     h * image_scale_multiplier
// );