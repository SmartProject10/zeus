interface SidebarSubtitleProps {
    label: string;
}

export function SidebarSubtitle({ label }: SidebarSubtitleProps): JSX.Element {
    return (
        <p className="text-muted text-uppercase fs-9 fw-bold mb-0 mt-2 mb-2">{label}</p>
    );
}
