import { Box } from '@mui/material'
import DietDayCard from './DietDayCard'

type Props = {
	dietDays: DietDay[]
	selectDietDay: (id: string) => void
	closeForm: () => void
	deleteDietDay: (id: string) => void
}

export default function DietDayList({ dietDays, selectDietDay, closeForm, deleteDietDay }: Props) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
			{dietDays.map(dietDay => (
				<DietDayCard
					key={dietDay.id}
					dietDay={dietDay}
					selectDietDay={selectDietDay}
					closeForm={closeForm}
					deleteDietDay={deleteDietDay}
				/>
			))}
		</Box>
	)
}
