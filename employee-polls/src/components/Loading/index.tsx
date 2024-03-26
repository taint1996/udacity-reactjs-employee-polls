import { BallTriangle } from "react-loader-spinner";

const Loading = () => {
  return (
    <>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#181a53"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </>
  );
};

export default Loading;
