const { createGlobPatternsForDependencies } = require("@nrwl/next/tailwind");
const { join } = require("path");
const { generateColors } = require("../../../generateColors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, "./pages/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "./components/**/*.{js,ts,jsx,tsx}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    container: {
      center: true,
      padding: "1.1rem",
      screens: {
        sm: "640px",
        md: "767px",
        lg: "1024px",
        xl: "1280px", //1280
      },
    },
    fontFamily: {
      notosans: ["notosans"],
      ibmmono: ["ibmmono"],
    },
    extend: {
      primeFont: "#5BA7FF",
      boxShadow: {
        "b-sm": "0 2px 0 0 rgba(0, 0, 0, 0.1)",
      },
      colors: {
        ...generateColors("color-main", "#5BA7FF"),
        ...generateColors("color-sub", "#5BA7FF"),
        ...generateColors("color-extra", "#5BA7FF"),
      },
      transitionProperty: {
        all: "all",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        mainImage: {
          "0%": {
            transform: "translateX(30%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0%))",
            opacity: 1,
          },
        },
        mainBackground: {
          "0%": {
            left: -500,
            // transform: "translateX(0%)",
          },
          "100%": {
            left: 0,
            // transform: "translateX(100%))",
          },
        },
        wave: {
          "0%": {
            transform: "scaleY(1)",
          },
          "100%": {
            transform: "scaleY(0.5)",
          },
        },
        rightAppear: {
          "0%": {
            transform: "translateX(50%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0%))",
            opacity: 1,
          },
        },
        leftAppear: {
          "0%": {
            transform: "translateX(-50%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0%))",
            opacity: 1,
          },
        },
        bottomAppear: {
          "0%": {
            transform: "translateY(50%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0%))",
            opacity: 1,
          },
        },
        aboutDeco1: {
          "0%": {
            transform: "translateX(-50%)",
            opacity: 0,
          },
          "50%": {
            transform: "translateX(0%))",
            opacity: 1,
          },
          "51%, 100%": {
            transform: "translateY(0%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
            opacity: 1,
          },
          "75%": {
            transform: "translateY(-20%)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
            opacity: 1,
          },
        },
      },
    },
    animation: {
      fadeIn: "fadeIn 0.5s ease-in-out forwards",
      mainText: "fadeIn 1s ease-in-out forwards",
      mainImage: "mainImage 1s ease-in-out 0.5s forwards",
      mainBackground: "mainBackground 1s ease-in-out forwards",
      wave1: "wave 0.6s ease-in-out infinite alternate",
      wave2: "wave 0.6s ease-in-out 0.2s infinite alternate",
      wave3: "wave 0.6s ease-in-out 0.4s infinite alternate",
      aboutDeco1: "aboutDeco1 2s ease-in-out 0.8s forwards",
      aboutDeco2: "rightAppear 1s ease-in-out forwards",
      roadmapDeco: "leftAppear 1s ease-in-out forwards",
      benefitDeco: "bottomAppear 1s ease-in-out forwards",
      faqDeco: "rightAppear 1s ease-in-out forwards",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio"), require("tailwind-scrollbar"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#5BA7FF",
          "primary-focus": "rgba(31, 134, 255, 0.5)",
          "primary-content": "#FFFFFF",
          secondary: "#F5F7FC",
          thirdary: "#5BA7FF",
          accent: "#5BA7FF",
          neutral: "#5BA7FF",
          "base-100": "#FFFFFF",
          // info: "#FFFFFF",
          // success: "#037D00",
          // warning: "#FFFFFF",
          // error: "#FFFFFF",
          inactive: "#5BA7FF",
        },
      },
    ],
  },
  corePlugins: {
    preflight: false, // <== disable this!
  },
};
