import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
        flashMessages?: {
            success?: string;
            error?: string;
        };
    }

    var route: typeof ziggyRoute;
}
