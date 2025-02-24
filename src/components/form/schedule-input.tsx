import { Chip, Group } from '@mantine/core'
import { TimeInput } from '@mantine/dates'
import { Temporal } from '@js-temporal/polyfill'
import { useUncontrolled } from '@mantine/hooks'

type Interval = 'daily' | 'weekly' | 'monthly'

const WEEKDAY_OPTIONS = [
	{ label: 'Mon', value: '1' },
	{ label: 'Tue', value: '2' },
	{ label: 'Wed', value: '3' },
	{ label: 'Thu', value: '4' },
	{ label: 'Fri', value: '5' },
	{ label: 'Sat', value: '6' },
	{ label: 'Sun', value: '7' },
] as const

interface Recurrence {
	start: Temporal.PlainDateTime
	interval: Interval
}

type Schedule = Recurrence[]

interface Props {
	defaultValue?: Schedule
	value?: Schedule
	onChange(value: Schedule): void
}

const ScheduleInput = ({ defaultValue = [], value, onChange }: Props) => {
	const [uncontrolledValue, handleChange] = useUncontrolled({
		value,
		defaultValue,
		onChange,
	})

	const weekdays = uncontrolledValue.map(({ start }) =>
		Temporal.PlainDateTime.from(start).dayOfWeek.toString(),
	)

	const [firstValue] = uncontrolledValue
	const time = firstValue
		? Temporal.PlainDateTime.from(firstValue.start).toPlainTime()
		: new Temporal.PlainTime(9, 0, 0, 0, 0, 0)

	const setWeekdays = (weekdays: string[]) => {
		const now = Temporal.Now.plainDateTimeISO()
		handleChange(
			weekdays.map((weekday) => {
				const numericWeekday = Number.parseInt(weekday, 10)
				const date = now
					.withPlainTime(time)
					.add({ days: numericWeekday - now.dayOfWeek })

				return { start: date, interval: 'weekly' }
			}),
		)
	}

	const setTime = (time: string) => {
		const plainTime = Temporal.PlainTime.from(time)
		handleChange(
			uncontrolledValue.map((recurrence) => ({
				...recurrence,
				start: Temporal.PlainDateTime.from(recurrence.start).withPlainTime(
					plainTime,
				),
			})),
		)
	}

	return (
		<>
			<Chip.Group multiple onChange={setWeekdays} value={weekdays}>
				<Group gap={4}>
					{WEEKDAY_OPTIONS.map(({ label, value }) => (
						<Chip key={value} value={value} radius="sm">
							{label}
						</Chip>
					))}
				</Group>
			</Chip.Group>
			{weekdays.length !== 0 && (
				<TimeInput
					label="What time"
					onChange={(event) => setTime(event.currentTarget.value)}
					value={time.toString()}
				/>
			)}
		</>
	)
}

export { ScheduleInput }
