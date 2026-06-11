async function getRandomRedditImage(subreddit) {
    const response = await fetch(`https://meme-api.com/gimme/${encodeURIComponent(subreddit)}`);

    if (!response.ok) {
        throw new Error(`Meme API request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (!data.url || data.nsfw || data.spoiler) {
        throw new Error(`No image posts found in r/${subreddit}`);
    }

    return {
        image: data.url,
        title: data.title || subreddit,
        url: data.postLink || `https://reddit.com/r/${subreddit}`,
    };
}

module.exports = {
    getRandomRedditImage,
};
