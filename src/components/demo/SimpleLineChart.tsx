"use client";

type SimpleLineChartProps = {
  labels: string[];
  values: number[];
  height?: number;
  color?: string;
};

export function SimpleLineChart({
  labels,
  values,
  height = 200,
  color = "#3370FF",
}: SimpleLineChartProps) {
  const width = 560;
  const padX = 28;
  const padY = 24;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;
  const min = Math.min(...values) - 2;
  const max = Math.max(...values) + 2;
  const range = max - min || 1;

  const points = values.map((value, index) => {
    const x = padX + (index / Math.max(values.length - 1, 1)) * innerW;
    const y = padY + innerH - ((value - min) / range) * innerH;
    return { x, y, value };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? padX} ${padY + innerH} L ${points[0]?.x ?? padX} ${padY + innerH} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="评分趋势折线图"
    >
      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
        const y = padY + innerH * (1 - ratio);
        const label = Math.round(min + range * ratio);
        return (
          <g key={ratio}>
            <line
              x1={padX}
              x2={width - padX}
              y1={y}
              y2={y}
              stroke="#E5E6EB"
              strokeDasharray="4 4"
            />
            <text
              x={8}
              y={y + 4}
              fill="#8F959E"
              fontSize="10"
            >
              {label}
            </text>
          </g>
        );
      })}
      <path d={areaPath} fill={`${color}18`} />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((point, index) => (
        <g key={labels[index] ?? index}>
          <circle cx={point.x} cy={point.y} r="4" fill="#fff" stroke={color} strokeWidth="2" />
          <text
            x={point.x}
            y={height - 6}
            textAnchor="middle"
            fill="#8F959E"
            fontSize="10"
          >
            {labels[index]}
          </text>
        </g>
      ))}
    </svg>
  );
}
