import Navbar from "../components/navbar";  
import ChatWithAdmin from "../components/chatWithAdmin";

const MainPage = () => {
  return (
    <div>
      <Navbar />
      <header
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/backgroundMain.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
        <div className="relative text-center z-10">
          <h1 className="text-5xl font-bold text-orange-500 mb-4">
            Your Vision Wired to Perfection
          </h1>
          <p className="text-white mb-8">
            Delivering Advanced Electrical Engineering Solutions to Power your Success.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/Appointment" className="block w-full rounded bg-white px-12 py-3 text-lg font-medium text-orange-500 shadow-lg hover:bg-gray-600 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
              Book an Appointment
            </a>
          </div>
        </div>
      </header>
      <ChatWithAdmin />
    </div>
  );
};

export default MainPage;
