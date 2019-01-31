export function isInFrame(): boolean {
    try {
        return window.self !== window.top;
    } catch (error) {
        return true;
    }
}
