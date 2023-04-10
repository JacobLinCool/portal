# Portal

Create simple landing / profile page.

## How to Use

### GitHub

Add `portal.json` to repository `username/username`.

The content of `portal.json` should be like this:

```json
{
    "background": "https://storage.jacoblin.cool/unicourse-bg.png",
    "blocks": [
        {
            "block": "head",
            "permission": 0,
            "display": "Jacob Lin",
            "avatar": "https://storage.jacoblin.cool/avatar.jpg"
        },
        {
            "block": "chat",
            "permission": 0,
            "greeting": "👋 嗨！我是林振可（Jacob Lin），目前就讀於師大資工\n我喜歡設計些有趣的程式 🎨"
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

> You can see [my `portal.json`](https://github.com/JacobLinCool/JacobLinCool/blob/main/portal.json) for more details.

Then, visit <https://ptl.pages.dev/gh/username>. (Or <https://portal.csie.cool/gh/username>)

## Supported Blocks

- [x] `head` - Display user's avatar and name.
- [x] `chat` - PortalGPT chatroom.
- [x] `action` - Display links.
- [x] `carousel` - Display auto-sliding images (with links).
- [x] `iframe` - Display iframe.
- [ ] `code` - Display a code block.
- [ ] [Waiting for your suggestion!](https://github.com/JacobLinCool/portal/issues/new?title=%5BFeature%20Request%5D%20%22Cool%22%20Block)
