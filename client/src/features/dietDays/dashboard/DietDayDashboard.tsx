import { Grid as Grid } from '@mui/material'
import DietDayForm from '../form/DietDayForm'
import MealsTable from './MealsTable'

type Props = {
	dietDays: DietDay[]
	openForm: (id: string) => void
	closeForm: () => void
	editMode: boolean
	submitForm: (dietDay: DietDay) => void
	page: number
	rowsPerPage: number
	onPageChange: (event: unknown, newPage: number) => void
	onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function DietDaysDashboard({ dietDays, openForm, closeForm, editMode, submitForm, page, rowsPerPage, onPageChange, onRowsPerPageChange }: Props) {
	return (
		<>
			{editMode && (
				<Grid
					container
					spacing={{ xs: 2, sm: 3 }}
					sx={{ mb: { xs: 2, sm: 3 } }}>
					<Grid size={{ xs: 12 }}>
						<DietDayForm
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
						openForm={openForm}
						page={page}
						rowsPerPage={rowsPerPage}
						onPageChange={onPageChange}
						onRowsPerPageChange={onRowsPerPageChange}
					/>
				</Grid>
			</Grid>
		</>
	)
}
