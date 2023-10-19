import { Outlet } from "react-router-dom";

const GuestLayout = () => {
    return (
        <div>
            GuestLayout
            <div>Apenas visitantes</div>
            <Outlet />
        </div>
    );
};

export default GuestLayout;
