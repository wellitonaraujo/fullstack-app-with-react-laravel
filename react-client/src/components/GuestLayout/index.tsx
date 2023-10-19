import React from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
    return (
        <div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default DefaultLayout;
