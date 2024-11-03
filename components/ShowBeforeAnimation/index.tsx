import { Section } from "@deco/deco/blocks";

interface Props {
    children: Section;
    animation:
        | "awaitBottomAnimationFadInEnd"
        | "awaitBottomAnimatedGradientEnd";
}
/** @title Show Section Before Animation */
export default function ShowBeforeAnimation({ animation, children }: Props) {
    return (
        <div className={animation}>
            <children.Component {...children.props} />
        </div>
    );
}
