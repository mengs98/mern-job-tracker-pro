import { Outlet } from 'react-router-dom';

const LandingSharedLayout = () => {
  return (
    <>
      <h1>nav</h1>
      <Outlet />
    </>
  );
};

export default LandingSharedLayout;
