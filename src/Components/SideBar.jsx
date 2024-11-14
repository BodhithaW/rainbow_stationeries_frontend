import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav, { Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <SideNav
            onSelect={(selected) => {
                const to = '/' + selected;
                if (window.location.pathname !== to) {
                    navigate(to);
                }
            }}
            style={{ backgroundColor: '#3B1E54', color: '#ecf0f1', fontSize: '1.2em' }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="dashboard">
                <NavItem eventKey="dashboard">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', color: '#ecf0f1' }} />
                    </NavIcon>
                    <NavText>Dashboard</NavText>
                </NavItem>
                
                <NavItem eventKey="register">
                    <NavIcon>
                        <i className="fa fa-fw fa-user" style={{ fontSize: '1.75em', color: '#ecf0f1' }} />
                    </NavIcon>
                    <NavText>Users</NavText>
                </NavItem>
                
                <NavItem eventKey="categories">
                    <NavIcon>
                        <i className="fa fa-fw fa-list" style={{ fontSize: '1.75em', color: '#ecf0f1' }} />
                    </NavIcon>
                    <NavText>Categories</NavText>
                </NavItem>

                {/* Product Menu with Submenu */}
                <NavItem eventKey="product">
                    <NavIcon>
                        <i className="fa fa-fw fa-box" style={{ fontSize: '1.75em', color: '#ecf0f1' }} />
                    </NavIcon>
                    <NavText>Product</NavText>
                    <NavItem eventKey="product/addproduct">
                        <NavText>Add Product</NavText>
                    </NavItem>
                    <NavItem eventKey="dashboard">
                        <NavText>View Products</NavText>
                    </NavItem>
                </NavItem>

                {/* Store Menu with Submenu */}
                <NavItem eventKey="store">
                    <NavIcon>
                        <i className="fa fa-fw fa-box" style={{ fontSize: '1.75em', color: '#ecf0f1' }} />
                    </NavIcon>
                    <NavText>Store</NavText>
                    <NavItem eventKey="store/add-store">
                        <NavText>Add Store</NavText>
                    </NavItem>
                    <NavItem eventKey="dashboard">
                        <NavText>View Store</NavText>
                    </NavItem>
                </NavItem>

                {/* Invoices Menu with Submenu */}
                <NavItem eventKey="invoices">
                    <NavIcon>
                        <i className="fa fa-fw fa-file-invoice" style={{ fontSize: '1.75em', color: '#ecf0f1' }} />
                    </NavIcon>
                    <NavText>Invoices</NavText>
                    <NavItem eventKey="invoices/add-invoices">
                        <NavText>Add Invoice</NavText>
                    </NavItem>
                    <NavItem eventKey="invoices/pending-invoices">
                        <NavText>Pending Invoices</NavText>
                    </NavItem>
                    <NavItem eventKey="invoices/view-invoices">
                        <NavText>View Invoices</NavText>
                    </NavItem>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    );
};

export default Sidebar;
