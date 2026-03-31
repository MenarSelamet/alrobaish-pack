export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-input bg-background text-primary shadow-sm focus:ring-ring ' +
                className
            }
        />
    );
}
