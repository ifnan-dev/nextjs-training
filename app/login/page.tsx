export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1>Login</h1>
      <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
      </form>
    </div>
  );
}
