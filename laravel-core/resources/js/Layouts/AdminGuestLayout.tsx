import { PropsWithChildren } from 'react';
import '../assets/css/style.css';

export default function AdminGuest({ children }: PropsWithChildren) {
    return (
        <div className="vh-100">
            {children}
            <script src="./assets/vendor/global/global.min.js"></script>
            <script src="./assets/js/custom.min.js"></script>
            <script src="./assets/js/dlabnav-init.js"></script>
	        <script src="./assets/js/styleSwitcher.js"></script>
        </div>
    );
}
