import { Grid as Grid } from '@mui/material'
import DietDayDetails from '../details/DietDayDetails'
import DietDayForm from '../form/DietDayForm'
import MealsTable from './MealsTable'

type Props = {
	dietDays: DietDay[]
	selectedDietDay?: DietDay
	cancelSelectedDietDay: () => void
	selectDietDay: (id: string) => void
	openForm: (id: string) => void
	closeForm: () => void
	editMode: boolean
	submitForm: (dietDay: DietDay) => void
	deleteDietDay: (id: string) => void
}

export default function DietDaysDashboard({ dietDays, selectedDietDay, cancelSelectedDietDay, selectDietDay, openForm, closeForm, editMode, submitForm, deleteDietDay }: Props) {
	return (
		<>
			{editMode && (
				<Grid
					container
					spacing={{ xs: 2, sm: 3 }}
					sx={{ mb: { xs: 2, sm: 3 } }}>
					<Grid size={{ xs: 12 }}>
						<DietDayForm
							dietDay={selectedDietDay}
							closeForm={closeForm}
							submitForm={submitForm}
						/>
					</Grid>
				</Grid>
			)}
			<Grid
				container
				spacing={{ xs: 2, sm: 3 }}>
				<Grid size={{ xs: 12 }}>
					<MealsTable
						dietDays={dietDays}
						selectDietDay={selectDietDay}
						cancelSelectedDietDay={cancelSelectedDietDay}
						deleteDietDay={deleteDietDay}
						openForm={openForm}
					/>
				</Grid>
			</Grid>
		</>
	)
}
