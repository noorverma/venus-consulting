'use client'
import Navbar from "../components/navbar";  

const AdminPage = () => {
  return (
    <div>
      <Navbar />
      <header className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-orange-500 mb-4">Admin page</h1>
          <p className="text-gray-600 mb-8">Delivering Advanced Electrical Engineering Solutions to Power your Success.</p>
          <div className="flex justify-center space-x-4">
           
          </div>
        </div>
      </header>
    </div>
  );
};

export default AdminPage;
