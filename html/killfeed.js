
window.addEventListener("message", (event) => {
	const data = event.data;

	if (data.action === "update_feed") {
		addKillFeedMessage(
            data.payload.killer,
            data.payload.victim,
            data.payload.situation,
            data.payload.streak,
            data.payload.involvement
        );
	}
});

const killfeedContainer = document.getElementById('killfeed-container');

function addKillFeedMessage(killer, victim, situation, streak, involvement) {
    // Create kill feed message HTML element
    const message = document.createElement('div');
    message.classList.add('killfeed-message');
    let involvetype = 'standard';
    if (involvement != 'enemy') {
        involvetype = 'involved';
    }

    let suspect_involvement = 'enemy';
    let victim_involvement = 'enemy';
    if (involvement == 'suspect') { suspect_involvement = 'friend'; }
    if (involvement == 'victim') { victim_involvement = 'friend'; }

    // console.log(involvement);
    // console.log(suspect_involvement);
    // console.log(victim_involvement);

    message.classList.add(`kill-${involvetype}`);

    
    let killFeedDisplay = '';
    // if (streak > 0) {
    //     killFeedDisplay = streak;
    // }

    // if (involved == true) { message.classList.add('kill-involved'); } else { message.classList.add('kill-standard'); }
    let background = ''
    if (situation.isCritical) {
        background = `<img class="kill-icon-background" src="https://cfx-nui-twiliKillfeed/icons/crit.png" alt="Crit" />`;
    }

    let deathIcon;
    switch(situation.weaponHash) {
        default:
            deathIcon = situation.weaponHash;
            break;
    }

    // Generate kill feed message content based on provided information
    // Example: <killer> <weapon_icon> <victim> (<assisted_by>)
    // https://stackoverflow.com/a/9891041
    message.innerHTML = `
		<span class="killer-${suspect_involvement}">${killer}</span>
        ${killFeedDisplay}
        <div class="kill-icons">
            ${background}
		    <img class="kill-icon-${involvetype}" src="https://cfx-nui-twiliKillfeed/icons/${deathIcon}.png" alt="Kill Icon" onerror="this.onerror=null;this.src='https://cfx-nui-twiliKillfeed/icons/skull.png';" />
        </div>
		<span class="victim-${victim_involvement}">${victim}</span>
	`;

    // console.log(message.innerHTML);

    // Add message to kill feed container
    killfeedContainer.appendChild(message);

    // Remove message after a certain duration (e.g., 5 seconds)
    setTimeout(() => {
        killfeedContainer.removeChild(message);
    }, 15000);
}


// this only contains the default weapons. to add weapons, just add an image with the name being the hash in a PNG format, for example, 324215364.png
// this represents a texture atlas. Format is [ATLAS, *COORDS]
// this will eventually be moved to a file defining the atlas. for now, this is gonna be 
function getTextureCoordinates(hash) {
    switch (hash) {
        case -1716189206:
            return ['update', [233, 173], [233, 211], [418, 211], [418, 173]]
            break;
        case 324215364:
            return ['update', [14, 402], [14, 477], [28, 477] [28, 439], [107, 439], [107, 516], [230, 516], [230, 462], [298, 462], [298, 423], [262, 423], [262, 402]]
            break;
    }
}


// This is taken from TF2 Killfeed Generator by SeffUwU
// No idea what it does but, "Invert the colors of kill icon, if not initiationg a kill."
// I need to find the masked_image function
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

// function masked_image(img, r, g, b, a, precision, sw, sh, scale = 1) {
//     // Returns a canvas, that contains only the color defined by
//     // RGBA values in a range of (-precision, +precision).
//     // Thanks to this guy: https://stackoverflow.com/a/22540439
//     // I was able to rewrite parts of his code to use in this project.
//     let c = document.createElement("canvas");
//     c.width = sw * scale;
//     c.height = sh * scale;
//     ctx = c.getContext("2d");
//     ctx.drawImage(img, 0, 0, sw * scale, sh * scale);
  
//     var canvasImgData = ctx.getImageData(0, 0, c.width, c.height);
//     var data = canvasImgData.data;
//     for (var i = 0; i < data.length; i += 4) {
//       var isInMask =
//         data[i + 0] > r - precision &&
//         data[i + 0] < r + precision &&
//         data[i + 1] > g - precision &&
//         data[i + 1] < g + precision &&
//         data[i + 2] > b - precision &&
//         data[i + 2] < b + precision &&
//         data[i + 3] > 0;
//       data[i + 0] = isInMask ? 241 : 0;
//       data[i + 1] = isInMask ? 233 : 0;
//       data[i + 2] = isInMask ? 203 : 0;
//       data[i + 3] = isInMask ? 255 : 0;
//     }
//     ctx.putImageData(canvasImgData, 0, 0);
//     return c;
//   }