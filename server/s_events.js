console.log('twiliKillfeed is running on the server.')

let killStreaks = {}

on("playerDropped", (reason) => {
    // console.log(`Player ${GetPlayerName(global.source)} dropped (Reason: ${reason}).`)
    delete killStreaks[global.source];
});


onNet('twiliKillfeed:notify_update', (suspect, victim, weaponHash, damageType, damageBone) => {
    // if (suspect == 0 || victim == 0) { console.log("Suspect or Victim is not a player"); }
    let suspectName, victimName = '**Invalid** (Not a Player)';
    
    if (suspect != 0 && suspect != undefined) {
        suspectName = GetPlayerName(suspect);

        if (!killStreaks.hasOwnProperty(suspect)) { killStreaks[suspect] = 0; }
        killStreaks[suspect]++;
    }

    if (victim != 0 && victim != undefined) { 
        victimName = GetPlayerName(victim);

        killStreaks[victim] = 0;
    }
    
    let criticalHit = false;
    if (damageBone[1] == 0x796E) {  criticalHit = true;  }  // this is the head bone when testing against peds, unsure on players

    // console.log(`${suspectName} killed ${victimName} with ${weaponHash}. DamageType(${getKeyByValue(DamageTypes, damageType)}) DamageBone(${getKeyByValue(PedBones, damageBone[1])})`);

    console.log(`${suspectName} killed ${victimName} with ${weaponHash}. Critical(${criticalHit}) Cause(${getKeyByValue(DamageTypes, damageType)}) Killstreak(${killStreaks[suspect]})`);
    emitNet('twiliKillfeed:update_feed', -1, suspectName, victimName, weaponHash, damageType, criticalHit, killStreaks[suspect]);



    // console.log('Server has been notified to update the killfeed globally');
})