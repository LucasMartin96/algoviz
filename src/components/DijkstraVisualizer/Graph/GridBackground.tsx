const GridBackground = () => (
  <>
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="rgb(51 65 85)"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="1200" height="600" fill="url(#grid)" />
  </>
);

export default GridBackground;
