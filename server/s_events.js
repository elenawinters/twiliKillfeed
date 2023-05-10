console.log('twiliKillfeed is running on the server.')

let killStreaks = {}

on("playerDropped", (reason) => {
    // console.log(`Player ${GetPlayerName(global.source)} dropped (Reason: ${reason}).`)
    delete killStreaks[global.source];
});


onNet('twiliKillfeed:fetch_killstreak', (suspect, victim) => {
    // if (suspect == 0 || victim == 0) { console.log("Suspect or Victim is not a player"); }
    // let suspectName, victimName = '**Invalid** (Not a Player)';
    let [suspectName, victimName] = [null, null];
    // let suspectName = undefined;
    // let victimName = undefined;
    
    if (suspect != 0 && suspect != undefined) {
        if (!killStreaks.hasOwnProperty(suspect)) { killStreaks[suspect] = 0; }
        killStreaks[suspect]++;
    }

    if (victim != 0 && victim != undefined) { 
        killStreaks[victim] = 0;
    }

    emitNet('twiliKillfeed:return_killstreak', -1, killStreaks[suspect]);
    
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