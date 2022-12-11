export function copyToClipboard(content: string) {
    window.navigator.clipboard.writeText(content)
}