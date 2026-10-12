export type VehicleKind = 'mobil' | 'motor'

export function getVehicleKind(type?: string): VehicleKind {
  if (type === 'Motorcycle') return 'motor'
  return 'mobil'
}

export function formatVehicleType(type?: string): string {
  if (!type) return '—'
  if (type === 'Motorcycle') return 'Motor'
  if (type === 'Car') return 'Mobil'
  return type
}
