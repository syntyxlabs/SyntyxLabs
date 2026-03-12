import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Syntyx Labs — Engineering the Future of Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow effects */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "15%",
            width: "500px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(249,219,154,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "10%",
            width: "400px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(171,89,215,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            padding: "60px",
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "999px",
              padding: "8px 20px",
              color: "#d1d5db",
              fontSize: "18px",
              letterSpacing: "0.05em",
            }}
          >
            Empowering Businesses with Technology
          </div>

          {/* Company name */}
          <div
            style={{
              display: "flex",
              fontSize: "80px",
              fontWeight: "bold",
              color: "#ffffff",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            Syntyx Labs
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              fontSize: "30px",
              color: "#f9db9a",
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            Engineering the Future of Software
          </div>

          {/* Description */}
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              color: "#9ca3af",
              textAlign: "center",
              maxWidth: "750px",
              lineHeight: 1.6,
              marginTop: "8px",
            }}
          >
            AI-driven solutions · Custom software · Scalable technology
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            fontSize: "18px",
            color: "#6b7280",
            letterSpacing: "0.05em",
          }}
        >
          syntyxlabs.com
        </div>
      </div>
    ),
    { ...size }
  );
}
