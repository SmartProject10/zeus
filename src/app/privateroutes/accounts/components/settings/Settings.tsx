import {ProfileDetails} from './cards/ProfileDetails'
import {SignInMethod} from './cards/SignInMethod'
import {ConnectedAccounts} from './cards/ConnectedAccounts'
import {EmailPreferences} from './cards/EmailPreferences'
import {Notifications} from './cards/Notifications'
import {DeactivateAccount} from './cards/DeactivateAccount'
import { Content } from '../../../../../app/_zeus/layout/components/content'

export function Settings() {
  return (
    <Content>
      <ProfileDetails />
      <SignInMethod />
      <ConnectedAccounts />
      <EmailPreferences />
      <Notifications />
      <DeactivateAccount />
    </Content>
  )
}
