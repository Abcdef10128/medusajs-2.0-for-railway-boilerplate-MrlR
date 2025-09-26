'use client'

interface PriceButtonProps {
  onClick: () => void
}

export default function PriceButton({ onClick }: PriceButtonProps) {
  return (
    <button
      onClick={onClick}
      className="hover:text-ui-fg-base cursor-pointer bg-transparent border-none text-inherit font-inherit p-0 m-0"
      data-testid="nav-price-button"
    >
      Ціни
    </button>
  )
}