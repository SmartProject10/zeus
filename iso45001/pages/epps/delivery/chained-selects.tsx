import { useEffect, useState } from 'react'

export type Option = {
	value: string
	label: string
}

export type SelectConfig = {
	key: string
	name: string
	placeholder: string
	options: Option[] | ((previousSelections: Record<string, string>) => Option[])
}

type ChainedSelectsProps = {
	configs: SelectConfig[]
	onChange?: (selections: Record<string, string>) => void
}

export function ChainedSelects({
	configs = [],
	onChange,
}: ChainedSelectsProps) {
	const [selections, setSelections] = useState<Record<string, string>>({})

	useEffect(() => {
		onChange?.(selections)
	}, [selections, onChange])

	const handleSelectChange = (key: string, value: string) => {
		setSelections((prev) => {
			const newSelections = { ...prev, [key]: value }
			// Clear subsequent selections
			configs.forEach((config, index) => {
				if (index > configs.findIndex((c) => c.key === key)) {
					delete newSelections[config.key]
				}
			})
			return newSelections
		})
	}

	const getOptions = (config: SelectConfig, index: number) => {
		if (typeof config.options === 'function') {
			const previousSelections: Record<string, string> = {}
			for (let i = 0; i < index; i++) {
				previousSelections[configs[i].key] = selections[configs[i].key] || ''
			}
			return config.options(previousSelections)
		}
		return config.options
	}

	if (!configs || configs.length === 0) {
		return (
			<div>No se proporcionó configuración para los selects encadenados.</div>
		)
	}

	return (
		<>
			{configs.map((config, index) => {
				const options = getOptions(config, index)
				const isDisabled = index > 0 && !selections[configs[index - 1].key]

				return (
					<div key={config.key} className="form-group row my-4">
						<label
							htmlFor={config.key}
							className="col-form-label col-lg-6 col-sm-12 required"
						>
							{config.name}
						</label>
						<div className="col-lg-6 col-md-9 col-sm-12">
							<select
								id={config.key}
								name={config.key}
								value={selections[config.key] || ''}
								onChange={(e) => handleSelectChange(config.key, e.target.value)}
								disabled={isDisabled}
								className="form-select"
								aria-label={config.placeholder}
							>
								<option value="">{config.placeholder}</option>
								{options.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>
				)
			})}
		</>
	)
}
