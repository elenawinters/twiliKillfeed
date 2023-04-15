print('twiliKillfeed is running on the server.')

AddEventHandler('weaponDamageEvent', function(sender, data)
    print('Weapon damage event has occured.')
end)
