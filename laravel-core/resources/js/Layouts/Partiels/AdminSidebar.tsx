import React from 'react';

const AdminSidebar: React.FC = () => {
    return (<div className="dlabnav">
        <div className="dlabnav-scroll">
            <ul className="metismenu" id="menu">
                <li>
                    <a
                        className="has-arrow "
                        href="#"
                        aria-expanded="false"
                    >
                        <i className="fas fa-home" />
                        <span className="nav-text">Dashboard</span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="index.html">Dashboard Light</a>
                        </li>
                        <li>
                            <a href="index-2.html">Dashboard Dark</a>
                        </li>
                        <li>
                            <a href="kanban.html">Kanban</a>
                        </li>
                        <li>
                            <a href="clients.html">Clients</a>
                        </li>
                        <li>
                            <a href="project-details.html">Project Details</a>
                        </li>
                        <li>
                            <a href="message.html">Messages</a>
                        </li>
                        <li>
                            <a href="latest-activity.html">Latest Activity</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a
                        className="has-arrow "
                        href="#"
                        aria-expanded="false"
                    >
                        <i className="fas fa-info-circle" />
                        <span className="nav-text">Apps</span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="./app-profile.html">Profile</a>
                        </li>
                        <li>
                            <a href="./post-details.html">Post Details</a>
                        </li>
                        <li>
                            <a
                                className="has-arrow"
                                href="#"
                                aria-expanded="false"
                            >
                                Email
                            </a>
                            <ul aria-expanded="false">
                                <li>
                                    <a href="./email-compose.html">Compose</a>
                                </li>
                                <li>
                                    <a href="./email-inbox.html">Inbox</a>
                                </li>
                                <li>
                                    <a href="./email-read.html">Read</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="./app-calender.html">Calendar</a>
                        </li>
                        <li>
                            <a
                                className="has-arrow"
                                href="#"
                                aria-expanded="false"
                            >
                                Shop
                            </a>
                            <ul aria-expanded="false">
                                <li>
                                    <a href="./ecom-product-grid.html">Product Grid</a>
                                </li>
                                <li>
                                    <a href="./ecom-product-list.html">Product List</a>
                                </li>
                                <li>
                                    <a href="./ecom-product-detail.html">Product Details</a>
                                </li>
                                <li>
                                    <a href="./ecom-product-order.html">Order</a>
                                </li>
                                <li>
                                    <a href="./ecom-checkout.html">Checkout</a>
                                </li>
                                <li>
                                    <a href="./ecom-invoice.html">Invoice</a>
                                </li>
                                <li>
                                    <a href="./ecom-customers.html">Customers</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <a
                        className="has-arrow "
                        href="#"
                        aria-expanded="false"
                    >
                        <i className="fas fa-chart-line" />
                        <span className="nav-text">Charts</span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="./chart-flot.html">Flot</a>
                        </li>
                        <li>
                            <a href="./chart-morris.html">Morris</a>
                        </li>
                        <li>
                            <a href="./chart-chartjs.html">Chartjs</a>
                        </li>
                        <li>
                            <a href="./chart-chartist.html">Chartist</a>
                        </li>
                        <li>
                            <a href="./chart-sparkline.html">Sparkline</a>
                        </li>
                        <li>
                            <a href="./chart-peity.html">Peity</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a
                        className="has-arrow "
                        href="#"
                        aria-expanded="false"
                    >
                        <i className="fab fa-bootstrap" />
                        <span className="nav-text">Bootstrap</span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="./ui-accordion.html">Accordion</a>
                        </li>
                        <li>
                            <a href="./ui-alert.html">Alert</a>
                        </li>
                        <li>
                            <a href="./ui-badge.html">Badge</a>
                        </li>
                        <li>
                            <a href="./ui-button.html">Button</a>
                        </li>
                        <li>
                            <a href="./ui-modal.html">Modal</a>
                        </li>
                        <li>
                            <a href="./ui-button-group.html">Button Group</a>
                        </li>
                        <li>
                            <a href="./ui-list-group.html">List Group</a>
                        </li>
                        <li>
                            <a href="./ui-card.html">Cards</a>
                        </li>
                        <li>
                            <a href="./ui-carousel.html">Carousel</a>
                        </li>
                        <li>
                            <a href="./ui-dropdown.html">Dropdown</a>
                        </li>
                        <li>
                            <a href="./ui-popover.html">Popover</a>
                        </li>
                        <li>
                            <a href="./ui-progressbar.html">Progressbar</a>
                        </li>
                        <li>
                            <a href="./ui-tab.html">Tab</a>
                        </li>
                        <li>
                            <a href="./ui-typography.html">Typography</a>
                        </li>
                        <li>
                            <a href="./ui-pagination.html">Pagination</a>
                        </li>
                        <li>
                            <a href="./ui-grid.html">Grid</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a
                        className="has-arrow "
                        href="#"
                        aria-expanded="false"
                    >
                        <i className="fas fa-heart" />
                        <span className="nav-text">Plugins</span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="./uc-select2.html">Select 2</a>
                        </li>
                        <li>
                            <a href="./uc-nestable.html">Nestedable</a>
                        </li>
                        <li>
                            <a href="./uc-noui-slider.html">Noui Slider</a>
                        </li>
                        <li>
                            <a href="./uc-sweetalert.html">Sweet Alert</a>
                        </li>
                        <li>
                            <a href="./uc-toastr.html">Toastr</a>
                        </li>
                        <li>
                            <a href="./map-jqvmap.html">Jqv Map</a>
                        </li>
                        <li>
                            <a href="./uc-lightgallery.html">Light Gallery</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="widget-basic.html" className="" aria-expanded="false">
                        <i className="fas fa-user-check" />
                        <span className="nav-text">Widget</span>
                    </a>
                </li>
                <li>
                    <a
                        className="has-arrow "
                        href="#"
                        aria-expanded="false"
                    >
                        <i className="fas fa-file-alt" />
                        <span className="nav-text">Forms</span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="./form-element.html">Form Elements</a>
                        </li>
                        <li>
                            <a href="./form-wizard.html">Wizard</a>
                        </li>
                        <li>
                            <a href="./form-ckeditor.html">CkEditor</a>
                        </li>
                        <li>
                            <a href="form-pickers.html">Pickers</a>
                        </li>
                        <li>
                            <a href="form-validation.html">Form Validate</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a
                        className="has-arrow "
                        href="#"
                        aria-expanded="false"
                    >
                        <i className="fas fa-table" />
                        <span className="nav-text">Table</span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="table-bootstrap-basic.html">Bootstrap</a>
                        </li>
                        <li>
                            <a href="table-datatable-basic.html">Datatable</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a
                        className="has-arrow "
                        href="#"
                        aria-expanded="false"
                    >
                        <i className="fas fa-clone" />
                        <span className="nav-text">Pages</span>
                    </a>
                    <ul aria-expanded="false">
                        <li>
                            <a href="./page-login.html">Login</a>
                        </li>
                        <li>
                            <a href="./page-register.html">Register</a>
                        </li>
                        <li>
                            <a
                                className="has-arrow"
                                href="#"
                                aria-expanded="false"
                            >
                                Error
                            </a>
                            <ul aria-expanded="false">
                                <li>
                                    <a href="./page-error-400.html">Error 400</a>
                                </li>
                                <li>
                                    <a href="./page-error-403.html">Error 403</a>
                                </li>
                                <li>
                                    <a href="./page-error-404.html">Error 404</a>
                                </li>
                                <li>
                                    <a href="./page-error-500.html">Error 500</a>
                                </li>
                                <li>
                                    <a href="./page-error-503.html">Error 503</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="./page-lock-screen.html">Lock Screen</a>
                        </li>
                        <li>
                            <a href="./empty-page.html">Empty Page</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <div className="plus-box">
                <div className="text-center">
                    <h4 className="fs-18 font-w600 mb-4">
                        Enable Workload Automation System
                    </h4>
                    <a href="#" className="btn btn-primary btn-rounded">
                        Learn more <i className="fas fa-caret-right" />
                    </a>
                </div>
            </div>
            <div className="copyright">
                <p>
                    <strong>Workload Project Management</strong> © 2021 All Rights Reserved
                </p>
                <p className="fs-12">
                    Made with <span className="heart" /> by DexignLab
                </p>
            </div>
        </div>
    </div>
    )
}
export default AdminSidebar;