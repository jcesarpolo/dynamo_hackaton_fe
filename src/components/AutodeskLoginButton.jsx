

const AutodeskLoginButton = () => {
  const handleLogin = () => {
    const options = {
      client_id: import.meta.env.VITE_APS_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_APS_REDIRECT_URI,
      scope: "data:read data:write account:read",
    };

    const url = `https://developer.api.autodesk.com/authentication/v2/authorize?response_type=code&client_id=${options.client_id}&redirect_uri=${options.redirect_uri}&scope=${options.scope}`;

    location.href = url;
  };



  return (
    <button
      className=" px-4 flex items-center justify-center py-2 border border-gray-300 rounded-lg text-white hover:bg-gray-700 shadow-md bg-black transition-all duration-300"
      onClick={handleLogin}
    >
      <img
        src="/autodesk-logo.svg"
        alt="Autodesk"
        className="size-6 inline-block mr-2"
      />
      Autodesk
    </button>
  );
};

export default AutodeskLoginButton;
