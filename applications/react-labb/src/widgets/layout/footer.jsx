import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

export function Footer({ routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2" style={{ background: 'black' }}>
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year} Tame the Chaos. Lead the Change.
        </Typography>
        <ul className="flex items-center gap-4">
          {routes.map(({ name, path }) => (
            <li key={name}>
              <Typography
                as="a"
                href={path}
                target="_blank"
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Labb ltd",
  brandLink: "https://www.labb.ltd",
  routes: [
    { name: "About Us", path: "https://www.labb.ltd/about-us" },
    { name: "Careers", path: "https://www.labb.ltd/careers" },
    { name: "Contact", path: "https://www.labb.ltd/contact-us" },
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
