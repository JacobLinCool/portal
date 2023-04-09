# portal

Create simple landing / profile page.

## How to use

### GitHub

Add `portal.json` to repository `username/username`.

For example:

```json
{
    "blocks": [
        {
            "block": "head",
            "permission": 0,
            "display": "Jacob Lin",
            "avatar": "https://storage.jacoblin.cool/avatar.jpg",
            "description": "👋 嗨！我是林振可（Jacob Lin），目前就讀於師大資工。我喜歡寫些有趣的東西"
        },
        {
            "block": "action",
            "title": "你可以在這些地方找到我～",
            "permission": 0,
            "actions": [
                {
                    "display": {
                        "icon": "mdi:github",
                        "text": "GitHub",
                        "color": ""
                    },
                    "handle": {
                        "type": "link",
                        "value": "https://github.com/JacobLinCool"
                    }
                },
                {
                    "display": {
                        "icon": "mdi:linkedin",
                        "text": "LinkedIn",
                        "color": "210 90% 40%"
                    },
                    "handle": {
                        "type": "link",
                        "value": "https://www.linkedin.com/in/jacoblincool/"
                    }
                },
                {
                    "display": {
                        "icon": "carbon:logo-discord",
                        "text": "Discord",
                        "color": "235 86% 65%"
                    },
                    "handle": {
                        "type": "link",
                        "value": "https://discord.gg/Ff8q2SGut2"
                    }
                }
            ]
        }
    ]
}
```

Then, visit `https://門.pages.dev/gh/username`. (Or `https://portal.csie.cool/gh/username`)
