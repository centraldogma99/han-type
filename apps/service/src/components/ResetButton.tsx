import { RetryIcon } from "@/assets/images/RetryIcon"
import clsx from "clsx"
import { useEffect, useState } from "react"

export const ResetButton = ({
  show,
  className,
  disabled = false,
  dimIcon = false,
  onReset
}: {
  show: boolean
  className?: string
  disabled?: boolean
  dimIcon?: boolean
  onReset: () => void
}) => {
  const [isEscTyped, setIsEscTyped] = useState(false)

  useEffect(() => {
    if (!show || disabled) return

    let timer: number

    const handleReset = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsEscTyped(true)
        timer = window.setTimeout(() => {
          onReset()
        }, 300)
      }
    }

    window.addEventListener("keydown", handleReset)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("keydown", handleReset)
    }
  }, [disabled, onReset, show])

  return (
    <button
      type='button'
      disabled={disabled || !show}
      className={clsx(
        "clickable font-code text-sm md:text-base",
        className,
        (!show || isEscTyped) && "scale-0 opacity-0"
      )}
      onClick={onReset}
    >
      <span
        className={clsx(
          "flex items-center gap-2 transition-opacity",
          dimIcon ? "opacity-20" : "opacity-100"
        )}
      >
        <RetryIcon className='h-3 w-3' />
        <span>esc</span>
        <span className='sr-only'>다시 시작하기</span>
      </span>
    </button>
  )
}
