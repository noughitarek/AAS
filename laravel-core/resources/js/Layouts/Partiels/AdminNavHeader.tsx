import React from 'react';

const AdminNavHeader: React.FC = () => {
    return (
        <div className="nav-header">
            <a href="index.html" className="brand-logo">
                <div className="brand-title">
                    <h2>Workload</h2>
                    <span className="brand-sub-title">Project Management Admin</span>
                </div>
            </a>
            <div className="nav-control">
                <div className="hamburger">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
            </div>
        </div>
    );
};

export default AdminNavHeader;
