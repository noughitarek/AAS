import { useEffect, useRef, FormEventHandler } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminGuestLayout from '@/Layouts/AdminGuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ErrorMessage from '@/Components/ErrorMessage';
import logo from '@/assets/images/logo-full.png';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: 'system@aas.ecoshark.org',
        password: 'password',
        remember: true,
    });

    const emailRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {

            onFinish: () => reset('password'),
        });
    };

    return (
        <AdminGuestLayout>
            <Head title="Log in" />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className="authincation h-100">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-md-6">
                            <div className="authincation-content">
                                <div className="row no-gutters">
                                    <div className="col-xl-12">
                                        <div className="auth-form">
                                            <div className="text-center mb-3">
                                                <a href={route('dashboard')}><img src={logo} alt="ASS" /></a>
                                            </div>
                                            <h4 className="text-center mb-4">Sign in your account</h4>
                                            <form onSubmit={submit}>
                                                <div className="mb-3">
                                                    <label className="mb-1"><strong>Email</strong></label>
                                                    <input 
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        value={data.email}
                                                        className="form-control"
                                                        autoComplete="username"
                                                        ref={emailRef}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                    />
                                                    <ErrorMessage message={errors.email}/>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="mb-1"><strong>Password</strong></label>
                                                    <input
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        value={data.password}
                                                        className="form-control"
                                                        autoComplete="current-password"
                                                        onChange={(e) => setData('password', e.target.value)}
                                                    />
                                                    <ErrorMessage message={errors.password}/>
                                                </div>
                                                <div className="row d-flex justify-content-between mt-4 mb-2">
                                                    <div className="mb-3">
                                                        <div className="form-check custom-checkbox ms-1">
                                                            <input 
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                id="remember"
                                                                name="remember"
                                                                checked={data.remember}
                                                                onChange={(e) => setData('remember', e.target.checked)}
                                                            />
                                                            <label className="form-check-label" htmlFor="remember">Remember me</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button disabled={processing} className="btn btn-primary btn-block">Log in</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AdminGuestLayout>
    );
}
