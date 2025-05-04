export const areas = [
    'Contabilidad',
    'Almacen',
    'Logística',
    'Seguridad Industrial',
    'Produccion',
    'Mantenimiento',
    'Control de Calidad',
    'Recursos Humanos',
];

export const subAreasByArea: Record<string, string[]> = {
    'Contabilidad': ['Finanzas', 'Impuestos', 'Nómina'],
    'Almacen': ['Inventario', 'Recepción', 'Despacho'],
    'Logística': ['Transporte', 'Distribución', 'Compras'],
    'Seguridad Industrial': ['Prevención', 'Capacitación', 'Normativas'],
    'Produccion': ['Línea 1', 'Línea 2', 'Ensamblaje'],
    'Mantenimiento': ['Preventivo', 'Correctivo', 'Predictivo'],
    'Control de Calidad': ['Inspección', 'Laboratorio', 'Auditoría'],
    'Recursos Humanos': ['Reclutamiento', 'Capacitación', 'Bienestar'],
};