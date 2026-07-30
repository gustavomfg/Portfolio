export function EclipseVisual() {
    return (
        <div
            className="journey-eclipse"
            aria-hidden="true"
        >
            <div className="journey-eclipse__aura" />

            <div className="journey-eclipse__disc">
                <div className="journey-eclipse__surface" />
                <div className="journey-eclipse__shadow" />
                <div className="journey-eclipse__rim" />
            </div>

            <div className="journey-eclipse__orbit journey-eclipse__orbit--primary" />
            <div className="journey-eclipse__orbit journey-eclipse__orbit--secondary" />
        </div>
    );
}