const Hero = ({ onClick }) => (
  <div className="flex flex-1 justify-center items-center py-8 px-4">
    <div
      onClick={onClick}
      className="
        bg-gray-100
        hover:bg-gray-200
        transition-colors
        cursor-pointer
        rounded-lg
        shadow-lg
        p-12
        w-full
        max-w-4xl
        mx-auto            /* ensure the card itself is always centered */
      "
    >
      <div className="text-center mb-8">
        <a
          href="https://www.nba.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/nbaLogo.png"
            alt="Official NBA Logo"
            className="mx-auto mb-6"
            style={{ height: 700, width: "auto" }}  // adjust to taste
          />
        </a>
      </div>

      <h1 className="text-4xl font-extrabold text-center mb-4">
        For more NBA news click on the logo!
      </h1>
      <p className="text-center text-base text-gray-700">
        The statistics on this website are for the 2024–2025 NBA season.
      </p>
    </div>
  </div>
);

export default Hero;