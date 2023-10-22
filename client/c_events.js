console.log('twiliKillfeed is running on the client.')
console.log(`Code path is set to ${GAME}`);

let attacker = 0;


on('twiliCore:damage:event', (suspect, victim, situation) => {
    if (!IsEntityAPed(victim.entity)) { return; }
    if (!situation.victimDied && !situation.isDead) { return; }
    if (situation.healthLost.h == 0 && situation.healthLost.a == 0) { return; }
    emitNet('twiliKillfeed:streak:fetch', suspect, victim, situation)
})


onNet('twiliKillfeed:update', (suspect, victim, situation, killStreak) => {
    // if (!IsEntityAPed(victim.entity)) { return; }
    // if (!situation.victimDied && !situation.isDead) { return; }
    
    let involvement = 'enemy';
    // console.log(NETID);
    if (suspect.networkIndex == PLAYER_NETID) {involvement = 'suspect'}
    if (victim.networkIndex == PLAYER_NETID) {involvement = 'victim'}

    // let killStreak = 0;
    // console.log(involvement);
    // if (suspect == NETID || victim == NETID) { involved = true; }
    
    SendNUIMessage({action: 'update_feed',
        payload: {
            killer: suspect.networkName,
            victim: victim.networkName,
            situation: situation,
            streak: killStreak,
            involvement: involvement
        }
    })

})

