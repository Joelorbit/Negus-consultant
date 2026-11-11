import type { ReactNode, SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

function Icon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function Play(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M8 5.75V18.25L18 12L8 5.75Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function Pause(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 5V19M16 5V19" stroke="currentColor" strokeLinecap="round" />
    </Icon>
  )
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M6.00005 19L19 5.99996M19 5.99996V18.48M19 5.99996H6.52005"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function Check(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M5 13L9 17L19 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function Xmark(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function Spark(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M3 12C9.26752 12 12 9.36306 12 3C12 9.36306 14.7134 12 21 12C14.7134 12 12 14.7134 12 21C12 14.7134 9.26752 12 3 12Z"
        stroke="currentColor"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function Compass(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M10.5857 10.5857L16.9496 7.0502L13.4141 13.4142L7.05012 16.9497L10.5857 10.5857Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function Laptop(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M3.2 14.2222V4C3.2 2.89543 4.09543 2 5.2 2H18.8C19.9046 2 20.8 2.89543 20.8 4V14.2222M3.2 14.2222H20.8M3.2 14.2222L1.71969 19.4556C1.35863 20.7321 2.31762 22 3.64418 22H20.3558C21.6824 22 22.6414 20.7321 22.2803 19.4556L20.8 14.2222"
        stroke="currentColor"
      />
      <path
        d="M11 19L13 19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function GraduationCap(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M2.57331 8.46334L11.2317 4.13416C11.4006 4.04971 11.5994 4.04971 11.7683 4.13416L20.4267 8.46334C20.8689 8.68446 20.8689 9.31554 20.4267 9.53666L11.7683 13.8658C11.5994 13.9503 11.4006 13.9503 11.2317 13.8658L2.57331 9.53666C2.13108 9.31554 2.13108 8.68446 2.57331 8.46334Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5 13L22.5 9.5L20.5 8.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 10.5V15.9121C4.5 16.6843 4.94459 17.3876 5.6422 17.7188L10.6422 20.0928C11.185 20.3505 11.815 20.3505 12.3578 20.0928L17.3578 17.7188C18.0554 17.3876 18.5 16.6843 18.5 15.9121V10.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function Book(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M4 19V5C4 3.89543 4.89543 3 6 3H19.4C19.7314 3 20 3.26863 20 3.6V16.7143"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path d="M6 17L20 17" stroke="currentColor" strokeLinecap="round" />
      <path d="M6 21L20 21" stroke="currentColor" strokeLinecap="round" />
      <path
        d="M6 21C4.89543 21 4 20.1046 4 19C4 17.8954 4.89543 17 6 17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 7L15 7" stroke="currentColor" strokeLinecap="round" />
    </Icon>
  )
}

export function Sun(props: IconProps) {
  return (
    <Icon {...props}>
      <circle
        cx="12"
        cy="12"
        r="5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function Moon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function ArrowUp(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M12 20V4M5 11l7-7 7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function TikTok(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function Telegram(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M21.5 3.5L2 11l7 3 2 7 3.5-4.5 5 4 2-17z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 14l6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function Instagram(props: IconProps) {
  return (
    <Icon {...props}>
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" />
      <path d="M17.5 6.5h.01" stroke="currentColor" strokeLinecap="round" />
    </Icon>
  )
}

export function YouTube(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.35 29 29 0 0 0-.46-5.33z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
        stroke="currentColor"
        fill="currentColor"
      />
    </Icon>
  )
}

export function Phone(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function Mail(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="22,6 12,13 2,6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function UniversityCrest(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M12 2L2 7l10 5 10-5-10-5z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function ZoomIn(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="8" stroke="currentColor" />
      <path
        d="M21 21l-4.35-4.35M11 8v6M8 11h6"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </Icon>
  )
}

export function Search(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="8" stroke="currentColor" />
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeLinecap="round" />
    </Icon>
  )
}

export function Filter(props: IconProps) {
  return (
    <Icon {...props}>
      <polygon
        points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function ShieldCheck(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function Award(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="7" stroke="currentColor" />
      <polyline
        points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function Calculator(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" />
      <line
        x1="8"
        y1="6"
        x2="16"
        y2="6"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="14"
        x2="16"
        y2="18"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M16 10h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
      />
    </Icon>
  )
}

export function FileText(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="currentColor"
      />
      <polyline points="14 2 14 8 20 8" stroke="currentColor" />
      <line
        x1="16"
        y1="13"
        x2="8"
        y2="13"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="17"
        x2="8"
        y2="17"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <line
        x1="10"
        y1="9"
        x2="8"
        y2="9"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </Icon>
  )
}
