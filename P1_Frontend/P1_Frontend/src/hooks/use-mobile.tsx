import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * A hook that returns a boolean indicating whether the current window
 * width is below the mobile breakpoint (768px). The returned value
 * is undefined until the first render, at which point it is set to
 * true or false based on the window width.
 *
 * @returns {boolean | undefined} True if the window width is below the
 * mobile breakpoint, false otherwise, or undefined if the hook has not
 * yet been rendered.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}