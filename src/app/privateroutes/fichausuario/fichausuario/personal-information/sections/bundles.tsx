import { KTIcon } from "../../../../../generalcomponents/helpers"

export function BundleSection () {
	return (
		<div className="card" id="bundles">
			<div className="card-header">
				<h5 className="card-title">
					Legajos
				</h5>
			</div>
			<div className="card-body">
				<div className="card-content">
					<div className="d-flex align-items-center">
						<div
							style={{
								flex: 1,
								marginRight: '2rem',
							}}
						>
							<div>
								<strong>Curriculum vitae</strong>
								{' '}
								<span className="text-muted">
									Formato PDF o JPG tamaño maximo de 5MB
								</span>
							</div>
							<div className="mt-2">
								<span className="text-muted">
									Archivo no adjuntado
								</span>
							</div>
						</div>
						<div>
							<button className="btn btn-primary btn-sm">
								<KTIcon
									iconName="add-item"
									iconType="duotone" 
								/>
								Subir
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
