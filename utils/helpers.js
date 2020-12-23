module.exports.generateProfileColor = username => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${Math.max(130, Math.abs(hash) % 360)}, 97%, 60%)`;
}