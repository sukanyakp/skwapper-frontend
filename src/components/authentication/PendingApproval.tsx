const PendingApproval = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white px-4">
      <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md space-y-4 text-center">
        <h2 className="text-xl font-bold">Application Submitted!</h2>
        <p className="text-sm text-gray-400">
          Your application is under review. You'll be notified once an admin approves your account.
        </p>
        <p className="text-xs text-cyan-400">Thank you for your patience.</p>
      </div>
    </div>
  );
};

export default PendingApproval;
