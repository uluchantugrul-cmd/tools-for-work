export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const instances = [
        'https://cobalt.shaka.video',
        'https://co.wuk.sh',
        'https://api.cobalt.tools',
        'https://cobalt-api.zeat.me'
    ];

    let lastError = null;

    for (const instance of instances) {
        try {
            const response = await fetch(`${instance}/api/json`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body)
            });

            if (!response.ok) {
                continue;
            }

            const data = await response.json();

            if (data.status !== 'error') {
                return res.status(200).json(data);
            }

            lastError = data.text || 'Instance error';
        } catch (err) {
            lastError = err.message;
            console.error(`Proxy error for ${instance}:`, err);
        }
    }

    res.status(500).json({ status: 'error', text: lastError || 'All download servers failed to respond.' });
}
