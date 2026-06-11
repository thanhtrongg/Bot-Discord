const {
    AttachmentBuilder,
    DMChannel,
    EmbedBuilder,
    Guild,
    GuildMember,
    Message,
    NewsChannel,
    PermissionsBitField,
    TextChannel,
    ThreadChannel,
    User,
} = require('discord.js');

function patchDiscordCompat(Discord) {
    Discord.MessageEmbed = EmbedBuilder;
    Discord.MessageAttachment = function MessageAttachmentCompat(attachment, nameOrOptions) {
        const options = typeof nameOrOptions === 'string' ? { name: nameOrOptions } : nameOrOptions;
        return new AttachmentBuilder(attachment, options);
    };

    if (!EmbedBuilder.prototype.addField) {
        EmbedBuilder.prototype.addField = function addField(name, value, inline = false) {
            return this.addFields({ name, value: String(value), inline });
        };
    }

    const originalSetAuthor = EmbedBuilder.prototype.setAuthor;
    EmbedBuilder.prototype.setAuthor = function setAuthorCompat(options, iconURL, url) {
        if (typeof options === 'string') {
            return originalSetAuthor.call(this, { name: options, iconURL, url });
        }
        return originalSetAuthor.call(this, options);
    };

    const originalSetFooter = EmbedBuilder.prototype.setFooter;
    EmbedBuilder.prototype.setFooter = function setFooterCompat(options, iconURL) {
        if (typeof options === 'string') {
            return originalSetFooter.call(this, { text: options, iconURL });
        }
        return originalSetFooter.call(this, options);
    };

    const originalSetColor = EmbedBuilder.prototype.setColor;
    EmbedBuilder.prototype.setColor = function setColorCompat(color) {
        return originalSetColor.call(this, resolveColor(color));
    };

    if (!EmbedBuilder.prototype.attachFiles) {
        EmbedBuilder.prototype.attachFiles = function attachFilesCompat(files) {
            this._compatFiles = Array.isArray(files) ? files : [files];
            return this;
        };
    }

    if (!GuildMember.prototype.hasPermission) {
        GuildMember.prototype.hasPermission = function hasPermissionCompat(permission) {
            return this.permissions.has(resolvePermission(permission));
        };
    }

    if (!Guild.prototype.fetchBans) {
        Guild.prototype.fetchBans = function fetchBansCompat() {
            return this.bans.fetch();
        };
    }

    const originalUserDisplayAvatarURL = User.prototype.displayAvatarURL;
    User.prototype.displayAvatarURL = function displayAvatarURLCompat(options = {}) {
        const nextOptions = { ...options };
        if (nextOptions.format && !nextOptions.extension) {
            nextOptions.extension = nextOptions.format;
            delete nextOptions.format;
        }
        return originalUserDisplayAvatarURL.call(this, nextOptions);
    };

    patchSend(TextChannel);
    patchSend(NewsChannel);
    patchSend(ThreadChannel);
    patchSend(DMChannel);

    const originalReply = Message.prototype.reply;
    Message.prototype.reply = function replyCompat(payload) {
        return originalReply.call(this, normalizePayload(payload));
    };

    const originalEdit = Message.prototype.edit;
    Message.prototype.edit = function editCompat(payload) {
        return originalEdit.call(this, normalizePayload(payload));
    };

    return Discord;
}

function resolvePermission(permission) {
    const legacyPermissions = {
        ADMINISTRATOR: PermissionsBitField.Flags.Administrator,
        BAN_MEMBERS: PermissionsBitField.Flags.BanMembers,
        KICK_MEMBERS: PermissionsBitField.Flags.KickMembers,
        MANAGE_CHANNELS: PermissionsBitField.Flags.ManageChannels,
        MANAGE_GUILD: PermissionsBitField.Flags.ManageGuild,
        MANAGE_MESSAGES: PermissionsBitField.Flags.ManageMessages,
        MANAGE_ROLES: PermissionsBitField.Flags.ManageRoles,
        SEND_MESSAGES: PermissionsBitField.Flags.SendMessages,
        ADD_REACTIONS: PermissionsBitField.Flags.AddReactions,
        VIEW_CHANNEL: PermissionsBitField.Flags.ViewChannel,
    };

    return legacyPermissions[permission] || PermissionsBitField.Flags[permission] || permission;
}

function resolveColor(color) {
    if (typeof color !== 'string') return color;

    const legacyColors = {
        DEFAULT: 0x000000,
        WHITE: 0xffffff,
        AQUA: 0x1abc9c,
        GREEN: 0x57f287,
        BLUE: 0x3498db,
        YELLOW: 0xfee75c,
        PURPLE: 0x9b59b6,
        LUMINOUS_VIVID_PINK: 0xe91e63,
        FUCHSIA: 0xeb459e,
        GOLD: 0xf1c40f,
        ORANGE: 0xe67e22,
        RED: 0xed4245,
        GREY: 0x95a5a6,
        NAVY: 0x34495e,
        DARK_AQUA: 0x11806a,
        DARK_GREEN: 0x1f8b4c,
        DARK_BLUE: 0x206694,
        DARK_PURPLE: 0x71368a,
        DARK_VIVID_PINK: 0xad1457,
        DARK_GOLD: 0xc27c0e,
        DARK_ORANGE: 0xa84300,
        DARK_RED: 0x992d22,
        DARK_GREY: 0x979c9f,
        DARKER_GREY: 0x7f8c8d,
        LIGHT_GREY: 0xbcc0c0,
        DARK_NAVY: 0x2c3e50,
        BLURPLE: 0x5865f2,
        GREYPLE: 0x99aab5,
        DARK_BUT_NOT_BLACK: 0x2c2f33,
        NOT_QUITE_BLACK: 0x23272a,
    };

    if (color.toUpperCase() === 'RANDOM') {
        return Math.floor(Math.random() * 0xffffff);
    }

    return legacyColors[color.toUpperCase()] ?? color;
}

function patchSend(ChannelClass) {
    if (!ChannelClass?.prototype?.send || ChannelClass.prototype._v12SendCompat) return;

    const originalSend = ChannelClass.prototype.send;
    ChannelClass.prototype.send = function sendCompat(payload) {
        return originalSend.call(this, normalizePayload(payload));
    };
    ChannelClass.prototype._v12SendCompat = true;
}

function normalizePayload(payload) {
    if (payload instanceof EmbedBuilder) {
        const files = payload._compatFiles || [];
        return files.length > 0 ? { embeds: [payload], files } : { embeds: [payload] };
    }

    if (payload instanceof AttachmentBuilder) {
        return { files: [payload] };
    }

    if (payload && payload.embed) {
        return { embeds: [payload.embed] };
    }

    if (payload && payload.embeds) {
        return payload;
    }

    return payload;
}

module.exports = patchDiscordCompat;
