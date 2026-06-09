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

          <div style={{ flex: "1 1 300px", minWidth: "280px" }}>
            <h2 style={{ marginBottom: "1rem" }}>About Prep & Preserve</h2>

            <p style={{ lineHeight: "1.6rem", fontSize: "1.1rem" }}>
              This app is named Prep & Preserve for a few reasons. First, I'm a
              fan of alliteration, but the name also reflects the way I like to
              cook.
              <strong> Prep </strong> comes from the culinary term{" "}
              <em>mise en place</em>, a French phrase meaning “everything in its
              place,” which refers to gathering, preparing, and organizing all
              your ingredients and tools before you start cooking.
              <strong> Preserve </strong> speaks to the other core purpose of
              the app: storing and keeping the recipes you love so they're
              always at hand when you want to make them again.
            </p>
          </div>
        </div>
      </div>

      {/* App Updates Section */}
      <div
        style={{
          backgroundColor: "#e1d1c6ff",
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "1000px",
          margin: "4rem auto",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Latest Updates</h2>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.25rem 0.6rem",
                backgroundColor: "#9E6B53",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              v1.5
            </span>
            <span
              style={{
                display: "inline-block",
                padding: "0.15rem 0.5rem",
                backgroundColor: "#720000",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              New
            </span>
            <span style={{ fontWeight: 400, color: "#555" }}>
              June 2026
            </span>
          </h3>
          <ul
            style={{
              lineHeight: "1.6rem",
              fontSize: "1.05rem",
              paddingLeft: "1.5rem",
            }}
          >
            <li>
              <strong>Cook Mode:</strong> A new toggle on recipe pages keeps your
              screen awake while you cook — especially handy on iPad.
            </li>
            <li>
              Cook Mode stays on as you move between recipes in the same session,
              with a nav chip to turn it off from anywhere.
            </li>
            <li>
              When Cook Mode is active, ingredients and instructions use larger,
              easier-to-read text, and a sticky bottom bar makes it simple to
              turn off while scrolling.
            </li>
            <li>
              The Cook Mode toggle sits inline with the Description header,
              always visible on the right.
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.25rem 0.6rem",
                backgroundColor: "#8a7355",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              v1.4
            </span>
            <span style={{ fontWeight: 400, color: "#555" }}>
              June 2026
            </span>
          </h3>
          <ul
            style={{
              lineHeight: "1.6rem",
              fontSize: "1.05rem",
              paddingLeft: "1.5rem",
            }}
          >
            <li>
              <strong>Readable recipe times:</strong> Prep, cook, and total time
              now display in hours and minutes (e.g. &quot;1 hr 30 min&quot;
              instead of &quot;90 min&quot;) on recipe pages and cards.
            </li>
            <li>
              Add and edit forms now use separate Hours and Minutes fields for
              prep and cook time, grouped under Prep Time and Cook Time.
            </li>
            <li>
              The time and servings section adapts to your screen — one clean row
              on desktop and iPad, stacked on smaller phones.
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.25rem 0.6rem",
                backgroundColor: "#8a7355",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              v1.3
            </span>
            <span style={{ fontWeight: 400, color: "#555" }}>
              March 2025
            </span>
          </h3>
          <ul
            style={{
              lineHeight: "1.6rem",
              fontSize: "1.05rem",
              paddingLeft: "1.5rem",
            }}
          >
            <li>
              <strong>Recipe time &amp; servings:</strong> Add prep time, cook
              time, and servings when creating or editing recipes.
            </li>
            <li>
              Recipe pages now display a unified meta row with submitter, source
              link, time, and servings as chips.
            </li>
            <li>
              &quot;I Made This&quot; is now a chip in the meta row, matching the
              updated recipe page style.
            </li>
            <li>
              Recipe cards show total time and servings when available.
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.25rem 0.6rem",
                backgroundColor: "#7a6355",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              v1.2
            </span>
          </h3>
          <ul
            style={{
              lineHeight: "1.6rem",
              fontSize: "1.05rem",
              paddingLeft: "1.5rem",
            }}
          >
            <li>
              The Trending page now highlights the most recently made recipes in
              the community.
            </li>
            <li>
              You can now tap a username in Trending to visit that cook’s full
              profile.
            </li>
            <li>
              Favorites load immediately on the Trending page, making it easier
              to see what you’ve saved.
            </li>
            <li>
              General browsing improvements make moving through the app smoother
              and more consistent.
            </li>
          </ul>
        </div>

        <div>
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.25rem 0.6rem",
                backgroundColor: "#6a5345",
                color: "#fff",
                borderRadius: "12px",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              v1.1
            </span>
          </h3>
          <ul
            style={{
              lineHeight: "1.6rem",
              fontSize: "1.05rem",
              paddingLeft: "1.5rem",
            }}
          >
            <li>
              <strong>
                My Recipe List View: View your recipes in three different ways.
              </strong>
            </li>
            <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
              <li>
                <strong>My Recipes:</strong> All recipes you’ve submitted.
              </li>
              <li>
                <strong>Favorites:</strong> Every recipe you’ve marked as a
                favorite.
              </li>
              <li>
                <strong>Made:</strong> Recipes you’ve marked as made.
              </li>
            </ul>
          </ul>
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
