console.log('twiliKillfeed is running on the client.')
console.log(`Code path is set to ${GAME}`);

let attacker = 0;

on('gameEventTriggered', function (eventName, data) {
    if (eventName != 'CEventNetworkEntityDamage') { return; }

    const victim = data[0];
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
    const damageType = GetWeaponDamageType(weaponHash);
    const damageBone = GetPedLastDamageBone(victim);

    // console.log(PLAYER)
    // console.log(victim)

    // if (victimDied && IsEntityDead(victim) && (victim == PLAYER || suspect == PLAYER)) {  // this line basically says that we are in the killfeed somewhere
    if (victim == PLAYER() && victimDied && IsEntityDead(victim)) {  // REMINDER: ONLY SEND AS VICTIM. Weird desync can happen, only the victim is sure of their death.
    // if (victimDied && IsEntityDead(victim)) {  // This is only for testing
        // console.log('Did we die?');
        emitNet("twiliKillfeed:notify_update", GetPlayerServerId(NetworkGetPlayerIndexFromPed(suspect)), GetPlayerServerId(NetworkGetPlayerIndexFromPed(victim)), weaponHash, damageType, damageBone)

    }

})


onNet('twiliKillfeed:update_feed', (suspect, suspectName, victim, victimName, weaponHash, damageType, criticalHit, killStreak) => {
    console.log(`${suspectName}(${suspect}) killed ${victimName}(${victim}) with ${weaponHash}`);
    let involvement = 'enemy';
    if (suspect == NETID) {involvement = 'suspect'}
    if (victim == NETID) {involvement = 'victim'}
    // if (suspect == NETID || victim == NETID) { involved = true; }
    SendNUIMessage({action: 'update_feed',
        payload: {
            killer: suspectName,
            victim: victimName,
            weapon: weaponHash,
            type: damageType,
            crit: criticalHit,
            streak: killStreak,
            involvement: involvement
        }
    })
});