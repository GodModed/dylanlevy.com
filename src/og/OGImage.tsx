export default function OGImage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        padding: "32px 40px",
        backgroundColor: "#d8eff7",
        color: "#203e51",
        fontFamily: "Inter",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 120 120"
        style={{ position: "absolute", top: 25, right: 30 }}
      >
        <g stroke="#fbbf24" strokeWidth="5" strokeLinecap="round">
          {Array.from({ length: 12 }, (_, index) => (
            <line
              key={index}
              x1="60"
              y1="9"
              x2="60"
              y2="20"
              transform={`rotate(${index * 30} 60 60)`}
            />
          ))}
        </g>
        <circle cx="60" cy="60" r="29" fill="#fbbf24" />
        <path
          d="M40 53a22 22 0 0 1 20-15"
          fill="none"
          stroke="#fef3c7"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <svg
        width="250"
        height="188"
        viewBox="0 0 320 240"
        style={{ position: "absolute", right: -85, bottom: 30, opacity: 0.65 }}
      >
        <path
          d="M77 184C49 184 30 166 30 142C30 118 49 99 73 98C76 66 100 44 130 44C157 44 180 61 187 86C194 82 202 80 211 80C235 80 254 97 258 119C279 120 294 134 294 152C294 171 279 184 259 184Z"
          fill="white"
        />
      </svg>

      <div
        style={{
          display: "flex",
          fontSize: 12,
          letterSpacing: 2,
          color: "#536f80",
          fontWeight: 700,
        }}
      >
        DEVELOPER & STUDENT
      </div>
      <h1
        style={{
          display: "flex",
          margin: "33px 0 12px",
          fontSize: 56,
          letterSpacing: -3,
          lineHeight: 1,
          fontWeight: 700,
        }}
      >
        Dylan<span style={{ fontWeight: 400, marginLeft: 12 }}>Levy</span>
      </h1>
      <div
        style={{
          display: "flex",
          fontSize: 29,
          letterSpacing: -1,
          lineHeight: 1.35,
        }}
      >
        I turn ideas into
        <span
          style={{
            backgroundColor: "#f5d28e",
            marginLeft: 8,
            padding: "0 5px",
            borderRadius: 3,
          }}
        >
          reality.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 22,
          gap: 7,
          color: "#536f80",
          fontSize: 15,
          lineHeight: 1.4,
        }}
      >
        <span>Computer Science Engineering @ Ohio State</span>
        <span>
          Building for the web, mobile & everything I'm curious about.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
          borderTop: "1px solid rgba(32, 62, 81, 0.15)",
          paddingTop: 17,
          fontSize: 12,
          color: "#536f80",
        }}
      >
        <span>Cleveland, OH · Class of 2029</span>
        <span style={{ color: "#203e51", fontWeight: 700 }}>dylanlevy.com</span>
      </div>
    </div>
  );
}
