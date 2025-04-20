"use client"

const AD_INTERVAL = 2;
import { useState, useEffect, useRef } from "react";
import { info } from "../utils/info";

function ProgressiveImage({
  thumbnailSrc = "/images/placeholder.jpg",
  mainSrc = "/images/placeholder.jpg",
  alt = "",
  onLoad,
  onError,
  eager = false,
}) {
  const [currentSrc, setCurrentSrc] = useState(thumbnailSrc);
  const [isInView, setIsInView] = useState(eager);
  const ref = useRef(null);
  useEffect(() => {
    if (eager) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [eager]);
  useEffect(() => {
    if (!isInView) return;
    if (!mainSrc || mainSrc.trim().toLowerCase() === "unknown") return;
    const img = new Image();
    img.src = mainSrc;
    img.onload = () => {
      setCurrentSrc(mainSrc);
      onLoad && onLoad();
    };
    img.onerror = onError;
  }, [isInView, mainSrc, onLoad, onError]);
  return (
    <div
      ref={ref}
      className="relative aspect-[3/4] w-full rounded overflow-hidden bg-gray-200"
    >
      <img
        alt={alt}
        src={currentSrc}
        width={600}
        height={900}
        className="absolute inset-0 h-full w-full object-cover rounded"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : undefined}
        onError={onError}
      />
    </div>
  );
}

export function InstagramProfilesGrid({ profiles = [], settings = {} }) {
  const { includeMale } = settings;
  const [orderedProfiles, setOrderedProfiles] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [cp, setCp] = useState(1);
  const [ipp, setIpp] = useState(15);
  const [lc, setLc] = useState(0);

  useEffect(() => {
    let ordered = [];
    if (includeMale) {
      ordered = profiles;
    } else {
      const filteredProfiles = profiles.filter((p) => !p.male);
      const ads = filteredProfiles
        .filter(
          (p) =>
            p.ad ||
            p.isAd ||
            (typeof p.prio === "number" && p.prio > 0) ||
            p.prio === true
        )
        .sort((a, b) => {
          const aPrio = typeof a.prio === "number" ? a.prio : Infinity;
          const bPrio = typeof b.prio === "number" ? b.prio : Infinity;
          return aPrio - bPrio;
        });
      const regular = filteredProfiles.filter(
        (p) =>
          !(
            p.ad ||
            p.isAd ||
            (typeof p.prio === "number" && p.prio > 0) ||
            p.prio === true
          )
      );
      if (AD_INTERVAL === 0) {
        ordered = regular;
      } else {
        let adsCopy = [...ads];
        let regularCopy = [...regular];
        ordered = [];
        let normalCount = 0;
        while (regularCopy.length > 0) {
          ordered.push(regularCopy.shift());
          normalCount++;
          if (normalCount === AD_INTERVAL && adsCopy.length > 0) {
            ordered.push(adsCopy.shift());
            normalCount = 0;
          }
        }
        // Append any remaining ads after processing all regular profiles
        ordered.push(...adsCopy);
      }
    }
    setOrderedProfiles(ordered);
    setInitialized(true);
  }, [profiles, includeMale]);

  useEffect(() => {
    function r() {
      setIpp(15);
    }
    r();
    return () => window.removeEventListener("resize", r);
  }, []);

  const tp = Math.ceil(orderedProfiles.length / ipp);
  const start = (cp - 1) * ipp;
  const end = start + ipp;
  const items = orderedProfiles.slice(start, end);
  function gtp(page) {
    setCp(page);
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [cp]);
  useEffect(() => {
    setLc(0);
  }, [cp]);
  useEffect(() => {
    if (lc === items.length && items.length > 0) {
      const nx = cp + 1;
      if (nx <= tp) {
        const ns = (nx - 1) * ipp;
        const ne = ns + ipp;
        const nxt = orderedProfiles.slice(ns, ne);
        nxt.forEach((p) => {
          if (p.imageBig && p.imageBig.trim() !== "") {
            const img = new Image();
            img.src = `/api/image-proxy?url=${encodeURIComponent(
              p.imageBig
            )}&w=800`;
          }
        });
      }
    }
  }, [lc, items, cp, tp, orderedProfiles, ipp]);
  function gp() {
    const ps = [];
    if (tp <= 7) {
      for (let i = 1; i <= tp; i++) ps.push(i);
    } else {
      const f = 1;
      const l = tp;
      const c = cp;
      ps.push(f);
      let left = c - 1;
      let right = c + 1;
      if (left < 2) left = 2;
      if (right > tp - 1) right = tp - 1;
      if (left > 2) ps.push("...");
      for (let i = left; i <= right; i++) ps.push(i);
      if (right < tp - 1) ps.push("...");
      ps.push(l);
    }
    return ps;
  }
  function handleImageError(profile) {
    setOrderedProfiles((prev) =>
      prev.filter(
        (item) =>
          (item._id?.$oid || item.id) !== (profile._id?.$oid || profile.id)
      )
    );
  }
  const formatLikes = (num) => {
    return typeof num === "number" ? (num / 10).toFixed(1) + "k" : num;
  };

  // Function to preload images for the next page
  function preloadNextPageImages() {
    const nextPage = cp + 1;
    if (nextPage <= tp) {
      const nextStartIndex = (nextPage - 1) * ipp;
      const nextEndIndex = nextStartIndex + ipp;
      const nextPageItems = orderedProfiles.slice(nextStartIndex, nextEndIndex);

      nextPageItems.forEach((p) => {
        if (p.imageBig && p.imageBig.trim() !== "") {
          const img = new Image();
          // Use the main image URL format for preloading
          img.src = `/api/image-proxy?url=${encodeURIComponent(p.imageBig)}&w=800&q=80`;
        }
      });
    }
  }

  if (!initialized) {
    return null;
  }
  return (
    <>
      <ul className="mx-auto mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {items.map((p, i) => {
          const thumbnailUrl = `/api/image-proxy?url=${encodeURIComponent(
            p.imageBig
          )}&w=300&q=60`;
          const mainImageUrl = `/api/image-proxy?url=${encodeURIComponent(
            p.imageBig
          )}&w=800&q=80`;
          return (
            <li key={p._id?.$oid || i} className="relative">
              <a href={p.link} rel="noopener noreferrer">
                <ProgressiveImage
                  thumbnailSrc={thumbnailUrl}
                  mainSrc={mainImageUrl}
                  alt={p.username || "Profile"}
                  onError={() => handleImageError(p)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 rounded pointer-events-none" />
              </a>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg tracking-tight text-white">{p.name}</h3>
                <div className="flex items-center justify-between mt-4 mb-2">
                  <div>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#1DA1F2] font-semibold rounded text-lg text-white px-6 py-3"
                    >
                      OnlyFans
                    </a>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="flex items-center text-white text-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                      {formatLikes(p.likes)}
                    </span>
                    <span className="flex items-center text-white text-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                        />
                      </svg>
                      {p.price ? p.price : "free"}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {tp > 1 && (
        <nav className="flex flex-wrap items-center justify-center mt-8 space-x-2">
          <button
            onClick={() => gtp(cp - 1)}
            disabled={cp === 1}
            className={`px-3 py-2 text-sm md:px-4 md:py-2 md:text-base rounded-md ${
              cp === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#1DA1F2] hover:bg-gray-200"
            }`}
          >
            Previous
          </button>
          {gp().map((page, i) =>
            page === "..." ? (
              <span
                key={`ellipsis-${i}`}
                className="px-3 py-2 text-sm md:px-4 md:py-2 md:text-base text-gray-600"
              >
                ...
              </span>
            ) : (
              <button
                key={`page-${page}`}
                onClick={() => gtp(page)}
                className={`px-3 py-2 text-sm md:px-4 md:py-2 md:text-base rounded-md ${
                  page === cp
                    ? "bg-[#1DA1F2] text-white"
                    : "text-[#1DA1F2] hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={() => gtp(cp + 1)}
            disabled={cp === tp}
            className={`px-3 py-2 text-sm md:px-4 md:py-2 md:text-base rounded-md ${
              cp === tp
                ? "text-gray-400 cursor-not-allowed"
                : "text-[#1DA1F2] hover:bg-gray-200"
            }`}
            // Preload next page images on hover/focus
            onMouseEnter={preloadNextPageImages}
            onFocus={preloadNextPageImages}
          >
            Next
          </button>
        </nav>
      )}
    </>
  );
}
