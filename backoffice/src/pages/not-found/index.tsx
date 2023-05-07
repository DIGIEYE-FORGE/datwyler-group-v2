import notFoundImage from "../../assets/images/404.svg";
const NotFoundPage = () => {
  return (
    <div className="flex flex-col h-full w-full justify-center align-center">
      <img
        style={{
          width: "90%",
          maxWidth: "40rem",
        }}
        src={notFoundImage}
        alt="404"
      />
      <h1 className="capitalize" style={{ color: "#07485E" }}>
        not found
      </h1>
      <div
        className="text-center"
        style={{
          fontWeight: 400,
          letterSpacing: "0.1rem",
          color: "#77838F",
        }}
      >
        OOPPS! THE PAGE YOU WERE LOOKING FOR, COULDN'T BE FOUND.
      </div>
    </div>
  );
};

export default NotFoundPage;
