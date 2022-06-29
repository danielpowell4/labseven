const ToggleMenu = ({ className, isMenuOpen, setIsMenuOpen }) => (
  <button
    type="button"
    onClick={() => setIsMenuOpen((prev) => !prev)}
    className={className}
    aria-label="Toggle Menu"
    aria-expanded={isMenuOpen ? "true" : "false"}
  >
    <svg
      aria-hidden="true"
      height="24"
      viewBox="0 0 16 16"
      version="1.1"
      width="24"
      data-view-component="true"
      class="three-bars"
    >
      <path
        fill-rule="evenodd"
        d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z"
      />
    </svg>
  </button>
);

export default ToggleMenu;
