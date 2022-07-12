const ToggleMenu = ({ className, isMenuOpen, setIsMenuOpen }) => (
  <button
    type="button"
    onClick={() => setIsMenuOpen((prev) => !prev)}
    className={className}
    aria-label="Toggle Menu"
    aria-expanded={isMenuOpen ? "true" : "false"}
  >
    {isMenuOpen ? (
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
        <g fill="var(--lightText)" fill-rule="evenodd">
          <rect
            width="30"
            height="2"
            x="-3"
            y="11"
            transform="rotate(-45 12 12)"
          />
          <rect
            width="30"
            height="2"
            x="-3"
            y="11"
            transform="rotate(45 12 12)"
          />
        </g>
      </svg>
    ) : (
      <svg aria-hidden="true" height="24" viewBox="0 0 16 16" width="24">
        <path
          fillRule="evenodd"
          d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z"
        />
      </svg>
    )}
  </button>
);

export default ToggleMenu;
