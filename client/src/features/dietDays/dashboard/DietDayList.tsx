import { Box } from '@mui/material'
import DietDayCard from './DietDayCard'

type Props = {
	dietDays: DietDay[]
}

export default function DietDayList({ dietDays }: Props) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
			{dietDays.map(dietDay => (
				<DietDayCard
					key={dietDay.id}
					dietDay={dietDay}
				/>
			))}
		</Box>
	)
}
