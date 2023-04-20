console.log('twiliKillfeed is running on the client.')
console.log(`Code path is set to ${GAME}`);

let attacker = 0;


// on('CEventDamage', function (victims, suspect) {  // switching to 
//     for (let [, victim] of Object.entries(victims)) {
//         const weaponHash = GetPedCauseOfDeath(victim);
//         const damageType = GetWeaponDamageType(weaponHash);
//         const damageBone = GetPedLastDamageBone(victim);
//         // if (victim == PLAYER() && IsPedFatallyInjured(victim)) {  // REMINDER: ONLY SEND AS VICTIM. Weird desync can happen, only the victim is sure of their death.
//         if (IsPedFatallyInjured(victim)) {  // This is only for testing
//             // console.log('Did we die?');
//             emitNet("twiliKillfeed:notify_update", GetPlayerServerId(NetworkGetPlayerIndexFromPed(suspect)), GetPlayerServerId(NetworkGetPlayerIndexFromPed(victim)), weaponHash, damageType, damageBone)

//         }

//     }

// })


on('gameEventTriggered', function (eventName, data) {
    if (eventName != 'CEventNetworkEntityDamage') { return; }

    const victim = data[0];
    if (IsEntityAVehicle(victim)) { return; }

    const suspect = data[1];

    let offset = 0;

    if (BUILD >= 2060) {
        offset++;
        if (BUILD >= 2189) {
            offset++;
        }
    }

    const victimDied = data[3 + offset];
    const weaponHash = data[4 + offset];
    // const isMelee = data[9 + offset];
    // const damageType = data[10 + offset];
    // const damageType = GetWeaponDamageType(weaponHash);
    // const damageBone = GetPedLastDamageBone(victim);

    // console.log(PLAYER)
    // console.log(victim)

    // if (victimDied && IsEntityDead(victim) && (victim == PLAYER || suspect == PLAYER)) {  // this line basically says that we are in the killfeed somewhere
    if (victimDied && IsEntityDead(victim)) {  // This is only for testing
    // if (victim == PLAYER() && victimDied && IsPedFatallyInjured(victim)) {  // REMINDER: ONLY SEND AS VICTIM. Weird desync can happen, only the victim is sure of their death.
        const damageBone = GetPedLastDamageBone(victim);
        let situation = {
            causeOfDeath: weaponHash,
            damageType: GetWeaponDamageType(weaponHash),
            damageBone: damageBone,
            isOnFire: IsEntityOnFire(victim),
            isInWater: IsEntityInWater(victim),
            isUnderwater: IsPedSwimmingUnderWater(victim),
            isCritical: damageBone[1] == 0x796E
        }

        // console.log('Did we die?');
        emitNet("twiliKillfeed:notify_update", GetPlayerServerId(NetworkGetPlayerIndexFromPed(suspect)), GetPlayerServerId(NetworkGetPlayerIndexFromPed(victim)), situation)

    }

})


onNet('twiliKillfeed:update_feed', (suspect, suspectName, victim, victimName, situation, killStreak) => {
    console.log(`${suspectName}(${suspect}) killed ${victimName}(${victim}) with ${situation.weaponHash}`);
    let involvement = 'enemy';
    // console.log(NETID);
    if (suspect == NETID) {involvement = 'suspect'}
    if (victim == NETID) {involvement = 'victim'}
    // console.log(involvement);
    // if (suspect == NETID || victim == NETID) { involved = true; }
    SendNUIMessage({action: 'update_feed',
        payload: {
            killer: suspectName,
            victim: victimName,
            situation: situation,
            streak: killStreak,
            involvement: involvement
        }
    })
});