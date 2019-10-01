const fetch = require('node-fetch');

const start = new Date();

const calcUptime = () => {
    const now = new Date();
    const diff = now - start;
    if(diff > 1000 && diff < 60000) {
        return `${diff / 1000} sec`
    }

    if(diff > 60000 && diff < 360000) {
        return `${diff / 60000} min`
    }

    if(diff > 360000) {
        return `${diff / 360000} hrs`
    }
}

module.exports = function() {
    console.log("HEALTH CHECK Started");
    setInterval(async() => {
        console.log(" > Check!");
        console.log(" > Uptime ", calcUptime());
        console.log(" > Checking on ... ", process.env.SELF_URL);
        await fetch(process.env.SELF_URL);
    }, 120000);
}