import { useState } from "react";

type Props = { kind: string; compact?: boolean };

function DB({ x, y, rotate = 0 }: { x: number; y: number; rotate?: number }) {
  return <g className="weight" transform={`translate(${x} ${y}) rotate(${rotate})`}><line x1="-7" y1="0" x2="7" y2="0" /><rect x="-11" y="-5" width="4" height="10" rx="1" /><rect x="7" y="-5" width="4" height="10" rx="1" /></g>;
}

function Pose({ kind, finish, x }: { kind: string; finish: boolean; x: number }) {
  const t = { transform: `translate(${x} 0)` };
  if (kind === "squat" || kind === "sumo") {
    const wide = kind === "sumo";
    return <g {...t}>
      <circle className="body-fill" cx="55" cy={finish ? 51 : 38} r="9" />
      <path className="body" d={finish ? "M55 61V102" : "M55 48V104"} />
      <path className="body" d={finish ? "M55 70L39 81L55 85L71 81L55 70" : "M55 62L43 75M55 62L67 75"} />
      <DB x={55} y={finish ? 77 : 66} rotate={90} />
      <path className="body" d={finish ? `M55 102L${wide ? 28 : 35} 121L${wide ? 16 : 27} 146M55 102L${wide ? 82 : 75} 121L${wide ? 94 : 83} 146` : `M55 104L${wide ? 31 : 42} 145L${wide ? 18 : 39} 169M55 104L${wide ? 79 : 68} 145L${wide ? 92 : 71} 169`} />
      <path className="ground" d="M12 170H98" />
    </g>;
  }
  if (kind === "bench" || kind === "bench-neutral") return <g {...t}>
    <path className="bench" d="M15 116H93M25 116L19 154M84 116L91 154" />
    <circle className="body-fill" cx="31" cy="98" r="9" /><path className="body" d="M40 102L78 108L92 134M78 108L75 151M92 134L99 151" />
    {finish ? <><path className="body" d="M48 104V57M69 106V57" /><DB x={48} y={52} rotate={90} /><DB x={69} y={52} rotate={90} /></> : <><path className="body" d="M48 104L38 80L47 70M69 106L79 82L70 70" /><DB x={47} y={66} rotate={kind === "bench-neutral" ? 90 : 0} /><DB x={70} y={66} rotate={kind === "bench-neutral" ? 90 : 0} /></>}
    <path className="ground" d="M12 155H104" />
  </g>;
  if (["one-row", "bar-row", "double-row", "rear-raise"].includes(kind)) {
    const rear = kind === "rear-raise", one = kind === "one-row";
    return <g {...t}>
      {one && <path className="bench" d="M13 116H49M19 116L15 153M44 116L49 153" />}
      <circle className="body-fill" cx="38" cy="57" r="9" /><path className="body" d="M46 63L78 86L91 133M78 86L70 147M91 133L101 151" />
      {rear ? finish ? <><path className="body" d="M58 72L35 90M58 72L82 53" /><DB x={32} y={92} /><DB x={85} y={51} /></> : <><path className="body" d="M58 72L55 111M58 72L71 108" /><DB x={55} y={115} rotate={90} /><DB x={72} y={112} rotate={90} /></> : finish ? <><path className="body" d="M56 72L70 89L84 76" />{one ? <DB x={86} y={73} rotate={-55} /> : <path className="bar" d="M69 76L101 57" />}</> : <><path className="body" d="M56 72L68 98L72 126" />{one ? <DB x={72} y={131} rotate={90} /> : <path className="bar" d="M54 130H91" />}</>}
      <path className="ground" d="M10 155H106" />
    </g>;
  }
  if (kind === "hinge") return <g {...t}>
    <circle className="body-fill" cx={finish ? 27 : 55} cy={finish ? 58 : 36} r="9" /><path className="body" d={finish ? "M36 63L72 83L87 113" : "M55 46V105"} /><path className="body" d={finish ? "M72 83L55 147M72 83L79 147" : "M55 105L42 150M55 105L68 150"} /><path className="body" d={finish ? "M49 71L53 113M58 75L67 116" : "M55 64L44 107M55 64L67 107"} />
    <DB x={finish ? 53 : 44} y={finish ? 119 : 112} rotate={90} /><DB x={finish ? 68 : 67} y={finish ? 122 : 112} rotate={90} /><path className="ground" d="M14 154H97" />
  </g>;
  if (kind === "lateral") return <g {...t}>
    <circle className="body-fill" cx="55" cy="36" r="9" /><path className="body" d="M55 46V104M55 104L42 150M55 104L68 150" /><path className="body" d={finish ? "M55 61L17 72M55 61L93 72" : "M55 61L42 108M55 61L68 108"} />
    <DB x={finish ? 13 : 42} y={finish ? 73 : 113} rotate={finish ? 0 : 90} /><DB x={finish ? 97 : 68} y={finish ? 73 : 113} rotate={finish ? 0 : 90} /><path className="ground" d="M11 154H100" />
  </g>;
  if (kind === "split" || kind === "lunge") return <g {...t}>
    {kind === "split" && <path className="bench" d="M78 106H106M84 106L81 146M101 106L104 146" />}
    <circle className="body-fill" cx="49" cy={finish ? 47 : 35} r="9" /><path className="body" d={finish ? "M49 57V103" : "M49 45V101"} /><path className="body" d={finish ? "M49 103L26 121L19 151M49 103L75 126L88 151" : "M49 101L34 150M49 101L76 135L91 149"} /><path className="body" d="M49 64L37 105M49 64L61 105" />
    <DB x={37} y={110} rotate={90} /><DB x={61} y={110} rotate={90} /><path className="ground" d="M10 155H104" />
  </g>;
  if (kind === "overhead") return <g {...t}>
    <path className="bench" d="M30 112H77M37 112L32 153M71 112L77 153" /><circle className="body-fill" cx="54" cy="44" r="9" /><path className="body" d="M54 54V111M54 111L40 151M54 111L68 151" /><path className="body" d={finish ? "M54 67L40 45V20M54 67L68 45V20" : "M54 67L37 76V55M54 67L71 76V55"} />
    <DB x={finish ? 40 : 37} y={finish ? 15 : 50} rotate={90} /><DB x={finish ? 68 : 71} y={finish ? 15 : 50} rotate={90} /><path className="ground" d="M17 155H91" />
  </g>;
  if (kind === "hip-thrust") return <g {...t}>
    <path className="bench" d="M12 90H43M18 90L14 143M39 90L44 143" /><circle className="body-fill" cx="27" cy="69" r="9" /><path className="body" d={finish ? "M35 76L68 90L93 118" : "M35 76L62 106L90 124"} /><path className="body" d={finish ? "M68 90L62 131L49 151M93 118L96 151" : "M62 106L52 135L43 151M90 124L95 151"} /><DB x={finish ? 69 : 62} y={finish ? 86 : 102} /><path className="ground" d="M9 155H105" />
  </g>;
  if (kind === "curl" || kind === "hammer") return <g {...t}>
    <circle className="body-fill" cx="55" cy="35" r="9" /><path className="body" d="M55 45V103M55 103L42 150M55 103L68 150" /><path className="body" d={finish ? "M55 61L43 82V61M55 61L67 82V61" : "M55 61L42 108M55 61L68 108"} />
    {kind === "curl" ? <path className="bar" d={finish ? "M34 57H76" : "M33 113H77"} /> : <><DB x={finish ? 43 : 42} y={finish ? 56 : 113} rotate={90} /><DB x={finish ? 67 : 68} y={finish ? 56 : 113} rotate={90} /></>}<path className="ground" d="M15 154H95" />
  </g>;
  return <g {...t}>
    <path className="bench" d="M15 116H94M24 116L18 154M84 116L91 154" /><circle className="body-fill" cx="31" cy="98" r="9" /><path className="body" d="M40 103L77 108L91 134M77 108L74 151M91 134L99 151" /><path className="body" d={finish ? "M48 103V57M68 106V57" : "M48 103V75L34 67M68 106V76L82 68"} /><DB x={finish ? 48 : 30} y={finish ? 52 : 65} rotate={90} /><DB x={finish ? 68 : 86} y={finish ? 52 : 65} rotate={90} /><path className="ground" d="M12 155H104" />
  </g>;
}

export default function ExerciseVisual({ kind, compact = false }: Props) {
  const [paused, setPaused] = useState(false);

  if (compact) {
    return <div className="exercise-visual compact" aria-label="Illustrated start and finish positions">
      <svg viewBox="0 0 290 190" role="img">
        <Pose kind={kind} finish={false} x={14} />
        <path className="motion-arrow" d="M132 91H159M153 85L160 91L153 97" />
        <Pose kind={kind} finish x={165} />
        <text x="69" y="181" textAnchor="middle">START</text>
        <text x="220" y="181" textAnchor="middle">FINISH</text>
      </svg>
    </div>;
  }

  return <div className={`exercise-visual animated ${paused ? "paused" : ""}`} aria-label="Looping animated exercise demonstration">
    <div className="motion-stage">
      <div className="motion-topline">
        <span><i aria-hidden="true" /> FORM DEMO</span>
        <small>1 CONTROLLED REP</small>
      </div>
      <svg viewBox="0 0 180 190" role="img">
        <path className="motion-orbit" d="M28 84C38 23 139 19 153 81" />
        <path className="motion-orbit-arrow" d="M145 73L153 82L160 72" />
        <g className="motion-frame motion-start"><Pose kind={kind} finish={false} x={35} /></g>
        <g className="motion-frame motion-finish"><Pose kind={kind} finish x={35} /></g>
      </svg>
      <div className="motion-readout" aria-hidden="true">
        <span className="motion-label motion-label-start">SET POSITION</span>
        <span className="motion-label motion-label-finish">MOVE · SQUEEZE</span>
      </div>
      <div className="motion-progress" aria-hidden="true"><span /></div>
      <button className="motion-toggle" type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play exercise demonstration" : "Pause exercise demonstration"}>
        <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span> {paused ? "Play" : "Pause"}
      </button>
    </div>
  </div>;
}
