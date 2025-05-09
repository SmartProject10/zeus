import {useQuery} from 'react-query'
import {UserEditModalForm} from './UserEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../app/_zeus/helpers'
import {useListView} from '../core/ListViewProvider'
import { backyService } from '@zeus/app/@services/api'

const UserEditModalFormWrapper = () => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => {
      return backyService.userManagementRequests.getById(itemIdForUpdate)
    },
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    },
  )

  if (!itemIdForUpdate) {
    return <UserEditModalForm
isUserLoading={isLoading}
user={{id: undefined}} />
  }

  if (!isLoading && !error && user) {
    return <UserEditModalForm
isUserLoading={isLoading}
user={user} />
  }

  return null
}

export {UserEditModalFormWrapper}
