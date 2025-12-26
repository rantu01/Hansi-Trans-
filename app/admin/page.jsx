export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome Admin 👋</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500 text-sm">Total Pages</p>
          <p className="text-2xl font-bold">5</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500 text-sm">Site Status</p>
          <p className="text-green-600 font-bold">Live</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500 text-sm">Last Update</p>
          <p className="font-medium">Just now</p>
        </div>
      </div>
    </div>
  );
}
