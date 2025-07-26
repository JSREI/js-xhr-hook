// 配置你的 API 信息
const API_KEY = 'your_api_key_here'; // 替换为你的实际 API 密钥
const API_URL = 'https://api.deepseek.com/v1/chat/completions'; // 确认实际 API 端点

function callDeepSeekAPI(prompt) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: 'POST',
            url: API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            data: JSON.stringify({
                model: 'deepseek-chat', // 根据实际模型调整
                messages: [{
                    role: 'user',
                    content: prompt
                }],
                max_tokens: 500
            }),
            onload: function (response) {
                if (response.status >= 200 && response.status < 300) {
                    try {
                        const data = JSON.parse(response.responseText);
                        resolve(data.choices[0].message.content);
                    } catch (e) {
                        reject('解析响应失败');
                    }
                } else {
                    reject(`API 请求失败，状态码：${response.status}`);
                }
            },
            onerror: function (error) {
                reject(`请求错误：${error}`);
            }
        });
    });
}

