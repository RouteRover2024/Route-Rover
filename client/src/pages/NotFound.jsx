// NotFound.js
import { Link } from "react-router-dom";

const NotFound = ({ link }) => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
			<p className="text-lg text-wrap text-center">
				Sorry, the page you are looking for does not exist.
			</p>
			<Link
				to={link}
				className="my-4 inline-flex items-center px-4 py-2 border-transparent shadow-sm text-sm font-medium rounded-md bg-gradient-to-r from-blue-600 to-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white"
			>
				Back to Home
			</Link>
		</div>
	);
};

export default NotFound;
