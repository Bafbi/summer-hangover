import { useRouter } from "next/navigation";
import { useState } from "react";

// swipe in a direction to navigate to the next page or the previous page
export function SwipeNavigation({
  pages,
  pageIndex,
}: {
  pages: readonly string[];
  pageIndex: number;
}) {
  const router = useRouter();

  const [touchStart, setTouchStart] = useState(0);

  function handleSwipe(direction: "left" | "right") {
    if (direction === "left") {
      if (pageIndex < pages.length - 1) {
        if (!document.startViewTransition) {
          router.push(pages[pageIndex + 1]);
        }
        const transition = document.startViewTransition(() =>
          router.push(pages[pageIndex + 1]),
        );
        // Wait for the pseudo-elements to be created:
        transition.ready.then(() => {
          // Animate the root’s new view
          document.documentElement.animate(
            {
              transform: ["translateX(100%)", "translateX(0)"],
            },
            {
              duration: 200,
              easing: "ease-in",
              // Specify which pseudo-element to animate
              pseudoElement: "::view-transition-new(root)",
            },
          );
          document.documentElement.animate(
            {
              transform: ["translateX(0)", "translateX(-100%)"],
            },
            {
              duration: 200,
              easing: "ease-in",
              // Specify which pseudo-element to animate
              pseudoElement: "::view-transition-old(root)",
            },
          );
        });
      }
    } else {
      if (pageIndex > 0) {
        if (!document.startViewTransition) {
          router.push(pages[pageIndex - 1]);
        }
        const transition = document.startViewTransition(() =>
          router.push(pages[pageIndex - 1]),
        );
        // Wait for the pseudo-elements to be created:
        transition.ready.then(() => {
          // Animate the root’s new view
          document.documentElement.animate(
            {
              transform: ["translateX(-100%)", "translateX(0)"],
            },
            {
              duration: 200,
              easing: "ease-in",
              // Specify which pseudo-element to animate
              pseudoElement: "::view-transition-new(root)",
            },
          );
          document.documentElement.animate(
            {
              transform: ["translateX(0)", "translateX(100%)"],
            },
            {
              duration: 200,
              easing: "ease-in",
              // Specify which pseudo-element to animate
              pseudoElement: "::view-transition-old(root)",
            },
          );
        });
      }
    }
  }

  return (
    <div
      className=" absolute bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-between"
      onTouchStart={(e) => {
        const touch = e.touches[0];
        if (touch === undefined) return;
        setTouchStart(touch.clientX);
      }}
      onTouchEnd={(e) => {
        const touch = e.changedTouches[0];
        if (touch === undefined) return;
        const diff = touch.clientX - touchStart;
        if (diff > 100) {
          handleSwipe("right");
        } else if (diff < -100) {
          handleSwipe("left");
        }
      }}
    >
      {/* <button
        onClick={() => handleSwipe("right")}
        disabled={page === 0}
        className="text-blue-500"
      >
        Previous
      </button>
      <button
        onClick={() => handleSwipe("left")}
        disabled={page === pages.length - 1}
        className="text-blue-500"
      >
        Next
      </button> */}
    </div>
  );
}
