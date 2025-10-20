import { Grid } from '@mui/material'
import DietDayList from './DietDayList'
import DietDayDetails from '../details/DietDayDetails'
import DietDayForm from '../form/DietDayForm'

type Props = {
	dietDays: DietDay[]
	selectedDietDay?: DietDay
	cancelSelectedDietDay: () => void
	selectDietDay: (id: string) => void
	openForm: (id: string) => void
	closeForm: () => void
	editMode: boolean
}

export default function DietDaysDashboard({ dietDays, selectedDietDay, cancelSelectedDietDay, selectDietDay, openForm, closeForm, editMode }: Props) {
	return (
		<Grid
			container
			spacing={3}>
			<Grid size={7}>
				<DietDayList
					dietDays={dietDays}
					selectDietDay={selectDietDay}
					closeForm={closeForm}
				/>
			</Grid>
			<Grid size={5}>
				{selectedDietDay && !editMode && (
					<DietDayDetails
						dietDay={selectedDietDay}
						cancelSelectActivity={cancelSelectedDietDay}
						openForm={openForm}
					/>
				)}
				{editMode && (
					<DietDayForm
						dietDay={selectedDietDay}
						closeForm={closeForm}
					/>
				)}
			</Grid>
		</Grid>
	)
}
