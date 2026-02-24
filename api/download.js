export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const instances = [
        'https://cobalt.shaka.video',
        'https://co.wuk.sh',
        'https://cobalt.perv.it',
        'https://api.cobalt.tools'
    ];

    let lastError = null;

    for (const instance of instances) {
        try {
            // Try both root / and /api/json as different instances have different setups
            const endpoints = ['/api/json', '/'];

            for (const endpoint of endpoints) {
                try {
                    const response = await fetch(`${instance}${endpoint}`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                        },
                        body: JSON.stringify(req.body)
                    });

                    if (!response.ok) continue;

                    const data = await response.json();

                    if (data.status !== 'error') {
                        return res.status(200).json(data);
                    }
                    lastError = data.text || 'Instance error';
                } catch (innerErr) {
                    lastError = innerErr.message;
                    continue;
                }
            }
        } catch (err) {
            lastError = err.message;
        }
    }

    res.status(500).json({ status: 'error', text: lastError || 'All download servers failed to respond.' });
}
