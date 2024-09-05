import { Nav, Navbar } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_zeus/helpers";

const SgrrhhLayout = () => {
  return (
    <div>
      <div>
        <h1>layout component rrhh</h1>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export { SgrrhhLayout };
