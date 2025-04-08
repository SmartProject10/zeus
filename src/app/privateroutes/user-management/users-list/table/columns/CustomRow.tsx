import clsx from 'clsx'
import { FC } from 'react'
import { Row } from 'react-table'
import { User } from '../../../../../../models/apimodels/UserManagementModel';

type Props = {
  row: Row<User>
}

const CustomRow: FC<Props> = ({ row }) => (
  <tr
    {...row.getRowProps()}>
    {row.cells.map((cell) => {
      return (
        // eslint-disable-next-line react/jsx-key
        <td
          {...cell.getCellProps()}
          className={clsx({ 'text-end min-w-100px': cell.column.id === 'actions' })}
        >
          {cell.render('Cell')}
        </td>
      )
    })}
  </tr>
)

export { CustomRow }
