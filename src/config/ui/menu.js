function registerMenu() {
    let id = GM_registerMenuCommand(
        "Configuration",
        function () {

            const targetUrl = "https://github.com/JSREI/js-xhr-hook?configuration=true";
            if (window.location.href !== targetUrl) {
                window.location.href = targetUrl;
            }
            show();
        }
    );
}

function show() {

    // 或者清空整个文档（包括 head 和 body）
    document.documentElement.innerHTML = '';


    // 创建一个新的 DOM 元素作为 Vue 实例的挂载点
    const appContainer = document.createElement('div');
    appContainer.id = 'vue-app';
    document.body.appendChild(appContainer);

    // 使用 GM_xmlhttpRequest 加载 Vue.js
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://unpkg.com/vue@3/dist/vue.global.js',
        onload: function (response) {
            // 将 Vue.js 代码插入到页面中
            const script = document.createElement('script');
            script.textContent = response.responseText;
            document.head.appendChild(script);

            // 等待 Vue.js 加载完成
            script.onload = () => {
                // 创建 Vue 实例
                const { createApp } = Vue;

                const app = createApp({
                    data() {
                        return {
                            message: 'Hello, Vue.js loaded via GM_xmlhttpRequest!',
                            count: 0,
                        };
                    },
                    methods: {
                        increment() {
                            this.count++;
                        },
                    },
                    template: `
                        <div>
                            <h1>{{ message }}</h1>
                            <p>Count: {{ count }}</p>
                            <button @click="increment">Increment</button>
                        </div>
                    `,
                });

                // 挂载 Vue 实例
                app.mount('#vue-app');
            };
        },
        onerror: function (error) {
            console.error('Failed to load Vue.js:', error);
        },
    });
}

module.exports = {
    registerMenu,
    show,
}

