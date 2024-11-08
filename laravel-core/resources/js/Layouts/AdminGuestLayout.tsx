import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';

export default function AdminGuest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/" className="flex mr-auto">
                    <img className="w-20 h-20 fill-current text-gray-500" src="/dist/images/aas.png"/>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}