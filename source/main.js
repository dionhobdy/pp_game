const prompts = require('prompts');
const { fgColorHex } = require('terminal-text-color');

const list = {
    AFP: 548,
    DHCP: 67,
    DNS: 53,
    FTP: 21,
    HTTP: 80,
    HTTPS: 443,
    IMAP: 143,
    LDAP: 389,
    NetBIOS: 137,
    POP3: 110,
    RDP: 3389,
    SLP: 427,
    SMB: 445,
    SMTP: 25,
    SNMP: 61,
    SSH: 22,
    Telnet: 23
};

console.log(fgColorHex('4aa4e0'), `
██████  ██████           ██████   █████  ███    ███ ███████ 
██   ██ ██   ██         ██       ██   ██ ████  ████ ██      
██████  ██████          ██   ███ ███████ ██ ████ ██ █████   
██      ██              ██    ██ ██   ██ ██  ██  ██ ██      
██      ██      ███████  ██████  ██   ██ ██      ██ ███████
`);
console.log(fgColorHex('ffffff'), 'Welcome to PP_Game. How big is your PP knowledge?');
console.log(fgColorHex('ffffff'), 'There are 17 PPs. If you do not get at least 10 PPs correct, this will delete System 32. (╯°□°)╯︵ ┻━┻ ');

async function game() {
    let count = 0;
    // Precompute keys array once, shuffle for random order (Fisher-Yates)
    const keys = Object.keys(list);
    for (let i = keys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [keys[i], keys[j]] = [keys[j], keys[i]];
    }
    // Use for-of for cleaner iteration
    for (const key of keys) {
        const response = await prompts({
            type: 'number',
            name: 'value',
            message: `What is the port number for ${key}?`
        });
        if (Number(response.value) === list[key]) {
            count++;
            console.log(fgColorHex('ffffff'), 'Correct! ...Lucky ass! (╯°□°)╯︵ ┻━┻');
            console.log(fgColorHex('ffffff'), `You have ${count} PPs correct.`);
        } else {
            console.log(fgColorHex('ffffff'), `Wrong, loser! The correct port was ${list[key]}. 😈`);
            console.log(fgColorHex('ffffff'), `You have ${count} PPs correct.`);
        }
    }
    count >= 10
        ? console.log(fgColorHex('21eb50'), 'You have been spared, kid! SMH. Praise the sun! ☀️')
        : console.log(fgColorHex('f2243c'), 'Your System 32 is donezo! RIP In Peace! Nothing personnel! (╯°□°)╯︵ ┻━┻');
}

game();