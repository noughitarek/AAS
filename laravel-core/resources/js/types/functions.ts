export const formatTimeDifference = (timestamp: number): string => {
    const now = Date.now();
    const difference = now - timestamp;

    const secondsInMs = 1000;
    const minutesInMs = 60 * secondsInMs;
    const hoursInMs = 60 * minutesInMs;
    const daysInMs = 24 * hoursInMs;

    if (difference < minutesInMs) {
        return "few seconds ago";
    } else if (difference < hoursInMs) {
        const minutes = Math.floor(difference / minutesInMs);
        return `${minutes} minutes ago`;
    } else if (difference < daysInMs) {
        const hours = Math.floor(difference / hoursInMs);
        return `${hours} hours ago`;
    } else {
        const days = Math.floor(difference / daysInMs);
        return `${days} days ago`;
    }
};

export const mostRecentActivity = (data: any[]): any | null => {
    return data.length > 0
        ? data.reduce((latest, elem) =>
            new Date(elem.updated_at).getTime() > new Date(latest.updated_at).getTime() ? elem : latest
        )
        : null;
};

export const lastActivityBy = (data: any[]): string | null => {
    const recentActivity = mostRecentActivity(data);
    return recentActivity ? (recentActivity.updated_by ? recentActivity.updated_by.name : null) : null;
};

export const lastActivityAt = (data: any[]): string | null => {
    const recentActivity = mostRecentActivity(data);
    return recentActivity ? formatTimeDifference(new Date(recentActivity.updated_at).getTime()) : null;
};