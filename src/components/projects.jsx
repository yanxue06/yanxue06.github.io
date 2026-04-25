import React from 'react';
import { motion } from "framer-motion";
import { Box, Card, Badge } from "@chakra-ui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

/**
 * Projects data.
 *
 * `span` controls how wide a card is on large (>=1200px) screens, on a 12-column grid.
 * Featured cards (`featured: true`) get a subtle highlight ring + star badge.
 * On medium screens everything collapses to 2 columns; on mobile to 1.
 */
const projectsData = [
  {
    title: "Flux",
    description: "A bi-directional WebSocket bridge that tunnels local LLM runtimes to iMessage, enabling **6,000+** users to deploy production agents in under **5 seconds**. Hit **#1 Product of the Day** on Product Hunt.",
    image: "/images/projects/flux.webp",
    imageFit: "contain",
    imageBg: "#6382E2",
    tags: ["TypeScript", "React", "TailwindCSS", "PostgreSQL", "WebSockets"],
    link: "https://github.com/photon-hq/flux",
    span: 8,
    featured: true,
    accent: "#6382E2",
  },
  {
    title: "git-subtree-audit",
    description: "A Git extension that **verifies subtree merges** by codifying history-preservation invariants into a single CLI command. Cuts review time from hours to seconds when merging SDKs and shared libraries.",
    image: "/images/projects/git-subtree-audit.png",
    imageFit: "cover",
    imageBg: "#11402d",
    tags: ["Rust", "Git Internals", "CLI"],
    link: "https://github.com/yanxue06/git-subtree-audit",
    span: 4,
    accent: "#5be3a4",
  },
  {
    title: "BuildSpace",
    description: "Reusable GitHub Actions blocks and release workflows for fast-shipping teams — point a workflow at a Rust, TypeScript, Go, or Swift repo, hand it a few secrets, and ship.",
    image: "/images/projects/buildspace.png",
    imageFit: "cover",
    imageBg: "#3d3aa8",
    tags: ["GitHub Actions", "Rust", "TypeScript", "CI/CD"],
    link: "https://github.com/photon-hq/buildspace",
    span: 4,
    accent: "#8b86ff",
  },
  {
    title: "pr-search",
    description: "A semantic search engine for **GitHub pull requests** — embeds PR titles + diffs with ONNX BGE, indexes them locally, and ships with a Ratatui TUI for instant fuzzy retrieval across thousands of PRs.",
    image: "/images/projects/pr-search.png",
    imageFit: "cover",
    imageBg: "#1a0d2e",
    tags: ["Rust", "ONNX Runtime", "Ratatui", "Vector Search"],
    link: "https://github.com/yanxue06/pr-search",
    span: 4,
    accent: "#c45cff",
  },
  {
    title: "Helios",
    description: "A real-time meeting tool that turns spoken discussions into **interactive knowledge graphs**, surfacing decisions, owners, and action items so nothing gets lost in conversation.",
    image: "/images/projects/helios.png",
    imageFit: "cover",
    imageBg: "#231100",
    tags: ["TypeScript", "React", "Knowledge Graphs", "LLMs"],
    link: "https://github.com/yanxue06/Helios",
    span: 4,
    accent: "#ffb96a",
  },
  {
    title: "Git-semantic search",
    description: "Natural-language git history search reaching **850+** users, searching **10K+** commits in under **100ms** with BERT tokenization and cosine similarity — zero API dependencies.",
    image: "/images/projects/git-semantic-search.webp",
    imageFit: "cover",
    imageBg: "#0b1220",
    tags: ["Rust", "BGE Embeddings", "Vector Search"],
    link: "https://github.com/yanxue06/git-semantic-search",
    span: 8,
    featured: true,
    accent: "#65B5FF",
  },
  {
    title: "Flappy Code",
    description: "A tiny **Flappy Bird overlay for macOS** that floats on top of your editor — so when the LLM is spinning, you can flap through a few pipes instead of staring at a spinner. One file, zero dependencies.",
    image: "/images/projects/flappycode.png",
    imageFit: "cover",
    imageBg: "#0d1117",
    tags: ["Python", "tkinter", "macOS"],
    link: "https://github.com/yanxue06/flappycode",
    span: 4,
    accent: "#3ec97c",
  },
  {
    title: "LinkCom",
    description: "A bidirectional communication system bridging the hard of hearing and society using STM32 microcontrollers, an LCD, a keypad, and GPIO signals for sending and receiving predefined messages.",
    image: "/images/projects/LinkCom.webp",
    imageFit: "cover",
    imageBg: "#1a2230",
    tags: ["STM32", "C", "Embedded"],
    link: "https://github.com/yanxue06/LinkCom",
    span: 6,
    accent: "#85D5FF",
  },
  {
    title: "Marillac Place",
    description: "A full-stack task management platform for Marillac Place NPO serving **28** homeless women, with a GraphQL API and automated resident record tracking.",
    image: "/images/projects/marillac.webp",
    imageFit: "cover",
    imageBg: "#1a2230",
    tags: ["TypeScript", "React", "GraphQL", "PostgreSQL", "Docker"],
    link: "https://github.com/uwblueprint/marillac-place",
    span: 6,
    accent: "#9AE0FF",
  },
];

// Parse **bold** in description text
const parseDescription = (text, accent) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: accent }}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
};

// Map a 12-column span to responsive grid-column rules
const spanCss = (span) => ({
  // mobile-first: every card is full width
  gridColumn: "span 12",
  // tablets get a 2-col layout (everything is half)
  "@media (min-width: 768px)": {
    gridColumn: "span 6",
  },
  // large screens use the asymmetric span
  "@media (min-width: 1200px)": {
    gridColumn: `span ${span}`,
  },
});

const ProjectCard = React.memo(({ project, index }) => {
  const accent = project.accent;

  return (
    <Box css={spanCss(project.span)}>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: Math.min(index * 0.07, 0.4) }}
        viewport={{ once: true, amount: 0.2 }}
        onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
        style={{
          height: "100%",
          cursor: "pointer",
        }}
      >
        <Card.Root
          css={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            overflow: "hidden",
            borderRadius: "22px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: project.featured
              ? `1.5px solid ${accent}55`
              : "1.5px solid rgba(255,255,255,0.18)",
            boxShadow: `
              0 8px 32px rgba(0,0,0,0.35),
              0 2px 8px rgba(0,0,0,0.25),
              inset 0 1px 1px rgba(255,255,255,0.25),
              inset 0 -1px 1px rgba(0,0,0,0.2)
            `,
            transition:
              "transform 0.45s cubic-bezier(0.4,0,0.2,1), box-shadow 0.45s cubic-bezier(0.4,0,0.2,1), border-color 0.4s ease",

            // ambient color wash
            "&::before": {
              content: "''",
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `
                radial-gradient(700px 320px at -10% -15%, ${accent}40 0%, transparent 55%),
                radial-gradient(500px 260px at 110% 110%, rgba(255,255,255,0.12) 0%, transparent 55%),
                linear-gradient(135deg, transparent 0%, ${accent}10 30%, transparent 70%)
              `,
            },

            // top reflection
            "&::after": {
              content: "''",
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.45) 50%, transparent)",
              opacity: 0.8,
              pointerEvents: "none",
              borderRadius: "50%",
            },

            "&:hover": {
              transform: "translateY(-8px)",
              borderColor: `${accent}aa`,
              boxShadow: `
                0 20px 60px rgba(0,0,0,0.45),
                0 8px 20px rgba(0,0,0,0.3),
                0 0 0 1px ${accent}80,
                inset 0 0 50px ${accent}20,
                inset 0 2px 2px rgba(255,255,255,0.35)
              `,
            },

            "@supports not ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px)))": {
              background: "rgba(15, 23, 42, 0.9)",
            },
          }}
        >
          {/* Featured badge */}
          {project.featured && (
            <Box
              css={{
                position: "absolute",
                top: "16px",
                right: "16px",
                zIndex: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px 10px",
                borderRadius: "999px",
                background: `linear-gradient(135deg, ${accent}55, ${accent}22)`,
                border: `1px solid ${accent}88`,
                color: "#fff",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                backdropFilter: "blur(8px)",
              }}
            >
              <StarRoundedIcon style={{ fontSize: "0.95rem" }} />
              Featured
            </Box>
          )}

          {/* Project image — aspect-ratio scales the height to the width */}
          <Box
            css={{
              width: "100%",
              aspectRatio: "16 / 9",
              backgroundColor: project.imageBg || "rgba(255, 255, 255, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <LazyLoadImage
              src={project.image}
              alt={project.title}
              effect="blur"
              wrapperProps={{ style: { width: "100%", height: "100%", display: "block" } }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: project.imageFit || "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            {/* subtle bottom fade so the image meets the body cleanly */}
            <Box
              css={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "40%",
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(6,11,17,0.45) 100%)",
                pointerEvents: "none",
              }}
            />
          </Box>

          <Card.Body
            css={{
              padding: "clamp(20px, 2.4vw, 32px)",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Title */}
            <Box css={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
              <h3
                style={{
                  fontSize: "clamp(1.15rem, 1.4vw, 1.5rem)",
                  fontWeight: 700,
                  color: "white",
                  lineHeight: 1.25,
                  margin: 0,
                }}
              >
                {project.title}
              </h3>
              <ArrowOutwardIcon
                style={{
                  color: accent,
                  fontSize: "1.2rem",
                  opacity: 0.85,
                  flexShrink: 0,
                }}
              />
            </Box>

            {/* Description */}
            <Box
              css={{
                color: "rgba(255, 255, 255, 0.78)",
                fontSize: "clamp(0.95rem, 1vw, 1.05rem)",
                lineHeight: 1.6,
                flex: 1,
              }}
            >
              {parseDescription(project.description, accent)}
            </Box>

            {/* Tags */}
            <Box
              css={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginTop: "4px",
              }}
            >
              {project.tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  css={{
                    backgroundColor: "rgba(255, 255, 255, 0.07)",
                    color: "rgba(255, 255, 255, 0.82)",
                    fontSize: "0.78rem",
                    padding: "4px 9px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </Box>

            {/* Footer */}
            <Box
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
                paddingTop: "14px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: accent,
                  textDecoration: "none",
                  fontSize: "0.88rem",
                  fontWeight: 500,
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = accent)}
              >
                <GitHubIcon style={{ fontSize: "1.15rem" }} />
                View Code
              </a>
            </Box>
          </Card.Body>
        </Card.Root>
      </motion.div>
    </Box>
  );
});

ProjectCard.displayName = "ProjectCard";

const ProjectBox = () => {
  return (
    <section
      id="projects"
      style={{
        // Break out of the parent's max-w-[1000px] container so the section is
        // free to use the full viewport on larger screens.
        position: "relative",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        padding: "clamp(60px, 8vw, 110px) 0",
        background:
          "radial-gradient(1200px 600px at 50% -10%, rgba(99,130,226,0.08), transparent 60%), rgba(6, 11, 17, 0.35)",
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
        style={{
          textAlign: "center",
          maxWidth: "780px",
          margin: "0 auto clamp(40px, 5vw, 72px) auto",
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
          Selected Work
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
          My{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #63d0f8, #65b5ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Projects
          </span>
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "clamp(0.95rem, 1.05vw, 1.1rem)",
            lineHeight: 1.6,
            margin: 0,
            width: "100%",
            textAlign: "center",
          }}
        >
          A few things I&apos;ve built — from developer tooling and CI infrastructure to
          embedded systems and full-stack products.
        </p>
      </motion.div>

      {/* Asymmetric responsive grid */}
      <Box
        css={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 40px)",
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "clamp(20px, 2.2vw, 32px)",
          alignItems: "stretch",
        }}
      >
        {projectsData.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </Box>
    </section>
  );
};

export default ProjectBox;
