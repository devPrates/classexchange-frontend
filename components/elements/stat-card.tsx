import { Card, CardContent } from '@/components/ui/card'
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
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm tech-label text-muted-foreground mb-1">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className={`p-3 rounded-lg bg-primary/10 border border-primary/20 ${color}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}