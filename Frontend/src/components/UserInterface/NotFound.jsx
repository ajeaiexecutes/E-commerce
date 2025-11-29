import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800 text-center">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-xl text-gray-600 mt-2 mb-6">Page Not Found</p>

      <Link
  to="/"
  className="
    px-4 py-2 text-sm        /* mobile */
    sm:px-5 sm:py-2 sm:text-base
    md:px-6 md:py-2 md:text-lg
    lg:px-8 lg:py-3 lg:text-xl
    border border-black text-black 
    uppercase tracking-widest 
    bg-white 
    hover:bg-black hover:text-white 
    transition duration-300
  "
>
  Go Home
</Link>

    </div>
  );
}

