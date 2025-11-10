export default function About() {
  return (
    <div>
      {/* main about section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "2rem",
            padding: "2rem",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <img
            src="/img/pexels-katerina-holmes-5908020.jpg"
            alt="Prep & Preserve logo"
            style={{
              width: "40%",
              height: "auto",
              borderRadius: "2px",
              objectFit: "cover",
            }}
          />
          <div style={{ width: "60%" }}>
            <h2 style={{ marginBottom: "1rem" }}>About Prep & Preserve</h2>
            <p style={{ lineHeight: "1.rem", fontSize: "1.1rem" }}>
              This app is named Prep & Preserve for a few reasons. First, I'm a
              fan of alliteration, but the name also reflects the way I like to
              cook. <strong> Prep </strong>
              comes from the culinary term <em>mise en place</em>, a French
              phrase meaning “everything in its place,” which refers to
              gathering, preparing, and organizing all your ingredients and
              tools before you start cooking.
              <strong> Preserve </strong> speaks to the other core purpose of
              the app: storing and keeping the recipes you love so they're
              always at hand when you want to make them again.
            </p>
          </div>
        </div>
      </div>
      {/* maybe a contact section? Something like this could be a nice touch*/}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2rem",
          maxWidth: "1000px",
          margin: "0 auto",
          backgroundColor: "#d6d4c6",
          borderRadius: "8px",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <p style={{ flex: "1", fontSize: "1.1rem", lineHeight: "1.5rem", margin: 0, textAlign: "center" }}>
          Questions? Need assistance? Contact our admin for help or feedback.
        </p>

        <button
          type="button"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#9E6B53",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          // TODO: do I include my email? or make an alias? 
          onClick={() => window.location.href = "mailto:nicholas.weisser@gmail.com"}
        >
          Contact Admin
        </button>
      </div>
    </div>
  );
}