export default function About() {
  return (
    <div style={{ padding: "2rem" }}>
      {/* Main about section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap", 
            alignItems: "center",
            gap: "2rem",
            maxWidth: "1000px",
            margin: "0 auto",
            justifyContent: "center",
          }}
        >
          <img
            src="/img/pexels-katerina-holmes-5908020.jpg"
            alt="About Image"
            style={{
              width: "100%",
              maxWidth: "400px", 
              borderRadius: "2px",
              objectFit: "cover",
              flex: "1 1 300px",
            }}
          />

          <div
            style={{
              flex: "1 1 300px", 
              minWidth: "280px",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>About Prep & Preserve</h2>

            <p style={{ lineHeight: "1.6rem", fontSize: "1.1rem" }}>
              This app is named Prep & Preserve for a few reasons. First, I'm a fan
              of alliteration, but the name also reflects the way I like to cook.
              <strong> Prep </strong> comes from the culinary term <em>mise en
              place</em>, a French phrase meaning “everything in its place,” which
              refers to gathering, preparing, and organizing all your ingredients and
              tools before you start cooking.
              <strong> Preserve </strong> speaks to the other core purpose of the
              app: storing and keeping the recipes you love so they're always at
              hand when you want to make them again.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          maxWidth: "1000px",
          margin: "4rem auto",
          backgroundColor: "#d6d4c6",
          borderRadius: "8px",
          gap: "1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            flex: "1 1 250px",
            fontSize: "1.1rem",
            lineHeight: "1.5rem",
            margin: 0,
          }}
        >
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
            flexShrink: 0,
          }}
          onClick={() =>
            (window.location.href = "mailto:nicholas.weisser@gmail.com")
          }
        >
          Contact Admin
        </button>
      </div>
    </div>
  );
}
