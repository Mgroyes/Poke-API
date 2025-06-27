import React from 'react'
import Select from 'react-select'

type OptionType = {
  value: string
  label: string
}

type Props = {
  options: string[]
  selectedType: string | null
  onChange: (value: string | null) => void
  
}

const TypeFilter: React.FC<Props> = ({ options, selectedType, onChange }) => {
  const selectOptions: OptionType[] = [
    { value: '', label: 'Todos' },
    ...options.map(type => ({
      value: type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
    })),
  ]

  const selectedOption =
    selectOptions.find(opt => opt.value === selectedType) || selectOptions[0]

  return (
    <div className="mb-4 max-w-xs">
      <Select
        options={selectOptions}
        value={selectedOption}
        onChange={(selected: OptionType | null) => {
          const value = selected?.value ?? null
          onChange(value === '' ? null : value)
        }}
        isClearable
        placeholder="Filtrar por tipo..."
        // 🔽 Añade estas dos props para que el menú no se corte
        menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
        styles={{
          menuPortal: base => ({ ...base, zIndex: 9999 }),
        }}
      />
    </div>
  )
}

export default TypeFilter
