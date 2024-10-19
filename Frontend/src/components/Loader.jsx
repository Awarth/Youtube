import "../App.css";
function Loader() {
  return (
    <>
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-28 h-28 border-8 animate-spin flex items-center justify-center border-t-[#3AAFB9] rounded-full"></div>
      </div>
    </>
  );
}

export default Loader;
