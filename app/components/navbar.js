'use client';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth'; 
import { auth } from '../Lib/firebase';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      router.push('/SignIn');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-orange-500 p-4 fixed top-0 left-0 w-full z-50 shadow-xl font-custom">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-16 w-16 mr-2 shadow-xl" />
          <span className="text-white text-2xl font-bold"> Electrical Consulting </span>
        </div>

        <div className="space-x-8 flex items-center">
          <a href="/Main" className="text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">Home</a>
          <a href="/About" className="text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">About</a>
          <a href="/projects" className="text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">Projects</a>
          <a href="/contact" className="text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">Contact Us</a>
          <button 
            onClick={handleLogout} 
            className="text-orange-500 text-xl font-bold bg-white hover:bg-white hover:rounded-lg p-2 transition-all duration-300"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;