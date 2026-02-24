export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const instances = [
        'https://cobalt.shaka.video',
        'https://co.wuk.sh',
        'https://cobalt.smst.xyz'
    ];

    let lastError = null;

    for (const instance of instances) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 6000);

            const response = await fetch(`${instance}/api/json`, {
                method: 'POST',
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
                },
                body: JSON.stringify({
                    url: req.body.url,
                    videoQuality: req.body.videoQuality,
                    audioFormat: 'mp3',
                    isAudioOnly: req.body.isAudioOnly,
                    downloadMode: 'auto'
                })
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                lastError = `Server ${instance} status ${response.status}`;
                continue;
            }

            const data = await response.json();

            if (data.status !== 'error') {
                return res.status(200).json(data);
            }
            lastError = data.text || 'Instance error';
        } catch (err) {
            lastError = err.name === 'AbortError' ? `Busy node: ${instance}` : err.message;
            continue;
        }
    }

    res.status(500).json({ status: 'error', text: lastError || 'All download nodes are unavailable.' });
}
