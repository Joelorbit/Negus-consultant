import type { SVGProps } from "react"

type LogoProps = SVGProps<SVGSVGElement>

export function NyuLogo(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 240 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >

      <g fill="#57068c">

        <path d="M28 8C27 13 31 17 31 22C31 27 27 30 25 33C24 30 23 27 23 24C23 18 26 13 28 8Z" />
        <path
          d="M22 14C19 18 18 22 18 26C18 31 21 34 23 37C20 35 18 31 18 27C18 22 20 18 22 14Z"
          opacity="0.85"
        />
        <path
          d="M34 16C36 20 37 24 37 28C37 32 35 36 32 38C34 35 35 32 35 28C35 23 34 19 34 16Z"
          opacity="0.85"
        />

        <path d="M14 36H40L37 43H17L14 36Z" />

        <rect x="25" y="44" width="4" height="16" rx="1" />
        <rect x="22" y="60" width="10" height="3" rx="1" />
      </g>

      <text
        x="54"
        y="45"
        fill="#57068c"
        fontFamily="'Lexend', sans-serif"
        fontSize="34"
        fontWeight="900"
        letterSpacing="-1.5"
      >
        NYU
      </text>
      <text
        x="55"
        y="58"
        fill="#57068c"
        fontFamily="'Lexend', sans-serif"
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="1.8"
      >
        NEW YORK UNIVERSITY
      </text>
    </svg>
  )
}

export function GeorgetownLogo(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 280 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >

      <g>
        <path
          d="M14 10H38C38 10 39 36 26 48C13 36 14 10 14 10Z"
          fill="#041e42"
        />
        <path
          d="M16 12H36C36 12 37 34 26 45C15 34 16 12 16 12Z"
          fill="#ffffff"
        />

        <path d="M26 16L29 24H23L26 16Z" fill="#041e42" />
        <path d="M20 26H32V29H20V26Z" fill="#041e42" />
        <circle cx="26" cy="35" r="4" fill="#041e42" />
        <path d="M24 33L28 37M28 33L24 37" stroke="#ffffff" strokeWidth="1.2" />
      </g>

      <text
        x="50"
        y="36"
        fill="#041e42"
        fontFamily="'Lexend', sans-serif"
        fontSize="19"
        fontWeight="800"
        letterSpacing="-0.3"
      >
        GEORGETOWN
      </text>
      <text
        x="51"
        y="52"
        fill="#63666a"
        fontFamily="'Lexend', sans-serif"
        fontSize="10"
        fontWeight="700"
        letterSpacing="2.5"
      >
        UNIVERSITY · 1789
      </text>
    </svg>
  )
}

export function DrexelLogo(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 240 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >

      <rect x="8" y="10" width="40" height="48" rx="6" fill="#07294d" />
      <path d="M16 44L28 18L40 44L28 38L16 44Z" fill="#ffc600" />
      <circle cx="28" cy="27" r="3" fill="#07294d" />

      <text
        x="58"
        y="38"
        fill="#07294d"
        fontFamily="'Lexend', sans-serif"
        fontSize="22"
        fontWeight="900"
        letterSpacing="-0.5"
      >
        DREXEL
      </text>
      <text
        x="59"
        y="52"
        fill="#b38300"
        fontFamily="'Lexend', sans-serif"
        fontSize="9"
        fontWeight="800"
        letterSpacing="2"
      >
        UNIVERSITY
      </text>
    </svg>
  )
}

export function WilliamsLogo(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 250 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >

      <rect x="10" y="10" width="42" height="48" rx="4" fill="#502d79" />
      <path
        d="M16 18H22L26 36L31 18H36L41 36L45 18H50L44 46H38L33.5 28L29 46H23L16 18Z"
        fill="#ffcc00"
      />

      <text
        x="62"
        y="37"
        fill="#502d79"
        fontFamily="'Lexend', sans-serif"
        fontSize="21"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        Williams
      </text>
      <text
        x="63"
        y="52"
        fill="#502d79"
        opacity="0.75"
        fontFamily="'Lexend', sans-serif"
        fontSize="9.5"
        fontWeight="700"
        letterSpacing="2"
      >
        COLLEGE · #1 LIBERAL ARTS
      </text>
    </svg>
  )
}

export function SarahLawrenceLogo(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 270 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >

      <circle cx="26" cy="34" r="20" fill="#004731" />
      <circle cx="26" cy="34" r="17" fill="#ffffff" />
      <path d="M26 19L31 29H21L26 19Z" fill="#004731" />
      <rect x="24.5" y="30" width="3" height="12" fill="#004731" />

      <text
        x="56"
        y="33"
        fill="#004731"
        fontFamily="'Lexend', sans-serif"
        fontSize="17"
        fontWeight="800"
        letterSpacing="-0.2"
      >
        SARAH LAWRENCE
      </text>
      <text
        x="57"
        y="49"
        fill="#004731"
        opacity="0.8"
        fontFamily="'Lexend', sans-serif"
        fontSize="9.5"
        fontWeight="700"
        letterSpacing="2.2"
      >
        COLLEGE · NEW YORK
      </text>
    </svg>
  )
}

export function HultLogo(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 240 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >

      <rect x="10" y="12" width="38" height="46" rx="4" fill="#111827" />
      <path
        d="M19 22V46M39 22V46M19 34H39"
        stroke="#c5a059"
        strokeWidth="4"
        strokeLinecap="round"
      />

      <text
        x="58"
        y="38"
        fill="#111827"
        fontFamily="'Lexend', sans-serif"
        fontSize="24"
        fontWeight="900"
        letterSpacing="-0.5"
      >
        HULT
      </text>
      <text
        x="59"
        y="52"
        fill="#997733"
        fontFamily="'Lexend', sans-serif"
        fontSize="8"
        fontWeight="800"
        letterSpacing="1.4"
      >
        BUSINESS SCHOOL
      </text>
    </svg>
  )
}

export function HowardLogo(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 250 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >

      <path d="M12 10H38C38 10 39 34 25 46C11 34 12 10 12 10Z" fill="#002855" />
      <path d="M14 12H36C36 12 37 32 25 43C13 32 14 12 14 12Z" fill="#e03a3e" />
      <text
        x="25"
        y="32"
        fill="#ffffff"
        fontFamily="'Lexend', sans-serif"
        fontSize="16"
        fontWeight="900"
        textAnchor="middle"
      >
        H
      </text>

      <text
        x="50"
        y="36"
        fill="#002855"
        fontFamily="'Lexend', sans-serif"
        fontSize="20"
        fontWeight="900"
        letterSpacing="-0.4"
      >
        HOWARD
      </text>
      <text
        x="51"
        y="51"
        fill="#e03a3e"
        fontFamily="'Lexend', sans-serif"
        fontSize="9.5"
        fontWeight="800"
        letterSpacing="2"
      >
        UNIVERSITY · 1867
      </text>
    </svg>
  )
}

export function ClarkLogo(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 240 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="26" cy="34" r="19" fill="#cc0000" />
      <circle cx="26" cy="34" r="16" fill="#ffffff" />
      <path d="M26 19L32 35H20L26 19Z" fill="#cc0000" />
      <text
        x="56"
        y="36"
        fill="#111111"
        fontFamily="'Lexend', sans-serif"
        fontSize="21"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        CLARK
      </text>
      <text
        x="57"
        y="51"
        fill="#cc0000"
        fontFamily="'Lexend', sans-serif"
        fontSize="9"
        fontWeight="800"
        letterSpacing="2"
      >
        UNIVERSITY · 1887
      </text>
    </svg>
  )
}

export function CanisiusLogo(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 250 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="10" y="11" width="40" height="46" rx="5" fill="#0c2340" />
      <path
        d="M20 22C20 22 30 18 36 26C30 30 20 26 20 26V44H24V32C24 32 30 36 36 30"
        stroke="#cba052"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <text
        x="58"
        y="36"
        fill="#0c2340"
        fontFamily="'Lexend', sans-serif"
        fontSize="19"
        fontWeight="800"
        letterSpacing="-0.3"
      >
        CANISIUS
      </text>
      <text
        x="59"
        y="51"
        fill="#997733"
        fontFamily="'Lexend', sans-serif"
        fontSize="9"
        fontWeight="800"
        letterSpacing="2"
      >
        UNIVERSITY · BUFFALO
      </text>
    </svg>
  )
}

export function NyuCrest(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="#57068c">
        <path d="M24 5C23 10 27 14 27 19C27 24 23 27 21 30C20 27 19 24 19 21C19 16 22 11 24 5Z" />
        <path
          d="M18 11C15 15 14 19 14 23C14 27 17 30 19 33C16 31 15 28 15 24C15 19 17 15 18 11Z"
          opacity="0.85"
        />
        <path
          d="M30 13C32 17 33 21 33 25C33 29 31 33 28 35C30 32 31 29 31 25C31 20 30 16 30 13Z"
          opacity="0.85"
        />
        <path d="M12 32H36L33 38H15L12 32Z" />
        <rect x="22" y="39" width="4" height="6" rx="1" />
        <rect x="19" y="44" width="10" height="2.5" rx="1" />
      </g>
    </svg>
  )
}

export function GeorgetownCrest(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M13 7H35C35 7 36 30 24 41C12 30 13 7 13 7Z" fill="#041e42" />
      <path d="M15 9H33C33 9 34 28 24 38C14 28 15 9 15 9Z" fill="#ffffff" />
      <path d="M24 12L28 20H20L24 12Z" fill="#041e42" />
      <path d="M18 22H30V25H18V22Z" fill="#041e42" />
      <circle cx="24" cy="30" r="3.5" fill="#041e42" />
      <path d="M22 28L26 32M26 28L22 32" stroke="#ffffff" strokeWidth="1.2" />
    </svg>
  )
}

export function WilliamsCrest(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="7" y="7" width="34" height="34" rx="6" fill="#502d79" />
      <path
        d="M12 14H16.5L19.5 29L23.5 14H27.5L31.5 29L34.5 14H39L34.5 34H29.5L26 19.5L22.5 34H17.5L12 14Z"
        fill="#ffcc00"
      />
    </svg>
  )
}

export function DrexelCrest(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="7" y="7" width="34" height="34" rx="6" fill="#07294d" />
      <path d="M14 34L24 13L34 34L24 29L14 34Z" fill="#ffc600" />
      <circle cx="24" cy="21" r="3" fill="#07294d" />
    </svg>
  )
}

export function SarahLawrenceCrest(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="24" cy="24" r="17" fill="#004731" />
      <circle cx="24" cy="24" r="14" fill="#ffffff" />
      <path d="M24 12L29 21H19L24 12Z" fill="#004731" />
      <rect x="22.5" y="22" width="3" height="10" fill="#004731" />
      <circle cx="24" cy="34" r="1.5" fill="#004731" />
    </svg>
  )
}

export function HultCrest(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="7" y="7" width="34" height="34" rx="6" fill="#111827" />
      <path
        d="M15 15V33M33 15V33M15 24H33"
        stroke="#c5a059"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function HowardCrest(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M11 8H37C37 8 38 31 24 40C10 31 11 8 11 8Z" fill="#002855" />
      <path d="M13 10H35C35 10 36 29 24 37C12 29 13 10 13 10Z" fill="#e03a3e" />
      <text
        x="24"
        y="28"
        fill="#ffffff"
        fontFamily="'Lexend', sans-serif"
        fontSize="17"
        fontWeight="900"
        textAnchor="middle"
      >
        H
      </text>
    </svg>
  )
}

export function ClarkCrest(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="24" cy="24" r="17" fill="#cc0000" />
      <circle cx="24" cy="24" r="14" fill="#ffffff" />
      <path d="M24 12L30 27H18L24 12Z" fill="#cc0000" />
      <circle cx="24" cy="31" r="2" fill="#cc0000" />
    </svg>
  )
}

export function CanisiusCrest(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="7" y="7" width="34" height="34" rx="6" fill="#0c2340" />
      <path
        d="M16 17C16 17 26 14 31 20C26 23 16 20 16 20V33H21V24C21 24 27 27 31 23"
        stroke="#cba052"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
