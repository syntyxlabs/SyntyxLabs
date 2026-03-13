import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#ffffff",
        fontFamily: "sans-serif",
        gap: "1rem",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: 0, color: "#F9DB9A" }}>404</h1>
      <p style={{ color: "#9ca3af", margin: 0 }}>Page not found</p>
      <Link
        href="/"
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          background: "#F9DB9A",
          color: "#0a0a0a",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Go home
      </Link>
    </div>
  );
}
