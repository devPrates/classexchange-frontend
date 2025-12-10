'use client';

import React from 'react';

import { Button } from '../dashboard/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardToolbar } from '../dashboard/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '../dashboard/ui/chart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDown, ArrowUp, Calendar, Download, Filter, MoreHorizontal, RefreshCw, Share2 } from 'lucide-react';
import { Area, CartesianGrid, ComposedChart, Line, ReferenceLine, XAxis, YAxis } from 'recharts';
import { Badge } from '../dashboard/ui/badge';

const salesData = [
  { mes: 'Ago 10', trocas: 7, trocasArea: 7, substituicoes: 11 },
  { mes: 'Set 10', trocas: 15, trocasArea: 15, substituicoes: 8 },
  { mes: 'Out 10', trocas: 19, trocasArea: 19, substituicoes: 14 },
  { mes: 'Nov 10', trocas: 8, trocasArea: 8, substituicoes: 6 },
  { mes: 'Dez 10', trocas: 12, trocasArea: 12, substituicoes: 22 },
  { mes: 'Jan 10', trocas: 5, trocasArea: 5, substituicoes: 9 },
];

const chartConfig = {
  trocas: {
    label: 'Trocas',
    color: 'var(--color-blue-500)',
  },
  substituicoes: {
    label: 'Substituições',
    color: 'var(--color-orange-500)',
  },
} satisfies ChartConfig;

// Custom Tooltip
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const ChartLabel = ({ label, color = chartConfig.trocas.color }: { label: string; color: string }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="size-3.5 border-4 rounded-full bg-background" style={{ borderColor: color }}></div>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    const filteredPayload = payload.filter((entry) => entry.dataKey !== 'trocasArea');

    return (
      <div className="rounded-lg border bg-popover p-3 shadow-sm shadow-black/5 min-w-[180px]">
        <div className="text-xs font-medium text-muted-foreground tracking-wide mb-2.5">{label}</div>
        <div className="space-y-2">
          {filteredPayload.map((entry, index) => {
            const config = chartConfig[entry.dataKey as keyof typeof chartConfig];
            return (
              <div key={index} className="flex items-center gap-2 text-xs">
                <ChartLabel label={config?.label + ':'} color={entry.color} />
                <span className="font-semibold text-popover-foreground">{entry.value}</span>
                {config?.label == 'Substituições' && (
                  <Badge
                    variant={
                      ((entry.value - filteredPayload[0].value) / filteredPayload[0].value) * 100 > 0
                        ? 'success'
                        : 'destructive'
                    }
                    appearance="light"
                    className="text-xs flex items-center gap-1"
                  >
                    {((entry.value - filteredPayload[0].value) / filteredPayload[0].value) * 100 > 0 ? (
                      <ArrowUp className="size-3" />
                    ) : (
                      <ArrowDown className="size-3" />
                    )}
                    {Math.abs(((entry.value - filteredPayload[0].value) / filteredPayload[0].value) * 100).toFixed(0)}%
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default function LineChart1() {
  return (
    <div className="min-h-screen p-3 lg:p-4">
      <Card className="w-full lg:max-w-none">
        <CardHeader className="border-0 min-h-auto pt-3 pb-2">
          <CardTitle className="text-base font-semibold">Visão de Trocas e Substituições</CardTitle>
          <CardToolbar>
            <div className="flex items-center gap-4 text-sm">
              <ChartLabel label="Trocas" color={chartConfig.trocas.color} />
              <ChartLabel label="Substituições" color={chartConfig.substituicoes.color} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button id="linechart-actions-trigger" variant="dim" size="sm" mode="icon" className="-me-1.5">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom">
                <DropdownMenuItem>
                  <Download className="size-4" />
                  Exportar Dados
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="size-4" />
                  Alterar Período
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Filter className="size-4" />
                  Filtrar Dados
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RefreshCw className="size-4" />
                  Atualizar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Share2 className="size-4" />
                  Compartilhar Relatório
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardToolbar>
        </CardHeader>

        <CardContent className="px-2.5 flex flex-col items-end">
          <ChartContainer
            id="dashboard-line-chart"
            config={chartConfig}
            className="aspect-auto w-full h-[38vh] md:h-[42vh] lg:h-[360px] xl:h-[420px] [&_.recharts-curve.recharts-tooltip-cursor]:stroke-initial"
          >
            <ComposedChart data={salesData} margin={{ top: 0, right: 12, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id="trocasGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartConfig.trocas.color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={chartConfig.trocas.color} stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="var(--input)"
                strokeOpacity={1}
                horizontal={true}
                vertical={false}
              />

              <XAxis
                dataKey="mes"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, className: 'text-muted-foreground' }}
                tickMargin={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, className: 'text-muted-foreground' }}
                domain={[0, 25]}
                ticks={[0, 5, 10, 15, 20, 25]}
                tickMargin={10}
              />

              <ReferenceLine x="Dez 10" stroke={chartConfig.trocas.color} strokeWidth={1} />

              {/* Tooltip */}
              <ChartTooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: 'var(--input)',
                  strokeWidth: 1,
                  strokeDasharray: 'none',
                }}
              />

              <Area
                type="linear"
                dataKey="trocasArea"
                stroke="transparent"
                fill="url(#trocasGradient)"
                strokeWidth={0}
                dot={false}
              />

              <Line
                type="linear"
                dataKey="trocas"
                stroke={chartConfig.trocas.color}
                strokeWidth={2}
                dot={{ fill: 'var(--background)', strokeWidth: 2, r: 6, stroke: chartConfig.trocas.color }}
              />

              <Line
                type="linear"
                dataKey="substituicoes"
                stroke={chartConfig.substituicoes.color}
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ fill: 'var(--background)', strokeWidth: 2, r: 6, stroke: chartConfig.substituicoes.color }}
              />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
