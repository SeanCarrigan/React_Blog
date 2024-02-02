import { Link } from "react-router-dom";
const Missing = () => {
  return (
    <main className="Missing">
      <h3>Page Not Found</h3>
      <p style={{ marginTop: "10px" }}>
        <Link to="/"> &#8592; Back to Homepage</Link>
      </p>
    </main>
  );
};

export default Missing;
