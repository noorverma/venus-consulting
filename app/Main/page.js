import Navbar from "../components/navbar";  

const MainPage = () => {
  return (
    <div>
      <Navbar />
      <header className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-orange-500 mb-4">Your Vision Wired to Perfection</h1>
          <p className="text-gray-600 mb-8">Delivering Advanced Electrical Engineering Solutions to Power your Success.</p>
          <div className="flex justify-center space-x-4">
            <a href="/book-appointment" className="block w-full rounded bg-gray-900 px-12 py-3 text-lg font-medium text-orange-500 shadow-lg hover:bg-orange-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">Book an Appointment</a>
           
          </div>
        </div>
      </header>
    </div>
  );
};

export default MainPage;
