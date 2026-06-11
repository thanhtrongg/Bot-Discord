const Level = require('../Schema/level');

function xpFor(level) {
    return 5 * level * level + 50 * level + 100;
}

async function appendXp(userId, guildId, amount) {
    const record = await Level.findOneAndUpdate(
        { userId, guildId },
        { $setOnInsert: { userId, guildId } },
        { upsert: true, returnDocument: 'after' }
    );

    record.xp += amount;
    let leveledUp = false;

    while (record.xp >= xpFor(record.level + 1)) {
        record.xp -= xpFor(record.level + 1);
        record.level += 1;
        leveledUp = true;
    }

    await record.save();
    return leveledUp;
}

async function fetch(userId, guildId) {
    return Level.findOne({ userId, guildId }).lean();
}

async function fetchLeaderboard(guildId, limit = 10) {
    return Level.find({ guildId })
        .sort({ level: -1, xp: -1 })
        .limit(limit)
        .lean();
}

async function computeLeaderboard(client, leaderboard) {
    const rows = [];

    for (let index = 0; index < leaderboard.length; index += 1) {
        const entry = leaderboard[index];
        const user = await client.users.fetch(entry.userId).catch(() => null);
        rows.push({
            position: index + 1,
            username: user?.username || 'Unknown User',
            discriminator: user?.discriminator === '0' ? '' : user?.discriminator || '',
            level: entry.level,
            xp: entry.xp,
        });
    }

    return rows;
}

module.exports = {
    appendXp,
    computeLeaderboard,
    fetch,
    fetchLeaderboard,
    xpFor,
};
