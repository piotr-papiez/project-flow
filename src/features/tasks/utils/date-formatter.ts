export default function formatDate(legacyDate: string): string | null {
    if (!legacyDate) return null;
    
    const newDate = new Date(legacyDate);

    if (isNaN(newDate.getTime())) return null;

    const months = [
        "stycznia", "lutego", "marca", "kwietnia",
        "maja", "czerwca", "lipca", "sierpnia",
        "września", "października", "listopada", "grudnia"
    ];

    const formattedDate =
        `${newDate.getDay()} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`;

    return formattedDate;
}