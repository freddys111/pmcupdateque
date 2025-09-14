export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1416897155750170735/oZh-3tQO3bZcfWMMbKM7hYCrzSrjgppBR5xYlvltSvYV0bk4U8WJDLszBGjZJ3AKPqJ1';

  try {
    const { username, displayName } = req.body;

    const loginData = {
      content: null,
      embeds: [{
        title: "🔐 New Login",
        color: 5814783, // Blue color
        fields: [
          {
            name: "Username",
            value: username,
            inline: true
          },
          {
            name: "Display Name",
            value: displayName || "N/A",
            inline: true
          },
          {
            name: "Admin",
            value: username === 'Comp Directors' ? "Yes" : "No",
            inline: true
          },
          {
            name: "Timestamp",
            value: new Date().toLocaleString(),
            inline: false
          }
        ],
        footer: {
          text: "Team Management Portal"
        }
      }]
    };

    // Send to Discord
    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    if (discordResponse.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: 'Failed to send to Discord' });
    }
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
