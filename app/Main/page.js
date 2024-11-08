import Navbar from "../components/navbar";  
import ChatWithAdmin from "../components/chatWithAdmin";  // Import the ChatWithAdmin component

const MainPage = () => {
  // In a real-world app, the user ID would be dynamic (likely from a login/auth system)
  const userId = 'user123'; // Static user ID for now, replace this with dynamic user authentication logic

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      
      {/* Main content area, adjusted to fit within one screen */}
      <div className="flex-grow flex flex-col items-center justify-center bg-cover bg-center relative" 
           style={{ backgroundImage: "url('/backgroundMain.jpg')" }}>
        
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
        
        {/* Main content */}
        <div className="relative text-center z-10 max-w-full px-4">
          <h1 className="text-5xl font-bold text-orange-500 mb-4 whitespace-nowrap">
            Your Vision Wired to Perfection
          </h1>
          <p className="text-white mb-8 text-lg whitespace-nowrap">
            Delivering Advanced Electrical Engineering Solutions to Power your Success
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <a href="/Appointment" className="rounded bg-white px-12 py-3 text-lg font-medium text-orange-500 shadow-lg hover:bg-gray-600 focus:outline-none focus:ring active:bg-rose-500">
              Book an Appointment
            </a>
          </div>
          
          {/* Survey invitation text */}
          <p className="text-white text-sm mt-6 opacity-80">
            <span>Want to earn points? </span>
            <a href="/survey" className="text-orange-300 font-semibold hover:underline">
              Take our survey
            </a>
          </p>
        </div>
      </div>

      {/* Chat component */}
      <div className="relative z-10">
        <ChatWithAdmin userId={userId} />
      </div>
    </div>
  );
};

export default MainPage;
