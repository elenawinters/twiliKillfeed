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

    // const victimDied = data[3 + offset];
    const weaponHash = data[4 + offset];
    // const isMelee = data[9 + offset];
    // const damageType = data[10 + offset];
    const damageType = GetWeaponDamageType(weaponHash);
    const damageBone = GetPedLastDamageBone(victim);

    // if (victimDied && IsEntityDead(victim) && (victim == PLAYER || suspect == PLAYER)) {  // this line basically says that we are in the killfeed somewhere
    if (victim == PLAYER && IsEntityDead(victim)) {  // REMINDER: ONLY SEND AS VICTIM. Weird desync can happen, only the victim is sure of their death.
    // if (IsEntityDead(victim)) {  // This is only for testing
        // console.log('The player is part of the killfeed');
        // console.log(`IsPedAPlayer Victim: ${IsPedAPlayer(victim)}`);
        // console.log(`IsPedAPlayer Suspect: ${IsPedAPlayer(suspect)}`);
        // const weaponName = GetEntityArchetypeName(GetCurrentPedWeaponEntityIndex(suspect))

        // console.log(`${suspect} killed ${victim} with ${weaponHash}`);

        // console.log(`${GetPlayerServerId(NetworkGetPlayerIndexFromPed(suspect))}`)

        // if 
        emitNet("twiliKillfeed:notify_update", GetPlayerServerId(NetworkGetPlayerIndexFromPed(suspect)), GetPlayerServerId(NetworkGetPlayerIndexFromPed(victim)), weaponHash, damageType, damageBone)

    }

})


onNet('twiliKillfeed:update_feed', (suspect, victim, weaponHash, damageType, criticalHit, killStreak) => {
    console.log(`${suspect} killed ${victim} with ${weaponHash}`);
    let involved = false;
    if (suspect == NETID || victim == NETID) { involved = true; }
    SendNUIMessage({action: 'update_feed',
        payload: {
            killer: GetPlayerName(suspect - 1),
            victim: GetPlayerName(victim - 1),
            icon: weaponHash,
            type: damageType,
            crit: criticalHit,
            streak: killStreak,
            involved: involved
        }
    })
});