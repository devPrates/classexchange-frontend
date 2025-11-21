import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CornerAccent } from '@/components/elements/corner-accent'

type StatCardProps = {
  label: string
  value: string | number
  Icon: React.ComponentType<{ className?: string }>
  color?: string
}

export function StatCard({ label, value, Icon, color = 'text-primary' }: StatCardProps) {
  return (
    <Card className="relative border-primary/30 hover:border-primary/50 transition-colors">
      <CornerAccent />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium tech-label">{label}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}