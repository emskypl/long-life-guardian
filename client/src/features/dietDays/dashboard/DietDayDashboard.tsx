import { Grid } from '@mui/material'
import DietDayList from './DietDayList'

type Props = {
	dietDays: DietDay[]
}

export default function DietDaysDashboard({ dietDays }: Props) {
	return (
		<Grid container>
			<Grid size={9}>
				<DietDayList dietDays={dietDays} />
			</Grid>
		</Grid>
	)
}
