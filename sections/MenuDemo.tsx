interface MenuItem {
    label: string;
    url: string;
}
interface Props {
    menuItens: MenuItem[];
}

interface ReturnProps {
    menuItens: MenuItem[];
    url: string;
}

export const loader = (props: Props, req: Request): ReturnProps => {
    const urlObject = new URL(req.url);
    return {
        ...props,
        url: urlObject.pathname,
    };
};

export default function MenuDemo(props: ReturnProps) {
    return (
        <ul>
            <span>{props.url}</span>
            {props.menuItens.map((item, index) => (
                <li key={index}>
                    <a href={item.url}>{item.label}</a>
                </li>
            ))}
        </ul>
    );
}
