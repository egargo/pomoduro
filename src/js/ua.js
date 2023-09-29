export const checkUA = () => {
    if (navigator.userAgent.match(/(Android|iPhone)/i)) {
        return false;
    }

    return true;
}
