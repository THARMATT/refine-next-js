import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
  <>
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome ji</h1>
      <div className="flex space-x-4">
        <Link href="/signup">
          <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Sign Up
          </div>
        </Link>
        <Link href="/signin">
          <div className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Sign In
          </div>
        </Link>
      </div>
    </div>
  </>
  );
}
