import { RingLoader } from "react-spinners";
const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {/* <FadeLoader color="#071f68" /> */}
      <RingLoader color="#071f68" size={80} />
    </div>
  );
};

export default Loader;
