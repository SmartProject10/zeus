import { useIntl } from 'react-intl'
import { KTIcon } from '../../../../helpers'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'

const SidebarMenuMain = () => {
    const intl = useIntl()

    return (
        <>
            <SidebarMenuItem
                to='/dashboard'
                icon='home'
                title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
                fontIcon='bi-app-indicator'
            />
            <SidebarMenuItem
                to='/apps/user-management/users'
                icon='people'
                title={intl.formatMessage({ id: 'MENU.USER_MANAGEMENT' })}
                fontIcon='bi-layers'
            />
            <SidebarMenuItem to='' icon='bank' title={intl.formatMessage({ id: 'MENU.COMPANY_MANAGEMENT' })} fontIcon='bi-layers' />

            <SidebarMenuItemWithSub
                to='/crafted/pages'
                title={intl.formatMessage({ id: 'MENU.HUMAN_RESOURCES' })}
                fontIcon='bi-archive'
                icon='people'
            >
                <SidebarMenuItemWithSub
                    to='/crafted/pages'
                    title={intl.formatMessage({ id: 'MENU.EMPLOYEES' })}
                    fontIcon='bi-archive'
                    icon='people'
                >
                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.EMPLOYEE_MANAGEMENT' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.EXTERNAL_EMPLOYEE_MANAGEMENT' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.PERMISSIONS_ROLES' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='delivery-time' title={intl.formatMessage({ id: 'MENU.WORK_HISTORY' })} fontIcon='bi-layers' />
                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/crafted/pages'
                    title={intl.formatMessage({ id: 'MENU.RECRUITMENT_SELECTION' })}
                    fontIcon='bi-archive'
                    icon='people'
                >
                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.VACANCIES' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.CANDIDATE_MANAGEMENT' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.CANDIDATE_ARCHIVE' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='delivery-time' title={intl.formatMessage({ id: 'MENU.SELECTION_PROCESS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='category' title={intl.formatMessage({ id: 'MENU.HIRING_DOCUMENTATION' })} fontIcon='bi-layers' />
                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/crafted/pages'
                    title={intl.formatMessage({ id: 'MENU.PERFORMANCE' })}
                    fontIcon='bi-archive'
                    icon='people'
                >
                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.PERFORMANCE_EVALUATIONS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.GOALS_OBJECTIVES' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.FEEDBACK_REVIEWS' })} fontIcon='bi-layers' />
                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/crafted/pages'
                    title={intl.formatMessage({ id: 'MENU.TRAINING_DEVELOPMENT' })}
                    fontIcon='bi-archive'
                    icon='people'
                >
                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.TRAINING_PROGRAMS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.TRAINING_HISTORY' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.SKILL_EVALUATION' })} fontIcon='bi-layers' />
                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/crafted/pages'
                    title={intl.formatMessage({ id: 'MENU.PAYROLL_BENEFITS' })}
                    fontIcon='bi-archive'
                    icon='people'
                >
                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.PAYROLL_MANAGEMENT' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.EMPLOYEE_BENEFITS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.DEDUCTIONS_BONUSES' })} fontIcon='bi-layers' />
                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/crafted/pages'
                    title={intl.formatMessage({ id: 'MENU.ABSENCES_TIME' })}
                    fontIcon='bi-archive'
                    icon='people'
                >
                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.VACATION_REQUESTS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.ABSENCE_TRACKING' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.CLOUD_TIMECLOCK' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.WORK_CALENDAR' })} fontIcon='bi-layers' />
                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub
                    to='/crafted/pages'
                    title={intl.formatMessage({ id: 'MENU.REPORTS_ANALYSIS' })}
                    fontIcon='bi-archive'
                    icon='people'
                >
                    <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.CUSTOM_REPORTS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.HR_DATA_ANALYSIS' })} fontIcon='bi-layers' />
                    <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.PERFORMANCE_METRICS' })} fontIcon='bi-layers' />
                </SidebarMenuItemWithSub>

                <SidebarMenuItem to='' icon='graph-3' title={intl.formatMessage({ id: 'MENU.TERMINATION' })} fontIcon='bi-layers' />
            </SidebarMenuItemWithSub>

            <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.DOCUMENT_MANAGEMENT' })} fontIcon='bi-layers' />
            <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.SUPPLIER_CONTRACTS' })} fontIcon='bi-layers' />

            <SidebarMenuItemWithSub
                to='/crafted/pages'
                title={intl.formatMessage({ id: 'MENU.QUALITY_MANAGEMENT' })}
                fontIcon='bi-archive'
                icon='people'
            >
                <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.QUALITY_PLANNING' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.AUDITS' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.NON_CONFORMITIES' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.CONTINUOUS_IMPROVEMENT' })} fontIcon='bi-layers' />
            </SidebarMenuItemWithSub>

            <SidebarMenuItemWithSub
                to='/crafted/pages'
                title={intl.formatMessage({ id: 'MENU.HEALTH_SAFETY' })}
                fontIcon='bi-archive'
                icon='people'
            >
                <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.OCCUPATIONAL_RISK_MANAGEMENT' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.SAFETY_TRAINING' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.INCIDENTS_ACCIDENTS' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.SAFETY_REGULATIONS' })} fontIcon='bi-layers' />
            </SidebarMenuItemWithSub>

            <SidebarMenuItemWithSub
                to='/crafted/pages'
                title={intl.formatMessage({ id: 'MENU.ANTI_BRIBERY_MANAGEMENT' })}
                fontIcon='bi-archive'
                icon='people'
            >
                <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.BRIBERY_RISK_ASSESSMENT' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.ANTI_CORRUPTION_POLICIES' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.ANTI_CORRUPTION_AUDITS' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.BRIBERY_INCIDENTS' })} fontIcon='bi-layers' />
            </SidebarMenuItemWithSub>

            <SidebarMenuItemWithSub
                to='/crafted/pages'
                title={intl.formatMessage({ id: 'MENU.ENVIRONMENTAL_MANAGEMENT' })}
                fontIcon='bi-archive'
                icon='people'
            >
                <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.ENVIRONMENTAL_IMPACT_ASSESSMENT' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.ENVIRONMENTAL_ASPECT_CONTROL' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.WASTE_MANAGEMENT' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.ENVIRONMENTAL_REGULATIONS' })} fontIcon='bi-layers' />
            </SidebarMenuItemWithSub>

            <SidebarMenuItemWithSub
                to='/crafted/pages'
                title={intl.formatMessage({ id: 'MENU.AUDITS' })}
                fontIcon='bi-archive'
                icon='people'
            >
                <SidebarMenuItem to='' icon='people' title={intl.formatMessage({ id: 'MENU.SCHEDULE_NEW_AUDIT' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.AUDIT_TESTING' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.AUDIT_EXECUTION' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.NON_CONFORMITIES' })} fontIcon='bi-layers' />
                <SidebarMenuItem to='' icon='profile-circle' title={intl.formatMessage({ id: 'MENU.REPORTS_ANALYSIS' })} fontIcon='bi-layers' />
            </SidebarMenuItemWithSub>
        </>
    )
}

export { SidebarMenuMain }

