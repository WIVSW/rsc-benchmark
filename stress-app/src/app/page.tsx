import Markdown from 'markdown-to-jsx'
import LineChart from '@/components/line-chart/line-chart';
import BarChart from '@/components/bar-chart/bar-chart';
import timingsReport from '../../reports/timings.json'
import rpsReport from '../../reports/rps.json'
import template from '@/template.md';
  
const INITIAL_TIMINGS_VISIBILITY: Partial<Record<string, boolean>> = {
    bun_fizz: false,
    bun_flight: true,
    bun_ssr: true,
    'bun_use-client': true,
    deno_fizz: false,
    deno_flight: true,
    deno_ssr: false,
    'deno_use-client': false,
    node_fizz: true,
    node_flight: false,
    node_ssr: false,
    'node_use-client': false
};

export default function Home() {
  return (
    <Markdown options={{
      overrides: {
        Timings: {
          component: () => <LineChart chart={timingsReport} visibility={INITIAL_TIMINGS_VISIBILITY} />,
        },
        MaxRps: {
          component: () => <BarChart chart={rpsReport} />,
        }
      }
    }}>{template}</Markdown>
  );
}
