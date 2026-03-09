import { ImageResponse } from "next/og"

export const dynamic = "force-static"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, #f7fbfb 0%, #eef6ff 48%, #ffffff 100%)",
          color: "#111827",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 72,
            top: 64,
            width: 280,
            height: 280,
            borderRadius: 9999,
            background:
              "radial-gradient(circle at center, rgba(0,191,166,0.26) 0%, rgba(0,191,166,0) 72%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 640,
            bottom: -120,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background:
              "radial-gradient(circle at center, rgba(106,92,255,0.18) 0%, rgba(106,92,255,0) 74%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "14px 22px",
              borderRadius: 9999,
              border: "1px solid rgba(17,24,39,0.08)",
              background: "rgba(255,255,255,0.7)",
              alignSelf: "flex-start",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 9999,
                background: "#00bfa6",
              }}
            />
            <div style={{ fontSize: 28, fontWeight: 600 }}>Amalgam</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 820 }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                fontSize: 78,
                lineHeight: 1.02,
                fontWeight: 700,
              }}
            >
              <span>When delivery gets messy,</span>
              <span style={{ color: "#00bfa6" }}>{" we help teams move again."}</span>
            </div>
            <div style={{ fontSize: 30, lineHeight: 1.35, color: "#4b5563", maxWidth: 900 }}>
              Experienced support for architecture, data, integrations, and delivery friction.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 28,
              fontSize: 24,
              color: "#374151",
            }}
          >
            <div>Founded 2012</div>
            <div>Experienced support</div>
            <div>Complex systems expertise</div>
          </div>
        </div>
      </div>
    ),
    size
  )
}
