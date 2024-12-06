import { Outlet } from 'react-router-dom';
import AdminSidebar from './sidebar';
import AdminHeader from './header';

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen w-full'>
      {/* sidebar */}
      <AdminSidebar />
      <div className='flex flex-1 flex-col'>
        {/* header */}
        <AdminHeader />
        <main className='flex-1 flex bg-muted/40 p-4 md:p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
