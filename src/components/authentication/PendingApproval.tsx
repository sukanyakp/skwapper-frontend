const PendingApproval = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded">
        <h2 className="text-lg font-bold mb-2">Application Under Review</h2>
        <p className="text-sm text-gray-400">
          Your application is under review. You will be notified once the admin approves it.
        </p>
      </div>
    </div>
  );
};

export default PendingApproval;
