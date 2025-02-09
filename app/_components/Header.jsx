export default function Header() {
  return (
    <header className="bg-green-900 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src="https://th.bing.com/th/id/OIP.fyFuEMr9oQl5ADIsv5WPyQHaJY?rs=1&pid=ImgDetMain" alt="Logo" className="h-10 mr-4" />
          <h1 className="text-2xl font-bold text-white">Electoral Sponsor Pro</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <a href="/" className="text-white hover:text-green-300">Homepage</a>
          <a href="/loadvoterslist" className="text-white hover:text-green-300">Load Voters List</a>
          <a href="/confirmation-screen" className="text-white hover:text-green-300">Confirmation Screen</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="bg-white hover:bg-green-200 text-green-600 font-semibold py-2 px-4 rounded">
            Profile
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
            Help
          </button>
        </div>
      </div>
    </header>
  );
}