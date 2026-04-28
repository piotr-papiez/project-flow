type MaterialSymbolPropsType = {
    name: string
};

export default function MaterialSymbol({ name }: MaterialSymbolPropsType) {
    return (
        <span className="material-symbol" aria-hidden="true">
            {name}
        </span>
    );
}