import { useState, useEffect } from "react";
import "../styles/home.css";
import "../styles/navbar.css";
import { motion } from "framer-motion";
import "../styles/about.css";
import SpotifyPlayer from "./SpotifyPlayer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Box, Badge } from "@chakra-ui/react";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

const galleryImages = Array.from({ length: 17 }, (_, i) => `/images/gallery/g${i + 1}.webp`);

const facts = [
  { icon: <SchoolRoundedIcon style={{ fontSize: "1rem" }} />, label: "Computer Eng @ uWaterloo" },
  { icon: <LocationOnRoundedIcon style={{ fontSize: "1rem" }} />, label: "Bay Area / Waterloo" },
  { icon: <TerminalRoundedIcon style={{ fontSize: "1rem" }} />, label: "Rust · TS · Go" },
];

const interests = [
  { icon: <MusicNoteRoundedIcon style={{ fontSize: "1.05rem" }} />, label: "Guitar" },
  { icon: <SportsEsportsRoundedIcon style={{ fontSize: "1.05rem" }} />, label: "Frisbee" },
  { icon: <span style={{ fontSize: "1.05rem", lineHeight: 1 }}>♞</span>, label: "Chess" },
];

export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="about"
      style={{
        // Full-bleed escape from the parent's max-w-[1000px] wrapper.
        position: "relative",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        padding: "clamp(60px, 8vw, 110px) 0",
        background:
          "radial-gradient(1100px 500px at 50% -10%, rgba(101,181,255,0.07), transparent 60%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        style={{
          textAlign: "center",
          maxWidth: "780px",
          margin: "0 auto clamp(36px, 5vw, 64px) auto",
          padding: "0 clamp(16px, 4vw, 32px)",
        }}
      >
        <Box
          css={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "999px",
            background: "rgba(101, 181, 255, 0.08)",
            border: "1px solid rgba(101, 181, 255, 0.25)",
            color: "#9ed5ff",
            fontSize: "0.78rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "18px",
          }}
        >
          About Me
        </Box>
        <h1
          style={{
            fontSize: "clamp(2.2rem, 5vw, 3rem)",
            fontWeight: "bold",
            color: "rgb(196, 223, 235)",
            marginBottom: "12px",
            lineHeight: 1.1,
          }}
        >
          A bit about{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #63d0f8, #65b5ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            me
          </span>
        </h1>
      </motion.div>

      <Box
        css={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 40px)",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "clamp(24px, 3vw, 44px)",
          alignItems: "stretch",
          "@media (min-width: 900px)": {
            gridTemplateColumns: "minmax(0, 5fr) minmax(0, 6fr)",
          },
        }}
      >
        {/* Left — photo carousel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Box
            css={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1.5px solid rgba(255,255,255,0.18)",
              boxShadow: `
                0 12px 40px rgba(0,0,0,0.4),
                0 2px 8px rgba(0,0,0,0.3),
                inset 0 1px 1px rgba(255,255,255,0.25)
              `,
              background: "rgba(255,255,255,0.04)",
              "&::after": {
                content: "''",
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(6,11,17,0.55) 100%)",
              },
              "@media (min-width: 900px)": {
                aspectRatio: "4 / 5",
                maxHeight: "640px",
                margin: "0 auto",
              },
            }}
          >
            <LazyLoadImage
              key={currentImageIndex}
              src={galleryImages[currentImageIndex]}
              alt={`Gallery image ${currentImageIndex + 1}`}
              effect="blur"
              wrapperProps={{
                style: { width: "100%", height: "100%", display: "block" },
              }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                transition: "transform 0.6s ease, opacity 0.5s ease",
              }}
            />

            {/* Pagination dots */}
            <Box
              css={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: "16px",
                display: "flex",
                justifyContent: "center",
                gap: "6px",
                zIndex: 2,
              }}
            >
              {galleryImages.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  css={{
                    width: i === currentImageIndex ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    backgroundColor:
                      i === currentImageIndex
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(255,255,255,0.35)",
                    cursor: "pointer",
                    transition: "width 0.3s ease, background-color 0.3s ease",
                  }}
                />
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Right — bio + facts + interests + spotify */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "clamp(18px, 2vw, 24px)",
          }}
        >
          {/* Bio */}
          <Box>
            <p
              style={{
                fontSize: "clamp(1.05rem, 1.2vw, 1.2rem)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.88)",
                margin: 0,
                marginBottom: "14px",
                width: "100%",
                textAlign: "left",
              }}
            >
              Hey — I&apos;m Yan, a computer engineering student at uWaterloo who
              strongly believes software should be used to{" "}
              <span style={{ color: "#65B5FF", fontWeight: 600 }}>help people</span>.
            </p>
            <p
              style={{
                fontSize: "clamp(1rem, 1.1vw, 1.1rem)",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.72)",
                margin: 0,
                width: "100%",
                textAlign: "left",
              }}
            >
              Lately I&apos;ve been writing a lot of Rust, building developer tooling,
              and shipping things at small, fast-moving teams. I care about clean
              abstractions, clear writing, and software that respects the user&apos;s
              time.
            </p>
          </Box>

          {/* Quick facts */}
          <Box
            css={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {facts.map((f, i) => (
              <Badge
                key={i}
                css={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.85)",
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  textTransform: "none",
                  letterSpacing: 0,
                }}
              >
                <span style={{ display: "inline-flex", color: "#9ed5ff" }}>{f.icon}</span>
                {f.label}
              </Badge>
            ))}
          </Box>

          {/* Interests block */}
          <Box>
            <p
              style={{
                fontSize: "0.78rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                margin: "0 0 10px 0",
                width: "100%",
                textAlign: "left",
              }}
            >
              Outside of code
            </p>
            <Box
              css={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "10px",
              }}
            >
              {interests.map((it, i) => (
                <Box
                  key={i}
                  css={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 12px",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.92rem",
                    fontWeight: 500,
                    transition:
                      "transform 0.3s ease, border-color 0.3s ease, background 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      borderColor: "rgba(101,181,255,0.45)",
                      background:
                        "linear-gradient(135deg, rgba(101,181,255,0.10), rgba(101,181,255,0.03))",
                    },
                  }}
                >
                  <span style={{ display: "inline-flex", color: "#65B5FF" }}>
                    {it.icon}
                  </span>
                  {it.label}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Spotify */}
          <Box css={{ marginTop: "4px" }}>
            <SpotifyPlayer />
          </Box>
        </motion.div>
      </Box>
    </section>
  );
}
