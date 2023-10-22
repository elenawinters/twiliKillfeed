console.log('twiliKillfeed is running on the server.')

let killStreaks = {}

on("playerDropped", (reason) => {
    // console.log(`Player ${GetPlayerName(global.source)} dropped (Reason: ${reason}).`)
    // killStreaks.splice(killStreak.indexOf(global.source), 1)
    delete killStreaks[global.source];
});


onNet('twiliKillfeed:streak:fetch', (suspect, victim, situation) => {
    // if (suspect == 0 || victim == 0) { console.log("Suspect or Victim is not a player"); }
    // let suspectName, victimName = '**Invalid** (Not a Player)';
    // let [suspectName, victimName] = [null, null];
    // let suspectName = undefined;
    // let victimName = undefined;

    // console.log(suspect)
    
    if (suspect['entity'] != 0 && suspect['entity'] != undefined && suspect['entity'] != -1) {
        if (!killStreaks.hasOwnProperty(suspect['entity'])) { killStreaks[suspect['entity']] = 0; }
        killStreaks[suspect['entity']]++;
    }

    if (victim['entity'] != 0 && victim['entity'] != undefined && victim['entity'] != -1) {
        // killStreaks.splice(killStreaks.indexOf(victim['entity']), 1)
        // killStreaks[victim['entity']] = 0;
        delete killStreaks[victim['entity']]
    }

    console.log(killStreaks)

    emitNet('twiliKillfeed:update', -1, suspect, victim, situation, killStreaks[suspect['entity']]);
    
    // let criticalHit = false;
    // if (situation.damageBone[1] == 0x796E) {  criticalHit = true;  }  // this is the head bone when testing against peds, unsure on players

    // if (suspect == victim || situation.damageType == 0) { suspectName = ''; }
    // if (suspectName == null) { suspectName = 'NPC'; }
    // if (victimName == null) { victimName = 'NPC'; }

    // // console.log(`${suspectName} killed ${victimName} with ${weaponHash}. DamageType(${getKeyByValue(DamageTypes, damageType)}) DamageBone(${getKeyByValue(PedBones, damageBone[1])})`);

    // console.log(`${suspectName}(${suspect}) killed ${victimName}(${victim}). Situation: ${JSON.stringify(situation)}`);
    // emitNet('twiliKillfeed:return_killstreak', -1, suspect, suspectName, victim, victimName, situation, killStreaks[suspect]);



    // console.log('Server has been notified to update the killfeed globally');
})


// onNet('twiliKillfeed:notify_update', (suspect, victim, situation) => {
//     // if (suspect == 0 || victim == 0) { console.log("Suspect or Victim is not a player"); }
//     // let suspectName, victimName = '**Invalid** (Not a Player)';
//     let [suspectName, victimName] = [null, null];
//     // let suspectName = undefined;
//     // let victimName = undefined;
    
//     if (suspect != 0 && suspect != undefined) {
//         suspectName = GetPlayerName(suspect);

//         if (!killStreaks.hasOwnProperty(suspect)) { killStreaks[suspect] = 0; }
//         killStreaks[suspect]++;
//     }

//     if (victim != 0 && victim != undefined) { 
//         victimName = GetPlayerName(victim);

//         killStreaks[victim] = 0;
//     }
    
//     // let criticalHit = false;
//     // if (situation.damageBone[1] == 0x796E) {  criticalHit = true;  }  // this is the head bone when testing against peds, unsure on players

//     if (suspect == victim || situation.damageType == 0) { suspectName = ''; }
//     if (suspectName == null) { suspectName = 'NPC'; }
//     if (victimName == null) { victimName = 'NPC'; }

//     // console.log(`${suspectName} killed ${victimName} with ${weaponHash}. DamageType(${getKeyByValue(DamageTypes, damageType)}) DamageBone(${getKeyByValue(PedBones, damageBone[1])})`);

//     console.log(`${suspectName}(${suspect}) killed ${victimName}(${victim}). Situation: ${JSON.stringify(situation)}`);
//     emitNet('twiliKillfeed:update_feed', -1, suspect, suspectName, victim, victimName, situation, killStreaks[suspect]);



//     // console.log('Server has been notified to update the killfeed globally');
// })