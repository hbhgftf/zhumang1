import { marked } from './lib-marked';

const rendererMD = new marked.Renderer();
rendererMD.image = (href, title, text) => {
    return `
        <img src="${href}" alt="${text}" style="max-width: 100%;">
    `;
}
rendererMD.link = (href, title, text) => {
    // a 标签 href 如果异常（包含非 ASCII 字符），则当成普通文本处理
    if (href && /[^\x00-\x7F]/g.test(href)) {
        return text;
    }
    return `<a target="_blank" rel="noreferrer noopenner" class="message-marked_link" href="${href || ''}" title="${title}">${text}</a>`;
}

marked.setOptions({
    gfm: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
});

// uni-app 的 jscore 版本比较低，不支持 Unicode 属性
// marked 库v4.0起使用了 /\p{L}\p{N}/gu 等 Unicode 属性正则表达式，这些特性在 ES2018 引入，低版本 jscore 不支持，会报错
// 使用传统的正则代替，以规避问题

// uni-app android 不支持 marked v7.0.5 或更高版本（会白屏，uni-app ios 可以用，为了更好的兼容性，目前都用 marked v4.0）
export const parseMarkdown = (text: string) => {
    return marked.parse(text, { renderer: rendererMD });
};
