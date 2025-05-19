const ArrowIcon = ({ isOpen }) => (
  <svg
    className={`w-4 h-4 -ml-[23px] transform transition-transform ${
      isOpen ? "" : "-rotate-90"
    }`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export default ArrowIcon;