import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import {User} from '../../../../../../@services/api/dtos/UserManagementModel'

type Props = {
  column: ColumnInstance<User>
}

const CustomHeaderColumn: FC<Props> = ({column}) => (
  <>
    {column.Header && typeof column.Header === 'string' ? <th
{...column.getHeaderProps()}>{column.render('Header')}</th> : column.render('Header')}
  </>
)

export {CustomHeaderColumn}
