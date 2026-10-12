import { Car, Bike } from 'lucide-react'
import { formatVehicleType, getVehicleKind } from '@/lib/format-vehicle'

type VehicleTypeBadgeProps = {
  type?: string
  size?: 'sm' | 'md'
  showLabel?: boolean
}

export default function VehicleTypeBadge({
  type,
  size = 'md',
  showLabel = true,
}: VehicleTypeBadgeProps) {
  const kind = getVehicleKind(type)
  const Icon = kind === 'motor' ? Bike : Car
  const iconSize = size === 'sm' ? 14 : 16

  return (
    <span className={`vehicle-type ${size === 'sm' ? 'vehicle-type-sm' : ''}`}>
      <span className={`vehicle-icon ${kind}`}>
        <Icon size={iconSize} strokeWidth={2.25} />
      </span>
      {showLabel && <span className="vehicle-type-label">{formatVehicleType(type)}</span>}
    </span>
  )
}
