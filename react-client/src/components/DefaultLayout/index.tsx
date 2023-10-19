import React from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
    return (
        <div>
            Default
            <div>Apenas LOGADOS</div>
            <Outlet />
        </div>
    );
};

export default DefaultLayout;
