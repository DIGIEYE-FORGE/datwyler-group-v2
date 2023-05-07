interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: [React.ReactNode, React.ReactNode];
  position?: "top" | "bottom" | "left" | "right";
}
const Tooltip = (props: TooltipProps) => {
  return (
    <div className="relative   group">
      <div className="peer">{props.children[0]}</div>
      <div className="absolute opacity-0 group-hover:opacity-100 top-1/2  group-hover:top-[100%] right-1/2 translate-x-1/2 transition-all pointer-events-none group-hover:pointer-events-auto">
        {props.children[1]}
      </div>
    </div>
  );
};

export default Tooltip;
