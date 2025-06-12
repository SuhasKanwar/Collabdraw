export default function AuthPage( { isSignin } : { isSignin: boolean }) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">
            {isSignin ? 'Sign In' : 'Sign Up'}
            </h1>
            {isSignin ? (
            <p className="text-gray-600 text-center mb-4">Please sign in to continue.</p>
            ) : (
            <p className="text-gray-600 text-center mb-4">Create a new account to get started.</p>
            )}
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full p-2 border border-gray-300 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" className="w-full p-2 border border-gray-300 rounded" required />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    {isSignin ? 'Sign In' : 'Sign Up'}
                </button>
            </form>
        </div>
        </div>
    );  
}