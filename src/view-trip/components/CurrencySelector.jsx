// CurrencySelector.jsx
import { useState } from "react"
import { useCurrency } from "@/context/CurrencyContext"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const currencies = [
  { code: "USD", label: "USD – $", country: "us" },
  { code: "INR", label: "INR – ₹", country: "in" },
  { code: "EUR", label: "EUR – €", country: "eu" }, // EU flag exists
  { code: "GBP", label: "GBP – £", country: "gb" },
  { code: "JPY", label: "JPY – ¥", country: "jp" },
]

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()
  const [open, setOpen] = useState(false)

  const selectedCurrency = currencies.find((c) => c.code === currency)

  return (
    <div className="relative inline-block">
      {/* Toggle Button */}
      <Button
        variant="outline"
        className="rounded-xl px-4 py-2 font-medium flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center gap-2">
          {selectedCurrency && (
            <img
              src={`https://flagcdn.com/w40/${selectedCurrency.country}.png`}
              srcSet={`https://flagcdn.com/w40/${selectedCurrency.country}.png 1x, https://flagcdn.com/w80/${selectedCurrency.country}.png 2x`}
              alt={`${selectedCurrency.code} flag`}
              className="w-5 h-5 rounded-full object-cover"
            />
          )}
          <span>{currency}</span>
        </span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
          {currencies.map((c) => (
            <div
              key={c.code}
              onClick={() => {
                setCurrency(c.code)
                setOpen(false)
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground flex items-center gap-3 ${
                currency === c.code ? "font-bold text-blue-600 dark:text-blue-400" : ""
              }`}
            >
              <img
                src={`https://flagcdn.com/w40/${c.country}.png`}
                srcSet={`https://flagcdn.com/w40/${c.country}.png 1x, https://flagcdn.com/w80/${c.country}.png 2x`}
                alt={`${c.code} flag`}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


