export default function Footer() {
  return (
    <footer className="bg-green-900 text-white py-10">
      <div className="container mx-auto px-6">
        {/* Logo et Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <img src="https://th.bing.com/th/id/OIP.fyFuEMr9oQl5ADIsv5WPyQHaJY?rs=1&pid=ImgDetMain" alt="Logo" className="h-10" />
            <h2 className="text-2xl font-bold">Electoral Sponsor Pro</h2>
          </div>
          <form className="flex items-center mt-4 md:mt-0">
            <input
              type="email"
              placeholder="Input your email"
              className="px-4 py-2 rounded-l bg-green-800 text-white border border-green-700 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-r"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Liens du footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left justify-center">
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li className="hover:text-green-400"><a href="#">Blog</a></li>
              <li className="hover:text-green-400"><a href="#">User guides</a></li>
              <li className="hover:text-green-400"><a href="#">Webinars</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li className="hover:text-green-400"><a href="#">About us</a></li>
              <li className="hover:text-green-400"><a href="#">Contact us</a></li>
            </ul>
          </div>
        </div>

        {/* Pied de page */}
        <div className="mt-8 text-green-400 text-center">
          <p>© 2025 Brand, Inc. - <a href="#" className="hover:text-green-300">Privacy</a> - <a href="#" className="hover:text-green-300">Terms</a> - <a href="#" className="hover:text-green-300">Sitemap</a></p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-green-300 text-xl"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-green-300 text-xl"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="hover:text-green-300 text-xl"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}