import { toPng } from "html-to-image";

export function StatsShareButton() {
  return (
    <button
      className="btn btn-ghost mx-auto mt-4"
      onClick={async () => {
        const statsEl = document
          .getElementById("stats")
          ?.cloneNode(true) as HTMLElement;
        if (!statsEl) {
          return;
        }
        statsEl.classList.remove("stats-vertical");
        statsEl.classList.add("stats-horizontal");
        document.body.appendChild(statsEl);
        const pngData = await toPng(statsEl, {
          pixelRatio: 4,
        });
        document.body.removeChild(statsEl);
        const link = document.createElement("a");
        link.href = pngData;
        link.download = `vocabminor-stats-${today()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }}
    >
      Share results
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 17V3" />
        <path d="m6 11 6 6 6-6" />
        <path d="M19 21H5" />
      </svg>
    </button>
  );
}

const today = () => {
  const currentDate = new Date();
  return currentDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};
