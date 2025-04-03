import { KTIcon } from 'src/app/generalcomponents/helpers'
import { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'

interface TitleBarProps {
    label: string
}

export const TitleBar = memo((props: TitleBarProps): JSX.Element => {
    const navigate = useNavigate()

    const handleBack = useCallback(() => {
        navigate(-1)
    }, [navigate])

    return (
        <div
            className="title-bar d-flex flex-row align-items-center gap-4">
            <button
                className="btn m-0 p-0"
                onClick={handleBack}>
                <KTIcon
                    iconName="arrow-left"
                    className="back-icon" />
            </button>

            <p
                className="fs-1 fw-bold m-0">
                {props.label}
            </p>
        </div>
    )
}, (prevProps, nextProps) => {
    return prevProps.label === nextProps.label
})

TitleBar.displayName = 'TitleBar'
