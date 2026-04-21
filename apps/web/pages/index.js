export default function Home() {
  return (
    <div style={{
      height: "100vh",
      width: "100%",
      overflow: "hidden",
      background: "black",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      
      {/* FULL SCREEN SMOKE VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      >
        <source src="/Smoke.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY TEXT */}
      <div style={{ zIndex: 2, textAlign: "center" }}>
        <h1 style={{ fontSize: 50, letterSpacing: 5 }}>
          STARRY NIGHTS GLOBAL
        </h1
        <p style={{ opacity: 0.7 }}>
          Luxury • Earn • Shop • Advertise
        </p>
      </div>

    </div>
  )
}
