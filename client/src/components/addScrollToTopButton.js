function addScrollToTopButton() {
  const btn = document.createElement("button");
  btn.id = "scroll-to-top-btn";
  btn.type = "button";
  btn.setAttribute("aria-label", "Scroll to top");
  btn.innerHTML = "↑";

  function updatePosition() {
    const isMobile = window.innerWidth < 576; // sm
    const isTablet = window.innerWidth < 992; // lg

    btn.style.right = isMobile ? "16px" : isTablet ? "28px" : "45px";
    btn.style.bottom = isMobile ? "16px" : isTablet ? "28px" : "45px";

    if (window.innerWidth < 576) {
      btn.style.opacity = "0.85";
    }
  }

  Object.assign(btn.style, {
    position: "fixed",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "1px solid #000",
    background: "#fff",
    color: "#000",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    zIndex: "9999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
  });

  updatePosition();
  window.addEventListener("resize", updatePosition);

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.body.appendChild(btn);
}

export { addScrollToTopButton };
